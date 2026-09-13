# 和弦变化的简单度判定规则

> 来源：Mark Levine《The Jazz Piano Book》、Berklee 体系（flupe.com）、
> The Jazz Piano Site（Available Tensions / Avoid Notes）、
> Music StackExchange 共识、Puget Sound Music Theory。
> 本文件是倒推引擎 cost 函数的乐理依据。

## 核心原则：三个维度决定「简单」

### 1. 省略（omit）的简单度

| 省略什么 | cost | 依据 |
|---|---|---|
| omit5（纯五度） | **0** | 不定义和弦任何性质；声学上被根音暗示；吉他/钢琴最常省 |
| omit11（有三度时） | **0** | 11 度与 3 度形成半音冲突（avoid note），省掉是预期行为 |
| omit9 / omit13 | **0.5** | 扩展音本就是色彩音，省掉减少色彩但不改变身份 |
| omit3 / omit7 | **排除** | guide tones 定义和弦身份（大/小、属/大七），不可省 |
| omit 命名数字度数 | **排除** | id 里的数字是命名音：maj13 omit13、dom9 omit9 名不副实，退化的简单和弦已独立存在 |
| omit 变音度数（aug/dim） | **排除** | 文字前缀编码的身份度数：augmaj7 的 ♯5、halfdim7/dim7 的 ♭5、dom7#11 的 ♯11——省掉即名不副实（augmaj7(omit5) 实为 maj7(omit5)，后者已独立存在）。数字提取抓不到文字前缀，判据用 degreeToIntervalMap 的 interval type ∈ {aug, dim}。审定：用户 2026-09-05（C-P-F {0,1,5} 案例：Pmaj7(omit5) 对、Paugmaj7(omit5) 假解释） |

### 2. 变化（♯/♭）的简单度——取决于和弦性质

| 和弦性质 | 可接受的扩展/变化 | cost | 不可接受的 | cost |
|---|---|---|---|---|
| **dom7** | 9, ♯9, ♭9, ♯11, 13, ♭13 | **1** | — | — |
| **maj7** | 9, ♯11, 13 | **0.5** | ♭9, ♭13 | **3**（avoid note 冲突） |
| **min7** | 9, 11 | **0.5** | ♯9, ♯11, ♭13 | **3** |
| **m7♭5** | 9, 11, ♭13 | **0.5** | ♯9, ♯11 | **3** |
| **dim7** | 借用上下文 | **1** | — | — |
| **minmaj7** | 9, 11, 13 | **0.5** | ♯9, ♯11 | **3** |

**为什么 dom7 什么都能加**：属七和弦的职责就是制造张力驱动解决——
不协和是它的功能，所以 ♭9♯11 这种极端变化在属七上反而是常规操作。

**avoid note 规则**：一个音如果与和弦音形成小九度（半音+八度）冲突，
它就是 avoid note——在 maj7 上 ♭9 与根音形成小九度，所以 cost 极高。

### 3. 双变化（♯♯ / ♭♭）的简单度

| 变化 | cost | 说明 |
|---|---|---|
| ♯♯N / ♭♭N | **4** | 极不寻常；等音上通常等于另一个自然音（如 ♯♯3 = 4） |

## cost 汇总表（引擎实现用）

```ts
// 省略
omitCost(degree, formulaId): degree === 5 ? 0
                                : degree === 11 && hasThird ? 0
                                : [9, 13].includes(degree) ? 0.5
                                : [3, 7].includes(degree) ? Infinity  // 排除
                                : 1

// 变化（升降）
alterCost(offset, formulaFamily): offset === 0 ? 0                    // 无变化
                                  | offset === ±2 ? 4                 // 双变化
                                  | isDom7(formulaFamily) ? 1          // 属七上的变化
                                  | isNaturalExtension ? 0.5           // 自然扩展
                                  : 3                                  // avoid note 冲突

// 新增（add）
addCost(degree, offset, formulaFamily): 同 alterCost
```

## 三层架构映射

| 层 | cost 范围 | 乐理含义 | 引擎 |
|---|---|---|---|
| L0 完全匹配 | cost = 0 且无变换 | 标准和弦 | 哈希桶 O(1) |
| L1 简单变换 | cost ≤ 1 | 省五度/扩展音/属七变化 | 特征音过滤 + cost |
| L2 复杂分解 | cost > 1 | avoid note、双变化、非三度结构 | 倒推引擎 |

## 参考链接

