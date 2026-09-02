# 11 · v4 和弦算法升级全记录

> 本文记录 v4 分支（refactor/v4）对和弦体系的全部算法升级——从公式定义、实例存储到查找引擎。这不是一份语法手册，而是一次架构手术的完整病历：为什么动刀、怎么动的、怎么证明没伤到人。

## 0. 为什么动手术

v3 时代的和弦体系有三处「能用但不对劲」：

**公式表难维护**。87 个公式平铺在 62KB 的 JSON 里，每条 8 个字段中 4 个是纯派生量（semitonesList、notesNum、degreeToIntervalMap、tags）——同一个事实在文件里存了两遍。想改一个和弦，你得同时改六处数据并祈祷它们仍然一致。

**实例表一半是冗余**。chord-instances.json 2.1MB、1056 条（87 公式 × 12 根音），其中 54% 的体积存的是「音集层」——pianoKeyIds、排序结果、双向映射表。这些数据全部可以由「公式的 semitonesList + 根音取模」一步机械推出。它们被预存的唯一理由是 v1/v2 时代库里还没有可靠的乐理计算可调。

**查找是线性扫描**。`findPresetChord` 每次调用都 `collect(1056).filter(isEqual)`——扫全表、逐条做数组深比较。1056 条不算慢，但这是 O(n) 在干 O(1) 的活。

v4 的答案：**可推导的数据一律不落盘，运行时以微秒级成本算回；查找按音集建哈希索引**。下面分三章拆解。

## 1. 公式表：json5 极简源 + 基座引用

### 1.1 源头搬家

公式表的真相源从 `static-data/chord-formulas.json` 搬到 `ts-dev/raw-static/chord-formulas.json5`——一份带注释、带结构说明的手改源。JSON5 允许 `//` 注释、尾逗号，编译时注释不进产物。

每条记录只剩**不可推导的真信息**：键（公式 id）、intervalList（或基座引用）、cnName/name/scoreDisplay 三名。四个派生字段、两个化石字段（family、description）全部退场，由编译器（`ts-dev/compileStaticData.ts`）在生成产物时算回或转为注释。

### 1.2 基座引用 DSL

88 个公式里有 82 个不必完整写出音程列表，而是表达成「基座 + 增量」。三个键，可组合：

```json5
// dom9 = 属七 + 大九度(堆叠)
"dom9": {
  "$base": "dom7",
  "$add": [["maj", 9]],
  ...
}

// dom7#5 = 属七的五度改成增五(同名变音)
"dom7#5": {
  "$base": "dom7",
  "$set": {"5": "aug"},
  ...
}

// dom13 链式:dom13 → dom11 → dom9 → dom7 → maj3
"dom13": {
  "$base": "dom11",
  "$add": [["maj", 13]],
  ...
}
```

- `$base`：基座公式 id，继承其 intervalList，可以链式引用
- `$set`：`{度数: 性质}`，替换基座中该度数的音程性质
- `$add`：`[[性质, 度数], ...]`，尾部追加扩展音

**展开算法**（编译器与验证器各实现一份，互为独立印证）：递归展开 `$base` → 应用 `$set` → 应用 `$add` → 按度数升序。全表只有 **6 个完整定义（树根）**：maj3、min3、dim3、aug3、sus2、sus4——恰好是六个基础三和弦/挂留；其余 82 个基座化后，intervalList 的音数从 359 降到 94，**压缩 74%**，文件从 62KB 减到 29KB。

每条记录的两行注释是**展开快照**（id · 中文名 · C 为根拼法 · 音程=半音列表），弥补基座引用不直读的代价——打开文件看到的完整面貌一分不少。

### 1.3 两条乐理铁律

基座引用不是随便指的，有两条规则防止出现「乐理上别扭」的引用：

**规则一：$set 仅限同名前缀的变音**。dom7#5 必须基于 dom7——名字即意图。跨 id 禁用 set，因为大/小/增/减三和弦是平级兄弟，不是相互修改出来的（首版算法曾把 min3 表达成 maj3 + $set{3:min}，机器验证前就发现并修正了）。

**规则二：跨 id 只许 $add 堆叠**。于是七和弦全部回到正统的「三和弦 + 七音」视角：

