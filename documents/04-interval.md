# Interval（音程）

音程描述两个音之间的距离。这是乐理里最基础的关系——旋律是音程的横向排列，和声是音程的纵向叠加。理解音程，才能理解和弦为什么是这样构成的、调式为什么是这样的形状。

在 music12 里，一个音程有两面：**度数**（三度、五度——这是乐理语义，7 进制）和**半音数**（4 个半音、7 个半音——这是物理事实，12 进制）。两面合在一起，才能区分大三度（4 半音）和小三度（3 半音）。这种「双面性」正是 music12 设计哲学的体现——详见 [Radix 文档](./02-radix.md) 对 7/12 双进制的阐述。

## 音程的 5 种类型

西方乐理用 5 种类型描述音程性质。它们的关系是一条「升降链」：

| 类型 | 代码 | 含义 | 半音关系 |
|---|---|---|---|
| 纯 | `p` | 纯一度/纯四/纯五/纯八 | 基准（1/4/5/8 度） |
| 大 | `maj` | 大二/大三/大六/大七 | 基准（2/3/6/7 度） |
| 小 | `min` | 小二/小三/小六/小七 | 比大少 1 个半音 |
| 增 | `aug` | 比纯/大多一个半音 | 升链上一级 |
| 减 | `dim` | 比纯/小少一个半音 | 降链下一级 |

记忆窍门：**1/4/5/8 度用「纯」**（这些度数没有大小之分），**2/3/6/7 度用「大小」**。从基准出发，升一个半音变成「增」，降一个半音变成「减」（纯系列）或「小」（大系列）。

```ts
import { Interval } from "music12"

const major3rd = new Interval("maj", 3)     // 大三度
const minor3rd = new Interval("min", 3)     // 小三度
const perfect5th = new Interval("p", 5)     // 纯五度
const augmented4th = new Interval("aug", 4) // 增四度（三全音）
const diminished5th = new Interval("dim", 5)// 减五度
```

为什么区分纯和大/小？因为 1/4/5/8 度在声学上最协和（频率比最简单），它们只有一个「标准」状态（纯）；偏离就是增或减。而 2/3/6/7 度有两个「标准」状态（大和小），因为它们在不同调式里自然出现（大调里是大三度，小调里是小三度）。

## 音程的两个属性

每个音程知道自己跨了几度、占几个半音：

```ts
const maj3 = new Interval("maj", 3)
maj3.intervalType  // "maj"
maj3.degree        // 3 —— 三度（7 进制，乐理怎么说）
maj3.semitoneGap   // 4 —— 4 个半音（12 进制，钢琴上怎么弹）
```

`degree` 和 `semitoneGap` 的区别很重要：大三度和小三度的 `degree` 都是 3（都是三度），但 `semitoneGap` 不同（4 vs 3）。乐理上讨论「这是几度」用 `degree`，要在钢琴上找音用 `semitoneGap`。

这张对照表覆盖了所有常用音程的半音数，建议收藏：

| 度数 | 减 | 小 | 大/纯 | 增 |
|---|---|---|---|---|
| 二度 | 0 | 1 | **2** | 3 |
| 三度 | 2 | 3 | **4** | 5 |
| 四度 | 4 | — | **5** | 6 |
| 五度 | 6 | — | **7** | 8 |
| 六度 | 7 | 8 | **9** | 10 |
| 七度 | 9 | 10 | **11** | 12 |

注意四度和五度没有「小」（只有纯/增/减），二度和三度没有「纯」（只有减/小/大/增）。

## 等价音程：同一个声音，不同的记法

有些音程半音数完全相同，但乐理记法不同。最著名的是**三全音**（6 个半音）——它既是增四度也是减五度：

```ts
const aug4 = new Interval("aug", 4)
const dim5 = new Interval("dim", 5)
aug4.semitoneGap === dim5.semitoneGap  // true，都是 6

aug4.getEqualInterval().map(i => `${i.intervalType}${i.degree}`)
// ["dim5"] —— 增四度的等价是减五度
```

为什么需要两种记法？因为它们在不同调性语境里出现：C-F# 在 C 利底亚里是增四度（自然音），C-Gb 在 C 和声小调里是减五度（自然音）。记法不同，声音相同——选哪个取决于调性。

## 工具函数

### 比较两个音的音程

想知道 C 到 G 是什么关系？`getIntervalByComparingNotes` 直接算：

