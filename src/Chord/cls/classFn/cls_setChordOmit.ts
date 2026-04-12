/**
 * 和弦度数省略设置
 */

import type { I_TransformPanel, I_ChordIntervalNum } from "../../static/types.ts";

/**
 * 省略指定度数的音
 *
 * @param transformPanel 当前面板
 * @param degree 要省略的度数
 * @returns 更新后的变换面板
 */
export const cls_setChordOmit = (
  transformPanel: I_TransformPanel,
  degree: I_ChordIntervalNum
): I_TransformPanel => {
  return {
    ...transformPanel,
    [degree]: "omit",
  };
};

export default cls_setChordOmit;
