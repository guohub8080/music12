import collect from 'collect.js'
import {
  DOM11_FLAT5_FORMULA_META,
  DOM11_SHARP5_FORMULA_META,
  DOM11_FLAT9_FORMULA_META,
  DOM11_SHARP9_FORMULA_META,
  DOM11_FLAT13_FORMULA_META,
} from '../../static/FAMILIES/DOM11_ALTER_FORMULA_META'
import type { I_ChordFormulaMeta } from '../../static/types'

/**
 * 获取属十一变音族的元数据列表
 */
export const getDom11AlterList = () => {
  return collect<I_ChordFormulaMeta>([
    DOM11_FLAT5_FORMULA_META,
    DOM11_SHARP5_FORMULA_META,
    DOM11_FLAT9_FORMULA_META,
    DOM11_SHARP9_FORMULA_META,
    DOM11_FLAT13_FORMULA_META,
  ])
}
