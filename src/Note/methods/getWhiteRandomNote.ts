import {Note} from "../cls/NoteClass.ts";
import NOTE_META from "../static/NOTE_META.ts";
import {T_AlterValue, T_NoteStep} from "../../common/static/NOTE_TYPES.ts";
import {defaultTo} from "lodash";
import normalizeOctave from "./normalizeOctave.ts";

/**
 * 获取白键随机音符
 *
 * 从白键音符中随机选择一个。
 *
 * @param options 配置选项
 * @param options.octave 八度数或八度数组，默认 4
 * @param options.isNormal 是否只选常用音符，默认 true
 *                         - true: C, D, E, F, G, A, B（7 个自然音）
 *                         - false: 包含 Cb, Fb, E#, B# 等非常用白键
 * @returns 随机白键音符
 *
 * @example
 * getWhiteRandomNote()                  // 随机自然音（C-B）
 * getWhiteRandomNote({ octave: 5 })     // 八度 5 的随机自然音
 * getWhiteRandomNote({ isNormal: false }) // 可能是 Cb, F# 等
 */
export default (options?: { octave?: number | number[], isNormal?: boolean }): InstanceType<typeof Note> => {
  const isNormal = defaultTo(options?.isNormal, true)
  if (isNormal) {
    // uid 1-7 对应 C, D, E, F, G, A, B
    const noteObj = NOTE_META.where("uid", "<=", 7).random()
    return new Note(noteObj.step as T_NoteStep, noteObj.alter as T_AlterValue, normalizeOctave(options?.octave))
  }
  const noteObj = NOTE_META.where("isBlack", false).random()
  return new Note(noteObj.step as T_NoteStep, noteObj.alter as T_AlterValue, normalizeOctave(options?.octave))
}
