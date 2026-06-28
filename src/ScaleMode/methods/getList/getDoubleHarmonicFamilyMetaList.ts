import collect from 'collect.js'
import {
  DOUBLE_HARMONIC_MAJOR_MODE_META,
  HUNGARIAN_MINOR_MODE_META,
  ORIENTAL_MODE_META,
  IONIAN_SHARP2_SHARP5_MODE_META,
} from '../../static/FAMILIES/DOUBLE_HARMONIC_MODE_META'
import type { I_ScaleModeMeta } from '../../static/types'

/**
 * 获取双重和声大调族的调式元数据列表（4 个）
 */
export const getDoubleHarmonicFamilyMetaList = () => {
  return collect<I_ScaleModeMeta>([
    DOUBLE_HARMONIC_MAJOR_MODE_META,
    HUNGARIAN_MINOR_MODE_META,
    ORIENTAL_MODE_META,
    IONIAN_SHARP2_SHARP5_MODE_META,
  ])
}
