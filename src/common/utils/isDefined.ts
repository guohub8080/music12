/**
 * 判断值是否已定义（非 null 且非 undefined）
 *
 * 是 isNil 的语义反面，用作类型守卫（narrowing 到 NonNullable<T>）。
 * 禁止用 !isNil(x) 做非空判断，统一用 isDefined(x)。
 *
 * @example
 * if (isDefined(value)) { /* value 已收窄为非空 *\/ }
 */
import { isNil } from 'es-toolkit'
export const isDefined = <T>(value: T): value is NonNullable<T> => !isNil(value)
