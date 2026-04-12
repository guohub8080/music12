import { findChord, type I_AnalyzedChordResult } from "../../../Find/findChord/index.ts"

/**
 * 获取指定音级的顺阶七和弦（通过 findChord 识别）
 * @param scale Scale 实例
 * @param scaleDegree 音级（1-7）
 * @returns 匹配的和弦结果列表
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

	return findChord(pianoKeyIds)
}
