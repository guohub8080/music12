/**
 * 根据调号数量获取需要升降的音名列表
 *
 * 五线谱调号的升降音顺序遵循五度圈规律：
 * - 升号顺序：F → C → G → D → A → E → B
 * - 降号顺序：B → E → A → D → G → C → F
 *
 * **设计理念**：升降号顺序由 CircleOfFifths 类定义，本模块只负责使用。
 * CircleOfFifths.SHARP_ORDER 和 CircleOfFifths.FLAT_ORDER 是五度圈的基本规律。
 *
 * @param num 调号数量（正数=升号，负数=降号，范围 -7 到 7）
 * @returns 需要升降的音名列表
 * @throws Error 如果 num 超出 -7 到 7 的范围
 *
 * @example
 * // 升号调性
 * getAlterStepListByNum(1)  // ['F']       - G 大调：F#
 * getAlterStepListByNum(2)  // ['F', 'C']  - D 大调：F#, C#
 * getAlterStepListByNum(3)  // ['F', 'C', 'G'] - A 大调：F#, C#, G#
 * getAlterStepListByNum(7)  // ['F', 'C', 'G', 'D', 'A', 'E', 'B'] - C# 大调
 *
 * // 降号调性
 * getAlterStepListByNum(-1)  // ['B']      - F 大调：Bb
 * getAlterStepListByNum(-2)  // ['B', 'E'] - Bb 大调：Bb, Eb
 * getAlterStepListByNum(-3)  // ['B', 'E', 'A'] - Eb 大调：Bb, Eb, Ab
 * getAlterStepListByNum(-7)  // ['B', 'E', 'A', 'D', 'G', 'C', 'F'] - Cb 大调
 *
 * // 无调号
 * getAlterStepListByNum(0)  // []
 */

import { CircleOfFifths } from "@circle-of-fifths/cls/CircleClass";
import type { T_NoteStep } from "@common/static/NOTE_TYPES";

export const getAlterStepListByNum = (num: number): T_NoteStep[] => {
	if (num === 0) return [];
	if (num > 7 || num < -7) {
		throw new Error("Invalid num: must be between -7 and 7.");
	}

	if (num > 0) {
		// 升号顺序：使用 CircleOfFifths 类定义的 SHARP_ORDER
		return CircleOfFifths.SHARP_ORDER.slice(0, num) as T_NoteStep[];
	} else {
		// 降号顺序：使用 CircleOfFifths 类定义的 FLAT_ORDER
		return CircleOfFifths.FLAT_ORDER.slice(0, Math.abs(num)) as T_NoteStep[];
	}
};

export default getAlterStepListByNum;
