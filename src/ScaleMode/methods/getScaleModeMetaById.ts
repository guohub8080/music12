import { values } from "lodash"
import { SCALE_MODE_META_MAP } from '../static/SCALE_MODE_META_MAP.js'
import type { I_ScaleModeMeta } from '../static/types.ts'

/**
 * 根据调式 ID 获取调式元数据
 */
export const getScaleModeMetaById = (scaleModeId: string): I_ScaleModeMeta => {
	const meta = SCALE_MODE_META_MAP[scaleModeId]
	if (!meta) {
		throw new Error(`Scale mode not found: ${scaleModeId}`)
	}
	return meta
}

/**
 * 获取所有调式元数据列表
 */
export const getAllScaleModeMetaList = (): I_ScaleModeMeta[] => {
	return values(SCALE_MODE_META_MAP)
}
