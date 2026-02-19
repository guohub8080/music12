# music12
欢迎使用 `music12`，这是一个功能强大、类型安全的 TypeScript/JavaScript 库，旨在为开发者提供一套完整、易用的工具，用于处理音符、音程、和弦、调式音阶等乐理概念的计算和分析。

本库的核心设计理念是将抽象的乐理概念**对象化**。您可以创建 `Note`（音符）对象，用 `Interval`（音程）对象去操作它，将它们组合成 `Chord`（和弦）与 `Scale`（音阶）对象，并最终分析它们之间的和谐关系。

无论您是在构建音乐教育软件、数字音频工作站（DAW）、自动作曲工具，还是仅仅想在您的项目中加入一些音乐元素，`music12` 都能为您提供坚实的基础。

## ✨ 核心特性
- **🎹 直观的面向对象模型**: 将音符、音程、和弦和音阶作为一等公民。通过调用它们的方法 (`note.getNoteByInterval(...)`, `scale.getScaleDegreeChord7(...)`) 来进行乐理交互，代码清晰易懂。
- **🏭 便捷的工厂函数**: 提供 `factory` 模块，无需记忆繁琐的构造函数参数，通过 `factory.getNote(...)` 等方式快速创建实例。
- **🔧 强大的和弦构建与变形**: 不仅能创建上百种预设和弦，还能通过链式调用 `.setTransform('b9')` 或 `.setOmit(5)` 等方法，轻松实现和弦的复杂变化（Altered Chords）和省略音。
- **🎼 智能的调式与和声分析**:
    - 可基于任意根音和调式模式构建音阶。
    - 自动推算调式内的顺阶和弦（Diatonic Chords）。
    - 提供 `find` 模块，能根据一组音符反向推导出所有可能的和弦或调式，是和弦识别、乐曲分析等功能的利器。
- **🔒 完备的 TypeScript 支持**: 拥有严格的类型定义，为所有函数和对象提供了类型约束。这能帮助您在编码阶段就发现潜在的错误，并享受现代IDE带来的代码自动补全和类型提示的便利。
- **🛠️ 丰富的音乐工具**: 内置五度圈计算、谱号查询等实用工具，满足多样化的开发需求。

## 📦 安装
将dist目录下的文件引入项目即可。

## 🚀 快速上手 & 核心指南
本指南将带您了解本库最核心的几个概念，并演示如何将它们组合起来解决实际的音乐问题。
#### 1. 基石：`Note` (音符)

`Note` 是本库最基础的构建单元。

```
import { factory } from 'music12';

const c4 = factory.getNote('C', 0, 4); 
const gSharp5 = factory.getNote('G', 1, 5);

// 探索音符的属性
console.log(c4.simpleDescription); // "C4"
console.log(gSharp5.artName);      // "G#"
console.log(gSharp5.pitchValue);   // 80 (MIDI 音高值)

// 对音符进行操作
const d4 = c4.semitoneMove(2); // 将 C4 向上移动2个半音
console.log(d4.artName);       // "D"
```

#### 2. 关系：`Interval` (音程)

`Interval` 定义了音符之间的“距离”。它是移动和构建和声的关键。

```
import { Note } from 'music12/note';
import { Interval } from 'music12/interval';

const c4 = new Note('C', 0, 4);
const majorThird = new Interval('maj', 3);
const e4 = c4.getNoteByInterval(majorThird);
console.log(e4.simpleDescription); // "E4"
```

#### 3. 和声：`Chord` (和弦)

`Chord` 是由一个根音 `Note` 和一组 `Interval` 构成的和谐之声。

```
import { factory } from 'music12';

const g7 = factory.getChord('G', 0, 4, 'dom7');
console.log(g7.notesList.map(n => n.artName)); // [ 'G', 'B', 'D', 'F' ]

g7.setTransform('b9'); // 增加一个降九音 (Ab)
console.log(g7.notesList.map(n => n.artName)); // [ 'G', 'B', 'D', 'F', 'Ab' ]
```

## 📚 API 详细参考 (Class & Instance Reference)



本节为您详细介绍 `music12` 中每一个核心类的构造方式、所有可访问的属性和方法。

### `Note` 类

`Note` 对象是所有乐理计算的基础，代表一个具有绝对音高的音符。

