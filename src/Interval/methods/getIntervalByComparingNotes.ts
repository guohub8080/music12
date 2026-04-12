/**
 * 根据两个音符计算它们之间的音程
 *
 * 音程表示两个音符之间的距离，由音程类型（大、小、纯、增、减等）和度数组成。
 * 此函数通过比较两个音符的音高和音级来精确计算音程。
 *
 * ### 核心概念
 *
 * 1. **半音距离 (semitoneGap)**：两个音符之间的实际半音数差值
 * 2. **音级距离 (stepGap)**：两个音符在七声音阶中的级数差值
 *    - C 到 D 是 2 度，C 到 G 是 5 度，C 到下一个 C 是 8 度（八度）
 *
 * ### 特殊情况处理
 *
 * - **同音（C4 → C4）**：返回纯一度
 * - **等音（C4 → B#3）**：根据音级计算，返回增一度（而非纯一度）
 * - **跨八度（C4 → D5）**：正确计算复合音程，返回大九度
 *
 * @param note1 起始音符
 * @param note2 目标音符
 * @returns 两个音符之间的音程
 * @throws {IntervalError} 当无法找到匹配的音程时抛出错误
 *
 * @example
 * import { Note } from './Note'
 * import { getIntervalByComparingNotes } from './Interval'
 *
 * // 同音 = 纯一度
 * const c4 = new Note('C', 0, 4)
 * const c4_2 = new Note('C', 0, 4)
 * getIntervalByComparingNotes(c4, c4_2).simpleDescription  // "纯一度"
 *
 * // 大三度
 * const e4 = new Note('E', 0, 4)
 * getIntervalByComparingNotes(c4, e4).simpleDescription  // "大三度"
 *
 * // 纯五度
 * const g4 = new Note('G', 0, 4)
 * getIntervalByComparingNotes(c4, g4).simpleDescription  // "纯五度"
 *
 * // 等音情况：B#3 和 C4 音高相同，但音程是增一度（1个音级）
 * const bSharp3 = new Note('B', 1, 3)  // B#
 * getIntervalByComparingNotes(c4, bSharp3).simpleDescription  // "减二度"
 */

// noinspection ES6PreferShortImport

import {IntervalError} from "../../common/processError/errorTypes";
import {Base7Radix, StepRadix} from "../../common/radix";
import {Note} from "../../Note/cls/NoteClass";
import {Interval} from "../cls/IntervalClass";
import INTERVAL_META from "../static/INTERVAL_META";
import {T_IntervalType} from "../../common/static/INTERVAL_TYPES.ts";


const getIntervalByComparingNotes = (note1: InstanceType<typeof Note>,
                                     note2: InstanceType<typeof Note>): InstanceType<typeof Interval> => {
	/**
	 * 计算示例（用于理解算法逻辑）：
	 *
	 *   音符对         方向    半音距离    音级数组[八度,度数]    半音数组[八度,半音]
	 * C_4 -> C_4        上行      0         [  0, 1 ]            [  0, 0  ]
	 * C_4 -> C♯_4       上行      1         [  0, 1 ]            [  0, 1  ]
	 * C_4 -> C♭_4       下行     -1         [  0, 1 ]            [ -1, 11 ]
	 * C_4 -> B_3        下行     -1         [ -1, 7 ]            [ -1, 11 ]
	 * C_4 -> D_4        上行      2         [  0, 2 ]            [  0, 2  ]
	 * C_4 -> B♯_3       上行      0         [ -1, 7 ]            [  0, 0  ]
	 * C_4 -> D♭_4       上行      1         [  0, 2 ]            [  0, 1  ]
	 * C_4 -> B♯♯_3      上行      1         [ -1, 7 ]            [  0, 1  ]
	 * C_4 -> D♭♭_4      上行      0         [  0, 2 ]            [  0, 0  ]
	 * C_4 -> C♭♭_4      下行     -2         [  0, 1 ]            [ -1, 10 ]
	 */

	// 计算半音距离：目标音高 - 起始音高
	let semitoneGap = note2.pitchValue - note1.pitchValue

	// 将两个音符转换为七进制表示，便于计算音级距离
	// [八度, 音级] 例如 C4 = [4, 0], D4 = [4, 1], B3 = [3, 6]
	const note1StepRadix = StepRadix.fromArray([note1.octave, note1.step])
	const note2StepRadix = StepRadix.fromArray([note2.octave, note2.step])

	// 特殊情况：半音距离为 0（同音高或等音）
	if (semitoneGap === 0) {
		// 即使半音相同，音级可能不同（如 C4 和 B#3）
		// 计算音级距离并加 1（因为 1 度 = 0 个音级差）
		const intervalGap = Math.abs(note1StepRadix.getGap(note2StepRadix)) + 1

		// 在音程元数据中查找半音为 0、度数匹配的音程
		const findIntervalObj = INTERVAL_META.where("semitoneGap", 0).where("num", intervalGap).first()
		if (findIntervalObj) return new Interval(findIntervalObj.type as T_IntervalType, findIntervalObj.num)
		throw new IntervalError("Parallel notes but no matching interval found.")
	}

	// 取绝对值，统一按上行处理
	semitoneGap = Math.abs(semitoneGap)

	// 分解半音距离为 [八度数, 八度内半音数]
	// 例如：19 = 1 * 12 + 7 → [1, 7]（1个八度 + 7个半音）
	const semitoneOctave = Math.floor(semitoneGap / 12)
	const semitoneWithinOctaveGap = ((semitoneGap % 12) + 12) % 12
	const semitoneGapArr = [semitoneOctave, semitoneWithinOctaveGap]

	// 分解音级距离为 [八度数, 八度内度数]
	// 例如：9度 = 1 * 7 + 2 → [1, 2]（1个八度 + 2度）
	const stepGapArr = new Base7Radix(Math.abs(note1StepRadix.getGap(note2StepRadix))).digitPair

	// 计算八度内的半音数
	let semitoneWithinOctave = semitoneGapArr[1]

	// 处理等音情况的八度边界修正
	// 当音级八度和半音八度不一致时，需要调整八度内半音数
	// 例如：B##3 到 C4，音级是 -6（下行大七度），但半音是 0
	if (stepGapArr[0] !== semitoneGapArr[0]) {
		semitoneWithinOctave = semitoneGapArr[1] + 12 * (semitoneGapArr[0] - stepGapArr[0])
	}

	// 在音程元数据中查找匹配的音程
	// 条件：八度内半音数匹配 + 八度内度数匹配
	const findIntervalObj = INTERVAL_META.where("semitoneGap", semitoneWithinOctave).where("num", stepGapArr[1] + 1).first()

	if (findIntervalObj) {
		// 计算实际度数：八度数 * 7 + 八度内度数 + 1
		return new Interval(findIntervalObj.type as T_IntervalType, stepGapArr[0] * 7 + stepGapArr[1] + 1)
	}

	throw new IntervalError("No interval found for the given notes.")
}

export default getIntervalByComparingNotes
