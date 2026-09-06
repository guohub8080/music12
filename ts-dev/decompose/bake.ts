// @ts-nocheck
/**
 * 三音哈希表烘焙器
 *
 * 遍历 C(12,3)=220 种三音组合,对每个键集运行倒推引擎,
 * 经「三层保留管线」过滤后烘焙为 JSON 查询表。
 *
 * 保留管线(规则定义在 ts-dev/raw-static/bake-rules.json5,正式数据非文档):
 *   机器   穷举 → 倒推 → 加权 cost → tier 分组
 *   policy 通用策略:maxEntries / tierCeiling(机械截断,最后执行)
 *   rules  类型化规则:when/then 声明式过滤(如 set-exclusive,管 99% 的情况)
 *   verdicts 人工裁决:prime form 为键,人工钦定保留(优先级最高,
 *           一处裁决自动对称作用于全部 12 个移调)
 *
 * 产出: static-data/chord-hash-3.json
 *   键 = 键集的 pianoKeySymbol 串,按字母序排列({0,2,11} → "BCD"),
 *       与 src/Find/.../findByHash.ts 的 hashKey 构造契约一致
 *   值 = 保留管线过滤后的分解方案数组,每条带 isChordFormula(true=chord 公式/
 *   false=special-set),set 条目额外带 cnName
 *
 * 运行: npx tsx ts-dev/decompose/bake.ts
 *   (前置: pnpm gen:static-data 编译 bake-rules.json5)
 */
import { writeFileSync, readFileSync } from "fs"
import { resolve, dirname } from "path"
import { fileURLToPath } from "url"
import { isNil, isNotNil } from "es-toolkit/predicate"
import { defaultTo } from "es-toolkit/compat"
import { decompose } from "./engine"
import { combo, primeForm, primeFormRoot, loadBakeRules } from "./keyset"
import { restoreChord } from "../../src/Find/findChord/methods/restoreChord"

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, "../..")
const SYMBOLS = ["C","P","D","Q","E","F","X","G","Y","A","Z","B"]

// ===== 加权 cost 函数(乐理依据:ts-dev/decompose/theory.md) =====

/** 判断公式是否真属七家族(只有 dom 开头的才是;maj7sus4 不是属七) */
const isDom7Family = (formulaId: string): boolean =>
  formulaId.startsWith("dom")

/** 判断公式是否挂留类(sus2/sus4/含 sus)——挂留上没有三度,升降不构成 avoid note 冲突 */
const isSusType = (formulaId: string): boolean =>
  formulaId.includes("sus")

/** 从公式 id 提取命名度数(最高数字)——如 "maj13" → 13,"dom9#11" → [9,11],"sus4" → [4] */
const getNamedDegrees = (formulaId: string): number[] => {
  const matches = formulaId.match(/\d+/g)
  if (isNil(matches)) return []
  return matches.map(Number)
}

/** omit 的加权 cost */
export const omitCost = (degree: number, formulaId: string): number => {
  // 命名度数不可省(省掉 = 名不副实,退化为更简单和弦——那个更简单和弦已独立存在)
  // 如 maj13 omit13 → 退化为 maj7/9/11(已在列表);dom9 omit9 → 退化为 dom7
  if (getNamedDegrees(formulaId).includes(degree)) return Infinity
  // 变音度数不可省:aug/dim 前缀编码的身份度数与命名数字同罪
  // (数字提取抓不到文字前缀:augmaj7 的 ♯5 省掉即退化成 maj7(omit5)——后者已在列表)
  const itv = FORMULA_DEGREE_INTERVAL[formulaId]?.[String(degree)]
  if (itv === "aug" || itv === "dim") return Infinity
  if (degree === 5) return 0                    // 纯五度:不定义性质,预期可省
  if (degree === 11) return 0                   // avoid note 冲突,省掉是预期
  if ([9, 13].includes(degree)) return 0.5      // 扩展音:色彩音(但不是命名度数时才算)
  if ([3, 7].includes(degree)) return Infinity  // guide tones:排除
  return 1                                       // 其他(如 6 度)
}

