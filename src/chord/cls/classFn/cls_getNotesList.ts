// noinspection ES6PreferShortImport

import {t_intervalPanel} from "../../static/types.ts";
import {keys} from "lodash";
import {Note} from "../../../note";
import {Interval} from "../../../interval/cls/IntervalClass.ts";
import {t_intervalType} from "../../../interval/static/types.ts";
import {ChordError} from "../../../common/processError/errorTypes.ts";

const cls_getNotesList = (rootNote: InstanceType<typeof Note>,
                          intervalPanel: t_intervalPanel): InstanceType<typeof Note>[] => {
  const targetNotesList = [rootNote]
  const dealPush = (intervalType: any, intervalNum: number) => {
    const targetInterval = new Interval(intervalType as t_intervalType, intervalNum)
    const pushNote = rootNote.getNoteByInterval(targetInterval)
    targetNotesList.push(pushNote)
  }
  for (const i_key of keys(intervalPanel)) {
    if (!intervalPanel[i_key]) continue
    switch (i_key as string) {
      case "2":
        dealPush(intervalPanel[i_key], 2)
        continue
      case "3":
        dealPush(intervalPanel[i_key], 3)
        continue
      case "4":
        dealPush(intervalPanel[i_key], 4)
        continue
      case "5":
        dealPush(intervalPanel[i_key], 5)
        continue
      case "6":
        dealPush(intervalPanel[i_key], 6)
        continue
      case "7":
        dealPush(intervalPanel[i_key], 7)
        continue
      case "9":
        dealPush(intervalPanel[i_key], 9)
        continue
      case "11":
        dealPush(intervalPanel[i_key], 11)
        continue
      case "13":
        dealPush(intervalPanel[i_key], 13)
        continue
      default :
        throw new ChordError("Please check chord intervals.")
    }
  }
  return targetNotesList
}

export default cls_getNotesList