import collect from 'collect.js'
import {
  MELODIC_MINOR_ASCENDING_MODE_META,
  DORIAN_FLAT2_MODE_META,
  LYDIAN_AUGMENTED_MODE_META,
  LYDIAN_DOMINANT_MODE_META,
  LOCRIAN_SHARP2_MODE_META,
} from '../../static/FAMILIES/MELODIC_MINOR_MODE_META.ts'
import type { I_ScaleModeMeta } from '../../static/types.ts'

/**
 * 获取旋律小调族的调式元数据列表（5 个）
 */
export const getMelodicMinorFamilyMetaList = () => {
  return collect<I_ScaleModeMeta>([
    MELODIC_MINOR_ASCENDING_MODE_META,
    DORIAN_FLAT2_MODE_META,
    LYDIAN_AUGMENTED_MODE_META,
    LYDIAN_DOMINANT_MODE_META,
    LOCRIAN_SHARP2_MODE_META,
  ])
}
