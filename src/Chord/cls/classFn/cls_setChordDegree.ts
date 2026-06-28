/**
 * 和弦度数设置
 *
 * 支持 set(度数) 和 set("度数")/set("#度数")/set("b度数") 格式
 */

import isNil from "lodash/isNil"
import isNumber from "lodash/isNumber"
import type { T_IntervalType } from "@common/static/INTERVAL_TYPES";
import type { I_TransformPanel } from "../../static/types";

/**
 * 默认音程类型映射
 * - 2,3,6,7 及其翻八度（9,11,13）为 "maj"（大）
 * - 4,5 及其翻八度（11）为 "p"（纯）
 */
const DEFAULT_INTERVAL: Record<number, T_IntervalType> = {
  2: "maj",
  3: "maj",
  4: "p",
  5: "p",
  6: "maj",
  7: "maj",
  9: "maj",
  11: "p",
  13: "maj",
} as const;

/**
 * 升降号后的音程类型映射
 *
 * 规则：
 * - 大音程 + # → aug, + b → min
 * - 纯音程 + # → aug, + b → dim
 */
const ALTERED_INTERVAL: Record<
  string,
  Record<"aug" | "dim", T_IntervalType>
> = {
  maj: { aug: "aug", dim: "min" },
  p: { aug: "aug", dim: "dim" },
};

/**
 * 设置和弦度数的音程类型
 *
 * @param transformPanel 当前面板
 * @param input 度数输入，支持：
 *   - 数字：2, 3, 4, 5, 6, 7, 9, 11, 13
 *   - 字符串："2", "#2", "b2", "3", "#3", "b3" 等
 * @returns 更新后的变换面板
 */
export const cls_setChordDegree = (
  transformPanel: I_TransformPanel,
  input:
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 9
    | 11
    | 13
    | `${number}`
    | `#${number}`
    | `b${number}`
): I_TransformPanel => {
  let degree: number;
  let intervalType: T_IntervalType;

  if (isNumber(input)) {
    // 数字参数：set(2), set(9) 等
    degree = input;
    intervalType = DEFAULT_INTERVAL[degree];
  } else {
    // 字符串参数：set("2"), set("#2"), set("2#"), set("b2"), set("B2"), set("2B") 等
    // # 和 b 不区分大小写和位置
    const normalized = input.toUpperCase().replace(/B/g, "b");
    const match = normalized.match(/^([#b]?)(\d+)([#b]?)$/);
    if (isNil(match)) {
      throw new Error(`Invalid degree input: "${input}"`);
    }

    const [, prefix, degreeStr, suffix] = match;
    degree = Number(degreeStr);

    if (![2, 3, 4, 5, 6, 7, 9, 11, 13].includes(degree)) {
      throw new Error(`Invalid degree: ${degree}`);
    }

    const defaultType = DEFAULT_INTERVAL[degree];

    // 检查升降号（前缀或后缀）
    const hasSharp = prefix === "#" || suffix === "#";
    const hasFlat = prefix === "b" || suffix === "b";

    if (hasSharp) {
      // 升号：大/纯 → aug
      intervalType = ALTERED_INTERVAL[defaultType].aug;
    } else if (hasFlat) {
      // 降号：大 → min，纯 → dim
      intervalType = ALTERED_INTERVAL[defaultType].dim;
    } else {
      // 无升降号，使用默认
      intervalType = defaultType;
    }
  }

  return {
    ...transformPanel,
    [degree]: intervalType,
  };
};

export default cls_setChordDegree;
