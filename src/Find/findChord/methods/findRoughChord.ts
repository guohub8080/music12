import collect from "collect.js"
import ALL_CHORD_INSTANCE_META from "../../../Chord/static/ALL_CHORD_INSTANCE_META.ts"
import { I_ChordInstanceMeta } from "../../../Chord/static/types.ts"
import { intersection, isEmpty } from "lodash"
import { jaccard } from "../../../common/utils/jaccard.ts"

/** 默认最低相似度阈值 */
const DEFAULT_MIN_SIMILARITY = 0.5

/**
 * 粗略查找和弦结果（带相似度）
 */
export type I_RoughChordResult = I_ChordInstanceMeta & {
  /** 相似度系数（0-1） */
  similarity: number
  /** 交集的 pianoKeyId 列表 */
  intersection: number[]
}

/**
 * 粗略查找和弦
 *
 * ### 筛选逻辑
 * 1. **筛选无交集的项**：直接过滤掉与输入列表无交集的和弦
 * 2. **计算并筛选相似度**：只保留 ≥ 阈值的
 * 3. **根音检查**：如果交集不包含和弦的根音，过滤掉
 *
 * @param pianoKeyIdList - 钢琴键 ID 列表（0-11），已排序
 * @param minSimilarity - 最低相似度阈值（0-1），默认 0.5
 * @returns 匹配度和弦列表（按相似度降序排列）
 *
 * @example
 * ```ts
 * // 输入 C 大三和弦缺少五音
 * findRoughChord([0, 4])
 * // → [{ chordFormulaId: "maj3", jaccard: 0.67, intersection: [0, 4], ... }]
 *
 * // 输入完整 C 大三和弦
 * findRoughChord([0, 4, 7])
 * // → [{ chordFormulaId: "maj3", jaccard: 1.0, intersection: [0, 4, 7], ... }]
 * ```
 */
export const findRoughChord = (
  pianoKeyIdList: number[],
  minSimilarity = DEFAULT_MIN_SIMILARITY
): I_RoughChordResult[] => {
  // ===== 阶段 1：筛选符合条件的和弦 =====
  const handle = collect(ALL_CHORD_INSTANCE_META)

  const results = handle
    .filter((chord: I_ChordInstanceMeta) => {
      // --- 计算输入与和弦的交集 ---
      const intersect = intersection(chord.pianoKeyIdsSorted, pianoKeyIdList)

      // --- 规则 1：无交集直接过滤 ---
      // 如果输入音与和弦音完全没有重合，直接排除
      if (isEmpty(intersect)) return false

      // --- 规则 2：相似度阈值过滤 ---
      // Jaccard 相似度 = |交集| / |并集|
      // 衡量输入与和弦的整体相似程度
      const similarity = jaccard(chord.pianoKeyIdsSorted, pianoKeyIdList)
      if (similarity < minSimilarity) return false

      // --- 规则 3：根音必须存在于交集中 ---
      // 如果交集不包含和弦的根音，说明输入音无法构成该和弦
      // 例如：C 大三和弦根音为 C(0)，若输入不包含 0，则不能识别为 C 和弦
      return intersect.includes(chord.pianoKeyIdRoot)
    })
    .all()

    // ===== 阶段 2：为每个匹配结果计算详细信息 =====
    .map((chord: I_ChordInstanceMeta) => {
      const intersect = intersection(chord.pianoKeyIdsSorted, pianoKeyIdList)
      const similarity = jaccard(chord.pianoKeyIdsSorted, pianoKeyIdList)

      return {
        ...chord,
        similarity: Number(similarity.toFixed(3)),
        intersection: intersect
      }
    })

  // ===== 阶段 3：按相似度降序排序 =====
  // 相似度高的排在前面，便于调用方取前 N 个结果
  return results.sort((a: I_RoughChordResult, b: I_RoughChordResult) => b.similarity - a.similarity)
}

export default findRoughChord
