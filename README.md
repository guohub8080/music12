# music12

TypeScript 乐理计算库 — 音符、音程、和弦、调式音阶。

## 特性

- **Note** — 音高、MIDI 值、等音异名、移调
- **Interval** — 音程构建、比较、性质滑动
- **Chord** — 和弦构建，支持变化音（sus、add、omit、升降号）
- **Scale** — 10 个家族 47 种调式（自然调式、中国五声、和声小调等）
- **Find** — 反向查找：根据音符列表查找和弦/调式
- **Circle of Fifths** — 五度圈、调号计算
- **Factory** — 便捷工厂函数，无需 `new` 即可创建实例
- 完整 TypeScript 类型支持

## 安装

```bash
npm install music12
# or
pnpm add music12
```

## 快速上手

```ts
import { Note, Interval, Chord, Scale } from 'music12'
import { getNote, getScale, getChord, getInterval } from 'music12'
```

---

## Note

`Note` 表示一个具有绝对音高的音符。

```ts
const note = new Note('C', 0, 4)  // C4（中央 C）

note.step           // "C"
note.alter          // 0
note.octave         // 4
note.artName        // "C"
note.pianoKeyId     // 0
note.pitchValue     // 60（MIDI）
note.isBlack        // false
```

### 构造函数

```ts
new Note(step?: T_NoteStep, alter?: T_AlterValue, octave?: number)
```

| 参数 | 类型 | 说明 | 默认值 |
|------|------|------|--------|
| `step` | `"C" \| "D" \| "E" \| "F" \| "G" \| "A" \| "B"` | 音名 | `"C"` |
| `alter` | `-2 \| -1 \| 0 \| 1 \| 2` | 变化音（-1=降, +1=升） | `0` |
| `octave` | `number` | 八度 | `4` |

### 属性

| 属性 | 类型 | 说明 |
|------|------|------|
| `step` | `T_NoteStep` | 音名 |
| `alter` | `T_AlterValue` | 变化音数值 |
| `octave` | `number` | 八度 |
| `artName` | `string` | 显示名（如 `"C#"`, `"Eb"`） |
| `mathName` | `string` | 数学名（如 `"C+1"`, `"E-1"`） |
| `fifthValue` | `number` | 五度圈位置值 |
| `isNormal` | `boolean` | 是否常用音（\|alter\| <= 1） |
| `isBlack` | `boolean` | 是否为钢琴黑键 |
| `pianoKeyId` | `number` | 钢琴键位 0-11 |
| `semitoneWithinOctave` | `number` | 相对 C 的半音数 |
| `stepId` | `number` | 音名索引（C=0, B=6） |
| `pitchValue` | `number` | 绝对 MIDI 音高值 |
| `simpleDescription` | `string` | 简洁描述（如 `"C#4"`） |
| `pianoKey` | `PianoKey` | 对应的 PianoKey 实例 |

### 方法

#### `getNoteByInterval(interval, options?)`

根据音程计算目标音符。

```ts
const maj3 = new Interval('maj', 3)
note.getNoteByInterval(maj3)        // E4
note.getNoteByInterval(maj3, { isAscending: false })  // 向下：Ab3
```

#### `getNoteByIntervalString(str, options?)`

根据数字标记法（如 `"b7"`, `"#4"`）计算目标音符。

```ts
const d4 = new Note('D', 0, 4)
d4.getNoteByIntervalString('b7')    // C5（D4 的小七度上方）
d4.getNoteByIntervalString('#4')    // G#4
```

#### `getSamePitchNotes(options?)`

获取所有等音异名。

```ts
const gSharp4 = new Note('G', 1, 4)
gSharp4.getSamePitchNotes({ alterAbsLte: 1 })
// [G#4, Ab4]
```

#### `semitoneMove(moveStep)`

按半音数移调，智能选择最合适的音名。

```ts
const c4 = new Note('C', 0, 4)
c4.semitoneMove(3)   // Eb4（选 Eb 而非 D#）
c4.semitoneMove(-2)  // Bb3
```

#### `getHarmonicSeries()`

获取泛音序列。

#### `get251as(noteAs)`

返回 ii-V-I 进行中三个和弦的根音。

```ts
const c4 = new Note('C', 0, 4)
c4.get251as(1)  // [D, G, C] — C 作为 I 级
```

### 模块函数

```ts
getCasualRandomNote()     // 随机音符（含极端等音异名）
getNormalRandomNote()     // 随机常用音符
getWhiteRandomNote()      // 随机白键音符
getBlackRandomNote()      // 随机黑键音符
getNoteByPianoKeyId(id)   // 根据 pianoKeyId 获取所有等音异名 Note[]
getUpwardPianoKeyGap(base, target)  // 两个 pianoKeyId 之间的上行半音距离
normalizeOctave(octave)   // 标准化八度参数
```

