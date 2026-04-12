import CHORD_FORMULA_ID from "../CHORD_FORMULA_ID.ts"
import type { I_ChordFormulaMeta } from "../types.ts"

const FAMILY = "maj13alter"

// ========== 大十三变音（Major 13th Alterations） ==========

// 大十三减五和弦（Major 13th Flat 5）
export const MAJ13_FLAT5_FORMULA_META: I_ChordFormulaMeta = {
  chordFormulaId: CHORD_FORMULA_ID["maj13b5"],
  family: FAMILY,
  cnName: "大十三减五",
  scoreDisplay: "maj13b5",
  intervalList: [["maj", 3], ["dim", 5], ["maj", 7], ["maj", 9], ["p", 11], ["maj", 13]],
  degreeToIntervalMap: { 3: "maj", 5: "dim", 7: "maj", 9: "maj", 11: "p", 13: "maj" },
  notesNum: 7,
  semitonesList: [4, 6, 11, 14, 17, 21],
  name: "Major 13th Flat 5",
  description: "大十三减五和弦，在大十三和弦基础上将五度音降低半音",
}

// 大十三增五和弦（Major 13th Sharp 5）
export const MAJ13_SHARP5_FORMULA_META: I_ChordFormulaMeta = {
  chordFormulaId: CHORD_FORMULA_ID["maj13#5"],
  family: FAMILY,
  cnName: "大十三增五",
  scoreDisplay: "maj13#5",
  intervalList: [["maj", 3], ["aug", 5], ["maj", 7], ["maj", 9], ["p", 11], ["maj", 13]],
  degreeToIntervalMap: { 3: "maj", 5: "aug", 7: "maj", 9: "maj", 11: "p", 13: "maj" },
  notesNum: 7,
  semitonesList: [4, 8, 11, 14, 17, 21],
  name: "Major 13th Sharp 5",
  description: "大十三增五和弦，在大十三和弦基础上将五度音升高半音",
}

// 大十三减九和弦（Major 13th Flat 9）
export const MAJ13_FLAT9_FORMULA_META: I_ChordFormulaMeta = {
  chordFormulaId: CHORD_FORMULA_ID["maj13b9"],
  family: FAMILY,
  cnName: "大十三减九",
  scoreDisplay: "maj13b9",
  intervalList: [["maj", 3], ["p", 5], ["maj", 7], ["min", 9], ["p", 11], ["maj", 13]],
  degreeToIntervalMap: { 3: "maj", 5: "p", 7: "maj", 9: "min", 11: "p", 13: "maj" },
  notesNum: 7,
  semitonesList: [4, 7, 11, 13, 17, 21],
  name: "Major 13th Flat 9",
  description: "大十三减九和弦，在大十三和弦基础上将九度音降低半音",
}

// 大十三增十一和弦（Major 13th Sharp 11）
export const MAJ13_SHARP11_FORMULA_META: I_ChordFormulaMeta = {
  chordFormulaId: CHORD_FORMULA_ID["maj13#11"],
  family: FAMILY,
  cnName: "大十三增十一",
  scoreDisplay: "maj13#11",
  intervalList: [["maj", 3], ["p", 5], ["maj", 7], ["maj", 9], ["aug", 11], ["maj", 13]],
  degreeToIntervalMap: { 3: "maj", 5: "p", 7: "maj", 9: "maj", 11: "aug", 13: "maj" },
  notesNum: 7,
  semitonesList: [4, 7, 11, 14, 18, 21],
  name: "Major 13th Sharp 11",
  description: "大十三增十一和弦，在大十三和弦基础上将十一度音升高半音",
}
