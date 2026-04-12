import collect from "collect.js"
import ALL_CHORD_INSTANCE_META from "../../../Chord/static/ALL_CHORD_INSTANCE_META.ts"
import {I_ChordInstanceMeta} from "../../../Chord/static/types.ts"
import {isEqual, isEmpty} from "lodash"

/**
 * 查找预设和弦返回结果
 */
export type I_FindPresetChordResult = I_ChordInstanceMeta & {
  /** 是否为原位和弦（根音等于最低音） */
  isRootPosition: boolean
}

/**
 * 查找预设和弦（严格匹配）
 *
 * 根据给定的钢琴键列表查找完全匹配的预设和弦。
 * 只返回 pianoKeyIdsSorted 与输入完全相同的和弦。
 *
 * @param pianoKeyIdList - 钢琴键 ID 列表（0-11），已排序
 * @param rootNotePianoKeyId - 根音钢琴键 ID（0-11），通常是最低音
 * @returns 匹配的和弦实例元数据数组
 *
 * @example
 * ```ts
 * // 查找 [0, 4, 7] 对应的所有和弦
 * findPresetChord([0, 4, 7], 0)
 * // → [{ pianoKeyIdRoot: 0, chordFormulaId: "maj3", isRootPosition: true, ... }, ...]
 * ```
 */
export const findPresetChord = (
  pianoKeyIdList: number[],
  rootNotePianoKeyId: number
): I_FindPresetChordResult[] => {
  // 使用 collect.js 创建集合查询句柄
  const result = collect(ALL_CHORD_INSTANCE_META)
    .filter(x => isEqual(pianoKeyIdList, x.pianoKeyIdsSorted))
    .all().map(x => {
      return {...x, isRootPosition: x.pianoKeyIdRoot === rootNotePianoKeyId}
    })

  if (isEmpty(result)) return []
  return result
}

export default findPresetChord
