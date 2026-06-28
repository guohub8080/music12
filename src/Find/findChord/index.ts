import {midiListToPianoKeys} from "./methods/midiListToPianoKeys"
import {findRoughChord} from "./methods/findRoughChord"
import {analyzeChordTransform, type I_AnalyzedChordResult} from "./methods/analyzeChordTransform"
import {isNil} from "lodash"

// 导出类型
export type { I_ChordAlteration, I_ChordTransform, I_AnalyzedChordResult } from "./methods/analyzeChordTransform"

/**
 * 根据音符列表查找和弦
 *
 * 采用两层匹配策略（对齐 mtkit）：
 *
 * ### 严格模式（isStrict: true）
 * 只返回**音集完全相等**的和弦。
 *
 * ### 模糊模式（isStrict: false，默认）
 * - **完全匹配优先**：有完全匹配则只返回它们
 * - **省略音匹配**：无完全匹配时，返回"用户少弹了音"的候选——
 *   用户弹的音必须全是候选和弦的音（无错音），且候选和弦的特征音都被弹到。
 *   例：输入 C-E-G 匹配 Cmaj7（少弹了 B），但 C-E-G 不匹配 dom7（特征音小七度 Bb 没弹到）。
 *
 * ### 关于根音（rootNoteLocation）
 * pianoKeyId 是音高类（0-11），输入顺序不代表"哪个音最低/是根音"。
 * - **不传 rootNoteLocation（默认）**：查所有根音，`isRootPosition` 设为 false
 *   （信息不足，不猜测转位）。
 * - **传 rootNoteLocation**：先按此根音过滤候选库（结果更精准），
 *   `isRootPosition` 为 true（候选根音与指定根音一致）。
 *
 * @param midiPitchList - MIDI 音符值列表，如 [60, 64, 67] 表示 C-E-G（至少 3 个独立音）
 * @param config - 配置选项
 * @param config.isStrict - true=只完全匹配；false=完全匹配+省略音（默认 false）
 * @param config.rootNoteLocation - 可选：指定根音（0-11），缩小搜索范围并确定原位
 * @returns 匹配的和弦列表（完全匹配 similarity=1；省略音匹配 similarity<1）
 *
 * @example
 * // 默认模糊：C 大三完全匹配
 * findChord([60, 64, 67])
 * // → [{ chordFormulaId: "maj3", similarity: 1, ... }]
 *
 * @example
 * // 严格模式：只返回完全匹配
 * findChord([60, 64, 67], { isStrict: true })
 *
 * @example
 * // 指定根音 C：只查 C 为根的和弦
 * findChord([60, 64, 67], { rootNoteLocation: 0 })
 */
export const findChord = (
  midiPitchList: number[],
  config?: {
    /** true=只返回完全匹配；false=完全匹配+省略音（默认 false） */
    isStrict?: boolean
    /** 可选：指定根音（0-11），缩小搜索范围并确定原位 */
    rootNoteLocation?: number
  }
): I_AnalyzedChordResult[] => {
  const isStrict = config?.isStrict ?? false
  const rootNoteLocation = config?.rootNoteLocation

  // ===== 步骤 1：将 MIDI 列表转换为 pianoKeyId 并去重排序 =====
  const { sortedPianoKeyIdList } = midiListToPianoKeys(midiPitchList)

  // ===== 步骤 2：查找候选和弦 =====
  const findRoughChordResult = findRoughChord(
    sortedPianoKeyIdList,
    isStrict,
    rootNoteLocation,
  )

  // ===== 步骤 3：根据匹配类型映射结果 =====
  // isRootPosition 仅在调用方明确指定根音时才有意义（否则音高类无法判断"最低音"）
  const hasRoot = rootNoteLocation !== undefined
  const results = findRoughChordResult
    .map(x => {
      if (x.similarity === 1) {
        // 完全匹配
        return {
          ...x,
          isRootPosition: hasRoot,
        }
      } else {
        // 省略音匹配：分析变换（omit/add/alter）
        const analyzed = analyzeChordTransform(
          x,
          sortedPianoKeyIdList,
          x.pianoKeyIdRoot,
        )
        return analyzed
      }
    })
    .filter((x): x is I_AnalyzedChordResult => !isNil(x))

  return results
}