| 和弦 | 表达 | 传统名称 |
|---|---|---|
| dom7 | maj3 + min7 | 大三 + 小七 |
| halfdim7 | dim3 + min7 | 减小七 |
| dim7 | dim3 + dim7 | 减减七 |
| minmaj7 | min3 + maj7 | 小大七 |

### 1.4 无环的数学保证

引用图必须无环，否则展开会死循环。v4 用**性质秩严格偏序**做保证：

```
性质秩:p = 0, maj = 0(基准)
        min = 1
        aug = 2, dim = 2(变音)
        aug+ = 3, dim- = 3
```

基座合法 ⟺ 基座的「(度数, 性质秩)序列」**严格小于**目标的序列。严格偏序下不可能出现 A 引用 B、B 又引用 A——引用图天然是 DAG。这个秩还自带乐理方向：变音和弦（aug/dim）的序列必然排在基础和弦之后，所以 dom7#5 基于 dom7 合法、反向非法。

（历史教训：首版只用「操作数最少」选基座，maj3 与 min3 等长且只差一个 set，互选对方成环，展开校验当场递归爆栈暴露。）

### 1.5 派生回填与第 88 员

编译器展开 intervalList 后算回全部派生字段：

```
gap(type, N)     = 同型简单度数半音 + 12 × floor((N-1)/7)    // maj9 = maj2(2)+12 = 14
semitonesList    = intervalList 逐项 gap
notesNum         = intervalList.length + 1
degreeToIntervalMap = intervalList 的 map 形态
tags             = deriveTags(intervalList) —— 真实注入器现场计算
chordFormulaId   = 从键回填
```

tags 的来源值得强调：**不是存的，是 deriveTags 纯函数从 intervalList 现场推导的**（五维：家族/扩展/性质/变音/结构）。新增公式只要定义 intervalList，标签自动生成，分类永远与音程内容一致——family 时代那种手填错乱（实测 54 条与标签体系对不上）从根上不可能复发。

基座化审查还顺带发现一个对称性缺口：maj9b5、min9b5、dom7b5 都在，唯独 dom9b5 缺席——疑为历代遗漏。v4 补入第 88 个公式，dom 系变音就此对称完整。（五和弦 C5 与长尾和弦经乐理调查确认不收：两音不构成和弦判定、长尾稀释「公式→音集」单射的干净性。）

## 2. 实例表：记谱层与音集层分离

### 2.1 两层数据的本质差异

1056 条实例的字段其实分两层，性质完全不同：

**音集层（54% 体积）**——pianoKeyIds、pianoKeyIdsSorted、pianoKeyIdToInterval、intervalToPianoKeyId、notesNum。全部是「公式 semitonesList + 根音 mod 12」的机械展开，推导成本是每条几微秒的算术。

**记谱层（46% 体积）**——notes 数组：每个根音拼法（黑键根有 C♯/D♭ 两个变体）的完整记谱展开，包括每个键的 step/alter 拼写决策和 octaveGapToRoot 跨八度归属。这层走真实的 `Note.getNoteByInterval` 乐理计算——减七和弦的 B♭♭、十三和弦 13 度音的八度位置，全靠它裁决。**这是实例表里唯一「推导贵」的数据，也是 Chord 类展开 Note 对象的直接数据源。**

v4 的手术：JSON 只保留记谱层 + 两个标识字段（pianoKeyIdRoot、chordFormulaId），**2.1MB → 1.1MB**。

### 2.2 加载器 enrich：接口零变更的关键

字段删了，功能不能少。`src/Chord/static/chord-instance-data.ts` 的加载器在读入 JSON 后立即做 enrich——用公式表把 5 个音集字段当场算回，挂到运行时对象上：

```ts
const pianoKeyIds = [root, ...formula.semitonesList.map(s => (root + s) % 12)]
// + 排序、双映射表、notesNum,全部按同样规则重建
```

对消费端（Find 模块、Chord 类、全部测试）来说，运行时对象的形状与以前**一字段不差**——它们读 `chord.pianoKeyIdsSorted` 拿到的值和以前逐字节相同。

删盘之前设了放行门槛：enrich 值与预存值的 **1056 条 × 5 字段 = 5280 项逐值比对**，全部相等才允许动 JSON。这道校验固化在 `ts-dev/verify/proveNoDataLoss.ts`，随时可以重跑（从 git 历史取旧 JSON 与当前运行时对象对照）。

