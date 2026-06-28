import {FactoryError} from "@common/processError/errorTypes";
import {getNote} from "./getNote";
import {Scale} from "@scale";
import {T_ScaleModeId} from "@scale/static/scaleModeTypes";

/**
 * 快捷创建 Scale 实例
 *
 * Scale 构造函数接受 pianoKeyId，此函数提供更直观的音名+变音快捷方式。
 * octave 参数无意义（Scale 只用 pianoKeyId 0-11），已移除。
 */
export const getScale = (step: string, alter: number, mode: string) => {
  try {
    const rootNote = getNote(step, alter)
    return new Scale(rootNote.pianoKeyId, mode.trim().toUpperCase() as T_ScaleModeId)
  } catch (e) {
    throw new FactoryError(e.message)
  }
}
