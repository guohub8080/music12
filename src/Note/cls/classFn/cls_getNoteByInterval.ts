import { isNil } from 'es-toolkit'
import {IntervalError, NoteError} from "@common/processError/errorTypes";
import {StepRadix} from "@common/radix";
import {PianoKey} from "@pianokey";
import type {Interval} from "@interval";
import {Note} from "../../index";
import NOTE_META from "../../static/NOTE_META";
import {T_AlterValue, T_NoteStep} from "@common/static/NOTE_TYPES";

/**
 * 根据音程计算目标音符
 *
 * 这是 Note.getNoteByInterval() 方法的核心实现。通过给定一个音程，
 * 计算从当前音符出发得到的目标音符。
 *
 * ### 算法原理
 *
 * 音程包含两个维度的信息：
 * 1. **度数 (num)**: 决定目标音的音级（step），如大三度的度数是 3
 * 2. **半音距离 (semitoneGap)**: 决定目标音的实际音高位置
 *
 * 通过同时计算这两个维度，可以唯一确定目标音符的音名和变化音。
 *
 * ### 计算步骤
 *
 * 1. 使用 StepRadix 计算目标音级（基于七进制）
 * 2. 使用 PianoKey 计算目标半音位置（基于十二进制）
 * 3. 在 noteMeta 中查找同时满足这两个条件的音符
 *
 * @param noteInstance 基础音符
 * @param intervalInstance 音程实例
 * @param isAscending 是否上行，默认 true
 * @returns 目标音符
 * @throws {IntervalError} 当音程为空时抛出
 * @throws {NoteError} 当找不到匹配的音符时抛出
 *
 * @example
 * const c4 = new Note('C', 0, 4)
 * const majorThird = new Interval('maj', 3)
 * cls_getNoteByInterval(c4, majorThird, true)  // Note('E', 0, 4)
 *
 * const perfectFifth = new Interval('p', 5)
 * cls_getNoteByInterval(c4, perfectFifth, true)  // Note('G', 0, 4)
 */
export default (noteInstance: InstanceType<typeof Note>,
                intervalInstance: InstanceType<typeof Interval>,
                isAscending = true): InstanceType<typeof Note> => {
	// 参数校验
	if (isNil(intervalInstance)) throw new IntervalError("Interval is required.")
	if (isNil(noteInstance)) throw new NoteError("Note is required.")

	// 计算目标音级（基于七进制）
	// 度数 - 1 是因为音程从 1 开始计数，但音级偏移从 0 开始
	const baseNoteStepRadix = StepRadix.fromArray([noteInstance.octave, noteInstance.step])
	const targetStepRadix = isAscending ?
		baseNoteStepRadix.add(intervalInstance.num - 1) :
		baseNoteStepRadix.add((intervalInstance.num - 1) * -1)

	// 计算目标半音位置（基于十二进制）
	// 使用 pitchValue 计算目标位置，保留完整音高信息
	const basePitchValue = noteInstance.pitchValue
	const targetPianoKey = isAscending ?
		PianoKey.fromPitchInt(basePitchValue + intervalInstance.semitoneGap) :
		PianoKey.fromPitchInt(basePitchValue - intervalInstance.semitoneGap)

	// 在 noteMeta 中查找同时满足音级和半音位置的音符
	const findBaseNoteObj = NOTE_META.where("step", targetStepRadix.step)
		.where("pianoKeyId", targetPianoKey.pianoKeyId)
		.first()

	if (!Boolean(findBaseNoteObj)) {
		throw new NoteError("No matching note found for the given interval.")
	}

	return new Note(
		findBaseNoteObj.step as T_NoteStep,
		findBaseNoteObj.alter as T_AlterValue,
		targetStepRadix.octave
	)
}
