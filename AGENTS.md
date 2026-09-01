# AGENTS.md — music12 AI Guide

> 本文件专为 AI（Claude / GPT / Cursor 等）编写，帮助 AI 快速理解 music12 的设计理念和 API 用法。

## 核心理念：pianoKeyId 是一等公民

music12 以**钢琴键（pianoKeyId，0-11）**为基础抽象，而非音名（C/D/E）。原因：音名有记谱歧义（C# 还是 Db？），但 pianoKeyId 是客观唯一的——`pianoKeyId = 1` 永远是同一个琴键，不管你叫它 C# 还是 Db。

所有乐理概念都建立在 pianoKeyId 之上：
- **音符**：step（音名）+ alter（升降号）→ pianoKeyId（0-11）
- **和弦**：rootPianoKeyId + chordFormulaId → pianoKeyIds 数组
- **调式**：rootPianoKeyId + scaleModeId → pianoKeyIds 数组
- **等音/等和弦**：pianoKeyId 相同 = 同一个键，只是记法不同

## pianoKeyId 对照表

```
ID:  0   1    2   3    4   5   6    7   8    9   10   11
音:  C   C#/Db D   D#/Eb E   F   F#/Gb G   G#/Ab A   A#/Bb B
键:  白  黑   白  黑   白  白  黑   白  黑   白  黑   白
```

## 导入方式

```ts
// 推荐：子路径导入（treeshaking 最彻底）
import { Note } from "music12/note"
import { Chord } from "music12/chord"
import { findChord } from "music12/find"

// 也可以：主入口具名导入
import { Note, Chord, findChord } from "music12"
```

可用子路径：`note` `interval` `scale` `chord` `chord-formula` `find` `stave` `radix` `circle-of-fifths` `factory`

## API 速查

### 创建实例

```ts
// 工厂函数（推荐，用音名）
import { getNote, getChord, getScale, getInterval } from "music12/factory"
const note = getNote("C", 0, 4)              // C4，第二参数 0=还原 1=升 -1=降
const chord = getChord("C", 0, "maj7")       // Cmaj7
const scale = getScale("C", 0, "NATURAL_MAJOR") // C 大调

// 类构造（用 pianoKeyId）
import { Note, Chord, Scale } from "music12"
const note = new Note("C", 0, 4)             // C4
const chord = new Chord(0, "maj7")           // Cmaj7（根音 pianoKeyId=0）
const scale = new Scale(0, "NATURAL_MAJOR")  // C 大调
```

### 和弦变换（链式）

```ts
const chord = new Chord(0, "dom7")
  .set("#5")     // 升五度
  .set("b9")     // 降九度
  .setOmit(5)    // 省略五度
  .setSus(4)     // sus4

chord.scoreSymbol  // 变换后的记谱符号
chord.pianoKeyIds  // 当前各音 [root, 3rd, 5th, 7th...]
chord.isTransformed // 是否被变换过
chord.clearTransform() // 回到原始和弦
```

### 反向查找（识别和弦）

```ts
import { findChord } from "music12"

// 输入 MIDI 音符列表（60=C4, 64=E4, 67=G4...）
findChord([60, 64, 67, 70]) // → [{ chordFormulaId: "dom7", ... }]

// 严格模式：只返回完全匹配
findChord([60, 64, 67], { isStrict: true })

// 指定根音：区分等和弦 C6 vs Am7
findChord([60, 64, 67, 69], { rootNoteLocation: 0 }) // → C6
findChord([60, 64, 67, 69], { rootNoteLocation: 9 }) // → Am7
```

findChord 的匹配规则：
- 默认：完全匹配优先；无完全匹配时返回省略音匹配（用户少弹了音）
- 特征音不可省：七和弦必须有 3 度和 7 度，变和弦必须有变化音
- 纯五度和扩展音（9/11/13）可省
- 少于 3 个不同音会抛错

### 调式查询

```ts
const cMajor = new Scale(0, "NATURAL_MAJOR")

cMajor.pianoKeyIds           // [0,2,4,5,7,9,11]
cMajor.hasPianoKeyId(0)      // true（C 在 C 大调里）
cMajor.getDegreeByPianoKeyId(4) // 3（E 是 3 度）
cMajor.getScaleDegreeChord7(5)  // G7（5 级七和弦）
cMajor.getScaleDegreeChord7(1)  // Cmaj7（1 级）
```

### 标签查询

```ts
import { getChordFormulaByTags } from "music12"

getChordFormulaByTags(["dom", "altered"]) // 所有属功能变音和弦
getChordFormulaByTags(["sus", "ext13"])   // 扩展到 13 度的挂留和弦
getChordFormulaByTags(["dim"])            // 所有减和弦 [dim3, dim7]
```

## 常见误区

