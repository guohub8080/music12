// noinspection ES6PreferShortImport

import {Note} from "../../../note/cls/NoteClass.ts";
import {t_chordNotesPanel, t_chordVoicing} from "../../static/types.ts";
import {isArray, isNumber, keys} from "lodash";
import {ChordError} from "../../../common/processError/errorTypes.ts";

const cls_getNotesListAfterVoicing = (notesPanel: t_chordNotesPanel, notesList: InstanceType<typeof Note>[],
                                      chordVoicing: t_chordVoicing): InstanceType<typeof Note>[] => {
  if (keys(chordVoicing.octaveConfigs).length === 0) {
    return [...notesList, ...chordVoicing.additionalNotes]
  }
  const resultNotesList = []
  for (const i_key of keys(chordVoicing.octaveConfigs)) {
    if (notesPanel[i_key]) {
      if (isArray(chordVoicing.octaveConfigs[i_key])) {
        for (const x_key of chordVoicing.octaveConfigs[i_key]) {
          const needAddNote = new Note(notesPanel[i_key].step, notesPanel[i_key].alter, x_key)
          resultNotesList.push(needAddNote)
        }
      } else if (isNumber(chordVoicing.octaveConfigs[i_key])) {
        const needAddNote = new Note(notesPanel[i_key].step, notesPanel[i_key].alter, chordVoicing.octaveConfigs[i_key])
        resultNotesList.push(needAddNote)
      } else {
        throw new ChordError("Please check the octave config format.")
      }
    } else {
      if (i_key === "R") throw new ChordError(`Octave config key "R" is wrong. Use "1" instead.`)
      throw new ChordError(`Octave config key of "${i_key}" doesn't exists.`)
    }
  }
  return [...resultNotesList, ...chordVoicing.additionalNotes]
}

export default cls_getNotesListAfterVoicing