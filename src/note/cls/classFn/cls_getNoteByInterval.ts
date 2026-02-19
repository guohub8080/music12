import {isNull, isUndefined} from "lodash";
import {IntervalError, NoteError} from "../../../common/processError/errorTypes";
import {SemitoneRadix, StepRadix} from "../../../common/radix";
import {Interval} from "../../../interval";
import {Note} from "../../index";
import noteMeta from "../../static/noteMeta";
import {t_alterValue, t_noteStep} from "../../static/types";

export default (noteInstance: InstanceType<typeof Note>,
                intervalInstance: InstanceType<typeof Interval>,
                isAscending = true): InstanceType<typeof Note> => {
	if (isUndefined(intervalInstance) || isNull(intervalInstance)) throw new IntervalError("Interval is empty.")
	if (isUndefined(noteInstance) || isNull(noteInstance)) throw new NoteError("Note is empty.")
	const baseNoteStepRadix = StepRadix.fromArray([noteInstance.octave, noteInstance.step])
	const baseNoteSemitoneRadix = new SemitoneRadix(noteInstance.semitoneWithinOctave)
	const targetStepRadix = isAscending ?
		baseNoteStepRadix.add(intervalInstance.num - 1) :
		baseNoteStepRadix.add((intervalInstance.num - 1) * -1)
	const targetSemitoneRadix = isAscending ?
		baseNoteSemitoneRadix.add(intervalInstance.semitoneGap) :
		baseNoteSemitoneRadix.add(intervalInstance.semitoneGap * -1)
	const findBaseNoteObj = noteMeta.where("step",
		targetStepRadix.step).where("locationId",
		targetSemitoneRadix.location).first()
	if (!Boolean(findBaseNoteObj)) {
		throw new NoteError("No fit note from base note by the given interval.")
	}
	return new Note(findBaseNoteObj.step as t_noteStep,
		findBaseNoteObj.alter as t_alterValue,
		targetStepRadix.octave)
}
