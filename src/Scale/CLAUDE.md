# Scale 目录

调式模块，提供调式的创建、音级查询和顺阶和弦计算功能。

## 目录结构

```
Scale/
├── index.ts                     # 模块导出入口
├── cls/                         # Scale 类及其方法
│   ├── ScaleClass.ts            # Scale 主类
│   └── classFn/                 # 类方法实现
│       ├── cls_hasPianoKeyId.ts
│       ├── cls_getDegreeByPianoKeyId.ts
│       ├── cls_getDegreeAndAlter.ts
│       ├── cls_getPianoKeyIdByDegree.ts
│       ├── cls_getAlterByDegree.ts
│       ├── cls_getRootNote.ts
│       ├── cls_getNoteByDegree.ts
│       ├── cls_getScaleDegreeChord3.ts
│       ├── cls_getScaleDegreeChord7.ts
│       ├── cls_getNoteByIntervalNum.ts
│       ├── cls_simpleDescription.ts
│       ├── cls_naturalNotesNum.ts
│       ├── cls_alteredNotesNum.ts
│       ├── cls_sharpOrFlatNotesNum.ts
│       ├── cls_doubleSharpOrFlatNotesNum.ts
│       ├── cls_isTonicReplaced.ts
│       ├── cls_chord3OfDegreesList.ts
│       └── cls_chord7OfDegreesList.ts
├── methods/                     # 独立工具函数
├── presets/                     # 预设数据
└── static/                      # 静态数据和类型
    ├── SCALE_INSTANCE_META/     # 所有调式实例预计算数据
    ├── allScaleInstances.ts     # 调式实例获取函数
    ├── scaleModeTypes.ts        # 调式类型定义
    ├── scaleMetaUtils.ts        # 调式元数据工具
    └── types.ts                 # 类型定义
```

## 设计理念

### pianoKeyId 是一等公民

在 Scale 模块的设计中，**pianoKeyId（钢琴键 ID）是一等公民**。这意味着：

- **pianoKeyId** 是模块的核心标识符，范围 0-11，对应 C-B 的十二平均律位置
- 所有调式的计算和查询都以 pianoKeyId 为基础
- 度数（degree）与 pianoKeyId 之间建立了双向映射关系
- 变音值（alter）是 pianoKeyId 在特定调式中的**属性**，而非音符本身的固有属性

```
pianoKeyId  →  degree  →  alter
     ↓
  位置是绝对的，度数和变音值是相对于调式的
```

**为什么这样设计？**

- 同一个 pianoKeyId 在不同调式中可能有不同的度数和变音值
- 例如：pianoKeyId = 6（F#/Gb）
  - 在 C 大调中：不在调式内
  - 在 D 大调中：degree = 4, alter = 1 (#4)
  - 在 Db 大调中：degree = 5, alter = -1 (b5)

这种设计使得调式计算更加直观和高效，避免了复杂的音符名称转换。

## Scale 类

核心类，表示一个由根音钢琴键 ID 和调式类型组成的调式。

### 构造函数

```typescript
new Scale(rootPianoKeyId: number, scaleModeId: T_ScaleModeId)
```

```typescript
const cMajor = new Scale(0, 'NATURAL_MAJOR')  // C 大调
const dDorian = new Scale(2, 'DORIAN')        // D 多利亚调式
```

### 核心属性

| 属性 | 类型 | 说明 |
|------|------|------|
| `rootPianoKeyId` | `number` | 根音的钢琴键 ID (0-11) |
| `scaleModeId` | `T_ScaleModeId` | 调式 ID |
| `pianoKeyIds` | `number[]` | 调式的钢琴键 ID 列表（按度数顺序） |
| `pianoKeyIdsSorted` | `number[]` | 调式的钢琴键 ID 列表（按音高排序） |
| `degreeToPianoKeyId` | `Record<number, number>` | 度数 → pianoKeyId 映射 |
| `pianoKeyIdToDegree` | `Record<number, number>` | pianoKeyId → 度数映射 |
| `degreeAlterationsMap` | `Record<number, number>` | 度数 → 变音值映射 |

### 核心方法

#### 查询方法

| 方法 | 说明 | 返回值 |
|------|------|--------|
| `hasPianoKeyId(pianoKeyId)` | 检查钢琴键 ID 是否在调式中 | `boolean` |
| `getDegreeByPianoKeyId(pianoKeyId)` | 获取钢琴键 ID 对应的度数 | `number \| null` |
| `getDegreeAndAlter(pianoKeyId)` | 一步获取度数和变音值 | `{ degree, alter } \| null` |
| `getPianoKeyIdByDegree(degree)` | 获取度数对应的钢琴键 ID | `number` |
| `getAlterByDegree(degree)` | 获取度数对应的变音值 | `number` |

#### 音符获取方法

| 方法 | 说明 | 返回值 |
|------|------|--------|
| `getRootNote()` | 获取根音的 Note 实例 | `Note[]` |
| `getNoteByDegree(degree)` | 获取指定度数的 Note 实例 | `Note[]` |
| `getNoteByIntervalNum(num)` | 获取跨八度音级的音符 | `{ pianoKeyId, octave }` |

> **注意**：`getRootNote()` 和 `getNoteByDegree()` 返回的是**数组**，因为同一音高可能有多个等音异名。

#### 和弦方法

| 方法 | 说明 | 返回值 |
|------|------|--------|
| `getScaleDegreeChord3(degree)` | 获取指定音级的三和弦 | `number[]` |
| `getScaleDegreeChord7(degree)` | 获取指定音级的七和弦 | `number[]` |
| `chord3OfDegreesList` | 所有各级三和弦 | `number[][]` |
| `chord7OfDegreesList` | 所有各级七和弦 | `number[][]` |

## 使用示例

```typescript
import { Scale } from '@music12/Scale'

// 创建 C 大调
const cMajor = new Scale(0, 'NATURAL_MAJOR')

// 查询钢琴键 ID
cMajor.hasPianoKeyId(7)           // true（G 在 C 大调中）
cMajor.hasPianoKeyId(1)           // false（C#/Db 不在 C 大调中）

// 获取度数和变音值
cMajor.getDegreeAndAlter(7)       // { degree: 5, alter: 0 }（G 是第 5 级，无变化）
cMajor.getDegreeAndAlter(6)       // null（F#/Gb 不在 C 大调中）

// 获取音符（注意返回数组）
const rootNotes = cMajor.getRootNote()    // [Note(C, 0, 4)]
const degree4Notes = cMajor.getNoteByDegree(4)  // [Note(F, 0, 4)]

// 获取顺阶和弦
cMajor.getScaleDegreeChord3(5)     // [7, 11, 2]（G 大三和弦：G-B-D）
cMajor.chord3OfDegreesList         // 所有七个三和弦
```
