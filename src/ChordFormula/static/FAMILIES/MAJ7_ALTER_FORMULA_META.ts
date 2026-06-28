import CHORD_FORMULA_ID from "../CHORD_FORMULA_ID"
import type { I_ChordFormulaMeta } from "../types"

const FAMILY = "maj7alter"

// ========== 大七变音（Major 7th Alterations） ==========

// 大七减五和弦（Major 7th Flat 5）
export const MAJ7_FLAT5_FORMULA_META: I_ChordFormulaMeta = {
  chordFormulaId: CHORD_FORMULA_ID["maj7b5"],
  family: FAMILY,
  cnName: "大七减五",
  scoreDisplay: "maj7b5",
  intervalList: [["maj", 3], ["dim", 5], ["maj", 7]],
  tags: ["chord7","maj7","altered","flat5"],
  degreeToIntervalMap: { 3: "maj", 5: "dim", 7: "maj" },
  notesNum: 4,
  semitonesList: [4, 6, 11],
  name: "Major 7th Flat 5",
  description: "大七减五和弦，在大七和弦基础上将五度音降低半音",
}

// 大七减九和弦（Major 7th Flat 9）
export const MAJ7_FLAT9_FORMULA_META: I_ChordFormulaMeta = {
  chordFormulaId: CHORD_FORMULA_ID["maj7b9"],
  family: FAMILY,
  cnName: "大七减九",
  scoreDisplay: "maj7b9",
  intervalList: [["maj", 3], ["p", 5], ["maj", 7], ["min", 9]],
  tags: ["chord9","maj7","altered","flat9"],
  degreeToIntervalMap: { 3: "maj", 5: "p", 7: "maj", 9: "min" },
  notesNum: 5,
  semitonesList: [4, 7, 11, 13],
  name: "Major 7th Flat 9",
  description: "大七减九和弦，在大七和弦基础上增加小九度音",
}

// 大七减十三和弦（Major 7th Flat 13）
export const MAJ7_FLAT13_FORMULA_META: I_ChordFormulaMeta = {
  chordFormulaId: CHORD_FORMULA_ID["maj7b13"],
  family: FAMILY,
  cnName: "大七减十三",
  scoreDisplay: "maj7b13",
  intervalList: [["maj", 3], ["p", 5], ["maj", 7], ["min", 13]],
  tags: ["chord7","maj7","altered","flat13"],
  degreeToIntervalMap: { 3: "maj", 5: "p", 7: "maj", 13: "min" },
  notesNum: 5,
  semitonesList: [4, 7, 11, 20],
  name: "Major 7th Flat 13",
  description: "大七减十三和弦，在大七和弦基础上增加小十三度音",
}

// 大七增十一和弦（Major 7th Sharp 11）
export const MAJ7_SHARP11_FORMULA_META: I_ChordFormulaMeta = {
  chordFormulaId: CHORD_FORMULA_ID["maj7#11"],
  family: FAMILY,
  cnName: "大七增十一",
  scoreDisplay: "maj7#11",
  intervalList: [["maj", 3], ["p", 5], ["maj", 7], ["aug", 11]],
  tags: ["chord7","maj7","altered","sharp11"],
  degreeToIntervalMap: { 3: "maj", 5: "p", 7: "maj", 11: "aug" },
  notesNum: 5,
  semitonesList: [4, 7, 11, 18],
  name: "Major 7th Sharp 11",
  description: "大七增十一和弦，在大七和弦基础上增加增十一度音，也称为利底亚和弦",
}

// 增大七和弦（Augmented Major Seventh）
export const AUG7_FORMULA_META: I_ChordFormulaMeta = {
  chordFormulaId: CHORD_FORMULA_ID.augmaj7,
  family: FAMILY,
  cnName: "增大七",
  scoreDisplay: "maj7#5",
  intervalList: [["maj", 3], ["aug", 5], ["maj", 7]],
  tags: ["chord7","maj7","altered","sharp5"],
  degreeToIntervalMap: { 3: "maj", 5: "aug", 7: "maj" },
  notesNum: 4,
  semitonesList: [4, 8, 11],
  name: "Augmented Major Seventh",
  description: "增大七和弦，由增三和弦加大七度音构成。此和弦也称为大七增五和弦(maj7#5)，两者为同一和弦的不同命名",
}
