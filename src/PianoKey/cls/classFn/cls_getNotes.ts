import NOTE_META from "../../../Note/static/NOTE_META.ts"
import { T_NoteStep, T_AlterValue } from "../../../common/static/NOTE_TYPES.ts"
import { Note } from "../../../Note/cls/NoteClass.ts"
import { defaultTo, isNil } from "lodash"
import type { PianoKey } from "../PianoKeyClass.ts"

/**
 * 获取该钢琴键位置的所有音符（等音异名）
 * @param pianoKey PianoKey 实例
 * @param config 配置选项
 * @param config.isNormal 是否只获取常用音符，默认 false
 * @param config.alterAbsLte 变化音绝对值上限（0, 1, 2）
 * @returns 音符数组
 */
export const cls_getNotes = (
  pianoKey: PianoKey,
  config?: { isNormal?: boolean, alterAbsLte?: 0 | 1 | 2 }
): InstanceType<typeof Note>[] => {
  let handle = NOTE_META.where("pianoKeyId", pianoKey.pianoKeyId)

  const isNormal = defaultTo(config?.isNormal, false)
  if (isNormal) handle = handle.where("isNormal", true)

  const alterLimit = config?.alterAbsLte
  if (!isNil(alterLimit)) {
    if (alterLimit < 0 || alterLimit > 2) {
      throw new Error("alterAbsLte must be 0, 1, or 2.")
    }
    handle = handle.filter(x => Math.abs(x.alter) <= alterLimit)
  }

  return handle.all().map(x => {
    const octaveOffset = x.semitone >= 12 ? -1 : (x.semitone < 0 ? 1 : 0)
    return new Note(x.step as T_NoteStep, x.alter as T_AlterValue, pianoKey.octave + octaveOffset)
  })
}

export default cls_getNotes
