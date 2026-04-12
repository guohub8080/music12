import collect from 'collect.js'
import {
  YA_YUE_GONG_MODE_META,
  YA_YUE_SHANG_MODE_META,
  YA_YUE_JUE_MODE_META,
  YA_YUE_ZHI_MODE_META,
  YA_YUE_YU_MODE_META,
} from '../../static/FAMILIES/CHINESE_YAYUE_MODE_META.ts'
import type { I_ScaleModeMeta } from '../../static/types.ts'

/**
 * 获取中国雅乐七声调式的元数据列表（5 个）
 */
export const getChineseYayueFamilyMetaList = () => {
  return collect<I_ScaleModeMeta>([
    YA_YUE_GONG_MODE_META,
    YA_YUE_SHANG_MODE_META,
    YA_YUE_JUE_MODE_META,
    YA_YUE_ZHI_MODE_META,
    YA_YUE_YU_MODE_META,
  ])
}
