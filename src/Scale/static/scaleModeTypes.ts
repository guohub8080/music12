import { fromPairs, uniq } from 'es-toolkit/compat';
import ALL_SCALE_META from "./allScaleInstances"

// 提取所有调式 ID
const scaleModeIdList = uniq(ALL_SCALE_META.map((s) => s.scaleModeId))

/**
 * 调式 ID 字面量类型
 *
 * 所有可用调式 ID 的联合类型
 */
export type T_ScaleModeId = (typeof scaleModeIdList)[number]

/**
 * 调式 ID 列表（数组形式）
 */
export const SCALE_MODE_IDS = scaleModeIdList

/**
 * 调式 ID 对象（属性访问形式）
 *
 * @example
 * // 在 test/ 或 web_test/ 中使用 @music 别名导入
 * import { SCALE_MODE } from "@music/Find/index"
 *
 * SCALE_MODE.NATURAL_MAJOR  // "NATURAL_MAJOR"
 * SCALE_MODE.DORIAN         // "DORIAN"
 */
export const SCALE_MODE = fromPairs(
	scaleModeIdList.map((id) => [id, id])
) as Record<T_ScaleModeId, T_ScaleModeId>

/**
 * 按调式族分组的调式 ID 列表

/**
 * 按调式族分组的调式 ID 列表
 */
export const SCALE_MODE_GROUPS = {
	// 自然大调族
	DIATONIC: [
		"NATURAL_MAJOR",
		"DORIAN",
		"PHRYGIAN",
		"LYDIAN",
		"MIXOLYDIAN",
		"NATURAL_MINOR",
		"LOCRIAN",
	] as const,

	// 和声大调(2026-09-11 七调式补全)
	HARMONIC_MAJOR: [
		"HARMONIC_MAJOR",
		"DORIAN_FLAT5",
		"PHRYGIAN_FLAT4",
		"LYDIAN_FLAT3",
		"MIXOLYDIAN_FLAT2",
		"LYDIAN_AUGMENTED_SHARP2",
		"LOCRIAN_DOUBLE_FLAT7",
	] as const,

	// 旋律大调
	MELODIC_MAJOR: ["MELODIC_MAJOR_DESCENDING"] as const,

	// 和声小调族
	HARMONIC_MINOR: [
		"HARMONIC_MINOR",
		"LOCRIAN_SHARP6",
		"IONIAN_SHARP5",
		"DORIAN_SHARP4",
		"PHRYGIAN_DOMINANT",
		"LYDIAN_SHARP2",
		"ULTRA_LOCRIAN",
	] as const,

	// 旋律小调族
	MELODIC_MINOR: [
		"MELODIC_MINOR_ASCENDING",
		"DORIAN_FLAT2",
		"LYDIAN_AUGMENTED",
		"LYDIAN_DOMINANT",
		"LOCRIAN_SHARP2",
		"MIXOLYDIAN_FLAT6",
		"ALTERED",
	] as const,

	// 双重和声调式族
	DOUBLE_HARMONIC: [
		"DOUBLE_HARMONIC_MAJOR",
		"HUNGARIAN_MINOR",
		"ORIENTAL",
		"IONIAN_SHARP2_SHARP5",
		"LYDIAN_SHARP2_SHARP6",
		"ULTRAPHRYGIAN",
	] as const,

	// 中国五声调式
	CHINESE_PENTATONIC: ["GONG", "SHANG", "JUE", "ZHI", "YU"] as const,

	// 中国雅乐七声调式
	CHINESE_YAYUE: ["YA_YUE_GONG", "YA_YUE_SHANG", "YA_YUE_JUE", "YA_YUE_ZHI", "YA_YUE_YU"] as const,

	// 中国清乐七声调式
	CHINESE_QINGYUE: ["QING_YUE_GONG", "QING_YUE_SHANG", "QING_YUE_JUE", "QING_YUE_ZHI", "QING_YUE_YU"] as const,

	// 中国燕乐七声调式
	CHINESE_YANYUE: ["YAN_YUE_GONG", "YAN_YUE_SHANG", "YAN_YUE_JUE", "YAN_YUE_ZHI", "YAN_YUE_YU"] as const,

	// 其他常用系(2026-09-11 补全)
	NEAPOLITAN: ["NEAPOLITAN_MAJOR", "NEAPOLITAN_MINOR"] as const,
	HUNGARIAN: ["HUNGARIAN_MAJOR"] as const,
} as const

/**
 * 调式族类型
 */
export type T_ScaleModeGroup = keyof typeof SCALE_MODE_GROUPS
