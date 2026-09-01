# music12

TypeScript 乐理计算库 — 音符、音程、和弦、调式音阶。

> **v3 核心理念：以钢琴键（pianoKeyId）为一等公民。**
>
> 传统的乐理库以音名（C/D/E...）为核心，但音名带了记谱歧义（C# 还是 Db？）。music12 v3 把**钢琴键**（0-11 的半音位置）作为基础抽象——每个键是客观唯一的物理存在，不存在歧义。音名只是键的「记谱身份」，和弦/调式都建立在键的集合之上。这让等音、等和弦、转位等问题自然消解为同一个键集合的不同解释。
>
> **典型例子——减七和弦的重降号**：Cdim7 的七度音，按记谱法严格推算是 **B♭♭（重降 B）**，因为它从 C 的七度字母 B 降了两个半音。但 B♭♭ 在钢琴上就是 A 键（pianoKeyId 都是 9）。传统记谱要纠结「写 B♭♭ 还是 A」，而 music12 直接用 pianoKeyId 9 表示这个音——重降号的记谱包袱在键的层面自然消解，需要严格记谱时再取等音身份即可。
>
> 详见 [Radix 文档](./documents/02-radix.md) 中对 7 进制（音名）与 12 进制（半音）双体系的阐述。

## 特性

- **Note** — 以 pianoKeyId（0-11）为根基，音名只是记谱身份，等音异名自然统一
- **Interval** — 音程 = 度数（7 进制语义）+ 半音（12 进制精确）的双重表达
- **Chord** — 和弦 = 根键 + 公式，支持变化音（sus、add、omit、升降号），多维标签分类查询
- **Scale** — 调式 = 根键 + 度数序列，10 个家族 47 种调式（自然调式、中国五声、和声小调等）
- **Find** — 反向查找：根据键集合查找和弦/调式，等和弦多解释并存
- **Circle of Fifths** — 五度圈、调号计算
- **Factory** — 便捷工厂函数，无需 `new` 即可创建实例
- 完整 TypeScript 类型支持
- **Tree-shakable** — 按需加载，支持子路径导入（`music12/note`），`import { Note }` 只打包所用代码（~35KB）

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

// 工厂函数（推荐，无需 new）
const note = getNote('C', 0, 4)              // C4
const chord = getChord('C', 0, 'maj7')        // Cmaj7
const scale = getScale('C', 0, 'NATURAL_MAJOR') // C 大调

// 反向查找：根据音符找和弦
import { findChord } from 'music12'
const results = findChord([60, 64, 67, 70])   // C-E-G-Bb = C7
console.log(results[0].chordFormulaId)        // "dom7"
```

> 完整入门指南见 [快速上手文档](./documents/01-getting-started.md)。

---

## 📖 文档

详细 API 文档位于 [`documents/`](./documents/) 目录：

| 文档 | 内容 |
|---|---|
| [快速上手](./documents/01-getting-started.md) | 核心概念（pianoKeyId、等和弦）、安装、第一个例子 |
| [Radix](./documents/02-radix.md) | **核心设计**：7 进制（音名）与 12 进制（半音）的双进制体系 |
| [Note](./documents/03-note.md) | 音符：构造、属性、音程叠加、等音、半音移动、泛音列 |
| [Interval](./documents/04-interval.md) | 音程：类型（纯/大/小/增/减）、度数、半音间距、音程滑动 |
| [Chord](./documents/05-chord.md) | 和弦：构造、变换（set/sus/omit）、音符获取、find 反查 |
| [和弦公式](./documents/06-chord-formula.md) | 87 个公式、tags 标签系统、getChordFormulaByTags 查询 |
| [Scale](./documents/07-scale.md) | 调式：构造、度数查询、顺阶和弦、调式列表 |
| [Find](./documents/08-find.md) | 反向查找：findChord（严格/模糊模式）、调式查找 |
| [Factory](./documents/09-factory.md) | 工厂函数：getNote/getInterval/getChord/getScale |
| [进阶模块](./documents/10-advanced.md) | 五度圈、调号 |

## 核心概念

### PianoKeyId

music12 用 `pianoKeyId`（0-11）表示音高类，不带八度信息。等音（C# = Db）的 pianoKeyId 相同：

```ts
const cSharp = new Note('C', 1, 4)
const dFlat  = new Note('D', -1, 4)
console.log(cSharp.pianoKeyId === dFlat.pianoKeyId) // true，都是 1
```

### 等和弦

不同和弦可能由相同音高集合构成（C6 ≡ Am7）。`findChord` 会同时返回两者，可用 `rootNoteLocation` 区分：

```ts
findChord([60, 64, 67, 69])                       // → C6 + Am7
findChord([60, 64, 67, 69], { rootNoteLocation: 0 }) // → 只 C6
```

### PianoKeyId 对照表

| ID | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 音名 | C | C#/Db | D | D#/Eb | E | F | F#/Gb | G | G#/Ab | A | A#/Bb | B |

---

## Monorepo 架构(v4.0+)

music12 是 **TS + C++ 双实现** 的乐理库,通过共享 JSON 数据 + 黄金测试向量保证幂等。

### 双实现

| 实现 | 语言 | 用途 |
|---|---|---|
| `src/` | TypeScript | Web/Node.js 项目(发布 npm) |
| `mono-repo/cpp/` | C++20 | 桌面应用(如 LMMS 二次开发)|

两个版本读同一份 JSON 数据(`static-data/`),输出完全一致(幂等验证 1687/1687 通过)。

### 数据架构

```
static-data/          ← 单一真相源(7 个 JSON)
├── notes.json        (35 条音符元数据)
├── intervals.json    (39 条音程元数据)
├── chord-formulas.json (87 个和弦公式)
├── scale-modes.json  (46 个调式)
├── chord-instances.json (1044 条 = 87×12)
└── scale-instances.json (552 条 = 46×12)
```

数据由 `ts-dev/music12-gen/` 生成器产出,改数据只需重跑 `pnpm gen:data`。

### 幂等验证

```bash
pnpm verify:all   # TS 测试(213) + C++ 测试(32) + 黄金向量(1687)
```

1687 个黄金测试向量覆盖全调式 × 全和弦,TS 版和 C++ 版跑同样输入,输出必须一致。

### Tree Shaking

每个模块独立加载自己的 JSON,用户只 `import { Note }` → 只打包 5KB(不拖 Chord 的 2.1MB)。

---

## License

MIT
