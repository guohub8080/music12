import CHORD_FORMULA_ID from "../CHORD_FORMULA_ID"
import type { I_ChordFormulaMeta } from "../types"

const FAMILY = "chord9"

// ========== 九和弦（9th Chords） ==========

// ========== 基础九和弦 ==========

// 大九和弦（Major Ninth）
export const MAJ9_FORMULA_META: I_ChordFormulaMeta = {
  chordFormulaId: CHORD_FORMULA_ID.maj9,
  family: FAMILY,
  cnName: "大九",
  scoreDisplay: "maj9",
  intervalList: [["maj", 3], ["p", 5], ["maj", 7], ["maj", 9]],
  tags: ["chord9","maj7"],
  degreeToIntervalMap: { 3: "maj", 5: "p", 7: "maj", 9: "maj" },
  notesNum: 5,
  semitonesList: [4, 7, 11, 14],
  name: "Major Ninth",
  description: "大九和弦，在大七和弦基础上增加大九度音，音响丰富温暖",
}

// 属九和弦（Dominant Ninth）
export const DOM9_FORMULA_META: I_ChordFormulaMeta = {
  chordFormulaId: CHORD_FORMULA_ID.dom9,
  family: FAMILY,
  cnName: "属九",
  scoreDisplay: "9",
  intervalList: [["maj", 3], ["p", 5], ["min", 7], ["maj", 9]],
  tags: ["chord9","dom"],
  degreeToIntervalMap: { 3: "maj", 5: "p", 7: "min", 9: "maj" },
  notesNum: 5,
  semitonesList: [4, 7, 10, 14],
  name: "Dominant Ninth",
  description: "属九和弦，在属七和弦基础上增加大九度音，常用于爵士乐和流行音乐",
}

// 小九和弦（Minor Ninth）
export const MIN9_FORMULA_META: I_ChordFormulaMeta = {
  chordFormulaId: CHORD_FORMULA_ID.min9,
  family: FAMILY,
  cnName: "小九",
  scoreDisplay: "m9",
  intervalList: [["min", 3], ["p", 5], ["min", 7], ["maj", 9]],
  tags: ["chord9","min"],
  degreeToIntervalMap: { 3: "min", 5: "p", 7: "min", 9: "maj" },
  notesNum: 5,
  semitonesList: [3, 7, 10, 14],
  name: "Minor Ninth",
  description: "小九和弦，在小七和弦基础上增加大九度音，音响柔和忧郁",
}

// 小大九和弦（Minor Major Ninth）
export const MIN_MAJ9_FORMULA_META: I_ChordFormulaMeta = {
  chordFormulaId: CHORD_FORMULA_ID.minmaj9,
  family: FAMILY,
  cnName: "小大九",
  scoreDisplay: "mM9",
  intervalList: [["min", 3], ["p", 5], ["maj", 7], ["maj", 9]],
  tags: ["chord9","min","maj7"],
  degreeToIntervalMap: { 3: "min", 5: "p", 7: "maj", 9: "maj" },
  notesNum: 5,
  semitonesList: [3, 7, 11, 14],
  name: "Minor Major Ninth",
  description: "小大九和弦，在小大七和弦基础上增加大九度音，音响神秘而独特",
}
