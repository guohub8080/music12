/**
 * 根据音符获取其可能所属的调性信息
 *
 * 在五线谱上，一个音符可以出现在多个调性中。
 * 此函数查找所有以指定音符为根音的调性。
 *
 * **设计理念**：通过 CircleOfFifths 类查找调性，而非直接查询 FIFTH_META。
 *
 * @param step 音名（C, D, E, F, G, A, B）
 * @param alter 升降号（-1=降号，0=自然，1=升号）
 * @returns 调性信息数组，包含该音符作为根音的所有大调和小调
 * @throws Error 如果没有找到匹配的调性
 *
 * @example
 * // 自然音
 * getStaveAlterByNote('C', 0)  // C 大调(0)、c 小调(-3)、Db 大调的等音异名等
 * getStaveAlterByNote('G', 0)  // G 大调(1#)、g 小调(-2) 等
 *
 * // 升号音
 * getStaveAlterByNote('F', 1)  // F# 大调(6#)、f# 小调(3#) 等
 * getStaveAlterByNote('G', 1)  // G# 小调(5#) 等
 *
 * // 降号音
 * getStaveAlterByNote('B', -1)  // Bb 大调(-2b)、bb 小调(-5b) 等
 * getStaveAlterByNote('E', -1)  // Eb 大调(-3b)、eb 小调(-6b) 等
 */

import { isEmpty } from 'es-toolkit/compat'
import FIFTH_META from "@circle-of-fifths/static/FIFTH_META";
import type { T_AlterValue, T_NoteStep } from "@common/static/NOTE_TYPES";
export const getStaveAlterByNote = (step: T_NoteStep, alter: T_AlterValue) => {
	const findObj = FIFTH_META
		.where("circleID", ">=", 0)
		.where("circleID", "<=", 12)
		.where("rawNoteStep", step)
		.where("rawNoteAlter", alter)
		.all();

	if (isEmpty(findObj)) {
		throw new Error(`No matching scale found for the given note: ${step}${alter === 0 ? "" : alter > 0 ? "#" : "b"}`);
	}

	return findObj;
};

export default getStaveAlterByNote;
