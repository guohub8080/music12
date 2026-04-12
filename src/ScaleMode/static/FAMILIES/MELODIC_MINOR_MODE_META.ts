import SCALE_MODE_ID from "../SCALE_MODE_ID.ts"
import type { I_ScaleModeMeta } from "../types.ts"

// ========== 旋律小调族 ==========

// 旋律小调（爵士小调）
export const MELODIC_MINOR_ASCENDING_MODE_META: I_ScaleModeMeta = {
  scaleModeId: SCALE_MODE_ID.MelodicMinorAscending,
  intervalList: [["maj", 2], ["min", 3], ["p", 4], ["p", 5], ["maj", 6], ["maj", 7]],
  intervalMap: { 2: "maj", 3: "min", 4: "p", 5: "p", 6: "maj", 7: "maj" },
  semitonesList: [2, 3, 5, 7, 9, 11],
  semitonesMap: { 2: 2, 3: 3, 4: 5, 5: 7, 6: 9, 7: 11 },
  degreeAlterationsList: [0, -1, 0, 0, 0, 0],
  degreeAlterationsMap: { 2: 0, 3: -1, 4: 0, 5: 0, 6: 0, 7: 0 },
  name: "旋律小调（上行）",
  type: "minor",
  family: "melodic-minor",
  description: "把自然小调的第六、七级音升高一个半音，构成音分别为：1 2 b3 4 5 6 7 1",
}

// Dorian b2（旋律小调 II 级）
export const DORIAN_FLAT2_MODE_META: I_ScaleModeMeta = {
  scaleModeId: SCALE_MODE_ID.DorianFlat2,
  intervalList: [["min", 2], ["min", 3], ["p", 4], ["p", 5], ["maj", 6], ["min", 7]],
  intervalMap: { 2: "min", 3: "min", 4: "p", 5: "p", 6: "maj", 7: "min" },
  semitonesList: [1, 3, 5, 7, 9, 10],
  semitonesMap: { 2: 1, 3: 3, 4: 5, 5: 7, 6: 9, 7: 10 },
  degreeAlterationsList: [-1, -1, 0, 0, 0, -1],
  degreeAlterationsMap: { 2: -1, 3: -1, 4: 0, 5: 0, 6: 0, 7: -1 },
  name: "Dorian b2",
  type: "minor",
  family: "melodic-minor",
  description: "旋律小调的 II 级音阶，构成音分别为：1 b2 b3 4 5 6 b7 1",
}

// Lydian Augmented（旋律小调 III 级）
export const LYDIAN_AUGMENTED_MODE_META: I_ScaleModeMeta = {
  scaleModeId: SCALE_MODE_ID.LydianAugmented,
  intervalList: [["maj", 2], ["maj", 3], ["aug", 4], ["aug", 5], ["maj", 6], ["maj", 7]],
  intervalMap: { 2: "maj", 3: "maj", 4: "aug", 5: "aug", 6: "maj", 7: "maj" },
  semitonesList: [2, 4, 6, 8, 9, 11],
  semitonesMap: { 2: 2, 3: 4, 4: 6, 5: 8, 6: 9, 7: 11 },
  degreeAlterationsList: [0, 0, 1, 1, 0, 0],
  degreeAlterationsMap: { 2: 0, 3: 0, 4: 1, 5: 1, 6: 0, 7: 0 },
  name: "Lydian Augmented",
  type: "major",
  family: "melodic-minor",
  description: "旋律小调的 III 级音阶，构成音分别为：1 2 3 #4 #5 6 7 1",
}

// Lydian Dominant（利底亚属调式，旋律小调 IV 级）
export const LYDIAN_DOMINANT_MODE_META: I_ScaleModeMeta = {
  scaleModeId: SCALE_MODE_ID.LydianDominant,
  intervalList: [["maj", 2], ["maj", 3], ["aug", 4], ["p", 5], ["maj", 6], ["min", 7]],
  intervalMap: { 2: "maj", 3: "maj", 4: "aug", 5: "p", 6: "maj", 7: "min" },
  semitonesList: [2, 4, 6, 7, 9, 10],
  semitonesMap: { 2: 2, 3: 4, 4: 6, 5: 7, 6: 9, 7: 10 },
  degreeAlterationsList: [0, 0, 1, 0, 0, -1],
  degreeAlterationsMap: { 2: 0, 3: 0, 4: 1, 5: 0, 6: 0, 7: -1 },
  name: "Lydian Dominant",
  type: "major",
  family: "melodic-minor",
  description: "旋律小调的 IV 级音阶，构成音分别为：1 2 3 #4 5 6 b7 1，爵士乐中常见的属和弦代换调式",
}

// Locrian #2（旋律小调 VI 级）
export const LOCRIAN_SHARP2_MODE_META: I_ScaleModeMeta = {
  scaleModeId: SCALE_MODE_ID.LocrianSharp2,
  intervalList: [["maj", 2], ["min", 3], ["p", 4], ["dim", 5], ["min", 6], ["min", 7]],
  intervalMap: { 2: "maj", 3: "min", 4: "p", 5: "dim", 6: "min", 7: "min" },
  semitonesList: [2, 3, 5, 6, 8, 10],
  semitonesMap: { 2: 2, 3: 3, 4: 5, 5: 6, 6: 8, 7: 10 },
  degreeAlterationsList: [0, -1, 0, -1, -1, -1],
  degreeAlterationsMap: { 2: 0, 3: -1, 4: 0, 5: -1, 6: -1, 7: -1 },
  name: "Locrian #2",
  type: "halfdim7",
  family: "melodic-minor",
  description: "旋律小调的 VI 级音阶，构成音分别为：1 2 b3 4 b5 b6 b7 1，半减七和弦常用替代调式",
}
