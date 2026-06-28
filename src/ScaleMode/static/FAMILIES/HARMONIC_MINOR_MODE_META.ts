import SCALE_MODE_ID from "../SCALE_MODE_ID"
import type { I_ScaleModeMeta } from "../types"

// ========== 和声小调族 ==========

// 和声小调
export const HARMONIC_MINOR_MODE_META: I_ScaleModeMeta = {
  scaleModeId: SCALE_MODE_ID.HarmonicMinor,
  intervalList: [["maj", 2], ["min", 3], ["p", 4], ["p", 5], ["min", 6], ["maj", 7]],
  intervalMap: { 2: "maj", 3: "min", 4: "p", 5: "p", 6: "min", 7: "maj" },
  semitonesList: [2, 3, 5, 7, 8, 11],
  semitonesMap: { 2: 2, 3: 3, 4: 5, 5: 7, 6: 8, 7: 11 },
  degreeAlterationsList: [0, -1, 0, 0, -1, 0],
  degreeAlterationsMap: { 2: 0, 3: -1, 4: 0, 5: 0, 6: -1, 7: 0 },
  name: "和声小调",
  type: "minor",
  family: "harmonic-minor",
  description: "把自然小调的第七级音升高一个半音，构成音分别为：1 2 b3 4 5 b6 7 1",
}

// Locrian #6（和声小调 II 级）
export const LOCRIAN_SHARP6_MODE_META: I_ScaleModeMeta = {
  scaleModeId: SCALE_MODE_ID.LocrianSharp6,
  intervalList: [["min", 2], ["min", 3], ["p", 4], ["dim", 5], ["maj", 6], ["min", 7]],
  intervalMap: { 2: "min", 3: "min", 4: "p", 5: "dim", 6: "maj", 7: "min" },
  semitonesList: [1, 3, 5, 6, 9, 10],
  semitonesMap: { 2: 1, 3: 3, 4: 5, 5: 6, 6: 9, 7: 10 },
  degreeAlterationsList: [-1, -1, 0, -1, 0, -1],
  degreeAlterationsMap: { 2: -1, 3: -1, 4: 0, 5: -1, 6: 0, 7: -1 },
  name: "Locrian #6",
  type: "halfdim7",
  family: "harmonic-minor",
  description: "和声小调的 II 级音阶，构成音分别为：1 b2 b3 4 b5 6 b7 1",
}

// Ionian #5（和声小调 III 级）
export const IONIAN_SHARP5_MODE_META: I_ScaleModeMeta = {
  scaleModeId: SCALE_MODE_ID.IonianSharp5,
  intervalList: [["maj", 2], ["maj", 3], ["p", 4], ["aug", 5], ["maj", 6], ["maj", 7]],
  intervalMap: { 2: "maj", 3: "maj", 4: "p", 5: "aug", 6: "maj", 7: "maj" },
  semitonesList: [2, 4, 5, 8, 9, 11],
  semitonesMap: { 2: 2, 3: 4, 4: 5, 5: 8, 6: 9, 7: 11 },
  degreeAlterationsList: [0, 0, 0, 1, 0, 0],
  degreeAlterationsMap: { 2: 0, 3: 0, 4: 0, 5: 1, 6: 0, 7: 0 },
  name: "Ionian #5",
  type: "major",
  family: "harmonic-minor",
  description: "和声小调的 III 级音阶，构成音分别为：1 2 3 4 #5 6 7 1",
}

// Dorian #4（乌克兰多利亚，和声小调 IV 级）
export const DORIAN_SHARP4_MODE_META: I_ScaleModeMeta = {
  scaleModeId: SCALE_MODE_ID.DorianSharp4,
  intervalList: [["maj", 2], ["min", 3], ["aug", 4], ["p", 5], ["maj", 6], ["min", 7]],
  intervalMap: { 2: "maj", 3: "min", 4: "aug", 5: "p", 6: "maj", 7: "min" },
  semitonesList: [2, 3, 6, 7, 9, 10],
  semitonesMap: { 2: 2, 3: 3, 4: 6, 5: 7, 6: 9, 7: 10 },
  degreeAlterationsList: [0, -1, 1, 0, 0, -1],
  degreeAlterationsMap: { 2: 0, 3: -1, 4: 1, 5: 0, 6: 0, 7: -1 },
  name: "Dorian #4",
  type: "minor",
  family: "harmonic-minor",
  description: "和声小调的 IV 级音阶，又称乌克兰多利亚，构成音分别为：1 2 b3 #4 5 6 b7 1",
}

// Phrygian Dominant（弗里几亚属调式，和声小调 V 级）
export const PHRYGIAN_DOMINANT_MODE_META: I_ScaleModeMeta = {
  scaleModeId: SCALE_MODE_ID.PhrygianDominant,
  intervalList: [["min", 2], ["maj", 3], ["p", 4], ["p", 5], ["min", 6], ["min", 7]],
  intervalMap: { 2: "min", 3: "maj", 4: "p", 5: "p", 6: "min", 7: "min" },
  semitonesList: [1, 4, 5, 7, 8, 10],
  semitonesMap: { 2: 1, 3: 4, 4: 5, 5: 7, 6: 8, 7: 10 },
  degreeAlterationsList: [-1, 0, 0, 0, -1, -1],
  degreeAlterationsMap: { 2: -1, 3: 0, 4: 0, 5: 0, 6: -1, 7: -1 },
  name: "Phrygian Dominant",
  type: "major",
  family: "harmonic-minor",
  description: "和声小调的 V 级音阶，构成音分别为：1 b2 3 4 5 b6 b7 1，常用于弗拉门戈和中东风格",
}

// Lydian #2（和声小调 VI 级）
export const LYDIAN_SHARP2_MODE_META: I_ScaleModeMeta = {
  scaleModeId: SCALE_MODE_ID.LydianSharp2,
  intervalList: [["aug", 2], ["maj", 3], ["aug", 4], ["p", 5], ["maj", 6], ["maj", 7]],
  intervalMap: { 2: "aug", 3: "maj", 4: "aug", 5: "p", 6: "maj", 7: "maj" },
  semitonesList: [3, 4, 6, 7, 9, 11],
  semitonesMap: { 2: 3, 3: 4, 4: 6, 5: 7, 6: 9, 7: 11 },
  degreeAlterationsList: [1, 0, 1, 0, 0, 0],
  degreeAlterationsMap: { 2: 1, 3: 0, 4: 1, 5: 0, 6: 0, 7: 0 },
  name: "Lydian #2",
  type: "major",
  family: "harmonic-minor",
  description: "和声小调的 VI 级音阶，构成音分别为：1 #2 3 #4 5 6 7 1",
}
