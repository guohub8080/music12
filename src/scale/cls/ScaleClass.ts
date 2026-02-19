// noinspection ES6PreferShortImport

import {ScaleRadix} from "../../common/radix/scaleRadix.ts";
import {Note} from "../../note/cls/NoteClass";
import {t_scaleIntervalPanel, t_scaleMode} from "../static/types";
import cls_initScale from "./classFn/cls_initScale";
import cls_getNotesList from "./classFn/cls_getNotesList.ts";
import cls_getNotesPanel from "./classFn/cls_getNotesPanel.ts";
import cls_getNoteByIntervalNum from "./classFn/cls_getNoteByIntervalNum.ts";
import cls_getIntervalList from "./classFn/cls_getIntervalList.ts";
import {ScaleError} from "../../common/processError/errorTypes.ts";
import cls_getAlterList from "./classFn/cls_getAlterList.ts";
import cls_getDegreeNote from "./classFn/cls_getDegreeNote.ts";
import cls_findDegreeChordInScale from "./classFn/cls_findDegreeChordInScale.ts";
import cls_findOneChordInScale from "./classFn/cls_findOneChordInScale.ts";
import {Chord} from "../../chord/cls/ChordClass.ts";

export class Scale {
	public modeDescription: string
	public intervalPanel: t_scaleIntervalPanel
	public alterSum: number
	public alterTimesSum: number
	public rootNote: InstanceType<typeof Note>
	readonly #modeUID: string
	public modeName: string
	public type: string


	constructor(rootNote: InstanceType<typeof Note>, scaleMode: t_scaleMode) {
		if (Math.abs(rootNote.alter) > 1) throw new ScaleError("The root note's alter is too big.")
		const scaleInitInfo = cls_initScale(rootNote, scaleMode)
		this.intervalPanel = scaleInitInfo.intervalPanel
		this.rootNote = rootNote
		this.modeDescription = scaleInitInfo.description
		this.type = scaleInitInfo.type
		this.alterSum = scaleInitInfo.includedAlters
		this.alterTimesSum = scaleInitInfo.staveAlterTimes
		this.modeName = scaleInitInfo.modeName
		this.#modeUID = scaleInitInfo.modeUID
	}

	public get chord3OfDegreesList() {
		return cls_findDegreeChordInScale(this.notesList, true)
	}

	public get chord7OfDegreesList() {
		return cls_findDegreeChordInScale(this.notesList, false)
	}

	public get notesList() {
		return cls_getNotesList(this.rootNote, this.intervalList)
	}

	public get intervalList() {
		return cls_getIntervalList(this.intervalPanel)
	}

	public get notesPanel() {
		return cls_getNotesPanel(this.rootNote, this.intervalList)
	}

	public get naturalNotesNum(): number {
		return this.notesList.filter(x => x.alter === 0).length
	}

	public get alteredNotesNum(): number {
		return this.notesList.filter(x => Math.abs(x.alter) >= 1).length
	}

	public get sharpOrFlatNotesNum(): number {
		return this.notesList.filter(x => Math.abs(x.alter) === 1).length
	}

	public get doubleSharpOrFlatNotesNum(): number {
		return this.notesList.filter(x => Math.abs(x.alter) === 2).length
	}

	public get alterList() {
		return cls_getAlterList(this.intervalList)
	}

	public get isTonicReplaced(): boolean {
		return this.alteredNotesNum === this.notesList.length
	}

	public getNoteByIntervalNum(num: number, isWithinOctave = false): InstanceType<typeof Note> {
		return cls_getNoteByIntervalNum(this.notesList, num, isWithinOctave)
	}


	public get simpleDescription() {
		return this.notesList.map(x => x.artName + x.octave).join(",")
	}

	public get equalRootNote(): InstanceType<typeof Note> {
		if (this.isTonicReplaced) {
			return this.rootNote.getSamePitchNotes(false, 1)[0]
		}
		return this.rootNote
	}

	public getScaleDegreeNote(degree: number): InstanceType<typeof Note> {
		return cls_getDegreeNote(this.notesList, degree)
	}

	private getScaleDegreeChord3Key(scaleDegree: number) {
		return cls_findOneChordInScale(this.notesList, scaleDegree, true)
	}

	private getScaleDegreeChord7Key(scaleDegree: number) {
		return cls_findOneChordInScale(this.notesList, scaleDegree, false)
	}

	public getScaleDegreeChord3(scaleDegree: number) {
		const scaleRadix = new ScaleRadix(scaleDegree).scaleDegree
		return new Chord(this.notesList[scaleRadix - 1], this.getScaleDegreeChord3Key(scaleDegree))
	}

	public getScaleDegreeChord7(scaleDegree: number) {
		const scaleRadix = new ScaleRadix(scaleDegree).scaleDegree
		return new Chord(this.notesList[scaleRadix - 1], this.getScaleDegreeChord7Key(scaleDegree))
	}

}
