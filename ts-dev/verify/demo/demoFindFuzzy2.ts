// @ts-nocheck
import { findChord } from "../../../src/Find"
// 真·C7 省五音:C-E-B♭ (B♭=MIDI 70)
const r = findChord([60, 64, 70])
console.log("C-E-B♭(C7 省五音) →", r.map(x => `${x.chordFormulaId}@${x.pianoKeyIdRoot} sim=${x.similarity}`).slice(0, 3))
// mtkit 超级钢琴等价:严格模式
const s = findChord([60, 64, 70], { isStrict: true })
console.log("同输入 isStrict(=mtkit Spiano 用法) →", s.length, "个结果")
