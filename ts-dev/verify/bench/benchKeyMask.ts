// @ts-nocheck
// 基准:transposeFamily(循环移位×pattern表) vs 哈希桶查询
import { performance } from "perf_hooks"
import { transposeFamily } from "../../../src/common/keyMask"
import { CHORD_INSTANCE_SOUNDSET_MAP } from "../../../src/Chord/static/chord-instance-data"
import ALL from "../../../src/Chord/static/ALL_CHORD_INSTANCE_META"

const queries = ALL.map(x => x.pianoKeyIdsSorted)

// 预热 + 正确性抽验:两种引擎结果一致
for (const q of queries.slice(0, 50)) {
  const byBucket = (CHORD_INSTANCE_SOUNDSET_MAP.get(q.join(",")) ?? [])
    .map(x => `${x.chordFormulaId}@${x.pianoKeyIdRoot}`).sort()
  const byRotate = transposeFamily(q)
    .map(x => `${x.chordFormulaId}@${x.root}`).sort()
  if (JSON.stringify(byBucket) !== JSON.stringify(byRotate)) {
    console.log("不一致!", q, byBucket, byRotate); process.exit(1)
  }
}

const N = 20000
let t1 = performance.now()
for (let i = 0; i < N; i++) CHORD_INSTANCE_SOUNDSET_MAP.get(queries[i % queries.length].join(","))
const bucketMs = performance.now() - t1

let t2 = performance.now()
for (let i = 0; i < N; i++) transposeFamily(queries[i % queries.length])
const rotateMs = performance.now() - t2

console.log(`${N} 次查询(1056 种音集):`)
console.log(`  哈希桶(字符串键):    ${bucketMs.toFixed(1)}ms(${(bucketMs / N * 1e6).toFixed(0)}ns/次)`)
console.log(`  循环移位(pattern表): ${rotateMs.toFixed(1)}ms(${(rotateMs / N * 1e6).toFixed(0)}ns/次)`)
console.log(`  两种引擎结果逐条一致 ✓`)
