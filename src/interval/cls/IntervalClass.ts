import {numberToChinese} from "chinese-numbering";
import {t_intervalCnPrefix, t_intervalType} from "../static/types";
import {initIntervalClass} from "./classFn/cls_initInterval";
import cls_getEqualInterval from "./classFn/cls_getEqualInterval";

export class Interval {
	public cnPrefix: t_intervalCnPrefix
	public type: t_intervalType
	public isNatural: boolean
	public numWithinOctave: number
	public num: number
	public semitoneGap: number
	public logicOctaveGap: number
	public factOctaveGap: number
	public semitoneLocation: number;
	public semitoneGapWithinOctave: number;

	constructor(intervalType: t_intervalType = "p", intervalNum: number = 1) {
		const intervalFullObj = initIntervalClass(intervalType, intervalNum)
		const intervalObjWithinOctave = intervalFullObj[0]
		this.semitoneLocation = intervalObjWithinOctave.semitoneLocation
		this.logicOctaveGap = intervalFullObj[1]
		this.cnPrefix = intervalObjWithinOctave.cnPrefix
		this.semitoneGapWithinOctave = intervalObjWithinOctave.semitoneGap
		this.type = intervalObjWithinOctave.type
		this.numWithinOctave = intervalObjWithinOctave.num
		this.num = intervalNum
		this.isNatural = intervalObjWithinOctave.isNatural
		this.factOctaveGap = intervalObjWithinOctave.octaveGap + this.logicOctaveGap
		this.semitoneGap = intervalObjWithinOctave.semitoneGap + this.logicOctaveGap * 12
	}


	get simpleDescription() {
		return `${this.cnPrefix}${numberToChinese(this.num, {chineseType: "simplified"})}度`
	}

	getEqualInterval(isSelfTypeExcluded = false, isAugDimExcluded = false, isDoubleAugDimExcluded = false) {
		return cls_getEqualInterval(this,
			isSelfTypeExcluded,
			isAugDimExcluded, isDoubleAugDimExcluded)
	}
}
