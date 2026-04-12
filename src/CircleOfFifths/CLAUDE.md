# CircleOfFifths 目录

五度圈模块，提供五度圈相关的类和工具函数。

## 目录结构

```text
CircleOfFifths/
├── index.ts              # 模块导出入口
├── CLAUDE.md             # 本文档
├── cls/                  # 类定义
│   ├── CircleClass.ts    # CircleOfFifths 类
│   └── classFn/          # 类方法实现
│       └── cls_fifthCircleClockMove.ts
├── methods/              # 独立工具函数
│   └── getFifthCircleByAlter.ts
└── static/               # 静态数据和类型
    ├── FIFTH_META.ts      # 五度圈元数据
    └── types.ts          # 类型定义
```

## CircleOfFifths 类

核心类，表示五度圈上的一个位置。继承自 `Base12Radix`。

### 构造函数

```typescript
new CircleOfFifths(circleID?: number)
```

```typescript
import { CircleOfFifths } from './CircleOfFifths'

const circle = new CircleOfFifths(0)   // C 大调 / a 小调
const circle2 = new CircleOfFifths(2)  // D 大调 / b 小调（2 个升号）
```

### 属性

| 属性 | 类型 | 说明 |
| ---- | ---- | ---- |
| `location` | `number` | 五度圈位置（0-11） |
| `circleNumber` | `number` | 圈数（ octave） |
| `majCircle` | `object[]` | 该位置的大调信息 |
| `minCircle` | `object[]` | 该位置的小调信息 |
| `current` | `object[]` | 该位置的所有调性信息 |

### 方法

| 方法 | 说明 |
| ---- | ---- |
| `move(num)` | 在五度圈上移动（正数=顺时针/升号方向，负数=逆时针/降号方向） |

### 使用示例

```typescript
import { CircleOfFifths } from './CircleOfFifths'

// 创建五度圈位置
const c = new CircleOfFifths(0)

// 获取 C 大调信息
c.majCircle  // [{step: 'C', alter: 0, mode: 'major', ...}]

// 获取 a 小调信息
c.minCircle  // [{step: 'A', alter: 0, mode: 'minor', ...}]

// 移动到 G 大调（顺时针 1 步 = 加 1 个升号）
const g = c.move(1)
g.location  // 7 (G 在位置 7)

// 移动到 F 大调（逆时针 1 步 = 加 1 个降号）
const f = c.move(-1)
f.location  // 5 (F 在位置 5)
```

## 工具函数

### getFifthCircleByAlter()

根据调号数量获取五度圈位置。

```typescript
import { getFifthCircleByAlter } from './CircleOfFifths'

// 2 个升号 = D 大调
const d = getFifthCircleByAlter(2)
d.location  // 2

// 3 个降号 = Eb 大调
const eb = getFifthCircleByAlter(-3)
eb.location  // 3
```

## 五度圈位置对照表

| 位置 | 大调 | 小调 | 调号 |
| ---- | ---- | ---- | ---- |
| 0 | C | a | 无 |
| 2 | D | b | 2# |
| 3 | Eb | c | 3b |
| 4 | E | c# | 4# |
| 5 | F | d | 1b |
| 7 | G | e | 1# |
| 9 | A | f# | 3# |
| 10 | Bb | g | 2b |
| 11 | B | g# | 5# |

## 相关模块

- **Note**: 音符类
- **Scale**: 音阶类
- **stave**: 调号工具
