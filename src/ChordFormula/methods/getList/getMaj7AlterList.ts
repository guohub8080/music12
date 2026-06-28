import collect from 'collect.js'
import {
  MAJ7_FLAT5_FORMULA_META,
  MAJ7_FLAT9_FORMULA_META,
  MAJ7_FLAT13_FORMULA_META,
  MAJ7_SHARP11_FORMULA_META,
} from '../../static/FAMILIES/MAJ7_ALTER_FORMULA_META'
import type { I_ChordFormulaMeta } from '../../static/types'

/**
 * 获取大七变音族的元数据列表
 */
export const getMaj7AlterList = () => {
  return collect<I_ChordFormulaMeta>([
    MAJ7_FLAT5_FORMULA_META,
    MAJ7_FLAT9_FORMULA_META,
    MAJ7_FLAT13_FORMULA_META,
    MAJ7_SHARP11_FORMULA_META,
  ])
}
