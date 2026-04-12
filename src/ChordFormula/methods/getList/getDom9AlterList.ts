import collect from 'collect.js'
import {
  DOM9_SHARP5_FORMULA_META,
  DOM9_SHARP11_FORMULA_META,
  DOM9_FLAT13_FORMULA_META,
  DOM9_ADD13_FORMULA_META,
} from '../../static/FAMILIES/DOM9_ALTER_FORMULA_META.ts'
import type { I_ChordFormulaMeta } from '../../static/types.ts'

/**
 * 获取属九变音族的元数据列表
 */
export const getDom9AlterList = () => {
  return collect<I_ChordFormulaMeta>([
    DOM9_SHARP5_FORMULA_META,
    DOM9_SHARP11_FORMULA_META,
    DOM9_FLAT13_FORMULA_META,
    DOM9_ADD13_FORMULA_META,
  ])
}
