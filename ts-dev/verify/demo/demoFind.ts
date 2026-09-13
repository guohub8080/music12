// @ts-nocheck
// 演示:从输入数组到和弦结果的完整数据流(含每一步的中间值)
import { findChord } from "../../../src/Find"
import { CHORD_INSTANCE_SOUNDSET_MAP } from "../../../src/Chord/static/chord-instance-data"
import { findPresetChord } from "../../../src/Find/findChord/methods/findPresetChord"

const input = [7, 4, 0]  // 用户手里的 pianoKeyId 数组(顺序随意,含重复也行)

console.log("========== 手动拆解每一步 ==========")
const sorted = [...new Set(input)].sort((a, b) => a - b)
const key = sorted.join(",")
console.log(`输入 ${JSON.stringify(input)} → 去重排序 ${JSON.stringify(sorted)} → 哈希键 "${key}"`)
const bucket = CHORD_INSTANCE_SOUNDSET_MAP.get(key) ?? []
console.log(`Map.get("${key}") → 桶内 ${bucket.length} 个实例:`)
for (const x of bucket) {
    console.log(`   ${x.chordFormulaId}@root${x.pianoKeyIdRoot}  pianoKeyIds=${JSON.stringify(x.pianoKeyIds)}  notesNum=${x.notesNum}`)
}

console.log("\n========== 等价的一行 API ==========")
// 手里是 pianoKeyId:mod 12 恒等映射后走 findChord(或直接 findPresetChord)
const r1 = findPresetChord(sorted, 0)
console.log(`findPresetChord([0,4,7], 0) →`, r1.map(x => `${x.chordFormulaId}@${x.pianoKeyIdRoot} isRootPosition=${x.isRootPosition}`))

// 手里是 MIDI(60+):直接 findChord
const r2 = findChord([67, 64, 60])   // G4-E4-C3
console.log(`findChord([67,64,60])   →`, r2.map(x => `${x.chordFormulaId}@${x.pianoKeyIdRoot} sim=${x.similarity} isRootPosition=${x.isRootPosition}`))

console.log("\n========== 指定根音(转位判定) ==========")
// 告诉库「7(G)是根音」→ 在根为 7 的实例里找该音集 → 过滤掉 C 根的 maj3
const r3 = findChord([67, 64, 60], { rootNoteLocation: 7 })
console.log(`findChord([67,64,60], {rootNoteLocation: 7}) → ${r3.length} 个结果`)
const r4 = findChord([67, 64, 60], { rootNoteLocation: 0 })
console.log(`findChord([67,64,60], {rootNoteLocation: 0}) →`, r4.map(x => `${x.chordFormulaId}@${x.pianoKeyIdRoot} isRootPosition=${x.isRootPosition}`))
