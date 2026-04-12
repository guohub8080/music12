import collect from 'collect.js'
import {
  MAJ7_ADD11_FORMULA_META,
  DOM7_ADD6_FORMULA_META,
} from '../../static/FAMILIES/CHORD7_ADD_FORMULA_META.ts'
import type { I_ChordFormulaMeta } from '../../static/types.ts'

/**
 * 获取七和弦add扩展族的元数据列表
 */
export const getChord7AddList = () => {
  return collect<I_ChordFormulaMeta>([
    MAJ7_ADD11_FORMULA_META,
    DOM7_ADD6_FORMULA_META,
  ])
}
