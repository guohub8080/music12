// noinspection ES6PreferShortImport

import {Base12Radix} from "@common/radix";

/**
 * 计算两个钢琴键位置之间的向上距离
 *
 * 在十二平均律中，计算从 basePianoKeyId 到 targetPianoKeyId 的最短向上半音距离。
 * 这个函数总是返回正数（向上方向的距离）。
 *
 * ### 核心逻辑
 *
 * 这个函数使用了 Base12Radix（十二进制）来表示钢琴键的位置。钢琴键可以用"八度数+键位"来表示：
 *
 * | 键位 | 八度 1 | 八度 2 |
 * |------|--------|--------|
 * | C    | [1,0]  | [2,0]  |
 * | D    | [1,2]  | [2,2]  |
 * | ...  | ...    | ...    |
 * | B    | [1,11] | [2,11] |
 *
 * Base12Radix.getGap() 计算两个位置之间的"差值"，可以是正数或负数：
 * - 正数：第二个位置在第一个位置"之后"
 * - 负数：第二个位置在第一个位置"之前"
 * - 0：两个位置相同
 *
 * ### 为什么需要跨八度计算？
 *
 * 当目标键在起始键"之前"时（例如从 G(7) 到 C(0)），直接计算会得到负数。
 * 这时需要把目标键放到"下一八度"来计算，这样就能得到正确的向上距离。
 *
 * @param basePianoKeyId 起始钢琴键 ID（0-11，C=0, C#=1, ..., B=11）
 * @param targetPianoKeyId 目标钢琴键 ID（0-11）
 * @returns 向上半音距离（0-11）
 *
 * @example
 * ```ts
 * // C 到 G：0 → 7 = 7 个半音（纯五度）
 * getUpwardPianoKeyGap(0, 7)  // 7
 *
 * // G 到 C：7 → 0 需要跨八度
 * // 同八度：C(0) 在 G(7) 之前，距离为 -6
 * // 跨八度：下一八度的 C(12) 与 G(7) 的距离是 12-7=5
 * getUpwardPianoKeyGap(7, 0)  // 5
 *
 * // C 到 C：相同位置，不需要跨八度
 * getUpwardPianoKeyGap(0, 0)  // 0
 * ```
 *
 * @remarks
 * 这个函数在计算音程、和弦转位等场景中很有用。
 * 比如确定从根音到某个音需要向上走多少半音。
 */
export const getUpwardPianoKeyGap = (basePianoKeyId: number, targetPianoKeyId: number): number => {
	// ===== 步骤 1：尝试在同一八度内计算距离 =====
	// Base12Radix.fromArray([八度, 键位]) 创建一个十二进制位置
	// [1, basePianoKeyId] 表示第 1 八度的 basePianoKeyId
	// [1, targetPianoKeyId] 表示第 1 八度的 targetPianoKeyId
	const numberGapWithRoot = Base12Radix.fromArray([1, basePianoKeyId])
		.getGap(Base12Radix.fromArray([1, targetPianoKeyId]))

	// ===== 步骤 2：如果结果为负数，跨八度重新计算 =====
	// 负数说明 targetPianoKeyId 在 basePianoKeyId "之前"
	// 例如：从 G(7) 到 C(0)，同八度 C 在 G 之前，距离为 -6
	// 解决：把 targetPianoKeyId 放到第 2 八度（即 [2, targetPianoKeyId]）
	// 这样 [1,7] 到 [2,0] 的距离就是正数了
	if (numberGapWithRoot < 0) {
		return Base12Radix.fromArray([1, basePianoKeyId])
			.getGap(Base12Radix.fromArray([2, targetPianoKeyId]))
	}

	// 正数或 0，直接返回
	return numberGapWithRoot
}

export default getUpwardPianoKeyGap
