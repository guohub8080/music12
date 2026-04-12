import CHORD_FORMULA_ID from "../CHORD_FORMULA_ID.ts"
import type { I_ChordFormulaMeta } from "../types.ts"

const FAMILY = "min11alter"

// ========== 小十一变音（Minor 11th Alterations） ==========

// 小十一减五和弦（Minor 11th Flat 5）
export const MIN11_FLAT5_FORMULA_META: I_ChordFormulaMeta = {
  chordFormulaId: CHORD_FORMULA_ID["min11b5"],
  family: FAMILY,
  cnName: "小十一减五",
  scoreDisplay: "m11b5",
  intervalList: [["min", 3], ["dim", 5], ["min", 7], ["maj", 9], ["p", 11]],
  degreeToIntervalMap: { 3: "min", 5: "dim", 7: "min", 9: "maj", 11: "p" },
  notesNum: 6,
  semitonesList: [3, 6, 10, 14, 17],
  name: "Minor 11th Flat 5",
  description: "小十一减五和弦，在小十一和弦基础上将五度音降低半音",
}
