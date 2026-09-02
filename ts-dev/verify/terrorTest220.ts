// @ts-nocheck
// 恐怖测试:C(12,3)=220 种三音组合 × 四个引擎,100% 覆盖率检验 + 无匹配解剖
import { findChord } from "../../src/Find"
import { transposeFamily } from "../../src/common/keyMask"
import ALL from "../../src/Chord/static/ALL_CHORD_INSTANCE_META"

const NAMES = ["C","C♯","D","D♯","E","F","F♯","G","G♯","A","A♯","B"]
const combo = (arr: number[], k: number): number[][] =>
  k === 0 ? [[]] : arr.flatMap((x, i) => combo(arr.slice(i + 1), k - 1).map(c => [x, ...c]))
const label = (ids: number[]) => ids.map(x => NAMES[x]).join("-")

// mtkit 规则模拟(纯子集,无特征音)
const mtkitFind = (input: number[]) => {
  const sorted = [...new Set(input)].sort((a, b) => a - b)
  return ALL.filter(x =>
    JSON.stringify(x.pianoKeyIdsSorted) === JSON.stringify(sorted) ||
    (x.pianoKeyIdsSorted.length > sorted.length && sorted.every(k => x.pianoKeyIdsSorted.includes(k))))
}

const inputs = combo([0,1,2,3,4,5,6,7,8,9,10,11], 3)
const noExact: number[][] = [], noV4: number[][] = [], noStruct: number[][] = []
let mtk100 = true

for (const ids of inputs) {
  const midi = ids.map(x => x + 60)
  if (findChord(midi, { isStrict: true }).length === 0) noExact.push(ids)
  if (findChord(midi).length === 0) noV4.push(ids)
  if (transposeFamily(ids).length === 0) noStruct.push(ids)
  if (mtkitFind(ids).length === 0) mtk100 = false
}

console.log(`共 ${inputs.length} 种三音组合:`)
console.log(`  L0 完全匹配(严格模式):      ${220 - noExact.length}/220 = ${((220-noExact.length)/2.2).toFixed(1)}%`)
console.log(`  L0+L1 两层(默认 findChord):  ${220 - noV4.length}/220 = ${((220-noV4.length)/2.2).toFixed(1)}%`)
console.log(`  结构层 transposeFamily:      ${220 - noStruct.length}/220 = ${((220-noStruct.length)/2.2).toFixed(1)}%`)
console.log(`  mtkit 规则(纯子集模拟):     ${mtk100 ? "220/220 = 100% ✓" : "存在无匹配!"}`)
console.log(`  (L0+L1 与结构层无匹配集合${JSON.stringify(noV4) === JSON.stringify(noStruct) ? "完全一致 ✓" : "不同!"})`)

// 无匹配音集解剖:音程含量分析(相邻半音差)
console.log(`\n=== L1 挡下的 ${noV4.length} 个无匹配音集(解剖)===`)
const same = JSON.stringify(noV4) === JSON.stringify(noStruct)
for (const ids of noV4) {
  const mtk = mtkitFind(ids)
  // 音程结构:排序后相邻差 + 环绕差
  const gaps = ids.map((x, i) => (i < 2 ? ids[i + 1] - x : 12 - x + ids[0]))
  console.log(`  ${label(ids).padEnd(12)} 结构[${gaps.join(",")}]${gaps.slice().sort().join(",") === "3,4,5" ? " (三和弦形状?)" : ""} → mtkit 模拟能给 ${mtk.length} 个(${mtk.slice(0, 2).map(x => `${x.chordFormulaId}@${x.pianoKeyIdRoot}`).join(",")}${mtk.length > 2 ? "…" : ""})`)
}
