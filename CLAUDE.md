# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

`music12` 是一个乐理计算库，提供音符、音程、和弦、调式音阶等乐理概念的面向对象 API。核心理念是将抽象的乐理概念对象化，便于程序化操作。

**Monorepo 架构(v4.0+)**：TS 版 + C++ 版双实现，共享 JSON 数据，通过黄金测试向量保证密等。

## Monorepo 结构

```
music12/
├── src/                       ← TS 版源码(核心算法 ~1万行,读 JSON 不硬编码)
├── packages/
│   ├── music12-gen/           ← 数据生成器(跑一次 → 产出 shared/data/*.json)
│   ├── music12-cpp/           ← C++ 版(密等移植,读同一份 JSON)
│   │   ├── include/music12/   ← 头文件(Radix/Note/Interval/Scale/Chord/Find/Stave/Circle/Factory)
│   │   ├── src/               ← 实现(.cpp)
│   │   ├── test/              ← GoogleTest + 密等验证器
│   │   ├── third_party/       ← nlohmann/json(单头文件)
│   │   └── CMakeLists.txt
│   └── (未来: music12-wasm, music12-python...)
├── shared/
│   └── data/                  ← 单一真相源(7 个 JSON,4.2MB)
│       ├── notes.json         (35 条)
│       ├── intervals.json     (39 条)
│       ├── fifth.json         (42 条)
│       ├── chord-formulas.json (87 条)
│       ├── scale-modes.json   (46 条)
│       ├── chord-instances.json(1044 条 = 87×12)
│       └── scale-instances.json(552 条 = 46×12)
├── tests/
│   └── vectors/
│       └── golden-vectors.json ← 1687 个黄金测试向量(密等验证用)
├── tools/
│   └── extract-golden.ts      ← 黄金向量提取器
└── test/                      ← TS 版测试(213 个)
```

## 常用命令

```bash
# === TS 版 ===
pnpm build              # 构建库(Vite lib + tsc 声明)
pnpm typecheck          # 类型检查
pnpm dev                # 开发服务器(playground)
pnpm test               # 跑 213 个测试
pnpm vitest test/unit/common.test.ts  # 单个测试文件

# === 数据生成 ===
pnpm gen:data           # 重跑生成器,产出 shared/data/*.json
pnpm gen:golden         # 重提取黄金测试向量

# === C++ 版 ===
pnpm build:cpp          # 编译 C++ 版(CMake)
pnpm test:cpp           # 跑 32 个 GoogleTest
pnpm verify:equivalence # 跑 1687 个黄金向量做密等验证

# === 全量验证(TS 测试 + C++ 测试 + 密等)===
pnpm verify:all
```

## 数据架构(核心)

**单一真相源**：所有乐理数据在 `shared/data/*.json`，TS 版和 C++ 版都读这份数据。

**Tree Shaking**：每个模块独立加载自己的 JSON（不用集中式 DataLoader）：
- `Note/static/note-data.ts` → 只读 notes.json(7.7KB)
- `Chord/static/chord-instance-data.ts` → 只读 chord-instances.json(2.1MB)
- 用户 `import { Note }` → 只打包 5KB，不拖 Chord 的 2.1MB

**数据修改流程**：
1. 改 `packages/music12-gen/` 里的生成器或定义表
2. `pnpm gen:data` → 重新产出 `shared/data/*.json`
3. `pnpm gen:golden` → 重新提取黄金向量
4. `pnpm verify:all` → 验证两边密等

## 编码规范

### src/ 目录的 Import 规则
- **跨顶层模块的引用必须使用 `@music12` 别名**（对齐 expub-tool 风格）
  - 例如：在 `src/Note/` 下引用 Interval/common，写 `import { Interval } from "@music12/Interval"`
  - 别名 `@music12` → `src/`，在 `tsconfig.json`、`vite.config.ts`、`vite.lib.config.ts`、`vitest.config.ts` 四处均已配置
- **短路径别名**（高频引用的简化）：
  - `@common-static` → `src/common/static`（`NOTE_TYPES`、`INTERVAL_TYPES` 等常量类型）
  - `@utils` → `src/common/utils`（`isDefined`、`isNonEmptyArray`、`assertNonEmptyArray`、`jaccard` 等工具）
