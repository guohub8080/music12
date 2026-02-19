// noinspection ES6PreferShortImport

import {IntervalError} from "../../common/processError/errorTypes";
import {SemitoneRadix, Base7Radix, StepRadix} from "../../common/radix";
import {Note} from "../../note/cls/NoteClass";
import {Interval} from "../cls/IntervalClass";
import intervalMeta from "../static/intervalMeta";
import {t_intervalType} from "../static/types";


const getIntervalByComparingNotes = (note1: InstanceType<typeof Note>,
                                     note2: InstanceType<typeof Note>): InstanceType<typeof Interval> => {
	// Some cases:
	//   Notes         direction    semitoneGap      intervalArr       semitoneArr
	// C_4 -> C_4        上行             0            [  0, 1 ]        [  0, 0  ]
	// C_4 -> C♯_4       上行             1            [  0, 1 ]        [  0, 1  ]
	// C_4 -> C♭_4       下行            -1            [  0, 1 ]        [ -1, 11 ]
	// C_4 -> B_3        下行            -1            [ -1, 7 ]        [ -1, 11 ]
	// C_4 -> D_4        上行             2            [  0, 2 ]        [  0, 2  ]
	// C_4 -> B♯_3       上行             0            [ -1, 7 ]        [  0, 0  ]
	// C_4 -> D♭_4       上行             1            [  0, 2 ]        [  0, 1  ]
	// C_4 -> B♯♯_3      上行             1            [ -1, 7 ]        [  0, 1  ]
	// C_4 -> D♭♭_4      上行             0            [  0, 2 ]        [  0, 0  ]
	// C_4 -> C♭♭_4      下行            -2            [  0, 1 ]        [ -1, 10 ]
	let semitoneGap = note2.pitchValue - note1.pitchValue
	const note1StepRadix = StepRadix.fromArray([note1.octave, note1.step])
	const note2StepRadix = StepRadix.fromArray([note2.octave, note2.step])
	// deal with the parallel relationship.
	if (semitoneGap === 0) {
		const intervalGap = Math.abs(note1StepRadix.getGap(note2StepRadix)) + 1
		const findIntervalObj = intervalMeta.where("semitoneGap", 0).where("num", intervalGap).first()
		if (findIntervalObj) return new Interval(findIntervalObj.type as t_intervalType, findIntervalObj.num)
		throw new IntervalError("Parallel but not fit interval.")
	}
	// if the semitoneGap is negative, flip it around first.
	semitoneGap = Math.abs(semitoneGap)
	const semitoneGapArr = new SemitoneRadix(semitoneGap).twoDigitArray
	const stepGapArr = new Base7Radix(Math.abs(note1StepRadix.getGap(note2StepRadix))).twoDigitArray
	let semitoneWithinOctave = semitoneGapArr[1]
	if (stepGapArr[0] !== semitoneGapArr[0]) {
		semitoneWithinOctave = semitoneGapArr[1] + 12 * (semitoneGapArr[0] - stepGapArr[0])
	}
	const findIntervalObj = intervalMeta.where("semitoneGap", semitoneWithinOctave).where("num", stepGapArr[1] + 1).first()
	if (findIntervalObj) {
		return new Interval(findIntervalObj.type as t_intervalType, stepGapArr[0] * 7 + stepGapArr[1] + 1)
	}
	throw new IntervalError("Cannot find the interval.")
}
export {getIntervalByComparingNotes}
export default getIntervalByComparingNotes
