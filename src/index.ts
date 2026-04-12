// ==================== 类 ====================
export {Note} from "./Note"
export {Interval} from "./Interval"
export {Scale} from "./Scale"
export {Chord} from "./Chord"

// ==================== Note 模块 ====================
export {
	getBlackRandomNote,
	getNormalRandomNote,
	getCasualRandomNote,
	getWhiteRandomNote,
	getNoteByPianoKeyId,
	normalizeOctave
} from "./Note"
export {getUpwardPianoKeyGap} from "./Note"

// ==================== Interval 模块 ====================
export type {I_IntervalObj, I_GetEqualIntervalOptions} from "./Interval"
export {getIntervalByComparingNotes} from "./Interval"
export {getIntervalBySemitoneGap} from "./Interval"
export {getIntervalDegreeByStep} from "./Interval"
export {isPureInterval} from "./Interval"
export {intervalSlide_145, intervalSlide_2367} from "./Interval"

// ==================== Scale 模块 ====================
export type {t_scaleMode, t_scaleIntervalPanel, t_scaleNotesPanel, t_modeMetaObj, t_NotesListItem} from "./Scale"
export {SCALE_MODE, SCALE_MODE_ID, SCALE_MODE_IDS, SCALE_MODE_GROUPS} from "./Scale"
export type {T_ScaleModeId, T_ScaleModeGroup} from "./Scale"
export {getModeNameByModeKey, getModeTypeByModeKey, getIntervalListByModeKey} from "./Scale"

// ==================== Chord 模块 ====================
export {getChordTransformByPianoKeyIds} from "./Chord"

// ==================== Find 模块 ====================
export {findChord, findScaleByDegreePositions} from "./Find"
export type {I_DegreePositionConstraint, I_ScaleData} from "./Find"
export {findNotesInScales, areNotesInScale} from "./Find"
export type {I_NotesInScale, INoteDegree} from "./Find"
export {findNoteDegreeInAllScales, findNoteDegreeInScale} from "./Find"
export type {I_NoteDegreeInScale} from "./Find"

// ==================== Stave 模块 ====================
export {getScaleByStaveAlters, getStaveAlterByNote, getAlterStepListByNum} from "./Stave"

// ==================== Factory 模块 ====================
export {getNote, getInterval, getChord, getScale} from "./factory/index.ts"

// ==================== 五度圈 ====================
export * as circleOfFifths from "./CircleOfFifths"

// ==================== 数学工具 ====================
export * as Radix from "./common/radix"
