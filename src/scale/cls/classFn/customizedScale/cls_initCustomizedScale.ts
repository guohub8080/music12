// noinspection ES6PreferShortImport

import {Note} from "../../../../note/cls/NoteClass.ts";
import {Interval} from "../../../../interval/cls/IntervalClass.ts";
import {t_scaleIntervalPanel, t_scaleNotesPanel} from "../../../static/types.ts";
import {range} from "lodash";
import {t_alterValue} from "../../../../note/static/types.ts";

const cls_initCustomizedScale = (rootNote: InstanceType<typeof Note>, intervalPanel: t_scaleIntervalPanel): {
  notesPanel: t_scaleNotesPanel,
  scaleLength: number,
  alterList: t_alterValue[]
} => {
  const result = {1: rootNote}
  const alterList = rootNote.alter === 0 ? [] : [rootNote.alter]
  let scaleLength = 1
  for (const i of range(2, 8)) {
    if (intervalPanel[i]) {
      const targetInterval = new Interval(intervalPanel[i], i)
      const targetNote = rootNote.getNoteByInterval(targetInterval)
      scaleLength += 1
      result[i] = targetNote
      if (targetNote.alter !== 0) alterList.push(targetNote.alter)
    } else result[i] = void 0
  }
  return {scaleLength, alterList, notesPanel: result}
}
export default cls_initCustomizedScale