- **模块内部的引用使用相对路径**（如 `./foo`、`../bar/baz`）
- **禁止在 import 路径上带 `.ts`/`.tsx`/`.js` 后缀**（`moduleResolution: bundler` 下统一无后缀）
- **类型 only 的跨模块 import 必须用 `import type`**（打断循环依赖的运行时闭环，利于 treeshaking）
- 在 `test/unit/` 或 `test/playground/` 文件夹中，使用 `@music12` 别名（注意大小写需与目录名一致，如 `@music12/Interval` 而非 `@music12/interval`）

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
- **lodash 统一使用深路径导入**（利于 treeshaking），不要用 barrel `import { x } from "lodash"`
- **null/undefined 检查统一使用 `isNil`**，不要使用 `isNull` 或 `isUndefined`
- **非空检查统一使用 `isDefined`（`@utils/isDefined`）**，禁止 `!isNil(x)` 或 `!x`（对象空判断）
- **数组检查使用 `isArray`**，不要使用 `Array.isArray`
  ```typescript
  // ✅ 正确 - 深路径导入
  import isNil from "lodash/isNil"
  import isString from "lodash/isString"
  import { isDefined } from "@utils/isDefined"

  if (isNil(value)) { ... }       // 判空
  if (isDefined(value)) { ... }   // 判非空（类型守卫）
  if (isString(value)) { ... }

  // ❌ 错误
  import { isNil, isString } from "lodash"  // barrel 风格，阻碍 treeshaking
  if (value === null || value === undefined) { ... }
  if (!isNil(value)) { ... }      // 应改用 isDefined(value)
  if (!objectValue) { ... }       // 对象空判断应改用 isNil(objectValue)
  if (typeof value === "string") { ... }
  if (Array.isArray(value)) { ... }
  ```
- 注意：`!boolVar`（布尔值取反，如 `!isValid`）、`!set.has()`、`!existsSync` 等**不是空判断**，正常使用 `!` 即可
- 常用 lodash 类型函数：`isNil`, `isString`, `isNumber`, `isBoolean`, `isObject`, `isArray`, `isInteger`, `isEmpty`, `isEqual`, `defaultTo`

### lodash 方法使用规范
- **统一使用 lodash 方法替代原生 JavaScript 方法**，保持代码风格一致
- **lodash 统一使用深路径导入**（利于 treeshaking）
  ```typescript
  // ✅ 正确 - 使用 lodash 深路径导入
  import toPairs from "lodash/toPairs"
  import keys from "lodash/keys"
  import values from "lodash/values"
  import fromPairs from "lodash/fromPairs"
  import uniq from "lodash/uniq"
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
- 此规范适用于 `src/`、`test/unit/`、`test/playground/` 所有目录

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

### 入口文件与构建

- `src/index.ts` - 库的主导出（barrel）
- `vite.lib.config.ts` - 库构建配置：Vite lib mode + `preserveModules`，产出 `dist/esm/*.mjs`、`dist/cjs/*.cjs`（一对一映射 src，供消费者 bundler 细粒度 treeshaking）
- `tsconfig.build.json` - 类型声明构建配置：`tsc --emitDeclarationOnly`，产出 `dist/types/*.d.ts`
- `vite.config.ts` - 开发配置（服务 `test/playground/` playground，与库构建分离）
- `package.json` 的 `sideEffects: false` 是 treeshaking 的关键标志，勿删除
- 当前仅开放主入口 `.`，子路径 subpath exports 待循环依赖（Chord↔Find、Scale↔Find）完全解耦后再开放

## 已知技术债

`pnpm typecheck`（`tsc -p tsconfig.build.json`）当前 **0 错误**。以下问题均已修复：

- ~~`ALL_CHORD_INSTANCE_META.ts` 的 TS2590（类型联合过复杂）~~ — 已修复：87 个子 `*_CHORD_META` 文件加 `: I_ChordInstanceMeta[]` 显式类型注解。
- ~~`cls_fifthCircleClockMove.ts` 调用不存在的 `Radix.get2DigitNumList_GivenNumAndBase`~~ — 已修复：误用 power-radix 包 API 的死函数，已删除。
- ~~`src/ChordFormula/` barrel 引用不存在的导出（`DOM9_FLAT9`、`MIN9_FLAT9`、`AUG7`）~~ — 已修复：AUG7 修路径，DOM9_FLAT9/MIN9_FLAT9 删死引用。
