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
