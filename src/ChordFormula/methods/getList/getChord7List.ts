import collect from 'collect.js'
import {
  MAJ7_FORMULA_META,
  DOM7_FORMULA_META,
  MIN7_FORMULA_META,
  HALFDIM7_FORMULA_META,
  DIM7_FORMULA_META,
  MIN_MAJ7_FORMULA_META,
} from '../../static/FAMILIES/CHORD7_FORMULA_META'
import type { I_ChordFormulaMeta } from '../../static/types'

/**
 * 获取七和弦族的元数据列表
 */
export const getChord7List = () => {
  return collect<I_ChordFormulaMeta>([
    MAJ7_FORMULA_META,
    DOM7_FORMULA_META,
    MIN7_FORMULA_META,
    HALFDIM7_FORMULA_META,
    DIM7_FORMULA_META,
    MIN_MAJ7_FORMULA_META,
  ])
}
