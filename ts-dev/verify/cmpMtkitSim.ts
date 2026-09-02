// @ts-nocheck
// 对拍模拟:mtkit 模糊规则(纯子集,无特征音) vs v4 规则(子集+特征音)
// mtkit findChord 模糊层源码逻辑:
//   isEqual(input, cand) → true
//   cand.length > input.length 且 intersection(input, cand).length === input.length → true
import { findChord } from "../../src/Find"
import ALL from "../../src/Chord/static/ALL_CHORD_INSTANCE_META"

// mtkit 规则模拟(在 v4 的同一份实例数据上——同源 v1 数据 + dom9b5,对结论无影响)
const mtkitFind = (input: number[]): any[] => {
  const sorted = [...new Set(input)].sort((a, b) => a - b)
  return ALL.filter(x => {
    if (JSON.stringify(x.pianoKeyIdsSorted) === JSON.stringify(sorted)) return true
    if (x.pianoKeyIdsSorted.length > sorted.length &&
        sorted.every(k => x.pianoKeyIdsSorted.includes(k))) return true
    return false
  })
}

const combo = (arr: number[], k: number): number[][] =>
  k === 0 ? [[]] : arr.flatMap((x, i) => combo(arr.slice(i + 1), k - 1).map(c => [x, ...c]))

for (const k of [3, 4]) {
  let mtkEmpty = 0, v4Empty = 0, mtkTotal = 0, v4Total = 0, mtkMore = 0
  const inputs = combo([0,1,2,3,4,5,6,7,8,9,10,11], k)
  for (const ids of inputs) {
    const m = mtkitFind(ids)
    const v = findChord(ids.map(x => x + 60))
    if (m.length === 0) mtkEmpty++
    if (v.length === 0) v4Empty++
    mtkTotal += m.length; v4Total += v.length
    if (m.length > v.length) mtkMore++
  }
  console.log(`=== 全部 ${inputs.length} 种 ${k} 音输入 ===`)
  console.log(`  mtkit 规则: 无匹配 ${mtkEmpty} 种(${(mtkEmpty*100/inputs.length).toFixed(1)}%),平均返回 ${(mtkTotal/inputs.length).toFixed(1)} 个`)
  console.log(`  v4   规则: 无匹配 ${v4Empty} 种(${(v4Empty*100/inputs.length).toFixed(1)}%),平均返回 ${(v4Total/inputs.length).toFixed(1)} 个`)
  console.log(`  mtkit 比 v4 多返回结果的输入: ${mtkMore} 种`)
  console.log()
}

// 展示两个具体案例的差异明细
for (const ids of [[2,4,5,6], [3,4,5,9]]) {
  const m = mtkitFind(ids)
  console.log(`输入 ${JSON.stringify(ids)}: mtkit 规则 → ${m.length} 个(${m.slice(0,3).map(x => `${x.chordFormulaId}@${x.pianoKeyIdRoot}`).join(",")}${m.length>3?"…":""})`)
}
