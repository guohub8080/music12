import { values } from "lodash"
import { CHORD_FORMULA_META_MAP } from '../../static/CHORD_FORMULA_META_MAP.js'
import type { I_ChordFormulaMeta } from '../../static/types.ts'

/**
 * 获取所有和弦公式的元数据列表
 * @returns 所有和弦公式元数据的数组
 */
export const getAllChordFormulaMetaList = (): I_ChordFormulaMeta[] => {
	return values(CHORD_FORMULA_META_MAP)
}
