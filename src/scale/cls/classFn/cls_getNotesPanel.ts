// noinspection ES6PreferShortImport

import {Note} from "../../../note/cls/NoteClass.ts";
import {t_intervalList} from "../../../interval/static/types.ts";
import {Interval} from "../../../interval/cls/IntervalClass.ts";
import {t_scaleNotesPanel} from "../../static/types.ts";
import {ScaleError} from "../../../common/processError/errorTypes.ts";

const cls_getNotesPanel = (rootNote: InstanceType<typeof Note>,
                           intervalList: t_intervalList[]): t_scaleNotesPanel => {
  const result = {1: rootNote}
  try {
    intervalList.forEach(intervalItem => {
      const intervalInstance = new Interval(intervalItem[0], intervalItem[1])
      result[intervalItem[1]] = rootNote.getNoteByInterval(intervalInstance)
    })
  } catch {
    throw new ScaleError("Maybe the root note is not fit for the scale.")
  }
  return result
}

export default cls_getNotesPanel