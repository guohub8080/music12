// noinspection ES6PreferShortImport

import {IntervalRadix} from "../../../common/radix/intervalRadix.ts";
import {Note} from "../../../note/cls/NoteClass.ts";

const cls_getNoteByIntervalNum = (notesList: InstanceType<typeof Note>[],
                                  num: number,
                                  isWithinOctave = false): InstanceType<typeof Note> => {
	const intervalNumList = new IntervalRadix(num).twoDigitArray
	if (intervalNumList[0] === 0 || isWithinOctave) return notesList[intervalNumList[1] - 1]
	const targetNote = notesList[intervalNumList[1]]
	const newOctave = intervalNumList[0] + targetNote.octave
	return new Note(targetNote.step, targetNote.alter, newOctave)
}

export default cls_getNoteByIntervalNum
