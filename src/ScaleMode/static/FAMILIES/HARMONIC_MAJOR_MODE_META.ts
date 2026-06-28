import SCALE_MODE_ID from "../SCALE_MODE_ID"
import type { I_ScaleModeMeta } from "../types"

// ========== 和声大调族 ==========

// 和声大调
export const HARMONIC_MAJOR_MODE_META: I_ScaleModeMeta = {
  scaleModeId: SCALE_MODE_ID.HarmonicMajor,
  intervalList: [["maj", 2], ["maj", 3], ["p", 4], ["p", 5], ["min", 6], ["maj", 7]],
  intervalMap: { 2: "maj", 3: "maj", 4: "p", 5: "p", 6: "min", 7: "maj" },
  semitonesList: [2, 4, 5, 7, 8, 11],
  semitonesMap: { 2: 2, 3: 4, 4: 5, 5: 7, 6: 8, 7: 11 },
  degreeAlterationsList: [0, 0, 0, 0, -1, 0],
  degreeAlterationsMap: { 2: 0, 3: 0, 4: 0, 5: 0, 6: -1, 7: 0 },
  name: "和声大调",
  type: "major",
  family: "harmonic-major",
  description: "把自然大调的第六级音降低一个半音，构成音分别为：1 2 3 4 5 b6 7 1",
}
