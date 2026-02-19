import {FactoryError} from "../../common/processError/errorTypes.ts";
import stepList from "../../note/static/stepList.ts";
import {Note} from "../../note";
import {t_alterValue, t_noteStep} from "../../note/static/types.ts";

export const getNote = (step: string, alter: number, octave = 5) => {
  const noteStep = step.trim().toUpperCase();
  if (!stepList.includes(noteStep)) throw new FactoryError("Invalid step.")
  if (Math.abs(alter) > 2) throw new FactoryError("Invalid alter.")
  return new Note(noteStep as t_noteStep, alter as t_alterValue, octave)
}