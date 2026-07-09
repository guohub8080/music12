import { defaultTo } from 'es-toolkit/compat'
import {Note} from "../cls/NoteClass";
import NOTE_META from "../static/NOTE_META";
import {T_AlterValue, T_NoteStep} from "@common/static/NOTE_TYPES";
import normalizeOctave from "./normalizeOctave";

/**
 * 获取黑键随机音符
 *
 * 从黑键音符中随机选择一个。
 *
 * @param options 配置选项
 * @param options.octave 八度数或八度数组，默认 4
 * @param options.isNormal 是否只选常用音符，默认 true
 *                         - true: C#, D#, F#, G#, A#（5 个常用黑键）
 *                         - false: 包含 B##, E## 等极端变体
 * @returns 随机黑键音符
 *
 * @example
 * getBlackRandomNote()                  // 随机常用黑键（C#, Eb, F#, G#, Bb）
 * getBlackRandomNote({ octave: 5 })     // 八度 5 的随机黑键
 * getBlackRandomNote({ isNormal: false }) // 可能包含 C## 等
 */
export default (options?: { octave?: number | number[], isNormal?: boolean }): InstanceType<typeof Note> => {
  const isNormal = defaultTo(options?.isNormal, true)
  if (isNormal) {
    const noteObj = NOTE_META.where("isBlack", true).where("isNormal", true).random()
    return new Note(noteObj.step as T_NoteStep, noteObj.alter as T_AlterValue, normalizeOctave(options?.octave))
  }
  const noteObj = NOTE_META.where("isBlack", true).random()
  return new Note(noteObj.step as T_NoteStep, noteObj.alter as T_AlterValue, normalizeOctave(options?.octave))
}
