import {Scale} from "../../scale/cls/ScaleClass.ts";
import {FactoryError} from "../../common/processError/errorTypes.ts";
import {getNote} from "./getNote.ts";

export const getScale = (step: string, alter: number, octave: number, mode: string) => {
  try {
    const rootNote = getNote(step, alter, octave)
    return new Scale(rootNote, mode.trim().toUpperCase() as any)
  } catch (e) {
    throw new FactoryError(e.message)
  }
}