import {midiListToPianoKeys} from "./methods/midiListToPianoKeys.ts"
import {findPresetChord} from "./methods/findPresetChord.ts"
import {findRoughChord} from "./methods/findRoughChord.ts"
import {analyzeChordTransform, type I_AnalyzedChordResult} from "./methods/analyzeChordTransform.ts"
import {defaultTo, isNil} from "lodash"
import type {I_RoughChordResult} from "./methods/findRoughChord.ts"

// 导出类型
export type { I_ChordAlteration, I_ChordTransform, I_AnalyzedChordResult } from "./methods/analyzeChordTransform.ts"

/**
 * 根据音符列表查找和弦
 *
 * ### 模糊匹配控制
 *
 * | isShowFuzzyOnFullMatch | isShowFuzzyOnEmptyMatch | 行为 |
 * |------------------------|-------------------------|------|
 * | `false`（默认） | `false`（默认） | 只返回完全匹配，无则返回空 |
 * | `false` | `true` | 有完全匹配时只返回完全匹配，无则返回模糊匹配 |
 * | `true` | `true` | 始终返回完全匹配 + 模糊匹配 |
 *
 * ### 工作流程
 * 1. 将 MIDI 列表转换为 pianoKeyId 并去重排序
 * 2. 查找预设和弦库中匹配的和弦
 * 3. 根据配置决定是否返回模糊匹配（变换和弦）
 *
 * ### 变化检测
 *
 * 模糊匹配时会自动检测音的变化，例如：
 * - `b3→3` : 小三度变为大三度
 * - `3→b3` : 大三度变为小三度
 * - `b7→maj7` : 小七度变为大七度
 * - `omit5` : 省略五音
 * - `add9` : 添加九音
 *
 * @param midiPitchList - MIDI 音符值列表，如 [60, 64, 67] 表示 C-E-G
 * @param config - 配置选项
 * @param config.isShowFuzzyOnFullMatch - 有完全匹配时，是否也显示模糊匹配
 * @param config.isShowFuzzyOnEmptyMatch - 无完全匹配时，是否显示模糊匹配
 * @param config.minSimilarity - 粗略查找的最低相似度（0-1），默认 0.5
 * @returns 匹配的和弦列表
 *
 * @example
 * // 默认：只返回完全匹配
 * findChord([60, 64, 67])
 * // → [{ pianoKeyIdRoot: 0, chordFormulaId: "maj3", similarity: 1, ... }]
 *
 * @example
 * // 无完全匹配时返回模糊匹配
 * findChord([60, 64], { isShowFuzzyOnEmptyMatch: true })
 * // → [{ pianoKeyIdRoot: 0, chordFormulaId: "maj3", similarity: 0.67, transformString: "omit5", ... }]
 *
 * @example
 * // 变化检测
 * findChord([60, 64, 67], { isShowFuzzyOnEmptyMatch: true })
 * // 输入 C大三和弦，查找 C小三和弦
 * // → [{ pianoKeyIdRoot: 0, chordFormulaId: "min3", similarity: 0.5, transformString: "3→b3", ... }]
 *
 * @example
 * // 显示所有匹配
 * findChord([60, 64, 67], { isShowFuzzyOnFullMatch: true, isShowFuzzyOnEmptyMatch: true })
 * // → [{ ...similarity: 1, ... }, { ...similarity: 0.8, ... }, ...]
 */
export const findChord = (midiPitchList: number[], config?: {
  isShowFuzzyOnFullMatch?: boolean
  isShowFuzzyOnEmptyMatch?: boolean
  minSimilarity?: number
}): I_AnalyzedChordResult[] => {
  // ===== 配置参数处理 =====
  const isShowFuzzyOnFullMatch = defaultTo(config?.isShowFuzzyOnFullMatch, false)
  const isShowFuzzyOnEmptyMatch = defaultTo(config?.isShowFuzzyOnEmptyMatch, false)
  const minSimilarity = defaultTo(config?.minSimilarity, 0.5)

  // ===== 步骤 1：将 MIDI 列表转换为 pianoKeyId 并去重排序 =====
  const {sortedPianoKeyIdList,lowestPianoKeyId} = midiListToPianoKeys(midiPitchList)

  // ===== 步骤 2：初步查找和弦 =====
  const findRoughChordResult = findRoughChord(sortedPianoKeyIdList, minSimilarity)

  // ===== 步骤 3：根据配置过滤和映射 =====
  const hasFullMatch = findRoughChordResult.some(x => x.similarity === 1)
  const shouldShowFuzzy = hasFullMatch ? isShowFuzzyOnFullMatch : isShowFuzzyOnEmptyMatch

  const results = findRoughChordResult
    .filter(x => x.similarity === 1 || (shouldShowFuzzy && x.similarity < 1))
    .map(x => {
      if (x.similarity === 1) {
        // 完全匹配：添加 isRootPosition 字段
        return {
          ...x,
          isRootPosition: x.pianoKeyIdRoot === lowestPianoKeyId
        }
      } else {
        // 模糊匹配：分析变换（可能返回 null，表示省略了命名度数）
        return analyzeChordTransform(x, sortedPianoKeyIdList, lowestPianoKeyId)
      }
    })
    .filter((x): x is I_AnalyzedChordResult => !isNil(x))

  return results
}
