/**
 * 数组随机取一（collect.js 退役时的 .random() 等价实现）
 *
 * 空数组返回 undefined（与 collect 行为一致，调用方自行守卫）。
 */
export const randomOf = <T>(arr: readonly T[]): T | undefined =>
  arr.length === 0 ? undefined : arr[Math.floor(Math.random() * arr.length)]

export default randomOf
