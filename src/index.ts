// ==================== 类 ====================
export {Note} from "@note"
export {Interval} from "@interval"
export {Scale} from "@scale"
export {Chord} from "@chord"

// ==================== Note 模块 ====================
export {
	getBlackRandomNote,
	getNormalRandomNote,
	getCasualRandomNote,
	getWhiteRandomNote,
	getNoteByPianoKeyId,
	normalizeOctave
} from "@note"
export {getUpwardPianoKeyGap} from "@note"

// ==================== Interval 模块 ====================
export type {I_IntervalObj, I_GetEqualIntervalOptions} from "@interval"
export {getIntervalByComparingNotes} from "@interval"
export {getIntervalBySemitoneGap} from "@interval"
export {getIntervalDegreeByStep} from "@interval"
export {isPureInterval} from "@interval"
export {intervalSlide_145, intervalSlide_2367} from "@interval"

// ==================== Scale 模块 ====================
export type {t_scaleMode, t_scaleIntervalPanel, t_scaleNotesPanel, t_modeMetaObj, t_NotesListItem} from "@scale"
export {SCALE_MODE, SCALE_MODE_ID, SCALE_MODE_IDS, SCALE_MODE_GROUPS} from "@scale"
export type {T_ScaleModeId, T_ScaleModeGroup} from "@scale"
export {getModeNameByModeKey, getModeTypeByModeKey, getIntervalListByModeKey} from "@scale"

// ==================== Chord 模块 ====================
export {getChordTransformByPianoKeyIds} from "@chord"

// ==================== ChordFormula 模块 ====================
export {getChordFormulaByTags, deriveTags} from "@chord-formula"
export type {ChordTag} from "@chord-formula"

// ==================== Find 模块 ====================
export {findChord, findScaleByDegreePositions} from "@find"
export type {I_DegreePositionConstraint, I_ScaleData} from "@find"
export {findNotesInScales, areNotesInScale} from "@find"
export type {I_NotesInScale, INoteDegree} from "@find"
export {findNoteDegreeInAllScales, findNoteDegreeInScale} from "@find"
export type {I_NoteDegreeInScale} from "@find"

// ==================== Stave 模块 ====================
export {getScaleByStaveAlters, getStaveAlterByNote, getAlterStepListByNum} from "@stave"

// ==================== Factory 模块 ====================
export {getNote, getInterval, getChord, getScale} from "@factory"

// ==================== 五度圈 ====================
export * as circleOfFifths from "@circle-of-fifths"

// ==================== 数学工具 ====================
export {Radix, Base7Radix, Base12Radix, StepRadix, IntervalRadix, ScaleRadix} from "@common/radix"
