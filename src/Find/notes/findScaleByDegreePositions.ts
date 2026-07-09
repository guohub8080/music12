import { isEmpty, toPairs } from 'es-toolkit/compat'
import ALL_SCALE_META, { type I_ScaleInstance } from "@scale/static/allScaleInstances"

/**
 * 音符位置约束
 *
 * 用于指定某个音程（度数）必须位于特定的钢琴键位上。
 *
 * @param pianoKeyId - 钢琴键 ID (0-11)，其中 0=C, 1=C#/Db, ..., 11=B
 * @param as - 音程度数，支持单音程(1-7)和复音程(8-14)
 *
 * @example
 * ```ts
 * // 根音 C
 * { pianoKeyId: 0, as: 1 }
 * // 三度音 E（用单音程）
 * { pianoKeyId: 4, as: 3 }
 * // 三度音 E（用复音程表示高八度）
 * { pianoKeyId: 4, as: 10 }
 * ```
 */
export type I_DegreePositionConstraint = {
	pianoKeyId: number
	as: number
}

/**
 * 调式数据结构
 *
 * @description
 * - rootNotePianoKey: 根音的钢琴键 ID
 * - scaleModeId: 调式 ID（如 'NATURAL_MAJOR', 'DORIAN' 等）
 * - notesPianoKeyList: 音阶所有音符的钢琴键 ID 列表（7个元素，索引0-6对应度数1-7）
 * - orderedNotesPianoKeyList: 有序音符列表
 */
export type I_ScaleData = {
	rootNotePianoKey: number
	scaleModeId: string
	notesPianoKeyList: number[]
	orderedNotesPianoKeyList: number[]
}

/**
 * 将复音程转换为单音程
 *
 * 音乐理论中，音程超过八度称为复音程。
 * 复音程可以通过减去 7 转换为对应的单音程。
 *
 * 转换规则：
 * - 1 度 → 1 度（根音）
 * - 8 度（八度）→ 1 度（根音）
 * - 9 度 → 2 度
 * - 10 度 → 3 度
 * - 11 度 → 4 度
 * - 12 度 → 5 度
 * - 13 度 → 6 度
 * - 14 度 → 7 度
 *
 * @param degree - 原始度数 (1-14)
 * @returns 标准化后的度数 (1-7)
 *
 * @example
 * ```ts
 * normalizeDegree(1)   // → 1 (根音)
 * normalizeDegree(8)   // → 1 (八度 → 根音)
 * normalizeDegree(9)   // → 2 (九度 → 二度)
 * normalizeDegree(14)  // → 7 (十四度 → 七度)
 * normalizeDegree(3)   // → 3 (三度保持不变)
 * ```
 */
const normalizeDegree = (degree: number): number => {
	// 0 和 1 都表示根音（兼容旧版 API）
	if (degree === 0 || degree === 1) {
		return 1
	}
	// 复音程 (8-14) 转换为单音程
	if (degree >= 8 && degree <= 14) {
		return degree - 7
	}
	return degree
}

/**
 * 根据度数位置约束查找调式
 *
 * 此函数通过指定某些度数必须位于的钢琴键位来查找匹配的调式。
 *
 * 与 `findNotesInScales` 的区别：
 * - `findScaleByDegreePositions`：指定**度数位置**（如"根音是 C，三度是 E"）
 * - `findNotesInScales`：只指定**音符组合**（如"包含 C、E、G"）
 *
 * @param constraints - 度数位置约束列表
 * @returns 匹配的调式数据数组
 *
 * @example
 * ```ts
 * // 查找根音为 C、三度为 E 的调式
 * findScaleByDegreePositions([
 *   { pianoKeyId: 0, as: 1 },   // 根音（C）
 *   { pianoKeyId: 4, as: 3 },   // 大三度（E）
 * ])
 * // → 返回 C 大调、C 利底亚等调式
 * ```
 *
 * @example
 * ```ts
 * // 查找根音为 C 且三度音为 Eb 的调式
 * findScaleByDegreePositions([
 *   { pianoKeyId: 0, as: 1 },   // 根音在 C
 *   { pianoKeyId: 3, as: 3 },   // 小三度在 Eb (3)
 * ])
 * // → 返回 C 小调、C 弗里吉亚等调式
 * ```
 *
 * @example
 * ```ts
 * // 使用复音程查找
 * findScaleByDegreePositions([
 *   { pianoKeyId: 0, as: 1 },    // 根音在 C
 *   { pianoKeyId: 4, as: 10 },   // 十度音程（实际是三度 E）
 * ])
 * // → 同样会返回根音为 C、三度为 E 的调式
 * ```
 */
export const findScaleByDegreePositions = (
	constraints: I_DegreePositionConstraint[]
): I_ScaleData[] => {
	// 如果没有约束条件，返回空数组
	if (isEmpty(constraints)) {
		return []
	}

	// ==================== 步骤 1：构建约束条件映射 ====================
	// 将用户输入的度数-位置对转换为易于查找的映射表
	// 例如：{ 1: 0, 3: 4, 5: 7 } 表示根音在 0，三度在 4，五度在 7
	const constraintMap: Record<number, number> = {}

	for (const constraint of constraints) {
		// 将复音程标准化为单音程
		const degree = normalizeDegree(constraint.as)

		// 只有调式中可能存在的度数才添加约束（1-7）
		if (degree >= 1 && degree <= 7) {
			constraintMap[degree] = constraint.pianoKeyId
		}
	}

	// ==================== 步骤 2：遍历所有调式数据，筛选符合条件的 ====================
	const results: I_ScaleData[] = []

	for (const scale of ALL_SCALE_META) {
		let isMatch = true

		// 检查每个约束条件
		for (const [degree, expectedPianoKeyId] of toPairs(constraintMap)) {
			const degreeNum = Number(degree)

			// 使用 degreeToPianoKeyId 映射检查该度数对应的音符是否匹配
			const actualPianoKeyId = scale.degreeToPianoKeyId[degreeNum]

			// 如果位置不匹配，则不符合条件
			if (actualPianoKeyId !== expectedPianoKeyId) {
				isMatch = false
				break
			}
		}

		// 如果所有约束都满足，将此调式加入结果
		if (isMatch) {
			results.push({
				rootNotePianoKey: scale.pianoKeyIdRoot,
				scaleModeId: scale.scaleModeId,
				notesPianoKeyList: scale.pianoKeyIds,
				orderedNotesPianoKeyList: scale.pianoKeyIdsSorted,
			})
		}
	}

	return results
}

export default findScaleByDegreePositions
