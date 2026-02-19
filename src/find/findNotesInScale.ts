import collect from "collect.js";
import findScale from "../scale/static/findScale.ts";
import {isEmpty} from "lodash";

const findNotesInScale = (notesList:
                          { location: number, as: number }[]) => {
  let findHandle = collect(findScale)
  for (const x of notesList) {
    if ([0, 1, 8].includes(x.as)) {
      findHandle = findHandle.where("rootNoteLocation", x.location)
    } else if ([2, 9].includes(x.as)) {
      findHandle = findHandle.where("n2L", x.location)
    } else if ([3, 10].includes(x.as)) {
      findHandle = findHandle.where("n3L", x.location)
    } else if ([4, 11].includes(x.as)) {
      findHandle = findHandle.where("n4L", x.location)
    } else if ([5, 12].includes(x.as)) {
      findHandle = findHandle.where("n5L", x.location)
    } else if ([6, 13].includes(x.as)) {
      findHandle = findHandle.where("n6L", x.location)
    } else if ([7, 14].includes(x.as)) {
      findHandle = findHandle.where("n7L", x.location)
    }
  }
  const findObj = findHandle.all()
  if (isEmpty(findObj)) return []
  return findObj
}

export default findNotesInScale