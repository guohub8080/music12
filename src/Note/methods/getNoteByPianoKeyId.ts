import {Note} from "../cls/NoteClass.ts";
import NOTE_META from "../static/NOTE_META.ts";
import {T_AlterValue, T_NoteStep} from "../../common/static/NOTE_TYPES.ts";
import {range, defaultTo} from "lodash";

/**
 * 根据钢琴键 ID 获取音符
 *
 * 获取指定钢琴键位置上的所有常用音符（每个位置最多 2 个等音异名）。
 *
 * @param pianoKeyId 钢琴键 ID（0-11，C=0, C#=1, ..., B=11）
 * @param options 配置选项
 * @param options.octave 八度数，默认 4
 * @returns 该位置上的所有常用音符数组
 *
 * @example
 * getNoteByPianoKeyId(0)                    // [Note(C,0,4), Note(B#,1,4)]
 * getNoteByPianoKeyId(1)                    // [Note(C#,1,4), Note(Db,-1,4)]
 * getNoteByPianoKeyId(1, { octave: 5 })     // [Note(C#,1,5), Note(Db,-1,5)]
 */
export default (pianoKeyId: number,
                options?: { octave?: number }): InstanceType<typeof Note>[] => {
  if (!range(12).includes(pianoKeyId)) throw new Error("pianoKeyId must be between 0 and 11.")
  const octave = defaultTo(options?.octave, 4)
  return NOTE_META.where("isNormal", true)
    .where("pianoKeyId", pianoKeyId)
    .all().map(x => {
      return new Note(x.step as T_NoteStep, x.alter as T_AlterValue, octave)
    })
}
