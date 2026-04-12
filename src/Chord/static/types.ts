import {T_IntervalType} from "../../common/static/INTERVAL_TYPES.ts";
import {Note} from "../../Note/cls/NoteClass.ts";


// 和弦音程度数类型
export type I_ChordIntervalNum = 2 | 3 | 4 | 5 | 6 | 7 | 9 | 11 | 13

// 变换面板类型（记录各度数的变换状态）
export type I_TransformPanel = {
  2: T_IntervalType | "omit" | void
  3: T_IntervalType | "omit" | void
  4: T_IntervalType | "omit" | void
  5: T_IntervalType | "omit" | void
  6: T_IntervalType | "omit" | void
  7: T_IntervalType | "omit" | void
  9: T_IntervalType | "omit" | void
  11: T_IntervalType | "omit" | void
  13: T_IntervalType | "omit" | void
}

/** 空的变换面板常量（所有度数均为 undefined，表示无变换） */
export const EMPTY_TRANSFORM_PANEL: I_TransformPanel = {
  2: void 0, 3: void 0, 4: void 0, 5: void 0, 6: void 0,
  7: void 0, 9: void 0, 11: void 0, 13: void 0
} as const

// 输入变换面板类型（可选字段）
export type I_InputTransformPanel = {
  2?: T_IntervalType | "omit" | void
  3?: T_IntervalType | "omit" | void
  4?: T_IntervalType | "omit" | void
  5?: T_IntervalType | "omit" | void
  6?: T_IntervalType | "omit" | void
  7?: T_IntervalType | "omit" | void
  9?: T_IntervalType | "omit" | void
  11?: T_IntervalType | "omit" | void
  13?: T_IntervalType | "omit" | void
} | {} | undefined

// 音程面板类型（记录各度数的音程类型）
export type I_ChordIntervalPanel = {
  2: T_IntervalType | void
  3: T_IntervalType | void
  4: T_IntervalType | void
  5: T_IntervalType | void
  6: T_IntervalType | void
  7: T_IntervalType | void
  9: T_IntervalType | void
  11: T_IntervalType | void
  13: T_IntervalType | void
}

/** 空的音程面板常量（所有度数均为 undefined） */
export const EMPTY_INTERVAL_PANEL: I_ChordIntervalPanel = {
  2: void 0, 3: void 0, 4: void 0, 5: void 0, 6: void 0,
  7: void 0, 9: void 0, 11: void 0, 13: void 0
} as const

// 和弦音符面板类型（记录各度数的音符实例）
export type I_ChordNotesPanel = {
  1: InstanceType<typeof Note>
  2: InstanceType<typeof Note> | void
  3: InstanceType<typeof Note> | void
  4: InstanceType<typeof Note> | void
  5: InstanceType<typeof Note> | void
  6: InstanceType<typeof Note> | void
  7: InstanceType<typeof Note> | void
  9: InstanceType<typeof Note> | void
  11: InstanceType<typeof Note> | void
  13: InstanceType<typeof Note> | void
}

// 八度配置类型
export type I_OctaveConfig = {
  n1?: number[] | number,
  2?: number[] | number,
  3?: number[] | number,
  4?: number[] | number,
  5?: number[] | number,
  6?: number[] | number,
  7?: number[] | number,
  9?: number[] | number,
  11?: number[] | number,
  13?: number[] | number,
}

// 和弦排列类型
export type I_ChordVoicing = {
  octaveConfigs: I_OctaveConfig
  additionalNotes: [] | InstanceType<typeof Note>[]
}

// 钢琴键位到音程的映射
export type I_ChordIntervalObj = {
  intervalType: T_IntervalType | string  // 放宽为 string 以支持自动生成的元数据
  intervalNum: number
}

export type I_PianoKeyIdToInterval = {
  [key: number]: I_ChordIntervalObj
}

// 音程到钢琴键位的反向映射
export type I_IntervalToPianoKeyObj = {
  intervalType: T_IntervalType | string  // 放宽为 string 以支持自动生成的元数据
  pianoKeyId: number
}

export type I_IntervalToPianoKeyId = {
  [degree: number]: I_IntervalToPianoKeyObj
}

// ==================== 和弦实例元数据类型 ====================

/** 单个音符信息（用于和弦实例元数据） */
export type I_ChordNoteMeta = {
  step: string
  alter: number
  octaveGapToRoot: number
}

/** 单个根音变体信息 */
export type I_ChordRootVariantMeta = {
  rootNoteStep: string
  rootNoteAlter: number
  isRootNoteNormal: boolean
  isValid: boolean
  notesMap: Record<number, I_ChordNoteMeta>
}

/** 和弦实例元数据（某个和弦公式在某个根音上的完整数据） */
export type I_ChordInstanceMeta = {
  /** 根音钢琴键 ID (0-11) */
  pianoKeyIdRoot: number
  /** 和弦公式 ID */
  chordFormulaId: string
  /** 音符钢琴键 ID 列表（未排序） */
  pianoKeyIds: number[]
  /** 排序后的音符钢琴键 ID 列表 */
  pianoKeyIdsSorted: number[]
  /** 音符数量 */
  notesNum: number
  /** 钢琴键 ID → 音程映射 */
  pianoKeyIdToInterval: I_PianoKeyIdToInterval
  /** 音程 → 钢琴键 ID 映射 */
  intervalToPianoKeyId: I_IntervalToPianoKeyId
  /** 所有根音变体的音符详情 */
  notes: I_ChordRootVariantMeta[]
}
