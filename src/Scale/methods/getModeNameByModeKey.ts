import { MODE_META_MAP, resolveModeKey } from "./modeMetaMap"

/**
 * 根据调式 key 获取调式名称
 *
 * 支持全称（如 "NATURAL_MAJOR"、"DORIAN"、"HARMONIC_MINOR"）
 * 和缩写别名（如 "MAJ"、"DOR"、"HMIN"）。
 *
 * @example
 * getModeNameByModeKey("NATURAL_MAJOR") // "自然大调"
 * getModeNameByModeKey("DORIAN")        // "Dorian"
 * getModeNameByModeKey("MAJ")           // "自然大调"（缩写别名）
 */
export const getModeNameByModeKey = (modeKey: string): string => {
  return MODE_META_MAP[resolveModeKey(modeKey)].name
}
export default getModeNameByModeKey
