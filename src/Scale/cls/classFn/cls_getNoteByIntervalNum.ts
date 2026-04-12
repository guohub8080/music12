/**
 * 根据音级数获取音符
 * @param scale Scale 实例
 * @param num 音级数（可以是跨八度的，如 9 表示九音）
 * @returns pianoKeyId (0-11) + octave 信息
 */
export default function cls_getNoteByIntervalNum(scale: any, num: number): { pianoKeyId: number; octave: number } {
	const normalizedDegree = ((num - 1) % 7) + 1
	const octaveOffset = Math.floor((num - 1) / 7)
	const pianoKeyId = scale.getPianoKeyIdByDegree(normalizedDegree)
	return {
		pianoKeyId: (pianoKeyId + octaveOffset * 12) % 12,
		octave: Math.floor((pianoKeyId + octaveOffset * 12) / 12)
	}
}
