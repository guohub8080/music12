import collect from 'collect.js'
import {
  MAJ3_ADD6_FORMULA_META,
  MIN3_ADD6_FORMULA_META,
  MAJ3_ADD6_ADD9_FORMULA_META,
  MIN3_ADD6_ADD9_FORMULA_META,
  MAJ3_ADD9_FORMULA_META,
  MAJ3_ADD11_FORMULA_META,
  MIN3_ADD9_FORMULA_META,
  MIN3_ADD11_FORMULA_META,
} from '../../static/FAMILIES/CHORD3_EX_FORMULA_META.ts'
import type { I_ChordFormulaMeta } from '../../static/types.ts'

/**
 * 获取三和弦扩展族的元数据列表
 */
export const getChord3ExList = () => {
  return collect<I_ChordFormulaMeta>([
    MAJ3_ADD6_FORMULA_META,
    MIN3_ADD6_FORMULA_META,
    MAJ3_ADD6_ADD9_FORMULA_META,
    MIN3_ADD6_ADD9_FORMULA_META,
    MAJ3_ADD9_FORMULA_META,
    MAJ3_ADD11_FORMULA_META,
    MIN3_ADD9_FORMULA_META,
    MIN3_ADD11_FORMULA_META,
  ])
}
