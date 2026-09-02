// 类型导出
export type { I_ScaleModeMeta } from './static/types'

// 元数据映射表(数据源:ts-dev/raw-static/scale-modes.json5 → static-data/scale-modes.json)
export { SCALE_MODE_META_MAP } from './static/SCALE_MODE_META_MAP'
export { default as SCALE_MODE_ID } from './static/SCALE_MODE_ID'

// 方法函数
export { getScaleModeMetaById, getAllScaleModeMetaList } from './methods/getScaleModeMetaById'
