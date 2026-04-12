import {numberToChinese} from "chinese-numbering";
import {T_IntervalCnPrefix, T_IntervalType} from "../../common/static/INTERVAL_TYPES.ts";
import {T_AlterValue} from "../../common/static/NOTE_TYPES.ts";
import {cls_initIntervalClass} from "./classFn/cls_initInterval";
import cls_getEqualInterval from "./classFn/cls_getEqualInterval";

export type I_IntervalObj = {
    semitoneClockPosition: number;
    type: T_IntervalType,
    num: number,
    cnPrefix: T_IntervalCnPrefix,
    isNatural: boolean,
    alter: T_AlterValue,
    semitoneGap: number,
    octaveGap: number
}

export interface I_GetEqualIntervalOptions {
  /** 是否排除自身类型，默认 false */
  isSelfTypeExcluded?: boolean
  /** 是否排除增/减音程，默认 false */
  isAugDimExcluded?: boolean
  /** 是否排除倍增/倍减音程，默认 false */
  isDoubleAugDimExcluded?: boolean
}

export class Interval {
	public cnPrefix: T_IntervalCnPrefix
	public type: T_IntervalType
	public isNatural: boolean
	public numWithinOctave: number
	public num: number
	public semitoneGap: number
	public logicOctaveGap: number
	public factOctaveGap: number
	public semitoneClockPosition: number;
	public semitoneGapWithinOctave: number;

	constructor(intervalType: T_IntervalType = "p", intervalNum: number = 1) {
		const intervalFullObj = cls_initIntervalClass(intervalType, intervalNum)
		const intervalObjWithinOctave = intervalFullObj[0]
		this.semitoneClockPosition = intervalObjWithinOctave.semitoneClockPosition
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

	/**
	 * 获取所有与当前音程半音数相同的其他音程（等音程）
	 * @param options 配置选项
	 * @param options.isSelfTypeExcluded 是否排除自身类型
	 * @param options.isAugDimExcluded 是否排除增/减音程
	 * @param options.isDoubleAugDimExcluded 是否排除倍增/倍减音程
	 */
	getEqualInterval(options?: I_GetEqualIntervalOptions) {
		return cls_getEqualInterval(this, options)
	}
}
