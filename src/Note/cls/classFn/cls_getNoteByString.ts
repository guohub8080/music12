import {IntervalError} from "../../../common/processError/errorTypes";
import {Interval} from "../../../Interval/cls/IntervalClass";
import {intervalSlide_145, intervalSlide_2367} from "../../../Interval/methods/intervalSlide";
import {isPureInterval} from "../../../Interval/methods/isPureInterval";
import {T_IntervalType} from "../../../common/static/INTERVAL_TYPES.ts";
import {Note} from "../NoteClass";

/**
 * 根据简谱标记计算目标音符
 *
 * 这是 Note.getNoteByIntervalString() 方法的核心实现。
 * 解析简谱风格的标记字符串，计算目标音符。
 *
 * ### 支持的标记符号
 *
 * | 符号类型 | 支持的字符 | 说明 |
 * |----------|------------|------|
 * | 数字 | 1-7 | 音程度数 |
 * | 升号 | +, s, S, # | 升高半音 |
 * | 降号 | -, f, F, b, B | 降低半音 |
 * | 高八度 | *, h, H, >, ^ | 升高一个八度 |
 * | 低八度 | ., l, L, <, v, V | 降低一个八度 |
 *
 * ### 解析规则
 *
 * 1. 从字符串中提取数字作为音程数
 * 2. 统计升号和降号的数量，计算总变化音值
 * 3. 统计高低八度符号的数量，计算总八度偏移
 * 4. 根据音程数确定音程类型（纯音程或大小音程）
 * 5. 应用变化音值调整音程类型
 * 6. 计算最终目标音符
 *
 * @param noteInstance 基础音符
 * @param numberNotation 简谱标记（如 "5", "b7", "#4", "h2", "l3"）
 * @param isAscending 是否上行，默认 true
 * @returns 目标音符
 * @throws {IntervalError} 当标记格式错误时抛出
 *
 * @example
 * const c4 = new Note('C', 0, 4)
 *
 * // 基本用法
 * cls_getNoteByNumberNotation(c4, "5")     // G4（上方纯五度）
 * cls_getNoteByNumberNotation(c4, "b7")    // Bb3（上方小七度）
 *
 * // 多个升降号
 * cls_getNoteByNumberNotation(c4, "##4")   // F##4（上方倍增四度）
 *
 * // 八度变化
 * cls_getNoteByNumberNotation(c4, "h2")    // D5（上方大二度，高八度）
 * cls_getNoteByNumberNotation(c4, "l3")    // Bb3（下方小三度，低八度）
 */
export default (noteInstance: InstanceType<typeof Note>,
                numberNotation: string,
                isAscending = true): InstanceType<typeof Note> => {
	// 提取音程数字
	const intervalNumReg = numberNotation.match(/\d+/g)
	if (intervalNumReg.length > 1) throw new IntervalError("Only one interval number is allowed.")

	// 统计低八度符号
	const lowOctaveReg = numberNotation.match(/[.lL<vV]/g)
	const lowOctaveValue = lowOctaveReg ? lowOctaveReg.length : 0

	// 统计高八度符号
	const highOctaveReg = numberNotation.match(/[*hH>^]/g)
	const highOctaveValue = highOctaveReg ? highOctaveReg.length : 0

	// 统计降号
	const flatReg = numberNotation.match(/[-fFbB]/g)
	const flatRegValue = flatReg ? flatReg.length : 0

	// 统计升号
	const sharpReg = numberNotation.match(/[+sS#]/g)
	const sharpRegValue = sharpReg ? sharpReg.length : 0

	// 计算总的八度偏移和变化音值
	const totalOctaveGap = highOctaveValue - lowOctaveValue
	const intervalNum = Number(intervalNumReg[0])
	const totalAlterValue = sharpRegValue - flatRegValue

	// 根据度数确定基础音程类型
	// 纯音程（1, 4, 5 度）使用 intervalSlide_145，大小音程使用 intervalSlide_2367
	const intervalPrefix: string = isPureInterval(intervalNum)
		? intervalSlide_145("p", totalAlterValue)
		: intervalSlide_2367("maj", totalAlterValue)

	// 创建音程并计算目标音符
	const intervalInstance = new Interval(intervalPrefix as T_IntervalType, intervalNum)

	// 如果没有八度变化，直接返回
	if (totalOctaveGap === 0) return noteInstance.getNoteByInterval(intervalInstance, { isAscending })

	// 如果有八度变化，先计算音程目标，再调整八度
	const noteNeedOctaveShift = noteInstance.getNoteByInterval(intervalInstance, { isAscending })
	return new Note(
		noteNeedOctaveShift.step,
		noteNeedOctaveShift.alter,
		noteNeedOctaveShift.octave + totalOctaveGap
	)
}
