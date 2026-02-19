// noinspection ES6PreferShortImport

import {t_chordNotesPanel, t_intervalPanel} from "../../static/types.ts";
import {keys} from "lodash";
import {Note} from "../../../note";
import {Interval} from "../../../interval/cls/IntervalClass.ts";
import {t_intervalType} from "../../../interval/static/types.ts";
import {ChordError} from "../../../common/processError/errorTypes.ts";

const cls_getNotesPanel = (rootNote: InstanceType<typeof Note>,
                           intervalPanel: t_intervalPanel): t_chordNotesPanel => {
  const targetNotesPanel: t_chordNotesPanel = {
    1: rootNote, 2: void 0,
    3: void 0, 4: void 0, 5: void 0,
    6: void 0, 7: void 0, 9: void 0,
    11: void 0, 13: void 0
  }
  const dealPush = (intervalType: void | t_intervalType, intervalNum: number, key: string) => {
    const targetInterval = new Interval(intervalType as t_intervalType, intervalNum)
    targetNotesPanel[key] = rootNote.getNoteByInterval(targetInterval)
  }
  for (const i_key of keys(intervalPanel)) {
    if (!intervalPanel[i_key]) continue
    switch (i_key as string) {
      case "2":
        dealPush(intervalPanel[i_key], 2, i_key)
        continue
      case "3":
        dealPush(intervalPanel[i_key], 3, i_key)
        continue
      case "4":
        dealPush(intervalPanel[i_key], 4, i_key)
        continue
      case "5":
        dealPush(intervalPanel[i_key], 5, i_key)
        continue
      case "6":
        dealPush(intervalPanel[i_key], 6, i_key)
        continue
      case "7":
        dealPush(intervalPanel[i_key], 7, i_key)
        continue
      case "9":
        dealPush(intervalPanel[i_key], 9, i_key)
        continue
      case "11":
        dealPush(intervalPanel[i_key], 11, i_key)
        continue
      case "13":
        dealPush(intervalPanel[i_key], 13, i_key)
        continue
      default :
        throw new ChordError("Please check chord intervals.")
    }
  }
  return targetNotesPanel
}

export default cls_getNotesPanel