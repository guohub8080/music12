import collect from "collect.js";
import findChordMeta from "../chord/static/findChordMeta.ts";
import {isEmpty} from "lodash";

const findNotesInChord = (notesList:
                          { location: number, as: number }[]) => {
  let findHandle = collect(findChordMeta)
  for (const x of notesList) {
    if ([2, 9].includes(x.as)) {
      findHandle = findHandle.where("n9L", x.location)
    } else if ([3, 10].includes(x.as)) {
      findHandle = findHandle.where("n3L", x.location)
    } else if ([4, 11].includes(x.as)) {
      findHandle = findHandle.where("n11L", x.location)
    } else if ([5, 12].includes(x.as)) {
      findHandle = findHandle.where("n5L", x.location)
    } else if ([6, 13].includes(x.as)) {
      findHandle = findHandle.where("n13L", x.location)
    } else if ([6, 13].includes(x.as)) {
      findHandle = findHandle.where("n13L", x.location)
    } else if ([7, 14].includes(x.as)) {
      findHandle = findHandle.where("n7L", x.location)
    } else if ([8, 1].includes(x.as)) {
      findHandle = findHandle.where("rootNoteLocation", x.location)
    }
  }
  const findObj = findHandle.all()
  if (isEmpty(findObj)) return []
  return findObj
}

export default findNotesInChord