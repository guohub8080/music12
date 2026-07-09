import { isNumber } from 'es-toolkit'
import { isArray } from 'es-toolkit/compat'
import collect from "collect.js";

/**
 * 规范化八度参数
 *
 * @param octave 八度数或八度数组
 *               - 数字：直接使用该八度
 *               - 数组：从数组中随机选择一个八度
 * @returns 最终的八度数
 *
 * @example
 * normalizeOctave(4)        // 4
 * normalizeOctave([3, 4, 5]) // 随机返回 3、4 或 5
 */
export default (octave: number | number[] = 4): number => {
  if (isNumber(octave)) return octave
  if (isArray(octave)) {
    const a = collect(octave).random()
    if (isNumber(a)) return a
    throw new Error("Octave must be a number or an array of numbers.")
  }
  throw new Error("Octave must be a number or an array of numbers.")
}
