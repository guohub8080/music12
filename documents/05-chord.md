# Chord（和弦）

和弦是 music12 的核心。一个和弦由**根音**（pianoKeyId）和**和弦公式**（如 maj3、dom7）构成——公式定义「这个和弦有哪些音程」，根音决定「在哪个键上弹」。两者组合，和弦就知道自己的每一个音在哪里。

这种「根音 + 公式」的设计，让同一个公式可以在 12 个根音上复用——dom7 公式配上根音 C 就是 C7，配上根音 G 就是 G7，结构完全相同，只是平移了位置。87 个公式 × 12 个根音 = 1044 个和弦实例，覆盖了从基础三和弦到复杂爵士十三和弦的全部常见和弦。

## 创建和弦

```ts
import { Chord } from "music12"

const cMajor = new Chord(0, "maj3")    // C 大三（根音 0 = C）
const g7 = new Chord(7, "dom7")        // G 属七
const cm7b5 = new Chord(0, "min7b5")   // Cm7b5（半减七）
```

第一个参数是根音的 pianoKeyId（0-11），第二个是公式 ID。共有 87 个公式可选，详见[和弦公式文档](./06-chord-formula.md)。

不想算 pianoKeyId？用工厂函数：

```ts
import { getChord } from "music12"
getChord("C", 0, "maj7")   // === new Chord(0, "maj7")
getChord("G", 0, "dom7")   // G7，用音名指定根音
getChord("F#", 0, "min9")  // F#m9
```

## 和弦知道什么

创建之后，和弦能告诉你关于自己的一切。最常用的几个：

```ts
const g7 = new Chord(7, "dom7")

g7.pianoKeyIds        // [7, 11, 2, 5] —— G-B-D-F（按度数序）
g7.pianoKeyIdsSorted  // [2, 5, 7, 11]（升序）
g7.notesNum           // 4
g7.chordFormulaId     // "dom7"
g7.cnName             // "属七"
g7.scoreSymbol        // "7" —— 记谱符号
g7.intervalList       // [["maj",3],["p",5],["min",7]] —— 构成音程
```

`pianoKeyIds` 按度数排列（根、三、五、七），`pianoKeyIdsSorted` 是排序后的——findChord 用后者做匹配。

<details>
<summary>完整属性列表</summary>

| 属性 | 类型 | 说明 | 示例（dom7@C） |
|---|---|---|---|
| `rootPianoKeyId` | `number` | 根音 pianoKeyId | `0` |
| `chordFormulaId` | `string` | 公式 ID | `"dom7"` |
| `family` | `string` | 家族（旧分类） | `"chord7"` |
| `baseSymbol` | `string` | 基础记谱符号 | `"7"` |
| `cnName` | `string` | 中文名 | `"属七"` |
| `baseIntervalList` | `[T_IntervalType, number][]` | 基础音程列表 | `[["maj",3],["p",5],["min",7]]` |
| `intervalList` | `[T_IntervalType, number][]` | 当前音程（含变换） | 同上 |
| `pianoKeyIds` | `number[]` | 各音（按度数序） | `[0,4,7,10]` |
| `pianoKeyIdsSorted` | `number[]` | 升序 | `[0,4,7,10]` |
| `notesNum` | `number` | 音数 | `4` |
| `scoreSymbol` | `string` | 记谱符号（含变换） | `"7"` |
| `isTransformed` | `boolean` | 是否被变换过 | `false` |

</details>

## 变换和弦：sus / add / omit / 升降

这是 Chord 最强大的地方。你可以在一个基础和弦上做各种变换，而不必从头构造新和弦。变换方法都返回 `this`，支持链式调用：

### set：设置某个度数的音程

`set` 是最通用的变换。传数字用默认音程，传 `"#N"` 升高 N 度，传 `"bN"` 降低：

```ts
const c = new Chord(0, "dom7")

c.set(9)    // 加九度（默认大九）→ [0,4,7,10,2]
c.set("#5") // 升五度（纯五→增五）→ 含 8
c.set("b5") // 降五度（纯五→减五）→ 含 6
c.set("b9") // 降九度 → 含 1
```

升降规则：`maj` + `#` → `aug`，`maj` + `b` → `min`，`p` + `#` → `aug`，`p` + `b` → `dim`。度数默认值：`{2:maj, 3:maj, 4:p, 5:p, 6:maj, 7:maj, 9:maj, 11:p, 13:maj}`。

### setSus：挂留和弦

省略三度，换成 2 度（sus2）或 4 度（sus4）。挂留和弦没有「大小」色彩（因为没有三度），听起来是开放的、悬而未决的：

```ts
new Chord(0, "maj3").setSus()   // sus2：C-D-G
new Chord(0, "maj3").setSus(4)  // sus4：C-F-G（更紧张，倾向于解决回大三）
```

