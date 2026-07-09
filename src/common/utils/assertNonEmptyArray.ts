/**
 * 断言值为非空数组，否则抛错
 *
 * @param value - 待断言的值
 * @param paramName - 参数名（用于错误信息）
 * @throws Error 当值不是数组或为空数组时
 */
import { isArray, isEmpty } from 'es-toolkit/compat'
export function assertNonEmptyArray<T>(
  value: unknown,
  paramName: string = "array",
): asserts value is T[] {
  if (!isArray(value) || isEmpty(value)) {
    throw new Error(`${paramName} must be a non-empty array`)
  }
}
