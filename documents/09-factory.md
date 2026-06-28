# Factory（工厂函数）

每次写 `new Note("C", 0, 4)` 或 `new Chord(0, "maj7")` 都要算 pianoKeyId，有点麻烦。工厂函数让你直接用音名 + 升降号创建实例，不用 `new`，不用记数字。

工厂函数的本质是「语法糖」——它们内部还是调用 `new Note` / `new Chord`，只是帮你把音名 + 升降号转换成 pianoKeyId。用 `getChord("G", 0, "dom7")` 和 `new Chord(7, "dom7")` 效果完全一样，但前者更直观（G 比 7 好认）。

## 总览

```ts
import { getNote, getInterval, getChord, getScale } from "music12"
// 或从子路径：import { getNote } from "music12/factory"
```

| 函数 | 等价于 | 用途 |
|---|---|---|
| `getNote(step, alter, octave)` | `new Note(...)` | 创建音符 |
| `getInterval(type, degree)` | `new Interval(...)` | 创建音程 |
| `getChord(step, alter, formulaId)` | `new Chord(pianoKeyId, id)` | 创建和弦（用音名） |
| `getScale(step, alter, modeId)` | `new Scale(pianoKeyId, id)` | 创建调式（用音名） |

## getNote

三个参数：音名字母、升降号、八度。

```ts
getNote("C", 0, 4)   // C4（中央 C）
getNote("F", 1, 4)   // F#4（1 = 升半音）
getNote("B", -1, 3)  // Bb3（-1 = 降半音）
getNote("C", 2, 4)   // C×4（2 = 重升，少见但合法）
getNote("G", 0)      // G5（八度默认 5）
```

音名大小写都行（"c" 和 "C" 一样）。升降号范围 ±2（重升重降）。八度可省略，默认 5。无效音名（如 "H"）或超出范围的升降号抛 `FactoryError`。

工厂函数的价值在于**可读性**——`getNote("F", 1, 4)` 一眼就知道是 F#4，而 `new Note("F", 1, 4)` 虽然也清楚，但在组合使用时（如创建和弦）工厂更简洁。

## getInterval

```ts
getInterval("maj", 3)  // 大三度
getInterval("p", 5)    // 纯五度
getInterval("min", 7)  // 小七度
getInterval("aug", 4)  // 增四度（三全音）
```

音程类型详见 [Interval 文档](./04-interval.md)。`getInterval` 基本就是 `new Interval` 的别名，存在主要是为了和其他三个工厂函数保持一致的 API 风格。

## getChord

工厂函数里最实用的一个——用音名指定根音，不用算 pianoKeyId：

```ts
getChord("C", 0, "maj7")   // Cmaj7（=== new Chord(0, "maj7")）
getChord("G", 0, "dom7")   // G7
getChord("F", 1, "min9")   // F#m9
getChord("B", -1, "dim7")  // Bbdim7
getChord("Eb", 0, "halfdim7") // Ebm7b5
```

第二个参数是根音的升降号（0=还原、1=升、-1=降）。可用公式 ID 详见[和弦公式文档](./06-chord-formula.md)。

## getScale

```ts
getScale("C", 0, "NATURAL_MAJOR")  // C 大调
getScale("A", 0, "natural_minor")  // A 小调（mode 名大小写不敏感）
getScale("G", 1, "DORIAN")         // G# 多利亚
getScale("F", 0, "HARMONIC_MINOR") // F 和声小调
```

mode 名内部会自动转大写，所以 "natural_minor" 和 "NATURAL_MINOR" 都行。无效音名抛 `FactoryError`；未知调式也抛 `FactoryError`（包装了 Scale 的 "Scale not found" 错误）。

## 实战场景

### 一行创建完整和弦

工厂 + 链式变换，不用 new，不用算 pianoKeyId：

```ts
const chord = getChord("C", 0, "dom13").set("#11")
// C13#11 —— 爵士大乐队的大和弦
```

### 从音名快速查 pianoKeyId

不知道某个音的 pianoKeyId？用 getNote 查：

```ts
getNote("A", 0, 4).pianoKeyId  // 9
getNote("Eb", 0, 4).pianoKeyId // 3（E + 降号）
getNote("B#", 0, 4).pianoKeyId // 0（B# = C）
```

### 批量创建调式

想在一个根音上列出所有调式，工厂函数让代码很简洁：

```ts
const modes = ["NATURAL_MAJOR", "DORIAN", "PHRYGIAN", "LYDIAN"]
  .map(mode => getScale("C", 0, mode))
```

### ii-V-I 一气呵成

爵士最经典的进行，工厂函数让代码像乐谱一样好读：

```ts
const ii = getChord("D", 0, "min7")   // Dm7
const v = getChord("G", 0, "dom7")    // G7
const i = getChord("C", 0, "maj7")    // Cmaj7
```

对比用 `new Chord` 写：`new Chord(2, "min7")` / `new Chord(7, "dom7")` / `new Chord(0, "maj7")`——数字不如音名直观，尤其 Dm7 的根音是 2（不是直觉的 D 对应的某个数）。

### 创建整个调式的顺阶和弦

工厂 + Scale 配合，自动生成一个调的全部和弦：

```ts
const cMajor = getScale("C", 0, "NATURAL_MAJOR")
const chords = []
for (let i = 1; i <= 7; i++) {
  const result = cMajor.getScaleDegreeChord7(i)[0]
  chords.push(result.chordFormulaId + "@" + result.pianoKeyIdRoot)
}
// ["maj7@0", "min7@2", "min7@4", "maj7@5", "dom7@7", "min7@9", "halfdim7@11"]
```

## 错误处理

所有工厂函数在输入非法时抛 `FactoryError`（统一错误类型，方便 catch）：

```ts
getNote("H", 0, 4)        // FactoryError（"H" 不是有效音名）
getNote("C", 3, 4)        // FactoryError（alter 超出 ±2）
getChord("C", 0, "bogus") // FactoryError（公式不存在）
getScale("C", 0, "FAKE")  // FactoryError（调式不存在）
```

## 何时用工厂 vs 何时用 new

简单原则：**用音名思考时用工厂，用 pianoKeyId 思考时用 new**。

- 从用户输入（音名）创建 → 工厂（`getChord("G", 0, "dom7")`）
- 从计算结果（pianoKeyId）创建 → new（`new Chord(rootPianoKeyId, "dom7")`）
- 快速测试/原型 → 工厂（少打字）
- 性能敏感的循环 → new（省一次音名→pianoKeyId 转换）

大多数场景工厂就够了，代码更可读。
