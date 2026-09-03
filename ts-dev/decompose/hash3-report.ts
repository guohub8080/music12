// @ts-nocheck
// 生成三音哈希表报告(Markdown)→ ts-dev/hash3-report.md
// 每个键集一节,展示 findByHash 的全部结果(按 cost 排序)
import { writeFileSync } from "fs"
import { resolve, dirname } from "path"
import { fileURLToPath } from "url"
import { findByHash } from "../../src/Find/findChord/methods/findByHash"
import { Chord } from "../../src/Chord"

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, "../..")
const SYMBOLS = ["C","P","D","Q","E","F","X","G","Y","A","Z","B"]

const combo = (arr, k) => k === 0 ? [[]] : arr.flatMap((x, i) => combo(arr.slice(i + 1), k - 1).map(c => [x, ...c]))
const label = (ids) => ids.map(x => SYMBOLS[x]).join("-")

const inputs = combo([0,1,2,3,4,5,6,7,8,9,10,11], 3)

const lines: string[] = []
lines.push(`# 三音哈希表完整报告(C(12,3) = ${inputs.length})`)
lines.push("")
lines.push(`> 每个三音组合的全部倒推方案,按加权 cost 排序(奥卡姆剃刀)。`)
lines.push(`> cost 语义:0=完全匹配或纯 omit5/omit11 / 0.5=自然扩展 / 1=属七变化 / 3=avoid note / 4=双变化`)
lines.push(`> 生成:\`npx tsx ts-dev/decompose/hash3-report.ts\``)
lines.push("")

let exactCount = 0, simpleCount = 0, complexCount = 0

for (const ids of inputs) {
  const results = findByHash(ids)
  const best = results[0]

  if (best?.isExact) exactCount++
  else if (best?.c <= 1) simpleCount++
  else complexCount++

  lines.push(`## ${label(ids)}  \`{${ids.join(",")}}\``)
  lines.push("")

  if (results.length === 0) {
    lines.push(`*(无方案——不应出现,三音必有解)*`)
    lines.push("")
    continue
  }

  // 分组展示(按 tier 1-6)
  const TIER_LABELS: Record<number, string> = {
    1: "✅ 第一组:完全命中(零变换,你弹的就是这个和弦)",
    2: "🔵 第二组:预期省略(省五度/去 avoid note——和弦本身不变)",
    3: "🟢 第三组:自然扩展(加 9/11/13 色彩音或属七合法变化)",
    4: "🟡 第四组:组合变换(多重省略+扩展,仍然合理)",
    5: "🟠 第五组:边缘(涉及 avoid note,乐理上勉强)",
    6: "🔴 第六组:极端(双变化/多重冲突——几乎不会这样解释)",
  }

  // 按 tier 分组
  const byTier: Map<number, typeof results> = new Map()
  for (const r of results) {
    const t = (r as any).t ?? 6
    if (!byTier.has(t)) byTier.set(t, [])
    byTier.get(t)!.push(r)
  }

  for (const [tier, group] of [...byTier.entries()].sort((a, b) => a[0] - b[0])) {
    lines.push(`### ${TIER_LABELS[tier] ?? `Tier ${tier}`}`)
    lines.push("")
    lines.push(`| 和弦 | 变换 | cost |`)
    lines.push(`|---|---|---|`)

    for (const r of group) {
      let fullSymbol = `${r.s}${r.f}`
      try {
        const c = new Chord(r.r, r.f)
        fullSymbol = `${r.s}${c.scoreSymbol}`
      } catch {}
      lines.push(`| **${fullSymbol}** | ${r.n || "—"} | ${r.c} |`)
    }
    lines.push("")
  }
  lines.push("")
}

lines.unshift(`**统计:完全匹配 ${exactCount} / 简单 ${simpleCount} / 复杂 ${complexCount} = ${inputs.length} 组,全覆盖。**`, "")

writeFileSync(resolve(ROOT, "ts-dev", "hash3-report.md"), lines.join("\n"), "utf-8")
console.log(`写入 ts-dev/hash3-report.md:${inputs.length} 组(完全 ${exactCount}/简单 ${simpleCount}/复杂 ${complexCount})`)
