import {
  NATURAL_MAJOR_MODE_META,
  DORIAN_MODE_META,
  PHRYGIAN_MODE_META,
  LYDIAN_MODE_META,
  MIXOLYDIAN_MODE_META,
  NATURAL_MINOR_MODE_META,
  LOCRIAN_MODE_META,
} from "../../ScaleMode/static/FAMILIES/DIATONIC_MODE_META.ts";
import { HARMONIC_MAJOR_MODE_META } from "../../ScaleMode/static/FAMILIES/HARMONIC_MAJOR_MODE_META.ts";
import { MELODIC_MAJOR_DESCENDING_MODE_META } from "../../ScaleMode/static/FAMILIES/MELODIC_MAJOR_MODE_META.ts";
import { HARMONIC_MINOR_MODE_META } from "../../ScaleMode/static/FAMILIES/HARMONIC_MINOR_MODE_META.ts";
import { MELODIC_MINOR_ASCENDING_MODE_META } from "../../ScaleMode/static/FAMILIES/MELODIC_MINOR_MODE_META.ts";
import {T_IntervalType} from "../../common/static/INTERVAL_TYPES.ts";
import { isNil } from "lodash";

const MODE_META_MAP: Record<string, { intervalList: ([T_IntervalType, number] | null)[] }> = {
  "MAJ": NATURAL_MAJOR_MODE_META,
  "ION": NATURAL_MAJOR_MODE_META,
  "DOR": DORIAN_MODE_META,
  "PHR": PHRYGIAN_MODE_META,
  "LYD": LYDIAN_MODE_META,
  "MLY": MIXOLYDIAN_MODE_META,
  "MIN": NATURAL_MINOR_MODE_META,
  "AEO": NATURAL_MINOR_MODE_META,
  "LOC": LOCRIAN_MODE_META,
  "HMAJ": HARMONIC_MAJOR_MODE_META,
  "MMAJ": MELODIC_MAJOR_DESCENDING_MODE_META,
  "HMIN": HARMONIC_MINOR_MODE_META,
  "MMIN": MELODIC_MINOR_ASCENDING_MODE_META,
}

export const getIntervalListByModeKey = (modeKey: string) => {
  const modeMeta = MODE_META_MAP[modeKey]
  if (!modeMeta) throw new Error(`Invalid mode key: ${modeKey}.`)
  // 返回非 null 的音程列表
  return modeMeta.intervalList.filter((item): item is [T_IntervalType, number] => !isNil(item))
}
export default getIntervalListByModeKey
