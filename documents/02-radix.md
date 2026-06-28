# Radix（乐理数学工具）

> music12 的数学根基。整个乐理库建立在一个事实上：**乐理同时使用两套计数系统——7 进制的音名，和 12 进制的半音**。

## 两套计数系统的由来

要理解 music12 的设计，先要理解一个看似矛盾的事实：**音乐的物理基础是 12，但音乐的记谱传统是 7**。

### 12 进制：半音（物理现实）

钢琴的一个八度有 12 个键（7 白 + 5 黑），每个键之间相差一个半音。这是十二平均律的物理现实——一个八度被等分成 12 份。music12 用 `pianoKeyId`（0-11）给这 12 个键编号：

```
键位:   0    1    2    3    4    5    6    7    8    9   10   11
        C    C#   D    D#   E    F    F#   G    G#   A    A#   B
```

12 进制回答的问题是「**这个音精确在哪**」。C 到 G 是 7 个半音，E 到 F 是 1 个半音——这些都是物理事实，用 `pianoKeyId` 相减就能算出来，毫无歧义。

### 7 进制：音名（记谱传统）

但人类记谱时，一个八度里只认 **7 个音名**：C、D、E、F、G、A、B。我们说「三度」、「五度」，数的是音名的步数，不是半音。比如从 C 数到 E，中间跨过 D，共走了 2 步，所以叫「三度」（包含起点的计数方式）：

```
音名:   C    D    E    F    G    A    B
步数:   0    1    2    3    4    5    6
```

7 进制回答的问题是「**这两个音在乐理上是什么关系**」。C 到 E 是三度，C 到 G 是五度——这种「度数」关系是乐理语义的核心，它决定了和弦的性质、调式的结构、旋律的走向。

**关键在于**：度数关系**不依赖半音数**。C 到 E 是三度，不管你把它弹成大三度（4 个半音）还是小三度（3 个半音），它都叫「三度」。这就是为什么 music12 必须同时维护两套计数——只有半音（12 进制）无法表达「度数」这种乐理语义，只有音名步数（7 进制）无法精确到具体的琴键。

### 两套系统如何对应

7 个音名落在 12 个半音的特定位置上。从 C 开始，相邻音名之间的半音距离依次是：

```
         C-D  D-E  E-F  F-G  G-A  A-B  B-C
半音间距:  2    2    1    2    2    2    1
```

这串 **2-2-1-2-2-2-1** 不是随意安排的——它就是**大调音阶**的定义。全全半全全全半（全音-全音-半音-全音-全音-全音-半音）。理解了这一点，就理解了为什么 7 个白键能构成 C 大调：因为它们之间的半音间距正好符合大调的规则。

music12 中所有的音程计算、调式生成、和弦构建，本质上都是在这两个进制之间转换：用 7 进制确定度数关系（语义），用 12 进制确定精确音高（物理）。

## 双进制如何解释乐理现象

掌握了「7 进制管语义、12 进制管物理」，许多乐理现象就有了清晰的数学解释：

**为什么 C# 和 Db 是同一个键但写法不同？** 因为它们在 12 进制里是同一个位置（都是 pianoKeyId 1），但在 7 进制里分属不同音名。C# 的「母音名」是 C（7 进制第 0 步），往上升了 1 个半音；Db 的「母音名」是 D（7 进制第 1 步），往下降了 1 个半音。同一个琴键，两种记谱身份——这就是**等音**。music12 的 `Note` 类同时保存 `step`（音名，7 进制）和 `alter`（升降号，微调量）和 `pianoKeyId`（半音位置，12 进制），完整记录了这层关系。

**为什么大三度和小三度都叫「三度」？** 因为从音名步数看，C 到 E 都跨了 2 步（7 进制相同），所以度数相同。区别在于半音数：大三度是 4 个半音，小三度是 3 个半音（12 进制不同）。`Interval` 类用 `degree`（度数，来自 7 进制）+ `semitoneGap`（半音数，来自 12 进制）两个字段精确区分。同度数下，半音数的差异就产生了大/小/增/减这些音程性质。

