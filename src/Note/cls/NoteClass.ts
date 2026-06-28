import cls_getNoteByInterval from "./classFn/cls_getNoteByInterval";
import { T_AlterValue, T_NoteStep } from "@common/static/NOTE_TYPES";
import cls_getSamePitchNotes from "./classFn/cls_getSamePitchNotes";
import cls_getOvertoneSeries from "./classFn/cls_getHarmonicSeries";
import { cls_initNoteClass } from "./classFn/cls_initNoteClass";
import type { Interval } from "@interval/cls/IntervalClass";
import cls_getNoteByNumberNotation from "./classFn/cls_getNoteByString";
import cls_getTemp251 from "./classFn/cls_getTemp251";
import cls_semitoneMove from "./classFn/cls_semitoneMove";
import { PianoKey } from "@pianokey";
import defaultTo from "lodash/defaultTo"
/**
 * 音符类
 *
 * 表示一个具有绝对音高的音符，包含音名、变化音、八度等信息。
 *
 * @example
 * const c4 = new Note('C', 0, 4)      // C4（中央C）
 * const gSharp5 = new Note('G', 1, 5) // G#5
 * const eFlat4 = new Note('E', -1, 4) // Eb4
 */
export class Note {
  /** 八度数 */
  public octave: number;
  /** 音名（C, D, E, F, G, A, B） */
  public step: T_NoteStep;
  /** 变化音（-2 到 2，如 -1=降号，1=升号） */
  public alter: T_AlterValue;
  /** 艺术名称（C#, Eb, F## 等） */
  public artName: string;
  /** 数学名称（C+1, E-1, F+2 等） */
  public mathName: string;
  /** 五度圈值 */
  public fifthValue: number;
  /** 是否为常用音符（升降号不超过 1） */
  public isNormal: boolean;
  /** 是否为黑键 */
  public isBlack: boolean;
  /** 钢琴键位置（0-11，C=0, C#=1...） */
  public pianoKeyId: number;
  /** 相对 C0 的半音数 */
  public semitoneWithinOctave: number;
  /** 音级索引（C=0, D=1...B=6） */
  public stepId: number;

  constructor(step: T_NoteStep = "C", alter: T_AlterValue = 0, octave: number = 4) {
    const noteObj = cls_initNoteClass(step, alter)
    this.step = noteObj.step
    this.alter = noteObj.alter
    this.octave = octave
    this.artName = noteObj.artName
    this.mathName = noteObj.mathName
    this.fifthValue = noteObj.fifthValue
    this.isNormal = noteObj.isNormal
    this.isBlack = noteObj.isBlack
    this.pianoKeyId = noteObj.pianoKeyId
    this.semitoneWithinOctave = noteObj.semitone
    this.stepId = noteObj.stepId
  }

  /** MIDI 音高值（绝对音高，C4=60） */
  public get pitchValue() {
    return this.octave * 12 + this.semitoneWithinOctave
  }

  /** 简洁描述（如 "C#4"） */
  public get simpleDescription() {
    return `${this.artName}${this.octave}`
  }

  /** 获取对应的钢琴键实例 */
  public get pianoKey(): PianoKey {
    return PianoKey.fromPitchInt(this.pitchValue)
  }

  /**
   * 根据音程计算目标音符
   * @param intervalInstance 音程实例
   * @param options 配置选项
   * @param options.isAscending 是否上行（默认 true）
   */
  public getNoteByInterval(intervalInstance: InstanceType<typeof Interval>,
    options?: { isAscending?: boolean }): InstanceType<typeof Note> {
    return cls_getNoteByInterval(this, intervalInstance, defaultTo(options?.isAscending, true))
  }

  /**
   * 根据简谱标记计算目标音符
   * @param numberNotationString 简谱标记（如 "5", "b7", "#4", "h2", "l3"）
   * @param options 配置选项
   * @param options.isAscending 是否上行（默认 true）
   */
  public getNoteByIntervalString(numberNotationString: string,
    options?: { isAscending?: boolean }): InstanceType<typeof Note> {
    return cls_getNoteByNumberNotation(this, numberNotationString, defaultTo(options?.isAscending, true))
  }

  /**
   * 获取所有等音异名（相同音高的不同记谱）
   * @param options 配置选项
   * @param options.isSelfIncluded 是否包含自身（默认 true）
   * @param options.alterAbsLte 变化音绝对值的上限（默认 1）
   */
  public getSamePitchNotes(options?: {
    isSelfIncluded?: boolean
    alterAbsLte?: 0 | 1 | 2
  }): InstanceType<typeof Note>[] {
    return cls_getSamePitchNotes(this,
      defaultTo(options?.isSelfIncluded, true),
      defaultTo(options?.alterAbsLte, 1))
  }

  /**
   * 半音移动
   *
   * 移动到目标半音位置，并智能选择最合适的音符表示：
   * - 优先选择自然音（alter=0）
   * - 向上移动时选升号，向下选降号
   *
   * @param moveStep 移动的半音数（正数向上，负数向下）
   */
  public semitoneMove(moveStep: number): InstanceType<typeof Note> {
    return cls_semitoneMove(this, moveStep)
  }

  /**
   * 获取泛音序列
   * @returns 泛音列表（基于此音的泛音列前 15 个）
   */
  public getHarmonicSeries() {
    return cls_getOvertoneSeries(this.step, this.alter, this.octave)
  }

  /**
   * 获取 ii-V-I 进行
   * @param noteAs 当前音符的角色（1=I, 2=ii, 5=V）
   * @returns ii-V-I 进行中的三个音符
   */
  public get251as(noteAs: number) {
    return cls_getTemp251(this, noteAs)
  }
}
