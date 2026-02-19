// noinspection ES6PreferShortImport
import {Note} from "../cls/NoteClass.ts";
import noteMeta from "../static/noteMeta.ts";
import {t_alterValue, t_noteStep} from "../static/types.ts";
import {isArray, isNumber, range} from "lodash";
import collect from "collect.js";
import byDefault from "../../common/utils/byDefault.ts";
// if a number is given then it should be the octave.
// if a number array is given then a number should be selected randomly from the array.
const dealOctave = (octave: number | number[] = 4): number => {
  if (isNumber(octave)) return octave as number
  if (isArray(octave)) {
    const a = collect(octave).random()
    if (isNumber(a)) return a
    throw new Error("Octave inputs must be number type!")
  }
  return -1
}

export const getCasualRandomNote = (octave: number | number[] = 4) => {
  const noteObj = noteMeta.random()
  return new Note(noteObj.step as t_noteStep, noteObj.alter as t_alterValue, dealOctave(octave))
}

export const getWhiteRandomNote = (octave: number | number[] = 4, isNormal = true) => {
  if (isNormal) {
    const noteObj = noteMeta.where("uid", "<=", 7).random()
    return new Note(noteObj.step as t_noteStep, noteObj.alter as t_alterValue, dealOctave(octave))
  }
  const noteObj = noteMeta.where("isBlack", false).random()
  return new Note(noteObj.step as t_noteStep, noteObj.alter as t_alterValue, dealOctave(octave))
}

export const getBlackRandomNote = (octave: number | number[] = 4, isNormal = true) => {
  if (isNormal) {
    const noteObj = noteMeta.where("isBlack", true).where("isNormal", true).random()
    return new Note(noteObj.step as t_noteStep, noteObj.alter as t_alterValue, dealOctave(octave))
  }
  const noteObj = noteMeta.where("isBlack", true).random()
  return new Note(noteObj.step as t_noteStep, noteObj.alter as t_alterValue, dealOctave(octave))
}

export const getNormalRandomNote = (octave: number | number[] = 4) => {
  const noteObj = noteMeta.where("isNormal", true).random()
  return new Note(noteObj.step as t_noteStep, noteObj.alter as t_alterValue, dealOctave(octave))
}

export const getNoteByLocation = (location: number,
                                  octave?: number): InstanceType<typeof Note>[] => {
  if (!range(12).includes(location)) throw new Error("location must be in range of 0 - 11.")
  const defaultOctave = byDefault(octave, 4)
  return noteMeta.where("isNormal", true)
    .where("locationId", location)
    .all().map(x => {
      return new Note(x.step as t_noteStep, x.alter as t_alterValue, defaultOctave)
    })
}



