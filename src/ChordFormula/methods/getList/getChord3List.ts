import collect from 'collect.js'
import {
  MAJ3_FORMULA_META,
  MIN3_FORMULA_META,
  DIM3_FORMULA_META,
  AUG3_FORMULA_META,
  MAJ3_FLAT5_FORMULA_META,
} from '../../static/FAMILIES/CHORD3_FORMULA_META.ts'
import type { I_ChordFormulaMeta } from '../../static/types.ts'

/**
 * 获取三和弦族的元数据列表
 */
export const getChord3List = () => {
  return collect<I_ChordFormulaMeta>([
    MAJ3_FORMULA_META,
    MIN3_FORMULA_META,
    DIM3_FORMULA_META,
    AUG3_FORMULA_META,
    MAJ3_FLAT5_FORMULA_META,
  ])
}
