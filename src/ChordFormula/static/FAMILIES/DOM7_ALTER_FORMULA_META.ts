import CHORD_FORMULA_ID from "../CHORD_FORMULA_ID"
import type { I_ChordFormulaMeta } from "../types"

const FAMILY = "dom7alter"

// ========== 属七变音（Dominant 7th Alterations） ==========

// 属七增五和弦（Dominant 7th Sharp 5）
export const DOM7_SHARP5_FORMULA_META: I_ChordFormulaMeta = {
  chordFormulaId: CHORD_FORMULA_ID["dom7#5"],
  family: FAMILY,
  cnName: "属七增五",
  scoreDisplay: "7#5",
  intervalList: [["maj", 3], ["aug", 5], ["min", 7]],
  tags: ["chord7","dom","altered","sharp5"],
  degreeToIntervalMap: { 3: "maj", 5: "aug", 7: "min" },
  notesNum: 4,
  semitonesList: [4, 8, 10],
  name: "Dominant 7th Sharp 5",
  description: "属七增五和弦，在属七和弦基础上将五度音升高半音",
}

// 属七减五和弦（Dominant 7th Flat 5）
export const DOM7_FLAT5_FORMULA_META: I_ChordFormulaMeta = {
  chordFormulaId: CHORD_FORMULA_ID["dom7b5"],
  family: FAMILY,
  cnName: "属七减五",
  scoreDisplay: "7b5",
  intervalList: [["maj", 3], ["dim", 5], ["min", 7]],
  tags: ["chord7","dom","altered","flat5"],
  degreeToIntervalMap: { 3: "maj", 5: "dim", 7: "min" },
  notesNum: 4,
  semitonesList: [4, 6, 10],
  name: "Dominant 7th Flat 5",
  description: "属七减五和弦，在属七和弦基础上将五度音降低半音",
}

// 属七减九和弦（Dominant 7th Flat 9）
export const DOM7_FLAT9_FORMULA_META: I_ChordFormulaMeta = {
  chordFormulaId: CHORD_FORMULA_ID["dom7b9"],
  family: FAMILY,
  cnName: "属七减九",
  scoreDisplay: "7b9",
  intervalList: [["maj", 3], ["p", 5], ["min", 7], ["min", 9]],
  tags: ["chord9","dom","altered","flat9"],
  degreeToIntervalMap: { 3: "maj", 5: "p", 7: "min", 9: "min" },
  notesNum: 5,
  semitonesList: [4, 7, 10, 13],
  name: "Dominant 7th Flat 9",
  description: "属七减九和弦，在属七和弦基础上增加小九度音，常用于爵士乐",
}

// 属七增九和弦（Dominant 7th Sharp 9）
export const DOM7_SHARP9_FORMULA_META: I_ChordFormulaMeta = {
  chordFormulaId: CHORD_FORMULA_ID["dom7#9"],
  family: FAMILY,
  cnName: "属七增九",
  scoreDisplay: "7#9",
  intervalList: [["maj", 3], ["p", 5], ["min", 7], ["aug", 9]],
  tags: ["chord9","dom","altered","sharp9"],
  degreeToIntervalMap: { 3: "maj", 5: "p", 7: "min", 9: "aug" },
  notesNum: 5,
  semitonesList: [4, 7, 10, 15],
  name: "Dominant 7th Sharp 9",
  description: "属七增九和弦，在属七和弦基础上增加增九度音，常用于布鲁斯和摇滚乐",
}

// 属七增十一和弦（Dominant 7th Sharp 11）
export const DOM7_SHARP11_FORMULA_META: I_ChordFormulaMeta = {
  chordFormulaId: CHORD_FORMULA_ID["dom7#11"],
  family: FAMILY,
  cnName: "属七增十一",
  scoreDisplay: "7#11",
  intervalList: [["maj", 3], ["p", 5], ["min", 7], ["aug", 11]],
  tags: ["chord7","dom","altered","sharp11"],
  degreeToIntervalMap: { 3: "maj", 5: "p", 7: "min", 11: "aug" },
  notesNum: 5,
  semitonesList: [4, 7, 10, 18],
  name: "Dominant 7th Sharp 11",
  description: "属七增十一和弦，在属七和弦基础上增加增十一度音",
}

