import CHORD_FORMULA_ID from "../CHORD_FORMULA_ID.ts"
import type { I_ChordFormulaMeta } from "../types.ts"

const FAMILY = "chord3_ex"

// ========== 三和弦扩展（Triad Extensions） ==========

// ========== add6 和弦 ==========

// 大三加六和弦（Major Triad Add 6）
export const MAJ3_ADD6_FORMULA_META: I_ChordFormulaMeta = {
  chordFormulaId: CHORD_FORMULA_ID.maj3add6,
  family: FAMILY,
  cnName: "大三加六",
  scoreDisplay: "add6",
  intervalList: [["maj", 3], ["p", 5], ["maj", 6]],
  degreeToIntervalMap: { 3: "maj", 5: "p", 6: "maj" },
  notesNum: 4,
  semitonesList: [4, 7, 9],
  name: "Major Add 6",
  description: "大三加六和弦，在大三和弦基础上增加大六度音",
}

// 小三加六和弦（Minor Triad Add 6）
export const MIN3_ADD6_FORMULA_META: I_ChordFormulaMeta = {
  chordFormulaId: CHORD_FORMULA_ID.min3add6,
  family: FAMILY,
  cnName: "小三加六",
  scoreDisplay: "madd6",
  intervalList: [["min", 3], ["p", 5], ["maj", 6]],
  degreeToIntervalMap: { 3: "min", 5: "p", 6: "maj" },
  notesNum: 4,
  semitonesList: [3, 7, 9],
  name: "Minor Add 6",
  description: "小三加六和弦，在小三和弦基础上增加大六度音",
}

// ========== add6add9 和弦 ==========

// 大三加六加九和弦（Major Triad Add 6 Add 9）
export const MAJ3_ADD6_ADD9_FORMULA_META: I_ChordFormulaMeta = {
  chordFormulaId: CHORD_FORMULA_ID.maj3add6add9,
  family: FAMILY,
  cnName: "大三加六加九",
  scoreDisplay: "add6add9",
  intervalList: [["maj", 3], ["p", 5], ["maj", 6], ["maj", 9]],
  degreeToIntervalMap: { 3: "maj", 5: "p", 6: "maj", 9: "maj" },
  notesNum: 5,
  semitonesList: [4, 7, 9, 14],
  name: "Major Add 6 Add 9",
  description: "大三加六加九和弦，在大三和弦基础上增加大六度和大九度音",
}

// 小三加六加九和弦（Minor Triad Add 6 Add 9）
export const MIN3_ADD6_ADD9_FORMULA_META: I_ChordFormulaMeta = {
  chordFormulaId: CHORD_FORMULA_ID.min3add6add9,
  family: FAMILY,
  cnName: "小三加六加九",
  scoreDisplay: "madd6add9",
  intervalList: [["min", 3], ["p", 5], ["maj", 6], ["maj", 9]],
  degreeToIntervalMap: { 3: "min", 5: "p", 6: "maj", 9: "maj" },
  notesNum: 5,
  semitonesList: [3, 7, 9, 14],
  name: "Minor Add 6 Add 9",
  description: "小三加六加九和弦，在小三和弦基础上增加大六度和大九度音",
}

// ========== add9, add11 和弦 ==========

// 大三加九和弦（Major Triad Add 9）
export const MAJ3_ADD9_FORMULA_META: I_ChordFormulaMeta = {
  chordFormulaId: CHORD_FORMULA_ID.maj3add9,
  family: FAMILY,
  cnName: "大三加九",
  scoreDisplay: "add9",
  intervalList: [["maj", 3], ["p", 5], ["maj", 9]],
  degreeToIntervalMap: { 3: "maj", 5: "p", 9: "maj" },
  notesNum: 4,
  semitonesList: [4, 7, 14],
  name: "Major Add 9",
  description: "大三加九和弦，在大三和弦基础上增加大九度音",
}

// 大三加十一和弦（Major Triad Add 11）
export const MAJ3_ADD11_FORMULA_META: I_ChordFormulaMeta = {
  chordFormulaId: CHORD_FORMULA_ID.maj3add11,
  family: FAMILY,
  cnName: "大三加十一",
  scoreDisplay: "add11",
  intervalList: [["maj", 3], ["p", 5], ["p", 11]],
  degreeToIntervalMap: { 3: "maj", 5: "p", 11: "p" },
  notesNum: 4,
  semitonesList: [4, 7, 17],
  name: "Major Add 11",
  description: "大三加十一和弦，在大三和弦基础上增加纯十一度音",
}

// 小三加九和弦（Minor Triad Add 9）
export const MIN3_ADD9_FORMULA_META: I_ChordFormulaMeta = {
  chordFormulaId: CHORD_FORMULA_ID.min3add9,
  family: FAMILY,
  cnName: "小三加九",
  scoreDisplay: "madd9",
  intervalList: [["min", 3], ["p", 5], ["maj", 9]],
  degreeToIntervalMap: { 3: "min", 5: "p", 9: "maj" },
  notesNum: 4,
  semitonesList: [3, 7, 14],
  name: "Minor Add 9",
  description: "小三加九和弦，在小三和弦基础上增加大九度音",
}

// 小三加十一和弦（Minor Triad Add 11）
export const MIN3_ADD11_FORMULA_META: I_ChordFormulaMeta = {
  chordFormulaId: CHORD_FORMULA_ID.min3add11,
  family: FAMILY,
  cnName: "小三加十一",
  scoreDisplay: "madd11",
  intervalList: [["min", 3], ["p", 5], ["p", 11]],
  degreeToIntervalMap: { 3: "min", 5: "p", 11: "p" },
  notesNum: 4,
  semitonesList: [3, 7, 17],
  name: "Minor Add 11",
  description: "小三加十一和弦，在小三和弦基础上增加纯十一度音",
}

