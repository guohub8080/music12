import collect from 'collect.js'
import {
  GONG_MODE_META,
  SHANG_MODE_META,
  JUE_MODE_META,
  ZHI_MODE_META,
  YU_MODE_META,
} from '../../static/FAMILIES/CHINESE_PENTATONIC_MODE_META.ts'
import type { I_ScaleModeMeta } from '../../static/types.ts'

/**
 * 获取中国五声调式的元数据列表（5 个：宫商角徵羽）
 */
export const getChinesePentatonicFamilyMetaList = () => {
  return collect<I_ScaleModeMeta>([
    GONG_MODE_META,
    SHANG_MODE_META,
    JUE_MODE_META,
    ZHI_MODE_META,
    YU_MODE_META,
  ])
}
