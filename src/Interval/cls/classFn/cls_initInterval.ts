import {IntervalError} from "../../../common/processError/errorTypes";
import {IntervalRadix} from "../../../common/radix";
import INTERVAL_META from "../../static/INTERVAL_META";
import {T_IntervalType} from "../../../common/static/INTERVAL_TYPES.ts";
import type {I_IntervalObj} from "../IntervalClass";

/**
 * 初始化音程类
 *
 * @param intervalType 音程类型
 * @param intervalNum 音程度数
 * @returns [音程对象, 八度跨度]
 */
export const cls_initIntervalClass = (intervalType: T_IntervalType = "p",
                                        intervalNum: number = 1): [I_IntervalObj, number] => {
	if (intervalNum <= 0) throw new IntervalError("Interval number cannot be zero or negative.")
	const intervalNumRadix = new IntervalRadix(intervalNum)
	const findObj = INTERVAL_META.where("type", intervalType).where("num",
		intervalNumRadix.intervalNumWithinOctave).first()
	if (findObj) return [findObj as I_IntervalObj, intervalNumRadix.octave as number]
	throw new IntervalError("Interval type does not match interval number (e.g. maj1).")
}

export default cls_initIntervalClass;