### 2.3 内存与速度的真相

有人会问：这是拿体积换速度吗？不是，两边都是赚的：

| 维度 | v3 | v4 |
|---|---|---|
| 磁盘 JSON | 2.1MB | 1.1MB |
| 运行时实例对象 | 1056 条 × 8 字段 | 1056 条 × 8 字段（enrich 算回，一样大） |
| 哈希索引 | 无 | Map 781 桶，**装的是同一批对象的引用而非拷贝**，<100KB |
| 加载时 CPU | 0 | +0.2ms（enrich + 建桶，一次性） |

「预存结果换免计算」才是经典的体积换速度——v3 的实例表就是。v4 连这笔都不用付：公式表足够小、推导足够便宜、索引只存 8 字节的引用。

## 3. 查找引擎：从线性到哈希

### 3.1 音集哈希桶

核心索引是 `CHORD_INSTANCE_SOUNDSET_MAP`（模块加载时构建，进程内常驻）：

```
键 = pianoKeyIdsSorted.join(",")     如 "0,4,7"
值 = 该音集的全部实例(数组,元素是同一批对象的引用)
```

输入的旅程：`[7,4,0]` → 去重排序 `[0,4,7]` → 哈希键 `"0,4,7"` → `Map.get` **O(1)** 命中 maj3@0。顺序无关（转位与原位同桶）、重复音免疫（去重）。

基准实测（`ts-dev/verify/benchFindChord.ts`，20000 次查询）：线性扫描 107μs/次 → 哈希索引 **118ns/次，约 900 倍**，且两种实现结果逐条等价。

### 3.2 等和弦：1056 实例 → 781 桶

1056 个实例去重后只有 **781 个音集**——275 个是等和弦。它们天然共享一个桶：查 `{C,E,G,A}` 的桶同时返回 `maj3add6@0`（C6）和 `min7@9`（Am7）。这就是「findChord 返回多解」的数据结构基础：桶回答「这组键是什么」，`rootNoteLocation` 裁决「谁是根」。

一个基础事实为这套结构背书：**同根下公式→音集是单射**（88 个公式在任意一个根音下音集互异，12 个根逐一验证零碰撞）。歧义只存在于跨根的等和弦，而那正是音乐现实。

### 3.3 两层匹配策略

```
输入(pianoKeyId 或 MIDI,内部 mod 12)
  ↓
第一层:Map.get(音集键) ──命中──→ 返回桶(similarity = 1,结束)
  ↓ 未命中
第二层:扫描 enrich 后的 1056 条,过滤:
   ① 子集:输入 ⊆ 候选(用户弹的音全在候选里,无错音)
   ② 特征音:身份音必须弹到——
        七和弦必须含 7 度(3+7 定身份)
        sus 必须含 2 或 4 度(替代三度的音)
        变化五度(aug/dim 5 度)必须弹到
        纯五度与 9/11/13 扩展音可省
   ③ 至少 3 个音
  ↓ 按 jaccard 相似度降序返回(similarity < 1)
```

实测样例：`C-E-B`（省纯五音）→ 第一层空 → 第二层命中 **`maj7@0 sim=0.75`** 排第一；`C-E-G` 不会匹配 dom7（特征音小七度 B♭ 没弹到），但会作为「少弹了 B 的 Cmaj7」返回。

特征音规则是省略音匹配的灵魂：**省略只能发生在非身份音上**。没有它，C-E-G 会同时匹配 Cmaj7 和 C7 和 C6 和……结果列表充满噪音。

### 3.4 与 mtkit 的血缘与超越

mtkit（作者的前一个乐理库，超级钢琴 Spiano 的引擎）的 findChord 是 v4 的直系祖先：

| | mtkit | music12 v4 |
|---|---|---|
| 严格层（Spiano 实际在用） | collect 线性扫描 + isEqual | **音集 Map O(1)**，同语义 |
| 模糊层 | 纯子集判断 | 子集 **+ 特征音规则** |
| 特征音 | 无（C-E-G 会匹配一切包含它的和弦） | 身份音不可省 |

