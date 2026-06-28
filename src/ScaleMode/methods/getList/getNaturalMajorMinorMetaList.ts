import collect from 'collect.js'
import {
  NATURAL_MAJOR_MODE_META,
  NATURAL_MINOR_MODE_META,
} from '../../static/FAMILIES/DIATONIC_MODE_META'
import type { I_ScaleModeMeta } from '../../static/types'

/**
 * 获取自然大调和自然小调的调式元数据列表
 */
export const getNaturalMajorMinorMetaList = () => {
  return collect<I_ScaleModeMeta>([
    NATURAL_MAJOR_MODE_META,
    NATURAL_MINOR_MODE_META,
  ])
}
