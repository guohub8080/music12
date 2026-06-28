import collect from 'collect.js'
import {
  MAJ9_FORMULA_META,
  DOM9_FORMULA_META,
  MIN9_FORMULA_META,
  MIN_MAJ9_FORMULA_META,
} from '../../static/FAMILIES/CHORD9_FORMULA_META'
import type { I_ChordFormulaMeta } from '../../static/types'

/**
 * 获取九和弦族的元数据列表
 */
export const getChord9List = () => {
  return collect<I_ChordFormulaMeta>([
    MAJ9_FORMULA_META,
    DOM9_FORMULA_META,
    MIN9_FORMULA_META,
    MIN_MAJ9_FORMULA_META,
  ])
}