Spiano 调用的 `findChord(list, true)`（严格模式）在 v4 的等价物是 `findChord(list, { isStrict: true })`——语义一致，速度换了三个数量级。模糊层则在继承子集语义之上加了一层乐理判断：mtkit 时代「用户少弹了什么」与「用户弹的不是这个和弦」无法区分，v4 用特征音把这两者分开了。

### 3.5 rootNoteLocation：转位裁决

音集无法回答「谁是根」——这是音高类的本质局限，v4 的态度是**不猜**：

- 不传 `rootNoteLocation`：查所有根，`isRootPosition = false`（信息不足）
- 传了：桶内按根过滤。`[C,E,G]` + 根 0 → `maj3@0 isRootPosition=true`；同输入 + 根 7（坚持 G 是根）→ **0 结果**——{C,E,G} 不存在以 G 为根的公式，库如实拒绝而不是硬凑一个 Gsus 出来

### 3.6 命名度数保护：名实矛盾的防线

省略音匹配有一条铁律：**省掉和弦名里宣示的任何度数 = 名不副实 = 出局**。`maj7add11 omit11`（「都 add11 了又省 11」）这类候选被 `analyzeChordTransform` 过滤——因为省掉宣示音后它退化成更简单的和弦，而那个更简单的候选本来就独立在列表里（`maj7add11 omit11,5` 的信息量不超过 `maj7 omit5`）。

这条防线经过两次修复才闭环：

1. 初版只提取 id 的**第一个**数字（`maj7add11` 只保护 7 度，11 度裸奔）
2. 补全为全部宣示度数后，`dom7add6 omit6` 仍漏网——度数比对走了 `degreeName` 字符串，其半音映射把大六度记成 `"13"`，与 id 的 `add6` 错位。最终改用 `intervalToPianoKeyId` 的**公式真实度数**直接比对

### 3.7 pcset 降级层：任何输入都有诚实的输出

功能和声地图覆盖不了的音集（实测：220 种三音中的 36 种、495 种四音中的 126 种，**全部含半音对**）不是噪音——它们是音级集合论（Forte 体系）的居民。`fallback: "pcset"` 配置让 findChord 永不空手：

```ts
findChord([60, 61, 62], { fallback: "pcset" })
// → { type: "pcset", level: 3,
//     primeFormIds: [0,1,2], forte: "3-1", cnName: "半音簇",
//     nearest: { chordFormulaId: "maj3b5", root: 8,
//                transformString: "omit1 extraP", maskDistance: 2 } }
```

- **prime form**：移调+反转等价类的规范代表（`src/common/keyMask` 的 `primeFormMask`），三音全集 220 种恰收敛为 Forte 3-1~3-12 十二类
- **命名表**：`ts-dev/raw-static/pcset-names.json5`（手编源，三音 12 类齐全，四音 29 类可续编；缺键降级为「未命名 + prime form」照常可用）
- **nearest**：`maskDistance`（对称差位运算）扫 1056 实例取最近，距离 ≤4 才给参考
- **记号约定**：`omit{度数}`（候选和弦里该度的音没弹到）与 `extra{键 symbol}`（多弹了 PQXYZ 哪个键）——两种数字语义严格区分

返回类型为判别联合 `I_FindResult = I_ChordFindResult | I_PcsetResult`（`type`/`level` 字段分流），和弦分支保留全部历史字段；**fallback 默认关闭 = 行为零变化**。

### 3.8 恐怖测试与全量报告

`C(12,3)=220` 与 `C(12,4)=495` 全集压测：

| | 三音 220 | 四音 495 |
|---|---|---|
| 完全匹配 | 29.1% | 40.6% |
| 两层和弦层 | 83.6% | 74.5% |
| + pcset 兜底 | **100%** | **100%** |

无匹配音集全部含半音对（三音收敛为 3 个移调等价类、四音 11 个）——非三度堆叠结构的乐理边界。全量结果逐组列表于 `ts-dev/find-report-220.md`（`gen220Report.ts` 可重跑刷新），音名用 pianoKeySymbol 标注（黑键 PQXYZ）。

## 4. 验证体系：每层都有独立证据

这次升级的每个环节都配了可重跑的机器验证，互相独立、互为印证：

