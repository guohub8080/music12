# Find（反向查找）

你给 Find 一组音，它告诉你这是什么和弦、属于什么调。这是 music12 最「智能」的部分——`findChord` 能从一堆琴键里识别出和弦，还懂得区分等和弦、处理省略音。

反向查找是音乐应用的高频需求：用户在键盘上弹了几个音，app 要识别「这是什么和弦」；用户哼了一段旋律，要分析「这是什么调」。Find 模块就是干这个的——从音（输入）推导出和弦/调式（输出）。

## 先注意：两种输入

Find 模块的函数接收两种不同的输入，搞混了会得到错误结果：

| 函数 | 输入 | 说明 |
|---|---|---|
| `findChord` | **MIDI 数**（如 `[60, 64, 67]`） | 带八度的绝对音高，60 = C4 |
| `findNotesInScales` 等 | **pianoKeyId**（0-11） | 音高类，不带八度 |

为什么不同？`findChord` 需要知道音的绝对高度来判断转位（哪个音最低），所以用 MIDI。而调式查找只关心音是哪几个键（调式不区分八度），所以用 pianoKeyId。

## findChord：识别和弦

### 基本用法

```ts
import { findChord } from "music12"

// 你弹了 C-E-G-Bb（MIDI 60-64-67-70）
const results = findChord([60, 64, 67, 70])
console.log(results[0].chordFormulaId) // "dom7"（C7）
console.log(results[0].similarity)     // 1（完全匹配）
```

findChord 返回一个数组——因为同一组音可能有多种和弦解释（等和弦）。比如 C-E-G-A 既可能是 C6 也可能是 Am7，findChord 会把两种都返回，让你根据上下文选。

### 两种匹配模式

**默认（模糊模式）**：先找完全匹配；找不到就退而求其次，找「省略音匹配」——你弹的音全是某个和弦的音，只是少弹了几个。比如你弹 C-E-B（3 个音），它知道这可能是「省略了五度的 Cmaj7」：

```ts
findChord([60, 64, 71]) // C-E-B
// → [{ chordFormulaId: "maj7", similarity: 0.75, transformString: "omit5" }]
// 告诉你：这是 Cmaj7，省略了五度 G
```

**严格模式**（`isStrict: true`）：只要完全匹配，不做任何猜测：

```ts
findChord([60, 64, 67])                      // 默认：C 大三
findChord([60, 64, 67], { isStrict: true })  // 严格：只完全匹配
```

### 为什么 C7 不会被识别成 C 大三？

省略音匹配有**乐理规则**约束——和弦的「特征音」必须被弹到，不能省。这是 v3 从 mtkit 借鉴并改进的算法：

- **七和弦**必须有三度和七度（省了就不是七和弦了——没有七音怎么叫七和弦？）
- **变化五度**（#5/b5）必须有五度（变化音是和弦的身份特征）
- **sus** 必须有 2 度或 4 度（替代三度的功能）
- **纯五度**可以省（信息量低，爵士/吉他常省）
- **扩展音**（9/11/13）可以省

所以输入 C7（C-E-G-Bb），不会返回 C 大三——因为 dom7 的小七度 Bb 是特征音，省了它就不叫属七了。这个规则让 findChord 的结果符合乐理直觉，不会胡乱联想。

### 区分等和弦：指定根音

C-E-G-A 可能是 C6 也可能是 Am7——同样的 4 个键，两种完全合法的解释。pianoKeyId 是音高类（0-11），不带八度，findChord 无法仅从音集判断「哪个是根」。用 `rootNoteLocation` 告诉它根音是谁：

```ts
findChord([60, 64, 67, 69])                        // 两个都返回：C6 + Am7
findChord([60, 64, 67, 69], { rootNoteLocation: 0 }) // 只返回 C6（根是 C）
findChord([60, 64, 67, 69], { rootNoteLocation: 9 }) // 只返回 Am7（根是 A）
```

不指定根音时，`isRootPosition` 为 false（信息不足，不猜测）。

### 返回值长什么样

```ts
{
  chordFormulaId: "dom7",       // 公式 ID
  pianoKeyIdRoot: 0,            // 根音 pianoKeyId
  pianoKeyIdsSorted: [0,4,7,10], // 音集（排序去重）
  similarity: 1,                 // 相似度（完全匹配=1，省略音<1）
  intersection: [0,4,7,10],     // 交集
  transformString: "omit5",      // 变换描述（省略音匹配时才有）
  isRootPosition: false          // 是否原位
}
```

