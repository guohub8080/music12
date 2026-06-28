import {Note} from "@note/cls/NoteClass";
import {T_IntervalType} from "@common/static/INTERVAL_TYPES";


export type t_scaleMode = "MAJ" | "DOR" | "PHR" | "LYD" | "MLY" | "MIN" | "ION" | "AEO"
	| "MMAJ" | "HMAJ" | "HMIN" | "MMIN" | "LOC" | "CG" | "CS" | "CJ" | "CZ" | "CY"

export type t_scaleModeObj = {
	baseMode: string,
	description: string,
	group: string
	intervalsFromRoot: [T_IntervalType, number][]
	isBase: boolean
	name: string
	tonality: string
	uid: t_scaleMode
}
export type t_scaleIntervalPanel = {
	2?: T_IntervalType | void
	3?: T_IntervalType | void
	4?: T_IntervalType | void
	5?: T_IntervalType | void
	6?: T_IntervalType | void
	7?: T_IntervalType | void
}

export type t_scaleNotesPanel = {
	1: InstanceType<typeof Note> | void
	2?: InstanceType<typeof Note> | void
	3?: InstanceType<typeof Note> | void
	4?: InstanceType<typeof Note> | void
	5?: InstanceType<typeof Note> | void
	6?: InstanceType<typeof Note> | void
	7?: InstanceType<typeof Note> | void
}
export type t_modeMetaObj = {
	uid: t_scaleMode,
	intervalsFromRoot: [T_IntervalType, number][],
	name: string,
	description: string,
}
export type t_NotesListItem = {
	intervalNum: string,
	intervalType: string,
	Note: InstanceType<typeof Note>
}
