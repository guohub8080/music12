// @ts-nocheck
// 证明:JSON 里「消失」的 5 个音集字段,在运行时对象上原样存在(加载器 enrich 算回)
import ALL from "../../src/Chord/static/ALL_CHORD_INSTANCE_META"
import { execSync } from "child_process"

// 从 git 取瘦身前的旧 JSON 作为基准
const old = JSON.parse(execSync("git show 585f081~1:static-data/chord-instances.json", { encoding: "utf-8", maxBuffer: 1 << 28 }))

let checked = 0, mismatch = 0
for (let i = 0; i < old.length; i++) {
    const o = old[i], n = ALL[i]
    for (const k of ["pianoKeyIds", "pianoKeyIdsSorted", "notesNum", "pianoKeyIdToInterval", "intervalToPianoKeyId"]) {
        checked++
        if (JSON.stringify(o[k]) !== JSON.stringify(n[k])) {
            mismatch++
            if (mismatch <= 3) console.log(`✗ ${o.chordFormulaId}@${o.pianoKeyIdRoot}.${k}`)
        }
    }
}
console.log(`旧 JSON ${old.length} 条 vs 运行时对象 ${ALL.length} 条`)
console.log(`「消失」的 5 字段 × 1056 条 = ${checked} 项逐值比对:`)
console.log(mismatch === 0
    ? `  全部一致 ✓ —— JSON 里没有的数据,运行时一个不缺地被算回来了`
    : `  ${mismatch} 项不一致!`)
process.exit(mismatch === 0 ? 0 : 1)