1. **findChord 接收 MIDI 数（如 60），不是 pianoKeyId（如 0）**。findNotesInScales 等才接收 pianoKeyId。
2. **pianoKeyId 不带八度**。C4/C5/C3 的 pianoKeyId 都是 0。要绝对音高用 `pitchValue`（MIDI 编号）。
3. **等和弦**：C6（C-E-G-A）和 Am7（A-C-E-G）是同一组键 `[0,4,7,9]`，findChord 会同时返回两者。
4. **五声调式缺 4 度和 7 度**：`getNoteByIntervalNum(4)` 返回 null（不崩溃）。
5. **黑键有两个名字**：pianoKeyId=1 既是 C# 也是 Db。`getNoteByPianoKeyId(1)` 返回两者。

## 87 个和弦公式 ID

常用公式：`maj3` `min3` `dim3` `aug3` `sus2` `sus4` `maj7` `dom7` `min7` `dim7` `halfdim7` `minmaj7` `dom9` `maj9` `min9` `dom11` `maj11` `min11` `dom13` `maj13` `min13`

变音和弦：`dom7#5` `dom7b5` `dom7b9` `dom7#9` `dom7#11` `dom9#5` `dom9#11` `maj7b5` `maj7#11` `min7b5` 等。

完整列表用 `getChordFormulaByTags([])` 查询（返回全部 87 个）。

## 44 个调式 ID

自然调式：`NATURAL_MAJOR` `DORIAN` `PHRYGIAN` `LYDIAN` `MIXOLYDIAN` `NATURAL_MINOR` `LOCRIAN`

和声/旋律：`HARMONIC_MINOR` `HARMONIC_MAJOR` `MELODIC_MINOR_ASCENDING` `MELODIC_MAJOR_DESCENDING` 及衍生模式

中国调式：`GONG` `SHANG` `JUE` `ZHI` `YU`（五声）；`YA_YUE_GONG` `QING_YUE_GONG` `YAN_YUE_GONG` 等（七声）

## 开发规范

> 本节面向在 music12 仓库里做开发的 AI/人类，约定目录、数据流、分支与验证方式。

### 目录结构（按语言归类，禁止无意义嵌套）

```
src/           TS 库本体（发布 npm 的就是它）
static-data/   编译产物：7 个 JSON（TS 和 C++ 只读这一份，永不手改）
ts-dev/        TS 开发工具：数据生成器脚本 + raw-static/ 数据源头（手改、带注释）
mono-repo/cpp/ C++20 实现（非 TS 的一律进 mono-repo）
test/          单元测试（test/unit）+ 黄金向量（test/vectors）
documents/     人类可读的分章文档
```

原则：顶层目录必须装实际内容；只有一个模块时不许再套 `xxx/src/` 之类的空架子（ts-dev 曾因此拍平）。

### 数据流（源头在 ts-dev/raw-static，产物在 static-data）

```
ts-dev/raw-static/*.json5   ← 手改的数据源头：JSON5 格式，带 // 注释（仅 5 个定义表）
      │  pnpm gen:static-data 第 0 步：JSON5 → 标准 JSON 编译
      ▼
static-data/*.json   ← 编译/生成产物（提交进仓库；TS 与 C++ 只读，永不手改）
      ├── src/ 各 data.ts 用 @static-data/xxx.json 导入
      └── mono-repo/cpp 通过 MUSIC12_ROOT 指向仓库根读取

chord-instances / scale-instances 无 json5 源：生成器用乐理类实时计算产出
```

- **手改数据只改 `ts-dev/raw-static/*.json5`，然后跑 `pnpm gen:static-data`**；`static-data/*.json` 是编译产物，永远不手改（改了也会被下次编译覆盖，天然自愈）
- json5 源支持 `//` 注释、尾逗号、单引号；编译用 devDependencies 的 `json5` 包，注释不进产物
- 产出必须幂等：重跑 `pnpm gen:static-data` 和 `pnpm gen:golden` 后 `git diff` 必须为零

### 数据表语义陷阱（历史 bug 教训）

- **哨兵值不等于合法值**：fifth.json 里理论调（|调号|≥8，如 D♯大调 9♯）的 `circleID = -1` 是「无座位」标记，**不是合法圈位**。把它喂给 `CircleOfFifths` 会被 Base12Radix 取模成 11（F 位），静默返回错误数据（曾发生：用户问 9♯ 得到 F 大调）。消费端遇到哨兵值必须显式抛错并附等音建议（`getFifthCircleByAlter` 现行为：抛 `CircleOfFifthsError`，附 `alter - 12×sign(alter)` 的等音实用调号）
- **数据与消费端是两层责任**：数据表经 `ts-dev/verify/verifyScales.ts`（12354 项乐理对拍）与规则断言双重验证后即为可信；此后若用户端拿到错误结果，**优先怀疑消费代码消化了哨兵值/边界值，而不是先改数据**（fifth.json 数据从未错过，bug 全在代码层）
- **理论调的完整裁决仍在表里**：按主音拼法查询（`rawNoteStep + rawNoteAlter + mode`）永远安全，返回完整记录含 `actualNote*` 等音替换结果；只有「要圈位座位」这一诉求才会触发抛错
- 改动数据消费逻辑后，跑 `ts-dev/verify/verifyScales.ts` 兜底（`npx tsx` 直跑，不依赖 vitest）

