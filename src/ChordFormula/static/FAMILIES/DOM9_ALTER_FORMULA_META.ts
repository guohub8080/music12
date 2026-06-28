import CHORD_FORMULA_ID from "../CHORD_FORMULA_ID"
import type { I_ChordFormulaMeta } from "../types"

const FAMILY = "dom9alter"

// ========== 属九变音（Dominant 9th Alterations） ==========

// 属九增五和弦（Dominant 9th Sharp 5）
export const DOM9_SHARP5_FORMULA_META: I_ChordFormulaMeta = {
  chordFormulaId: CHORD_FORMULA_ID["dom9#5"],
  family: FAMILY,
  cnName: "属九增五",
  scoreDisplay: "9#5",
  intervalList: [["maj", 3], ["aug", 5], ["min", 7], ["maj", 9]],
  tags: ["chord9","dom","altered","sharp5"],
  degreeToIntervalMap: { 3: "maj", 5: "aug", 7: "min", 9: "maj" },
  notesNum: 5,
  semitonesList: [4, 8, 10, 14],
  name: "Dominant 9th Sharp 5",
  description: "属九增五和弦，在属九和弦基础上将五度音升高半音",
}

// 属九增十一和弦（Dominant 9th Sharp 11）
export const DOM9_SHARP11_FORMULA_META: I_ChordFormulaMeta = {
  chordFormulaId: CHORD_FORMULA_ID["dom9#11"],
  family: FAMILY,
  cnName: "属九增十一",
  scoreDisplay: "9#11",
  intervalList: [["maj", 3], ["p", 5], ["min", 7], ["maj", 9], ["aug", 11]],
  tags: ["chord11","dom","altered","sharp11"],
  degreeToIntervalMap: { 3: "maj", 5: "p", 7: "min", 9: "maj", 11: "aug" },
  notesNum: 6,
  semitonesList: [4, 7, 10, 14, 18],
  name: "Dominant 9th Sharp 11",
  description: "属九增十一和弦，在属九和弦基础上增加增十一度音",
}

// 属九减十三和弦（Dominant 9th Flat 13）
export const DOM9_FLAT13_FORMULA_META: I_ChordFormulaMeta = {
  chordFormulaId: CHORD_FORMULA_ID["dom9b13"],
  family: FAMILY,
  cnName: "属九减十三",
  scoreDisplay: "9b13",
  intervalList: [["maj", 3], ["p", 5], ["min", 7], ["maj", 9], ["min", 13]],
  tags: ["chord9","dom","altered","flat13"],
  degreeToIntervalMap: { 3: "maj", 5: "p", 7: "min", 9: "maj", 13: "min" },
  notesNum: 6,
  semitonesList: [4, 7, 10, 14, 20],
  name: "Dominant 9th Flat 13",
  description: "属九减十三和弦，在属九和弦基础上增加小十三度音",
}

// 属九加十三和弦（Dominant 9th Add 13）
export const DOM9_ADD13_FORMULA_META: I_ChordFormulaMeta = {
  chordFormulaId: CHORD_FORMULA_ID.dom9add13,
  family: FAMILY,
  cnName: "属九加十三",
  scoreDisplay: "9add13",
  intervalList: [["maj", 3], ["p", 5], ["min", 7], ["maj", 9], ["maj", 13]],
  tags: ["chord9","dom"],
  degreeToIntervalMap: { 3: "maj", 5: "p", 7: "min", 9: "maj", 13: "maj" },
  notesNum: 6,
  semitonesList: [4, 7, 10, 14, 21],
  name: "Dominant 9th Add 13",
  description: "属九加十三和弦，在属九和弦基础上增加大十三度音，省略十一度音",
}
