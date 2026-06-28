# 和弦公式（ChordFormula）

和弦公式定义「一个和弦由哪些音程构成」，和根音无关。比如 `maj3` 就是「大三度 + 纯五度」，不管根音是 C 还是 F#。music12 内置了 87 个公式，覆盖从三和弦到十三和弦、从自然到变化音的各种和弦。每个公式还带有自动推导的多维标签（tags），方便按维度查询。

理解「公式」和「实例」的区别很重要：公式是抽象的音程结构（dom7 = 大三 + 纯五 + 小七），实例是公式配上具体根音（dom7 + C = C7 = C-E-G-Bb）。87 个公式 × 12 个根音 = 1044 个和弦实例。`Chord` 类用的是实例，`ChordFormula` 管的是公式。

## 公式长什么样

```ts
import { CHORD_FORMULA_META_MAP } from "music12/chord-formula"

const dom7 = CHORD_FORMULA_META_MAP["dom7"]
console.log(dom7.cnName)        // "属七"
console.log(dom7.intervalList)  // [["maj",3],["p",5],["min",7]]
console.log(dom7.notesNum)      // 4
console.log(dom7.tags)          // ["chord7", "dom"]
```

`intervalList` 是公式的灵魂——它定义了这个和弦从根音开始，往上叠哪些音程。dom7 是大三度、纯五度、小七度；maj7 是大三度、纯五度、大七度。唯一区别是七度音程的类型（min vs maj），但这就是属七和大七的全部差异——一个紧张（dom7 解决到主），一个柔和（maj7 漂浮）。

87 个公式按家族组织在 18 个文件里（`FAMILIES/` 目录）：三和弦族、七和弦族、九和弦族、变音族……每个文件定义一族相似的公式。

## 标签系统（tags）

每个公式都有多维标签，从 `intervalList` 自动推导，不用手填。标签是 v3 的新特性，替代了旧的单一 `family` 字段（旧字段只有 "chord7"/"dom9alter" 这种混编分类，边界模糊）。标签分 5 个维度：

| 维度 | 标签 | 回答什么问题 |
|---|---|---|
| 家族 | `chord3` `chord7` `chord9` `chord11` `chord13` `sus` | 这是几和弦 |
| 扩展 | `ext5` `ext7` `ext9` `ext13` | sus 和弦扩展到哪一级 |
| 性质 | `maj` `min` `dom` `maj7` `minmaj7` `dim` `halfdim` `aug` | 大/小/属/减/增 |
| 变音 | `altered` `sharp5` `flat5` `sharp9` `flat9` `sharp11` `flat13` | 改了哪些音 |
| 结构 | `add` `add6` | 是不是 add 和弦 |

一个公式可以有多个标签，从不同维度描述同一个和弦：

```ts
CHORD_FORMULA_META_MAP["dom9#5"].tags
// ["chord9", "dom", "altered", "sharp5"]
// 含义：九和弦 + 属功能 + 含变音 + 升了五度

CHORD_FORMULA_META_MAP["dim7"].tags
// ["chord7", "dim", "altered", "flat5"]
// 含义：七和弦 + 减性质 + 含变音 + 降了五度

CHORD_FORMULA_META_MAP["sus2"].tags
// ["sus", "ext5"]
// 含义：挂留和弦 + 扩展到 5 度级别
```

### 性质标签怎么来的

性质由 3 度和 7 度的音程类型组合决定——这是和弦的「身份」：

- 大三 + 小七 = `dom`（属七，紧张，要解决）
- 大三 + 大七 = `maj7`（大七，柔和，色彩丰富）
- 小三 + 小七 = `min`（小七，暗淡）
- 小三 + 减五 + 小七 = `halfdim`（半减七，m7b5）
- 小三 + 减五 + 减七 = `dim`（全减七，对称，可四处解决）

### 家族标签怎么来的

按音数和三度堆叠链的连续性判定。1→3→5→7→9→11→13 连续堆叠到哪一级，就是 chord 几。缺中间度数的（如 maj3add9 有 9 度但没 7 度）归为 add 结构。挂留和弦（无三度）独立成 sus 家族。

## 按标签查询

`getChordFormulaByTags` 是标签系统的主要价值——你可以跨家族、跨维度地查询和弦，不再受限于旧的单一 family 分类：

