import SCALE_MODE_ID from "../SCALE_MODE_ID"
import type { I_ScaleModeMeta } from "../types"

// ========== 自然大调族（教会调式） ==========

// 自然大调（Ionian）
export const NATURAL_MAJOR_MODE_META: I_ScaleModeMeta = {
  scaleModeId: SCALE_MODE_ID.NaturalMajor,
  intervalList: [["maj", 2], ["maj", 3], ["p", 4], ["p", 5], ["maj", 6], ["maj", 7]],
  intervalMap: { 2: "maj", 3: "maj", 4: "p", 5: "p", 6: "maj", 7: "maj" },
  semitonesList: [2, 4, 5, 7, 9, 11],
  semitonesMap: { 2: 2, 3: 4, 4: 5, 5: 7, 6: 9, 7: 11 },
  degreeAlterationsList: [0, 0, 0, 0, 0, 0],
  degreeAlterationsMap: { 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0 },
  name: "自然大调",
  type: "major",
  family: "diatonic",
  description: "又称 Ionian 调式，自然大调的 I 级音阶，由 C 大调的 C 进行到高八度的 C，构成音分别为：1 2 3 4 5 6 7 1",
}

// Dorian
export const DORIAN_MODE_META: I_ScaleModeMeta = {
  scaleModeId: SCALE_MODE_ID.Dorian,
  intervalList: [["maj", 2], ["min", 3], ["p", 4], ["p", 5], ["maj", 6], ["min", 7]],
  intervalMap: { 2: "maj", 3: "min", 4: "p", 5: "p", 6: "maj", 7: "min" },
  semitonesList: [2, 3, 5, 7, 9, 10],
  semitonesMap: { 2: 2, 3: 3, 4: 5, 5: 7, 6: 9, 7: 10 },
  degreeAlterationsList: [0, -1, 0, 0, 0, -1],
  degreeAlterationsMap: { 2: 0, 3: -1, 4: 0, 5: 0, 6: 0, 7: -1 },
  name: "Dorian",
  type: "minor",
  family: "diatonic",
  description: "自然大调的 II 级音阶，由 C 大调的 D 进行到高八度的 D，构成音分别为：1 2 b3 4 5 6 b7 1",
}

// Phrygian
export const PHRYGIAN_MODE_META: I_ScaleModeMeta = {
  scaleModeId: SCALE_MODE_ID.Phrygian,
  intervalList: [["min", 2], ["min", 3], ["p", 4], ["p", 5], ["min", 6], ["min", 7]],
  intervalMap: { 2: "min", 3: "min", 4: "p", 5: "p", 6: "min", 7: "min" },
  semitonesList: [1, 3, 5, 7, 8, 10],
  semitonesMap: { 2: 1, 3: 3, 4: 5, 5: 7, 6: 8, 7: 10 },
  degreeAlterationsList: [-1, -1, 0, 0, -1, -1],
  degreeAlterationsMap: { 2: -1, 3: -1, 4: 0, 5: 0, 6: -1, 7: -1 },
  name: "Phrygian",
  type: "minor",
  family: "diatonic",
  description: "自然大调的 III 级音阶，由 C 大调的 E 进行到高八度的 E，构成音分别为：1 b2 b3 4 5 b6 b7 1",
}

// Lydian
export const LYDIAN_MODE_META: I_ScaleModeMeta = {
  scaleModeId: SCALE_MODE_ID.Lydian,
  intervalList: [["maj", 2], ["maj", 3], ["aug", 4], ["p", 5], ["maj", 6], ["maj", 7]],
  intervalMap: { 2: "maj", 3: "maj", 4: "aug", 5: "p", 6: "maj", 7: "maj" },
  semitonesList: [2, 4, 6, 7, 9, 11],
  semitonesMap: { 2: 2, 3: 4, 4: 6, 5: 7, 6: 9, 7: 11 },
  degreeAlterationsList: [0, 0, 1, 0, 0, 0],
  degreeAlterationsMap: { 2: 0, 3: 0, 4: 1, 5: 0, 6: 0, 7: 0 },
  name: "Lydian",
  type: "major",
  family: "diatonic",
  description: "自然大调的 IV 级音阶，由 C 大调的 F 进行到高八度的 F，构成音分别为：1 2 3 #4 5 6 7 1",
}

// Mixolydian
export const MIXOLYDIAN_MODE_META: I_ScaleModeMeta = {
  scaleModeId: SCALE_MODE_ID.Mixolydian,
  intervalList: [["maj", 2], ["maj", 3], ["p", 4], ["p", 5], ["maj", 6], ["min", 7]],
  intervalMap: { 2: "maj", 3: "maj", 4: "p", 5: "p", 6: "maj", 7: "min" },
  semitonesList: [2, 4, 5, 7, 9, 10],
  semitonesMap: { 2: 2, 3: 4, 4: 5, 5: 7, 6: 9, 7: 10 },
  degreeAlterationsList: [0, 0, 0, 0, 0, -1],
  degreeAlterationsMap: { 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: -1 },
  name: "Mixolydian",
  type: "major",
  family: "diatonic",
  description: "自然大调的 V 级音阶，由 C 大调的 G 进行到高八度的 G，构成音分别为：1 2 3 4 5 6 b7 1",
}

// 自然小调（Aeolian）
export const NATURAL_MINOR_MODE_META: I_ScaleModeMeta = {
  scaleModeId: SCALE_MODE_ID.NaturalMinor,
  intervalList: [["maj", 2], ["min", 3], ["p", 4], ["p", 5], ["min", 6], ["min", 7]],
  intervalMap: { 2: "maj", 3: "min", 4: "p", 5: "p", 6: "min", 7: "min" },
  semitonesList: [2, 3, 5, 7, 8, 10],
  semitonesMap: { 2: 2, 3: 3, 4: 5, 5: 7, 6: 8, 7: 10 },
  degreeAlterationsList: [0, -1, 0, 0, -1, -1],
  degreeAlterationsMap: { 2: 0, 3: -1, 4: 0, 5: 0, 6: -1, 7: -1 },
  name: "自然小调",
  type: "minor",
  family: "diatonic",
  description: "又称 Aeolian 调式，自然大调的 VI 级音阶，由 C 大调的 A 进行到高八度的 A，构成音分别为：1 2 b3 4 5 b6 b7 1",
}

// Locrian
export const LOCRIAN_MODE_META: I_ScaleModeMeta = {
  scaleModeId: SCALE_MODE_ID.Locrian,
  intervalList: [["min", 2], ["min", 3], ["p", 4], ["dim", 5], ["min", 6], ["min", 7]],
  intervalMap: { 2: "min", 3: "min", 4: "p", 5: "dim", 6: "min", 7: "min" },
  semitonesList: [1, 3, 5, 6, 8, 10],
  semitonesMap: { 2: 1, 3: 3, 4: 5, 5: 6, 6: 8, 7: 10 },
  degreeAlterationsList: [-1, -1, 0, -1, -1, -1],
  degreeAlterationsMap: { 2: -1, 3: -1, 4: 0, 5: -1, 6: -1, 7: -1 },
  name: "Locrian",
  type: "halfdim7",
  family: "diatonic",
  description: "自然大调的 VII 级音阶，由 C 大调的 B 进行到高八度的 B，构成音分别为：1 b2 b3 4 b5 b6 b7 1",
}
