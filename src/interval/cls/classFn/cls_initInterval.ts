import {IntervalError} from "../../../common/processError/errorTypes";
import {IntervalRadix} from "../../../common/radix/intervalRadix.ts";
import intervalMeta from "../../static/intervalMeta";
import {t_intervalObj, t_intervalType} from "../../static/types";

export const initIntervalClass = (intervalType: t_intervalType = "p",
                                  intervalNum: number = 1): [t_intervalObj, number] => {
	if (intervalNum <= 0) throw new IntervalError("Interval num cannot be 0 or negative!")
	const intervalNumRadix = new IntervalRadix(intervalNum)
	const findObj = intervalMeta.where("type", intervalType).where("num",
		intervalNumRadix.intervalNumWithinOctave).first()
	if (findObj) return [findObj as t_intervalObj, intervalNumRadix.octave as number]
	throw new IntervalError("Interval type doesn't match interval num.(e.g. maj1)")
}