```ts
import { getChordFormulaByTags } from "music12"

// 所有属功能的变音和弦（跨家族：dom7#5、dom9#5、dom11b5...）
getChordFormulaByTags(["dom", "altered"])

// 所有扩展到 13 度的挂留和弦
getChordFormulaByTags(["sus", "ext13"])

// 所有减性质和弦
getChordFormulaByTags(["dim"])  // [dim3, dim7]

// 所有升五和弦（跨性质：aug3、dom9#5、maj9#5...）
getChordFormulaByTags(["sharp5"])

// 爵士 alt 和弦：属功能 + 降九
getChordFormulaByTags(["dom", "flat9"])

// 空标签 → 返回全部 87 个
getChordFormulaByTags([]).length  // 87
```

多标签是**交集**（AND）——公式必须同时含所有给定标签才返回。这比旧的 `getDom7AlterList()` 之类按家族硬编码的查询灵活得多。

## 标签推导原理

标签不是手填的，而是 `deriveTags` 函数从 `intervalList` 自动算出来的。这意味着如果你新增一个公式，只要定义 `intervalList`，tags 自动生成——不会出现分类不一致的问题（旧 family 字段就有这种问题，导致出现过 6 个 tsc 错误）。

```ts
import { deriveTags } from "music12"

deriveTags([["maj", 3], ["aug", 5], ["min", 7], ["maj", 9]])
// ["chord9", "dom", "altered", "sharp5"] —— 自动推导
```

## 为什么用 tags 替代旧的 family

旧版 music12 用单一 `family` 字段分类和弦（如 `"chord7"`、`"dom9alter"`、`"chordSus"`），但它把「音数」和「色彩」两个正交维度塞进一个字段，导致边界模糊：`dom9#5` 算 `dom9alter` 还是 `chord9`？`maj7add11` 算 `chord7add` 还是 `maj7alter`？这种模糊曾经导致 6 个 tsc 错误（barrel 引用了不存在的公式，因为分类混乱让人加错了）。

tags 用多维标签解决了这个问题——每个维度独立标注，一个和弦可以同时是「九和弦」(`chord9`) + 「属功能」(`dom`) + 「含变音」(`altered`) + 「升五」(`sharp5`)，互不干扰。查询时按需组合维度，不再受单一分类的限制。

旧 family 字段保留向后兼容（`ChordClass.family` 仍可读），但新代码应该用 tags。

## 87 个公式的分布

了解公式的分布有助于构建查询直觉：

| 家族标签 | 数量 | 典型公式 |
|---|---|---|
| `chord3` | ~13 | maj3, min3, dim3, aug3, maj3add6, maj3add9... |
| `chord7` | ~19 | maj7, dom7, min7, dim7, halfdim7, dom7#5, dom7b9... |
| `chord9` | ~18 | maj9, dom9, min9, dom9#5, dom9#11, maj9b5... |
| `chord11` | ~11 | maj11, dom11, min11, dom11b5, dom11b9... |
| `chord13` | ~14 | maj13, dom13, min13, dom13#5, dom13#11... |
| `sus` | 12 | sus2, sus4, dom7sus2, dom7sus4, dom13sus4... |

变音和弦分散在各家族里——`dom7#5` 在 chord7 家族但带 `sharp5` 标签，`dom9#11` 在 chord9 家族但带 `sharp11` 标签。所以查「所有升五和弦」要用 `getChordFormulaByTags(["sharp5"])` 跨家族查，而不是只看某个 family。

## 实战场景

### 查某类和弦的全部公式

想知道库里有哪些九和弦？哪些属变音和弦？一句查询搞定：

```ts
getChordFormulaByTags(["chord9"])         // 所有九和弦
getChordFormulaByTags(["sus"])            // 所有挂留
getChordFormulaByTags(["dom", "flat9"])   // 所有含降九的属和弦
```

### 看一个公式的完整信息

```ts
const maj7 = CHORD_FORMULA_META_MAP["maj7"]
console.log(maj7.cnName)       // "大七"
console.log(maj7.intervalList) // [["maj",3],["p",5],["maj",7]]
console.log(maj7.tags)         // ["chord7", "maj7"]
console.log(maj7.scoreDisplay) // 记谱显示
```

### 验证和弦分类

想确认 dom9#5 确实是「九和弦 + 属 + 变音 + 升五」？查它的 tags 就知道：

```ts
CHORD_FORMULA_META_MAP["dom9#5"].tags
// ["chord9", "dom", "altered", "sharp5"] —— 确认无误
```
