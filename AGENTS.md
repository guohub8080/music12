# AGENTS.md — music12 AI Guide

> 本文件专为 AI（Claude / GPT / Cursor 等）编写，帮助 AI 快速理解 music12 的设计理念和 API 用法。

## 核心理念：pianoKeyId 是一等公民

music12 以**钢琴键（pianoKeyId，0-11）**为基础抽象，而非音名（C/D/E）。原因：音名有记谱歧义（C# 还是 Db？），但 pianoKeyId 是客观唯一的——`pianoKeyId = 1` 永远是同一个琴键，不管你叫它 C# 还是 Db。

所有乐理概念都建立在 pianoKeyId 之上：
- **音符**：step（音名）+ alter（升降号）→ pianoKeyId（0-11）
- **和弦**：rootPianoKeyId + chordFormulaId → pianoKeyIds 数组
- **调式**：rootPianoKeyId + scaleModeId → pianoKeyIds 数组
- **等音/等和弦**：pianoKeyId 相同 = 同一个键，只是记法不同

## pianoKeyId 对照表

```
ID:  0   1    2   3    4   5   6    7   8    9   10   11
音:  C   C#/Db D   D#/Eb E   F   F#/Gb G   G#/Ab A   A#/Bb B
键:  白  黑   白  黑   白  白  黑   白  黑   白  黑   白
```

## 导入方式

```ts
// 推荐：子路径导入（treeshaking 最彻底）
import { Note } from "music12/note"
import { Chord } from "music12/chord"
import { findChord } from "music12/find"

// 也可以：主入口具名导入
import { Note, Chord, findChord } from "music12"
```

可用子路径：`note` `interval` `scale` `chord` `chord-formula` `find` `stave` `radix` `circle-of-fifths` `factory`

## API 速查

### 创建实例

```ts
// 工厂函数（推荐，用音名）
import { getNote, getChord, getScale, getInterval } from "music12/factory"
const note = getNote("C", 0, 4)              // C4，第二参数 0=还原 1=升 -1=降
const chord = getChord("C", 0, "maj7")       // Cmaj7
const scale = getScale("C", 0, "NATURAL_MAJOR") // C 大调

// 类构造（用 pianoKeyId）
import { Note, Chord, Scale } from "music12"
const note = new Note("C", 0, 4)             // C4
const chord = new Chord(0, "maj7")           // Cmaj7（根音 pianoKeyId=0）
const scale = new Scale(0, "NATURAL_MAJOR")  // C 大调
```

### 和弦变换（链式）

```ts
const chord = new Chord(0, "dom7")
  .set("#5")     // 升五度
  .set("b9")     // 降九度
  .setOmit(5)    // 省略五度
  .setSus(4)     // sus4

chord.scoreSymbol  // 变换后的记谱符号
chord.pianoKeyIds  // 当前各音 [root, 3rd, 5th, 7th...]
chord.isTransformed // 是否被变换过
chord.clearTransform() // 回到原始和弦
```

### 反向查找（识别和弦）

```ts
import { findChord } from "music12"

// 输入 MIDI 音符列表（60=C4, 64=E4, 67=G4...）
findChord([60, 64, 67, 70]) // → [{ chordFormulaId: "dom7", ... }]

// 严格模式：只返回完全匹配
findChord([60, 64, 67], { isStrict: true })

// 指定根音：区分等和弦 C6 vs Am7
findChord([60, 64, 67, 69], { rootNoteLocation: 0 }) // → C6
findChord([60, 64, 67, 69], { rootNoteLocation: 9 }) // → Am7
```

findChord 的匹配规则：
- 默认：完全匹配优先；无完全匹配时返回省略音匹配（用户少弹了音）
- 特征音不可省：七和弦必须有 3 度和 7 度，变和弦必须有变化音
- 纯五度和扩展音（9/11/13）可省
- 少于 3 个不同音会抛错

### 调式查询

```ts
const cMajor = new Scale(0, "NATURAL_MAJOR")

cMajor.pianoKeyIds           // [0,2,4,5,7,9,11]
cMajor.hasPianoKeyId(0)      // true（C 在 C 大调里）
cMajor.getDegreeByPianoKeyId(4) // 3（E 是 3 度）
cMajor.getScaleDegreeChord7(5)  // G7（5 级七和弦）
cMajor.getScaleDegreeChord7(1)  // Cmaj7（1 级）
```

### 标签查询

```ts
import { getChordFormulaByTags } from "music12"

getChordFormulaByTags(["dom", "altered"]) // 所有属功能变音和弦
getChordFormulaByTags(["sus", "ext13"])   // 扩展到 13 度的挂留和弦
getChordFormulaByTags(["dim"])            // 所有减和弦 [dim3, dim7]
```

## 常见误区

1. **findChord 接收 MIDI 数（如 60），不是 pianoKeyId（如 0）**。findNotesInScales 等才接收 pianoKeyId。
2. **pianoKeyId 不带八度**。C4/C5/C3 的 pianoKeyId 都是 0。要绝对音高用 `pitchValue`（MIDI 编号）。
3. **等和弦**：C6（C-E-G-A）和 Am7（A-C-E-G）是同一组键 `[0,4,7,9]`，findChord 会同时返回两者。
4. **五声调式缺 4 度和 7 度**：`getNoteByIntervalNum(4)` 返回 null（不崩溃）。
5. **黑键有两个名字**：pianoKeyId=1 既是 C# 也是 Db。`getNoteByPianoKeyId(1)` 返回两者。

## 87 个和弦公式 ID

常用公式：`maj3` `min3` `dim3` `aug3` `sus2` `sus4` `maj7` `dom7` `min7` `dim7` `halfdim7` `minmaj7` `dom9` `maj9` `min9` `dom11` `maj11` `min11` `dom13` `maj13` `min13`

变音和弦：`dom7#5` `dom7b5` `dom7b9` `dom7#9` `dom7#11` `dom9#5` `dom9#11` `maj7b5` `maj7#11` `min7b5` 等。

完整列表用 `getChordFormulaByTags([])` 查询（返回全部 87 个）。

## 44 个调式 ID

自然调式：`NATURAL_MAJOR` `DORIAN` `PHRYGIAN` `LYDIAN` `MIXOLYDIAN` `NATURAL_MINOR` `LOCRIAN`

和声/旋律：`HARMONIC_MINOR` `HARMONIC_MAJOR` `MELODIC_MINOR_ASCENDING` `MELODIC_MAJOR_DESCENDING` 及衍生模式

中国调式：`GONG` `SHANG` `JUE` `ZHI` `YU`（五声）；`YA_YUE_GONG` `QING_YUE_GONG` `YAN_YUE_GONG` 等（七声）

## 完整文档

人类可读的详细文档在 `documents/` 目录（如果包含在包里）或 [GitHub](https://github.com/guohub8080/music12)。
