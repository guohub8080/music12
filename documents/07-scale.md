# Scale（调式）

调式（Scale）描述一组音的排列规则——C 大调、D 多利亚、宫调式……它由**根音**（pianoKeyId）和**调式 ID**（如 NATURAL_MAJOR）构成。知道这两样，调式就能告诉你每个度数是哪个音、哪些音在调内、每个级数上叠什么和弦。

调式和和弦的关系密切——顺阶和弦（diatonic chords）就是在一个调式的每个级数上，按三度堆叠出来的和弦。C 大调的 1 级是 Cmaj7、2 级是 Dm7、5 级是 G7……这些和弦「天然」属于 C 大调，听起来和谐。理解调式，就能理解和弦为什么在特定调里「对味」。

## 创建调式

```ts
import { Scale } from "music12"

const cMajor = new Scale(0, "NATURAL_MAJOR")  // C 自然大调
const aMinor = new Scale(9, "NATURAL_MINOR")  // A 自然小调
const dDorian = new Scale(2, "DORIAN")        // D 多利亚
```

不想算 pianoKeyId？用工厂函数，mode 名大小写都行：

```ts
import { getScale } from "music12"
getScale("C", 0, "NATURAL_MAJOR")  // === new Scale(0, "NATURAL_MAJOR")
getScale("A", 0, "natural_minor")  // 大小写不敏感
getScale("G", 1, "DORIAN")         // G# 多利亚
```

## 有哪些调式

music12 内置了 10 个家族、44 种调式。调式按家族分组，定义在 `SCALE_MODE_GROUPS` 里：

```ts
import { SCALE_MODE_GROUPS } from "music12"

SCALE_MODE_GROUPS.DIATONIC
// ["NATURAL_MAJOR", "DORIAN", "PHRYGIAN", "LYDIAN", "MIXOLYDIAN", "NATURAL_MINOR", "LOCRIAN"]
```

| 家族 | 内容 | 特色 |
|---|---|---|
| `DIATONIC` | 自然大调 + 6 个教会调式 | 西方音乐基础，7 个音 |
| `HARMONIC_MINOR` | 和声小调 + 5 个衍生模式 | 含增二度，异域色彩 |
| `MELODIC_MINOR` | 旋律小调 + 4 个衍生模式 | 爵士高级和声的基础 |
| `DOUBLE_HARMONIC` | 双和声、匈牙利小调等 | 含两个增二度 |
| `CHINESE_PENTATONIC` | 宫商角徵羽 | 5 声，无半音，中国风 |
| `CHINESE_YAYUE` / `QINGYUE` / `YANYUE` | 雅乐/清乐/燕乐 | 中国传统七声 |

教会调式（Dorian/Phrygian/Lydian...）其实就是自然大调从不同音开始弹——D Dorian 就是 C 大调从 D 开始弹到下一个 D。它们共享相同的音，但根音不同导致色彩不同。这就是为什么 D Dorian 听起来比 C 大调「暗」——因为它的根音变了，音程关系变了。

## 调式知道什么

```ts
const cMajor = new Scale(0, "NATURAL_MAJOR")

cMajor.pianoKeyIds      // [0, 2, 4, 5, 7, 9, 11] —— 调内的音（按度数序）
cMajor.pianoKeyIdsSorted // [0, 2, 4, 5, 7, 9, 11]
cMajor.modeName         // "自然大调"
cMajor.type             // "major"
cMajor.simpleDescription // "C4,D4,E4,F4,G4,A4,B4"
cMajor.naturalNotesNum  // 6（还原音数量，统计度数 2-7）
```

`degreeToPianoKeyId` 是度数到音的映射表：`{1:0, 2:2, 3:4, 4:5, 5:7, 6:9, 7:11}`。反过来 `pianoKeyIdToDegree` 是音到位度的映射，不在调里的音映射到 null。

## 查询：某个音在不在调里

这是调式最常用的功能——判断旋律里的音是否「合法」（在调内）：

```ts
cMajor.hasPianoKeyId(0)            // true（C 在 C 大调）
cMajor.hasPianoKeyId(1)            // false（C# 不在）

cMajor.getDegreeByPianoKeyId(0)    // 1（C 是 1 度）
cMajor.getDegreeByPianoKeyId(4)    // 3（E 是 3 度）
cMajor.getDegreeByPianoKeyId(1)    // null（C# 不在调内）

cMajor.getPianoKeyIdByDegree(5)    // 7（5 度是 G）
cMajor.getAlterByDegree(3)         // 0（E 是还原音）
```

