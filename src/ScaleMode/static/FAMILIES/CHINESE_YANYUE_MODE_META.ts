import SCALE_MODE_ID from "../SCALE_MODE_ID"
import type { I_ScaleModeMeta } from "../types"

// ========== 燕乐七声调式（Yanyue family） ==========
// 燕乐音阶 = 五声宫调式 + 清角(4) + 闰(b7) = 1 2 3 4 5 6 b7
// 特征偏音：清角 (4) + 闰 (b7)

// 燕乐宫调式（以宫为主音）：1 2 3 4 5 6 b7 1
// 对应西方的 Mixolydian
export const YAN_YUE_GONG_MODE_META: I_ScaleModeMeta = {
  scaleModeId: SCALE_MODE_ID.YanYueGong,
  intervalList: [["maj", 2], ["maj", 3], ["p", 4], ["p", 5], ["maj", 6], ["min", 7]],
  intervalMap: { 2: "maj", 3: "maj", 4: "p", 5: "p", 6: "maj", 7: "min" },
  semitonesList: [2, 4, 5, 7, 9, 10],
  semitonesMap: { 2: 2, 3: 4, 4: 5, 5: 7, 6: 9, 7: 10 },
  degreeAlterationsList: [0, 0, 0, 0, 0, -1],
  degreeAlterationsMap: { 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: -1 },
  name: "燕乐宫调式",
  type: "major",
  family: "yanyue",
  description: "燕乐音阶的宫调式（宫为主音），以 C 为宫：1 2 3 4 5 6 b7 1",
}

// 燕乐商调式（以商为主音）：1 2 b3 4 5 b6 b7 1
// 对应西方的 Aeolian (Natural Minor)
export const YAN_YUE_SHANG_MODE_META: I_ScaleModeMeta = {
  scaleModeId: SCALE_MODE_ID.YanYueShang,
  intervalList: [["maj", 2], ["min", 3], ["p", 4], ["p", 5], ["min", 6], ["min", 7]],
  intervalMap: { 2: "maj", 3: "min", 4: "p", 5: "p", 6: "min", 7: "min" },
  semitonesList: [2, 3, 5, 7, 8, 10],
  semitonesMap: { 2: 2, 3: 3, 4: 5, 5: 7, 6: 8, 7: 10 },
  degreeAlterationsList: [0, -1, 0, 0, -1, -1],
  degreeAlterationsMap: { 2: 0, 3: -1, 4: 0, 5: 0, 6: -1, 7: -1 },
  name: "燕乐商调式",
  type: "minor",
  family: "yanyue",
  description: "燕乐音阶的商调式（商为主音），以 C 燕乐宫调式的 D 为主音：1 2 b3 4 5 b6 b7 1",
}

// 燕乐角调式（以角为主音）：1 b2 b3 4 b5 b6 b7 1
// 对应西方的 Locrian
export const YAN_YUE_JUE_MODE_META: I_ScaleModeMeta = {
  scaleModeId: SCALE_MODE_ID.YanYueJue,
  intervalList: [["min", 2], ["min", 3], ["p", 4], ["dim", 5], ["min", 6], ["min", 7]],
  intervalMap: { 2: "min", 3: "min", 4: "p", 5: "dim", 6: "min", 7: "min" },
  semitonesList: [1, 3, 5, 6, 8, 10],
  semitonesMap: { 2: 1, 3: 3, 4: 5, 5: 6, 6: 8, 7: 10 },
  degreeAlterationsList: [-1, -1, 0, -1, -1, -1],
  degreeAlterationsMap: { 2: -1, 3: -1, 4: 0, 5: -1, 6: -1, 7: -1 },
  name: "燕乐角调式",
  type: "halfdim7",
  family: "yanyue",
  description: "燕乐音阶的角调式（角为主音），以 C 燕乐宫调式的 E 为主音：1 b2 b3 4 b5 b6 b7 1",
}

// 燕乐徵调式（以徵为主音）：1 2 b3 4 5 6 b7 1
// 对应西方的 Dorian
export const YAN_YUE_ZHI_MODE_META: I_ScaleModeMeta = {
  scaleModeId: SCALE_MODE_ID.YanYueZhi,
  intervalList: [["maj", 2], ["min", 3], ["p", 4], ["p", 5], ["maj", 6], ["min", 7]],
  intervalMap: { 2: "maj", 3: "min", 4: "p", 5: "p", 6: "maj", 7: "min" },
  semitonesList: [2, 3, 5, 7, 9, 10],
  semitonesMap: { 2: 2, 3: 3, 4: 5, 5: 7, 6: 9, 7: 10 },
  degreeAlterationsList: [0, -1, 0, 0, 0, -1],
  degreeAlterationsMap: { 2: 0, 3: -1, 4: 0, 5: 0, 6: 0, 7: -1 },
  name: "燕乐徵调式",
  type: "minor",
  family: "yanyue",
  description: "燕乐音阶的徵调式（徵为主音），以 C 燕乐宫调式的 G 为主音：1 2 b3 4 5 6 b7 1",
}

// 燕乐羽调式（以羽为主音）：1 b2 b3 4 5 b6 b7 1
// 对应西方的 Phrygian
export const YAN_YUE_YU_MODE_META: I_ScaleModeMeta = {
  scaleModeId: SCALE_MODE_ID.YanYueYu,
  intervalList: [["min", 2], ["min", 3], ["p", 4], ["p", 5], ["min", 6], ["min", 7]],
  intervalMap: { 2: "min", 3: "min", 4: "p", 5: "p", 6: "min", 7: "min" },
  semitonesList: [1, 3, 5, 7, 8, 10],
  semitonesMap: { 2: 1, 3: 3, 4: 5, 5: 7, 6: 8, 7: 10 },
  degreeAlterationsList: [-1, -1, 0, 0, -1, -1],
  degreeAlterationsMap: { 2: -1, 3: -1, 4: 0, 5: 0, 6: -1, 7: -1 },
  name: "燕乐羽调式",
  type: "minor",
  family: "yanyue",
  description: "燕乐音阶的羽调式（羽为主音），以 C 燕乐宫调式的 A 为主音：1 b2 b3 4 5 b6 b7 1",
}
