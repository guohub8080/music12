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

  // 单表格,tier 作为一列(emoji + 编号)
  const TIER_EMOJI: Record<number, string> = { 1: "✅", 2: "🔵", 3: "🟢", 4: "🟡", 5: "🟠", 6: "🔴" }

  lines.push(`| # | tier | 和弦 | 变换 | cost |`)
  lines.push(`|---|---|---|---|---|`)

  results.forEach((r: any, i) => {
    // 显示公式 id(全表小写,如 maj7/augmaj7/dom7sus4),不用 scoreDisplay(记谱写法 M7/mM7 各家族自洽)
    lines.push(`| ${i + 1} | ${TIER_EMOJI[r.t] ?? "🔴"}${r.t} | **${r.s}${r.f}** | ${r.n || "—"} | ${r.c} |`)
  })
  lines.push("")
}

lines.unshift(`**统计:完全匹配 ${exactCount} / 简单 ${simpleCount} / 复杂 ${complexCount} = ${inputs.length} 组,全覆盖。**`, "")

writeFileSync(resolve(ROOT, "ts-dev", "hash3-report.md"), lines.join("\n"), "utf-8")
console.log(`写入 ts-dev/hash3-report.md:${inputs.length} 组(完全 ${exactCount}/简单 ${simpleCount}/复杂 ${complexCount})`)
