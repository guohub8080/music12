// @ts-nocheck
// 三音哈希表报告:按 tier 分大区(tier 1 在最前,tier 6 在最后),区内按键集排序
import { writeFileSync } from "fs"
import { resolve, dirname } from "path"
import { fileURLToPath } from "url"
import { findByHash } from "../../src/Find/findChord/methods/findByHash"

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, "../..")
const SYMBOLS = ["C","P","D","Q","E","F","X","G","Y","A","Z","B"]

const combo = (arr, k) => k === 0 ? [[]] : arr.flatMap((x, i) => combo(arr.slice(i + 1), k - 1).map(c => [x, ...c]))
const label = (ids) => ids.map(x => SYMBOLS[x]).join("-")

const inputs = combo([0,1,2,3,4,5,6,7,8,9,10,11], 3)

// ===== 计算全部结果 =====
const sections: Array<{ ids: number[]; results: any[]; bestTier: number }> = []
for (const ids of inputs) {
  const results = findByHash(ids)
  const bestTier = results.length > 0 ? results[0].t : 6
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
for (const s of sections) tierCounts[s.bestTier] = (tierCounts[s.bestTier] ?? 0) + 1

const lines: string[] = []
lines.push(`# 三音哈希表完整报告(C(12,3) = ${inputs.length})`)
lines.push("")
lines.push(`> 按 tier 分大区:Tier 1(完全命中)在最前 → Tier 6(极端)在最后。`)
lines.push(`> tier 语义:1=零变换 / 2=纯省略 / 3=自然扩展 / 4=组合变换 / 5=avoid note / 6=双变化`)
lines.push(`> 生成:\`npx tsx ts-dev/decompose/hash3-report.ts\``)
lines.push("")
lines.push(`| tier | 含义 | 键集数 |`)
lines.push(`|---|---|---|`)
for (const t of [1,2,3,4,5,6]) {
  lines.push(`| ${TIER_EMOJI[t]}${t} | ${TIER_HEADERS[t].replace(/^# .+? — /, "")} | ${tierCounts[t] ?? 0} |`)
}
lines.push("")

// ===== 按 tier 从低到高输出大区 =====
for (const tier of [1, 2, 3, 4, 5, 6]) {
  const group = sections.filter(s => s.bestTier === tier)
  if (group.length === 0) continue

  lines.push(TIER_HEADERS[tier])
  lines.push("")

  for (const { ids, results } of group) {
    lines.push(`## ${label(ids)}  \`{${ids.join(",")}}\``)
    lines.push("")
    lines.push(`| tier | 和弦 | 变换 | cost |`)
    lines.push(`|---|---|---|---|`)

    for (const r of results) {
      // set 条目显示「根音 + cnName」(如 C·Phrygian三音),chord 条目显示「根音 + 公式id」
      const display = r.set ? `${r.s}·${r.cn}` : `${r.s}${r.f}`
      lines.push(`| ${TIER_EMOJI[r.t] ?? "🔴"}${r.t} | **${display}** | ${r.n || "—"} | ${r.c} |`)
    }
    lines.push("")
  }
}

writeFileSync(resolve(ROOT, "ts-dev/decompose", "hash3-report.md"), lines.join("\n"), "utf-8")
console.log(`写入 ts-dev/decompose/hash3-report.md:${inputs.length} 组`)
console.log(`分布: ${Object.entries(tierCounts).sort().map(([t, n]) => `tier${t}=${n}`).join(" / ")}`)
