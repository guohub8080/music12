# Note（音符）

music12 里最基础的单位。一个音符由三样东西确定：**音名**（C/D/E/F/G/A/B）、**升降号**（还原/升/降/重升/重降）、**八度**。但真正的核心是 `pianoKeyId`——这个音在钢琴上的位置（0-11），它才是没有歧义的客观存在。

## 创建一个音符

```ts
import { Note } from "music12"

const c4 = new Note("C", 0, 4)    // 中央 C
const fSharp = new Note("F", 1, 4) // F#4（第二个参数 1 = 升半音）
const bFlat = new Note("B", -1, 3) // Bb3（-1 = 降半音）
```

三个参数分别是音名字母（大小写都行）、升降号（`0` 还原、`1` 升、`-1` 降、`2` 重升、`-2` 重降）、八度数（中央 C 是第 4 八度）。

## 音符的属性

创建好之后，一个 Note 对象知道关于自己的很多事情。最常用的几个：

```ts
const c4 = new Note("C", 0, 4)

c4.pianoKeyId   // 0 —— 钢琴键位置（0-11），这是核心
c4.pitchValue   // 60 —— MIDI 编号
c4.step         // "C" —— 音名字母
c4.alter        // 0 —— 升降号
c4.octave       // 4 —— 八度
c4.simpleDescription  // "C4" —— 人能读的描述
c4.isBlack      // false —— 是不是黑键
```

**关于 pianoKeyId**：它是 0-11 的音高类，不带八度信息——C4、C5、C3 的 pianoKeyId 都是 0。等音的 pianoKeyId 也相同（C# 和 Db 都是 1）。这让等音异名的问题在 pianoKeyId 层面直接消失：

```ts
const cSharp = new Note("C", 1, 4)
const dFlat  = new Note("D", -1, 4)
cSharp.pianoKeyId === dFlat.pianoKeyId  // true，同一个键
```

<details>
<summary>完整属性列表</summary>

| 属性 | 类型 | 说明 | 示例（C4） |
|---|---|---|---|
| `step` | `string` | 音名字母 | `"C"` |
| `alter` | `number` | 升降号 | `0` |
| `octave` | `number` | 八度 | `4` |
| `pianoKeyId` | `number` | 钢琴键位置（0-11），等音相同 | `0` |
| `pitchValue` | `number` | 绝对音高（MIDI 编号）| `60` |
| `simpleDescription` | `string` | 简单音名描述 | `"C4"` |
| `artName` | `string` | 艺术音名（含升降符号）| `"C"` |
| `mathName` | `string` | 数学音名（如 `F+1` 表示 F#）| `"C"` |
| `isNormal` | `boolean` | 是否还原音（无升降）| `true` |
| `isBlack` | `boolean` | 是否黑键 | `false` |
| `stepId` | `number` | 音名序号（C=0, D=1, ... B=6）| `0` |
| `semitoneWithinOctave` | `number` | 八度内半音位置 | `0` |
| `pianoKey` | `PianoKey` | 钢琴键对象 | `{ pianoKeyId: 0, octave: 4 }` |

</details>

## 在音符上叠加音程

想知道 C 上方大三度是什么音？用 `getNoteByInterval`：

```ts
import { Note, Interval } from "music12"

const c4 = new Note("C", 0, 4)
const e4 = c4.getNoteByInterval(new Interval("maj", 3))
console.log(e4.simpleDescription) // "E4"

const g4 = c4.getNoteByInterval(new Interval("p", 5)) // 纯五度
console.log(g4.simpleDescription) // "G4"
```

嫌每次 `new Interval` 太长？可以用字符串简写 `getNoteByIntervalString`：

```ts
const g4 = c4.getNoteByIntervalString("p5")  // 纯五度
```

## 找等音

想知道 C 还能怎么记？`getSamePitchNotes` 返回所有等音：

```ts
const c4 = new Note("C", 0, 4)
c4.getSamePitchNotes().map(n => n.simpleDescription)
// ["C4", "B♯3"] —— C 和 B♯，B♯3 的实际音高就是 C4

const fSharp = new Note("F", 1, 4)
fSharp.getSamePitchNotes().map(n => n.simpleDescription)
// ["F♯4", "G♭4"]
```

反过来，如果你手里只有 pianoKeyId，想拿回音符，用 `getNoteByPianoKeyId`。默认给你最简洁的记法（白键 1 个、黑键升/降各 1 个），需要全部等音就开 `isComplexIncluded`：

```ts
import { getNoteByPianoKeyId } from "music12"

getNoteByPianoKeyId(0)                              // [C4]（白键，最简）
getNoteByPianoKeyId(1)                              // [C♯4, D♭4]（黑键，升/降都简洁）
getNoteByPianoKeyId(0, { isComplexIncluded: true }) // [C4, B♯4, ...]（全部等音）
```

## 半音移动

不想操心音程类型，只想「往上挪 N 个半音」？用 `semitoneMove`：

```ts
const c4 = new Note("C", 0, 4)
const f4 = c4.semitoneMove(5)   // 上移 5 个半音 → F
const ab3 = c4.semitoneMove(-4) // 下移 4 个半音 → Ab
```

## 泛音列

`getHarmonicSeries` 给你这个音的自然泛音序列——物理上真实的共鸣音：

```ts
const c4 = new Note("C", 0, 4)
c4.getHarmonicSeries().map(n => n.step).slice(0, 5)
// ["C", "G", "C", "E", "G"] —— 基频 C，然后五度 G、八度 C、三度 E...
```

## ii-V-I 进行

爵士里最常用的和弦进行。告诉 `get251as` 当前音当几级（1=主、2=下属、5=属），它给你 251 的根音：

```ts
const c4 = new Note("C", 0, 4)

c4.get251as(1).map(n => n.step) // ["D", "G", "C"] —— C 当主音，II-V-I 是 D-G-C
c4.get251as(5).map(n => n.step) // ["G", "C", "F"] —— C 当属音
```

只接受 1、2、5，传别的会抛错。

## 工具函数

**随机音符**——生成测试数据或随机旋律时有用：

```ts
getWhiteRandomNote()    // 随机白键（C D E F G A B）
getBlackRandomNote()    // 随机黑键（C# D# F# G# A#）
getNormalRandomNote()   // 随机还原音
getCasualRandomNote()   // 完全随机
```

**半音距离**——算两个 pianoKeyId 之间向上走几个半音：

```ts
getUpwardPianoKeyGap(0, 7) // 7（C 到 G 向上 7 个半音 = 纯五度）
```

## 实战小技巧

**用音符构建一个音阶**：

```ts
const c4 = new Note("C", 0, 4)
const cMajor = ["p1", "maj2", "maj3", "p4", "p5", "maj6", "maj7"]
  .map(str => c4.getNoteByIntervalString(str))
// [C4, D4, E4, F4, G4, A4, B4]
```

**找三全音**（爵士 tritone substitute 的基础）：

```ts
const c4 = new Note("C", 0, 4)
const tritone = c4.semitoneMove(6) // F#，C 的三全音
```
