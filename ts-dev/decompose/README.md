# decompose — 和弦识别管线完整文档

> 本文件夹承载从「乐理公式」到「任意输入的全量识别结果」的完整管线。
> **AI/开发者请先读本文件**——这里记录了管线的每一步逻辑、数据流向和硬性规则。

## 核心设计理念:穷举是审核工具,不是最终产品

烘焙流程的本质是**人机协作的三步循环**:

```
第一步:机器穷举(220 组 × 1056 基座,穷尽一切可能的解释)
          ↓
第二步:人工审核(翻阅穷举报告,逐组判断,产物写进两个 json5)
  ├── 「这组硬解释成和弦很牵强,它有自己的音响身份」
  │     → 升格为命名 set:raw-static/special-sets.json5
  └── 「这组该保留哪些解释、什么顺序」
        → 模式化的写规则 / 个案的写裁决:raw-static/bake-rules.json5
          ↓
第三步:烘焙(机器结果 + 人工规则,经三层保留管线固化进哈希表,运行时 O(1) 查询)
```

**穷举报告不是最终产品,是给人类做审核的工具。**
没有这 220 组的全量数据,不可能系统地判断哪些该是和弦、哪些该是 set——
只能凭个案感觉。穷举把所有的「灰色地带」摊开在桌面上,一次看全、一次判定。

**最终判定权不在 cost 函数手里,在人类手里。**
cost 函数只是候选提案者,人类是裁决者。
穷举报告就是给裁决者用的「案卷」——报告里每条都标注来源
(✋ 人工裁决 / ⚙ 类型化规则 / 🗑 被过滤),被滤掉的条目灰显可见,裁决可追溯。

典型案例:C-E♭-E(根音+小三度+大三度)
- 引擎说:min3(omit5 add3) cost=0.5——技术上成立
- 人类裁决:不——这不是「小三和弦的修改」,这是「分叉三度」(split third)
  一个独立的音响概念(布鲁斯三度/混合三度),应该是 set 而不是 chord
- 结论:升格为命名 set,不再以 chord 变换的形式出现在哈希表中

## 管线总览

```
ts-dev/raw-static/chord-formulas.json5     ← 一切的起点:手编乐理源
        │
        │  pnpm gen:static-data(编译器:ts-dev/compileStaticData.ts)
        │  · $base/$set/$add DSL 递归展开 → 完整 intervalList
        │  · 派生字段回填(见下方「派生规则」)
        ▼
static-data/chord-formulas.json            ← 88 个公式的标准 JSON(35KB)
        │
        │  基座生成器:ts-dev/decompose/gen-base.ts
        │  · 读 chord-formulas.json(不依赖 src,自给自足)
        │  · 88 公式 × 12 根 = 1056 个实例
        │  · 含全部音集字段(pianoKeyIds/sorted/双映射/notesNum)
        ▼
ts-dev/decompose/base-instances.json       ← 烘焙管线的基座(634KB,含音集)
        │
        │  倒推引擎:ts-dev/decompose/engine.ts + bake.ts
        │  · 穷举 C(12,3) = 220 种三音组合
        │  · 每种组合在 1056 个基座中穷尽搜索
        │  · 硬性排除 + 加权 cost → tier 分组
        │  · 三层保留管线(policy/rules/verdicts,定义在 bake-rules.json5)
        ▼
static-data/chord-hash-3.json              ← 预计算查询表(120KB)
        │
        │  报告生成:ts-dev/decompose/hash3-report.ts
        ▼
ts-dev/hash3-report.md                     ← 人类可读报告(按 tier 分大区)
```

---

## 第 1 步:公式源(json5)

**文件**: `ts-dev/raw-static/chord-formulas.json5`

**内容**: 88 个常用和弦公式,以**基座 DSL** 消除冗余。

### 基座 DSL 三键

```json5
// 完整定义(仅 6 个根:maj3/min3/dim3/aug3/sus2/sus4)
"maj3": {
  "intervalList": [["maj", 3], ["p", 5]],
  "cnName": "大三", ...
}

// $base:继承基座的 intervalList(可链式)
"dom7": {
  "$base": "maj3",
  "$add": [["min", 7]],       // 在基座上追加小七度
  ...
}
// 展开 → [["maj",3],["p",5],["min",7]]

// $set:替换基座中某度数的性质
"dom7#5": {
  "$base": "dom7",
  "$set": { "5": "aug" },     // 纯五度 → 增五度
  ...
}
// 展开 → [["maj",3],["aug",5],["min",7]]
```

