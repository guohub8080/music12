# note 目录

音符模块，提供音符的创建、计算和转换功能。

## 目录结构

```
note/
├── index.ts                 # 模块导出入口
├── cls/                     # Note 类及其方法
│   ├── NoteClass.ts         # Note 主类
│   └── classFn/             # 类方法实现
├── methods/                 # 独立工具函数
│   ├── getCasualRandomNote.ts   # 任意随机音符
│   ├── getWhiteRandomNote.ts    # 白键随机音符
│   ├── getBlackRandomNote.ts    # 黑键随机音符
│   ├── getNormalRandomNote.ts   # 常用随机音符
│   ├── getNoteByLocation.ts     # 根据半音位置获取音符
│   ├── normalizeOctave.ts       # 规范化八度参数
│   └── getUpwardLocationGap.ts  # 半音距离计算
└── static/                  # 静态数据和类型
    ├── NOTE_META.ts         # 音符元数据（所有可能的音符组合）
    └── types.ts             # 类型定义
```

## Note 类

核心类，表示一个具有绝对音高的音符。

### 构造函数

```typescript
new Note(step: T_NoteStep, alter: T_AlterValue, octave: number)
```

```typescript
const c4 = new Note('C', 0, 4)      // C4（中央C）
const gSharp5 = new Note('G', 1, 5) // G#5
const eFlat4 = new Note('E', -1, 4) // Eb4
```

### 属性

| 属性 | 类型 | 说明 |
|------|------|------|
| `step` | `T_NoteStep` | 音名（C, D, E, F, G, A, B） |
| `alter` | `T_AlterValue` | 变化音（-2 到 2） |
| `octave` | `number` | 八度数 |
| `artName` | `string` | 艺术名称（C#, Eb, F## 等） |
| `mathName` | `string` | 数学名称（C+1, E-1, F+2 等） |
| `pitchValue` | `number` | MIDI 音高值（绝对音高） |
| `pianoKeyId` | `number` | 钢琴键位置（0-11） |
| `semitoneWithinOctave` | `number` | 相对 C0 的半音数 |
| `stepId` | `number` | 音名索引（C=0, D=1...） |
| `isBlack` | `boolean` | 是否为黑键 |
| `isNormal` | `boolean` | 是否为常用音（升降号不超过 1） |
| `fifthValue` | `number` | 五度圈值 |
| `simpleDescription` | `string` | 简洁描述（如 "C4"） |
| `pianoKeyRadix` | `PianoKeyRadix` | 对应的钢琴键位置实例 |

### 方法

| 方法 | 说明 |
|------|------|
| `getNoteByInterval(interval)` | 根据音程计算目标音符 |
| `getNoteByIntervalString(str)` | 根据简谱标记计算（如 "b7", "#4"） |
| `getSamePitchNotes(includeSelf?, alterLimit?)` | 获取所有等音异名 |
| `semitoneMove(n)` | 半音移动 |
| `getHarmonicSeries()` | 获取泛音序列 |
| `get251as(role)` | 获取 ii-V-I 进行（角色：1/2/5） |

## methods 工具函数

### 随机音符生成

```typescript
import { getCasualRandomNote, getWhiteRandomNote, getBlackRandomNote, getNormalRandomNote } from './note'

// 任意随机音符
getCasualRandomNote()                     // 八度 4 的随机音符
getCasualRandomNote({ octave: 5 })        // 八度 5 的随机音符
getCasualRandomNote({ octave: [3, 4, 5] }) // 八度 3/4/5 中随机选一个

// 白键随机音符
getWhiteRandomNote()                      // isNormal=true: C D E F G A B
getWhiteRandomNote({ isNormal: false })   // 包含 Cb, Fb 等

// 黑键随机音符
getBlackRandomNote()                      // isNormal=true: C# Eb F# G# Bb
getBlackRandomNote({ isNormal: false })   // 包含所有黑键变体

// 常用音符随机（黑白键均可）
getNormalRandomNote()
getNormalRandomNote({ octave: 5 })
```

### 位置查找

```typescript
import { getNoteByLocation } from './note'

// 获取位置 0（C/C#等）的所有常用音符
getNoteByLocation(0)                      // [Note(C,0), Note(B#,1)]
getNoteByLocation(0, { octave: 5 })       // 指定八度为 5
```

### 半音距离计算

```typescript
import { getUpwardLocationGap } from './note'

// 计算两个位置之间的向上半音距离
getUpwardLocationGap(0, 7)   // C 到 G = 7
getUpwardLocationGap(7, 0)   // G 到 C = 5（跨八度）
```

## static 静态数据

### NOTE_META

包含所有可能的音符组合（35 个），包括：
- 7 个自然音（C, D, E, F, G, A, B）
- 5 个常用升号音（C#, D#, F#, G#, A#）
- 5 个常用降号音（Db, Eb, Gb, Ab, Bb）
- 其他变化音（C##, Fb, B## 等）

### getNotesByLocation

~~已删除，请使用 `PianoKeyRadix.getNotes()` 替代。~~

```typescript
import { PianoKeyRadix } from '@music12/common/radix'

// 获取位置 1（C#/Db）的所有常用音符
const key = new PianoKeyRadix(61)  // C#4 的 pitchValue
key.getNotes({ isNormal: true, alterAbsLte: 1 })
```

## 类方法实现

所有 Note 类的方法都在 `cls/classFn/` 中单独实现：

| 文件 | 功能 |
|------|------|
| `cls_initNoteClass.ts` | 初始化音符属性 |
| `cls_getNoteByInterval.ts` | 根据音程计算目标音符 |
| `cls_getNoteByString.ts` | 解析简谱标记 |
| `cls_getSamePitchNotes.ts` | 查找等音异名 |
| `cls_semitoneMove.ts` | 半音移动 |
| `cls_getHarmonicSeries.ts` | 计算泛音序列 |
| `cls_getTemp251.ts` | ii-V-I 进行计算 |
