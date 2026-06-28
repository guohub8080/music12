# Changelog

本文件记录 music12 的所有显著变更。版本号遵循 [语义化版本](https://semver.org/)。

## [3.0.0] - 2026-06-28

v3 是一次**大规模重构**，核心目标是修复 treeshaking 失效、统一路径别名、重写和弦查找算法。公共 API 大部分保持兼容，但部分配置项和内部行为有破坏性变更，**请阅读迁移指南**。

### ⚠️ 破坏性变更（Breaking Changes）

#### 1. `findChord` 配置项变更

`findChord` 的匹配算法完全重写（详见下方「和弦查找重写」），配置项变更如下：

| v2 配置 | v3 替代 | 说明 |
|---|---|---|
| `isShowFuzzyOnFullMatch` | 已移除 | v3 默认有完全匹配时只返回完全匹配 |
| `isShowFuzzyOnEmptyMatch` | 已移除 | v3 无完全匹配时自动返回省略音匹配 |
| `minSimilarity` | 已移除 | v3 用乐理特征音规则替代相似度阈值 |
| — | `isStrict: boolean` | **新增**：`true` 只返回完全匹配 |
| — | `rootNoteLocation: number` | **新增**：指定根音，区分等和弦 |

**迁移**：
```ts
// v2
findChord([60,64,67], { isShowFuzzyOnFullMatch: true, minSimilarity: 0.5 })
// v3（默认行为即完全匹配优先，无需配置）
findChord([60,64,67])
// v3 严格模式（只完全匹配）
findChord([60,64,67], { isStrict: true })
// v3 指定根音
findChord([60,64,67,69], { rootNoteLocation: 0 }) // 只返回 C6，不返回 Am7
```

#### 2. `Scale.getNoteByIntervalNum` 返回类型

五声调式（宫商角徵羽 = 1-2-3-5-6 度）缺 4 度和 7 度，现对这些度数返回 `null`：

```ts
// v2：五声调式传 4/7 度会抛错崩溃
// v3：返回 null
const gong = new Scale(0, "GONG")
gong.getNoteByIntervalNum(4) // null（五声无 4 度）
```

返回类型从 `{ pianoKeyId, octave }` 变为 `{ pianoKeyId, octave } | null`。调用方需处理 null。

#### 3. 五声调式数据修正

v2 中五声调式的 `degreeToPianoKeyId` 数据错位（徵音被跳过、羽音错填到 5 度）。v3 已修正：

```
// v2（错误）         // v3（正确）
GONG: {5: 9(A)}  →   GONG: {5: 7(G=徵), 6: 9(A=羽)}
```

如果你的代码依赖了 v2 的错误数据，需更新。

#### 4. 构建产物结构变更（影响直接引用 dist 内部路径的用户）

- 主入口 `dist/index.mjs`（2.7MB 单文件）→ `dist/esm/index.mjs`（3.5K）+ 234 个模块文件
- `package.json` 的 `exports`/`main`/`module`/`types` 路径全部更新
- `sideEffects: false` 已添加（treeshaking 关键标志）

**迁移**：通过包名 `import { Note } from "music12"` 引用的用户**无需改动**。直接引用 `dist/` 内部路径的用户需更新路径。

#### 5. `getModeNameByModeKey` 等支持全称 key

v2 只接受缩写（`"MAJ"`、`"DOR"`），v3 支持全称（`"NATURAL_MAJOR"`、`"DORIAN"`），缩写仍兼容。

```ts
// v2（只能缩写）        // v3（全称 + 缩写都行）
getModeNameByModeKey("MAJ")  →  getModeNameByModeKey("NATURAL_MAJOR") // "自然大调"
```

---

### ✨ 新增功能

#### 和弦标签系统（tags）

87 个和弦公式新增多维标签，从音程列表自动推导，支持灵活查询：

```ts
import { getChordFormulaByTags } from "music12"

getChordFormulaByTags(["dom", "altered"])  // 所有属功能变音和弦
getChordFormulaByTags(["sus", "ext13"])    // 扩展到13度的挂留和弦
getChordFormulaByTags(["dim"])             // 所有减性质和弦
```

标签分 5 个维度：家族（chord3/chord7/.../sus）、扩展（extN）、性质（maj/min/dom/...）、变音（altered/sharp5/...）、结构（add/add6）。

#### `getNoteByPianoKeyId` 新增 `isComplexIncluded`

```ts
getNoteByPianoKeyId(0)                              // [C4]（最简）
getNoteByPianoKeyId(0, { isComplexIncluded: true }) // [C4, B♯4, ...]（全部等音）
```

---

### 🔄 和弦查找算法重写

`findChord` 从 jaccard 相似度匹配改为**两层匹配策略**：

1. **完全匹配**：音集完全相等（similarity = 1）
2. **省略音匹配**：用户少弹了音，但弹的音必须全是候选和弦的音，且候选和弦的**特征音都被弹到**
   - 七和弦必须有 3 度 + 7 度（省了就不是七和弦）
   - 变化五度（#5/b5）必须有 5 度
   - sus 必须有 2/4 度
   - 纯五度可省，扩展音（9/11/13）可省

**改进效果**：
- 输入 C7 不再错误返回 maj3（省七音）
- 输入 C-E-G 不再返回一堆 jaccard 噪音
- 等和弦（C6 ≡ Am7）正确返回多个解释

---

### 🔧 重构与优化

#### Tree-shaking 修复（核心改进）

v2 用 tsup 打成 2.7MB 单文件，消费者即使只 `import { Note }` 也会下载整个库。v3 改用 Vite + preserveModules：

| | v2 | v3 |
|---|---|---|
| 主入口 | 2.7MB 单文件 | 3.5K + 234 个模块 |
| `import { Note }` 实际下载 | 2.7MB | **~35KB**（降 99%）|

#### 路径别名统一

跨模块引用统一为 kebab-case 短路径：

```ts
// v2（相对路径，.ts 后缀）     // v3（别名，无后缀）
import {Note} from "../../Note"  →  import {Note} from "@note"
import {X} from "./foo.ts"       →  import {X} from "./foo"
```

别名清单：`@note` `@interval` `@scale` `@chord` `@chord-formula` `@scale-mode` `@circle-of-fifths` `@find` `@pianokey` `@stave` `@common` `@factory`

#### 循环依赖解耦

4 个循环依赖（Note↔Interval、Note↔PianoKey、Chord↔Find、Scale↔Find）的类型侧改为 `import type`，运行时闭环打断。

#### 空值判断规范化

新增 `isDefined`/`isNonEmptyArray`/`assertNonEmptyArray` 辅助函数，空值判断统一用 lodash（深路径导入）：

```ts
// v3 规范
import isNil from "lodash/isNil"
import { isDefined } from "@common/utils/isDefined"
if (isNil(x)) { ... }       // 判空
if (isDefined(x)) { ... }   // 判非空（不用 !isNil）
```

---

### 🐛 Bug 修复

- **五声调式度数映射错位**：生成器索引 bug 导致徵/羽错位，已修正并重新生成全部 44 个调式数据
- **3 个数据生成器的遗留 bug**：`isArray` 未 import、变量名遮蔽 lodash import、属性改名未跟进（重构后潜伏）
- **6 个 tsc 类型错误**：TS2590 类型联合爆炸、barrel 引用不存在的导出、死函数
- **`cls_fifthCircleClockMove`**：误用 power-radix API 的死函数，已删除
- 删除废弃生成器 `generateChordMeta.ts`（依赖已删除的 `CHORD_META`）

---

### 📦 依赖变更

- 移除 `tsup`（改用 Vite）
- 移除 `@types/power-radix`（死依赖）
- lodash 改用深路径导入（利于 treeshaking）

---

### 📚 文档

- 新增 `documents/` 分章节文档（9 个文件）：getting-started、note、interval、chord、scale、find、chord-formula、factory、advanced、radix
- README 精简为概览 + 文档导航
- 所有 API 文档经 tsx 实测验证

---

### 升级统计

- **213 个测试**（v2: 84 个）
- **tsc 0 错误**（v2: 8 个）
- 消费者打包体积降 **99%**

---

## [2.0.0] - 2026-06

music12 v2.0 全面重构。
