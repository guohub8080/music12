// noinspection ES6PreferShortImport

import {Note} from "../../../note/cls/NoteClass";
import {t_scaleIntervalPanel, t_scaleMode} from "../../static/types";
import modeMeta from "../../static/modeMeta";
import collect from "collect.js";
import {ScaleError} from "../../../common/processError/errorTypes";
import {Interval} from "../../../interval/cls/IntervalClass";
import {t_intervalList, t_intervalType} from "../../../interval/static/types.ts";

export default (rootNote: InstanceType<typeof Note>,
                scaleMode: t_scaleMode = "MAJ") => {
  // find scale obj
  let modeName = scaleMode.trim().toUpperCase()
  if (modeName === "AEO") modeName = "MIN"
  else if (modeName === "ION") modeName = "MAJ"
  const findModeObj = collect(modeMeta).where("uid", modeName).first()
  if (!findModeObj) {
    throw new ScaleError("Cannot find the scale mode, please check.")
  }
  const type = findModeObj.type
  // make intervalPanel & notes list.
  const intervalPanel = {}
  const notesList = [rootNote]
  try {
    findModeObj.intervalList.forEach(x => {
      intervalPanel[x[1]] = x[0]
      const intervalInstance = new Interval(x[0] as t_intervalType, x[1] as number)
      const targetNote = rootNote.getNoteByInterval(intervalInstance)
      notesList.push(targetNote)
    })
  } catch {
    throw new ScaleError("Maybe the root note is not fit for the scale.")
  }
  let staveAlters = 0
  let staveAlterTimes = 0
  notesList.forEach(x => {
    if (x.alter > 0) {
      staveAlterTimes += 1
      staveAlters += x.alter
    } else if (x.alter < 0) {
      staveAlterTimes -= 1
      staveAlters += x.alter
    }
  })
  return {
    intervalPanel,
    notesList,
    includedAlters: staveAlters,
    staveAlterTimes,
    type,
    intervalList: findModeObj.intervalList as any,
    modeName: findModeObj.name,
    modeUID: findModeObj.uid,
    description: findModeObj.description,
    chord3OfDegreesList: findModeObj.chord3OfDegreesList,
    chord7OfDegreesList: findModeObj.chord7OfDegreesList,
  }
}
