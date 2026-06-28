import { MODE_META_MAP, resolveModeKey } from "./modeMetaMap"
import type { T_IntervalType } from "@common/static/INTERVAL_TYPES"

/**
 * 根据调式 key 获取音程列表
 *
 * @example
 * getIntervalListByModeKey("NATURAL_MAJOR")
 * // [["maj",2],["maj",3],["p",4],["p",5],["maj",6],["maj",7]]
 */
export const getIntervalListByModeKey = (
  modeKey: string,
): [T_IntervalType, number][] => {
  return MODE_META_MAP[resolveModeKey(modeKey)].intervalList
}
export default getIntervalListByModeKey
