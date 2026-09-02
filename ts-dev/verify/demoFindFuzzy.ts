// @ts-nocheck
// 演示:模糊搜索(省略音)在两层架构中的走向
import { findChord } from "../../src/Find"
import { CHORD_INSTANCE_SOUNDSET_MAP } from "../../src/Chord/static/chord-instance-data"

const cases: Array<[string, number[]]> = [
  ["C-E-B  (Cmaj7 省五音 G)", [60, 64, 71]],
  ["C-E-G-B(Cmaj7 完整)", [60, 64, 67, 71]],
  ["C-B♭-E (C7 省五音)", [60, 71, 64]],
  ["C-F-B♭(Csus 省五?)", [60, 65, 70]],
  ["C-E-G-A-B(13 和弦片段)", [60, 64, 67, 69, 71]],
]

for (const [label, midi] of cases) {
  const ids = [...new Set(midi.map(m => m % 12))].sort((a, b) => a - b)
  const key = ids.join(",")
  const bucket = CHORD_INSTANCE_SOUNDSET_MAP.get(key)
  const results = findChord(midi)
  console.log(`${label}`)
  console.log(`   音集 ${JSON.stringify(ids)} → 第一层 Map.get("${key}"): ${bucket ? `${bucket.length} 个完全匹配` : "空(无完全匹配)→ 落入第二层"}`)
  console.log(`   最终结果: ${results.map(r => `${r.chordFormulaId}@${r.pianoKeyIdRoot} sim=${r.similarity}`).slice(0, 4).join(", ") || "(无)"}`)
  console.log()
}
