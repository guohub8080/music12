import { SCALE_MODE_META_MAP } from '../static/SCALE_MODE_META_MAP'
import type { I_ScaleModeMeta } from '../static/types'

/**
 * 按标签获取调式元数据（支持多标签交集）
 *
 * 返回同时包含所有给定标签的调式。标签分两类（编译期合并）：
 *   源手写家族标签：diatonic / harmonic-minor / melodic-minor / harmonic-major /
 *     melodic-major / double-harmonic / pentatonic / chinese / yayue / qingyue /
 *     yanyue / neapolitan / hungarian + 用途（jazz / flamenco…）
 *   编译派生特征标签：变音（b2 / #4 / bb7 …）、缺度（no4 / no7）、
 *     音数（pentatonic / hexatonic / heptatonic）
 * （镜像 getChordFormulaByTags 的交集语义）
 *
 * @param tags - 要匹配的标签数组（取交集，即调式必须同时含所有标签）
 * @returns 匹配的调式元数据列表
 *
 * @example
 * // 所有含 #4 的七声调式（Lydian 系 + Lydian Dominant + Dorian #4 …）
 * getScaleModeByTags(["#4", "heptatonic"])
 *
 * // 旋律小调家族全部成员（补全后 7 个）
 * getScaleModeByTags(["melodic-minor"])
 *
 * // 中国五声（缺 4 度和 7 度的形）
 * getScaleModeByTags(["pentatonic", "chinese"])
 */
export const getScaleModeByTags = (tags: string[]): I_ScaleModeMeta[] => {
	return Object.values(SCALE_MODE_META_MAP).filter((meta) =>
		tags.every((tag) => meta.tags.includes(tag)),
	)
}
