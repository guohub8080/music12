import { isDefined } from "@common/utils/isDefined"
import isNil from "lodash/isNil"
import ALL_SCALE_META, { type I_ScaleInstance } from "@scale/static/allScaleInstances"

/**
 * 音符在调式中的级数信息
 */
export type I_NoteDegreeInScale = {
	/** 该音符在调式中的级数（1-7） */
	degree: number
	/** 该音级的变音值（0=自然, 1=#, -1=b） */
	alter: number
	/** 调式实例 */
	scale: I_ScaleInstance
}

/**
 * 查找一个音符在所有调式中的级数
 *
 * 自动排除：音符作为根音的调式。
 *
 * @param pianoKeyId - 要查找的音符的钢琴键 ID (0-11)
 * @param options - 可选配置
 * @returns 包含该音符的所有调式实例及级数信息
 */
export const findNoteDegreeInAllScales = (
	pianoKeyId: number,
	options?: {
		/** 要筛选的调式 ID 列表 */
		scaleModeIds?: string[]
	}
): I_NoteDegreeInScale[] => {
	const { scaleModeIds } = options || {}
	const results: I_NoteDegreeInScale[] = []

	for (const scale of ALL_SCALE_META) {
		// 筛选调式
		if (scaleModeIds && scaleModeIds.length > 0 && !scaleModeIds.includes(scale.scaleModeId)) {
			continue
		}

		// 排除根音调式
		if (scale.pianoKeyIdRoot === pianoKeyId) {
			continue
		}

		const degree = scale.pianoKeyIdToDegree[pianoKeyId]

		if (isDefined(degree)) {
			const alter = scale.degreeAlterationsMap[degree] ?? 0

			results.push({
				degree,
				alter,
				scale,
			} as I_NoteDegreeInScale)
		}
	}

	return results
}

/**
 * 查找一个音符在指定调式中的级数
 */
export const findNoteDegreeInScale = (
	pianoKeyId: number,
	rootPianoKeyId: number,
	scaleModeId: string
): number | null => {
	const scale = ALL_SCALE_META.find(
		(s) => s.pianoKeyIdRoot === rootPianoKeyId && s.scaleModeId === scaleModeId
	)

	if (isNil(scale)) return null

	const degree = scale.pianoKeyIdToDegree[pianoKeyId]
	return isDefined(degree) ? degree : null
}

export default findNoteDegreeInAllScales
