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
    lines.push(`- prime form:[${p.primeFormIds.join(",")}]`)
    lines.push(`- Forte:${p.forte ?? "—"} | 名称:${p.cnName ?? "未命名"}`)
    lines.push(`- 等距最近(差 ${p.nearestDistance} 音,共 ${p.nearests?.length ?? 0} 方案):`)
    if (p.nearests && p.nearests.length) {
      for (const n of p.nearests) {
        try {
          const c = new Chord(n.root, n.chordFormulaId)
          const ts = n.transformString
          // 先应用 omit 变换再取 scoreSymbol(否则 omit5 类的记谱符号缺失)
          const omitMatch = ts.match(/omit([\d,]+)/)
          if (omitMatch && !ts.includes("extra")) {
            // 纯补音型(无换键): omit 记法写进 scoreSymbol
            for (const d of omitMatch[1].split(",")) c.setOmit(Number(d) as any)
          }
          const fullSymbol = `${NAMES[n.root]}${c.scoreSymbol}`
          const extraSym = ts.match(/extra(\S+)/)?.[1] ?? ""

          if (ts === "(完全一致)") {
            lines.push(`  - **${fullSymbol}**(完全一致)`)
          } else if (ts.includes("needRoot") && extraSym) {
            lines.push(`  - **${fullSymbol}** — 你弹的不是这个;把 ${extraSym} 移到 ${NAMES[n.root]} 就弹出了 ${fullSymbol}`)
          } else if (ts.includes("needRoot")) {
            lines.push(`  - **${fullSymbol}** — 你弹的不是这个;再加 ${NAMES[n.root]} 就是 ${fullSymbol}`)
          } else if (omitMatch && extraSym) {
            lines.push(`  - **${fullSymbol}(${omitMatch[0]})** — 你弹的不是这个;把 ${extraSym} 换掉就弹出了 ${fullSymbol}`)
          } else if (omitMatch) {
            lines.push(`  - **${fullSymbol}** — 你弹的不是这个;补上缺的音就是 ${fullSymbol}`)
          } else {
            lines.push(`  - **${fullSymbol}**(${ts})`)
          }
        } catch { lines.push(`  - ${n.chordFormulaId}@${NAMES[n.root]} ${n.transformString}`) }
      }
    } else {
      lines.push(`  - 太远,不给参考`)
    }
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
