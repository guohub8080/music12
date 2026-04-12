import CHORD_FORMULA_ID from "../CHORD_FORMULA_ID.ts"
import type { I_ChordFormulaMeta } from "../types.ts"

const FAMILY = "chord11"

// ========== 基础十一和弦（11th Chords） ==========

// 大十一和弦（Major Eleventh）
export const MAJ11_FORMULA_META: I_ChordFormulaMeta = {
  chordFormulaId: CHORD_FORMULA_ID.maj11,
  family: FAMILY,
  cnName: "大十一",
  scoreDisplay: "maj11",
  intervalList: [["maj", 3], ["p", 5], ["maj", 7], ["maj", 9], ["p", 11]],
  degreeToIntervalMap: { 3: "maj", 5: "p", 7: "maj", 9: "maj", 11: "p" },
  notesNum: 6,
  semitonesList: [4, 7, 11, 14, 17],
  name: "Major Eleventh",
  description: "大十一和弦，在大九和弦基础上增加纯十一度音，音响宽广丰富",
}

// 属十一和弦（Dominant Eleventh）
export const DOM11_FORMULA_META: I_ChordFormulaMeta = {
  chordFormulaId: CHORD_FORMULA_ID.dom11,
  family: FAMILY,
  cnName: "属十一",
  scoreDisplay: "11",
  intervalList: [["maj", 3], ["p", 5], ["min", 7], ["maj", 9], ["p", 11]],
  degreeToIntervalMap: { 3: "maj", 5: "p", 7: "min", 9: "maj", 11: "p" },
  notesNum: 6,
  semitonesList: [4, 7, 10, 14, 17],
  name: "Dominant Eleventh",
  description: "属十一和弦，在属九和弦基础上增加纯十一度音，常用于爵士乐",
}

// 小十一和弦（Minor Eleventh）
export const MIN11_FORMULA_META: I_ChordFormulaMeta = {
  chordFormulaId: CHORD_FORMULA_ID.min11,
  family: FAMILY,
  cnName: "小十一",
  scoreDisplay: "m11",
  intervalList: [["min", 3], ["p", 5], ["min", 7], ["maj", 9], ["p", 11]],
  degreeToIntervalMap: { 3: "min", 5: "p", 7: "min", 9: "maj", 11: "p" },
  notesNum: 6,
  semitonesList: [3, 7, 10, 14, 17],
  name: "Minor Eleventh",
  description: "小十一和弦，在小九和弦基础上增加纯十一度音，音响柔和",
}

// 小大十一和弦（Minor Major Eleventh）
export const MIN_MAJ11_FORMULA_META: I_ChordFormulaMeta = {
  chordFormulaId: CHORD_FORMULA_ID.minmaj11,
  family: FAMILY,
  cnName: "小大十一",
  scoreDisplay: "mM11",
  intervalList: [["min", 3], ["p", 5], ["maj", 7], ["maj", 9], ["p", 11]],
  degreeToIntervalMap: { 3: "min", 5: "p", 7: "maj", 9: "maj", 11: "p" },
  notesNum: 6,
  semitonesList: [3, 7, 11, 14, 17],
  name: "Minor Major Eleventh",
  description: "小大十一和弦，在小大九和弦基础上增加纯十一度音，音响独特",
}
