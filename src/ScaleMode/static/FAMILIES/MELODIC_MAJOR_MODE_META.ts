import SCALE_MODE_ID from "../SCALE_MODE_ID.ts"
import type { I_ScaleModeMeta } from "../types.ts"

// ========== 旋律大调族 ==========

// 旋律大调
export const MELODIC_MAJOR_DESCENDING_MODE_META: I_ScaleModeMeta = {
  scaleModeId: SCALE_MODE_ID.MelodicMajorDescending,
  intervalList: [["maj", 2], ["maj", 3], ["p", 4], ["p", 5], ["min", 6], ["min", 7]],
  intervalMap: { 2: "maj", 3: "maj", 4: "p", 5: "p", 6: "min", 7: "min" },
  semitonesList: [2, 4, 5, 7, 8, 10],
  semitonesMap: { 2: 2, 3: 4, 4: 5, 5: 7, 6: 8, 7: 10 },
  degreeAlterationsList: [0, 0, 0, 0, -1, -1],
  degreeAlterationsMap: { 2: 0, 3: 0, 4: 0, 5: 0, 6: -1, 7: -1 },
  name: "旋律大调（下行）",
  type: "major",
  family: "melodic-major",
  description: "把自然大调的第六、七级音降低一个半音，构成音分别为：1 2 3 4 5 b6 b7 1",
}
