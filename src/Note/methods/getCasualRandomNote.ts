import {Note} from "../cls/NoteClass";
import NOTE_META from "../static/NOTE_META";
import {T_AlterValue, T_NoteStep} from "@common/static/NOTE_TYPES";
import normalizeOctave from "./normalizeOctave";

/**
 * 获取任意随机音符
 *
 * 从所有 35 个可能的音符中随机选择一个（包括 C##、Fb 等极端变体）。
 *
 * @param options 配置选项
 * @param options.octave 八度数或八度数组，默认 4
 * @returns 随机音符
 *
 * @example
 * getCasualRandomNote()              // 随机音符，八度 4
 * getCasualRandomNote({ octave: 5 }) // 随机音符，八度 5
 * getCasualRandomNote({ octave: [3, 4] }) // 随机音符，八度 3 或 4
 */
export default (options?: { octave?: number | number[] }): InstanceType<typeof Note> => {
  const noteObj = NOTE_META.random()
  return new Note(noteObj.step as T_NoteStep, noteObj.alter as T_AlterValue, normalizeOctave(options?.octave))
}