| 验证器 | 断言数 | 守护什么 |
|---|---|---|
| `verify/verifyChordFormulas.ts` | 733 | json5 源展开重建与产物逐字段全等；tags 与 deriveTags 对拍；结构契约（恰 6 个完整根、$set 全同名、无环） |
| `verify/proveNoDataLoss.ts` | 5280 | git 历史旧 JSON vs 当前运行时对象——「消失」的 5 字段逐值相等 |
| `verify/benchFindChord.ts` | — | 线性 vs 索引基准，结果等价性抽验 |
| `verify/verifyScales.ts` | 12354 | 乐理级对拍（Note.getNoteByInterval 重算音阶 vs 数据） |
| `test/vectors/`（黄金向量） | 1699 | API 输入→输出全量快照，重跑零差异 = 行为零漂移 |
| `test/unit/find.test.ts` 等 | 241 | 语义级断言，含等和弦双解、enrich 契约、特征音规则、pcset 降级、命名度数保护 |
| `verify/terrorTestFinal.ts` | 715 输入 | C(12,3)+C(12,4) 全集压测，fallback 开启后覆盖率 100% |

其中黄金向量是「功能不变」的最终裁判：v4 动了这么多刀，1699 条向量重跑一个字节没变。

## 5. 设计哲学：可推导的不落盘

整个 v4 和弦升级贯穿一条原则：

> **存储里只放不可推导的信息；可推导的派生物，要么在编译时算回（公式表的派生字段），要么在加载时算回（实例表的音集层），要么建引用索引（音集哈希桶）。**

三个层次的共同点是：**同一事实只在源头存一遍**。公式表存 intervalList，semiTones 从它算；实例表存记谱层，音集从公式算；查找引擎存引用，桶从实例建。每一层的「消失的数据」都有等价校验背书，每一次提速都没有用体积去换。

这条原则的下一个台阶已经**部分落地**：`src/common/keyMask/` 模块实现了 12-bit 音集位模式——`rotate`（循环移位=移调）、`isSubsetOf`（`(sub & ~sup) === 0`）、`maskDistance`（对称差）、`canonicalForm`（移调等价类指纹）、`primeFormMask`（移调+反转等价类/Forte 键），以及 88 个公式的根归一化 pattern 表和 `transposeFamily` 转位族查询（输入音集循环移位 12 次查 pattern 表，双向对拍与哈希桶完全一致）。余下的展望：第二层匹配的数组 intersection 换成位运算内核，与 pcset 的 nearest 扫描共用同一次位掩码循环。

均分八度的对称家族在这个体系里有漂亮的位置：增三=三等分（4+4+4，一组键三个名字）、减七=四等分（3+3+3+3，四个名字）、三全音=二等分（G7 与 D♭7 共享 3-7 那对三全音=三全音代理的数学根基）。`transposeFamily` 一查便见：`[C,E♭,G♭,B♭♭]` 一次返回 dim7@C/E♭/G♭/A 四个根。

## 附：文件地图与常用命令

```
ts-dev/raw-static/chord-formulas.json5   公式极简源(88 个,基座 DSL,手改这里)
ts-dev/raw-static/pcset-names.json5      集合命名源(Forte 分类,手编)
ts-dev/compileStaticData.ts              编译器(json5 → static-data,展开+回填)
ts-dev/generateChordInstances.ts         实例生成器(只产记谱层)
static-data/chord-formulas.json          公式产物(编译产物,勿手改)
static-data/chord-instances.json         实例产物(1.1MB,记谱层)
static-data/pcset-names.json             集合命名产物
src/Chord/static/chord-instance-data.ts  加载器(enrich + 音集哈希桶)
src/common/keyMask/                      12-bit 位模式引擎(pattern 表/转位族/prime form)
src/Find/findChord/                      两层匹配引擎 + pcset 降级层
ts-dev/verify/                           验证器家族(本章各表所列)
ts-dev/find-report-220.md                C(12,3) 全量查找报告(可重跑刷新)
```

```bash
pnpm gen:static-data                    # 编译+生成全部数据(幂等,重跑零差异)
npx tsx ts-dev/verify/verifyChordFormulas.ts   # 733 项
npx tsx ts-dev/verify/proveNoDataLoss.ts       # 5280 项
npx tsx ts-dev/verify/benchFindChord.ts        # 900x 基准
```
