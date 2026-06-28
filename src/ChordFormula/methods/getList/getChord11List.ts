import collect from 'collect.js'
import {
  MAJ11_FORMULA_META,
  DOM11_FORMULA_META,
  MIN11_FORMULA_META,
  MIN_MAJ11_FORMULA_META,
} from '../../static/FAMILIES/CHORD11_FORMULA_META'
import type { I_ChordFormulaMeta } from '../../static/types'

/**
 * 获取十一和弦族的元数据列表
 */
export const getChord11List = () => {
  return collect<I_ChordFormulaMeta>([
    MAJ11_FORMULA_META,
    DOM11_FORMULA_META,
    MIN11_FORMULA_META,
    MIN_MAJ11_FORMULA_META,
  ])
}
