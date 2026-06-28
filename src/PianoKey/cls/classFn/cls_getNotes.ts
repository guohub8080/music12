import { isDefined } from "@common/utils/isDefined"
import NOTE_META from "@note/static/NOTE_META"
import { T_NoteStep, T_AlterValue } from "@common/static/NOTE_TYPES"
import { Note } from "@note/cls/NoteClass"
import defaultTo from "lodash/defaultTo"
import isNil from "lodash/isNil"
import type { PianoKey } from "../PianoKeyClass"

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
  if (isDefined(alterLimit)) {
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