/** alter(♯/♭) 的加权 cost */
export const alterCost = (offset: number, formulaId: string): number => {
  if (offset === 0) return 0
  if (Math.abs(offset) >= 2) return Infinity    // 单次步长≥2:硬性排除(只允许±1半音)
  if (isDom7Family(formulaId)) return 1         // 真属七上的变化:合法张力(dom 开头)
  if (isSusType(formulaId)) return 1.5          // 挂留上的变化:无三度,不构成经典 avoid note 冲突,
                                                // 但也不如属七上的变化常见(比 avoid note 轻,比属七重)
  return 3                                       // 其他非属七:avoid note 冲突(有三度,升降会冲突)
}

/** add 的加权 cost(同 alter 逻辑) */
export const addCost = (degree: number, offset: number, formulaId: string): number => {
  // sus 规定:挂留和弦没有三度(2/4 度替代了三度的位置)
  // sus + add3 = 违反 sus 的定义——正确解释应该是 maj3add2 或 min3add2
  if (degree === 3 && formulaId.includes("sus")) return Infinity
  if (offset === 0) return 0.5                   // 自然扩展(9/11/13)
  if (Math.abs(offset) >= 2) return Infinity     // 单次步长≥2:硬性排除
  if (isDom7Family(formulaId)) return 1
  return 3
}

// ===== 主流程:烘焙 =====

// ===== 特殊 set 加载(special-sets.json5 编译产物) =====
// 人工审核后命名的非 tertian 音集;set 命中 = 与 chord tier1 完全命中同级的「set 完全命中」
// scoreDisplay:记谱原子 {度数: 变化量|[变化量,...]}(-1=♭ 0=♮ +1=♯,同度多音用数组)
const SPECIAL_SETS: Array<{ setId: string; cnName: string; name: string; scoreDisplay: Record<string, number | number[]>; offsets: number[] }> = (() => {
  const raw = JSON.parse(readFileSync(resolve(ROOT, "static-data", "special-sets.json"), "utf-8"))
  return Object.entries(raw).map(([setId, s]: [string, any]) => ({
    setId, cnName: s.cnName, name: s.name, scoreDisplay: s.scoreDisplay, offsets: s.offsets,
  }))
})()

// 公式 scoreDisplay 查找表(chord 条目的 sd 字段从这里取)
const FORMULA_DISPLAY: Record<string, string> = (() => {
  const raw = JSON.parse(readFileSync(resolve(ROOT, "static-data", "chord-formulas.json"), "utf-8"))
  const m: Record<string, string> = {}
  for (const [id, f] of Object.entries(raw)) m[id] = (f as any).scoreDisplay ?? ""
  return m
})()

// 公式度数性质查找表(id → degree → interval type)
// 「变音度数不可省」的判据:aug/dim 前缀编码的身份度数(augmaj7 的 ♯5、
// halfdim7/dim7 的 ♭5、dom7#11 的 ♯11)——与命名数字度数同罪
const FORMULA_DEGREE_INTERVAL: Record<string, Record<string, string>> = (() => {
  const raw = JSON.parse(readFileSync(resolve(ROOT, "static-data", "chord-formulas.json"), "utf-8"))
  const m: Record<string, Record<string, string>> = {}
  for (const [id, f] of Object.entries(raw)) m[id] = (f as any).degreeToIntervalMap
  return m
})()

/**
 * engine ops → transform 分组对象(用户 schema):
 *   {"omit": 5, "sharp": [7], "flat": [5,3], "add": 2}
 * 键 = 操作类型(add/omit/sharp/flat),值 = 度数(int 或 int[]);
 * 只写有操作的键,完全命中为 {}。
 * alter 与带升降的 add 同归 sharp/flat——两者在 Chord 应用层等价(set 度数面板)。
 */
const toTransform = (ops: any[]): Record<string, number | number[]> => {
  const t: Record<string, number | number[]> = {}
  const push = (key: string, degree: number) => {
    const cur = t[key]
    if (isNil(cur)) t[key] = degree
    else if (Array.isArray(cur)) cur.push(degree)
    else t[key] = [cur, degree]
  }
  for (const op of ops) {
    if (op.kind === "omit") push("omit", op.degree)
    else if (op.kind === "add") {
      if (op.offset === 1) push("sharp", op.degree)
      else if (op.offset === -1) push("flat", op.degree)
      else push("add", op.degree)
    } else push(op.offset === 1 ? "sharp" : "flat", op.degree)
  }
  return t
}

