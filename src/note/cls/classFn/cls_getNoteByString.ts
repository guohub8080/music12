import {IntervalError} from "../../../common/processError/errorTypes";
import {IntervalRadix} from "../../../common/radix/intervalRadix.ts";
import {Interval} from "../../../interval/cls/IntervalClass";
import {intervalSlide_145, intervalSlide_2367} from "../../../interval/methods/intervalSlide";
import {t_intervalType} from "../../../interval/static/types";
import {Note} from "../NoteClass";

export default (noteInstance: InstanceType<typeof Note>,
                numberNotation: string,
                isAscending = true): InstanceType<typeof Note> => {
	const intervalNumReg = numberNotation.match(/\d+/g)
	if (intervalNumReg.length > 1) throw new IntervalError("2 or more interval is given.")
	const lowOctaveReg = numberNotation.match(/[.lL<vV]/g)
	const lowOctaveValue = lowOctaveReg ? lowOctaveReg.length : 0
	const highOctaveReg = numberNotation.match(/[*hH>^]/g)
	const highOctaveValue = highOctaveReg ? highOctaveReg.length : 0
	const flatReg = numberNotation.match(/[-fFbB]/g)
	const flatRegValue = flatReg ? flatReg.length : 0
	const sharpReg = numberNotation.match(/[+sS#]/g)
	const sharpRegValue = sharpReg ? sharpReg.length : 0
	const totalOctaveGap = highOctaveValue - lowOctaveValue
	const intervalNum = Number(intervalNumReg[0])
	const intervalNumWithinOctave = new IntervalRadix(intervalNum).intervalNumWithinOctave
	const totalAlterValue = sharpRegValue - flatRegValue
	let intervalPrefix: string
	if ([1, 4, 5].indexOf(intervalNumWithinOctave) != -1) {
		intervalPrefix = intervalSlide_145("p", totalAlterValue)
	} else if ([2, 3, 6, 7].indexOf(intervalNumWithinOctave) != -1) {
		intervalPrefix = intervalSlide_2367("maj", totalAlterValue)
	}
	const intervalInstance = new Interval(intervalPrefix as t_intervalType, intervalNum)
	if (totalOctaveGap === 0) return noteInstance.getNoteByInterval(intervalInstance, isAscending)
	const noteNeedOctaveShift = noteInstance.getNoteByInterval(intervalInstance, isAscending)
	return new Note(noteNeedOctaveShift.step,
		noteNeedOctaveShift.alter,
		noteNeedOctaveShift.octave + totalOctaveGap)
}
