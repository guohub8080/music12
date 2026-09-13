// @ts-nocheck
// findChord 端到端抽验(瘦身+索引化后)
import { findChord } from "../../../src/Find"
console.log("C-E-G-B♭ →", findChord([60,64,67,70]).map(x => `${x.chordFormulaId}@${x.pianoKeyIdRoot} sim=${x.similarity}`).slice(0,3))
console.log("C-E-G-A  →", findChord([60,64,67,69]).map(x => `${x.chordFormulaId}@${x.pianoKeyIdRoot}`).slice(0,3))
console.log("C-E(省略5)→", findChord([60,64]).map(x => `${x.chordFormulaId} sim=${x.similarity}`).slice(0,3))
