import collect from 'collect.js'
import {
  MAJ13_FLAT5_FORMULA_META,
  MAJ13_SHARP5_FORMULA_META,
  MAJ13_FLAT9_FORMULA_META,
  MAJ13_SHARP11_FORMULA_META,
} from '../../static/FAMILIES/MAJ13_ALTER_FORMULA_META'
import type { I_ChordFormulaMeta } from '../../static/types'

/**
 * 获取大十三变音族的元数据列表
 */
export const getMaj13AlterList = () => {
  return collect<I_ChordFormulaMeta>([
    MAJ13_FLAT5_FORMULA_META,
    MAJ13_SHARP5_FORMULA_META,
    MAJ13_FLAT9_FORMULA_META,
    MAJ13_SHARP11_FORMULA_META,
  ])
}
