// 类
export {Scale} from "./cls/ScaleClass"

// 类型
export type {t_scaleMode, t_scaleIntervalPanel, t_scaleNotesPanel, t_modeMetaObj, t_NotesListItem} from "./static/types"

// 预设常量
export {default as SCALE_MODE_ID} from "@scale-mode/static/SCALE_MODE_ID"
export {SCALE_MODE, SCALE_MODE_IDS, SCALE_MODE_GROUPS} from "./static/scaleModeTypes"
export type {T_ScaleModeId, T_ScaleModeGroup} from "./static/scaleModeTypes"

// 工具函数
export {getModeNameByModeKey} from "./methods/getModeNameByModeKey"
export {getModeTypeByModeKey} from "./methods/getModeTypeByModeKey"
export {getIntervalListByModeKey} from "./methods/getIntervalListByModeKey"
