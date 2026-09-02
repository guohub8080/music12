// @ts-nocheck
// 恐怖测试 II:C(12,4)=495 种四音组合 × 四引擎 + 无匹配等价类解剖
import { findChord } from "../../src/Find"
import { transposeFamily, canonicalForm, keyMaskFromIds, idsFromKeyMask } from "../../src/common/keyMask"
import ALL from "../../src/Chord/static/ALL_CHORD_INSTANCE_META"

const NAMES = ["C","C♯","D","D♯","E","F","F♯","G","G♯","A","A♯","B"]
const combo = (arr: number[], k: number): number[][] =>
  k === 0 ? [[]] : arr.flatMap((x, i) => combo(arr.slice(i + 1), k - 1).map(c => [x, ...c]))
const label = (ids: number[]) => ids.map(x => NAMES[x]).join("-")

const mtkitFind = (input: number[]) => {
  const sorted = [...new Set(input)].sort((a, b) => a - b)
  return ALL.filter(x =>
    JSON.stringify(x.pianoKeyIdsSorted) === JSON.stringify(sorted) ||
    (x.pianoKeyIdsSorted.length > sorted.length && sorted.every(k => x.pianoKeyIdsSorted.includes(k))))
}

const inputs = combo([0,1,2,3,4,5,6,7,8,9,10,11], 4)
const noV4: number[][] = []
let exact = 0, mtkMiss = 0

for (const ids of inputs) {
  const midi = ids.map(x => x + 60)
  if (findChord(midi).length === 0) noV4.push(ids)
  else if (findChord(midi, { isStrict: true }).length > 0) exact++
  if (mtkitFind(ids).length === 0) mtkMiss++
}

console.log(`共 ${inputs.length} 种四音组合:`)
console.log(`  L0 完全匹配命中:        ${exact}/495 = ${(exact/4.95).toFixed(1)}%`)
console.log(`  L0+L1 两层命中:         ${495 - noV4.length}/495 = ${((495-noV4.length)/4.95).toFixed(1)}%`)
console.log(`  无匹配:                 ${noV4.length}/495 = ${(noV4.length/4.95).toFixed(1)}%`)
console.log(`  mtkit 模拟无匹配:       ${mtkMiss} 种`)

// 无匹配等价类归并(按 canonicalForm)
const classes = new Map<number, number[][]>()
for (const ids of noV4) {
  const cf = canonicalForm(keyMaskFromIds(ids))
  if (!classes.has(cf)) classes.set(cf, [])
  classes.get(cf)!.push(ids)
}
console.log(`\n=== ${noV4.length} 个无匹配 → ${classes.size} 个移调等价类 ===`)
const sorted2 = [...classes.entries()].sort((a, b) => b[1].length - a[1].length)
for (const [cf, members] of sorted2) {
  const ids0 = idsFromKeyMask(cf)
  const gaps = ids0.map((x, i) => (i < ids0.length - 1 ? ids0[i + 1] - x : 12 - x + ids0[0]))
  const hasSemitone = gaps.includes(1)
  const hasTritone = ids0.some(x => ids0.includes((x + 6) % 12))
  console.log(`  [${gaps.join(",")}]${hasSemitone ? " 含半音对" : ""}${hasTritone ? " 含三全音" : ""}${!hasSemitone && !hasTritone ? " ★无半音无三全音" : ""} × ${members.length} 个移调  例:${label(members[0])}`)
}
