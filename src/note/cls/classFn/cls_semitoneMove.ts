import {Note} from "../../index";
import {Base12Radix, SemitoneRadix} from "../../../common/radix";
import collect from "collect.js";
import {isUndefined} from "lodash";

const cls_semitoneMove = (noteInstance: InstanceType<typeof Note>,
                          moveStep: number) => {
  if (moveStep === 0) return noteInstance
  const originSemitoneRadix = new SemitoneRadix(noteInstance.pitchValue)
  const endSemitoneRadix = originSemitoneRadix.add(moveStep)
  const notesInfoList = endSemitoneRadix.getKeyboardNotes(1)
  const findZeroAlterNote = collect(notesInfoList).where("isNormal", true).where("alter", 0).first()
  if (!isUndefined(findZeroAlterNote)) {
    return new Note(findZeroAlterNote.step, findZeroAlterNote.alter, endSemitoneRadix.octave)
  }
  if (moveStep > 0) {
    const findSharpNote = collect(notesInfoList).where("isNormal", true).where("alter", ">", 0).first()
    return new Note(findSharpNote.step, findSharpNote.alter, endSemitoneRadix.octave)
  }
  const findFlatNote = collect(notesInfoList).where("isNormal", true).where("alter", "<", 0).first()
  return new Note(findFlatNote.step, findFlatNote.alter, endSemitoneRadix.octave)


}
export default cls_semitoneMove