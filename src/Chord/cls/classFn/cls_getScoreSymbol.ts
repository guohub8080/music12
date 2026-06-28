/**
 * 获取乐谱符号（含变换）
 *
 * 根据 baseSymbol 和 transformPanel 直接推导最终的乐谱符号。
 * 无变换时直接返回 baseSymbol；有变换时用括号包裹变换后缀。
 *
 * sus 规则：
 * - omit3 + add2 → sus2
 * - omit3 + add4 → sus4
 * - omit3 + add2 + add4 → sus2(add4)
 */

import toPairs from "lodash/toPairs"
import isString from "lodash/isString"
import type { I_TransformPanel } from "../../static/types";

/**
 * 获取乐谱符号（含变换）
 *
 * @param baseSymbol 基础和弦符号（来自和弦公式，如 "M7", "m7", "7"）
 * @param transformPanel 变换面板
 * @returns 乐谱符号，格式如 "M7(add9,11;#5;omit3)"
 */
export const cls_getScoreSymbol = (
  baseSymbol: string,
  transformPanel: I_TransformPanel
): string => {
  // sus 检测
  const hasOmit3 = transformPanel[3] === "omit";
  const hasAdd2 = isString(transformPanel[2]) && transformPanel[2] !== "omit";
  const hasAdd4 = isString(transformPanel[4]) && transformPanel[4] !== "omit";

  let susPrefix = "";
  let skipDegrees = new Set<number>();

  if (hasOmit3) {
    if (hasAdd2 && hasAdd4) {
      susPrefix = "sus2";
      skipDegrees = new Set([2, 3]);
      // 4度保留，作为 add4 附加
    } else if (hasAdd2) {
      susPrefix = "sus2";
      skipDegrees = new Set([2, 3]);
    } else if (hasAdd4) {
      susPrefix = "sus4";
      skipDegrees = new Set([3, 4]);
    }
  }

  const adds: number[] = [];
  const omits: number[] = [];
  const sharps: number[] = [];
  const flats: number[] = [];
  let hasTransform = false;

  for (const [degreeStr, value] of toPairs(transformPanel)) {
    if (!isString(value)) continue;
    hasTransform = true;
    const degree = Number(degreeStr);

    if (skipDegrees.has(degree)) continue;

    if (value === "omit") {
      omits.push(degree);
    } else if (value === "aug") {
      sharps.push(degree);
    } else if (value === "dim") {
      flats.push(degree);
    } else {
      adds.push(degree);
    }
  }

  if (!hasTransform) return baseSymbol;

  const groups: string[] = [];
  if (adds.length > 0) groups.push(`add${adds.join(",")}`);
  if (sharps.length > 0) groups.push(sharps.map(d => `#${d}`).join(","));
  if (flats.length > 0) groups.push(flats.map(d => `b${d}`).join(","));
  if (omits.length > 0) groups.push(`omit${omits.join(",")}`);

  if (susPrefix) {
    return groups.length > 0
      ? `${susPrefix}(${groups.join(";")})`
      : susPrefix;
  }

  if (groups.length === 0) return baseSymbol;

  return `${baseSymbol}(${groups.join(";")})`;
};

export default cls_getScoreSymbol;
