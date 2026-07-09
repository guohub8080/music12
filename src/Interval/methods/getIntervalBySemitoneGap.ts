/**
 * 根据半音距离查找所有可能的自然音程
 *
 * 自然音程是指大、小、纯三种音程类型（不包括增、减音程）。
 * 给定一个半音距离，返回所有半音数相等的自然音程。
 *
 * 由于等音程的存在，同一个半音距离可能对应多个不同的音程。
 * 例如：7个半音可能是纯五度（7半音）或减六度（有些情况下）。
 *
 * @param semitoneGap 半音距离（可正可负，内部取绝对值处理）
 * @returns 匹配的自然音程数组，若无匹配则返回空数组
 *
 * @example
 * // 0个半音 = 纯一度
 * getIntervalBySemitoneGap(0)
 * // [Interval(p, 1)]
 *
 * // 7个半音 = 纯五度
 * getIntervalBySemitoneGap(7)
 * // [Interval(p, 5)]
 *
 * // 12个半音 = 纯八度
 * getIntervalBySemitoneGap(12)
 * // [Interval(p, 8)]
 *
 * // 19个半音 = 纯十二度（纯五度 + 八度）
 * getIntervalBySemitoneGap(19)
 * // [Interval(p, 12)]
 *
 * // 6个半音可能是增四度或减五度，但都不是自然音程
 * // 自然音程中6个半音没有匹配
 * getIntervalBySemitoneGap(6)
 * // []
 */

// noinspection ES6PreferShortImport

import { isEmpty } from 'es-toolkit/compat'
import {T_IntervalType} from "@common/static/INTERVAL_TYPES";
import {Interval} from "../cls/IntervalClass";
import INTERVAL_META from "../static/INTERVAL_META";
import {Base12Radix} from "@common/radix";

export const getIntervalBySemitoneGap = (semitoneGap: number): InstanceType<typeof Interval>[] | [] => {
	// 取绝对值，支持负数输入
	const semitoneGapAbs = Math.abs(semitoneGap)

	// 使用十二进制分解半音数
	// 例如：19 = 1 * 12 + 7，即 1个八度 + 7个半音
	// firstDigit = 1 (八度数), lastDigit = 7 (八度内的半音数)
	const semitoneGapRadix = new Base12Radix(semitoneGapAbs)

	// 在 intervalMeta 中查找八度内半音数匹配的自然音程
	// isNatural = true 筛选大、小、纯音程（排除增、减音程）
	const findResult = INTERVAL_META.where("isNatural", true)
		.where("semitoneGap", semitoneGapRadix.lastDigit).all()

	// 无匹配结果返回空数组
	if (isEmpty(findResult)) return []

	// 将八度内的音程扩展为实际音程
	// 度数 = 八度内度数 + 八度数 * 7
	// 例如：纯五度(5) + 1个八度 = 纯十二度(5 + 7 = 12)
	return findResult.map(item => {
		return new Interval(item.type as T_IntervalType, item.num + semitoneGapRadix.firstDigit * 7)
	})
}

export default getIntervalBySemitoneGap
