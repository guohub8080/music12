import SCALE_MODE_ID from "../SCALE_MODE_ID.ts"
import type { I_ScaleModeMeta } from "../types.ts"

// ========== 中国五声调式 ==========
// null 代表该级在五声音阶中不存在（缺失的偏音）

// 宫调式（Gong Mode）— 缺 4、7 级
export const GONG_MODE_META: I_ScaleModeMeta = {
  scaleModeId: SCALE_MODE_ID.Gong,
  intervalList: [["maj", 2], ["maj", 3], null, ["p", 5], ["maj", 6], null],
  intervalMap: { 2: "maj", 3: "maj", 4: null, 5: "p", 6: "maj", 7: null },
  semitonesList: [2, 4, null, 7, 9, null],
  semitonesMap: { 2: 2, 3: 4, 4: null, 5: 7, 6: 9, 7: null },
  degreeAlterationsList: [0, 0, null, 0, 0, null],
  degreeAlterationsMap: { 2: 0, 3: 0, 4: null, 5: 0, 6: 0, 7: null },
  name: "宫调式",
  type: "major",
  family: "pentatonic",
  description: "中国五声调式第 I 级（宫），由 C 宫调式的 C 进行到高八度的 C，构成音分别为：1 2 3 5 6 1",
}

// 商调式（Shang Mode）— 缺 3、6 级
export const SHANG_MODE_META: I_ScaleModeMeta = {
  scaleModeId: SCALE_MODE_ID.Shang,
  intervalList: [["maj", 2], null, ["p", 4], ["p", 5], null, ["min", 7]],
  intervalMap: { 2: "maj", 3: null, 4: "p", 5: "p", 6: null, 7: "min" },
  semitonesList: [2, null, 5, 7, null, 10],
  semitonesMap: { 2: 2, 3: null, 4: 5, 5: 7, 6: null, 7: 10 },
  degreeAlterationsList: [0, null, 0, 0, null, -1],
  degreeAlterationsMap: { 2: 0, 3: null, 4: 0, 5: 0, 6: null, 7: -1 },
  name: "商调式",
  type: "minor",
  family: "pentatonic",
  description: "中国五声调式第 II 级（商），由 C 宫调式的 D 进行到高八度的 D，构成音分别为：1 2 4 5 b7 1",
}

// 角调式（Jue Mode）— 缺 2、5 级
export const JUE_MODE_META: I_ScaleModeMeta = {
  scaleModeId: SCALE_MODE_ID.Jue,
  intervalList: [null, ["min", 3], ["p", 4], null, ["min", 6], ["min", 7]],
  intervalMap: { 2: null, 3: "min", 4: "p", 5: null, 6: "min", 7: "min" },
  semitonesList: [null, 3, 5, null, 8, 10],
  semitonesMap: { 2: null, 3: 3, 4: 5, 5: null, 6: 8, 7: 10 },
  degreeAlterationsList: [null, -1, 0, null, -1, -1],
  degreeAlterationsMap: { 2: null, 3: -1, 4: 0, 5: null, 6: -1, 7: -1 },
  name: "角调式",
  type: "minor",
  family: "pentatonic",
  description: "中国五声调式第 III 级（角），由 C 宫调式的 E 进行到高八度的 E，构成音分别为：1 b3 4 b6 b7 1",
}

// 徵调式（Zhi Mode）— 缺 3、7 级
export const ZHI_MODE_META: I_ScaleModeMeta = {
  scaleModeId: SCALE_MODE_ID.Zhi,
  intervalList: [["maj", 2], null, ["p", 4], ["p", 5], ["maj", 6], null],
  intervalMap: { 2: "maj", 3: null, 4: "p", 5: "p", 6: "maj", 7: null },
  semitonesList: [2, null, 5, 7, 9, null],
  semitonesMap: { 2: 2, 3: null, 4: 5, 5: 7, 6: 9, 7: null },
  degreeAlterationsList: [0, null, 0, 0, 0, null],
  degreeAlterationsMap: { 2: 0, 3: null, 4: 0, 5: 0, 6: 0, 7: null },
  name: "徵调式",
  type: "major",
  family: "pentatonic",
  description: "中国五声调式第 V 级（徵），由 C 宫调式的 G 进行到高八度的 G，构成音分别为：1 2 4 5 6 1",
}

// 羽调式（Yu Mode）— 缺 2、6 级
export const YU_MODE_META: I_ScaleModeMeta = {
  scaleModeId: SCALE_MODE_ID.Yu,
  intervalList: [null, ["min", 3], ["p", 4], ["p", 5], null, ["min", 7]],
  intervalMap: { 2: null, 3: "min", 4: "p", 5: "p", 6: null, 7: "min" },
  semitonesList: [null, 3, 5, 7, null, 10],
  semitonesMap: { 2: null, 3: 3, 4: 5, 5: 7, 6: null, 7: 10 },
  degreeAlterationsList: [null, -1, 0, 0, null, -1],
  degreeAlterationsMap: { 2: null, 3: -1, 4: 0, 5: 0, 6: null, 7: -1 },
  name: "羽调式",
  type: "minor",
  family: "pentatonic",
  description: "中国五声调式第 VI 级（羽），由 C 宫调式的 A 进行到高八度的 A，构成音分别为：1 b3 4 5 b7 1",
}
