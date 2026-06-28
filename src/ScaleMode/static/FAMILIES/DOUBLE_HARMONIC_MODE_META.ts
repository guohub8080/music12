import SCALE_MODE_ID from "../SCALE_MODE_ID"
import type { I_ScaleModeMeta } from "../types"

// ========== 双重和声大调族（Double Harmonic Major） ==========

// Double Harmonic Major（拜占庭音阶）
export const DOUBLE_HARMONIC_MAJOR_MODE_META: I_ScaleModeMeta = {
  scaleModeId: SCALE_MODE_ID.DoubleHarmonicMajor,
  intervalList: [["min", 2], ["maj", 3], ["p", 4], ["p", 5], ["min", 6], ["maj", 7]],
  intervalMap: { 2: "min", 3: "maj", 4: "p", 5: "p", 6: "min", 7: "maj" },
  semitonesList: [1, 4, 5, 7, 8, 11],
  semitonesMap: { 2: 1, 3: 4, 4: 5, 5: 7, 6: 8, 7: 11 },
  degreeAlterationsList: [-1, 0, 0, 0, -1, 0],
  degreeAlterationsMap: { 2: -1, 3: 0, 4: 0, 5: 0, 6: -1, 7: 0 },
  name: "Double Harmonic Major",
  type: "major",
  family: "double-harmonic",
  description: "双重和声大调的 I 级音阶，又称拜占庭音阶，含两个增二度音程（b2→3，b6→7），构成音分别为：1 b2 3 4 5 b6 7 1",
}

// Hungarian Minor（匈牙利小调，双重和声大调 IV 级）
export const HUNGARIAN_MINOR_MODE_META: I_ScaleModeMeta = {
  scaleModeId: SCALE_MODE_ID.HungarianMinor,
  intervalList: [["maj", 2], ["min", 3], ["aug", 4], ["p", 5], ["min", 6], ["maj", 7]],
  intervalMap: { 2: "maj", 3: "min", 4: "aug", 5: "p", 6: "min", 7: "maj" },
  semitonesList: [2, 3, 6, 7, 8, 11],
  semitonesMap: { 2: 2, 3: 3, 4: 6, 5: 7, 6: 8, 7: 11 },
  degreeAlterationsList: [0, -1, 1, 0, -1, 0],
  degreeAlterationsMap: { 2: 0, 3: -1, 4: 1, 5: 0, 6: -1, 7: 0 },
  name: "Hungarian Minor",
  type: "minor",
  family: "double-harmonic",
  description: "双重和声大调的 IV 级音阶，又称匈牙利小调或吉普赛小调，构成音分别为：1 2 b3 #4 5 b6 7 1",
}

// Oriental（东方调式，双重和声大调 V 级）
export const ORIENTAL_MODE_META: I_ScaleModeMeta = {
  scaleModeId: SCALE_MODE_ID.Oriental,
  intervalList: [["min", 2], ["maj", 3], ["p", 4], ["dim", 5], ["maj", 6], ["min", 7]],
  intervalMap: { 2: "min", 3: "maj", 4: "p", 5: "dim", 6: "maj", 7: "min" },
  semitonesList: [1, 4, 5, 6, 9, 10],
  semitonesMap: { 2: 1, 3: 4, 4: 5, 5: 6, 6: 9, 7: 10 },
  degreeAlterationsList: [-1, 0, 0, -1, 0, -1],
  degreeAlterationsMap: { 2: -1, 3: 0, 4: 0, 5: -1, 6: 0, 7: -1 },
  name: "Oriental",
  type: "major",
  family: "double-harmonic",
  description: "双重和声大调的 V 级音阶，又称东方调式，构成音分别为：1 b2 3 4 b5 6 b7 1",
}

// Ionian #2 #5（双重和声大调 VI 级）
export const IONIAN_SHARP2_SHARP5_MODE_META: I_ScaleModeMeta = {
  scaleModeId: SCALE_MODE_ID.IonianSharp2Sharp5,
  intervalList: [["aug", 2], ["maj", 3], ["p", 4], ["aug", 5], ["maj", 6], ["maj", 7]],
  intervalMap: { 2: "aug", 3: "maj", 4: "p", 5: "aug", 6: "maj", 7: "maj" },
  semitonesList: [3, 4, 5, 8, 9, 11],
  semitonesMap: { 2: 3, 3: 4, 4: 5, 5: 8, 6: 9, 7: 11 },
  degreeAlterationsList: [1, 0, 0, 1, 0, 0],
  degreeAlterationsMap: { 2: 1, 3: 0, 4: 0, 5: 1, 6: 0, 7: 0 },
  name: "Ionian #2 #5",
  type: "major",
  family: "double-harmonic",
  description: "双重和声大调的 VI 级音阶，构成音分别为：1 #2 3 4 #5 6 7 1",
}
