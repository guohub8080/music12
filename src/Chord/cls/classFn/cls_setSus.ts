/**
 * 挂留和弦设置
 */

import type { I_TransformPanel } from "../../static/types.ts";
import type { T_IntervalType } from "../../../common/static/INTERVAL_TYPES.ts";

/**
 * 设置挂留和弦
 *
 * sus2: 省略 3 度，添加 2 度（大二度）
 * sus4: 省略 3 度，添加 4 度（纯四度）
 *
 * @param transformPanel 当前面板
 * @param susNum 2 或 4
 * @returns 更新后的变换面板
 */
export const cls_setSus = (
  transformPanel: I_TransformPanel,
  susNum: 2 | 4 = 2
): I_TransformPanel => {
  return {
    ...transformPanel,
    3: "omit",
    [susNum]: susNum === 2 ? ("maj" as T_IntervalType) : ("p" as T_IntervalType),
  };
};

export default cls_setSus;
