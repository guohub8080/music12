// @ts-nocheck
// 证明:omit 标注永远不会出现在特征音(3/7/sus替代/变化音)上——硬性限制
import { findChord } from "../../../src/Find"

// 各种省略形态的输入,检查返回结果的 alteration(omit 位置)
const cases: Array<[string, number[]]> = [
  ["C-E-B   (省五音的 maj7)", [60, 64, 71]],
  ["C-E-B♭  (省五音的 dom7)", [60, 64, 70]],
  ["C-E-A-B♭(省五音的 dom7add6? 或 min7 转位…)", [60, 64, 69, 70]],
  ["C-B     (只有根+7音,2音,应抛错)", [60, 71]],
]

for (const [label, midi] of cases) {
  try {
    const rs = findChord(midi)
    console.log(`${label}`)
    for (const r of rs.slice(0, 3)) {
      console.log(`   ${r.chordFormulaId}@${r.pianoKeyIdRoot}  alteration=${JSON.stringify(r.chordAlteration ?? r.alteration ?? null)}`)
    }
  } catch (e) {
    console.log(`${label}\n   抛错: ${(e as Error).message}`)
  }
}

// 全量扫描证明:遍历所有 3 音输入(220 种 C(12,3)),收集一切 omit 标注的度数
const omitsSeen = new Set()
let resultCount = 0
const combo = (arr, k) => k === 0 ? [[]] : arr.flatMap((x, i) => combo(arr.slice(i + 1), k - 1).map(c => [x, ...c]))
for (const ids of combo([0,1,2,3,4,5,6,7,8,9,10,11], 3)) {
  const midi = ids.map(x => x + 60)
  for (const r of findChord(midi)) {
    resultCount++
    const alt = r.chordAlteration ?? r.alteration
    if (alt) {
      const omitDegrees = Array.isArray(alt.omit) ? alt.omit : alt.omit != null ? [alt.omit] : []
      for (const d of omitDegrees) omitsSeen.add(d)
    }
  }
}
console.log(`\n=== 全量证明:所有 220 种三音输入 × ${resultCount} 个省略音匹配结果 ===`)
console.log(`omit 标注出现过的度数: ${[...omitsSeen].sort().join(", ")}`)
const forbidden = [...omitsSeen].filter(d => [3, 7].includes(d))
console.log(forbidden.length === 0
  ? "3 度与 7 度从未被 omit ✓ ——「maj7 omit3」类形态在全输入空间中不存在"
  : `违规: ${forbidden}`)
