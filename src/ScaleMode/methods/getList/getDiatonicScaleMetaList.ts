import collect from 'collect.js'
import {
  NATURAL_MAJOR_MODE_META,
  NATURAL_MINOR_MODE_META,
  DORIAN_MODE_META,
  PHRYGIAN_MODE_META,
  LYDIAN_MODE_META,
  MIXOLYDIAN_MODE_META,
  LOCRIAN_MODE_META,
} from '../../static/FAMILIES/DIATONIC_MODE_META'
import type { I_ScaleModeMeta } from '../../static/types'

/**
 * 获取所有自然大调/小调族（教会调式）的调式元数据列表
 */
export const getDiatonicScaleMetaList = () => {
  return collect<I_ScaleModeMeta>([
    NATURAL_MAJOR_MODE_META,
    NATURAL_MINOR_MODE_META,
    DORIAN_MODE_META,
    PHRYGIAN_MODE_META,
    LYDIAN_MODE_META,
    MIXOLYDIAN_MODE_META,
    LOCRIAN_MODE_META,
  ])
}
