import collect from 'collect.js'
import {
  HARMONIC_MINOR_MODE_META,
  LOCRIAN_SHARP6_MODE_META,
  IONIAN_SHARP5_MODE_META,
  DORIAN_SHARP4_MODE_META,
  PHRYGIAN_DOMINANT_MODE_META,
  LYDIAN_SHARP2_MODE_META,
} from '../../static/FAMILIES/HARMONIC_MINOR_MODE_META'
import type { I_ScaleModeMeta } from '../../static/types'

/**
 * 获取和声小调族的调式元数据列表（6 个）
 */
export const getHarmonicMinorFamilyMetaList = () => {
  return collect<I_ScaleModeMeta>([
    HARMONIC_MINOR_MODE_META,
    LOCRIAN_SHARP6_MODE_META,
    IONIAN_SHARP5_MODE_META,
    DORIAN_SHARP4_MODE_META,
    PHRYGIAN_DOMINANT_MODE_META,
    LYDIAN_SHARP2_MODE_META,
  ])
}
