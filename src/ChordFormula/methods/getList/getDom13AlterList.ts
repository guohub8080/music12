import collect from 'collect.js'
import {
  DOM13_FLAT5_FORMULA_META,
  DOM13_SHARP5_FORMULA_META,
  DOM13_FLAT9_FORMULA_META,
  DOM13_SHARP9_FORMULA_META,
  DOM13_SHARP11_FORMULA_META,
} from '../../static/FAMILIES/DOM13_ALTER_FORMULA_META.ts'
import type { I_ChordFormulaMeta } from '../../static/types.ts'

/**
 * 获取属十三变音族的元数据列表
 */
export const getDom13AlterList = () => {
  return collect<I_ChordFormulaMeta>([
    DOM13_FLAT5_FORMULA_META,
    DOM13_SHARP5_FORMULA_META,
    DOM13_FLAT9_FORMULA_META,
    DOM13_SHARP9_FORMULA_META,
    DOM13_SHARP11_FORMULA_META,
  ])
}
