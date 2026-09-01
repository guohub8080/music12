// ========== 静态数据导出 ==========
export { default as CHORD_FORMULA_ID } from './static/CHORD_FORMULA_ID'
export type { I_ChordFormulaMeta } from './static/types'

// ========== 类导出 ==========
// 已移除 ChordFormula 类，直接使用 getChordFormulaMetaById 函数获取元数据

// ========== 工具函数导出 ==========
export { getChordFormulaMetaById } from './methods/getChordFormulaMetaById'
export { getAllChordFormulaMetaList } from './methods/getList/getAllChordFormulaMetaList'
export { getChordFormulaByTags } from './methods/getChordFormulaByTags'
export { deriveTags } from './static/deriveTags'
export type { ChordTag } from './static/deriveTags'