`transformString` 在省略音匹配时特别有用——它告诉你「相对标准和弦，你省了/加了什么」。如 `"omit5"` 表示省了五度，`"add9"` 表示多了九度。

### 至少要 3 个音

少于 3 个不同的音，findChord 会抛错——2 个音没法构成和弦（连三和弦都不够）。重复的音也不算（`[60, 60, 60]` 只有 1 个独立音）。

## findNotesInScales：这组音属于哪些调

输入是 pianoKeyId（0-11）。返回所有「包含全部给定音」的调式：

```ts
import { findNotesInScales } from "music12"

// C-E-G 同时属于哪些调
const results = findNotesInScales([0, 4, 7])
console.log(results.length) // 很多调都含 C-E-G（大调、小调、五声...）

// 每个结果告诉你每个输入音在该调里是几度
results[0].noteDegrees
// [{ pianoKeyId: 0, degree: 1 }, { pianoKeyId: 4, degree: 3 }, ...]
```

限制只查特定调式族：

```ts
findNotesInScales([0, 4, 7], { scaleModeIds: ["NATURAL_MAJOR"] })
```

只想知道某组音是否**全在**某个特定调内（不需要列举所有调），用 `areNotesInScale`：

```ts
areNotesInScale([0, 4, 7], 0, "NATURAL_MAJOR")  // true（C-E-G 全在 C 大调）
areNotesInScale([0, 4, 7], 1, "NATURAL_MAJOR")  // false（不全在 Db 大调）
```

## 单音查调：这个音在各调里是几度

```ts
import { findNoteDegreeInAllScales, findNoteDegreeInScale } from "music12"

// E(4) 在所有调中分别是几度
findNoteDegreeInAllScales(4) // [{ degree: 3, alter: 0, ... }, ...]
// 会自动排除 E 作为根音的调（E 大调里 E 是 1 度，不算「关系」）

// E 在 C 大调是几度
findNoteDegreeInScale(4, 0, "NATURAL_MAJOR") // 3（三度）
findNoteDegreeInScale(1, 0, "NATURAL_MAJOR") // null（C# 不在 C 大调）
```

这在分析「某个变化音是从哪个调借来的」时很有用——比如 C 大调里出现 F#，查它能发现 F# 在 G 大调是 7 度（属音），说明这里可能借用了 G 大调。

## 按度数位置找调

「根是 C、三度是 E 的调有哪些」——`findScaleByDegreePositions` 约束度数位置，而非只是音集成员：

```ts
import { findScaleByDegreePositions } from "music12"

findScaleByDegreePositions([
  { pianoKeyId: 0, as: 1 },  // C 当 1 度（根）
  { pianoKeyId: 4, as: 3 },  // E 当 3 度
])
// → C 自然大调、C 利底亚等（都满足根=C、三度=E）
```

`as` 可以是复合度数（8-14），自动归一化：8 = 1 度高八度，9 = 2 度高八度。

## 实战场景

### 识别用户即兴弹的和弦

用户在键盘上随手弹了 5 个音，app 要识别并显示和弦名：

```ts
const userNotes = [60, 64, 67, 70, 74] // C-E-G-Bb-D
const results = findChord(userNotes)
console.log(results[0].chordFormulaId) // "dom9"（C9）
// 用户弹的是 C9，findChord 识别出来了
```

### 分析调性

一段旋律用了哪些音，判断它属于什么调：

```ts
const melody = [0, 2, 4, 5, 7, 9, 11] // C 大调音阶的全部音
const scales = findNotesInScales(melody)
// 返回所有包含这 7 个音的调——C 大调一定在里面
```

### 区分 C6 和 Am7

同样 4 个音 C-E-G-A，在 C 大调语境下是 C6（主功能），在 A 小调语境下是 Am7（主功能）。用 `rootNoteLocation` 根据上下文选择：

```ts
// 在 C 大调里分析 → 指定根 C
findChord([60, 64, 67, 69], { rootNoteLocation: 0 }) // C6

// 在 A 小调里分析 → 指定根 A
findChord([60, 64, 67, 69], { rootNoteLocation: 9 }) // Am7
```