---

## Interval

`Interval` 表示两个音符之间的距离。

### 构造函数

```ts
new Interval(type?: T_IntervalType, num?: number)
```

### 音程类型

| 类型 | 含义 | 示例 |
|------|------|------|
| `"p"` | 纯 | 纯一度、纯五度 |
| `"maj"` | 大 | 大三度 |
| `"min"` | 小 | 小三度 |
| `"aug"` | 增 | 增四度 |
| `"dim"` | 减 | 减五度 |
| `"aug+"` | 倍增 | 倍增四度 |
| `"dim-"` | 倍减 | 倍减五度 |

### 属性

```ts
const interval = new Interval('maj', 3)

interval.type                   // "maj"
interval.num                    // 3
interval.numWithinOctave        // 3
interval.cnPrefix               // "大"
interval.semitoneGap            // 4
interval.semitoneGapWithinOctave // 4
interval.isNatural              // true
interval.simpleDescription      // "大三度"
```

### 方法

#### `getEqualInterval(options?)`

获取所有等音异名的音程。

```ts
const aug4 = new Interval('aug', 4)
aug4.getEqualInterval()
// [增四度, 减五度, 倍增三度, 倍减六度]
```

### 模块函数

```ts
// 计算两个音符之间的音程
getIntervalByComparingNotes(note1, note2): Interval

// 根据半音距离查找自然音程
getIntervalBySemitoneGap(7)  // [纯五度]

// 根据两个音名计算度数
getIntervalDegreeByStep('C', 'G')  // 5

// 判断度数是否属于纯音程家族（1, 4, 5）
isPureInterval(5)  // true

// 滑动音程性质（纯音程家族）
intervalSlide_145('p', 1)     // "aug"
intervalSlide_145('p', -1)    // "dim"

// 滑动音程性质（大小音程家族）
intervalSlide_2367('maj', -1) // "min"
intervalSlide_2367('min', 1)  // "maj"
```

---

## Chord

`Chord` 表示由根音和和弦公式构成的和弦，支持变化音操作。

### 构造函数

```ts
new Chord(rootPianoKeyId: number, chordFormulaId: string)
```

```ts
const chord = new Chord(0, 'maj3')  // C 大三和弦

chord.rootPianoKeyId   // 0
chord.chordFormulaId   // "maj3"
chord.cnName           // "大三和弦"
chord.pianoKeyIds      // [0, 4, 7]
chord.scoreSymbol      // "M3"
```

### 属性

| 属性 | 类型 | 说明 |
|------|------|------|
| `rootPianoKeyId` | `number` | 根音 pianoKeyId（0-11） |
| `chordFormulaId` | `string` | 和弦公式 ID（如 `"maj7"`） |
| `baseSymbol` | `string` | 基础记号（如 `"M7"`） |
| `cnName` | `string` | 中文名 |
| `family` | `string` | 和弦家族分类 |
| `pianoKeyIds` | `number[]` | 按度数排列的 pianoKeyId |
| `pianoKeyIdsSorted` | `number[]` | 按音高排序的 pianoKeyId |
| `notesNum` | `number` | 音符数量 |
| `scoreSymbol` | `string` | 完整谱面记号（含变化音） |
| `isTransformed` | `boolean` | 是否有变化音 |
| `simpleDescription` | `string` | 简洁描述（如 `"C4,E4,G4"`） |
| `baseIntervalList` | `[T_IntervalType, number][]` | 基础音程列表 |
| `intervalList` | `[T_IntervalType, number][]` | 实际音程列表（含变化） |
| `intervalPanel` | `I_ChordIntervalPanel` | 按度数索引的音程面板 |
| `transformPanel` | `I_TransformPanel` | 当前变化音配置 |

### 方法

#### `set(input): this`

设置和弦某度数的音程类型，支持链式调用。

```ts
const chord = new Chord(0, 'maj7')

chord.set('#5')    // 升五音
  .set(9)          // 加九音
  .setOmit(3)      // 省略三音
  .setSus(4)       // sus4

chord.scoreSymbol  // 含变化音的完整记号
```

`set` 支持的输入格式：

| 输入 | 说明 |
|------|------|
| `2`, `3`, `9` 等 | 设置度数为自然音程 |
| `"#5"`, `"#11"` | 升号 |
| `"b9"`, `"b13"` | 降号 |

#### `setSus(susNum?): this`

挂留和弦（替换三度音）。

```ts
chord.setSus(2)  // sus2
chord.setSus(4)  // sus4
```

#### `setOmit(omitInterval): this`

省略某度音。

```ts
chord.setOmit(5)  // 省略五音
```

#### `clearTransform(): void`

