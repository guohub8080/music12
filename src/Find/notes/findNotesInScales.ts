import { isNil } from "lodash"
import ALL_SCALE_META, { type I_ScaleInstance } from "../../Scale/static/allScaleInstances.ts"

/**
 * 音符在调式中的度数信息
 */
export type INoteDegree = {
	/** 音符的 pianoKeyId */
	pianoKeyId: number
	/** 在调式中的级数（1-7） */
	degree: number
	/** 该音级的变音值（0=自然, 1=#, -1=b） */
	alter: number
}

/**
 * 音符组在调式中的匹配信息
 */
export type I_NotesInScale = {
	/** 每个音符在调式中的度数信息（按输入顺序） */
	noteDegrees: INoteDegree[]
	/** 调式实例 */
	scale: I_ScaleInstance
}

/**
 * 查找一组音符共同属于哪些调式
 *
 * 此函数用于分析音符组合（如和弦）属于哪些调式。
 *
 * @param notePianoKeyIds - 要查找的音符钢琴键 ID 列表 (0-11)
 * @param options - 可选配置
 * @returns 包含所有这些音符的调式实例列表
 *
 * @example
 * ```ts
 * // 查找 C 大三和弦 (C-E-G) 属于哪些调式
 * findNotesInScales([0, 4, 7])
 * // → 返回 C 大调、G 大调、F 大调等调式实例
 *
 * // 只查找大调中的结果
 * findNotesInScales([0, 4, 7], { scaleModeIds: ['NATURAL_MAJOR'] })
 *
 * // 查找 D小三和弦 (D-F-A) 属于哪些小调
 * findNotesInScales([2, 5, 9], { scaleModeIds: ['NATURAL_MINOR'] })
 * ```
 */
export const findNotesInScales = (
	notePianoKeyIds: number[],
	options?: {
		/** 要筛选的调式 ID 列表 */
		scaleModeIds?: string[]
	}
): I_NotesInScale[] => {
	const { scaleModeIds } = options || {}
	const results: I_NotesInScale[] = []

	for (const scale of ALL_SCALE_META) {
		// 筛选调式
		if (scaleModeIds && scaleModeIds.length > 0 && !scaleModeIds.includes(scale.scaleModeId)) {
			continue
		}

		// 检查所有输入音符是否都在此调式中，同时计算度数信息
		const noteDegrees: INoteDegree[] = []
		const allNotesInScale = notePianoKeyIds.every((pianoKeyId) => {
			const degree = scale.pianoKeyIdToDegree[pianoKeyId]
			if (!isNil(degree)) {
				const alter = scale.degreeAlterationsMap[degree] ?? 0
				noteDegrees.push({ pianoKeyId, degree, alter })
				return true
			}
			return false
		})

		if (allNotesInScale) {
			results.push({
				noteDegrees,
				scale,
			} as I_NotesInScale)
		}
	}

	return results
}

/**
 * 检查一组音符是否属于指定调式
 */
export const areNotesInScale = (
	notePianoKeyIds: number[],
	rootPianoKeyId: number,
	scaleModeId: string
): boolean => {
	const scale = ALL_SCALE_META.find(
		(s) => s.pianoKeyIdRoot === rootPianoKeyId && s.scaleModeId === scaleModeId
	)

	if (!scale) return false

	return notePianoKeyIds.every((pianoKeyId) => {
		const degree = scale.pianoKeyIdToDegree[pianoKeyId]
		return !isNil(degree)
	})
}

export default findNotesInScales
