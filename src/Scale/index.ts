// 类
export {Scale} from "./cls/ScaleClass.ts"

// 类型
export type {t_scaleMode, t_scaleIntervalPanel, t_scaleNotesPanel, t_modeMetaObj, t_NotesListItem} from "./static/types.ts"

// 预设常量
export {default as SCALE_MODE_ID} from "../ScaleMode/static/SCALE_MODE_ID.ts"
export {SCALE_MODE, SCALE_MODE_IDS, SCALE_MODE_GROUPS} from "./static/scaleModeTypes.ts"
export type {T_ScaleModeId, T_ScaleModeGroup} from "./static/scaleModeTypes.ts"

// 工具函数
export {getModeNameByModeKey} from "./methods/getModeNameByModeKey.ts"
export {getModeTypeByModeKey} from "./methods/getModeTypeByModeKey.ts"
export {getIntervalListByModeKey} from "./methods/getIntervalListByModeKey.ts"
