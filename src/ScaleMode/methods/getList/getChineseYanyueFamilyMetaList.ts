import collect from 'collect.js'
import {
  YAN_YUE_GONG_MODE_META,
  YAN_YUE_SHANG_MODE_META,
  YAN_YUE_JUE_MODE_META,
  YAN_YUE_ZHI_MODE_META,
  YAN_YUE_YU_MODE_META,
} from '../../static/FAMILIES/CHINESE_YANYUE_MODE_META.ts'
import type { I_ScaleModeMeta } from '../../static/types.ts'

/**
 * 获取中国燕乐七声调式的元数据列表（5 个）
 */
export const getChineseYanyueFamilyMetaList = () => {
  return collect<I_ScaleModeMeta>([
    YAN_YUE_GONG_MODE_META,
    YAN_YUE_SHANG_MODE_META,
    YAN_YUE_JUE_MODE_META,
    YAN_YUE_ZHI_MODE_META,
    YAN_YUE_YU_MODE_META,
  ])
}
