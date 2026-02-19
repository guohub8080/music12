// noinspection ES6PreferShortImport

import {ScaleRadix} from "../../../common/radix/scaleRadix.ts";
import {Note} from "../../../note/cls/NoteClass.ts";
import {ScaleError} from "../../../common/processError/errorTypes.ts";
import findChord_old from "../../../chord/methods/findChord_old.ts";
import {Chord} from "../../../chord/cls/ChordClass.ts";

export default (scaleDegree: number, chordNum = 3,
                notesList: InstanceType<typeof Note>[],
                chordList: string[]) => {
  // if (notesList && notesList.length !== 7) throw new ScaleError("This function only support the scale containing 7 notes.")
  if (![3, 7].includes(chordNum)) throw new ScaleError("Only support chord3 and chord7.")
  const rootNoteIndex = new ScaleRadix(scaleDegree).scaleDegree - 1
  const rootNote = notesList[rootNoteIndex]
  const chordTerm = chordList[rootNoteIndex]
  return new Chord(rootNote, chordTerm)
  // let selectedDegreeList: number[] = [scaleRadix.scaleDegree,
  // 	scaleRadix.add(2).scaleDegree,
  // 	scaleRadix.add(4).scaleDegree]
  // if (chordNum === 7) selectedDegreeList.push(scaleRadix.add(6).scaleDegree)
  // const chordNotesList = selectedDegreeList.map(x => notesList[x - 1])
  // const findChordResultList = findChord(chordNotesList, "byNote", chordNotesList[0])
  // if (findChordResultList.length === 0) throw new ScaleError("No chords found.")
  // if (findChordResultList.length >= 2) throw new ScaleError("Multiple chords found.")
  // return findChordResultList[0]


}
