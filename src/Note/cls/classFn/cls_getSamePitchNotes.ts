// noinspection ES6PreferShortImport

import {PianoKey} from "../../../PianoKey";
import {Note} from "../NoteClass";
import collect from "collect.js";

/**
 * 获取所有等音异名
 *
 * 查找与给定音符音高相同的所有其他音符表示。
 * 利用 PianoKey.getNotes() 获取指定位置的所有等音。
 *
 * ### 等音异名概念
 *
 * 等音异名（Enharmonic equivalent）是指音高相同但记谱不同的音符。
 * 例如：C# 和 Db、B# 和 C、E# 和 F 等。
 *
 * ### 参数说明
 *
 * - **isSelfIncluded**: 是否包含原始音符本身
 *   - `true`: 返回所有等音（包括自身）
 *   - `false`: 只返回其他等音（排除自身）
 *
 * - **alterAbsLte**: 变化音绝对值上限
 *   - `0`: 只返回自然音（alter = 0）
 *   - `1`: 返回自然音和单升/降号（alter = -1, 0, 1）
 *   - `2`: 返回所有常用变化音（alter = -2, -1, 0, 1, 2）
 *
 * @param givenNoteInstance 目标音符
 * @param isSelfIncluded 是否包含自身，默认 true
 * @param alterAbsLte 变化音绝对值上限（0, 1, 2），默认 2
 * @returns 等音异名数组
 *
 * @example
 * const cSharp4 = new Note('C', 1, 4)
 *
 * // 包含自身，alter 上限为 1
 * cls_getSamePitchNotes(cSharp4, true, 1)
 * // [Note('C#', 1, 4), Note('Db', -1, 4)]
 *
 * // 不包含自身，alter 上限为 2
 * cls_getSamePitchNotes(cSharp4, false, 2)
 * // [Note('Db', -1, 4), Note('B##', 2, 3)]
 */
export default (givenNoteInstance: InstanceType<typeof Note>,
                isSelfIncluded = true,
                alterAbsLte: 0 | 1 | 2 = 2): InstanceType<typeof Note>[] => {
	// 参数校验
	if (alterAbsLte < 0 || alterAbsLte > 2) {
		throw new Error("Alter limit must be 0, 1, or 2.")
	}

	// 使用 PianoKey 获取该位置的所有等音
	// isNormal: false 表示获取所有音符（包括 B#, Cb 等非常用音）
	// alterAbsLte: 限制变化音的绝对值
	const pianoKey = PianoKey.fromPitchInt(givenNoteInstance.pitchValue)
	const allNotes = pianoKey.getNotes({ isNormal: false, alterAbsLte })

	// 根据 isSelfIncluded 参数决定是否过滤掉原始音符
	if (isSelfIncluded) {
		return allNotes
	}

	// 过滤掉与原始音符相同的音符（通过比较 step + alter + octave）
	return collect(allNotes)
		.filter(note =>
			note.step !== givenNoteInstance.step ||
			note.alter !== givenNoteInstance.alter ||
			note.octave !== givenNoteInstance.octave
		)
		.all()
}
