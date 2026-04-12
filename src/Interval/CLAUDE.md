# interval 目录

音程模块，提供音程的创建、计算和转换功能。

## 目录结构

```
interval/
├── index.ts           # 模块导出入口
├── cls/               # Interval 类及其方法
│   ├── IntervalClass.ts
│   └── classFn/
├── methods/           # 独立工具函数
│   ├── getIntervalByComparingNotes.ts
│   ├── getIntervalBySemitoneGap.ts
│   ├── getIntervalDegreeByStep.ts
│   └── intervalSlide.ts
└── static/            # 静态数据和类型
    ├── INTERVAL_META.ts
    ├── interavalTypeList.ts
    └── types.ts
```

## Interval 类

核心类，表示两个音符之间的距离。

### 构造函数

```typescript
new Interval(intervalType: T_IntervalType, intervalNum: number)
```

```typescript
import { Interval } from './interval'

const majorThird = new Interval('maj', 3)   // 大三度
const perfectFifth = new Interval('p', 5)   // 纯五度
const minorSeventh = new Interval('min', 7) // 小七度
const augmentedFourth = new Interval('aug', 4) // 增四度
```

### 音程类型

| 类型 | 英文 | 中文 | 适用度数 |
|------|------|------|---------|
| `p` | perfect | 纯 | 1, 4, 5 |
| `maj` | major | 大 | 2, 3, 6, 7 |
| `min` | minor | 小 | 2, 3, 6, 7 |
| `aug` | augmented | 增 | 1-7 |
| `dim` | diminished | 减 | 1-7 |
| `aug+` | double augmented | 倍增 | 1-7 |
| `dim-` | double diminished | 倍减 | 1-7 |

### 属性

| 属性 | 类型 | 说明 |
|------|------|------|
| `type` | `T_IntervalType` | 音程类型（maj, min, p, aug, dim 等） |
| `num` | `number` | 音程度数（1=一度，8=八度，15=十五度...） |
| `numWithinOctave` | `number` | 八度内的度数（1-7） |
| `cnPrefix` | `T_IntervalCnPrefix` | 中文前缀（纯、大、小、增、减...） |
| `simpleDescription` | `string` | 中文描述（如 "大三度"） |
| `semitoneGap` | `number` | 总半音距离 |
| `semitoneGapWithinOctave` | `number` | 八度内半音距离 |
| `semitoneClockPosition` | `number` | 半音钟表位置（0-11），表示在十二半音循环中的位置 |
| `isNatural` | `boolean` | 是否为自然音程（大、小、纯） |
| `logicOctaveGap` | `number` | 逻辑八度跨度（基于音级计算） |
| `factOctaveGap` | `number` | 实际八度跨度（基于半音计算） |

### 方法

#### getEqualInterval()

获取所有与当前音程半音数相同的其他音程（等音程）。

```typescript
const aug4 = new Interval('aug', 4)  // 增四度，6个半音
aug4.getEqualInterval()
// [Interval(aug,4), Interval(dim,5), Interval(aug+,3), Interval(dim-,6)]

// 使用配置对象
aug4.getEqualInterval({ isSelfTypeExcluded: true })        // 排除自身类型
aug4.getEqualInterval({ isAugDimExcluded: true })          // 排除增/减音程
aug4.getEqualInterval({ isDoubleAugDimExcluded: true })    // 排除倍增/倍减音程
aug4.getEqualInterval({                                    // 组合使用
  isSelfTypeExcluded: true,
  isAugDimExcluded: true
})
```

**配置选项：**

| 选项 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `isSelfTypeExcluded` | `boolean` | `false` | 是否排除自身类型 |
| `isAugDimExcluded` | `boolean` | `false` | 是否排除增/减音程 |
| `isDoubleAugDimExcluded` | `boolean` | `false` | 是否排除倍增/倍减音程 |

## methods 工具函数

### getIntervalByComparingNotes()

根据两个音符计算它们之间的音程。

