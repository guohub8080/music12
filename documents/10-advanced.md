# 进阶模块：五度圈 · 调号

这两个模块属于进阶用途——日常写和弦/调式/查找代码时用不到，但做调性分析、调号推算、关系调计算时会用到。（Radix 数学工具在[单独的文档](./02-radix.md)里。）

## 五度圈（circleOfFifths）

五度圈是乐理里最重要的循环结构之一——它把 12 个调按纯五度关系排成一圈，揭示了调与调之间的亲缘关系。相邻的调只差一个升降号（C 没有升降，G 有 1 个升号，D 有 2 个...），所以五度圈上离得近的调「关系近」，离得远的「关系远」。

```ts
import { circleOfFifths } from "music12"
```

这是一个命名空间，导出 `CircleOfFifths` 类和 `getFifthCircleByAlter` 函数。

### CircleOfFifths 类

`circleID` 是五度圈上的位置（0-11）。0 = C 大调 / A 小调（没有升降号），顺时针走每一步多一个升号，逆时针走每一步多一个降号：

```ts
const c = new circleOfFifths.CircleOfFifths(0)
c.location   // 0（位置）
c.base10     // 十进制表示
c.majCircle  // 大调圈信息（这个位置对应的大调）
c.minCircle  // 小调圈信息（这个位置对应的小调——大调的关系小调）
```

`move(num)` 在五度圈上移动——正数顺时针（升号方向），负数逆时针（降号方向）。每走一步就是纯五度（+7 半音）：

```ts
const g = new circleOfFifths.CircleOfFifths(0).move(1) // C → G
g.location // 1（G 大调，1 个升号 F#）

const f = new circleOfFifths.CircleOfFifths(0).move(-1) // C → F
f.location // -1 即 11（F 大调，1 个降号 Bb）
```

五度圈的数学本质是 12 进制的循环：每次 +7 取 mod 12，12 步回到起点。详见 [Radix 文档](./02-radix.md)。

### getFifthCircleByAlter

根据**升降号数**直接查五度圈信息——你告诉它「3 个升号」，它告诉你这是 A 大调：

```ts
circleOfFifths.getFifthCircleByAlter(2)   // 2 个升号 → D 大调
circleOfFifths.getFifthCircleByAlter(-3)  // 3 个降号 → Eb 大调
```

这在读谱时有用——看到调号有 3 个升号，立刻能查到是 A 大调（或 F# 小调）。

## 调号（Stave）

调号（key signature）是五线谱开头的升降号标记，它告诉你这首曲子主要用什么调。Stave 模块处理调号相关的计算：

```ts
import { getStaveAlterByNote, getAlterStepListByNum, getScaleByStaveAlters } from "music12"
```

### getStaveAlterByNote

查某音符在调号体系下的信息——它在哪些大/小调里是「调内音」、需要几个升降号：

```ts
getStaveAlterByNote("G", 0)
// 返回大调和小调两种情况：G 在大调体系下对应 1 个升号（D 大调的属音），
// 在小调体系下对应其他值
```

### getAlterStepListByNum

给定升降号数量，返回需要变化的音名列表。这是调号的「内容」——几个升号具体升哪几个音：

```ts
getAlterStepListByNum(1)   // ["F"]（1 个升号升 F → F#）
getAlterStepListByNum(2)   // ["F", "C"]（2 个升号升 F 和 C）
getAlterStepListByNum(3)   // ["F", "C", "G"]（3 个升号升 F、C、G）
getAlterStepListByNum(-1)  // ["B"]（1 个降号降 B → Bb）
getAlterStepListByNum(-2)  // ["B", "E"]（2 个降号降 B 和 E）
```

注意升降号的顺序是固定的：升号按 F-C-G-D-A-E-B（五度圈顺时针），降号按 B-E-A-D-G-C-F（逆序）。

### getScaleByStaveAlters

根据调号信息反查调式——你给它调号（哪些音升/降了），它返回对应的调式：

```ts
getScaleByStaveAlters([{ step: "F", alter: 1 }])
// 根据 F# 这个调号返回对应的调式（G 大调或 E 小调）
```

## 实战场景

### 判断两个调的关系远近

五度圈上离得越近的调，关系越近（共享的音越多）。C 和 G 只差 1 个音（F vs F#），C 和 F# 差 6 个音（三全音距离，关系最远）：

```ts
const c = new circleOfFifths.CircleOfFifths(0)
const g = new circleOfFifths.CircleOfFifths(0).move(1)
// C 和 G 在五度圈上相邻，关系最近
```

### 从调号推调名

看到乐谱上有 3 个升号，想知道是什么调：

```ts
getAlterStepListByNum(3)  // ["F", "C", "G"] —— 升这 3 个音
// 3 个升号 = A 大调（或 F# 小调）
```

## 关系调与平行调

五度圈还能帮你理解调与调之间的关系：

- **关系大小调**：共享同一调号的大调和小调。C 大调的关系小调是 A 小调（都没有升降号），它们在五度圈的同一位置。`CircleOfFifths` 的 `majCircle` 和 `minCircle` 就是这对关系调。
- **平行调**：同主音但不同性质（C 大调 vs C 小调）。它们共享根音但调号不同——C 大调没升降，C 小调有 3 个降号。

```ts
// C 大调的位置（0）和它的关系小调 A 小调在同一位置
const pos = new circleOfFifths.CircleOfFifths(0)
pos.majCircle  // C 大调信息
pos.minCircle  // A 小调信息（关系小调，同调号）
```

这种关系在分析和声进行时很重要——很多古典作品的展开段就是在关系调/平行调之间游走。
