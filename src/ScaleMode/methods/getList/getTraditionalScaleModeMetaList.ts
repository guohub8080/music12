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
import { HARMONIC_MAJOR_MODE_META } from '../../static/FAMILIES/HARMONIC_MAJOR_MODE_META'
import { HARMONIC_MINOR_MODE_META } from '../../static/FAMILIES/HARMONIC_MINOR_MODE_META'
import { MELODIC_MAJOR_DESCENDING_MODE_META } from '../../static/FAMILIES/MELODIC_MAJOR_MODE_META'
import { MELODIC_MINOR_ASCENDING_MODE_META } from '../../static/FAMILIES/MELODIC_MINOR_MODE_META'
import type { I_ScaleModeMeta } from '../../static/types'

/**
 * 获取传统调式元数据列表
 * - 7 个教会调式（自然大调族）
 * - 和声大调、和声小调
 * - 旋律大调、旋律小调
 */
export const getTraditionalScaleModeMetaList = () => {
  return collect<I_ScaleModeMeta>([
    // 教会调式
    NATURAL_MAJOR_MODE_META,
    DORIAN_MODE_META,
    PHRYGIAN_MODE_META,
    LYDIAN_MODE_META,
    MIXOLYDIAN_MODE_META,
    NATURAL_MINOR_MODE_META,
    LOCRIAN_MODE_META,
    // 和声大小调
    HARMONIC_MAJOR_MODE_META,
    HARMONIC_MINOR_MODE_META,
    // 旋律大小调
    MELODIC_MAJOR_DESCENDING_MODE_META,
    MELODIC_MINOR_ASCENDING_MODE_META,
  ])
}
