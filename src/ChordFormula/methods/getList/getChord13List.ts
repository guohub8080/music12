import collect from 'collect.js'
import {
  MAJ13_FORMULA_META,
  DOM13_FORMULA_META,
  MIN13_FORMULA_META,
  MIN_MAJ13_FORMULA_META,
} from '../../static/FAMILIES/CHORD13_FORMULA_META.ts'
import type { I_ChordFormulaMeta } from '../../static/types.ts'

/**
 * 获取十三和弦族的元数据列表
 */
export const getChord13List = () => {
  return collect<I_ChordFormulaMeta>([
    MAJ13_FORMULA_META,
    DOM13_FORMULA_META,
    MIN13_FORMULA_META,
    MIN_MAJ13_FORMULA_META,
  ])
}
