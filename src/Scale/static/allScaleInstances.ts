/**
 * 调式实例聚合数据(552 条 = 46 调式 × 12 主音)
 *
 * monorepo 重构:数据已移至 shared/data/scale-instances.json
 * 此文件保留为转发层,消费方 import 路径不变。
 */

/**
 * 调式实例数据结构
 */
export type I_ScaleInstance = {
	/** 根音的钢琴键 ID (0-11) */
	pianoKeyIdRoot: number
	/** 调式 ID（如 "NATURAL_MAJOR", "DORIAN" 等） */
	scaleModeId: string
	/** 音阶所有音符的钢琴键 ID 列表 */
	pianoKeyIds: number[]
	/** 排序后的音符列表 */
	pianoKeyIdsSorted: number[]
	/** 度数到钢琴键 ID 的映射 */
	degreeToPianoKeyId: Record<number, number>
	/** 钢琴键 ID 到度数的映射 */
	pianoKeyIdToDegree: Record<number, number | null>
	/** 各音级的变音值（相对于自然音级） */
	degreeAlterationsMap: Record<number, number>
	/** 完整的调式元数据对象（序列化后类型为 any） */
	scaleMode: any
}

import { ALL_SCALE_META, getScaleInstance as _getScaleInstance } from "../../data-loader"

/**
 * 根据 rootPianoKeyId 和 scaleModeId 获取调式实例
 * @param rootPianoKeyId 根音的钢琴键 ID (0-11)
 * @param scaleModeId 调式 ID
 * @returns 调式实例，如果未找到返回 undefined
 */
export const getScaleInstance = (
	rootPianoKeyId: number,
	scaleModeId: string
): I_ScaleInstance | undefined => {
	return _getScaleInstance(rootPianoKeyId, scaleModeId) as I_ScaleInstance | undefined
}

export default ALL_SCALE_META as I_ScaleInstance[]
