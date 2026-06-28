import CHORD_FORMULA_ID from "../CHORD_FORMULA_ID"
import type { I_ChordFormulaMeta } from "../types"

const FAMILY = "chord7"

// ========== 基础七和弦（7th Chords） ==========

// 大七和弦（Major Seventh）
export const MAJ7_FORMULA_META: I_ChordFormulaMeta = {
  chordFormulaId: CHORD_FORMULA_ID.maj7,
  family: FAMILY,
  cnName: "大七",
  scoreDisplay: "M7",
  intervalList: [["maj", 3], ["p", 5], ["maj", 7]],
  tags: ["chord7","maj7"],
  degreeToIntervalMap: { 3: "maj", 5: "p", 7: "maj" },
  notesNum: 4,
  semitonesList: [4, 7, 11],
  name: "Major Seventh",
  description: "大七和弦，由大三和弦加大七度音构成，音响明亮稳定",
}

// 属七和弦（Dominant Seventh）
export const DOM7_FORMULA_META: I_ChordFormulaMeta = {
  chordFormulaId: CHORD_FORMULA_ID.dom7,
  family: FAMILY,
  cnName: "属七",
  scoreDisplay: "7",
  intervalList: [["maj", 3], ["p", 5], ["min", 7]],
  tags: ["chord7","dom"],
  degreeToIntervalMap: { 3: "maj", 5: "p", 7: "min" },
  notesNum: 4,
  semitonesList: [4, 7, 10],
  name: "Dominant Seventh",
  description: "属七和弦，由大三和弦加小七度音构成，具有强烈的解决倾向性",
}

// 小七和弦（Minor Seventh）
export const MIN7_FORMULA_META: I_ChordFormulaMeta = {
  chordFormulaId: CHORD_FORMULA_ID.min7,
  family: FAMILY,
  cnName: "小七",
  scoreDisplay: "m7",
  intervalList: [["min", 3], ["p", 5], ["min", 7]],
  tags: ["chord7","min"],
  degreeToIntervalMap: { 3: "min", 5: "p", 7: "min" },
  notesNum: 4,
  semitonesList: [3, 7, 10],
  name: "Minor Seventh",
  description: "小七和弦，由小三和弦加小七度音构成，音响柔和常见",
}

// 半减七和弦（Half-Diminished Seventh）
export const HALFDIM7_FORMULA_META: I_ChordFormulaMeta = {
  chordFormulaId: CHORD_FORMULA_ID.halfdim7,
  family: FAMILY,
  cnName: "半减七",
  scoreDisplay: "ø",
  intervalList: [["min", 3], ["dim", 5], ["min", 7]],
  tags: ["chord7","halfdim","altered","flat5"],
  degreeToIntervalMap: { 3: "min", 5: "dim", 7: "min" },
  notesNum: 4,
  semitonesList: [3, 6, 10],
  name: "Half-Diminished Seventh",
  description: "半减七和弦，由减三和弦加小七度音构成，也称为小七减五和弦",
}

// 减七和弦（Diminished Seventh）
export const DIM7_FORMULA_META: I_ChordFormulaMeta = {
  chordFormulaId: CHORD_FORMULA_ID.dim7,
  family: FAMILY,
  cnName: "减七",
  scoreDisplay: "°7",
  intervalList: [["min", 3], ["dim", 5], ["dim", 7]],
  tags: ["chord7","dim","altered","flat5"],
  degreeToIntervalMap: { 3: "min", 5: "dim", 7: "dim" },
  notesNum: 4,
  semitonesList: [3, 6, 9],
  name: "Diminished Seventh",
  description: "减七和弦，由减三和弦加减七度音构成，所有音程均为小三度，具有对称性",
}

// 小大七和弦（Minor Major Seventh）
export const MIN_MAJ7_FORMULA_META: I_ChordFormulaMeta = {
  chordFormulaId: CHORD_FORMULA_ID.minmaj7,
  family: FAMILY,
  cnName: "小大七",
  scoreDisplay: "mM7",
  intervalList: [["min", 3], ["p", 5], ["maj", 7]],
  tags: ["chord7","min","maj7"],
  degreeToIntervalMap: { 3: "min", 5: "p", 7: "maj" },
  notesNum: 4,
  semitonesList: [3, 7, 11],
  name: "Minor Major Seventh",
  description: "小大七和弦，由小三和弦加大七度音构成，音响独特而神秘",
}
