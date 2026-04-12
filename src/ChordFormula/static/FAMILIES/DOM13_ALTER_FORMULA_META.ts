import CHORD_FORMULA_ID from "../CHORD_FORMULA_ID.ts"
import type { I_ChordFormulaMeta } from "../types.ts"

const FAMILY = "dom13alter"

// ========== 属十三变音（Dominant 13th Alterations） ==========

// 属十三减五和弦（Dominant 13th Flat 5）
export const DOM13_FLAT5_FORMULA_META: I_ChordFormulaMeta = {
  chordFormulaId: CHORD_FORMULA_ID["dom13b5"],
  family: FAMILY,
  cnName: "属十三减五",
  scoreDisplay: "13b5",
  intervalList: [["maj", 3], ["dim", 5], ["min", 7], ["maj", 9], ["p", 11], ["maj", 13]],
  degreeToIntervalMap: { 3: "maj", 5: "dim", 7: "min", 9: "maj", 11: "p", 13: "maj" },
  notesNum: 7,
  semitonesList: [4, 6, 10, 14, 17, 21],
  name: "Dominant 13th Flat 5",
  description: "属十三减五和弦，在属十三和弦基础上将五度音降低半音",
}

// 属十三增五和弦（Dominant 13th Sharp 5）
export const DOM13_SHARP5_FORMULA_META: I_ChordFormulaMeta = {
  chordFormulaId: CHORD_FORMULA_ID["dom13#5"],
  family: FAMILY,
  cnName: "属十三增五",
  scoreDisplay: "13#5",
  intervalList: [["maj", 3], ["aug", 5], ["min", 7], ["maj", 9], ["p", 11], ["maj", 13]],
  degreeToIntervalMap: { 3: "maj", 5: "aug", 7: "min", 9: "maj", 11: "p", 13: "maj" },
  notesNum: 7,
  semitonesList: [4, 8, 10, 14, 17, 21],
  name: "Dominant 13th Sharp 5",
  description: "属十三增五和弦，在属十三和弦基础上将五度音升高半音",
}

// 属十三减九和弦（Dominant 13th Flat 9）
export const DOM13_FLAT9_FORMULA_META: I_ChordFormulaMeta = {
  chordFormulaId: CHORD_FORMULA_ID["dom13b9"],
  family: FAMILY,
  cnName: "属十三减九",
  scoreDisplay: "13b9",
  intervalList: [["maj", 3], ["p", 5], ["min", 7], ["min", 9], ["p", 11], ["maj", 13]],
  degreeToIntervalMap: { 3: "maj", 5: "p", 7: "min", 9: "min", 11: "p", 13: "maj" },
  notesNum: 7,
  semitonesList: [4, 7, 10, 13, 17, 21],
  name: "Dominant 13th Flat 9",
  description: "属十三减九和弦，在属十三和弦基础上将九度音降低半音",
}

// 属十三增九和弦（Dominant 13th Sharp 9）
export const DOM13_SHARP9_FORMULA_META: I_ChordFormulaMeta = {
  chordFormulaId: CHORD_FORMULA_ID["dom13#9"],
  family: FAMILY,
  cnName: "属十三增九",
  scoreDisplay: "13#9",
  intervalList: [["maj", 3], ["p", 5], ["min", 7], ["aug", 9], ["p", 11], ["maj", 13]],
  degreeToIntervalMap: { 3: "maj", 5: "p", 7: "min", 9: "aug", 11: "p", 13: "maj" },
  notesNum: 7,
  semitonesList: [4, 7, 10, 15, 17, 21],
  name: "Dominant 13th Sharp 9",
  description: "属十三增九和弦，在属十三和弦基础上将九度音升高半音",
}

// 属十三增十一和弦（Dominant 13th Sharp 11）
export const DOM13_SHARP11_FORMULA_META: I_ChordFormulaMeta = {
  chordFormulaId: CHORD_FORMULA_ID["dom13#11"],
  family: FAMILY,
  cnName: "属十三增十一",
  scoreDisplay: "13#11",
  intervalList: [["maj", 3], ["p", 5], ["min", 7], ["maj", 9], ["aug", 11], ["maj", 13]],
  degreeToIntervalMap: { 3: "maj", 5: "p", 7: "min", 9: "maj", 11: "aug", 13: "maj" },
  notesNum: 7,
  semitonesList: [4, 7, 10, 14, 18, 21],
  name: "Dominant 13th Sharp 11",
  description: "属十三增十一和弦，在属十三和弦基础上将十一度音升高半音",
}
