/**
 * 集合相似度计算工具
 */

/**
 * Jaccard 相似度系数
 *
 * 用于衡量两个集合的相似程度，定义为交集大小与并集大小的比值。
 *
 * 公式：J(A,B) = |A ∩ B| / |A ∪ B|
 *
 * 特性：
 * - 取值范围 [0, 1]
 * - 1 表示两个集合完全相同
 * - 0 表示两个集合没有共同元素
 * - 对重复值自动去重（基于集合论定义）
 *
 * @param a - 集合 A（数字数组）
 * @param b - 集合 B（数字数组）
 * @returns 相似度系数 (0-1)
 *
 * @example
 * ```ts
 * jaccard([1, 2, 3], [2, 3, 4])  // → 0.5 (交集 {2,3}, 并集 {1,2,3,4})
 * jaccard([1, 2], [1, 2])        // → 1 (完全相同)
 * jaccard([1, 2], [3, 4])        // → 0 (无交集)
 * jaccard([0, 2, 3], [0, 2, 2, 3, 5])  // → 0.75 (重复值不影响)
 * ```
 *
 * @see https://en.wikipedia.org/wiki/Jaccard_index
 */
import { intersection, union } from 'es-toolkit'
export const jaccard = (a: number[], b: number[]): number => {
	// lodash 的 intersection 和 union 会自动去重
	const intersectionArr = intersection(a, b)
	const unionArr = union(a, b)
	return intersectionArr.length / unionArr.length
}

export default jaccard
