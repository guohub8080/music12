import { findChord, type I_AnalyzedChordResult } from "@find/findChord"

/**
 * 获取指定音级的顺阶七和弦（通过 findChord 识别）
 *
 * 调式和弦的语义是"以该级音为根"，因此结果按 isRootPosition 优先排序：
 * 根音在原位的（isRootPosition=true）排在最前，其余等和弦记法在后。
 *
 * @param scale Scale 实例
 * @param scaleDegree 音级（1-7）
 * @returns 匹配的和弦结果列表（isRootPosition=true 优先）
 */
export default function cls_getScaleDegreeChord7(scale: any, scaleDegree: number): I_AnalyzedChordResult[] {
	if (scaleDegree < 1 || scaleDegree > 7) {
		throw new RangeError("scaleDegree must be between 1 and 7")
	}

	const ids = scale.scale.pianoKeyIds
	const d = (offset: number) => (scaleDegree - 1 + offset) % ids.length

	const pianoKeyIds = [
		ids[d(0)],  // 根音
		ids[d(2)],  // 三度
		ids[d(4)],  // 五度
		ids[d(6)],  // 七度
	]

	const results = findChord(pianoKeyIds)
	// 调式和弦以该级音为根，优先返回根音 === 该级音的结果。
	// 不用 isRootPosition（它判 mod12 最低音，对 0-11 音高类输入不可靠）。
	const rootKeyId = ids[d(0)]
	return results.sort((a, b) => {
		const aIsRoot = a.pianoKeyIdRoot === rootKeyId ? 0 : 1
		const bIsRoot = b.pianoKeyIdRoot === rootKeyId ? 0 : 1
		return aIsRoot - bIsRoot
	})
}