**五度圈为什么是 12 个位置循环？** 因为纯五度是 7 个半音，每走一步就在 12 进制里加 7 取余数：0(C)→7(G)→2(D)→9(A)→4(E)→11(B)→6(F#)→1(C#)→8(G#)→3(D#)→10(A#)→5(F)→0(C)。12 步正好绕一圈回到 C。这个循环完全是 12 进制 mod 12 的数学结果。

**为什么 C6 和 Am7 是等和弦？** 它们由完全相同的 4 个琴键组成（pianoKeyId 都是 `[0,4,7,9]`，12 进制相同），但根音不同：C6 以 C 为根，Am7 以 A 为根。不同的根音意味着不同的 7 进制解释，所以记法和功能都不同。

下表汇总了双进制在各乐理概念中的分工：

| 乐理概念 | 7 进制（语义层） | 12 进制（物理层） |
|---|---|---|
| 音符 | step（音名）+ alter（升降号微调） | pianoKeyId（0-11） |
| 音程 | degree（度数） | semitoneGap（半音数） |
| 调式 | 度数序列（1-2-3-4-5-6-7） | 半音序列（如 0-2-4-5-7-9-11） |
| 等音 | 不同（C# 和 Db 母音名不同） | 相同（pianoKeyId 都是 1） |
| 等和弦 | 根音不同导致解释不同 | 音集完全相同 |

## 二维坐标：Radix 类的设计

乐理位置天然是**二维的**——你需要知道「第几个八度」（高位）和「八度内的位置」（低位）。Radix 类把这个二维坐标合成为一个十进制数，方便计算和比较：

```
base10 = 八度 × 进制基数 + 八度内位置
```

比如 C4（第 4 八度的 C）：在 12 进制下是 `4 × 12 + 0 = 48`，在 7 进制下是 `4 × 7 + 0 = 28`。进制不同，base10 就不同——这正是为什么需要 Base12Radix 和 Base7Radix 两个独立的类。

## 为什么有 4 个 7 进制类

7 进制相关的类有 4 个（Base7Radix、StepRadix、IntervalRadix、ScaleRadix），看起来冗余，实则各有必要。区别在于**低位从 0 还是从 1 开始**，以及**低位代表什么**：

- **Base7Radix**：低位从 **0** 开始，表示「第几个音名位」。纯粹的位置计算工具，低位 0 = 第 0 个位置。
- **StepRadix**：继承 Base7Radix，低位也从 0 开始，但**用音名字母**（C/D/E...）而非数字。专门处理「音名步数」——C 到 F 跨几步这种问题。
- **IntervalRadix**：低位从 **1** 开始，表示「几度」。因为乐理里没有「0 度」——一度是起点。九度的 digitPair 是 `[1, 2]`，表示跨了 1 个八度后的第 2 度。
- **ScaleRadix**：低位从 **1** 开始，表示「第几级」。和 IntervalRadix 结构完全一样，只是语义从「音程」换成「调式级数」（也没有「0 级」）。

简单说：**Base7 和 Step 处理「位置」（从 0 数），Interval 和 Scale 处理「度数/级数」（从 1 数，符合乐理习惯）**。混用会导致 off-by-one 错误。

## 何时需要直接用 Radix

**绝大多数场景不需要**。`Note`、`Interval`、`Scale` 已经封装了常用操作：算半音距离用 `note.semitoneMove`，算音程用 `Interval` 类，查度数用 `Scale` 的方法。只有在做**底层乐理运算**（自定义进制、直接操作八度坐标、调号计算、五度圈几何）时，才需要直接用 Radix。

## 类总览

```ts
// 方式 1：从主入口导入（具名导出，无需解构）
import { Base12Radix, StepRadix, IntervalRadix } from "music12"

// 方式 2：从 radix 子路径导入（更精确，treeshaking 更彻底）
import { Base12Radix, StepRadix, IntervalRadix } from "music12/radix"
```

| 类 | 进制 | 低位含义 | 低位起点 | 典型用途 |
|---|---|---|---|---|
| `Radix` | 任意 | 调用方定义 | — | 基类，提供 base10/digitPair/add/getGap |
| `Base12Radix` | 12 | 半音位置 | 0（C=0） | 半音距离、移调 |
| `Base7Radix` | 7 | 音名位 | 0（第 0 位） | 七声框架内的位置计算 |
| `StepRadix` | 7 | 音名序号 | 0（C=0） | 音名步数（用字母，不含升降） |
| `IntervalRadix` | 7 | 音程数 | 1（一度=1） | 音程序号、跨八度判断 |
| `ScaleRadix` | 7 | 音阶级数 | 1（I 级=1） | 调式级数、跨八度判断 |

## API 详解

### Base12Radix · 半音坐标

用 `[八度, 半音位置]` 表示一个精确的音高位置。这是最常用的 Radix 类，所有半音相关的计算都基于它。

**构造**：`Base12Radix.fromArray([八度, 半音])` 或 `new Base12Radix(base10)`。

```ts
const c4 = Base12Radix.fromArray([4, 0])   // 第 4 八度的 C（半音位 0），base10=48
const g4 = Base12Radix.fromArray([4, 7])   // 第 4 八度的 G（半音位 7），base10=55
```

| 属性 | 含义 | C4 的值 |
|---|---|---|
| `base10` | 合成值（八度×12+半音），等价于 MIDI 编号 | `48` |
| `firstDigit` | 八度数（高位） | `4` |
| `lastDigit` | 半音位置 0-11（低位） | `0` |
| `digitPair` | `[八度, 半音]` 数组 | `[4, 0]` |

`add(num)` 加若干半音，返回新实例：`c4.add(7)` 得到 G4。`getGap(other)` 计算 `other - this` 的半音距离，有方向（可正可负）：`c4.getGap(g4)` 得 `7`，`g4.getGap(c4)` 得 `-7`。

### Base7Radix · 七声位置

结构和 Base12Radix 完全一样，只是进制为 7。低位表示「第几个音名位」（0-6），用于按音名步数而非半音计算位置。

```ts
const d4 = Base7Radix.fromArray([4, 2])  // 第 4 八度的第 2 位（D），base10=30
// firstDigit=4, lastDigit=2, digitPair=[4,2]
```

属性与 Base12Radix 一致（`base10`/`firstDigit`/`lastDigit`/`digitPair`）。

### StepRadix · 音名坐标

继承 Base7Radix，区别在于低位接受**音名字母**（「C」~「B」）而非数字。音名与序号的对应：C=0, D=1, E=2, F=3, G=4, A=5, B=6。

```ts
const c = StepRadix.fromArray([4, "C"])  // C4，lastDigit=0
const f = StepRadix.fromArray([4, "F"])  // F4，lastDigit=3
f.lastDigit - c.lastDigit                 // 3 —— C 到 F 跨 3 步（记谱上的四度）
```

StepRadix 只关心音名，不含升降号（C# 和 C 的序号都是 0）。它用于回答「两个音在记谱上跨了几步」这种问题——这比半音距离更能反映度数关系。

### IntervalRadix · 音程序号

表示音程数（一度、二度...九度...），**从 1 开始**（乐理中没有「0 度」）。内部用 Base7Radix，但对外暴露的 `base10` 和 `digitPair` 都从 1 开始。

```ts
new IntervalRadix(3)   // 三度：base10=3, digitPair=[0, 3]（不跨八度）
new IntervalRadix(9)   // 九度：base10=9, digitPair=[1, 2]（跨 1 个八度）
new IntervalRadix(15)  // 十五度：digitPair=[2, 1]（跨 2 个八度）
```

`digitPair[0]` 能直接判断音程是否跨八度：三度是 `[0, 3]`（不跨），九度是 `[1, 2]`（跨一个八度，因为 9 = 7 + 2）。传入 `< 1` 的值抛 `RadixError`。

### ScaleRadix · 调式级数

结构和 IntervalRadix 完全平行，只是语义从「音程」换成「调式级数」（I 级、II 级...），同样从 1 开始。

```ts
new ScaleRadix(1)   // I 级：digitPair=[0, 1]
new ScaleRadix(8)   // VIII 级：digitPair=[1, 1]（高八度的主音）
```

传入 `< 1` 的值抛 `RadixError`。

### Radix · 基类

所有进制类的根基。通常不直接用，但提供了通用的 `fromArray(array, radixBase)` 静态方法，以及 `base10`/`digitPair`/`add`/`getGap` 能力。`fromArray` 要求数组长度恰为 2 且首位是数字，否则抛 `RadixError`。

## 实用示例

**算两音的半音距离**（判断是不是纯五度）：
```ts
const c4 = Base12Radix.fromArray([4, 0])
const g4 = Base12Radix.fromArray([4, 7])
c4.getGap(g4)  // 7 → 纯五度
```

**半音移调**：
```ts
const c4 = Base12Radix.fromArray([4, 0])
const f4 = c4.add(5)        // +5 半音 → F4
f4.digitPair                 // [4, 5]
```

**判断音程是否跨八度**：
```ts
new IntervalRadix(9).digitPair   // [1, 2] → firstDigit=1，跨了八度
new IntervalRadix(3).digitPair   // [0, 3] → 不跨
```

**音名步数距离**（记谱意义上的度数，忽略升降）：
```ts
const c = StepRadix.fromArray([4, "C"])
const f = StepRadix.fromArray([4, "F"])
f.lastDigit - c.lastDigit   // 3 → C 到 F 跨 3 步（四度）
```

## 错误处理

| 场景 | 抛出 |
|---|---|
| `fromArray([4])`（长度 ≠ 2） | `RadixError: Array length must be 2.` |
| `fromArray(["x", 0])`（首位非数字） | `RadixError: First element must be a number.` |
| `new IntervalRadix(0)` | `RadixError: Interval number must be greater than or equal to 1.` |
| `new ScaleRadix(0)` | `RadixError: Scale degree number must be greater than or equal to 1.` |
