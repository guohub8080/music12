import collect from 'collect.js'
import {
  MIN11_FLAT5_FORMULA_META,
} from '../../static/FAMILIES/MIN11_ALTER_FORMULA_META.ts'
import type { I_ChordFormulaMeta } from '../../static/types.ts'

/**
 * 获取小十一变音族的元数据列表
 */
export const getMin11AlterList = () => {
  return collect<I_ChordFormulaMeta>([
    MIN11_FLAT5_FORMULA_META,
  ])
}
