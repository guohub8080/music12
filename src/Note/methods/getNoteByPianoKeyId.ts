import {Note} from "../cls/NoteClass";
import NOTE_META from "../static/NOTE_META";
import {T_AlterValue, T_NoteStep} from "@common/static/NOTE_TYPES";
import range from "lodash/range"
import defaultTo from "lodash/defaultTo"
/**
 * 根据钢琴键 ID 获取音符
 *
 * 默认返回**最简表示**的音符：
 * - 白键（C/D/E/F/G/A/B）：返回 1 个（自身，如 C 不含 B♯）
 * - 黑键（C#/Eb/F#/Ab/Bb）：返回 2 个（升/降复杂度相同，如 C♯ 和 D♭）
 *
 * 设置 `isComplexIncluded: true` 可额外返回复杂等音（B♯/F♭/E♯/C♭ 等），
 * 即取出该 pianoKeyId 的全部等音异名。
 *
 * @param pianoKeyId 钢琴键 ID（0-11，C=0, C#=1, ..., B=11）
 * @param config 配置选项
 * @param config.octave 八度数，默认 4
 * @param config.isComplexIncluded 是否包含复杂等音（默认 false，只返回最简）
 * @returns 该位置的音符数组
 *
 * @example
 * getNoteByPianoKeyId(0)                              // [C4]（白键最简）
 * getNoteByPianoKeyId(1)                              // [C♯4, D♭4]（黑键最简）
 * getNoteByPianoKeyId(0, { isComplexIncluded: true }) // [C4, B♯4]（含复杂等音）
 * getNoteByPianoKeyId(1, { octave: 5 })               // [C♯5, D♭5]
 */
export default (pianoKeyId: number,
                config?: { octave?: number; isComplexIncluded?: boolean }): InstanceType<typeof Note>[] => {
  if (!range(12).includes(pianoKeyId)) throw new Error("pianoKeyId must be between 0 and 11.")
  const octave = defaultTo(config?.octave, 4)
  const isComplexIncluded = defaultTo(config?.isComplexIncluded, false)

  let query = NOTE_META.where("pianoKeyId", pianoKeyId)
  // 默认只取最简表示（isNormal=true），开启 isComplexIncluded 则取全部
  if (!isComplexIncluded) {
    query = query.where("isNormal", true)
  }
  return query.all().map(x => {
    return new Note(x.step as T_NoteStep, x.alter as T_AlterValue, octave)
  })
}

