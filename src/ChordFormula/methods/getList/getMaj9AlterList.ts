import collect from 'collect.js'
import {
  MAJ9_FLAT5_FORMULA_META,
  MAJ9_SHARP5_FORMULA_META,
  MAJ9_SHARP11_FORMULA_META,
  MAJ9_FLAT13_FORMULA_META,
} from '../../static/FAMILIES/MAJ9_ALTER_FORMULA_META'
import type { I_ChordFormulaMeta } from '../../static/types'

/**
 * 获取大九变音族的元数据列表
 */
export const getMaj9AlterList = () => {
  return collect<I_ChordFormulaMeta>([
    MAJ9_FLAT5_FORMULA_META,
    MAJ9_SHARP5_FORMULA_META,
    MAJ9_SHARP11_FORMULA_META,
    MAJ9_FLAT13_FORMULA_META,
  ])
}
