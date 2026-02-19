// noinspection ES6PreferShortImport

import {Note} from "../../note/cls/NoteClass";
import {t_scaleIntervalPanel, t_scaleMode, t_scaleNotesPanel} from "../static/types";
import cls_initScale from "./classFn/cls_initScale";
import {t_intervalList} from "../../interval/static/types";
import cls_getScaleDegree from "./classFn/cls_getScaleDegree";
import cls_getNotesList from "./classFn/cls_getNotesList.ts";
import cls_getNotesPanel from "./classFn/cls_getNotesPanel.ts";
import cls_getNoteByIntervalNum from "./classFn/cls_getNoteByIntervalNum.ts";
import cls_initCustomizedScale from "./classFn/customizedScale/cls_initCustomizedScale.ts";
import {keys, range, snakeCase, toNumber} from "lodash";
import {Interval} from "../../interval/cls/IntervalClass.ts";
import cls_analyseChord from "./classFn/customizedScale/cls_analyseChord.ts";

export class CustomizedScale {
	public modeName: string
	#intervalPanel: t_scaleIntervalPanel
	#initNotesPanel: t_scaleNotesPanel
	#rootNote: InstanceType<typeof Note>
	public rootNote: InstanceType<typeof Note>
	public isTonicNoteReplaced: boolean

	constructor(rootNote: InstanceType<typeof Note>, modeName: string, intervalPanel: t_scaleIntervalPanel) {
		const scaleInitInfo = cls_initCustomizedScale(rootNote, intervalPanel)
		this.modeName = modeName
		this.#intervalPanel = intervalPanel
		this.#initNotesPanel = scaleInitInfo.notesPanel
		this.#rootNote = rootNote
		this.isTonicNoteReplaced = scaleInitInfo.scaleLength === scaleInitInfo.alterList.length
		this.rootNote = this.isTonicNoteReplaced ? rootNote.getSamePitchNotes(false, 1)[0] : rootNote
	}

	public get intervalList() {
		const result = []
		for (const i of keys(this.#intervalPanel)) result.push([this.#intervalPanel[i], toNumber(i)])
		return result
	}

	get #notesPanel(): t_scaleNotesPanel {
		if (this.isTonicNoteReplaced) {
			const result = {1: this.rootNote}
			for (const i of range(2, 8)) {
				if (this.#intervalPanel[i]) {
					const targetInterval = new Interval(this.#intervalPanel[i], i)
					result[i] = this.rootNote.getNoteByInterval(targetInterval)
				} else result[i] = void 0
			}
			return result
		} else return this.#initNotesPanel
	}

	public get notesList(): InstanceType<typeof Note>[] {
		return keys(this.#notesPanel).map(x => this.#notesPanel[x]).filter(Boolean)
	}

	public get degreeChord3() {
		return cls_analyseChord(this.notesList, 3)
	}

	public get degreeChord7() {
		return cls_analyseChord(this.notesList, 7)
	}

	public get scaleLength() {
		return this.intervalList.length + 1
	}

	public get simpleDescription() {
		return this.notesList.map(x => x.artName + x.octave).join(",")
	}


}
