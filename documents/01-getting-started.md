# 快速上手

music12 是一个 TypeScript 乐理库，提供音符（Note）、音程（Interval）、和弦（Chord）、调式（Scale）、反向查找（Find）等核心能力。无论你在做音乐教育 app、DAW 插件、乐理分析工具，还是 AI 音乐生成，music12 都能帮你处理底层的乐理计算。

## 安装

```bash
pnpm add music12
# or
npm install music12
# or
yarn add music12
```

## 导入方式

music12 支持两种导入方式。**推荐优先使用子路径（subpath）导入**，treeshaking 更彻底——bundler 只需分析该模块的依赖图，不会触碰其他模块。

```ts
// ✅ 推荐：子路径导入（精确到模块，treeshaking 最彻底）
import { Note } from "music12/note"
import { Interval } from "music12/interval"
import { Chord } from "music12/chord"
import { Scale } from "music12/scale"
import { findChord } from "music12/find"
import { Base12Radix } from "music12/radix"
import { getNote, getChord, getScale } from "music12/factory"

// ✅ 也可以：从主入口导入（具名导入，现代 bundler 能 treeshake）
import { Note, findChord, Base12Radix } from "music12"

// ❌ 避免：命名空间导入会阻碍 treeshaking，拉入全部模块
import * as Music12 from "music12"
```

可用的子路径：`note`、`interval`、`scale`、`chord`、`chord-formula`、`find`、`stave`、`radix`、`circle-of-fifths`、`factory`。

## 核心概念：pianoKeyId

music12 用 **pianoKeyId** 表示音高，它是 **0-11 的整数**，对应十二平均律的 12 个音高类：

| pianoKeyId | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 音名 | C | C#/Db | D | D#/Eb | E | F | F#/Gb | G | G#/Ab | A | A#/Bb | B |

**关键特性**：pianoKeyId 是**音高类**，不带八度信息。`C4`、`C5`、`C3` 的 pianoKeyId 都是 `0`。这让等音（C# = Db）和跨八度的音程计算变得简单——它们在 pianoKeyId 层面是同一个值。

```ts
import { Note } from "music12"

const cSharp = new Note("C", 1, 4)  // C#4
const dFlat  = new Note("D", -1, 4) // Db4
console.log(cSharp.pianoKeyId === dFlat.pianoKeyId) // true，都是 1
```

这是 music12 v3 的核心理念——以钢琴键为一等公民。音名（C/D/E...）只是键的「记谱身份」，同一个键可以有多种记法（C# 或 Db），但 pianoKeyId 是客观唯一的。这让等音、等和弦、转位等问题自然消解为同一个键集合的不同解释。

## 等和弦（Enharmonic Chords）

不同的和弦可能由**完全相同的音高集合**构成——这叫等和弦。最经典的例子：

```
C6   = C - E - G - A   → pianoKeyIds = [0, 4, 7, 9]
Am7  = A - C - E - G   → pianoKeyIds = [0, 4, 7, 9]  ← 完全相同！
```

`C6`（C 大三加六度）和 `Am7`（A 小七）是同一个音集合的两种解释。music12 在查找和弦时会**同时返回两者**，并通过 `rootNoteLocation` 参数让你指定根音来区分。

## 第一个例子

### 用工厂函数创建实例（推荐）

工厂函数无需 `new`，用音名 + 升降号创建：

```ts
import { getNote, getChord, getScale } from "music12"

const note = getNote("F", 1, 4)        // F#4，第二个参数 1 = 升半音
console.log(note.pianoKeyId)           // 6

const chord = getChord("C", 0, "maj7") // C 大七和弦
console.log(chord.pianoKeyIds)         // [0, 4, 7, 11]

const scale = getScale("C", 0, "NATURAL_MAJOR") // C 自然大调
console.log(scale.pianoKeyIds)         // [0, 2, 4, 5, 7, 9, 11]
console.log(scale.simpleDescription)   // "C,D,E,F,G,A,B"（含八度）
```

### 用类构造（需要精确控制时）

```ts
import { Note, Interval, Chord, Scale } from "music12"

const note = new Note("C", 0, 4)              // pianoKeyId = 0
const interval = new Interval("maj", 3)       // 大三度
const chord = new Chord(0, "maj3")            // C 大三和弦
const cMajor = new Scale(0, "NATURAL_MAJOR")  // C 大调
```

### 反向查找：根据音符找和弦

```ts
import { findChord } from "music12"

// 输入 MIDI 音符列表（如 60=C4, 64=E4, 67=G4）
const results = findChord([60, 64, 67, 70])   // C-E-G-Bb = C7
console.log(results[0].chordFormulaId)        // "dom7"
```

`findChord` 支持两种模式：

```ts
// 默认（模糊）：完全匹配优先，无则返回省略音匹配
findChord([60, 64, 67])  // → C 大三（完全匹配）

// 严格模式：只返回音集完全相等的和弦
findChord([60, 64, 67], { isStrict: true })

// 指定根音：区分等和弦（C6 vs Am7）
findChord([60, 64, 67, 69], { rootNoteLocation: 0 }) // → 只返回 C6
findChord([60, 64, 67, 69], { rootNoteLocation: 9 }) // → 只返回 Am7
```

详见 [Find 文档](./08-find.md)。

### 和弦变换

music12 的和弦支持丰富的变换——sus、add、omit、升降，链式调用：

```ts
import { getChord } from "music12"

// C13#11（爵士大和弦）
const chord = getChord("C", 0, "dom13").set("#11")
console.log(chord.scoreSymbol) // "13(#11)"

// 省五度的 voicing（吉他和爵士钢琴常用）
const voicing = getChord("C", 0, "maj7").setOmit(5)
console.log(voicing.pianoKeyIds) // [0, 4, 11]（C-E-B，省了 G）
```

### 调式与顺阶和弦

```ts
import { Scale } from "music12"

const cMajor = new Scale(0, "NATURAL_MAJOR")

// C 大调 5 级的七和弦是什么？
const chord = cMajor.getScaleDegreeChord7(5)
console.log(chord[0].chordFormulaId) // "dom7"（G7）

// 列出所有 7 个级数的七和弦
for (let i = 1; i <= 7; i++) {
  console.log(i, cMajor.getScaleDegreeChord7(i)[0].chordFormulaId)
}
// 1 maj7, 2 min7, 3 min7, 4 maj7, 5 dom7, 6 min7, 7 halfdim7
```

## 下一步

| 想了解 | 阅读 |
|---|---|
| 7/12 双进制的设计根基 | [Radix](./02-radix.md) |
| 音符、等音、半音移动 | [Note](./03-note.md) |
| 音程、度数、半音间距 | [Interval](./04-interval.md) |
| 和弦构造、变换（sus/add/omit）、标签 | [Chord](./05-chord.md) |
| 调式、顺阶和弦、度数查询 | [Scale](./07-scale.md) |
| 反向查找（和弦识别、调式查找） | [Find](./08-find.md) |
| 和弦公式体系、标签查询 | [和弦公式](./06-chord-formula.md) |
| 工厂函数 | [Factory](./09-factory.md) |
| 五度圈、调号 | [进阶模块](./10-advanced.md) |
