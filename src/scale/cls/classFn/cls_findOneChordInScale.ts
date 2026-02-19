import {ScaleRadix} from "../../../common/radix";
import {Note} from "../../../note";
import collect from "collect.js";
import findChordMeta from "../../../chord/static/findChordMeta.ts";
import {isEmpty, isEqual} from "lodash";
import {ChordError} from "../../../common/processError/errorTypes.ts";
import chordMeta from "../../../chord/static/chordMeta.ts";

const cls_findOneChordInScale = (
  notesList: InstanceType<typeof Note>[],
  scaleDegree: number,
  isChord3: boolean) => {
  const scaleRadix = new ScaleRadix(scaleDegree)
  let selectedDegreeList: number[] = [scaleRadix.scaleDegree,
    scaleRadix.add(2).scaleDegree,
    scaleRadix.add(4).scaleDegree]
  if (!isChord3) selectedDegreeList = [...selectedDegreeList, scaleRadix.add(6).scaleDegree]
  const notesLocationList = selectedDegreeList.map(x => {
    return notesList[x - 1].locationId
  })
  const findObj = collect(findChordMeta).filter(x => {
    return isEqual(x.notesLocationList, notesLocationList)
  }).first()
  if (isEmpty(findObj)) throw new ChordError(`No such chord.`)
  return findObj.chordKey
}

export default cls_findOneChordInScale