`getDegreeByPianoKeyId` 返回 null 表示这个音不在调内——这在分析调性外音（变化音、离调）时很有用。

## 顺阶和弦

这是调式最有音乐价值的功能——在每个级数上堆叠三度，得到「属于这个调」的和弦。C 大调的 7 个顺阶七和弦构成了几乎所有流行和爵士和声的基础：

```ts
cMajor.getScaleDegreeChord7(1) // Cmaj7（1 级，主功能）
cMajor.getScaleDegreeChord7(2) // Dm7（2 级，下属功能）
cMajor.getScaleDegreeChord7(5) // G7（5 级，属功能——制造张力）
cMajor.getScaleDegreeChord7(7) // Bm7b5（7 级，半减七——最不稳定）
```

三和弦用 `getScaleDegreeChord3`。级数范围 1-7，超出抛 `RangeError`。

结果会**优先返回以该级音为根的解释**（等和弦的其他记法排在后面）。比如 C 大调 7 级的 B-D-F-A，优先返回 Bm7b5（B 为根），而不是它的等和弦 Dm6。

## 跨八度取音

`getNoteByIntervalNum` 按音程序号取音，支持跨八度。1 度是根音，8 度是高八度的根音，9 度是高二度音：

```ts
cMajor.getNoteByIntervalNum(1) // { pianoKeyId: 0, octave: 0 }
cMajor.getNoteByIntervalNum(8) // { pianoKeyId: 0, octave: 1 }（高八度）
cMajor.getNoteByIntervalNum(9) // { pianoKeyId: 2, octave: 1 }（高二度音 D）
```

> **五声调式注意**：五声（宫商角徵羽 = 1-2-3-5-6 度）缺 4 度和 7 度。传这些不存在的度数，返回 `null`（不会崩溃）——这是 v3 修复的行为。

## 五声调式

中国五声调式只有 5 个音，没有半音（相邻音都是全音或小三度），听起来圆润、没有「刺」：

```ts
const cGong = new Scale(0, "GONG") // C 宫
console.log(cGong.pianoKeyIds)     // [0, 2, 4, 7, 9]（C-D-E-G-A）
console.log(cGong.pianoKeyIds.length) // 5
```

五个调式（宫商角徵羽）是同样的 5 个音，但从不同音开始——就像教会调式之于自然大调。宫调式以 C 为根，商调式以 D 为根……色彩各异。

## 实战场景

### 列出调内所有七和弦（和声分析）

这是做和声分析的标准操作——把一个调的「和弦武器库」列出来：

```ts
const cMajor = new Scale(0, "NATURAL_MAJOR")
for (let i = 1; i <= 7; i++) {
  const chord = cMajor.getScaleDegreeChord7(i)[0]
  console.log(`${i} 级: ${chord.chordFormulaId} @ ${chord.pianoKeyIdRoot}`)
}
// 1: maj7 @ 0(C), 2: min7 @ 2(D), 3: min7 @ 4(E), 4: maj7 @ 5(F),
// 5: dom7 @ 7(G), 6: min7 @ 9(A), 7: halfdim7 @ 11(B)
```

看到这个列表，ii-V-I 的来源就清楚了：2 级 Dm7 → 5 级 G7 → 1 级 Cmaj7，它们都是 C 大调的顺阶和弦，所以听起来「顺」。

### 判断旋律是否在调内

```ts
const cMajor = new Scale(0, "NATURAL_MAJOR")
const melody = [0, 2, 4, 5, 7, 9, 11] // C 大调音阶
melody.every(id => cMajor.hasPianoKeyId(id)) // true

const withAccidental = [0, 2, 4, 6, 7] // 含 F#（不在 C 大调）
withAccidental.every(id => cMajor.hasPianoKeyId(id)) // false
```

### 调式爵士 solo

D Dorian 是爵士最常用的调式（Miles Davis 的《So What》）。知道它的音，就能在上面即兴：

```ts
const dDorian = new Scale(2, "DORIAN")
console.log(dDorian.pianoKeyIds) // [2, 4, 5, 7, 9, 11, 0]
// D-E-F-G-A-B-C，D Dorian 的 7 个音，都可以用来 solo
```
