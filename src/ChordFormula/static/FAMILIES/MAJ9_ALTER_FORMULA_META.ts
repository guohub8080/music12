import CHORD_FORMULA_ID from "../CHORD_FORMULA_ID.ts"
import type { I_ChordFormulaMeta } from "../types.ts"

const FAMILY = "maj9alter"

// ========== 大九变音（Major 9th Alterations） ==========

// 大九减五和弦（Major 9th Flat 5）
export const MAJ9_FLAT5_FORMULA_META: I_ChordFormulaMeta = {
  chordFormulaId: CHORD_FORMULA_ID["maj9b5"],
  family: FAMILY,
  cnName: "大九减五",
  scoreDisplay: "maj9b5",
  intervalList: [["maj", 3], ["dim", 5], ["maj", 7], ["maj", 9]],
  degreeToIntervalMap: { 3: "maj", 5: "dim", 7: "maj", 9: "maj" },
  notesNum: 5,
  semitonesList: [4, 6, 11, 14],
  name: "Major 9th Flat 5",
  description: "大九减五和弦，在大九和弦基础上将五度音降低半音",
}

// 大九增五和弦（Major 9th Sharp 5）
export const MAJ9_SHARP5_FORMULA_META: I_ChordFormulaMeta = {
  chordFormulaId: CHORD_FORMULA_ID["maj9#5"],
  family: FAMILY,
  cnName: "大九增五",
  scoreDisplay: "maj9#5",
  intervalList: [["maj", 3], ["aug", 5], ["maj", 7], ["maj", 9]],
  degreeToIntervalMap: { 3: "maj", 5: "aug", 7: "maj", 9: "maj" },
  notesNum: 5,
  semitonesList: [4, 8, 11, 14],
  name: "Major 9th Sharp 5",
  description: "大九增五和弦，在大九和弦基础上将五度音升高半音",
}

// 大九增十一和弦（Major 9th Sharp 11）
export const MAJ9_SHARP11_FORMULA_META: I_ChordFormulaMeta = {
  chordFormulaId: CHORD_FORMULA_ID["maj9#11"],
  family: FAMILY,
  cnName: "大九增十一",
  scoreDisplay: "maj9#11",
  intervalList: [["maj", 3], ["p", 5], ["maj", 7], ["maj", 9], ["aug", 11]],
  degreeToIntervalMap: { 3: "maj", 5: "p", 7: "maj", 9: "maj", 11: "aug" },
  notesNum: 6,
  semitonesList: [4, 7, 11, 14, 18],
  name: "Major 9th Sharp 11",
  description: "大九增十一和弦，在大九和弦基础上增加增十一度音",
}

// 大九减十三和弦（Major 9th Flat 13）
export const MAJ9_FLAT13_FORMULA_META: I_ChordFormulaMeta = {
  chordFormulaId: CHORD_FORMULA_ID["maj9b13"],
  family: FAMILY,
  cnName: "大九减十三",
  scoreDisplay: "maj9b13",
  intervalList: [["maj", 3], ["p", 5], ["maj", 7], ["maj", 9], ["min", 13]],
  degreeToIntervalMap: { 3: "maj", 5: "p", 7: "maj", 9: "maj", 13: "min" },
  notesNum: 6,
  semitonesList: [4, 7, 11, 14, 20],
  name: "Major 9th Flat 13",
  description: "大九减十三和弦，在大九和弦基础上增加小十三度音",
}
