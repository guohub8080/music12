import chordKeys from "../chord/static/chordKeys.ts";
import collect from "collect.js";
import findChordMeta from "../chord/static/findChordMeta.ts";
import {isArray, isNumber, isEqual, intersection, isNull, isUndefined, isEmpty} from "lodash";
import byDefault from "../common/utils/byDefault.ts";

export const findChord = (
  locationList: number[],
  isStrictlyMatch?: boolean,
  rootNoteLocation?: number,
  limitType?: string[]) => {
  const isLimitType = isArray(limitType) && limitType.length > 0
  const betterLocationList = locationList.slice().sort((x, y) => x - y);
  const isRootNoteLocationRequired = isNumber(rootNoteLocation) && rootNoteLocation >= 0 && rootNoteLocation <= 11
  let handle = collect(findChordMeta)
  if (isRootNoteLocationRequired) {
    handle = handle.where("rootNoteLocation", rootNoteLocation)
  }
  if (isLimitType) {
    handle = handle.filter(x => limitType.includes(x.type))
  }
  const isStrictlyMatchJudge = byDefault(isStrictlyMatch, false)
  if (isStrictlyMatchJudge) {
    const result = handle
      .filter(x => isEqual(betterLocationList, x.orderedNotesLocationList))
      .all()
    if (isEmpty(result)) return []
    return result
  }
  const result = handle.filter(x => {
    if (isEqual(betterLocationList, x.orderedNotesLocationList)) return true
    if (x.orderedNotesLocationList.length > betterLocationList.length) {
      if (intersection(betterLocationList, x.orderedNotesLocationList).length === betterLocationList.length) return true
    }
  }).all()
  if (isEmpty(result)) return []
  return result
}
export default findChord
