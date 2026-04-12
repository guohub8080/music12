import CHORD_FORMULA_ID from "../CHORD_FORMULA_ID.ts"
import type { I_ChordFormulaMeta } from "../types.ts"

const FAMILY = "min7alter"

// ========== 小七变音（Minor 7th Alterations） ==========

// 小七增五和弦（Minor 7th Sharp 5）
export const MIN7_SHARP5_FORMULA_META: I_ChordFormulaMeta = {
  chordFormulaId: CHORD_FORMULA_ID["min7#5"],
  family: FAMILY,
  cnName: "小七增五",
  scoreDisplay: "m7#5",
  intervalList: [["min", 3], ["aug", 5], ["min", 7]],
  degreeToIntervalMap: { 3: "min", 5: "aug", 7: "min" },
  notesNum: 4,
  semitonesList: [3, 8, 10],
  name: "Minor 7th Sharp 5",
  description: "小七增五和弦，在小七和弦基础上将五度音升高半音",
}

// 小大七减五和弦（Minor Major 7th Flat 5）
export const MIN_MAJ7_FLAT5_FORMULA_META: I_ChordFormulaMeta = {
  chordFormulaId: CHORD_FORMULA_ID["minmaj7b5"],
  family: FAMILY,
  cnName: "小大七减五",
  scoreDisplay: "mM7b5",
  intervalList: [["min", 3], ["dim", 5], ["maj", 7]],
  degreeToIntervalMap: { 3: "min", 5: "dim", 7: "maj" },
  notesNum: 4,
  semitonesList: [3, 6, 11],
  name: "Minor Major 7th Flat 5",
  description: "小大七减五和弦，在小大七和弦基础上将五度音降低半音",
}

// 小大七增五和弦（Minor Major 7th Sharp 5）
export const MIN_MAJ7_SHARP5_FORMULA_META: I_ChordFormulaMeta = {
  chordFormulaId: CHORD_FORMULA_ID["minmaj7#5"],
  family: FAMILY,
  cnName: "小大七增五",
  scoreDisplay: "mM7#5",
  intervalList: [["min", 3], ["aug", 5], ["maj", 7]],
  degreeToIntervalMap: { 3: "min", 5: "aug", 7: "maj" },
  notesNum: 4,
  semitonesList: [3, 8, 11],
  name: "Minor Major 7th Sharp 5",
  description: "小大七增五和弦，在小大七和弦基础上将五度音升高半音",
}
