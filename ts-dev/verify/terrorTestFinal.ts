// @ts-nocheck
// 恐怖测试终章:220 三音 + 495 四音,开 fallback:"pcset" 后覆盖率必须 100%
import { findChord } from "../../src/Find"

const combo = (arr, k) => k === 0 ? [[]] : arr.flatMap((x, i) => combo(arr.slice(i + 1), k - 1).map(c => [x, ...c]))

for (const k of [3, 4]) {
  const inputs = combo([0,1,2,3,4,5,6,7,8,9,10,11], k)
  let chordHit = 0, pcsetHit = 0, empty = 0
  const sample = []
  for (const ids of inputs) {
    const r = findChord(ids.map(x => x + 60), { fallback: "pcset" })
    if (r.length === 0) empty++
    else if (r[0].type === "chord") chordHit++
    else { pcsetHit++; if (sample.length < 3) sample.push(`${ids.join(",")} → ${r[0].forte} ${r[0].cnName}(距最近和弦 ${r[0].nearestDistance} 音)`) }
  }
  const total = inputs.length
  console.log(`C(12,${k})=${total}: 和弦 ${chordHit}(${(chordHit/total*100).toFixed(1)}%) + pcset ${pcsetHit}(${(pcsetHit/total*100).toFixed(1)}%) + 空 ${empty}`)
  console.log(`  总覆盖 ${(chordHit + pcsetHit)}/${total} = ${((chordHit + pcsetHit)/total*100).toFixed(1)}%`)
  for (const s of sample) console.log(`  例 ${s}`)
}
