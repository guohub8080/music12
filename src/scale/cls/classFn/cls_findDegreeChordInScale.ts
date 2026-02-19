import {Note} from "../../../note";
import {ScaleError} from "../../../common/processError/errorTypes.ts";
import cls_findOneChordInScale from "./cls_findOneChordInScale.ts";
import {range} from "lodash";

const cls_findDegreeChordInScale = (
  notesList: InstanceType<typeof Note>[],
  isChord3: boolean
) => {
  if (notesList && notesList.length !== 7) throw new ScaleError("This function only support the scale containing 7 notes.")
  // const locationList = notesList.map(x => x.locationId)
  return range(7).map(x => cls_findOneChordInScale(notesList, x + 1, isChord3))
}

export default cls_findDegreeChordInScale