### 无环保证

基座引用必须满足**性质秩严格偏序**:
`p=0, maj=0(基准) < min=1 < aug=2, dim=2(变音) < aug+/dim-=3`

严格偏序 → 引用图天然为 DAG,不可能出现 A 引用 B、B 又引用 A 的死循环。

### 基座选择规则

1. **$set 仅限同名前缀**:dom7#5 基于 dom7(名字即意图);跨 id 禁用 set
2. **跨 id 只许 $add 堆叠**:dom7 = maj3+min7(正统堆叠视角)
3. **操作数最少者优先**;平手同名前缀优先;再平手按键序

### 每条记录的注释格式

```
// dom7 · 属七 · C-E-G-B♭ · maj3=4 p5=7 min7=10    ← 展开快照(第一行)
//   属七和弦,由大三和弦加小七度音构成                ← 原描述(第二行)
```

---

## 第 2 步:编译为标准 JSON

**命令**: `pnpm gen:static-data`(内部调 `ts-dev/compileStaticData.ts`)

**输入**: `chord-formulas.json5`(88 条,极简源)

**输出**: `static-data/chord-formulas.json`(88 条,完整数据)

### DSL 展开算法

```
expand(公式 id):
  1. 如果有 $base → 递归 expand($base) 得到基座的 intervalList
  2. 如果有 $set → 替换基座中对应度数的性质
  3. 如果有 $add → 追加到尾部
  4. 按度数升序排列
```

### 派生字段回填规则

| 字段 | 派生公式 | 说明 |
|---|---|---|
| `chordFormulaId` | 从对象键回填 | 键即 id(如 "dom7#5") |
| `semitonesList` | `intervalList.map(([t,n]) => gap(t,n))` | 每音距根音的半音数 |
| `notesNum` | `intervalList.length + 1` | 含根音的总音数 |
| `degreeToIntervalMap` | `{str(n): t}` | intervalList 的 map 形态 |
| `tags` | `deriveTags(intervalList)` | 五维标签(家族/扩展/性质/变音/结构) |
| `scoreDisplay` | 原样保留(手编) | 乐谱记号(如 "M7"、"7♭9") |

其中 **gap 复合音程公式**:
```
gap(type, N) = INTERVALS[type, ((N-1)%7)+1].semitoneGap + 12 × floor((N-1)/7)
例:maj9 = maj2(2半音) + 12 = 14;aug11 = aug4(6半音) + 12 = 18
```

---

## 第 3 步:生成 12 根音的全量实例

**命令**: `pnpm gen:static-data`(同一命令的第 2 步)

**输入**: `static-data/chord-formulas.json` + Note/Interval 乐理类

**输出**: `static-data/chord-instances.json`(1056 条)

### 生成逻辑

```
for 公式 in 88 个:
  for rootPianoKeyId in 0..11:
    rootNote = 该键的第一个 normal 拼法
    notes = 每个根拼法变体的完整记谱展开(黑键根有 C♯/D♭ 两个变体)
    → 存入实例(只存记谱层,音集层由加载器 enrich)
```

### 实例字段说明

| 字段 | 层 | 说明 |
|---|---|---|
| `pianoKeyIdRoot` | 标识 | 根音键(0-11) |
| `chordFormulaId` | 标识 | 公式 id |
| `notes` | **记谱层** | 根拼法变体数组,每个含 notesMap(键→step/alter/octaveGap) |

音集层字段(pianoKeyIds/sorted/双映射/notesNum)由 `src/Chord/static/chord-instance-data.ts` 加载器实时 enrich。

---

## 第 4 步:穷举三音组合并倒推

**命令**: `npx tsx ts-dev/decompose/bake.ts`

**引擎**: `ts-dev/decompose/engine.ts`(倒推核心) + `bake.ts`(穷举+烘焙)

### 倒推引擎逻辑(engine.ts)

```
输入: 排序去重的 pianoKeyId 数组(如 [0,1,2])
遍历: 1056 个实例
  1. 根音必须在输入键集里 → 不在则跳过
  2. 计算集合差异:
     - toAdd:  输入有但公式没有的键
     - toOmit: 公式有但输入没有的键
  3. 尝试将 omit+add 配对为 alter:
     add 键与 omit 键相对根音的半音差 = ±1 → 同度数的升降
  4. 构建 transform 操作列表:
     - alter: ♯N 或 ♭N(度数 N 升/降半音)
     - omit:  omitN(去掉度数 N)
     - add:   addN(加上度数 N)
输出: 按加权 cost 排序的方案列表
```

