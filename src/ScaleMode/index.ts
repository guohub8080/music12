// 类型导出
export type { I_ScaleModeMeta } from './static/types.ts'

// 元数据映射表
export { SCALE_MODE_META_MAP } from './static/SCALE_MODE_META_MAP.ts'
export { default as SCALE_MODE_ID } from './static/SCALE_MODE_ID.ts'

// 元数据（从 static/index.ts 重新导出）
export {
  NATURAL_MAJOR_MODE_META,
  DORIAN_MODE_META,
  PHRYGIAN_MODE_META,
  LYDIAN_MODE_META,
  MIXOLYDIAN_MODE_META,
  NATURAL_MINOR_MODE_META,
  LOCRIAN_MODE_META,
} from './static/FAMILIES/DIATONIC_MODE_META.ts'

export { HARMONIC_MAJOR_MODE_META } from './static/FAMILIES/HARMONIC_MAJOR_MODE_META.ts'
export { MELODIC_MAJOR_DESCENDING_MODE_META } from './static/FAMILIES/MELODIC_MAJOR_MODE_META.ts'

export {
  HARMONIC_MINOR_MODE_META,
  LOCRIAN_SHARP6_MODE_META,
  IONIAN_SHARP5_MODE_META,
  DORIAN_SHARP4_MODE_META,
  PHRYGIAN_DOMINANT_MODE_META,
  LYDIAN_SHARP2_MODE_META,
} from './static/FAMILIES/HARMONIC_MINOR_MODE_META.ts'

export {
  MELODIC_MINOR_ASCENDING_MODE_META,
  DORIAN_FLAT2_MODE_META,
  LYDIAN_AUGMENTED_MODE_META,
  LYDIAN_DOMINANT_MODE_META,
  LOCRIAN_SHARP2_MODE_META,
} from './static/FAMILIES/MELODIC_MINOR_MODE_META.ts'

export {
  DOUBLE_HARMONIC_MAJOR_MODE_META,
  HUNGARIAN_MINOR_MODE_META,
  ORIENTAL_MODE_META,
  IONIAN_SHARP2_SHARP5_MODE_META,
} from './static/FAMILIES/DOUBLE_HARMONIC_MODE_META.ts'

export {
  GONG_MODE_META,
  SHANG_MODE_META,
  JUE_MODE_META,
  ZHI_MODE_META,
  YU_MODE_META,
} from './static/FAMILIES/CHINESE_PENTATONIC_MODE_META.ts'

export {
  YA_YUE_GONG_MODE_META,
  YA_YUE_SHANG_MODE_META,
  YA_YUE_JUE_MODE_META,
  YA_YUE_ZHI_MODE_META,
  YA_YUE_YU_MODE_META,
} from './static/FAMILIES/CHINESE_YAYUE_MODE_META.ts'

export {
  QING_YUE_GONG_MODE_META,
  QING_YUE_SHANG_MODE_META,
  QING_YUE_JUE_MODE_META,
  QING_YUE_ZHI_MODE_META,
  QING_YUE_YU_MODE_META,
} from './static/FAMILIES/CHINESE_QINGYUE_MODE_META.ts'

export {
  YAN_YUE_GONG_MODE_META,
  YAN_YUE_SHANG_MODE_META,
  YAN_YUE_JUE_MODE_META,
  YAN_YUE_ZHI_MODE_META,
  YAN_YUE_YU_MODE_META,
} from './static/FAMILIES/CHINESE_YANYUE_MODE_META.ts'

// 方法函数
export { getScaleModeMetaById, getAllScaleModeMetaList } from './methods/getScaleModeMetaById.ts'
export { getNaturalMajorMinorMetaList } from './methods/getList/getNaturalMajorMinorMetaList.ts'
export { getDiatonicScaleMetaList } from './methods/getList/getDiatonicScaleMetaList.ts'
export { getTraditionalScaleModeMetaList } from './methods/getList/getTraditionalScaleModeMetaList.ts'
export { getHarmonicMinorFamilyMetaList } from './methods/getList/getHarmonicMinorFamilyMetaList.ts'
export { getMelodicMinorFamilyMetaList } from './methods/getList/getMelodicMinorFamilyMetaList.ts'
export { getDoubleHarmonicFamilyMetaList } from './methods/getList/getDoubleHarmonicFamilyMetaList.ts'
export { getChinesePentatonicFamilyMetaList } from './methods/getList/getChinesePentatonicFamilyMetaList.ts'
export { getChineseYayueFamilyMetaList } from './methods/getList/getChineseYayueFamilyMetaList.ts'
export { getChineseQingyueFamilyMetaList } from './methods/getList/getChineseQingyueFamilyMetaList.ts'
export { getChineseYanyueFamilyMetaList } from './methods/getList/getChineseYanyueFamilyMetaList.ts'
