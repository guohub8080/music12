import isArray from "lodash/isArray"
import min from "lodash/min"
import sortBy from "lodash/sortBy"
import uniq from "lodash/uniq"
/**
 * MIDI 列表转换结果
 */
export type I_MidiListToPianoKeysResult = {
  /** 最低的 pianoKeyId（可能是根音） */
  lowestPianoKeyId: number
  /** 去重排序后的 pianoKeyId 列表 */
  sortedPianoKeyIdList: number[]
}

/**
 * 将 MIDI 列表转换为 PianoKeyId 列表并去重
 *
 * ### 防御性检查
 * - 输入必须是数组
 * - 至少需要 3 个不同的音才能构成和弦
 *
 * @param midiPitchList - MIDI 音高列表（如 [60, 64, 67]）
 * @returns 包含最低 lowestPianoKeyId 和去重排序后列表的对象
 *
 * @example
 * midiListToPianoKeys([60, 64, 67])
 * // → { lowestPianoKeyId: 0, sortedPianoKeyIdList: [0, 4, 7] }
 *
 * midiListToPianoKeys([64, 67, 72])
 * // → { lowestPianoKeyId: 4, sortedPianoKeyIdList: [4, 7, 0] }
 */
export const midiListToPianoKeys = (midiPitchList: number[]): I_MidiListToPianoKeysResult => {
  // ===== 防御性检查：输入验证 =====

  if (!isArray(midiPitchList)) {
    throw new Error("Input must be an array.")
  }

  if (midiPitchList.length < 3) {
    throw new Error("Input must contain at least 3 notes.")
  }

  // ===== 步骤 1：找到最低的 pianoKeyId（可能是根音） =====

  const lowestPianoKeyId = min(midiPitchList) % 12

  // ===== 步骤 2：计算 pianoKeyId 列表并去重排序 =====

  const sortedPianoKeyIdList = sortBy(uniq(midiPitchList.map(x => x % 12)))

  // 检查去重后的音数（至少需要 3 个不同的音）
  if (sortedPianoKeyIdList.length < 3) {
    throw new Error("Input must contain at least 3 unique notes.")
  }

  return { lowestPianoKeyId, sortedPianoKeyIdList }
}
