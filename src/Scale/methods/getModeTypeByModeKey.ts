import { MODE_META_MAP, resolveModeKey } from "./modeMetaMap"

/**
 * 根据调式 key 获取调式类型（major/minor 等）
 *
 * @example
 * getModeTypeByModeKey("NATURAL_MAJOR") // "major"
 * getModeTypeByModeKey("NATURAL_MINOR") // "minor"
 */
export const getModeTypeByModeKey = (modeKey: string): string => {
  return MODE_META_MAP[resolveModeKey(modeKey)].type
}
export default getModeTypeByModeKey
