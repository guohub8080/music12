# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

`music12` 是一个 TypeScript 乐理计算库，提供音符、音程、和弦、调式音阶等乐理概念的面向对象 API。核心理念是将抽象的乐理概念对象化，便于程序化操作。

## 常用命令

```bash
# 构建库（输出到 dist/）
pnpm build

# 启动开发服务器（Vite 运行 web_test/）
pnpm dev

# 运行测试
pnpm vitest

# 运行单个测试文件
pnpm vitest test/common.test.ts
```

## 编码规范

### src/ 目录的 Import 规则
- `src/` 目录内的所有引用必须使用**相对路径**（如 `./foo`、`../bar/baz`）
- 只有外部依赖（`dependencies` 或 `devDependencies` 中的包）才允许使用绝对引用
- 在 `test/` 或 `web_test/` 文件夹中，可以使用短路径 `@music12` 来代替 `src` 路径
  - 例如：`import { Note } from '@music12/Note'`

### 上下文管理规范
- 当上下文占用达到 70% 时，自动执行 `/compact` 命令压缩对话
- 压缩完成后，立即重新读取 `CLAUDE.md` 以恢复关键规则，防止丢失上下文

### Git 提交规范
- 每次完成对话/任务后，自动创建 git commit
- 除非明确要求，否则**不要 push 到远程**
- 提交信息应简洁明了
- **不要**在 commit 中添加 Co-Authored-By 或任何 Anthropic/Claude 相关的作者信息

### CLAUDE.md 与代码双向同步规则
- 如果文件夹内存在 `CLAUDE.md`，说明该文档的作用范围是这个文件夹
- **代码 ↔ 文档 双向绑定**：
  - 修改该文件夹内的代码后，自动更新对应的 `CLAUDE.md` 描述
  - 修改 `CLAUDE.md` 描述后，自动更新对应的代码实现
- 除非明确指出"不要同步"或"只改代码/只改文档"，否则始终保持双向一致
- 这确保了文档与代码永远处于同步状态

### TypeScript 类型命名规范
- **`T_` 前缀**：通用/公共类型，定义在 `src/common/static/` 目录
  - 示例：`T_NoteStep`, `T_AlterValue`, `T_IntervalType`, `T_IntervalList`
  - 这些类型可被多个模块共用，直接从 `common/static/` 导入
- **`I_` 前缀**：模块内部类型，定义在各模块的 `static/types.ts` 中
  - 示例：`I_NoteObj`, `I_Interval`, `I_IntervalObj`, `I_GetEqualIntervalOptions`
  - 这些类型仅在模块内部使用，由各模块自行导出

### 类型检查规范
- **使用 lodash 进行类型检查**，禁止使用 `typeof` 运行时检查
- **null/undefined 检查统一使用 `isNil`**，不要使用 `isNull` 或 `isUndefined`
- **数组检查使用 `isArray`**，不要使用 `Array.isArray`
  ```typescript
  // ✅ 正确
  import { isNil, isString, isNumber, isArray } from "lodash"
  if (isNil(value)) { ... }
  if (isString(value)) { ... }
  if (isArray(value)) { ... }

  // ❌ 错误
  if (value === null || value === undefined) { ... }
  if (typeof value === "string") { ... }
  if (Array.isArray(value)) { ... }
  ```
- 常用 lodash 类型函数：`isNil`, `isString`, `isNumber`, `isBoolean`, `isObject`, `isArray`, `isInteger`, `isEmpty`, `isEqual`, `defaultTo`

### lodash 方法使用规范
- **统一使用 lodash 方法替代原生 JavaScript 方法**，保持代码风格一致
  ```typescript
  // ✅ 正确 - 使用 lodash
  import { toPairs, keys, values, fromPairs, uniq, intersection, union, includes } from "lodash"
  toPairs(obj)           // 替代 Object.entries
  keys(obj)              // 替代 Object.keys
  values(obj)            // 替代 Object.values
  fromPairs(arr)         // 替代 Object.fromEntries
  uniq(arr)              // 替代 [...new Set(arr)]
  intersection(arr1, arr2)  // 替代 Set 交集操作
  union(arr1, arr2)      // 替代 Set 并集操作
  includes(arr, value)   // 替代 Set.has() 或 arr.includes()

  // ❌ 错误 - 使用原生方法
  Object.entries(obj)
  Object.keys(obj)
  Object.values(obj)
  Object.fromEntries(arr)
  new Set(arr)
  arr.includes(value)
  ```
- 此规范适用于 `src/`、`test/`、`web_test/` 所有目录

## 架构说明

库按领域模块组织在 `src/` 目录下：

| 模块 | 用途 |
|------|------|
| `note/` | `Note` 类 - 音高、MIDI 值、等音异名 |
| `interval/` | `Interval` 类 - 音符间的距离 |
| `chord/` | `Chord` 类 - 根音 + 音程、变化音（b9, #11 等） |
| `scale/` | `Scale` 类 - 调式、顺阶和弦、音阶级数 |
| `factory/` | 便捷工厂函数：`getNote()`、`getChord()`、`getScale()`、`getInterval()` |
| `find/` | 反向查找：根据音符列表查找和弦/调式 |
| `circleOfFifths/` | 五度圈计算 |
| `stave/` | 谱号/调号工具 |
| `common/radix/` | 用于乐理计算的七进制和十二进制数学 |

### 关键模式

- **类与类方法**：每个领域有一个主类（如 `NoteClass.ts`、`ChordClass.ts`、`ScaleClass.ts`），辅助函数放在 `cls/classFn/` 目录
- **类型定义**：每个模块在 `static/types.ts` 中定义 TypeScript 类型
- **预设/元数据**：静态数据如和弦类型（`chordKeys.ts`）、调式名称（`scaleModeNames.ts`）放在 `presets/` 和 `static/` 目录
- **工厂模式**：使用 `factory.getNote('C', 0, 4)` 代替 `new Note('C', 0, 4)` 更便捷

### 入口文件

- `src/index.ts` - 库的主导出
- `dist/index.js` - 构建输出（ESM）
- `web_test/` - 基于 Vite 的 React 开发测试环境