const bake = () => {
  const inputs = combo([0,1,2,3,4,5,6,7,8,9,10,11], 3)
  const table: Record<string, any[]> = {}
  const filteredSidecar: Record<string, any[]> = {}
  const RULES = loadBakeRules(resolve(ROOT, "static-data"))

  // verdicts 键自检:统一按 prime form 索引。手写成 C 根形态等非规范键
  // 自动归位并警告(否则永远匹配不到任何键集,裁决静默失效)
  const VERDICTS: Record<string, any> = {}
  for (const [vk, v] of Object.entries(RULES.verdicts)) {
    const pf = primeForm(vk.split(",").map(Number))
    if (pf !== vk) console.warn(`⚠ verdicts 键 "${vk}" 不是 prime form,已按 "${pf}" 归位(请修正 bake-rules.json5)`)
    VERDICTS[pf] = v
  }
  let totalSolutions = 0
  let setHits = 0
  let verdictHits = 0

  for (const ids of inputs) {
    // 键 = pianoKeySymbol 串,按字母序排列({0,2,11} → [C,D,B] → "BCD")——
    // 跨语言规范形(字典序),与 src findByHash.hashKey 的构造契约一致
    const key = ids.map(i => SYMBOLS[i]).sort().join("")
    const inputSet = new Set(ids)

    // ── set 完全命中:匹配 special-sets 的 offsets ──
    // offsets 不含 0(根音由引擎补):键集 = [root, ...offsets.map(o => (root+o)%12)]
    const setEntries: any[] = []
    for (const ss of SPECIAL_SETS) {
      for (let root = 0; root < 12; root++) {
        const setKeys = [root, ...ss.offsets.map(o => (root + o) % 12)]
        const keySet = new Set(setKeys)
        // 键集完全相同(排序后比较)
        if (keySet.size === inputSet.size && [...keySet].every(k => inputSet.has(k))) {
          setEntries.push({
            pianoKeyIdRoot: root,
            pianoKeySymbolRoot: SYMBOLS[root],
            formulaId: ss.setId,           // spset-xxx 前缀
            scoreDisplay: ss.scoreDisplay, // set 记谱原子({度数:变化量})
            transform: {},                 // set 无变换(完全命中)
            cost: 0,                       // cost = 0(与 tier1 同级)
            tier: 1,                       // tier 1(set 完全命中)
            isChordFormula: false,         // set 条目(与 chord 公式区分)
            cnName: ss.cnName,             // 中文名(仅 set 条目)
          })
          setHits++
        }
      }
    }

    // ── chord 倒推(原有逻辑) ──
    const raw = decompose(ids)

    // 硬性限制:每次升降操作只允许 ±1 半音(单次步长)
    // ♯N(升半音)→ 允许;♭N(降半音)→ 允许
    // ♯♯N(一次升全音)→ 排除——不管结果音名是否恰好是重升,操作步长不能 ≥2
    const hasStepTooLarge = (r: any): boolean =>
      r.ops.some((op: any) =>
        (op.kind === "alter" || op.kind === "add") && Math.abs(op.offset) >= 2
      )

    // 按加权 cost 重排序
    const weighted = raw
      .map(r => ({
        ...r,
        weightedCost: r.ops.reduce((sum: number, op: any) => {
          if (op.kind === "omit") return sum + omitCost(op.degree, r.chordFormulaId)
          if (op.kind === "alter") return sum + alterCost(op.offset, r.chordFormulaId)
          if (op.kind === "add") return sum + addCost(op.degree, op.offset, r.chordFormulaId)
          return sum
        }, 0),
      }))
      .filter((r: any) => r.weightedCost < Infinity)
      .filter((r: any) => !hasStepTooLarge(r))  // 单次升降步长 ≥2 排除
      .sort((a: any, b: any) => a.weightedCost - b.weightedCost || a.chordFormulaId.localeCompare(b.chordFormulaId))

    // 分组:按 cost 与变换内容划入 6 个 tier(乐理依据 theory.md)
    const tierOf = (cost: number, notation: string): number => {
      if (cost === 0 && notation === "") return 1        // 完全命中:零变换
      if (cost === 0) return 2                           // 预期省略:纯 omit5/omit11
      if (cost <= 1) return 3                            // 自然扩展:add9/11/13 或属七变化
      if (cost <= 2) return 4                            // 组合变换:多重省略+扩展
      if (cost <= 3) return 5                            // 边缘:avoid note 单个出现
      return 6                                           // 极端:双变化/多重 avoid note
    }

    // ── 机器产物:全量条目池(截断推迟到 policy 层)──
    // sd(scoreDisplay):chord 条目从公式表取,set 条目从 special-sets 取——字段名统一
    const chordEntries = weighted.map((r: any) => ({
      pianoKeyIdRoot: r.root,
      pianoKeySymbolRoot: SYMBOLS[r.root],
      isChordFormula: true,
      formulaId: r.chordFormulaId,
      scoreDisplay: defaultTo(FORMULA_DISPLAY[r.chordFormulaId], ""),
      transform: toTransform(r.ops),
      cost: r.weightedCost,
      tier: tierOf(r.weightedCost, r.notation),
    }))
    let entries: any[] = [...setEntries, ...chordEntries]

    // ── 同度双音硬排除(第 0 层,先于 rules)──
    // 同一度数出现在 transform 的两个不同键(add/sharp/flat)里 = ♮N 与 ♯N/♭N 并存,
    // 如 ♭3·♮3(分叉三和弦)。Chord 度数面板单态,set(N) 后 set(♭N) 静默覆盖丢音——
    // 这类结构 Chord 体系不可表达,是 set 的领地(「大/小三度并存本质不可 tertian
    // 表达」裁决的管线化)。条目不进主表,但留在 sidecar 供审核取证。
    const hasDegreeConflict = (t: Record<string, number | number[]>): boolean => {
      const seen = new Map<number, string>()
      for (const kind of ["add", "sharp", "flat"]) {
        const arr = Array.isArray(t[kind]) ? t[kind] : isNil(t[kind]) ? [] : [t[kind]]
        for (const d of arr) {
          if (seen.has(d) && seen.get(d) !== kind) return true
          seen.set(d, kind)
        }
      }
      return false
    }
    entries = entries.filter(
      e => e.isChordFormula === false || !hasDegreeConflict(e.transform as Record<string, number | number[]>),
    )

    const hasSetHit = setEntries.length > 0
    // 完全命中:零变换 chord 条目(键集恰好等于某公式音集,tier1 且无变换记号)
    const hasExactMatch = chordEntries.some(e => e.tier === 1 && Object.keys(e.transform).length === 0)

    // ── 第二层 rules:类型化规则,按声明顺序应用(字段直读,非 DSL)──
    for (const rule of RULES.rules) {
      if (!rule.enabled) continue
      if (rule.when?.hasSetHit === true && !hasSetHit) continue
      if (rule.when?.hasExactMatch === true && !hasExactMatch) continue
      const filter = rule.then?.filterChords
      if (isNotNil(filter) && isNotNil(filter.costMax)) {
        // 只滤 chord 条目(set 条目是人工审核产物,规则不动它们)
        entries = entries.filter(e => !e.isChordFormula || e.cost <= filter.costMax)
      }
      if (rule.then?.keepOnly === "exactMatch") {
        // 完全命中即唯一解释:等和弦多名(全命中)全保留,其余 chord 全滤
        entries = entries.filter(e => !e.isChordFormula || (e.tier === 1 && Object.keys(e.transform).length === 0))
      }
    }

    // ── 第三层 verdicts:人工裁决,prime form 为键(移调自动对称)──
    const pf = primeForm(ids)
    const verdict = VERDICTS[pf]
    if (isNotNil(verdict)) {
      // 根音锚二选一:anchor set 根音(有 set 命中的键集)
      //            / prime form 起点音(纯 chord 键集,无 set 命中)
      const anchored = isNil(verdict.anchor)
        ? void 0
        : setEntries.find(e => e.formulaId === verdict.anchor)
      if (isNil(anchored) && isNotNil(verdict.anchor)) {
        console.warn(`⚠ verdict "${pf}"(${key}):锚点 ${verdict.anchor} 未在该键集命中`)
      }
      const primeStart = primeFormRoot(ids)
      const kept: any[] = []
      for (const k of verdict.keep) {
        if (k.type === "anchor") {
          if (isNotNil(anchored)) kept.push(anchored)
        } else if (k.type === "chord") {
          const root = isNotNil(anchored)
            ? (anchored.pianoKeyIdRoot + defaultTo(k.rootShift, 0)) % 12
            : (primeStart + defaultTo(k.rootRel, 0)) % 12
          const hit = chordEntries.find(e => e.formulaId === k.formula && e.pianoKeyIdRoot === root)
          if (isNotNil(hit)) kept.push(hit)
          else console.warn(`⚠ verdict "${pf}"(${key}):keep ${k.formula} 未匹配(人工数据过期?)`)
        }
      }
      // filterRest=true → 只留人工钦定;false → 钦定置顶,其余按机器顺序殿后(去重)
      entries = verdict.filterRest
        ? kept
        : [...kept, ...entries.filter(e => !kept.some(k2 => k2.isChordFormula === e.isChordFormula && k2.formulaId === e.formulaId && k2.pianoKeyIdRoot === e.pianoKeyIdRoot))]
      verdictHits++
    }

    // ── 第一层 policy:机械截断(最后执行)──
    entries = entries
      .filter(e => e.tier <= RULES.policy.tierCeiling)
      .slice(0, RULES.policy.maxEntries)

    table[key] = entries
    totalSolutions += entries.length

    // 审核用 sidecar:记录被 rules/verdict/policy 过滤掉的条目
    // (人工审核 hash3-report 时需要看到「滤掉了什么」才能判断规则对错)
    const machineAll = [...setEntries, ...chordEntries]
    filteredSidecar[ids.map(i => SYMBOLS[i]).sort().join("")] = machineAll.filter(
      e => !entries.some(k => k.isChordFormula === e.isChordFormula && k.formulaId === e.formulaId && k.pianoKeyIdRoot === e.pianoKeyIdRoot),
    )
  }

  const outPath = resolve(ROOT, "static-data", "chord-hash-3.json")
  writeFileSync(outPath, JSON.stringify(table, null, 2) + "\n", "utf-8")
  // sidecar 写进 ts-dev(进 git,审核痕迹;非 static-data 产物)
  const sidecarPath = resolve(ROOT, "ts-dev/decompose", "filtered-3.json")
  writeFileSync(sidecarPath, JSON.stringify(filteredSidecar, null, 2) + "\n", "utf-8")
  const filteredTotal = Object.values(filteredSidecar).reduce((s, v) => s + v.length, 0)
  console.log(`烘焙完成:${inputs.length} 个键集,共 ${totalSolutions} 个方案(含 ${setHits} 个 set 完全命中,${verdictHits} 个键集被人工裁决覆盖)`)
  console.log(`被保留管线过滤(审核 sidecar):${filteredTotal} 条 → ${sidecarPath}`)
  console.log(`输出:${outPath}`)
  console.log(`文件大小:${(JSON.stringify(table).length / 1024).toFixed(1)}KB`)

  // ── restore 安全校验:主表每条 chord 条目必须可无损反推 ──
  // 同度双音(如 ♭3·♮3 并存,Chord 度数面板单态会静默覆盖)等不可达条目
  // 在此当场炸掉烘焙——「主表零冲突」从数据巧合升级为构建保证,
  // 四音表开跑时引擎若产出此类解释且未被规则滤掉,这里就是防线。
  let checked = 0
  for (const [key, entries] of Object.entries(table)) {
    const ids = key.split("").map(ch => SYMBOLS.indexOf(ch)).sort((a, b) => a - b).join(",")
    for (const e of entries) {
      if (e.isChordFormula === false) continue
      const chord = restoreChord(e)
      checked++
      const rebuilt = [...chord!.pianoKeyIds].sort((a, b) => a - b).join(",")
      if (rebuilt !== ids) {
        console.error(`✗ restore 不一致 [${key}] ${e.pianoKeySymbolRoot}${e.formulaId} ${JSON.stringify(e.transform)} → 反推音集 ${rebuilt}(同度双音不可达?)`)
        process.exit(1)
      }
    }
  }
  console.log(`restore 安全校验:${checked} 条 chord 条目全部 round-trip 可达`)
}

bake()