清除所有变化音，恢复基础和弦。

#### `getRootNotes(octave?): Note[]`

获取根音的 Note 实例。

#### `getNotesList(octave?): Note[]`

获取所有音符的 Note 实例。

```ts
const chord = new Chord(0, 'maj3')
chord.getNotesList(4)  // [C4, E4, G4]
```

#### `find(config?): I_AnalyzedChordResult[]`

反向查找：根据当前音符找到匹配的和弦。

### 模块函数

```ts
// 根据 pianoKeyId 列表推导和弦变换
getChordTransformByPianoKeyIds(originChordInfo, givenPianoKeyIds)
```

---

## Scale

`Scale` 表示由根音和调式构成的音阶。

### 构造函数

```ts
new Scale(rootPianoKeyId: number, scaleModeId: T_ScaleModeId)
```

```ts
const scale = new Scale(0, 'NATURAL_MAJOR')  // C 自然大调

scale.rootPianoKeyId  // 0
scale.pianoKeyIds     // [0, 2, 4, 5, 7, 9, 11]
scale.modeName        // 调式名称
scale.simpleDescription  // "C,D,E,F,G,A,B"
```

### 属性

| 属性 | 类型 | 说明 |
|------|------|------|
| `rootPianoKeyId` | `number` | 根音 pianoKeyId（0-11） |
| `scaleModeId` | `T_ScaleModeId` | 调式 ID |
| `pianoKeyIds` | `number[]` | 按度数排列的 pianoKeyId |
| `pianoKeyIdsSorted` | `number[]` | 按音高排序的 pianoKeyId |
| `degreeToPianoKeyId` | `Record<number, number>` | 度数 → pianoKeyId 映射 |
| `pianoKeyIdToDegree` | `Record<number, number>` | pianoKeyId → 度数映射 |
| `degreeAlterationsMap` | `Record<number, number>` | 度数 → 变化音映射 |
| `modeName` | `string` | 调式名称 |
| `modeDescription` | `string` | 调式描述 |
| `type` | `string` | 调式类别 |
| `simpleDescription` | `string` | 简洁描述 |
| `naturalNotesNum` | `number` | 自然音数量 |
| `alteredNotesNum` | `number` | 变化音数量 |
| `isTonicReplaced` | `boolean` | 是否所有音都被变化 |

### 方法

#### 查询方法

```ts
scale.hasPianoKeyId(2)           // true（D 在 C 大调中）
scale.getDegreeByPianoKeyId(2)   // 2（D 是第 2 级）
scale.getDegreeAndAlter(1)       // { degree: 2, alter: 0 }
scale.getPianoKeyIdByDegree(5)   // 7（第 5 级是 G）
scale.getAlterByDegree(4)        // 0（第 4 级 F 在 C 大调无变化）
```

#### 获取音符

```ts
scale.getRootNote()       // 根音 Note[]
scale.getNoteByDegree(5)  // 第 5 级音 Note[]
scale.getNoteByIntervalNum(9)  // 支持跨八度的度数
```

#### 顺阶和弦

```ts
scale.getScaleDegreeChord3(1)  // 第 1 级三和弦 → I 和弦
scale.getScaleDegreeChord7(5)  // 第 5 级七和弦 → V7 和弦
```

### 调式列表

47 种调式，10 个家族：

| 家族 | 调式 |
|------|------|
| Diatonic (7) | `NATURAL_MAJOR`, `DORIAN`, `PHRYGIAN`, `LYDIAN`, `MIXOLYDIAN`, `NATURAL_MINOR`, `LOCRIAN` |
| Harmonic Major (1) | `HARMONIC_MAJOR` |
| Melodic Major (1) | `MELODIC_MAJOR_DESCENDING` |
| Harmonic Minor (6) | `HARMONIC_MINOR`, `LOCRIAN_SHARP6`, `IONIAN_SHARP5`, `DORIAN_SHARP4`, `PHRYGIAN_DOMINANT`, `LYDIAN_SHARP2` |
| Melodic Minor (5) | `MELODIC_MINOR_ASCENDING`, `DORIAN_FLAT2`, `LYDIAN_AUGMENTED`, `LYDIAN_DOMINANT`, `LOCRIAN_SHARP2` |
| Double Harmonic (4) | `DOUBLE_HARMONIC_MAJOR`, `HUNGARIAN_MINOR`, `ORIENTAL`, `IONIAN_SHARP2_SHARP5` |
| Chinese Pentatonic (5) | `GONG`, `SHANG`, `JUE`, `ZHI`, `YU` |
| Chinese Yayue (5) | `YA_YUE_GONG`, `YA_YUE_SHANG`, `YA_YUE_JUE`, `YA_YUE_ZHI`, `YA_YUE_YU` |
| Chinese Qingyue (5) | `QING_YUE_GONG`, `QING_YUE_SHANG`, `QING_YUE_JUE`, `QING_YUE_ZHI`, `QING_YUE_YU` |
| Chinese Yanyue (5) | `YAN_YUE_GONG`, `YAN_YUE_SHANG`, `YAN_YUE_JUE`, `YAN_YUE_ZHI`, `YAN_YUE_YU` |