#### 构造函数

```
new Note(step?: t_noteStep, alter?: t_alterValue, octave?: number)
```

```
import { Note } from 'music12/note';
const aFlat4 = new Note('A', -1, 4);
```

#### 属性

| 属性                   | 类型           | 描述                            | 示例 (以 `aFlat4` 为例) |
| ---------------------- | -------------- | ------------------------------- | ----------------------- |
| `step`                 | `t_noteStep`   | 音名 (C, D, E...)               | `'A'`                   |
| `alter`                | `t_alterValue` | 变化音数值 (-2 到 2)            | `-1`                    |
| `octave`               | `number`       | 八度                            | `4`                     |
| `artName`              | `string`       | 艺术化名称 (乐谱常用名)         | `'A♭'`                  |
| `mathName`             | `string`       | 数学化名称                      | `'A-1'`                 |
| `pitchValue`           | `number`       | 绝对音高值 (MIDI Number)        | `68`                    |
| `simpleDescription`    | `string`       | 简洁描述                        | `'A♭4'`                 |
| `locationId`           | `number`       | 在十二平均律中的位置 (0-11)     | `8`                     |
| `semitoneWithinOctave` | `number`       | 相对 C0 的半音数 (可能会超过11) | `8`                     |
| `isBlack`              | `boolean`      | 是否为钢琴上的黑键              | `true`                  |
| `isNormal`             | `boolean`      | 是否为常用音 (升降号不超过1个)  | `true`                  |
| `fifthValue`           | `number`       | 在五度圈中的值                  | `-4`                    |
| `stepIndex`            | `number`       | 音名的索引 (C=0, D=1...)        | `5`                     |

#### 方法

##### `getNoteByInterval()`

根据一个 `Interval` 实例，计算并返回一个新的 `Note` 实例。 `getNoteByInterval(intervalInstance: Interval, isAscending: boolean = true): Note`

```
import { Note } from 'music12/note';
import { Interval } from 'music12/interval';
const c4 = new Note('C', 0, 4);
const p5 = new Interval('p', 5);
const g4 = c4.getNoteByInterval(p5);
console.log(g4.simpleDescription); // "G4"
```

##### `getNoteByIntervalString()`

根据简化的数字和弦标记法（如 `b7`, `#4`）计算并返回一个新的 `Note` 实例。 `getNoteByIntervalString(numberNotationString: string, isAscending: boolean = true): Note`

```
import { Note } from 'music12/note';
const d4 = new Note('D', 0, 4);
const c5 = d4.getNoteByIntervalString('b7'); // D4 的小七度是 C5
console.log(c5.simpleDescription); // "C5"
```

##### `getSamePitchNotes()`

获取当前音符的所有“同音异名”音符。 `getSamePitchNotes(isSelfIncluded: boolean = true, alterAbsLessThan: 0 | 1 | 2 = 1): Note[]`

```
import { Note } from 'music12/note';
const gSharp4 = new Note('G', 1, 4);
const sameNotes = gSharp4.getSamePitchNotes(true, 1);
console.log(sameNotes.map(n => n.artName)); // [ 'G#', 'Ab' ]
```

##### `semitoneMove()`

将当前音符按指定的半音数量移动，并智能地返回最常用的 `Note` 实例。 `semitoneMove(moveStep: number): Note`

```
import { Note } from 'music12/note';
const c4 = new Note('C', 0, 4);
const eb4 = c4.semitoneMove(3); // 向上移动3个半音
console.log(eb4.simpleDescription); // "E♭4" (智能选择 E♭ 而非 D#)
```

##### `getHarmonicSeries()`

获取当前音符的泛音序列。 `getHarmonicSeries(): { step: t_noteStep, ... }[]`

```
import { Note } from 'music12/note';
const c3 = new Note('C', 0, 3);
const harmonics = c3.getHarmonicSeries();
console.log(harmonics.slice(0, 3).map(h => h.artName)); // [ 'C', 'G', 'C' ] (前三个泛音)
```

##### `get251as()`

将当前音符作为 ii-V-I 进行中的某个角色，返回该进行中所有和弦的根音。 `get251as(noteAs: 1 | 2 | 5): Note[]`

