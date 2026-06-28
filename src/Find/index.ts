// ==================== Chord ====================
export { findChord } from "./findChord/index"

// 从 Scale 模块重新导出调式类型
export { SCALE_MODE, SCALE_MODE_IDS, SCALE_MODE_GROUPS } from "@scale/static/scaleModeTypes"
export type { T_ScaleModeId, T_ScaleModeGroup } from "@scale/static/scaleModeTypes"

// ==================== Notes ====================
export { findScaleByDegreePositions } from "./notes/findScaleByDegreePositions"
export type { I_DegreePositionConstraint, I_ScaleData } from "./notes/findScaleByDegreePositions"
export { findNotesInScales, areNotesInScale } from "./notes/findNotesInScales"
export type { I_NotesInScale, INoteDegree } from "./notes/findNotesInScales"
export { findNoteDegreeInAllScales, findNoteDegreeInScale } from "./notes/findNoteDegreeInScales"
export type { I_NoteDegreeInScale } from "./notes/findNoteDegreeInScales"
