import { CHORD_FORMULA_META_MAP } from "@chord-formula/static/CHORD_FORMULA_META_MAP"
import type { I_ChordFormulaMeta } from "@chord-formula/static/types"
import type { ChordTag } from "@chord-formula/static/deriveTags"

/**
 * 按标签获取和弦公式（支持多标签交集）
 *
 * 返回同时包含所有给定标签的公式。标签来自 deriveTags 的自动推导，
 * 分属五个维度：家族(chordN/sus) / 扩展(extN) / 性质(maj/min/dom/...) /
 * 变音(altered/sharp5/...) / 结构(add/add6)。
 *
 * @param tags - 要匹配的标签数组（取交集，即公式必须同时含所有标签）
 * @returns 匹配的公式列表
 *
 * @example
 * // 所有属功能的变音和弦（跨家族：dom7#5、dom9#5、dom11b5...）
 * getChordFormulaByTags(["dom", "altered"])
 *
 * // 所有扩展到13度的挂留和弦
 * getChordFormulaByTags(["sus", "ext13"])
 *
 * // 所有减性质和弦
 * getChordFormulaByTags(["dim"])
 *
 * // 大七家族的九和弦
 * getChordFormulaByTags(["maj7", "chord9"])
 */
export const getChordFormulaByTags = (tags: ChordTag[]): I_ChordFormulaMeta[] => {
  return Object.values(CHORD_FORMULA_META_MAP).filter((meta) =>
    tags.every((tag) => meta.tags.includes(tag)),
  )
}
