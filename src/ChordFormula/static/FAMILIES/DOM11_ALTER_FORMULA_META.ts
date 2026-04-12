import CHORD_FORMULA_ID from "../CHORD_FORMULA_ID.ts"
import type { I_ChordFormulaMeta } from "../types.ts"

const FAMILY = "dom11alter"

// ========== 属十一变音（Dominant 11th Alterations） ==========

// 属十一减五和弦（Dominant 11th Flat 5）
export const DOM11_FLAT5_FORMULA_META: I_ChordFormulaMeta = {
  chordFormulaId: CHORD_FORMULA_ID["dom11b5"],
  family: FAMILY,
  cnName: "属十一减五",
  scoreDisplay: "11b5",
  intervalList: [["maj", 3], ["dim", 5], ["min", 7], ["maj", 9], ["p", 11]],
  degreeToIntervalMap: { 3: "maj", 5: "dim", 7: "min", 9: "maj", 11: "p" },
  notesNum: 6,
  semitonesList: [4, 6, 10, 14, 17],
  name: "Dominant 11th Flat 5",
  description: "属十一减五和弦，在属十一和弦基础上将五度音降低半音",
}

// 属十一增五和弦（Dominant 11th Sharp 5）
export const DOM11_SHARP5_FORMULA_META: I_ChordFormulaMeta = {
  chordFormulaId: CHORD_FORMULA_ID["dom11#5"],
  family: FAMILY,
  cnName: "属十一增五",
  scoreDisplay: "11#5",
  intervalList: [["maj", 3], ["aug", 5], ["min", 7], ["maj", 9], ["p", 11]],
  degreeToIntervalMap: { 3: "maj", 5: "aug", 7: "min", 9: "maj", 11: "p" },
  notesNum: 6,
  semitonesList: [4, 8, 10, 14, 17],
  name: "Dominant 11th Sharp 5",
  description: "属十一增五和弦，在属十一和弦基础上将五度音升高半音",
}

// 属十一减九和弦（Dominant 11th Flat 9）
export const DOM11_FLAT9_FORMULA_META: I_ChordFormulaMeta = {
  chordFormulaId: CHORD_FORMULA_ID["dom11b9"],
  family: FAMILY,
  cnName: "属十一减九",
  scoreDisplay: "11b9",
  intervalList: [["maj", 3], ["p", 5], ["min", 7], ["min", 9], ["p", 11]],
  degreeToIntervalMap: { 3: "maj", 5: "p", 7: "min", 9: "min", 11: "p" },
  notesNum: 6,
  semitonesList: [4, 7, 10, 13, 17],
  name: "Dominant 11th Flat 9",
  description: "属十一减九和弦，在属十一和弦基础上将九度音降低半音",
}

// 属十一增九和弦（Dominant 11th Sharp 9）
export const DOM11_SHARP9_FORMULA_META: I_ChordFormulaMeta = {
  chordFormulaId: CHORD_FORMULA_ID["dom11#9"],
  family: FAMILY,
  cnName: "属十一增九",
  scoreDisplay: "11#9",
  intervalList: [["maj", 3], ["p", 5], ["min", 7], ["aug", 9], ["p", 11]],
  degreeToIntervalMap: { 3: "maj", 5: "p", 7: "min", 9: "aug", 11: "p" },
  notesNum: 6,
  semitonesList: [4, 7, 10, 15, 17],
  name: "Dominant 11th Sharp 9",
  description: "属十一增九和弦，在属十一和弦基础上将九度音升高半音",
}

// 属十一减十三和弦（Dominant 11th Flat 13）
export const DOM11_FLAT13_FORMULA_META: I_ChordFormulaMeta = {
  chordFormulaId: CHORD_FORMULA_ID["dom11b13"],
  family: FAMILY,
  cnName: "属十一减十三",
  scoreDisplay: "11b13",
  intervalList: [["maj", 3], ["p", 5], ["min", 7], ["maj", 9], ["p", 11], ["min", 13]],
  degreeToIntervalMap: { 3: "maj", 5: "p", 7: "min", 9: "maj", 11: "p", 13: "min" },
  notesNum: 7,
  semitonesList: [4, 7, 10, 14, 17, 20],
  name: "Dominant 11th Flat 13",
  description: "属十一减十三和弦，在属十一和弦基础上增加小十三度音",
}