### 硬性排除规则(bake.ts)

| 规则 | 检查 | 乐理依据 |
|---|---|---|
| 根音必须在输入里 | `inputSet.has(root)` | 根音定义和弦身份 |
| 命名度数不可省 | `getNamedDegrees(f).includes(degree)` → Infinity | maj13 omit13 名不副实 |
| sus 不可加三度 | `degree===3 && f.includes("sus")` → Infinity | sus 定义就是没三度 |
| 升降步长 ≤1 | `Math.abs(offset) >= 2` → Infinity | 每次操作只允许 ±1 半音 |

### 加权 cost 函数(bake.ts)

**omit 的代价**:
```
omit5          → cost 0    纯五度不定义性质,省了白省
omit11         → cost 0    avoid note(与三度冲突),省掉是预期
omit9/omit13   → cost 0.5  扩展音(不是命名度数时),色彩音
omit3/omit7    → Infinity  guide tones,省了身份丢失
其他(如 omit6) → cost 1
```

**alter(升降)的代价**:
```
|offset| ≥ 2   → Infinity  步长≥2 硬性排除
属七家族        → cost 1    张力驱动解决——属七的职责
非属七          → cost 3    avoid note 冲突
```

**add(新增)的代价**:
```
sus 公式 + add3 → Infinity  违反 sus 定义
|offset| ≥ 2    → Infinity
offset=0        → cost 0.5  自然扩展(9/11/13)
属七家族         → cost 1
其他            → cost 3
```

### tier 分组规则

```
tier 1 ✅ 完全命中:cost=0 且零变换(你弹的就是这个和弦)
tier 2 🔵 预期省略:cost=0 纯 omit5/omit11(和弦本身不变)
tier 3 🟢 自然扩展:cost≤1(add9/11/13 或属七合法变化)
tier 4 🟡 组合变换:cost≤2(多重省略+扩展,仍然合理)
tier 5 🟠 边缘:    cost≤3(涉及 avoid note,乐理上勉强)
tier 6 🔴 极端:    cost>3(多重冲突——几乎不会这样解释)
```

### 保留管线(三层,定义在 bake-rules.json5)

倒推+cost+tier 是**机器提案**;哪些提案最终进哈希表,由三层保留管线决定。
规则的正式定义在 `ts-dev/raw-static/bake-rules.json5`(数据,不是文档),
bake.ts 逐层执行:

```
机器产物:全量条目池(set 条目 + 全部 chord 解释,带 tier)
   ↓ 第一层 policy     机械截断:maxEntries / tierCeiling(最后执行)
   ↓ 第二层 rules      类型化规则:when/then 声明式过滤,管 99% 的模式化噪音
   ↓ 第三层 verdicts   人工裁决:prime form 为键,逐键集钦定保留(优先级最高)
   → 固化:chord-hash-3.json(verdict 条目带 src:"v" 标记)
   → 审核 sidecar:filtered-3.json(被过滤条目清单,报告灰显)
```

| 层 | 谁决定 | 管什么 | 改动生效方式 |
|---|---|---|---|
| policy | 通用参数 | 每键集条数上限、tier 上限 | 改 json5 → 重跑 bake |
| rules | 模式化判断 | exact-exclusive:完全命中即唯一解释(等和弦多名全保留);set-exclusive:set 命中时 chord 只留 cost=0 平行解释 | 改一处全表生效 |
| verdicts | 人工逐例 | 规则覆盖不了的争议/顺序钦定 | 改一处,12 个移调全生效 |

**verdicts 的键是 prime form(移调规范形)**——`ts-dev/decompose/keyset.ts` 提供:
键集内每个音轮流当起点 0,取数值字典序最小的形态(不做倒影等价,大小三和弦必须区分)。
如 {0,2,11}(C-D-B)的 prime form 是 "0,1,3"(Forte 3-2,Phrygian 三音形),
人工裁决写一次,自动对称作用于全部 12 个移调——与 special-sets 用 offsets 的精神一致。