### setOmit：省略某个度数

省掉和弦里的某个音。最常省的是**纯五度**——它信息量最低（几乎所有和弦都有纯五度，区分不出和弦性质），爵士和吉他和弦经常省掉它来腾出手指：

```ts
new Chord(0, "dom7").setOmit(5) // C-E-Bb（省了 G）
new Chord(0, "maj7").setOmit(3) // C-G-B（省了 E，失去大小色彩）
```

### clearTransform：回到原点

做完一堆变换，想回到原始和弦：

```ts
const c = new Chord(0, "dom7").set("#5").setOmit(3)
c.clearTransform()
console.log(c.isTransformed) // false
console.log(c.pianoKeyIds)   // [0,4,7,10]（回到原 dom7）
```

### 链式组合实战

```ts
// C13#11（爵士大乐队常用的大和弦）
const c13 = new Chord(0, "dom13").set("#11")
console.log(c13.scoreSymbol)   // "13(#11)"

// C7alt（属七变音和弦，爵士 alt 和声）
const alt = new Chord(0, "dom7").set("#5").set("b9").set("#9")

// 吉他省五度的 maj7 voicing
const voicing = new Chord(0, "maj7").setOmit(5)
console.log(voicing.pianoKeyIds) // [0, 4, 11]（C-E-B，只弹根三七）
```

变换后，`scoreSymbol` 会自动反映所有变换（如 `"7(add9;#5;omit3)"`），`isTransformed` 告诉你这个和弦是否被改过。

> **关于 tags**：和弦公式有多维标签（chord7/dom/altered/sharp5 等），但它们在公式层（ChordFormula），不挂在 Chord 实例上。要按标签查公式，用 [getChordFormulaByTags](./06-chord-formula.md)。

## 获取音符

```ts
const cmaj7 = new Chord(0, "maj7")

cmaj7.getRootNotes()    // [C, B#]（根音，含等音）
cmaj7.getNotesList()    // [C, E, G, B]（所有音，按度数序）
cmaj7.simpleDescription // "C4,E4,G4,B4"
```

`getNotesList` 默认在第 4 八度，可以传参指定：`getNotesList(5)`。`getRootNotes` 返回根音的所有等音（C 和 B#）。

## 反向查找

和弦还能反查自己——「我这个和弦，在 findChord 眼里是什么」：

```ts
const c9 = new Chord(0, "dom9")
const results = c9.find()
console.log(results[0].chordFormulaId) // "dom9"
console.log(results[0].similarity)     // 1（完全匹配）
```

变换后的和弦也能查——查出来会带 `transformString` 说明省了/加了什么。详见 [Find 文档](./08-find.md)。

## 工具函数

`getChordTransformByPianoKeyIds` 分析一组音相对某个和弦的变换（省了什么、加了什么、改了什么）。这在分析用户实际弹奏的 voicing 时有用——用户可能没按标准和弦弹，而是省了几个音或加了几个音：

```ts
import { getChordTransformByPianoKeyIds } from "music12"

// 标准是 C7 [0,4,7,10]，但用户弹了 [0,4,10]（省了五度 G）
const result = getChordTransformByPianoKeyIds(
  { rootPianoKeyId: 0, chordFormulaId: "dom7" },
  [0, 4, 10]
)
// result.omit = [5]（省略了五度）
```

## 实战场景

### 构建爵士 ii-V-I

爵士最经典的进行。用工厂函数 + 变换，几行就能搭出来：

```ts
const ii = getChord("D", 0, "min7")      // Dm7
const v = getChord("G", 0, "dom7")       // G7
const i = getChord("C", 0, "maj7")       // Cmaj7
// Dm7 - G7 - Cmaj7，C 大调的 ii-V-I
```

### 属七变音（alt 和弦）

爵士里 V7 和弦经常加变化音来增加张力，然后解决到 I。最常见的 alt 组合是 #5 + b9：

```ts
const g7alt = getChord("G", 0, "dom7").set("#5").set("b9")
// G7#5b9 —— 高度紧张，强烈倾向于解决到 Cmaj7
```

### 省略五度的 voicing

吉他和爵士钢琴手上手指不够，常省掉纯五度（信息量最低的音），只弹根、三、七：

```ts
const shell = new Chord(0, "dom7").setOmit(5)
// C-E-Bb（省了 G），保持了属七的身份，又省了一个手指
```

### sus 和弦的悬挂感

sus4 和弦用一个 4 度替代 3 度，制造「悬挂」感——听起来和弦没解决，等着回到大三：

```ts
const gsus4 = getChord("G", 0, "maj3").setSus(4)
// G-C-D，没有三度就没有大小色彩，悬在半空中
```