```ts
import { Note, getIntervalByComparingNotes } from "music12"

const c4 = new Note("C", 0, 4)
const g4 = new Note("G", 0, 4)
const interval = getIntervalByComparingNotes(c4, g4)
// { intervalType: "p", degree: 5 } —— 纯五度

const e4 = new Note("E", 0, 4)
getIntervalByComparingNotes(c4, e4)
// { intervalType: "maj", degree: 3 } —— 大三度
```

### 反查：半音数 → 可能的音程

知道两个音差 7 个半音，但不确定该叫纯五还是减六？`getIntervalBySemitoneGap` 给你所有可能：

```ts
getIntervalBySemitoneGap(7) // 可能是纯五度、减六度等
```

一个半音数可能对应多种度数记法，选哪个取决于具体的音名上下文。

### 判断纯音程

1/4/5/8 度（及其八度倍数 11/15）是纯音程，其他不是。这在判断音程能否用「纯」类型时有甩：

```ts
isPureInterval(1)  // true（纯一度）
isPureInterval(3)  // false（三度只有大/小）
isPureInterval(4)  // true
isPureInterval(5)  // true
isPureInterval(8)  // true
isPureInterval(11) // true（纯十一度 = 纯四 + 八度）
```

### 音程滑动

在音程类型之间上/下滑动——做音程变换（如把大三度变小三度）时很有用。纯音程（1/4/5 度）在 `dim → p → aug` 三级之间滑，大/小音程（2/3/6/7 度）在 `dim → min → maj → aug` 四级之间滑：

```ts
import { intervalSlide_145, intervalSlide_2367 } from "music12"

// 纯音程滑动
intervalSlide_145("p", 1)    // "aug"（纯 → 增，+1 半音）
intervalSlide_145("p", -1)   // "dim"（纯 → 减，-1 半音）
intervalSlide_145("dim", 2)  // "aug"（减 → 跳过纯 → 增）

// 大/小音程滑动
intervalSlide_2367("maj", -1) // "min"（大 → 小）
intervalSlide_2367("maj", 1)  // "aug"（大 → 增）
intervalSlide_2367("min", -1) // "dim"（小 → 减）
intervalSlide_2367("min", 1)  // "maj"（小 → 大）
```

滑动可以跨级——`intervalSlide_2367("min", 2)` 从小直接跳到大（+2 半音）。这在程序化地构建音程变体时很方便（如生成所有可能的三度：减三、小三、大三、增三）。

### 音名字母距离

不算升降号，只看字母位置。C 到 G 跨了 5 个字母位（C-D-E-F-G），所以是五度；C 到 E 跨了 3 个字母位（C-D-E），所以是三度：

```ts
getIntervalDegreeByStep("C", "G") // 5
getIntervalDegreeByStep("C", "E") // 3
getIntervalDegreeByStep("F", "B") // 4
```

这个函数只看音名字母，不管升降——C 到 Gb 和 C 到 G 都是 5 度。要确定是纯五还是减五，还得看半音数。

## 实战场景

### 和声分析：判断和弦的构成音程

一个 C 大三和弦（C-E-G），根音到三音是大三度（4 半音），根音到五音是纯五度（7 半音）。换 Cm（C-Eb-G），三音变成小三度（3 半音），五音还是纯五。**大三度和小三度的区别，就是大和弦和小和弦的区别**：

```ts
const root = new Note("C", 0, 4)
const major3rd = root.getNoteByInterval(new Interval("maj", 3)) // E
const minor3rd = root.getNoteByInterval(new Interval("min", 3)) // Eb
// 同一个根音，大三度给「明亮」，小三度给「暗淡」
```

### 旋律写作：用音程控制色彩

大二度（2 半音）和小二度（1 半音）只差一个半音，但听感天差地别——大二度柔和（如 C-D），小二度紧张（如 C-Db）。这就是为什么弗里几亚调式（含小二度）听起来「异域」，而大调（全是大二度）听起来「明朗」。

```ts
// 弗里几亚的特色：小二度
new Interval("min", 2).semitoneGap  // 1 —— 这个 1 造成了异域感
```

### 找三全音：爵士替代的基础

三全音（6 半音）是所有音程里最不协和的，但正是它支撑了爵士的 tritone substitution——Db7 替代 G7，因为它们共享三全音：

```ts
const tritone = new Interval("aug", 4)
tritone.getEqualInterval() // [减五度] —— 两种记法，同一个紧张的声音
```
