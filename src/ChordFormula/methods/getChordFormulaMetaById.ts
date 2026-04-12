import { CHORD_FORMULA_META_MAP } from '../static/CHORD_FORMULA_META_MAP.js'
import type { I_ChordFormulaMeta } from '../static/types.ts'

/**
 * 根据和弦公式 ID 获取对应的元数据
 * @param chordFormulaId 和弦公式 ID（如 "maj7", "dom7", "min9" 等）
 * @returns 和弦公式元数据
 */
export const getChordFormulaMetaById = (chordFormulaId: string): I_ChordFormulaMeta => {
  const meta = CHORD_FORMULA_META_MAP[chordFormulaId]
  if (!meta) {
    throw new Error(`Chord formula not found: ${chordFormulaId}`)
  }
  return meta
}
