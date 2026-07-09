/**
 * 判断值是否为非空数组
 *
 * 是 isArray && !isEmpty 的语义封装，用作类型守卫（narrowing 到 T[]）。
 *
 * @example
 * if (isNonEmptyArray(list)) { /* list 已收窄为非空数组 *\/ }
 */
import { isArray, isEmpty } from 'es-toolkit/compat'
export function isNonEmptyArray<T>(value: unknown): value is T[] {
  return isArray(value) && !isEmpty(value)
}
