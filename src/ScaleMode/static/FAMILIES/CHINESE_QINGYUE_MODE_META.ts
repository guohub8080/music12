import SCALE_MODE_ID from "../SCALE_MODE_ID.ts"
import type { I_ScaleModeMeta } from "../types.ts"

// ========== 清乐七声调式（Qingyue family） ==========
// 清乐音阶又称下徵音阶、新音阶，是在五声调式基础上加入"清角（4）"和"变宫（7）"两个偏音而成
// 特征偏音：清角 (4) + 变宫 (7)
// 结构等同于自然大调的旋转，但强调五声骨架

// 清乐宫调式（以宫为主音）：1 2 3 4 5 6 7 1
// 对应西方的 Ionian (Natural Major)
export const QING_YUE_GONG_MODE_META: I_ScaleModeMeta = {
  scaleModeId: SCALE_MODE_ID.QingYueGong,
  intervalList: [["maj", 2], ["maj", 3], ["p", 4], ["p", 5], ["maj", 6], ["maj", 7]],
  intervalMap: { 2: "maj", 3: "maj", 4: "p", 5: "p", 6: "maj", 7: "maj" },
  semitonesList: [2, 4, 5, 7, 9, 11],
  semitonesMap: { 2: 2, 3: 4, 4: 5, 5: 7, 6: 9, 7: 11 },
  degreeAlterationsList: [0, 0, 0, 0, 0, 0],
  degreeAlterationsMap: { 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0 },
  name: "清乐宫调式",
  type: "major",
  family: "qingyue",
  description: "清乐音阶的宫调式（宫为主音），以 C 为宫：1 2 3 4 5 6 7 1",
}

// 清乐商调式（以商为主音）：1 2 b3 4 5 6 b7 1
// 对应西方的 Dorian
export const QING_YUE_SHANG_MODE_META: I_ScaleModeMeta = {
  scaleModeId: SCALE_MODE_ID.QingYueShang,
  intervalList: [["maj", 2], ["min", 3], ["p", 4], ["p", 5], ["maj", 6], ["min", 7]],
  intervalMap: { 2: "maj", 3: "min", 4: "p", 5: "p", 6: "maj", 7: "min" },
  semitonesList: [2, 3, 5, 7, 9, 10],
  semitonesMap: { 2: 2, 3: 3, 4: 5, 5: 7, 6: 9, 7: 10 },
  degreeAlterationsList: [0, -1, 0, 0, 0, -1],
  degreeAlterationsMap: { 2: 0, 3: -1, 4: 0, 5: 0, 6: 0, 7: -1 },
  name: "清乐商调式",
  type: "minor",
  family: "qingyue",
  description: "清乐音阶的商调式（商为主音），以 C 清乐宫调式的 D 为主音：1 2 b3 4 5 6 b7 1",
}

// 清乐角调式（以角为主音）：1 b2 b3 4 5 b6 b7 1
// 对应西方的 Phrygian
export const QING_YUE_JUE_MODE_META: I_ScaleModeMeta = {
  scaleModeId: SCALE_MODE_ID.QingYueJue,
  intervalList: [["min", 2], ["min", 3], ["p", 4], ["p", 5], ["min", 6], ["min", 7]],
  intervalMap: { 2: "min", 3: "min", 4: "p", 5: "p", 6: "min", 7: "min" },
  semitonesList: [1, 3, 5, 7, 8, 10],
  semitonesMap: { 2: 1, 3: 3, 4: 5, 5: 7, 6: 8, 7: 10 },
  degreeAlterationsList: [-1, -1, 0, 0, -1, -1],
  degreeAlterationsMap: { 2: -1, 3: -1, 4: 0, 5: 0, 6: -1, 7: -1 },
  name: "清乐角调式",
  type: "minor",
  family: "qingyue",
  description: "清乐音阶的角调式（角为主音），以 C 清乐宫调式的 E 为主音：1 b2 b3 4 5 b6 b7 1",
}

// 清乐徵调式（以徵为主音）：1 2 3 4 5 6 b7 1
// 对应西方的 Mixolydian
export const QING_YUE_ZHI_MODE_META: I_ScaleModeMeta = {
  scaleModeId: SCALE_MODE_ID.QingYueZhi,
  intervalList: [["maj", 2], ["maj", 3], ["p", 4], ["p", 5], ["maj", 6], ["min", 7]],
  intervalMap: { 2: "maj", 3: "maj", 4: "p", 5: "p", 6: "maj", 7: "min" },
  semitonesList: [2, 4, 5, 7, 9, 10],
  semitonesMap: { 2: 2, 3: 4, 4: 5, 5: 7, 6: 9, 7: 10 },
  degreeAlterationsList: [0, 0, 0, 0, 0, -1],
  degreeAlterationsMap: { 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: -1 },
  name: "清乐徵调式",
  type: "major",
  family: "qingyue",
  description: "清乐音阶的徵调式（徵为主音），以 C 清乐宫调式的 G 为主音：1 2 3 4 5 6 b7 1",
}

// 清乐羽调式（以羽为主音）：1 2 b3 4 5 b6 b7 1
// 对应西方的 Aeolian (Natural Minor)
export const QING_YUE_YU_MODE_META: I_ScaleModeMeta = {
  scaleModeId: SCALE_MODE_ID.QingYueYu,
  intervalList: [["maj", 2], ["min", 3], ["p", 4], ["p", 5], ["min", 6], ["min", 7]],
  intervalMap: { 2: "maj", 3: "min", 4: "p", 5: "p", 6: "min", 7: "min" },
  semitonesList: [2, 3, 5, 7, 8, 10],
  semitonesMap: { 2: 2, 3: 3, 4: 5, 5: 7, 6: 8, 7: 10 },
  degreeAlterationsList: [0, -1, 0, 0, -1, -1],
  degreeAlterationsMap: { 2: 0, 3: -1, 4: 0, 5: 0, 6: -1, 7: -1 },
  name: "清乐羽调式",
  type: "minor",
  family: "qingyue",
  description: "清乐音阶的羽调式（羽为主音），以 C 清乐宫调式的 A 为主音：1 2 b3 4 5 b6 b7 1",
}
