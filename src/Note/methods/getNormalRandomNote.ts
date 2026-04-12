import {Note} from "../cls/NoteClass.ts";
import NOTE_META from "../static/NOTE_META.ts";
import {T_AlterValue, T_NoteStep} from "../../common/static/NOTE_TYPES.ts";
import normalizeOctave from "./normalizeOctave.ts";

/**
 * 获取常用随机音符
 *
 * 从常用音符中随机选择一个（包括黑白键，但变化音不超过 1）。
 *
 * @param options 配置选项
 * @param options.octave 八度数或八度数组，默认 4
 * @returns 随机常用音符
 *
 * @example
 * getNormalRandomNote()              // 可能是 C, C#, Db, D, D#, Eb... 等常用音
 * getNormalRandomNote({ octave: 5 }) // 八度 5 的随机常用音
 */
export default (options?: { octave?: number | number[] }): InstanceType<typeof Note> => {
  const noteObj = NOTE_META.where("isNormal", true).random()
  return new Note(noteObj.step as T_NoteStep, noteObj.alter as T_AlterValue, normalizeOctave(options?.octave))
}
