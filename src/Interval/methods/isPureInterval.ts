/**
 * 判断音程度数是否为纯音程（1, 4, 5 度）
 *
 * 纯音程包括：一度、四度、五度（及其八度扩展，如八度、十一度、十二度等）
 *
 * @param degree 音程度数（正整数，如 1, 2, 3, 8, 9, 15 等）
 * @returns 是否为纯音程
 *
 * @example
 * isPureInterval(1)  // true  (一度)
 * isPureInterval(4)  // true  (四度)
 * isPureInterval(5)  // true  (五度)
 * isPureInterval(8)  // true  (八度)
 * isPureInterval(2)  // false (二度是大/小音程)
 * isPureInterval(3)  // false (三度是大/小音程)
 */

import {IntervalRadix} from "../../common/radix";
import {isInteger} from "lodash";

export const isPureInterval = (degree: number): boolean => {
  if (degree <= 0 || !isInteger(degree)) {
    throw new Error("Degree must be a positive integer.")
  }

  const radix = new IntervalRadix(degree);
  const degreeWithinOctave = radix.intervalNumWithinOctave;

  return [1, 4, 5].includes(degreeWithinOctave)
}

export default isPureInterval
