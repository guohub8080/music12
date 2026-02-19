import chordKeys from "../chord/static/chordKeys.ts";
import collect from "collect.js";
import findChordMeta from "../chord/static/findChordMeta.ts";
import {isArray, isNumber, isEqual, intersection, isNull, isUndefined, isEmpty, isString} from "lodash";
import byDefault from "../common/utils/byDefault.ts";
import findScale from "../scale/static/findScale.ts";

export const findChordInScale = (locationListOfChord: number[],
                                 limitMode?: string | string[]) => {
  let findScaleHandle = collect(findScale).filter(x => {
    return intersection(x.notesLocationList, locationListOfChord).length === locationListOfChord.length
  })
  if (isString(limitMode)) {
    findScaleHandle = findScaleHandle.filter(x => {
      return x.mode === limitMode
    })
  } else if (isArray(limitMode)) {
    findScaleHandle = findScaleHandle.filter(x => {
      return limitMode.includes(x.mode)
    })
  }
  const findScaleObj = findScaleHandle.all()
  if (isEmpty(findScaleObj)) return []
  return findScaleObj
}
export default findChordInScale