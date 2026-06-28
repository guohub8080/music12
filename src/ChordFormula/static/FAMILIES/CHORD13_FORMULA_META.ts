import CHORD_FORMULA_ID from "../CHORD_FORMULA_ID"
import type { I_ChordFormulaMeta } from "../types"

const FAMILY = "chord13"

// ========== 基础十三和弦（13th Chords） ==========

// 大十三和弦（Major Thirteenth）
export const MAJ13_FORMULA_META: I_ChordFormulaMeta = {
  chordFormulaId: CHORD_FORMULA_ID.maj13,
  family: FAMILY,
  cnName: "大十三",
  scoreDisplay: "maj13",
  intervalList: [["maj", 3], ["p", 5], ["maj", 7], ["maj", 9], ["p", 11], ["maj", 13]],
  tags: ["chord13","maj7"],
  degreeToIntervalMap: { 3: "maj", 5: "p", 7: "maj", 9: "maj", 11: "p", 13: "maj" },
  notesNum: 7,
  semitonesList: [4, 7, 11, 14, 17, 21],
  name: "Major Thirteenth",
  description: "大十三和弦，在大十一和弦基础上增加大十三度音，音响最为丰满",
}

// 属十三和弦（Dominant Thirteenth）
export const DOM13_FORMULA_META: I_ChordFormulaMeta = {
  chordFormulaId: CHORD_FORMULA_ID.dom13,
  family: FAMILY,
  cnName: "属十三",
  scoreDisplay: "13",
  intervalList: [["maj", 3], ["p", 5], ["min", 7], ["maj", 9], ["p", 11], ["maj", 13]],
  tags: ["chord13","dom"],
  degreeToIntervalMap: { 3: "maj", 5: "p", 7: "min", 9: "maj", 11: "p", 13: "maj" },
  notesNum: 7,
  semitonesList: [4, 7, 10, 14, 17, 21],
  name: "Dominant Thirteenth",
  description: "属十三和弦，在属十一和弦基础上增加大十三度音，常用于爵士乐",
}

// 小十三和弦（Minor Thirteenth）
export const MIN13_FORMULA_META: I_ChordFormulaMeta = {
  chordFormulaId: CHORD_FORMULA_ID.min13,
  family: FAMILY,
  cnName: "小十三",
  scoreDisplay: "m13",
  intervalList: [["min", 3], ["p", 5], ["min", 7], ["maj", 9], ["p", 11], ["maj", 13]],
  tags: ["chord13","min"],
  degreeToIntervalMap: { 3: "min", 5: "p", 7: "min", 9: "maj", 11: "p", 13: "maj" },
  notesNum: 7,
  semitonesList: [3, 7, 10, 14, 17, 21],
  name: "Minor Thirteenth",
  description: "小十三和弦，在小十一和弦基础上增加大十三度音，音响丰富柔和",
}

// 小大十三和弦（Minor Major Thirteenth）
export const MIN_MAJ13_FORMULA_META: I_ChordFormulaMeta = {
  chordFormulaId: CHORD_FORMULA_ID.minmaj13,
  family: FAMILY,
  cnName: "小大十三",
  scoreDisplay: "mM13",
  intervalList: [["min", 3], ["p", 5], ["maj", 7], ["maj", 9], ["p", 11], ["maj", 13]],
  tags: ["chord13","min","maj7"],
  degreeToIntervalMap: { 3: "min", 5: "p", 7: "maj", 9: "maj", 11: "p", 13: "maj" },
  notesNum: 7,
  semitonesList: [3, 7, 11, 14, 17, 21],
  name: "Minor Major Thirteenth",
  description: "小大十三和弦，在小大十一和弦基础上增加大十三度音，音响独特而神秘",
}
