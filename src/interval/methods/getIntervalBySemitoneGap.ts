// noinspection ES6PreferShortImport

import {t_intervalType} from "../static/types.ts";
import {Interval} from "../../interval";
import {isNumber, isUndefined} from "lodash";
import intervalMeta from "../static/intervalMeta.ts";
import {Base12Radix} from "../../common/radix";

export const getIntervalBySemitoneGap = (semitoneGap: number): InstanceType<typeof Interval>[] | [] => {
	const semitoneGapAbs = Math.abs(semitoneGap)
	const semitoneGapRadix = new Base12Radix(semitoneGapAbs)
	const findResult = intervalMeta.where("isNatural", true)
		.where("semitoneGap", semitoneGapRadix.lastDigit).all()
	if (isUndefined(findResult) || isNumber(findResult)) return []
	if (findResult.length === 0) return []
	return findResult.map(item => {
		return new Interval(item.type as t_intervalType, item.num + semitoneGapRadix.firstDigit * 7)
	})
}

export default getIntervalBySemitoneGap
