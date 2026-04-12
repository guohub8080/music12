import CHORD_FORMULA_ID from "../CHORD_FORMULA_ID.ts"
import type { I_ChordFormulaMeta } from "../types.ts"

import { T_IntervalType } from "../../../common/static/INTERVAL_TYPES.ts"

const FAMILY = "chord3"

// ========== 三和弦（Triads） ==========

// 大三和弦（Major Triad）
export const MAJ3_FORMULA_META: I_ChordFormulaMeta = {
  chordFormulaId: CHORD_FORMULA_ID.maj3,
  family: FAMILY,
  cnName: "大三",
  scoreDisplay: "",
  intervalList: [["maj", 3], ["p", 5]],
  degreeToIntervalMap: { 3: "maj", 5: "p" },
  notesNum: 3,
  semitonesList: [4, 7],
  name: "Major",
  description: "大三和弦，根音、大三度、纯五度构成,是最基本的和弦之一",
}

// 小三和弦（Minor Triad）
export const MIN3_FORMULA_META: I_ChordFormulaMeta = {
  chordFormulaId: CHORD_FORMULA_ID.min3,
  family: FAMILY,
  cnName: "小三",
  scoreDisplay: "m",
  intervalList: [["min", 3], ["p", 5]],
  degreeToIntervalMap: { 3: "min", 5: "p" },
  notesNum: 3,
  semitonesList: [3, 7],
  name: "Minor",
  description: "小三和弦,根音、小三度、纯五度构成",
}

// 减三和弦（Diminished Triad）
export const DIM3_FORMULA_META: I_ChordFormulaMeta = {
  chordFormulaId: CHORD_FORMULA_ID.dim3,
  family: FAMILY,
  cnName: "减三",
  scoreDisplay: "°",
  intervalList: [["min", 3], ["dim", 5]],
  degreeToIntervalMap: { 3: "min", 5: "dim" },
  notesNum: 3,
  semitonesList: [3, 6],
  name: "Diminished",
  description: "减三和弦,根音、小三度、减五度构成",
}

// 增三和弦（Augmented Triad）
export const AUG3_FORMULA_META: I_ChordFormulaMeta = {
  chordFormulaId: CHORD_FORMULA_ID.aug3,
  family: FAMILY,
  cnName: "增三",
  scoreDisplay: "+",
  intervalList: [["maj", 3], ["aug", 5]],
  degreeToIntervalMap: { 3: "maj", 5: "aug" },
  notesNum: 3,
  semitonesList: [4, 8],
  name: "Augmented",
  description: "增三和弦,根音、大三度、增五度构成",
}

// 大三减五和弦（Major Flat Five）
export const MAJ3_FLAT5_FORMULA_META: I_ChordFormulaMeta = {
  chordFormulaId: CHORD_FORMULA_ID.maj3b5,
  family: FAMILY,
  cnName: "大三减五",
  scoreDisplay: "b5",
  intervalList: [["maj", 3], ["dim", 5]],
  degreeToIntervalMap: { 3: "maj", 5: "dim" },
  notesNum: 3,
  semitonesList: [4, 6],
  name: "Major Flat Five",
  description: "大三减五和弦,根音、大三度、减五度构成",
}
