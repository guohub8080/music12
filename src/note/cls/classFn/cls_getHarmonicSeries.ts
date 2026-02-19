import {Interval} from "../../../interval/cls/IntervalClass";
import {t_intervalType} from "../../../interval/static/types";
import {t_alterValue, t_noteStep} from "../../static/types";
import {Note} from "../NoteClass";

const overtoneSeriesIntervalList: [t_intervalType, number][] = [
  ["p", 8], ["p", 5], ["p", 4], ["maj", 3], ["min", 3], ["min", 3], ["maj", 2],
  ["maj", 2], ["maj", 2], ["maj", 2], ["min", 2], ["maj", 2], ["min", 2], ["aug", 1], ["min", 2]]


export default (step: t_noteStep, alter: t_alterValue, octave: number): {
  step: t_noteStep,
  alter: t_alterValue,
  locationID: number,
  artName: string
}[] => {
  let arr = []
  if (Math.abs(alter) > 1) return arr
  let baseNote = new Note(step, alter, octave)
  for (let i of overtoneSeriesIntervalList) {
    const intervalObj = new Interval(i[0], i[1])
    try {
      const targetNote = baseNote.getNoteByInterval(intervalObj)
      baseNote = new Note(targetNote.step, targetNote.alter, octave)
      arr.push({
        step: targetNote.step,
        alter: targetNote.alter,
        locationID: targetNote.locationId,
        artName: targetNote.artName
      })
    } catch (e) {
      arr.push(void 0)
    }
  }
  return arr
}
