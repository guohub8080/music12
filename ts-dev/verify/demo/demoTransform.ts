// @ts-nocheck
// 修正版:omit/extra/alter 变换表达的真实输出(字段是 transform,不是 chordAlteration)
import { findChord } from "../../../src/Find"

const cases: Array<[string, number[]]> = [
  ["C-E-B    (maj7 省五音)", [60, 64, 71]],
  ["C-E-B♭   (dom7 省五音)", [60, 64, 70]],
  ["C-E-G-A-B♭(dom13 片段)", [60, 64, 67, 69, 70]],
  ["C-E-G♯-B♭+D♯(dom7#5#9 完整)", [60, 64, 68, 70, 63]],
  ["C-E-G-B-D-F♯-A(13 音全)", [60, 64, 67, 71, 62, 66, 69]],
]

for (const [label, midi] of cases) {
  const rs: any[] = findChord(midi)
  console.log(label)
  for (const x of rs.slice(0, 3)) {
    console.log(`   ${x.chordFormulaId}@${x.pianoKeyIdRoot}  transform=${x.transformString || "(无,完全匹配)"}  detail=${JSON.stringify(x.transform)}  count=${x.transformCount}`)
  }
  console.log()
}

// 全量重跑 omit 安全证明(修正字段名)
const combo = (arr, k) => k === 0 ? [[]] : arr.flatMap((x, i) => combo(arr.slice(i + 1), k - 1).map(c => [x, ...c]))
const omitsSeen = new Set()
let n = 0
for (const ids of combo([0,1,2,3,4,5,6,7,8,9,10,11], 3)) {
  for (const r of findChord(ids.map(x => x + 60)) as any[]) {
    n++
    for (const d of r.transform?.omit ?? []) omitsSeen.add(d)
  }
}
console.log(`全量 220 种三音 × ${n} 结果:omit 出现过的度数 = [${[...omitsSeen].sort().join(", ")}]`)
console.log([3, 7].every(d => !omitsSeen.has(d)) ? "3/7 从未被 omit ✓(修正字段名后的真结论)" : "违规!")
