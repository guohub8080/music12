import {FactoryError} from "@common/processError/errorTypes";
import {getNote} from "./getNote";
import {Chord} from "@chord";

/**
 * 快捷创建 Chord 实例
 *
 * Chord 构造函数接受 pianoKeyId，此函数提供更直观的音名+变音快捷方式。
 * octave 参数无意义（Chord 只用 pianoKeyId 0-11），已移除。
 */
export const getChord = (step: string, alter: number, chordFormulaId: string) => {
  try {
    const rootNote = getNote(step, alter)
    return new Chord(rootNote.pianoKeyId, chordFormulaId)
  } catch (e) {
    throw new FactoryError(e.message)
  }
}