### 短路径别名（四处配置必须同步）

`tsconfig.json` 的 paths、`vite.lib.config.ts`、`vitest.config.ts`、`vite.config.ts` 四处的 alias 要保持一致。现有：`@note` `@interval` `@scale` `@chord` `@chord-formula` `@scale-mode` `@circle-of-fifths` `@find` `@pianokey` `@stave` `@common/*` `@factory` `@static-data/*` `@music12/*`。新增目录时四处一起加。

### 工具库：es-toolkit（不是 lodash）

已全部迁移到 es-toolkit，**禁止任何 lodash 导入**（代码与注释都不出现 lodash 字样）。

**predicate vs compat 划分**（按 es-toolkit 1.49 实际 API）：

```ts
// isXxx 谓词统一从 predicate 子模块导（tree-shaking 最优）
import { isString, isNumber, isBoolean, isFunction, isNil, isNotNil, isUndefined } from "es-toolkit/predicate"

// 仅 predicate 没有的函数才用 compat
import { isArray, isObject, defaultTo, values, keys, toPairs, range, uniq } from "es-toolkit/compat"
```

- `es-toolkit/predicate`：`isString` `isNumber` `isBoolean` `isFunction` `isNil` `isNotNil` `isNull` `isUndefined` `isSymbol` `isDate` `isRegExp` `isPromise` `isError` `isMap` `isSet` `isPlainObject` `isEmptyObject` `isEqual` 等
- `es-toolkit/compat`（仅此有）：`isArray` `isObject` `defaultTo` `values` `keys` `toPairs` `range` `uniq` `isEmpty` `clamp` `sum` 等
- 一个文件两类都用时分两行写（predicate 一行、compat 一行）
- 旧代码存在 `from "es-toolkit"` 根导入的写法，新代码一律用子路径，触碰旧文件时顺手迁移

**类型判断：绝对禁止 typeof。** `typeof x === "string"` 等原生判断一律不用，用 predicate 的 `isXxx`。

**非空判断：用 isNotNil（predicate），禁止 `!isNil(x)`。** `isNotNil` 是类型守卫，收窄为非空类型，还能直接当 `filter(isNotNil)` 谓词传递；判断「为空」仍用 `isNil`。

```ts
// ❌ 禁止
if (!isNil(x)) { ... }
const valid = list.filter(x => !isNil(x))

// ✅ 必须
import { isNotNil } from "es-toolkit/predicate"
if (isNotNil(x)) { ... }
const valid = list.filter(isNotNil)
```

**空值默认：用 defaultTo（compat），禁止 `??` 和 `||` 兜底。**

```ts
// ❌ 禁止
const octave = config.octave ?? 4
const x = value || 0

// ✅ 必须
import { defaultTo } from "es-toolkit/compat"
const octave = defaultTo(config.octave, 4)
```

**主动赋空值：用 void 0，禁止直接写 undefined。** 类型标注里的 `| undefined` 不受限（那是声明不是赋值）。

```ts
// ❌ 禁止
this._cache = undefined

// ✅ 必须
this._cache = void 0
```

### 分支与发布流程

- 开发在 `refactor/vX.Y` 分支上做，提交遵循 Conventional Commits（中文，正文写清动机和验证结果）
- 发布时：切到 main → `git merge --squash` 压缩成一个提交（正文按「特性/修复/文档/结构/验证」分组写发布摘要）→ 打注解 tag `vX.Y.Z`（与 npm 版本号一致）
- 开发分支**不删**，改名保留为存档（如 `refactor/v3.1`），细粒度历史全在里面
- 推送时三样一起：`git push origin main vX.Y.Z refactor/vX.Y`

### 提交与推送纪律

- **默认每次对话/任务完成后 commit 当前未提交的所有改动**：`git add -A`，提交信息遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范（中文，正文写清动机与验证结果）
- **完成后绝对禁止执行 `git push` 或任何推送远程的命令**。推送是极为谨慎的事情——只允许在用户明确说「push」时执行，任何情况下都不得自动推送、不得顺带推送、不得推完 main 顺手推别的分支

### 验证三件套（结构/数据改动后必跑）

```bash
pnpm test                 # TS 单元测试（当前 213 个）
pnpm test:cpp             # C++ 测试（当前 32 个，需先 pnpm build:cpp）
pnpm verify:equivalence   # TS↔C++ 幂等验证（当前 1687 条黄金向量，必须 100%）
```

任何一个红了就不许提交。改动涉及数据或目录时，额外确认生成器重跑零差异。

## 完整文档

人类可读的详细文档在 `documents/` 目录（如果包含在包里）或 [GitHub](https://github.com/guohub8080/music12)。