// 属七减十三和弦（Dominant 7th Flat 13）
export const DOM7_FLAT13_FORMULA_META: I_ChordFormulaMeta = {
  chordFormulaId: CHORD_FORMULA_ID["dom7b13"],
  family: FAMILY,
  cnName: "属七减十三",
  scoreDisplay: "7b13",
  intervalList: [["maj", 3], ["p", 5], ["min", 7], ["min", 13]],
  tags: ["chord7","dom","altered","flat13"],
  degreeToIntervalMap: { 3: "maj", 5: "p", 7: "min", 13: "min" },
  notesNum: 5,
  semitonesList: [4, 7, 10, 20],
  name: "Dominant 7th Flat 13",
  description: "属七减十三和弦，在属七和弦基础上增加小十三度音",
}

// 属七减五减九和弦（Dominant 7th Flat 5 Flat 9）
export const DOM7_FLAT5_FLAT9_FORMULA_META: I_ChordFormulaMeta = {
  chordFormulaId: CHORD_FORMULA_ID["dom7b5b9"],
  family: FAMILY,
  cnName: "属七减五减九",
  scoreDisplay: "7b5b9",
  intervalList: [["maj", 3], ["dim", 5], ["min", 7], ["min", 9]],
  tags: ["chord9","dom","altered","flat5","flat9"],
  degreeToIntervalMap: { 3: "maj", 5: "dim", 7: "min", 9: "min" },
  notesNum: 5,
  semitonesList: [4, 6, 10, 13],
  name: "Dominant 7th Flat 5 Flat 9",
  description: "属七减五减九和弦，在属七和弦基础上同时降低五度和九度音",
}

// 属七减五增九和弦（Dominant 7th Flat 5 Sharp 9）
export const DOM7_FLAT5_SHARP9_FORMULA_META: I_ChordFormulaMeta = {
  chordFormulaId: CHORD_FORMULA_ID["dom7b5#9"],
  family: FAMILY,
  cnName: "属七减五增九",
  scoreDisplay: "7b5#9",
  intervalList: [["maj", 3], ["dim", 5], ["min", 7], ["aug", 9]],
  tags: ["chord9","dom","altered","flat5","sharp9"],
  degreeToIntervalMap: { 3: "maj", 5: "dim", 7: "min", 9: "aug" },
  notesNum: 5,
  semitonesList: [4, 6, 10, 15],
  name: "Dominant 7th Flat 5 Sharp 9",
  description: "属七减五增九和弦，在属七和弦基础上同时降低五度音和升高九度音",
}

// 属七增五减九和弦（Dominant 7th Sharp 5 Flat 9）
export const DOM7_SHARP5_FLAT9_FORMULA_META: I_ChordFormulaMeta = {
  chordFormulaId: CHORD_FORMULA_ID["dom7#5b9"],
  family: FAMILY,
  cnName: "属七增五减九",
  scoreDisplay: "7#5b9",
  intervalList: [["maj", 3], ["aug", 5], ["min", 7], ["min", 9]],
  tags: ["chord9","dom","altered","sharp5","flat9"],
  degreeToIntervalMap: { 3: "maj", 5: "aug", 7: "min", 9: "min" },
  notesNum: 5,
  semitonesList: [4, 8, 10, 13],
  name: "Dominant 7th Sharp 5 Flat 9",
  description: "属七增五减九和弦，在属七和弦基础上同时升高五度音和降低九度音",
}

// 属七增五增九和弦（Dominant 7th Sharp 5 Sharp 9）
export const DOM7_SHARP5_SHARP9_FORMULA_META: I_ChordFormulaMeta = {
  chordFormulaId: CHORD_FORMULA_ID["dom7#5#9"],
  family: FAMILY,
  cnName: "属七增五增九",
  scoreDisplay: "7#5#9",
  intervalList: [["maj", 3], ["aug", 5], ["min", 7], ["aug", 9]],
  tags: ["chord9","dom","altered","sharp5","sharp9"],
  degreeToIntervalMap: { 3: "maj", 5: "aug", 7: "min", 9: "aug" },
  notesNum: 5,
  semitonesList: [4, 8, 10, 15],
  name: "Dominant 7th Sharp 5 Sharp 9",
  description: "属七增五增九和弦，在属七和弦基础上同时升高五度和九度音",
}
