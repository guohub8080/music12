# Chord 目录

和弦模块，提供和弦的创建和查询功能。

## 目录结构

```
Chord/
├── index.ts                     # 模块导出入口
├── cls/                         # Chord 类及其方法
│   ├── ChordClass.ts            # Chord 主类
│   ├── .bak/                    # 备份目录（旧版本代码）
│   └── classFn/                 # 类方法实现（已废弃，使用元数据）
├── methods/                     # 独立工具函数
├── presets/                     # 预设数据
└── static/                      # 静态数据和类型
    ├── CHORD_INSTANCE_META/     # 所有和弦实例预计算数据（按类型分类）
    ├── CHORD_INSTANCE_META_MAP.ts  # 按和弦公式 ID 索引的映射表
    ├── ALL_CHORD_INSTANCE_META.ts  # 所有和弦实例元数据扁平化数组
    └── types.ts                 # 类型定义
```

## 设计理念

### pianoKeyId 是一等公民

在 Chord 模块的设计中，**pianoKeyId（钢琴键 ID）是一等公民**。这意味着：

- **pianoKeyId** 是模块的核心标识符，范围 0-11，对应 C-B 的十二平均律位置
- 和弦由 `rootPianoKeyId` 和 `chordFormulaId` 唯一确定
- 所有数据基于预计算的元数据，避免运行时复杂计算
- 无缓存设计，每次访问直接从元数据获取

```
rootPianoKeyId + chordFormulaId → Chord 实例
       ↓
预计算元数据 (I_ChordInstanceMeta)
       ↓
pianoKeyIds, 映射关系, 音符详情
```

**为什么这样设计？**

- 和弦结构是固定的，预计算可避免重复的音程计算
- pianokeyid 提供了绝对的音高位置，与音符记谱方式无关
- 查询效率高，内存占用小

## Chord 类

核心类，表示一个由根音钢琴键 ID 和和弦公式 ID 组成的和弦。

### 构造函数

```typescript
new Chord(rootPianoKeyId: number, chordFormulaId: string)
```

```typescript
const cMajor = new Chord(0, 'maj3')   // C 大三和弦
const fSharpMin = new Chord(6, 'min3') // F# 小三和弦
const g7 = new Chord(7, 'dom7')       // G 属七和弦
```

### 核心属性

| 属性 | 类型 | 说明 |
|------|------|------|
| `rootPianoKeyId` | `number` | 根音的钢琴键 ID (0-11) |
| `chordFormulaId` | `string` | 和弦公式 ID |
| `pianoKeyIds` | `number[]` | 和弦的钢琴键 ID 列表（按度数顺序） |
| `pianoKeyIdsSorted` | `number[]` | 和弦的钢琴键 ID 列表（按音高排序） |
| `notesNum` | `number` | 和弦音符数量 |
| `pianoKeyIdToInterval` | `Record` | pianoKeyId → 音程映射 |
| `intervalToPianoKeyId` | `Record` | 音程 → pianoKeyId 映射 |

### 核心方法

#### 音符获取方法

| 方法 | 说明 | 返回值 |
|------|------|--------|
| `getRootNotes()` | 获取根音的 Note 实例数组 | `Note[]` |
| `getNotesList(octave?)` | 获取所有音符的扁平化数组（按 pianoKeyId 排序，已去重） | `Note[]` |
| `getSimpleDescription(octave?)` | 获取简单描述（逗号分隔的音名） | `string` |

> **注意**：`getRootNotes()` 返回的是**数组**，因为同一音高可能有多个等音异名。
> `getNotesList()` 返回的音符已按 `pianoKeyId` 去重，相同音高的不同度数只保留第一次遇到的音符。

#### 变换方法

| 方法 | 说明 | 返回值 |
|------|------|--------|
| `clearTransform()` | 清空所有变换 | `void` |
| `isTransformed` | 是否有变换 | `boolean` |

## 使用示例

```typescript
import { Chord } from '@music12/Chord'

// 创建 C 大三和弦
const cMajor = new Chord(0, 'maj3')

// 获取钢琴键 ID
cMajor.pianoKeyIds         // [0, 4, 7] (C, E, G)
cMajor.pianoKeyIdsSorted   // [0, 4, 7]

// 获取音程映射
cMajor.pianoKeyIdToInterval
// { 0: { intervalType: 'p', intervalNum: 1 },
//   4: { intervalType: 'maj', intervalNum: 3 },
//   7: { intervalType: 'p', intervalNum: 5 } }

// 获取音符列表（已去重，按 pianoKeyId 排序）
cMajor.getNotesList(4)  // [Note(C, 0, 4), Note(E, 0, 4), Note(G, 0, 4)]

// 获取简单描述
cMajor.getSimpleDescription()  // "C4, E4, G4"
```

## 和弦公式 ID

常用的和弦公式 ID：

### 三和弦
- `maj3` - 大三和弦
- `min3` - 小三和弦
- `aug3` - 增三和弦
- `dim3` - 减三和弦

### 七和弦
- `maj7` - 大七和弦
- `min7` - 小七和弦
- `dom7` - 属七和弦
- `dim7` - 减七和弦
- `halfdim7` - 半减七和弦

### 九和弦
- `maj9` - 大九和弦
- `min9` - 小九和弦
- `dom9` - 属九和弦

### 变化和弦
- `dom7_#5` - 属七升五
- `dom7_b9` - 属七降九
- `maj7_#11` - 大七升十一

## 工厂函数

```typescript
import { getChord } from '@music12/factory'

// 使用音名、变音、八度创建和弦
const cMajor = getChord("C", 0, 4, "maj3")
const fSharpMin = getChord("F", 1, 4, "min3")
```
