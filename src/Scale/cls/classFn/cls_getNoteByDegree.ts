import { getNoteByPianoKeyId } from "../../../Note"
import { isNil } from "lodash"

/**
 * 获取指定度数的 Note 实例
 * @param scale Scale 实例
 * @param degree 度数（1-7）
 * @returns Note 实例数组
 */
export default function cls_getNoteByDegree(scale: any, degree: number) {
	const pianoKeyId = scale.scale.degreeToPianoKeyId[degree]
	if (isNil(pianoKeyId)) {
		throw new Error(`Degree ${degree} not found in scale`)
	}
	return getNoteByPianoKeyId(pianoKeyId)
}
