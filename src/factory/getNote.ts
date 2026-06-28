import {FactoryError} from "@common/processError/errorTypes";
import {STEP_LIST, T_NoteStep, T_AlterValue} from "@common/static/NOTE_TYPES";
import {Note} from "@note";

export const getNote = (step: string, alter: number, octave = 5) => {
  const noteStep = step.trim().toUpperCase();
  if (!STEP_LIST.includes(noteStep as T_NoteStep)) throw new FactoryError("Invalid step.")
  if (Math.abs(alter) > 2) throw new FactoryError("Invalid alter.")
  return new Note(noteStep as T_NoteStep, alter as T_AlterValue, octave)
}