- [The Jazz Piano Site – Available Tensions](https://www.thejazzpianosite.com/jazz-piano-lessons/jazz-chords/available-tensions/)
- [The Jazz Piano Site – Avoid Notes](https://www.thejazzpianosite.com/jazz-piano-lessons/jazz-improvisation/avoid-notes/)
- [Mark Levine – The Jazz Piano Book](https://www.amazon.com/Jazz-Piano-Book-Mark-Levine/dp/0961470151)
- [Berklee 体系 – Tensions (flupe.com)](https://www.flupe.com/lessons/03_advanced-lessons/L24_Tensions/tensions.htm)
- [Music StackExchange – Which notes are optional](https://music.stackexchange.com/questions/3732/which-notes-are-optional-in-jazz-chords)
- [Puget Sound – Jazz Chord Basics](https://musictheory.pugetsound.edu/mt21c/JazzChordBasics.html)
- [PianoWithJonny – Chord Voicings Guide](https://pianowithjonny.com/piano-lessons/jazz-piano-chord-voicings-the-complete-guide/)
- [Wikipedia – Extended chord](https://en.wikipedia.org/wiki/Extended_chord)
- [Wikipedia – Upper structure](https://en.wikipedia.org/wiki/Upper_structure)

---

## 减七和弦的对称性与省略特性

> 来源：Wikipedia "Diminished seventh chord"、Reddit r/musictheory、
> Hoffman Academy、Milne Publishing《Fundamentals, Function, and Form》。
> 发现于用户审核 hash3-report 时(2024-09-04)。

### 核心事实

dim7 = {0, 3, 6, 9} 是**完全对称**结构(四个音等距排列,每个间隔 3 个半音)。

**省掉任何一个音,剩下的三个音永远构成某个根音上的减三和弦(dim3)。**

```
Cdim7 = C - E♭ - G♭ - A = {0, 3, 6, 9}

省掉根音 C(0)   → {3, 6, 9} = E♭dim3 (E♭-G♭-A)
省掉三度 E♭(3)  → {0, 6, 9} = Adim3   (A-C-E♭,等音 G♯dim3)
省掉五度 G♭(6)  → {0, 3, 9} = Adim3   (A-C-E♭,重新排列)
省掉七度 A(9)   → {0, 3, 6} = Cdim3   (C-E♭-G♭)
```

### 对引擎的启示

当引擎给出 `dim7(omit5)` 时,**这不是真正的省略——是等和弦**。
那个被「省掉」的减五度不是可有可无的纯五度,而是减和弦的身份音;
但省掉它之后的结果不是「不完整的 dim7」,而是一个换了根音的**完整 dim3**。

在 hash 表中,这两种解释同时出现(如 C-Q-X 键集同时命中 Cdim3 tier1 和 Qdim7(omit5) tier2)
——这不是 bug,是对称性的必然结果。

### dim7 的四重名字(补充)

由于 dim7 的完全对称性,同一组键有四个合法的根音解释:
```
Cdim7 = E♭dim7 = G♭dim7 = Adim7 = {0, 3, 6, 9}
```
这导致 dim7 只有 3 个真正不同的移调(12 ÷ 4 = 3),与增三和弦(12 ÷ 3 = 4)同属对称家族。

### 来源

- [Wikipedia – Diminished seventh chord](https://en.wikipedia.org/wiki/Diminished_seventh_chord)
- [Reddit r/musictheory – "If you remove any one of a diminished seventh's four notes..."](https://www.reddit.com/r/musictheory/comments/smlhgf/)
- [Reddit r/musictheory – Omitting notes in dim7](https://www.reddit.com/r/musictheory/comments/oef7qq/)
- [Milne Publishing – Fully-Diminished Seventh Chords](https://milnepublishing.geneseo.edu/fundamentals-function-form/chapter/20-fully-diminished-seventh-chords/)
- [Hoffman Academy – Diminished Chords](https://www.hoffmanacademy.com/blog/diminished-chords-on-piano)

---

## 半音簇(Tone Cluster):非功能和声,不可用三度体系解释

> 来源：Wikipedia "Tone cluster"、Kostka & Payne 教科书、
> Reddit r/edmproduction / r/classicalmusic 共识。
> 发现于用户审核 hash3-report 的 tier4 键集(2024-09-04)。

### 定义

三个或以上**相邻半音**同时发声 = 音簇(原型: C-D♭-D 或 C-C♯-D)。

### 核心事实

1. **非功能性(non-functional)**:音簇在传统和声体系中没有功能——
   它的存在理由是**音色/色彩效果**,而非调性解决
2. **二度堆叠(secundal)**:结构上是二度音程的堆叠,
   与三度堆叠(tertian)的和弦体系属于不同世界
3. **后调性理论的处理**:用集合论分析——pitch-class set [0,1,2] = Forte 3-1,
   不用罗马数字和声分析
4. **历史关联**:Henry Cowell 的钢琴音簇技法(用手掌/前臂按键),
   以及 20 世纪现代音乐(Penderecki、Ligeti)的音块写法

### 对引擎的启示

tier4 中出现的半音簇键集(如 C-P-D = {0,1,2})的所有 chord 解释
(如 `Pmaj7sus2(♭2 omit5)`)都是**强行用三度体系解释二度结构**——
技术上凑得出,但乐理上没有意义。

**审核结论:半音簇的 12 个移调应该全部判定为 set(pcset),不是 chord。**

### 来源

- [Wikipedia – Tone cluster](https://en.wikipedia.org/wiki/Tone_cluster)
- [Kostka & Payne – Tonal Harmony](https://dokumen.pub/tonal-harmony-9nbsped-9781266276750-1266276750-9781264094752.html)
- [Reddit r/edmproduction – 共识:non-functional](https://www.reddit.com/r/edmproduction/comments/898ha8/)
- [Reddit r/classicalmusic – 三相邻半音讨论](https://www.reddit.com/r/classicalmusic/comments/126r9u0/)
- [The Jazz Piano Site – Secundal Harmony](https://www.thejazzpianosite.com/jazz-piano-lessons/jazz-chord-voicings/tone-clusters-secundal-harmony/)
- [Chromatone – Tone clusters](https://chromatone.center/theory/chords/clusters/)
