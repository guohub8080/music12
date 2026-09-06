// @ts-nocheck
// 哈希表报告:按 tier 分大区(tier 1 在最前,tier 6 在最后),区内按键集排序
// 条目来源标注:✋ = 人工裁决钦定(bake-rules.verdicts);⚙ = 该组被类型化规则处理过
// K = 键集音数(命令行第一参数,默认 3;K=4 → hash4-report.md)
import { writeFileSync, readFileSync } from "fs"
import { resolve, dirname } from "path"
import { fileURLToPath } from "url"
import { isNotNil } from "es-toolkit/predicate"
import { defaultTo } from "es-toolkit/compat"
import { combo, primeForm } from "./keyset"
import { renderTransform } from "../../src/Find/findChord/methods/restoreChord"

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, "../..")
const SYMBOLS = ["C","P","D","Q","E","F","X","G","Y","A","Z","B"]
const K = Number(defaultTo(process.argv[2], 3))

const label = (ids) => ids.map(x => SYMBOLS[x]).join("-")

const inputs = combo([0,1,2,3,4,5,6,7,8,9,10,11], K)
// 直读哈希 JSON(findByHash 绑定三音表,这里按 K 泛化;键 = 字母序符号串)
const HASH: Record<string, any[]> = JSON.parse(
  readFileSync(resolve(ROOT, "static-data", `chord-hash-${K}.json`), "utf-8"),
)
const hashKey = (ids) => [...new Set(ids)].sort((a, b) => a - b).map(i => SYMBOLS[i]).sort().join("")

// bake-rules.json(gen:static-data 从 raw-static/bake-rules.json5 编译)
// 用于报告标注:该组是否被规则/人工裁决处理过(与 bake.ts 的执行保持一致)
const RULES = JSON.parse(readFileSync(resolve(ROOT, "static-data", "bake-rules.json"), "utf-8"))
// 被保留管线过滤的条目(bake 顺手输出的审核 sidecar;无此文件则跳过灰显)
const FILTERED: Record<string, any[]> = (() => {
  try {
    return JSON.parse(readFileSync(resolve(ROOT, "ts-dev/decompose", `filtered-${K}.json`), "utf-8"))
  } catch {
    return {}
  }
})()

// ===== scoreDisplay 原子渲染:{"2":-1,"4":0} → "♭2·4" =====
// 变化量 -1=♭ +1=♯ ±2=重升重降;0=还原,自然音省略符号直接写度数(爵士记谱习惯)。
// 同度多音({"3":[-1,0]})扁平化后 · 连接 → "♭3·3"。
const renderSd = (sd: Record<string, number | number[]>): string =>
  Object.entries(sd)
    .flatMap(([deg, alt]) => (Array.isArray(alt) ? alt : [alt]).map(a =>
      a === -1 ? `♭${deg}` : a === 1 ? `♯${deg}` : a === -2 ? `♭♭${deg}` : a === 2 ? `♯♯${deg}` : deg,
    ))
    .join("·")

// ===== 计算全部结果 =====
const sections: Array<{ ids: number[]; results: any[]; bestTier: number }> = []
for (const ids of inputs) {
  const results = defaultTo(HASH[hashKey(ids)], [])
  const bestTier = results.length > 0 ? results[0].tier : 6
  sections.push({ ids, results, bestTier })
}

// ===== 按最佳 tier 分大区 =====
const TIER_HEADERS: Record<number, string> = {
  1: "# ✅ Tier 1 — 完全命中(零变换)",
  2: "# 🔵 Tier 2 — 预期省略(纯 omit5/omit11)",
  3: "# 🟢 Tier 3 — 自然扩展(色彩音/属七变化)",
  4: "# 🟡 Tier 4 — 组合变换(多重省略+扩展)",
  5: "# 🟠 Tier 5 — 边缘(avoid note)",
  6: "# 🔴 Tier 6 — 极端(双变化/多重冲突)",
}
const TIER_EMOJI = { 1: "✅", 2: "🔵", 3: "🟢", 4: "🟡", 5: "🟠", 6: "🔴" }

// 统计
const tierCounts: Record<number, number> = {}
for (const s of sections) tierCounts[s.bestTier] = defaultTo(tierCounts[s.bestTier], 0) + 1

const lines: string[] = []
lines.push(`# ${K} 音哈希表完整报告(C(12,${K}) = ${inputs.length})`)
lines.push("")
lines.push(`> 按 tier 分大区:Tier 1(完全命中)在最前 → Tier 6(极端)在最后。`)
lines.push(`> tier 语义:1=零变换 / 2=纯省略 / 3=自然扩展 / 4=组合变换 / 5=avoid note / 6=双变化`)
lines.push(`> 来源标注:✋ = 人工裁决钦定(bake-rules.verdicts) / ⚙ = 类型化规则`)
lines.push(`> 🗑 每组下方完整列出被保留管线过滤的条目(tier/变换/cost)——想捞回某条就改 bake-rules.json5`)
lines.push(`> 审核流:看完报告 → 改 ts-dev/raw-static/bake-rules.json5 → 重新 bake`)
lines.push(`> 生成:\`npx tsx ts-dev/decompose/hash3-report.ts ${K}\``)
lines.push("")
lines.push(`| tier | 含义 | 键集数 |`)
lines.push(`|---|---|---|`)
for (const t of [1,2,3,4,5,6]) {
  lines.push(`| ${TIER_EMOJI[t]}${t} | ${TIER_HEADERS[t].replace(/^# .+? — /, "")} | ${defaultTo(tierCounts[t], 0)} |`)
}
lines.push("")

