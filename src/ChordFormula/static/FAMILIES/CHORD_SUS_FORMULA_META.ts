import CHORD_FORMULA_ID from "../CHORD_FORMULA_ID.ts"
import type { I_ChordFormulaMeta } from "../types.ts"

const FAMILY = "chordSus"

// ========== 挂留和弦（Suspended Chords） ==========

// ========== 基础挂留和弦 ==========

// 挂二和弦（Suspended 2nd）
export const SUS2_FORMULA_META: I_ChordFormulaMeta = {
  chordFormulaId: CHORD_FORMULA_ID.sus2,
  family: FAMILY,
  cnName: "挂二",
  scoreDisplay: "sus2",
  intervalList: [["maj", 2], ["p", 5]],
  degreeToIntervalMap: { 2: "maj", 5: "p" },
  notesNum: 3,
  semitonesList: [2, 7],
  name: "Suspended 2nd",
  description: "挂二和弦，用大二度音替代三度音，具有解决到大三或小三和弦的倾向",
}

// 挂四和弦（Suspended 4th）
export const SUS4_FORMULA_META: I_ChordFormulaMeta = {
  chordFormulaId: CHORD_FORMULA_ID.sus4,
  family: FAMILY,
  cnName: "挂四",
  scoreDisplay: "sus4",
  intervalList: [["p", 4], ["p", 5]],
  degreeToIntervalMap: { 4: "p", 5: "p" },
  notesNum: 3,
  semitonesList: [5, 7],
  name: "Suspended 4th",
  description: "挂四和弦，用纯四度音替代三度音，是最常见的挂留和弦形式",
}

// ========== 七和弦挂留 ==========

// 属七挂二和弦（Dominant 7th Suspended 2nd）
export const DOM7_SUS2_FORMULA_META: I_ChordFormulaMeta = {
  chordFormulaId: CHORD_FORMULA_ID.dom7sus2,
  family: FAMILY,
  cnName: "属七挂二",
  scoreDisplay: "7sus2",
  intervalList: [["maj", 2], ["p", 5], ["min", 7]],
  degreeToIntervalMap: { 2: "maj", 5: "p", 7: "min" },
  notesNum: 4,
  semitonesList: [2, 7, 10],
  name: "Dominant 7th Suspended 2nd",
  description: "属七挂二和弦，在属七和弦基础上用大二度音替代三度音",
}

// 属七挂四和弦（Dominant 7th Suspended 4th）
export const DOM7_SUS4_FORMULA_META: I_ChordFormulaMeta = {
  chordFormulaId: CHORD_FORMULA_ID.dom7sus4,
  family: FAMILY,
  cnName: "属七挂四",
  scoreDisplay: "7sus4",
  intervalList: [["p", 4], ["p", 5], ["min", 7]],
  degreeToIntervalMap: { 4: "p", 5: "p", 7: "min" },
  notesNum: 4,
  semitonesList: [5, 7, 10],
  name: "Dominant 7th Suspended 4th",
  description: "属七挂四和弦，在属七和弦基础上用纯四度音替代三度音",
}

// 属七挂四减九和弦（Dominant 7th Suspended 4th Flat 9）
export const DOM7_SUS4_FLAT9_FORMULA_META: I_ChordFormulaMeta = {
  chordFormulaId: CHORD_FORMULA_ID.dom7sus4b9,
  family: FAMILY,
  cnName: "属七挂四减九",
  scoreDisplay: "7sus4b9",
  intervalList: [["p", 4], ["p", 5], ["min", 7], ["min", 9]],
  degreeToIntervalMap: { 4: "p", 5: "p", 7: "min", 9: "min" },
  notesNum: 5,
  semitonesList: [5, 7, 10, 13],
  name: "Dominant 7th Suspended 4th Flat 9",
  description: "属七挂四减九和弦，在属七挂四和弦基础上增加小九度音",
}

// 大七挂二和弦（Major 7th Suspended 2nd）
export const MAJ7_SUS2_FORMULA_META: I_ChordFormulaMeta = {
  chordFormulaId: CHORD_FORMULA_ID.maj7sus2,
  family: FAMILY,
  cnName: "大七挂二",
  scoreDisplay: "maj7sus2",
  intervalList: [["maj", 2], ["p", 5], ["maj", 7]],
  degreeToIntervalMap: { 2: "maj", 5: "p", 7: "maj" },
  notesNum: 4,
  semitonesList: [2, 7, 11],
  name: "Major 7th Suspended 2nd",
  description: "大七挂二和弦，在大七和弦基础上用大二度音替代三度音",
}

