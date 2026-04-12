import SCALE_MODE_ID from "../SCALE_MODE_ID.ts"
import type { I_ScaleModeMeta } from "../types.ts"

// ========== 雅乐七声调式（Yayue family） ==========
// 雅乐音阶是在五声调式基础上加入"变宫、变徵"两个偏音得到的七声调式

// 雅乐宫调式（以宫为主音）：1 2 3 #4 5 6 7 1
export const YA_YUE_GONG_MODE_META: I_ScaleModeMeta = {
  scaleModeId: SCALE_MODE_ID.YaYueGong,
  intervalList: [["maj", 2], ["maj", 3], ["aug", 4], ["p", 5], ["maj", 6], ["maj", 7]],
  intervalMap: { 2: "maj", 3: "maj", 4: "aug", 5: "p", 6: "maj", 7: "maj" },
  semitonesList: [2, 4, 6, 7, 9, 11],
  semitonesMap: { 2: 2, 3: 4, 4: 6, 5: 7, 6: 9, 7: 11 },
  degreeAlterationsList: [0, 0, 1, 0, 0, 0],
  degreeAlterationsMap: { 2: 0, 3: 0, 4: 1, 5: 0, 6: 0, 7: 0 },
  name: "雅乐宫调式",
  type: "major",
  family: "yayue",
  description: "雅乐音阶的宫调式（宫为主音），以 C 为宫：1 2 3 #4 5 6 7 1",
}

// 雅乐商调式（以商为主音）：1 2 3 4 5 6 b7 1
export const YA_YUE_SHANG_MODE_META: I_ScaleModeMeta = {
  scaleModeId: SCALE_MODE_ID.YaYueShang,
  intervalList: [["maj", 2], ["maj", 3], ["p", 4], ["p", 5], ["maj", 6], ["min", 7]],
  intervalMap: { 2: "maj", 3: "maj", 4: "p", 5: "p", 6: "maj", 7: "min" },
  semitonesList: [2, 4, 5, 7, 9, 10],
  semitonesMap: { 2: 2, 3: 4, 4: 5, 5: 7, 6: 9, 7: 10 },
  degreeAlterationsList: [0, 0, 0, 0, 0, -1],
  degreeAlterationsMap: { 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: -1 },
  name: "雅乐商调式",
  type: "major",
  family: "yayue",
  description: "雅乐音阶的商调式（商为主音），以 C 雅乐宫调式的 D 为主音：1 2 3 4 5 6 b7 1",
}

// 雅乐角调式（以角为主音）：1 2 b3 4 5 b6 b7 1
export const YA_YUE_JUE_MODE_META: I_ScaleModeMeta = {
  scaleModeId: SCALE_MODE_ID.YaYueJue,
  intervalList: [["maj", 2], ["min", 3], ["p", 4], ["p", 5], ["min", 6], ["min", 7]],
  intervalMap: { 2: "maj", 3: "min", 4: "p", 5: "p", 6: "min", 7: "min" },
  semitonesList: [2, 3, 5, 7, 8, 10],
  semitonesMap: { 2: 2, 3: 3, 4: 5, 5: 7, 6: 8, 7: 10 },
  degreeAlterationsList: [0, -1, 0, 0, -1, -1],
  degreeAlterationsMap: { 2: 0, 3: -1, 4: 0, 5: 0, 6: -1, 7: -1 },
  name: "雅乐角调式",
  type: "minor",
  family: "yayue",
  description: "雅乐音阶的角调式（角为主音），以 C 雅乐宫调式的 E 为主音：1 2 b3 4 5 b6 b7 1",
}

// 雅乐徵调式（以徵为主音）：1 2 3 4 5 6 7 1
export const YA_YUE_ZHI_MODE_META: I_ScaleModeMeta = {
  scaleModeId: SCALE_MODE_ID.YaYueZhi,
  intervalList: [["maj", 2], ["maj", 3], ["p", 4], ["p", 5], ["maj", 6], ["maj", 7]],
  intervalMap: { 2: "maj", 3: "maj", 4: "p", 5: "p", 6: "maj", 7: "maj" },
  semitonesList: [2, 4, 5, 7, 9, 11],
  semitonesMap: { 2: 2, 3: 4, 4: 5, 5: 7, 6: 9, 7: 11 },
  degreeAlterationsList: [0, 0, 0, 0, 0, 0],
  degreeAlterationsMap: { 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0 },
  name: "雅乐徵调式",
  type: "major",
  family: "yayue",
  description: "雅乐音阶的徵调式（徵为主音），以 C 雅乐宫调式的 G 为主音：1 2 3 4 5 6 7 1",
}

// 雅乐羽调式（以羽为主音）：1 2 b3 4 5 6 b7 1
export const YA_YUE_YU_MODE_META: I_ScaleModeMeta = {
  scaleModeId: SCALE_MODE_ID.YaYueYu,
  intervalList: [["maj", 2], ["min", 3], ["p", 4], ["p", 5], ["maj", 6], ["min", 7]],
  intervalMap: { 2: "maj", 3: "min", 4: "p", 5: "p", 6: "maj", 7: "min" },
  semitonesList: [2, 3, 5, 7, 9, 10],
  semitonesMap: { 2: 2, 3: 3, 4: 5, 5: 7, 6: 9, 7: 10 },
  degreeAlterationsList: [0, -1, 0, 0, 0, -1],
  degreeAlterationsMap: { 2: 0, 3: -1, 4: 0, 5: 0, 6: 0, 7: -1 },
  name: "雅乐羽调式",
  type: "minor",
  family: "yayue",
  description: "雅乐音阶的羽调式（羽为主音），以 C 雅乐宫调式的 A 为主音：1 2 b3 4 5 6 b7 1",
}
