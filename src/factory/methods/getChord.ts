import {t_inputTransformPanel} from "../../chord/static/types.ts";
import {Note} from "../../note";
import {Chord} from "../../chord/cls/ChordClass.ts";

export const getChord = (step: string, alter: number, octave: number,
                         chordKey: string, transformPanel?: t_inputTransformPanel) => {
  const rootNote = new Note(step as any, alter as any, octave)
  return new Chord(rootNote, chordKey, transformPanel)
}