```
import { Note } from 'music12/note';
const c4 = new Note('C', 0, 4);
const progressionRoots = c4.get251as(1); // 将 C 作为 I 级
console.log(progressionRoots.map(n => n.artName)); // [ 'D', 'G', 'C' ] (ii-V-I in C)
```

------

### `Interval` 类

`Interval` 对象用于表示两个音符之间的距离。

#### 构造函数

```
new Interval(intervalType?: t_intervalType, intervalNum?: number)
```

```
import { Interval } from 'music12/interval';
const minorThird = new Interval('min', 3);
```

#### 属性

| 属性                | 类型             | 描述                           | 示例 (以 `minorThird` 为例) |
| ------------------- | ---------------- | ------------------------------ | --------------------------- |
| `type`              | `t_intervalType` | 音程性质 (`'min'`, `'maj'`...) | `'min'`                     |
| `num`               | `number`         | 音程度数                       | `3`                         |
| `simpleDescription` | `string`         | 中文描述                       | `'小三度'`                  |
| `semitoneGap`       | `number`         | 包含的总半音数量               | `3`                         |
| `isNatural`         | `boolean`        | 是否为自然音程（大、小、纯）   | `true`                      |

#### 方法





##### `getEqualInterval()`



获取与当前音程的半音数相同的所有其他音程。 `getEqualInterval(isSelfTypeExcluded?: boolean, isAugDimExcluded?: boolean, isDoubleAugDimExcluded?: boolean): Interval[]`

TypeScript

```
import { Interval } from 'music12/interval';
const aug4 = new Interval('aug', 4); // 增四度，6个半音
const equals = aug4.getEqualInterval();
console.log(equals.map(i => i.simpleDescription)); // [ '增四度', '减五度', '倍增三度', '倍减六度' ]
```

------

### `Chord` 类

`Chord` 对象由一个根音和一种和弦类型构成。

#### 构造函数

```
new Chord(rootNote: Note, chordKey: string, initTransform?: t_inputTransformPanel)
```

```
import { Chord } from 'music12/chord';
import { Note } from 'music12/note';
const cMaj7 = new Chord(new Note('C', 0, 4), 'maj7');
```

#### 属性 (均为 Getter)

| 属性                | 类型                         | 描述                                            |
| ------------------- | ---------------------------- | ----------------------------------------------- |
| `rootNote`          | `Note`                       | 和弦的根音。                                    |
| `chordKey`          | `string`                     | 和弦的基础类型键，如 'maj7', 'dim3'。           |
| `baseSymbol`        | `string`                     | 和弦基础类型的谱面记号，如 'M7', '°'。          |
| `scoreSymbol`       | `string`                     | 完整的谱面记号，包含所有变化音，如 '7(♭9)'。    |
| `notesList`         | `Note[]`                     | 构成和弦的所有音符实例的数组。                  |
| `intervalList`      | `[t_intervalType, number][]` | 构成和弦的所有音程的数组。                      |
| `transformPanel`    | `t_transformPanel`           | 当前和弦的变化音/省略音配置。                   |
| `isTransformed`     | `boolean`                    | 判断和弦是否应用了任何变化或省略。              |
| `simpleDescription` | `string`                     | 由组成音的简洁描述构成的字符串，如 'C4,E4,G4'。 |

#### 方法

##### `setTransform()`

为和弦添加一个变化音。返回自身，支持链式调用。 `setTransform(transformString: t_transformString): Chord`

```
import { factory } from 'music12';
const g7 = factory.getChord('G', 0, 4, 'dom7');
g7.setTransform('b9').setTransform('#11');
console.log(g7.scoreSymbol); // "7(♭9,#11)"
```

##### `setOmit()`

从和弦中省略一个音。 `setOmit(omitInterval: t_intervalNum): void`

```
import { factory } from 'music12';
const c9 = factory.getChord('C', 0, 4, 'dom9');
c9.setOmit(5); // 省略五音
console.log(c9.notesList.map(n => n.artName)); // [ 'C', 'E', 'Bb', 'D' ]
```

##### `clearTransform()`

移除所有已设置的变化音和省略音，将和弦恢复到其基础形态。 `clearTransform(): void`

```
import { factory } from 'music12';
const chord = factory.getChord('A', 0, 4, 'min7');
chord.setTransform('b5');
console.log(chord.scoreSymbol); // "m7(♭5)"
chord.clearTransform();
console.log(chord.scoreSymbol); // "m7"
```