// 大七挂四和弦（Major 7th Suspended 4th）
export const MAJ7_SUS4_FORMULA_META: I_ChordFormulaMeta = {
  chordFormulaId: CHORD_FORMULA_ID.maj7sus4,
  family: FAMILY,
  cnName: "大七挂四",
  scoreDisplay: "maj7sus4",
  intervalList: [["p", 4], ["p", 5], ["maj", 7]],
  degreeToIntervalMap: { 4: "p", 5: "p", 7: "maj" },
  notesNum: 4,
  semitonesList: [5, 7, 11],
  name: "Major 7th Suspended 4th",
  description: "大七挂四和弦，在大七和弦基础上用纯四度音替代三度音",
}

// ========== 九和弦挂留 ==========

// 属九挂四和弦（Dominant 9th Suspended 4th）
export const DOM9_SUS4_FORMULA_META: I_ChordFormulaMeta = {
  chordFormulaId: CHORD_FORMULA_ID.dom9sus4,
  family: FAMILY,
  cnName: "属九挂四",
  scoreDisplay: "9sus4",
  intervalList: [["p", 4], ["p", 5], ["min", 7], ["maj", 9]],
  degreeToIntervalMap: { 4: "p", 5: "p", 7: "min", 9: "maj" },
  notesNum: 5,
  semitonesList: [5, 7, 10, 14],
  name: "Dominant 9th Suspended 4th",
  description: "属九挂四和弦，在属九和弦基础上用纯四度音替代三度音，常用于爵士乐",
}

// 大九挂四和弦（Major 9th Suspended 4th）
export const MAJ9_SUS4_FORMULA_META: I_ChordFormulaMeta = {
  chordFormulaId: CHORD_FORMULA_ID.maj9sus4,
  family: FAMILY,
  cnName: "大九挂四",
  scoreDisplay: "maj9sus4",
  intervalList: [["p", 4], ["p", 5], ["maj", 7], ["maj", 9]],
  degreeToIntervalMap: { 4: "p", 5: "p", 7: "maj", 9: "maj" },
  notesNum: 5,
  semitonesList: [5, 7, 11, 14],
  name: "Major 9th Suspended 4th",
  description: "大九挂四和弦，在大九和弦基础上用纯四度音替代三度音",
}

// ========== 十三和弦挂留 ==========

// 属十三挂四和弦（Dominant 13th Suspended 4th）
export const DOM13_SUS4_FORMULA_META: I_ChordFormulaMeta = {
  chordFormulaId: CHORD_FORMULA_ID.dom13sus4,
  family: FAMILY,
  cnName: "属十三挂四",
  scoreDisplay: "13sus4",
  intervalList: [["p", 4], ["p", 5], ["min", 7], ["maj", 9], ["maj", 13]],
  degreeToIntervalMap: { 4: "p", 5: "p", 7: "min", 9: "maj", 13: "maj" },
  notesNum: 6,
  semitonesList: [5, 7, 10, 14, 21],
  name: "Dominant 13th Suspended 4th",
  description: "属十三挂四和弦，在属十三和弦基础上用纯四度音替代三度音",
}

// 大十三挂四和弦（Major 13th Suspended 4th）
export const MAJ13_SUS4_FORMULA_META: I_ChordFormulaMeta = {
  chordFormulaId: CHORD_FORMULA_ID.maj13sus4,
  family: FAMILY,
  cnName: "大十三挂四",
  scoreDisplay: "maj13sus4",
  intervalList: [["p", 4], ["p", 5], ["maj", 7], ["maj", 9], ["maj", 13]],
  degreeToIntervalMap: { 4: "p", 5: "p", 7: "maj", 9: "maj", 13: "maj" },
  notesNum: 6,
  semitonesList: [5, 7, 11, 14, 21],
  name: "Major 13th Suspended 4th",
  description: "大十三挂四和弦，在大十三和弦基础上用纯四度音替代三度音",
}

// 大十三挂二和弦（Major 13th Suspended 2nd）
export const MAJ13_SUS2_FORMULA_META: I_ChordFormulaMeta = {
  chordFormulaId: CHORD_FORMULA_ID.maj13sus2,
  family: FAMILY,
  cnName: "大十三挂二",
  scoreDisplay: "maj13sus2",
  intervalList: [["maj", 2], ["p", 5], ["maj", 7], ["maj", 13]],
  degreeToIntervalMap: { 2: "maj", 5: "p", 7: "maj", 13: "maj" },
  notesNum: 5,
  semitonesList: [2, 7, 11, 21],
  name: "Major 13th Suspended 2nd",
  description: "大十三挂二和弦，在大十三和弦基础上用大二度音替代三度音",
}