verdict 条目结构(以 Phrygian 形为例):
```json5
"0,1,3": {
  "anchor": "spset-phrygian",          // 锚点 set:在该键集上唯一确定根音
  "keep": [
    { "type": "anchor" },              // 锚点 set 条目本身
    { "type": "chord", "formula": "maj7sus2", "rootShift": 1 },  // 根音=锚点根音+1
  ],
  "filterRest": true,                  // 未列入 keep 的全部过滤
}
```
锚点根音 + rootShift 表达「相对偏移」,保证移调后匹配依然精确
(C-D-B 上是 Cmaj7sus2,D-E-C# 上自动变成 Dmaj7sus2)。

**人工审核工作流**:看 hash3-report.md(标注+灰显)→ 判断 → 改
`bake-rules.json5`(或 special-sets.json5)→ `pnpm gen:static-data` → 重跑 bake + report。
keep 条目匹配不到时 bake 会警告(人工数据过期的信号,不静默)。

---

## 第 5 步:生成 tier 分组报告

**命令**: `npx tsx ts-dev/decompose/hash3-report.ts`

**输出**: `ts-dev/decompose/hash3-report.md`

- 按 tier 1→6 分大区(Tier 1 的键集在最前面)
- 区内每个键集一张表(tier 列 + 公式 id + 变换记号 + cost)
- 来源标注:✋ = 人工裁决钦定(附审核注释)/ ⚙ = 该组被类型化规则处理
- 被保留管线过滤的条目灰显(读 filtered-3.json sidecar)——审核的依据
- 顶部统计表(各 tier 键集数)

---

## 运行时查找(消费端)

```ts
import { findByHash } from "music12/find"

findByHash([0, 4, 7])   // C-E-G → [{ t:1, f:"maj3", n:"", c:0 }]
findByHash([0, 1, 2])   // C-P-D → [{ t:1, f:"spset-chromatic_cluster", set:true, cn:"半音簇" }]
```

一次 O(1) 哈希查找,返回按 tier 排序的全部解释。

---

## 乐理依据

详细的乐理规则、参考来源(Mark Levine/Berklee/Jazz Piano Site)见 [theory.md](./theory.md)。

## 经验教训(三表全谱审核实录,2026-09-04 ~ 09-07)

三音(220 键集)→ 四音(495)→ 五音(792)全谱人工审核中,以下教训被
真实踩过、被机制抓住、或被用户直觉点破——新音层审核(K=6+)与管线
改动前先读这里。

### 一、人工数据的错误形态(防线体系各自抓过)

| 教训 | 抓它的机制 |
|---|---|
| verdict 键手写成 C 根形态,不是 primeForm() 输出("0,3,4"≠"0,1,9";五音两次:0,1,5,6,7→0,1,2,7,8) | 键自检:非规范键警告+归位 |
| verdict keep 全部未匹配仍静默产出**空键集**(12 组数据损坏) | keep 全未匹配 → exit(1) 拒绝烘焙 |
| 批量插入脚本拼出 json5 双层闭合(verdicts 对象被提前关闭) | json5 解析直接崩(gen 失败) |
| 同度双音(♭3·♮3)条目进了主表,Chord 面板单态恢复丢音 | 第 0 层硬排除 + 全量 round-trip 终检 |
| add 撞公式已有度数 / alter 非 maj/p 基准度数(面板不可达) | 引擎层事前排除(终检曾首杀) |

**结论:错误一定会发生,可靠的唯一方式是让每个错误都有对应的致命信号。**
警告不处理就会变成静默损坏——空组防线就是警告进化为 exit(1) 的实例。

### 二、乐理判据(用户裁决中沉淀的判例法)

1. **等音标签跟着结构位置走**:♯5/♭13、♯11/♭5 是同一键的两种身份,
   纯五度在场 → 挂色彩音记 ♭13/♯11;五度缺席 → 改写骨架记 ♯5/♭5
   (augmaj7/maj7b5/dom7b5/minmaj7b5 加 add4「四姐妹」+ minmaj7#5/halfdim7 等六例)。
2. **guide tone 变形 = set 呼吁的嗅觉标志**:transform 出现 sharp:3 /
   flat:3 / sharp:7(Hijaz ♯7、梦之和弦加四 ♯3 等七次同症)——属七的
   3/7 度被升降,该解释基本已死,优先考虑 set。
3. **记法跟语境走**:三音语境无八度支撑记 add2 不记 add9({0,2,4});
   七和弦语境 6 度升记 13(maj13b9 优于 maj7b9(add6))。方向:度数
   标签诚实反映当前和弦的音区结构。(引擎 gap→度数语境化是挂起立项)
4. **公式本体 + 唯一外挂 = 钉死模板**:公式四音全在场 + 单个自然
   add/omit 的 0.5 解释,默认钉 chord 不升 set(t3 区绝大多数)。
5. **升 set 三判据**:无 cost0 + chord 全凑数 + 身份(正名/家族直系/
   对称)。家族血统本身可作升格依据(库内 set 的 N+1 音延伸),
   无流通名也可(Viennese 先例,学院标签级)。
6. **同根去冗,异根保留**:同根音的省略记法还原后与完全命中等价,
   只留无变换;不同根音是等和弦多视角,全保留(dom7b5 三全音双名/
   C6-Am7/三根音 verdict)。捞回模式(filterRest:false)可把过滤表
   的异根解释捞回置顶,但同根同事实的记法冗余不捞。

### 三、工程教训

1. **生成器不得依赖消费端**:bake 曾 import restoreChord → @chord 出口
   → findByHash → 静态 import 哈希产物——产物缺失时 bake 无法启动
   (fresh clone 鸡生蛋死锁)。终检独立为 verify-hash.ts 后置。
2. **pnpm 多命令链 OOM**:pretest 用 && 串联五个 npx tsx 子进程,在
   pnpm 壳下长管道缓冲 4GB 耗尽(手动逐步 7s/vitest 单跑正常/仅
   pnpm test 必挂)。修复:build-all.ts 单入口纯函数式调用(3.2s)。
   **教训:必挂的命令不要反复撞,分步定位一次就换路线。**
3. **构建链即自举链**:fresh clone 场景要定期模拟验证(rm 全部产物
   → 全链重建),pretest 曾长期靠工作区残留「假绿」(nan 空表事故)。

### 四、审核工作流(成熟形态)

翻报告 → 无 ✋ 标注的组贴给 AI(结构拆解+搜证+判据比对) → 用户
极简裁决(「只保留这个」/「go」/命名) → 落地 verdict 或 set → 重烘焙
(三移调抽验) → 终检 → commit。带 ✋ verdict(prime form) 的组直接
跳过(同形 12 移调共享裁决)。批量模式需用户明示授权(t5「都能解释
为 set 了,请你更新」),每个仍走完整命名流程。

## 文件清单

```
ts-dev/raw-static/chord-formulas.json5   ← 第 1 步:手编源(88 个公式)
ts-dev/raw-static/special-sets.json5     ← 第 1 步:人工审核的 set 定义(分叉三和弦等)
ts-dev/raw-static/bake-rules.json5       ← 第 1 步:保留管线规则定义(policy/rules/verdicts)
ts-dev/compileStaticData.ts              ← 第 2 步:编译器(json5 → json)
ts-dev/generateChordInstances.ts         ← 第 3 步:实例生成器(1056 个)
ts-dev/decompose/gen-base.ts             ← 第 3 步:基座生成器(1056 个,含音集,自给自足)
ts-dev/decompose/base-instances.json      ← 第 3 步产物(烘焙管线的基座)
ts-dev/decompose/engine.ts               ← 第 4 步:倒推引擎(搜索 + 变换)
ts-dev/decompose/keyset.ts               ← 第 4 步:键集工具(prime form 移调规范形)
ts-dev/decompose/bake.ts                 ← 第 4 步:烘焙器(C(12,3) + 三层保留管线 → 哈希表)
ts-dev/decompose/hash3-report.ts         ← 第 5 步:报告生成器(来源标注 + 灰显过滤)
ts-dev/decompose/filtered-{3,4,5,6}.json   ← 第 4 步 sidecar(被过滤条目,审核用,按 K)
ts-dev/decompose/verify-hash.ts           ← 烘焙后置校验(全量 round-trip,独立于 bake)
ts-dev/build-all.ts                       ← 全量构建单入口(gen → bake 3/4/5 → verify)
ts-dev/decompose/theory.md               ← 乐理依据(cost/tier 规则)
ts-dev/decompose/README.md               ← 本文件(管线文档)
static-data/chord-formulas.json          ← 第 2 步产物
static-data/special-sets.json            ← 第 2 步产物
static-data/bake-rules.json              ← 第 2 步产物
static-data/chord-instances.json         ← 第 3 步产物
static-data/chord-hash-{3,4,5,6}.json       ← 第 4 步产物(运行时查这个,K=音数)
ts-dev/decompose/hash{K}-report.md         ← 第 5 步产物(人类可读,按 K)
```

## 下一步(待做)

- 六音 t3 例外区 7 类(60 组)待裁决(9 度等音对/双 0.5 并列系)
- findByHash 接入 findChord 主路径
- pnpm test 壳层 OOM 根治(环境层;vitest 直跑正常)
- C++ 侧适配(chord-hash 读取)