##### `tryToMergeTransform()`

尝试将一个变化和弦识别为一个新的基础和弦。如果成功，返回一个新的 `Chord` 实例；否则返回应用了变化的原始和弦。 `tryToMergeTransform(): Chord`

```
import { factory } from 'music12';
// 一个大七和弦，但三音和七音都降了半音
const chord = factory.getChord('C', 0, 4, 'maj7', { 3: 'min', 7: 'min' });
// 实际上 C-E-G-B 变成了 C-Eb-G-Bb，这是一个小七和弦
const merged = chord.tryToMergeTransform();
console.log(merged.chordKey); // 'min7'
```

### `Scale` 类

`Scale` 对象代表一个由根音和特定调式构成的音阶。

#### 构造函数

```
new Scale(rootNote: Note, scaleMode: t_scaleMode)
```

```
import { Scale } from 'music12/scale';
import { Note } from 'music12/note';
const aMinorScale = new Scale(new Note('A', 0, 4), 'MIN');
```

#### 属性 (均为 Getter)

| 属性                  | 类型                         | 描述                                 |
| --------------------- | ---------------------------- | ------------------------------------ |
| `rootNote`            | `Note`                       | 音阶的根音（主音）。                 |
| `modeName`            | `string`                     | 调式的名称，如 '自然小调'。          |
| `modeDescription`     | `string`                     | 关于此调式的文字描述。               |
| `type`                | `string`                     | 调式的类别，如 'major', 'minor'。    |
| `notesList`           | `Note[]`                     | 构成音阶的所有音符实例的数组。       |
| `intervalList`        | `[t_intervalType, number][]` | 从根音到其他各级音的音程列表。       |
| `notesPanel`          | `t_scaleNotesPanel`          | 按度数（1-7）索引的音符对象。        |
| `chord3OfDegreesList` | `string[]`                   | 调式内各级三和弦的 `chordKey` 列表。 |
| `chord7OfDegreesList` | `string[]`                   | 调式内各级七和弦的 `chordKey` 列表。 |
| `alterList`           | `number[]`                   | 调式音级相对于自然大调的变化列表。   |

#### 方法

##### `getScaleDegreeNote()`

获取音阶中指定度数的音符。 `getScaleDegreeNote(degree: number): Note`

```
import { factory } from 'music12';
const dDorian = factory.getScale('D', 0, 4, 'DOR');
const sixthNote = dDorian.getScaleDegreeNote(6); // 获取Dorian的第6级音
console.log(sixthNote.artName); // "B" (Dorian的特色音)
```

##### `getNoteByIntervalNum()`

功能与 `getScaleDegreeNote` 类似，但可以处理超过八度的度数。 `getNoteByIntervalNum(num: number, isWithinOctave: boolean = false): Note`

```
import { factory } from 'music12';
const cMajor = factory.getScale('C', 0, 4, 'MAJ');
const note = cMajor.getNoteByIntervalNum(9); // C大调的第9音
console.log(note.simpleDescription); // "D5"
```

##### `getScaleDegreeChord3()`

获取音阶中指定度数的三和弦。 `getScaleDegreeChord3(scaleDegree: number): Chord`

```
import { factory } from 'music12';
const cMajor = factory.getScale('C', 0, 4, 'MAJ');
const dominantChord = cMajor.getScaleDegreeChord3(5); // 获取V级三和弦
console.log(dominantChord.simpleDescription); // "G4,B4,D5"
```

##### `getScaleDegreeChord7()`

获取音阶中指定度数的七和弦。 `getScaleDegreeChord7(scaleDegree: number): Chord`

```
import { factory } from 'music12';
const aMinor = factory.getScale('A', 0, 4, 'MIN');
const submediantChord = aMinor.getScaleDegreeChord7(7); // 获取VII级七和弦
console.log(submediantChord.rootNote.artName + submediantChord.scoreSymbol); // "G7"
```

------

### ✍️ 作者与授权 (Author & License)

#### 作者 (Author)

- GitHub@guohub8080
- 哔哩哔哩@方块郭
- 如果您有任何问题或建议，欢迎通过 GitHub Issues 与我联系。

#### 授权协议 (License)

本仓库遵循 **MIT** 授权协议。