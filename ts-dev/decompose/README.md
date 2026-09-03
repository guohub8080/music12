# decompose — 和弦识别管线

> 本文件夹承载从「乐理公式」到「任意输入的全量识别结果」的完整管线。

## 管线步骤(按顺序执行)

### 第 1 步:公式源(json5)

```
ts-dev/raw-static/chord-formulas.json5
```

88 个和弦公式的**手编源**——乐理知识的固化,只收录常用和弦作为基本类型。
基座 DSL(`$base/$set/$add`)消除重复,可带注释。

**这一步是全部数据的起点:改数据只改这里。**

### 第 2 步:编译为标准 JSON(chord-formulas)

```bash
pnpm gen:static-data    # 或单独: npx tsx ts-dev/compileStaticData.ts
```

json5 源 → 展开 DSL + 回填派生字段(semitonesList/tags/...) → `static-data/chord-formulas.json`。
88 个公式,编译产物不可手改。

### 第 3 步:生成 12 个根音的全量实例(chord-instances)

```bash
pnpm gen:static-data    # 同一命令的第 2 步
```

88 公式 × 12 根音 = **1056 个实例**,每个包含记谱层(notes)。
产出 `static-data/chord-instances.json`。

**这一步是查找的依据:所有倒推都基于这 1056 个基座。**

### 第 4 步:穷举三音组合并倒推

```bash
npx tsx ts-dev/decompose/bake.ts
```

- 穷举 C(12,3) = **220 种三音组合**
- 每种组合在 1056 个基座中**穷尽搜索**
- 排除规则(硬性):
  - 根音必须在输入键集里
  - omit 命名度数 → 排除(maj13 omit13 名不副实)
  - sus + add3 → 排除(sus 定义就是没三度)
  - 升降步长 ≥ 2 → 排除(每次操作只允许 ±1 半音)
- 加权 cost 排序(奥卡姆剃刀,乐理依据见 theory.md)
- 6 级 tier 分组(1=完全命中 → 6=极端)
- 产出 `static-data/chord-hash-3.json`(220 键集 × top 10 方案)

### 第 5 步:生成 tier 分组报告

```bash
npx tsx ts-dev/decompose/hash3-report.ts
```

按 tier 1→6 分大区,区内每个键集一张表(公式 id + 变换记号 + cost)。
产出 `ts-dev/hash3-report.md`。

## 运行时查找(消费端)

```ts
import { findByHash } from "music12/find"

findByHash([0, 4, 7])   // C-E-G → [{ tier:1, id:"maj3", notation:"", cost:0 }]
findByHash([0, 1, 2])   // C-P-D → [{ tier:3, id:"maj7sus2", notation:"(♭2 omit5)", cost:1 }]
```

一次 O(1) 哈希查找,返回按 tier 排序的全部解释。

## 文件清单

```
ts-dev/raw-static/chord-formulas.json5   ← 第 1 步:手编源(88 个公式)
ts-dev/compileStaticData.ts              ← 第 2 步:编译器(json5 → json)
ts-dev/generateChordInstances.ts         ← 第 3 步:实例生成器(1056 个)
ts-dev/decompose/engine.ts               ← 第 4 步:倒推引擎(搜索 + 变换)
ts-dev/decompose/bake.ts                 ← 第 4 步:烘焙器(C(12,3) → 哈希表)
ts-dev/decompose/hash3-report.ts         ← 第 5 步:报告生成器
ts-dev/decompose/theory.md               ← 乐理依据(cost/tier 规则)
static-data/chord-formulas.json          ← 第 2 步产物
static-data/chord-instances.json         ← 第 3 步产物
static-data/chord-hash-3.json            ← 第 4 步产物(运行时查这个)
ts-dev/hash3-report.md                   ← 第 5 步产物(人类可读)
```

## 下一步(待做)

- 四音 C(12,4)=495 穷举(chord-hash-4.json)
- 五音 C(12,5)=792 穷举(chord-hash-5.json)
- findByHash 接入 findChord 主路径
