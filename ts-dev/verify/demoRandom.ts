// @ts-nocheck
// 随机四音测试:随机 pianoKeyId 四元组,看 findChord 能找出什么
import { findChord } from "../../src/Find"

const rand = (seed) => () => (seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648
const r = rand(20260902)

const pick = () => {
  const s = new Set()
  while (s.size < 4) s.add(Math.floor(r() * 12))
  return [...s]
}

import { PianoKey } from "../../src/PianoKey"
const nameOf = (id) => PianoKey.SYMBOLS[id]

let exact = 0, fuzzy = 0, none = 0
for (let i = 0; i < 14; i++) {
  const ids = pick().sort((a, b) => a - b)
  const label = ids.map(nameOf).join(" + ")
  const results = findChord(ids.map(x => x + 60))
  const tag = results.length === 0 ? "无匹配" : results[0].similarity === 1 ? "完全匹配" : "省略音"
  if (results.length === 0) none++
  else if (results[0].similarity === 1) exact++
  else fuzzy++
  console.log(`[${tag}] ${label}`)
  if (results.length === 0) {
    console.log(`   → 找不到任何和弦(音集不构成已知和弦,也不构成任何和弦的省略形态)`)
  } else {
    for (const x of results.slice(0, 3)) {
      console.log(`   → ${x.chordFormulaId}@root${x.pianoKeyIdRoot}(${nameOf(x.pianoKeyIdRoot)}) sim=${x.similarity}${x.similarity < 1 ? " 省略音匹配" : ""}`)
    }
    if (results.length > 3) console.log(`   … 共 ${results.length} 个结果`)
  }
  console.log()
}
console.log(`=== 统计:完全匹配 ${exact} / 省略音 ${fuzzy} / 无匹配 ${none} ===`)
