// @ts-nocheck
// 生成 C(12,3)=220 全量查找报告(Markdown)→ ts-dev/find-report-220.md
import { writeFileSync } from "fs"
import { findChord } from "../../src/Find"
import { Chord } from "../../src/Chord"

// 音名标注:PianoKey.SYMBOLS 唯一真相源(白键 CDEFGAB,黑键 P Q X Y Z)
import { PianoKey } from "../../src/PianoKey"
const NAMES = PianoKey.SYMBOLS
const combo = (arr, k) => k === 0 ? [[]] : arr.flatMap((x, i) => combo(arr.slice(i + 1), k - 1).map(c => [x, ...c]))
const label = (ids) => ids.map(x => NAMES[x]).join("-")

const inputs = combo([0,1,2,3,4,5,6,7,8,9,10,11], 3)

const lines: string[] = []
lines.push("# C(12,3) = 220 全量查找报告")
lines.push("")
lines.push("> 三音组合全集 × findChord(两层 + pcset 降级),每组的全部结果逐条列出。")
lines.push("> 生成:`npx tsx ts-dev/verify/gen220Report.ts`(数据可随时重跑刷新)。")
lines.push("")

let exact = 0, fuzzy = 0, pcset = 0

for (const ids of inputs) {
  const r: any[] = findChord(ids.map(x => x + 60), { fallback: "pcset" })
  const kind = r[0]?.type === "pcset" ? "pcset" : r[0]?.similarity === 1 ? "完全匹配" : "省略音"
  if (kind === "完全匹配") exact++
  else if (kind === "省略音") fuzzy++
  else pcset++

  lines.push(`## ${label(ids)}  \`{${ids.join(",")}}\``)
  lines.push("")
  lines.push(`**判定:${kind}**`)
  lines.push("")

  if (r[0]?.type === "pcset") {
    const p = r[0]
    const nearStr = p.nearests && p.nearests.length
      ? p.nearests.map(n => {
          // 用 Chord transform 引擎生成记谱符号;needRoot 方案不对根音做 setOmit(乐理不成立)
          try {
            const c = new Chord(n.root, n.chordFormulaId)
            const omitMatch = n.transformString.match(/omit([\d,]+)/)
            if (omitMatch) {
              for (const d of omitMatch[1].split(",")) c.setOmit(Number(d) as any)
            }
            const rootPart = n.transformString.includes("needRoot")
              ? ` ←补根${NAMES[n.root]}` : ""
            const extraPart = n.transformString.includes("extra")
              ? ` ←换${n.transformString.match(/extra(\S+)/)?.[1] ?? ""}` : ""
            return `${NAMES[n.root]}${c.scoreSymbol}${rootPart}${extraPart}`
          } catch { return `${n.chordFormulaId}@${NAMES[n.root]} ${n.transformString}` }
        }).join(" / ")
      : "太远,不给参考"
    lines.push(`| prime form | Forte | 名称 | 等距最近(全部 ${p.nearests?.length ?? 0} 方案) |`)
    lines.push(`|---|---|---|---|`)
    lines.push(`| [${p.primeFormIds.join(",")}] | ${p.forte ?? "—"} | ${p.cnName ?? "未命名(名字表缺键)"} | ${p.nearestDistance} 音(${nearStr}) |`)
  } else {
    lines.push(`| # | 和弦 | 根音 | sim | 变换 | 层级 |`)
    lines.push(`|---|---|---|---|---|---|`)
    r.forEach((x, i) => {
      const lvl = x.similarity === 1 ? "L0 完全" : "L1 省略音"
      lines.push(`| ${i + 1} | ${x.chordFormulaId} | ${NAMES[x.pianoKeyIdRoot]} | ${x.similarity} | ${x.transformString ?? "—"} | ${lvl} |`)
    })
  }
  lines.push("")
}

lines.unshift(`**统计:完全匹配 ${exact} / 省略音 ${fuzzy} / pcset 降级 ${pcset} = ${inputs.length} 组,覆盖率 100%。`,
  "")

writeFileSync("/Users/guo/WebstormProjects/music12/ts-dev/find-report-220.md", lines.join("\n"), "utf-8")
console.log(`写入 ts-dev/find-report-220.md:${inputs.length} 组(完全 ${exact}/省略 ${fuzzy}/pcset ${pcset})`)
