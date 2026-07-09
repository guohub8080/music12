import { isNil } from 'es-toolkit'
import { Scale } from "@scale/cls/ScaleClass"
import type { T_ScaleModeId } from "@scale/static/scaleModeTypes"
import type { T_IntervalType } from "@common/static/INTERVAL_TYPES"
import { SCALE_MODE_IDS } from "@scale/static/scaleModeTypes"

/**
 * 调式元数据条目
 */
export interface I_ModeMetaEntry {
  name: string
  type: string
  intervalList: [T_IntervalType, number][]
}

/**
 * 调式元数据缓存（按 scaleModeId 全称索引）
 *
 * 模块加载时构建一次，覆盖全部 44 个调式
 * （用 C 为根音构造，因为 name/type/intervalList 与根音无关）。
 */
const buildModeMetaMap = (): Record<string, I_ModeMetaEntry> => {
  const map: Record<string, I_ModeMetaEntry> = {}
  for (const modeId of SCALE_MODE_IDS) {
    const scaleMode = new Scale(0, modeId as T_ScaleModeId).scaleMode
    map[modeId] = {
      name: scaleMode.name,
      type: scaleMode.type,
      intervalList: scaleMode.intervalList,
    }
  }
  return map
}

export const MODE_META_MAP = buildModeMetaMap()

/**
 * 缩写别名（向后兼容旧调用方）
 * 旧版用 3-4 字母缩写查询，保留这些别名
 */
const ABBR_ALIAS: Record<string, string> = {
  MAJ: "NATURAL_MAJOR",
  ION: "NATURAL_MAJOR",
  DOR: "DORIAN",
  PHR: "PHRYGIAN",
  LYD: "LYDIAN",
  MLY: "MIXOLYDIAN",
  MIN: "NATURAL_MINOR",
  AEO: "NATURAL_MINOR",
  LOC: "LOCRIAN",
  HMAJ: "HARMONIC_MAJOR",
  MMAJ: "MELODIC_MAJOR_DESCENDING",
  HMIN: "HARMONIC_MINOR",
  MMIN: "MELODIC_MINOR_ASCENDING",
}

/**
 * 解析 modeKey：支持全称（NATURAL_MAJOR）和缩写（MAJ）
 * @throws 无效 modeKey 时抛错
 */
export const resolveModeKey = (modeKey: string): string => {
  if (!isNil(MODE_META_MAP[modeKey])) return modeKey
  const full = ABBR_ALIAS[modeKey]
  if (!isNil(full)) return full
  throw new Error(`Invalid modeKey: "${modeKey}".`)
}
