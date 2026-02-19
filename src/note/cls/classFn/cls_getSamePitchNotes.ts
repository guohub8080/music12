// noinspection ES6PreferShortImport

import {range} from "lodash";
import {Base7Radix, StepRadix} from "../../../common/radix";
import {Note} from "../NoteClass";
import {t_alterValue} from "../../static/types";


const findNote = (step: string, octave: number, pitchValue: number, alterAbsLessThan: number) => {
	const targetNoteInstance = new Note(step as any, 0, octave)
	const pitchGap = targetNoteInstance.pitchValue - pitchValue
	if (Math.abs(pitchGap) > 2) return void 0
	if (Math.abs(pitchGap) <= alterAbsLessThan) {
		return new Note(step as any, pitchGap as t_alterValue, octave)
	}
	return void 0
}
// input: isAlterValueLessThan1 means the output note must be sharp / flat /natural
export default (givenNoteInstance: InstanceType<typeof Note>,
                isSelfIncluded = true,
                alterAbsLessThan: 0 | 1 | 2 = 2): InstanceType<typeof Note>[] => {
	if (Math.abs(alterAbsLessThan) > 2) throw new Error("Alter abs value cannot be bigger than 2!")

	const stepRadix: StepRadix = StepRadix.fromArray([givenNoteInstance.octave, givenNoteInstance.step]);
	const stepsArr: StepRadix[] = isSelfIncluded ?
		[stepRadix.add(-1), stepRadix, stepRadix.add(1)] : [stepRadix.add(-1), stepRadix.add(1)]

	const result = []

	const alterList = range(alterAbsLessThan * -1, alterAbsLessThan + 1)
	for (let i_step_radix = 0; i_step_radix < stepsArr.length; i_step_radix++) {
		for (let i_alter_value = 0; i_alter_value < alterList.length; i_alter_value++) {
			const compareNote = new Note(stepsArr[i_step_radix].step as any, alterList[i_alter_value] as any,
				stepsArr[i_step_radix].octave)
			if (compareNote.pitchValue === givenNoteInstance.pitchValue) {
				result.push(compareNote)
				break
			}
		}
	}
	return result
}
