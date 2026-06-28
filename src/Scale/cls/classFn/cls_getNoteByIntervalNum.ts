/**
 * 根据音级数（度数）获取音符
 *
 * intervalNum 是**度数**概念：1=主音、2=二度音...7=七度音、8=高八度主音。
 * 按度数循环（每 7 度一个八度），支持跨八度。
 *
 * 五声调式（宫商角徵羽 = 1-2-3-5-6 度）缺 4 度和 7 度，传入这些
 * 不存在的度数时返回 null（而非抛错——五声缺音是乐理常态）。
 *
 * @param scale Scale 实例
 * @param num 音级数/度数（可以是跨八度的，如 9 表示九度=高二度音）
 * @returns pianoKeyId (0-11) + octave 信息；度数不存在时返回 null
 */
export default function cls_getNoteByIntervalNum(scale: any, num: number): { pianoKeyId: number; octave: number } | null {
	const normalizedDegree = ((num - 1) % 7) + 1
	const octaveOffset = Math.floor((num - 1) / 7)
	// 直接读取度数映射，五声缺音（4/7度=null）时返回 null
	const pianoKeyId = scale.scale.degreeToPianoKeyId[normalizedDegree]
	if (pianoKeyId === null || pianoKeyId === undefined) return null
	return {
		pianoKeyId: (pianoKeyId + octaveOffset * 12) % 12,
		octave: Math.floor((pianoKeyId + octaveOffset * 12) / 12)
	}
}
