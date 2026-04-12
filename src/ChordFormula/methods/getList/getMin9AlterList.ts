import collect from 'collect.js'
import {
  MIN9_FLAT5_FORMULA_META,
} from '../../static/FAMILIES/MIN9_ALTER_FORMULA_META.ts'
import type { I_ChordFormulaMeta } from '../../static/types.ts'

/**
 * 获取小九变音族的元数据列表
 */
export const getMin9AlterList = () => {
  return collect<I_ChordFormulaMeta>([
    MIN9_FLAT5_FORMULA_META,
  ])
}
