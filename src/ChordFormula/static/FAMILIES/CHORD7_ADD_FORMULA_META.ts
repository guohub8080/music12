import CHORD_FORMULA_ID from "../CHORD_FORMULA_ID"
import type { I_ChordFormulaMeta } from "../types"

const FAMILY = "chord7Add"

// ========== 七和弦add扩展（7th Chord Add Extensions） ==========

// 大七加十一和弦（Major 7th Add 11）
export const MAJ7_ADD11_FORMULA_META: I_ChordFormulaMeta = {
  chordFormulaId: CHORD_FORMULA_ID.maj7add11,
  family: FAMILY,
  cnName: "大七加十一",
  scoreDisplay: "maj7add11",
  intervalList: [["maj", 3], ["p", 5], ["maj", 7], ["p", 11]],
  tags: ["chord7","maj7"],
  degreeToIntervalMap: { 3: "maj", 5: "p", 7: "maj", 11: "p" },
  notesNum: 5,
  semitonesList: [4, 7, 11, 17],
  name: "Major 7th Add 11",
  description: "大七加十一和弦，在大七和弦基础上增加纯十一度音",
}

// 属七加六和弦（Dominant 7th Add 6）
export const DOM7_ADD6_FORMULA_META: I_ChordFormulaMeta = {
  chordFormulaId: CHORD_FORMULA_ID.dom7add6,
  family: FAMILY,
  cnName: "属七加六",
  scoreDisplay: "7add6",
  intervalList: [["maj", 3], ["p", 5], ["maj", 6], ["min", 7]],
  tags: ["chord7","dom","add6"],
  degreeToIntervalMap: { 3: "maj", 5: "p", 6: "maj", 7: "min" },
  notesNum: 5,
  semitonesList: [4, 7, 9, 10],
  name: "Dominant 7th Add 6",
  description: "属七加六和弦，在属七和弦基础上增加大六度音",
}
