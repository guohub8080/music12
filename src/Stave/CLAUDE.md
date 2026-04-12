# Stave 目录

谱号/调号工具模块，提供调号相关的工具函数。

## 核心设计理念

**升降号顺序由 CircleOfFifths 定义**

本模块完全依赖 `CircleOfFifths` 类来实现调号相关功能：
- 升降号顺序定义在 `CircleOfFifths` 类中（`SHARP_ORDER` 和 `FLAT_ORDER` 静态常量）
- 本模块只负责使用这些常量，不重复定义

**升降号顺序**（五度圈的基本规律）：
- 升号顺序 = `CircleOfFifths.SHARP_ORDER`: F → C → G → D → A → E → B
- 降号顺序 = `CircleOfFifths.FLAT_ORDER`: B → E → A → D → G → C → F

## 目录结构

```text
Stave/
├── index.ts              # 模块导出入口
├── CLAUDE.md             # 本文档
└── methods/              # 工具函数
    ├── getAlterStepListByNum.ts   # 获取升降音名列表
    ├── getScaleByStaveAlters.ts   # 获取调性信息
    └── getStaveAlterByNote.ts     # 获取音符对应的调性信息
```

## 工具函数

### getAlterStepListByNum()

根据调号数量获取需要升降的音名列表。

```typescript
import { getAlterStepListByNum } from './Stave'

// 正数 = 升号
getAlterStepListByNum(1)  // ['F']     - 1 个升号：F#
getAlterStepListByNum(2)  // ['F', 'C'] - 2 个升号：F#, C#
getAlterStepListByNum(3)  // ['F', 'C', 'G']

// 负数 = 降号
getAlterStepListByNum(-1)  // ['B']     - 1 个降号：Bb
getAlterStepListByNum(-2)  // ['B', 'E'] - 2 个降号：Bb, Eb
```

**参数范围**：-7 到 7

### getScaleByStaveAlters()

根据调号数量获取对应的调性信息。

```typescript
import { getScaleByStaveAlters } from './Stave'

// 获取 2 个升号的调性
getScaleByStaveAlters(2)  // D 大调、b 小调信息

// 获取 3 个降号的调性
getScaleByStaveAlters(-3)  // Eb 大调、c 小调信息
```

**参数范围**：-7 到 7

### getStaveAlterByNote()

根据音符获取其可能所属的调性信息。

```typescript
import { getStaveAlterByNote } from './Stave'

// 查找 C 音符对应的调性
getStaveAlterByNote('C', 0)  // 返回所有以 C 为根音的调性信息

// 查找 G# 音符对应的调性
getStaveAlterByNote('G', 1)  // 返回所有以 G# 为根音的调性信息
```

## 调号对照表

| 调号 | 大调 | 小调 | 升/降音 |
| ---- | ---- | ---- | ------- |
| 0 | C | a | 无 |
| 1# | G | e | F |
| 2# | D | b | F, C |
| 3# | A | f# | F, C, G |
| 4# | E | c# | F, C, G, D |
| 5# | B | g# | F, C, G, D, A |
| 6# | F# | d# | F, C, G, D, A, E |
| 7# | C# | a# | F, C, G, D, A, E, B |
| 1b | F | d | B |
| 2b | Bb | g | B, E |
| 3b | Eb | c | B, E, A |
| 4b | Ab | f | B, E, A, D |
| 5b | Db | bb | B, E, A, D, G |
| 6b | Gb | eb | B, E, A, D, G, C |
| 7b | Cb | ab | B, E, A, D, G, C, F |

## 相关模块

- **CircleOfFifths**: 五度圈类（定义升降号顺序）
- **Scale**: 音阶类
- **Note**: 音符类
