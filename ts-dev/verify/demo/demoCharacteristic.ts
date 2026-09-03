// @ts-nocheck
// 演示:特征音规则如何裁决省略音匹配
import { findChord } from "../../../src/Find"

const cases: Array<[string, number[]]> = [
  ["C-E-G    (有3度,无7音)", [60, 64, 67]],
  ["C-E-B    (有3度+7音,省纯五)", [60, 64, 71]],
  ["C-G-B    (省3度,有7音)", [60, 67, 71]],
  ["C-E-G♯-B♭ (变化五度 G♯ 弹到)", [60, 64, 68, 70]],
  ["C-E-B♭   (无5,有3+7)", [60, 64, 70]],
  ["C-D-G    (sus 片段:2度弹到,无3无7)", [60, 62, 67]],
]

for (const [label, midi] of cases) {
  const r = findChord(midi)
  console.log(`${label}`)
  console.log(`   → ${r.map(x => `${x.chordFormulaId}@${x.pianoKeyIdRoot}(${x.similarity})`).slice(0, 4).join(", ") || "(无匹配)"}`)
}