```ts
import { SCALE_MODE, SCALE_MODE_IDS, SCALE_MODE_GROUPS } from 'music12'

SCALE_MODE.NATURAL_MAJOR           // "NATURAL_MAJOR"
SCALE_MODE_IDS                     // ["NATURAL_MAJOR", "DORIAN", ...]
SCALE_MODE_GROUPS.DIATONIC         // ["NATURAL_MAJOR", "DORIAN", ...]
SCALE_MODE_GROUPS.CHINESE_PENTATONIC  // ["GONG", "SHANG", "JUE", "ZHI", "YU"]
```

### 模块函数

```ts
getModeNameByModeKey('DOR')        // 调式名称
getModeTypeByModeKey('DOR')        // 调式类别
getIntervalListByModeKey('DOR')    // 调式音程列表
```

---

## Find

反向查找工具 — 根据音符列表查找和弦和调式。

```ts
import {
  findChord,
  findNotesInScales,
  areNotesInScale,
  findNoteDegreeInAllScales,
  findNoteDegreeInScale,
  findScaleByDegreePositions,
} from 'music12'
```

```ts
// 根据 MIDI 音高查找和弦
findChord([60, 64, 67, 71])  // Cmaj7

// 查找包含所有给定音符的调式
findNotesInScales([0, 2, 4, 5, 7])

// 检查音符是否属于某调式
areNotesInScale([0, 2, 4], 0, 'NATURAL_MAJOR')  // true

// 查找音符在所有调式中的级数
findNoteDegreeInAllScales(2)

// 查找音符在某调式中的级数
findNoteDegreeInScale(2, 0, 'NATURAL_MAJOR')  // 2

// 根据度数约束查找调式
findScaleByDegreePositions([
  { pianoKeyId: 0, as: 1 },   // C 作为第 1 级
  { pianoKeyId: 7, as: 5 },   // G 作为第 5 级
])
```

---

## Circle of Fifths

```ts
import { circleOfFifths } from 'music12'

const pos = new circleOfFifths(0)  // C 大调 / a 小调
pos.move(5)                         // 移动 5 个位置
pos.majCircle                       // 大调信息
pos.minCircle                       // 小调信息

// 静态属性
circleOfFifths.SHARP_ORDER  // ["F","C","G","D","A","E","B"]
circleOfFifths.FLAT_ORDER   // ["B","E","A","D","G","C","F"]
```

---

## Stave (调号)

```ts
import { getStaveAlterByNote, getScaleByStaveAlters, getAlterStepListByNum } from 'music12'

// 查找音符所属调号
getStaveAlterByNote('C', 0)

// 根据调号数量获取调式信息（-7 到 +7）
getScaleByStaveAlters(2)  // D 大调 / b 小调

// 获取调号对应的升降音名列表
getAlterStepListByNum(3)  // ["F","C","G"]（3 个升号）
```

---

## Factory (工厂函数)

便捷创建实例，无需使用 `new` 和构造 `Note`。

```ts
import { getNote, getInterval, getChord, getScale } from 'music12'

const note     = getNote('C', 0, 4)                  // Note
const interval = getInterval('maj', 3)                // Interval
const scale    = getScale('C', 0, 'NATURAL_MAJOR')    // Scale
const chord    = getChord('G', 0, 'dom7')             // Chord
```

---

## Radix (乐理数学工具)

七进制和十二进制算术，用于乐理计算。

```ts
import { Radix } from 'music12'

// 七进制（自然音级数）
const degree = new Radix.Base7Radix(8)
degree.firstDigit  // 1（八度）
degree.lastDigit   // 1（度数索引）

// 十二进制（半音）
const pitch = new Radix.Base12Radix(14)
pitch.firstDigit  // 1（八度）
pitch.lastDigit   // 2（半音）

// 音名进制
const step = new Radix.StepRadix('C')
step.step  // "C"
```

---

## Piano Key ID

贯穿整个库，`pianoKeyId`（0-11）是核心音符标识符：

| pianoKeyId | 音符 |
|------------|------|
| 0 | C |
| 1 | C# / Db |
| 2 | D |
| 3 | D# / Eb |
| 4 | E |
| 5 | F |
| 6 | F# / Gb |
| 7 | G |
| 8 | G# / Ab |
| 9 | A |
| 10 | A# / Bb |
| 11 | B |

---

## License

MIT
