import collect from 'collect.js'
import {
  MIN7_SHARP5_FORMULA_META,
  MIN_MAJ7_FLAT5_FORMULA_META,
  MIN_MAJ7_SHARP5_FORMULA_META,
} from '../../static/FAMILIES/MIN7_ALTER_FORMULA_META'
import type { I_ChordFormulaMeta } from '../../static/types'

/**
 * 获取小七变音族的元数据列表
 */
export const getMin7AlterList = () => {
  return collect<I_ChordFormulaMeta>([
    MIN7_SHARP5_FORMULA_META,
    MIN_MAJ7_FLAT5_FORMULA_META,
    MIN_MAJ7_SHARP5_FORMULA_META,
  ])
}
