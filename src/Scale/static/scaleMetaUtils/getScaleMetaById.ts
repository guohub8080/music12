import { isNil } from "es-toolkit"
import ALL_SCALE_META from "../allScaleInstances"
import type { I_ScaleInstance } from "../allScaleInstances"

/**
 * 调式实例缓存（按 scaleModeId 索引）
 * 从 ALL_SCALE_META（JSON 加载）构建一次，避免每次查询遍历全量数据。
 */
const SCALE_META_MAP: Record<string, I_ScaleInstance[]> = {}
for (const item of ALL_SCALE_META) {
  if (!SCALE_META_MAP[item.scaleModeId]) {
    SCALE_META_MAP[item.scaleModeId] = []
  }
  SCALE_META_MAP[item.scaleModeId].push(item)
}

/**
 * 根据 scaleModeId 获取该调式在所有根音上的实例数据
 * @param scaleModeId 调式 ID（如 "NATURAL_MAJOR"、"DORIAN"）
 * @returns 该调式的全部实例（12 个根音）
 * @throws 未知 scaleModeId 时抛错
 */
export const getScaleModeMetaById = (scaleModeId: string): I_ScaleInstance[] => {
  const meta = SCALE_META_MAP[scaleModeId]
  if (isNil(meta)) {
    throw new Error(`Scale mode not found: ${scaleModeId}`)
  }
  return meta
}

export default getScaleModeMetaById
