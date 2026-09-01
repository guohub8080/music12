// @ts-nocheck
// 基准:findPresetChord 线性扫描 vs 音集哈希索引
import { performance } from "perf_hooks"
import ALL from "../../src/Chord/static/ALL_CHORD_INSTANCE_META"
import { isEqual } from "es-toolkit/predicate"

// 模拟旧实现:collect().filter(isEqual) 的核心成本(线性扫描 + 数组深比较)
const linearLookup = (input) => ALL.filter(x => isEqual(input, x.pianoKeyIdsSorted))

// 新实现:预建音集 → 实例列表 的哈希索引
const INDEX = new Map()
for (const x of ALL) {
    const k = x.pianoKeyIdsSorted.join(",")
    if (!INDEX.has(k)) INDEX.set(k, [])
    INDEX.get(k).push(x)
}
const indexedLookup = (input) => INDEX.get(input.join(",")) ?? []

const N = 20000
// 索引构建成本(一次性)
const t0 = performance.now()
const INDEX2 = new Map()
for (const x of ALL) {
    const k = x.pianoKeyIdsSorted.join(",")
    if (!INDEX2.has(k)) INDEX2.set(k, [])
    INDEX2.get(k).push(x)
}
const buildMs = performance.now() - t0

const queries = []
for (let i = 0; i < 100; i++) {
    const c = ALL[(i * 37) % ALL.length]
    queries.push(c.pianoKeyIdsSorted)
}

let t1 = performance.now()
for (let i = 0; i < N; i++) linearLookup(queries[i % 100])
const linearMs = performance.now() - t1

let t2 = performance.now()
for (let i = 0; i < N; i++) indexedLookup(queries[i % 100])
const indexedMs = performance.now() - t2

// 结果等价性抽验
for (const q of queries) {
    const a = JSON.stringify(linearLookup(q).map(x => x.chordFormulaId + "@" + x.pianoKeyIdRoot).sort())
    const b = JSON.stringify(indexedLookup(q).map(x => x.chordFormulaId + "@" + x.pianoKeyIdRoot).sort())
    if (a !== b) { console.log("结果不等!", q); process.exit(1) }
}

console.log(`查询 ${N} 次(${ALL.length} 实例):`)
console.log(`  线性扫描: ${linearMs.toFixed(1)}ms(${(linearMs / N * 1e6).toFixed(0)}ns/次)`)
console.log(`  哈希索引: ${indexedMs.toFixed(1)}ms(${(indexedMs / N * 1e6).toFixed(0)}ns/次,含一次性建索引 ${buildMs.toFixed(1)}ms)`)
console.log(`  提速: ${Math.round(linearMs / Math.max(indexedMs, 0.01))}x,结果逐条等价 ✓`)
