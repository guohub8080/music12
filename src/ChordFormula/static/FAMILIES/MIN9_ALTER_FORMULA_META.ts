import CHORD_FORMULA_ID from "../CHORD_FORMULA_ID"
import type { I_ChordFormulaMeta } from "../types"

const FAMILY = "min9alter"

// ========== 小九变音（Minor 9th Alterations） ==========

// 小九减五和弦（Minor 9th Flat 5）
export const MIN9_FLAT5_FORMULA_META: I_ChordFormulaMeta = {
  chordFormulaId: CHORD_FORMULA_ID["min9b5"],
  family: FAMILY,
  cnName: "小九减五",
  scoreDisplay: "m9b5",
  intervalList: [["min", 3], ["dim", 5], ["min", 7], ["maj", 9]],
  tags: ["chord9","halfdim","altered","flat5"],
  degreeToIntervalMap: { 3: "min", 5: "dim", 7: "min", 9: "maj" },
  notesNum: 5,
  semitonesList: [3, 6, 10, 14],
  name: "Minor 9th Flat 5",
  description: "小九减五和弦，在小九和弦基础上将五度音降低半音",
}
