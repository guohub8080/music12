import cls_getNoteByInterval from "./classFn/cls_getNoteByInterval";
import {t_alterValue, t_noteStep} from "../static/types";
import cls_getSamePitchNotes from "./classFn/cls_getSamePitchNotes";
import cls_getOvertoneSeries from "./classFn/cls_getHarmonicSeries";
import {initNoteClass} from "./classFn/cls_initNoteClass";
import {Interval} from "../../interval/cls/IntervalClass";
import cls_getNoteByNumberNotation from "./classFn/cls_getNoteByString";
import cls_getTemp251 from "./classFn/cls_getTemp251.ts";
import cls_semitoneMove from "./classFn/cls_semitoneMove.ts";

export class Note {
  public octave: number;
  public step: t_noteStep;
  public alter: t_alterValue;
  public artName: string;
  public mathName: string;
  public fifthValue: number;
  public isNormal: boolean;
  public isBlack: boolean;
  public locationId: number;
  public semitoneWithinOctave: number;
  public stepIndex: number;

  constructor(step: t_noteStep = "C", alter: t_alterValue = 0, octave: number = 4) {
    const noteObj = initNoteClass(step, alter)
    this.step = noteObj.step
    this.alter = noteObj.alter
    this.octave = octave
    this.artName = noteObj.artName
    this.mathName = noteObj.mathName
    this.fifthValue = noteObj.fifthValue
    this.isNormal = noteObj.isNormal
    this.isBlack = noteObj.isBlack
    this.locationId = noteObj.locationId
    this.semitoneWithinOctave = noteObj.semitone
    this.stepIndex = noteObj.stepIndex
  }


  public get pitchValue() {
    return this.octave * 12 + this.semitoneWithinOctave
  }

  public get simpleDescription() {
    return `${this.artName}${this.octave}`
  }


  public getNoteByInterval(intervalInstance: InstanceType<typeof Interval>,
                           isAscending = true): InstanceType<typeof Note> {
    return cls_getNoteByInterval(this, intervalInstance, isAscending)
  }

  public getNoteByIntervalString(numberNotationString: string, isAscending = true): InstanceType<typeof Note> {
    return cls_getNoteByNumberNotation(this, numberNotationString, isAscending)
  }

  public getSamePitchNotes(isSelfIncluded = true, alterAbsLessThan: 0 | 1 | 2 = 1): InstanceType<typeof Note>[] {
    return cls_getSamePitchNotes(this, isSelfIncluded, alterAbsLessThan)
  }

  public semitoneMove(moveStep: number) {
    return cls_semitoneMove(this, moveStep)
  }

  public getHarmonicSeries() {
    return cls_getOvertoneSeries(this.step, this.alter, this.octave)
  }

  public get251as(noteAs: number) {
    return cls_getTemp251(this, noteAs)
  }
}