// ===== 按 tier 从低到高输出大区 =====
for (const tier of [1, 2, 3, 4, 5, 6]) {
  const group = sections.filter(s => s.bestTier === tier)
  if (group.length === 0) continue

  lines.push(TIER_HEADERS[tier])
  lines.push("")

  for (const { ids, results } of group) {
    // 组头来源标注:人工裁决(✋,附审核注释)与类型化规则(⚙)
    const pf = primeForm(ids)
    const verdict = RULES.verdicts[pf]
    const hasSetHit = results.some(r => !r.isChordFormula)
    const hasExactMatch = results.some(r => r.isChordFormula && r.tier === 1 && Object.keys(r.transform).length === 0)
    const hasZeroCostChord = results.some(r => r.isChordFormula && r.cost === 0)
    const appliedRules = RULES.rules.filter(
      (rule: any) => rule.enabled && (
        (rule.when?.hasSetHit === true && hasSetHit) ||
        (rule.when?.hasExactMatch === true && hasExactMatch) ||
        (rule.when?.hasZeroCostChord === true && hasZeroCostChord)
      ),
    ).map((rule: any) => rule.id)
    const badges = [
      ...(isNotNil(verdict) ? [`✋ verdict(${pf})`] : []),
      ...appliedRules.map((id: string) => `⚙ ${id}`),
    ]
    lines.push(`## ${label(ids)}  \`{${ids.join(",")}}\`${badges.length > 0 ? `  ${badges.join(" ")}` : ""}`)
    lines.push("")
    if (isNotNil(verdict)) {
      lines.push(`> ✋ 人工裁决(${verdict.date}):${verdict.comment}`)
      lines.push("")
    }

    lines.push(`| tier | 和弦 | 变换 | cost |`)
    lines.push(`|---|---|---|---|`)

    for (const r of results) {
      // set 条目显示「根音 + cnName」(如 C·Phrygian三音),chord 条目显示「根音 + 公式id」
      const display = !r.isChordFormula ? `${r.pianoKeySymbolRoot}·${r.cnName}` : `${r.pianoKeySymbolRoot}${r.formulaId}`
      // set 条目的变换列显示度数音记谱(scoreDisplay 原子渲染,如 ♭2·4);chord 条目显示变换记号
      const transformText = renderTransform(r.transform)
      const trans = !r.isChordFormula ? renderSd(r.scoreDisplay) : (transformText === "" ? "—" : transformText)
      // 条目级 ✋ 已省略:组头的 ✋ verdict(prime form) 标注即裁决来源
      lines.push(`| ${defaultTo(TIER_EMOJI[r.tier], "🔴")}${r.tier} | **${display}** | ${trans} | ${r.cost} |`)
    }
    // 被过滤条目完整列表(审核参考:判断哪条该捞回 → 改 bake-rules.json5)
    // 与主表同列格式,机器 cost 升序——审核时主表/过滤表上下对照
    // (sidecar 键为字母序符号串,与 bake.ts 键构造一致)
    const dropped = defaultTo(FILTERED[ids.map(i => SYMBOLS[i]).sort().join("")], [])
    if (dropped.length > 0) {
      lines.push("")
      lines.push(`🗑 已过滤 ${dropped.length} 条(未进哈希表):`)
      lines.push("")
      lines.push(`| tier | 和弦 | 变换 | cost |`)
      lines.push(`|---|---|---|---|`)
      for (const e of dropped) {
        const display = !e.isChordFormula ? `${e.pianoKeySymbolRoot}·${e.cnName}` : `${e.pianoKeySymbolRoot}${e.formulaId}`
        const dropTransform = renderTransform(e.transform)
        lines.push(`| ${defaultTo(TIER_EMOJI[e.tier], "🔴")}${e.tier} | ~~${display}~~ | ${dropTransform === "" ? "—" : dropTransform} | ${e.cost} |`)
      }
    }
    lines.push("")
  }
}

writeFileSync(resolve(ROOT, "ts-dev/decompose", `hash${K}-report.md`), lines.join("\n"), "utf-8")
console.log(`写入 ts-dev/decompose/hash${K}-report.md:${inputs.length} 组`)
console.log(`分布: ${Object.entries(tierCounts).sort().map(([t, n]) => `tier${t}=${n}`).join(" / ")}`)