```typescript
import { getIntervalByComparingNotes } from './interval'
import { Note } from './note'

const c4 = new Note('C', 0, 4)
const e4 = new Note('E', 0, 4)

const interval = getIntervalByComparingNotes(c4, e4)
interval.simpleDescription  // "大三度"
```

**特殊情况处理：**
- 同音（C4 → C4）：返回纯一度
- 等音（C4 → B#3）：根据音级计算音程
- 跨八度（C4 → D5）：正确计算复合音程

### getIntervalBySemitoneGap()

根据半音距离查找所有可能的自然音程。

```typescript
import { getIntervalBySemitoneGap } from './interval'

// 7个半音可能是：纯五度 或 减六度
getIntervalBySemitoneGap(7)
// [Interval(p,5), Interval(dim,6)]

// 支持跨八度
getIntervalBySemitoneGap(19)  // 12+7，纯十二度
// [Interval(p,12), Interval(dim,13)]
```

### getIntervalDegreeByStep()

根据两个音名计算"粗糙"的度数，不考虑升降号和前缀。

```typescript
import { getIntervalDegreeByStep } from './interval'

// 向上计算（默认）
getIntervalDegreeByStep('C', 'A')  // 6（C向上到A是六度）
getIntervalDegreeByStep('C', 'D')  // 2（C向上到D是二度）
getIntervalDegreeByStep('C', 'C')  // 1（同音是一度）
getIntervalDegreeByStep('C', 'B')  // 7

// 向下计算
getIntervalDegreeByStep('C', 'A', { isAscending: false })  // 3（C向下到A是三度）
getIntervalDegreeByStep('C', 'D', { isAscending: false })  // 7（C向下到D是七度）
```

### intervalSlide_145() / intervalSlide_2367()

音程类型滑动，用于计算音程变化。

```typescript
import { intervalSlide_145, intervalSlide_2367 } from './interval/methods/intervalSlide'

// 纯音程（1/4/5度）滑动
intervalSlide_145('p', 1)   // 'aug'  纯 → 增
intervalSlide_145('p', -1)  // 'dim'  纯 → 减
intervalSlide_145('dim', -1) // 'dim-' 减 → 倍减

// 大小音程（2/3/6/7度）滑动
intervalSlide_2367('maj', -1)  // 'min' 大 → 小
intervalSlide_2367('min', -1)  // 'dim' 小 → 减
```

## static 静态数据

### INTERVAL_META

包含所有八度内音程的元数据（35 条记录），每条包含：

- `type`: 音程类型
- `num`: 度数（1-7）
- `cnPrefix`: 中文前缀
- `isNatural`: 是否自然音程
- `alter`: 变化音值
- `semitoneGap`: 半音距离
- `semitoneClockPosition`: 半音钟表位置（0-11）
- `octaveGap`: 八度跨度

### 音程类型列表

从 `common/static/INTERVAL_TYPES.ts` 导出：

```typescript
INTERVAL_TYPE_LIST_145  // ['dim-', 'dim', 'p', 'aug', 'aug+']
INTERVAL_TYPE_LIST_2367 // ['dim-', 'dim', 'min', 'maj', 'aug', 'aug+']
```

## 使用示例

```typescript
import { Interval, getIntervalByComparingNotes } from './interval'
import { Note } from './note'

// 创建音程
const p5 = new Interval('p', 5)
console.log(p5.simpleDescription)  // "纯五度"

// 用音程计算目标音符
const c4 = new Note('C', 0, 4)
const g4 = c4.getNoteByInterval(p5)
console.log(g4.simpleDescription)  // "G4"

// 反向：根据两个音符计算音程
const e4 = new Note('E', 0, 4)
const interval = getIntervalByComparingNotes(c4, e4)
console.log(interval.simpleDescription)  // "大三度"

// 查找等音程
const aug4 = new Interval('aug', 4)
console.log(aug4.getEqualInterval().map(i => i.simpleDescription))
// ["增四度", "减五度", "倍增三度", "倍减六度"]
```
