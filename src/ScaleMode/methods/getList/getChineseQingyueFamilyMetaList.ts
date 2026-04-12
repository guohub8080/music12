import collect from 'collect.js'
import {
  QING_YUE_GONG_MODE_META,
  QING_YUE_SHANG_MODE_META,
  QING_YUE_JUE_MODE_META,
  QING_YUE_ZHI_MODE_META,
  QING_YUE_YU_MODE_META,
} from '../../static/FAMILIES/CHINESE_QINGYUE_MODE_META.ts'
import type { I_ScaleModeMeta } from '../../static/types.ts'

/**
 * 获取中国清乐七声调式的元数据列表（5 个）
 */
export const getChineseQingyueFamilyMetaList = () => {
  return collect<I_ScaleModeMeta>([
    QING_YUE_GONG_MODE_META,
    QING_YUE_SHANG_MODE_META,
    QING_YUE_JUE_MODE_META,
    QING_YUE_ZHI_MODE_META,
    QING_YUE_YU_MODE_META,
  ])
}
