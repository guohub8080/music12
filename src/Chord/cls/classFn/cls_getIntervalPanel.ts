/**
 * 获取应用变换后的音程面板
 *
 * init.degreeToIntervalMap + transformPanel = intervalPanel
 */

import { toPairs, isNil } from "lodash";
import type { T_IntervalType } from "../../../common/static/INTERVAL_TYPES.ts";
import type {
  I_ChordIntervalPanel,
  I_TransformPanel,
} from "../../static/types.ts";
import type { I_ChordInitMeta } from "./cls_initChord";

/**
 * 空的音程面板
 */
const EMPTY_INTERVAL_PANEL: I_ChordIntervalPanel = {
  2: void 0,
  3: void 0,
  4: void 0,
  5: void 0,
  6: void 0,
  7: void 0,
  9: void 0,
  11: void 0,
  13: void 0,
};

/**
 * 获取应用变换后的音程面板
 *
 * @param initChordFormulaMeta 和弦公式元数据
 * @param transform 变换面板
 * @returns 应用变换后的音程面板
 */
export const cls_getIntervalPanel = (
  initChordFormulaMeta: I_ChordInitMeta,
  transform: I_TransformPanel
): I_ChordIntervalPanel => {
  const panel: I_ChordIntervalPanel = { ...EMPTY_INTERVAL_PANEL };

  // 先填充基础音程
  for (const [degree, intervalType] of toPairs(
    initChordFormulaMeta.degreeToIntervalMap
  )) {
    panel[Number(degree) as keyof I_ChordIntervalPanel] = intervalType;
  }

  // 应用变换
  for (const [degree, value] of toPairs(transform)) {
    const degreeNum = Number(degree);
    if (value === "omit") {
      panel[degreeNum as keyof I_ChordIntervalPanel] = void 0;
    } else if (!isNil(value)) {
      panel[degreeNum as keyof I_ChordIntervalPanel] =
        value as T_IntervalType;
    }
  }

  return panel;
};

export default cls_getIntervalPanel;
