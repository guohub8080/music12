// noinspection ES6PreferShortImport

import {Note} from "../../note/cls/NoteClass";
import {t_intervalType} from "../../interval/static/types";


export type t_scaleMode = "MAJ" | "DOR" | "PHR" | "LYD" | "MLY" | "MIN" | "ION" | "AEO"
	| "MMAJ" | "HMAJ" | "HMIN" | "MMIN" | "LOC" | "CG" | "CS" | "CJ" | "CZ" | "CY"

export type t_scaleModeObj = {
	baseMode: string,
	description: string,
	group: string
	intervalList: [t_intervalType, number][]
	isBase: boolean
	name: string
	tonality: string
	uid: t_scaleMode
}
export type t_scaleIntervalPanel = {
	2?: t_intervalType | void
	3?: t_intervalType | void
	4?: t_intervalType | void
	5?: t_intervalType | void
	6?: t_intervalType | void
	7?: t_intervalType | void
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
	intervalList: [t_intervalType, number][],
	name: string,
	description: string,
}
export type t_NotesListItem = {
	intervalNum: string,
	intervalType: string,
	Note: InstanceType<typeof Note>
}
