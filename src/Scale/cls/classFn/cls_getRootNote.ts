import { getNoteByPianoKeyId } from "@note"

/**
 * 获取根音的 Note 实例
 * @param scale Scale 实例
 * @returns Note 实例数组
 */
export default function cls_getRootNote(scale: any) {
	return getNoteByPianoKeyId(scale.rootPianoKeyId)
}
