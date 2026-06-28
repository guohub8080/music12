/**
 * 根据调号数量获取对应的调性信息
 *
 * 调号（staveAlters）表示五线谱上升降号的数量：
 * - 正数：升号数量（1-7）
 * - 负数：降号数量（-1 到 -7）
 * - 0：无调号（C 大调 / a 小调）
 *
 * 每个调号对应一个大调和其关系小调（互为等音异名的调除外）。
 *
 * **设计理念**：通过 CircleOfFifths 类查找调性，而非直接查询 FIFTH_META。
 *
 * @param staveAlter 调号数量（范围 -7 到 7）
 * @returns 调性信息数组，包含大调和小调的详细信息
 * @throws Error 如果 staveAlter 超出 -7 到 7 的范围
 *
 * @example
 * // 无调号
 * getScaleByStaveAlters(0)   // C 大调、a 小调
 *
 * // 升号调性
 * getScaleByStaveAlters(1)   // G 大调、e 小调
 * getScaleByStaveAlters(2)   // D 大调、b 小调
 * getScaleByStaveAlters(3)   // A 大调、f# 小调
 * getScaleByStaveAlters(7)   // C# 大调、a# 小调（包含等音异名）
 *
 * // 降号调性
 * getScaleByStaveAlters(-1)  // F 大调、d 小调
 * getScaleByStaveAlters(-2)  // Bb 大调、g 小调
 * getScaleByStaveAlters(-3)  // Eb 大调、c 小调
 * getScaleByStaveAlters(-7)  // Cb 大调、ab 小调（包含等音异名）
 */

import FIFTH_META from "@circle-of-fifths/static/FIFTH_META";

export const getScaleByStaveAlters = (staveAlter: number) => {
	if (Math.abs(staveAlter) > 7) {
		throw new Error("Invalid staveAlter: must be between -7 and 7.");
	}

	// 对于 -6 到 6 的调号，只返回常用调性（排除主音被替换的情况）
	if (Math.abs(staveAlter) <= 6) {
		return FIFTH_META
			.where("circleID", ">=", 0)
			.where("circleID", "<=", 12)
			.where("rawStaveAlters", staveAlter)
			.where("isTonicReplaced", false)
			.all();
	}

	// 对于 ±7 的调号，返回所有调性（包括等音异名）
	return FIFTH_META.where("rawStaveAlters", staveAlter).all();
};

export default getScaleByStaveAlters;
