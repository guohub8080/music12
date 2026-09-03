# decompose — 和弦识别管线完整文档

> 本文件夹承载从「乐理公式」到「任意输入的全量识别结果」的完整管线。
> **AI/开发者请先读本文件**——这里记录了管线的每一步逻辑、数据流向和硬性规则。

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
        │  实例生成器:ts-dev/generateChordInstances.ts
        │  · 每个公式 × 12 个根音 = 1056 个实例
        │  · 每个实例含记谱层(notes:根音拼法变体 + 每键拼写)
        ▼
static-data/chord-instances.json           ← 1056 个实例(1.1MB,记谱层)
        │
        │  倒推引擎:ts-dev/decompose/engine.ts + bake.ts
        │  · 穷举 C(12,3) = 220 种三音组合
        │  · 每种组合在 1056 个基座中穷尽搜索
        │  · 硬性排除 + 加权 cost → tier 分组
        ▼
static-data/chord-hash-3.json              ← 预计算查询表(111KB)
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

---

## 第 5 步:生成 tier 分组报告

**命令**: `npx tsx ts-dev/decompose/hash3-report.ts`

**输出**: `ts-dev/hash3-report.md`

- 按 tier 1→6 分大区(Tier 1 的键集在最前面)
- 区内每个键集一张表(tier 列 + 公式 id + 变换记号 + cost)
- 顶部统计表(各 tier 键集数)

---

## 运行时查找(消费端)

```ts
import { findByHash } from "music12/find"

findByHash([0, 4, 7])   // C-E-G → [{ t:1, f:"maj3", n:"", c:0 }]
findByHash([0, 1, 2])   // C-P-D → [{ t:3, f:"maj7sus2", n:"(♭2 omit5)", c:1 }]
```

一次 O(1) 哈希查找,返回按 tier 排序的全部解释。

---

## 乐理依据

详细的乐理规则、参考来源(Mark Levine/Berklee/Jazz Piano Site)见 [theory.md](./theory.md)。

## 文件清单

```
ts-dev/raw-static/chord-formulas.json5   ← 第 1 步:手编源(88 个公式)
ts-dev/compileStaticData.ts              ← 第 2 步:编译器(json5 → json)
ts-dev/generateChordInstances.ts         ← 第 3 步:实例生成器(1056 个)
ts-dev/decompose/engine.ts               ← 第 4 步:倒推引擎(搜索 + 变换)
ts-dev/decompose/bake.ts                 ← 第 4 步:烘焙器(C(12,3) → 哈希表)
ts-dev/decompose/hash3-report.ts         ← 第 5 步:报告生成器
ts-dev/decompose/theory.md               ← 乐理依据(cost/tier 规则)
ts-dev/decompose/README.md               ← 本文件(管线文档)
static-data/chord-formulas.json          ← 第 2 步产物
static-data/chord-instances.json         ← 第 3 步产物
static-data/chord-hash-3.json            ← 第 4 步产物(运行时查这个)
ts-dev/hash3-report.md                   ← 第 5 步产物(人类可读)
```

## 下一步(待做)

- 四音 C(12,4)=495 穷举(chord-hash-4.json)
- 五音 C(12,5)=792 穷举(chord-hash-5.json)
- findByHash 接入 findChord 主路径
