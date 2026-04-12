# common 目录

此目录存放库的通用基础设施，被其他所有模块共享使用。

## 子目录

| 目录 | 用途 |
|------|------|
| `static/` | 通用常量和类型定义（音名列表、音程类型列表等） |
| `radix/` | 进制计算工具，用于乐理中的音高和音程数学运算 |
| `processError/` | 自定义错误类型 |

## static 通用常量

存放各模块共用的常量和类型：

- **STEP_LIST**：音名列表 `["C", "D", "E", "F", "G", "A", "B"]`
- **T_NoteStep**：音名类型
- **T_AlterValue**：变化音数值类型（-2 到 2）
- **INTERVAL_TYPE_LIST_145**：1/4/5 度音程类型（纯音程）
- **INTERVAL_TYPE_LIST_2367**：2/3/6/7 度音程类型（大小音程）
- **T_IntervalType**：音程类型

### 工具函数

- `getStepByIndex(index)` - 根据索引获取音名
- `getIndexByStep(step)` - 根据音名获取索引

## radix 进制计算

目录结构：

```
radix/
├── index.ts      # 统一导出入口
├── base/         # 纯数学基类（无业务依赖）
│   ├── Radix.ts
│   ├── Base7Radix.ts
│   └── Base12Radix.ts
└── music/        # 乐理相关进制类
    ├── StepRadix.ts
    ├── IntervalRadix.ts
    ├── ScaleRadix.ts
    └── PianoKeyRadix.ts
```

### 基类（base/）

- **Radix**：进制基类，支持任意进制
- **Base7Radix**：七进制，用于音阶级数计算
- **Base12Radix**：十二进制，用于半音位置计算

### 乐理类（music/）

- **StepRadix**：音级进制，支持音名（C, D, E...）
- **IntervalRadix**：音程进制，从 1 开始计数
- **ScaleRadix**：音阶进制，从 1 开始计数
- **PianoKeyRadix**：钢琴键位置，支持 pitchValue、location、octave、getNotes 等

### 使用示例

```typescript
import { PianoKeyRadix, StepRadix } from '../common/radix'

// 钢琴键位置
const c4 = new PianoKeyRadix(60)  // pitchValue = 60
c4.octave    // 5 (60 / 12 = 5)
c4.location  // 0
c4.getNotes()  // [Note(C, 0, 5)]

// 七进制：D4
const step = new StepRadix('D')
step.add(2).step // 'F' (D + 2 个音级 = F)
```

## processError 错误类型

定义了各模块的专用错误类：

- `NoteError` - 音符相关错误
- `IntervalError` - 音程相关错误
- `ChordError` - 和弦相关错误
- `ScaleError` - 音阶相关错误
- `RadixError` - 进制计算错误
- `FactoryError` - 工厂函数错误
- `CircleOfFifthsError` - 五度圈错误
- `ScoreError` - 乐谱相关错误
