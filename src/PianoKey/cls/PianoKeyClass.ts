import isNil from "lodash/isNil"
import NOTE_META from "@note/static/NOTE_META"
import { T_NoteStep, T_AlterValue } from "@common/static/NOTE_TYPES"
import type { Note } from "@note/cls/NoteClass"
import cls_getNotes from "./classFn/cls_getNotes"

/**
 * 钢琴键类
 *
 * 表示钢琴上的一个键，基于 pianoKeyId（0-11）和 octave。
 *
 * ### 键盘布局（一个八度内）
 *
 * pianoKeyId: 0   1   2   3   4   5   6   7   8   9  10  11
 * 音名:      C   C#  D   D#  E   F   F#  G   G#  A   A#  B
 * 键类型:    白  黑  白  黑  白  白  黑  白  黑  白  黑  白
 *
 * @example
 * const c4 = new PianoKey(0)       // C4（默认八度4）
 * const cSharp4 = new PianoKey(1)  // C#4
 * const g5 = new PianoKey(7, 5)    // G5
 *
 * // 从音符创建
 * const fromCSharp = PianoKey.fromNote('C', 1)     // C#4
 * const fromEFlat5 = PianoKey.fromNote('E', -1, 5) // Eb5
 *
 * // 获取等音异名
 * c4.getNotes()  // [C4]
 * cSharp4.getNotes()  // [C#4, Db4]
 */
export class PianoKey {
  /** 钢琴键位置（0-11） */
  public pianoKeyId: number
  /** 八度数 */
  public octave: number
  /** 是否为黑键 */
  public get isBlack(): boolean {
    return NOTE_META.where("pianoKeyId", this.pianoKeyId).first()?.isBlack ?? false
  }

  constructor(pianoKeyId: number, octave: number = 4) {
    if (pianoKeyId < 0 || pianoKeyId > 11) {
      throw new Error("pianoKeyId must be between 0 and 11.")
    }
    this.pianoKeyId = pianoKeyId
    this.octave = octave
  }

  /** MIDI 音高值 */
  public get pitchValue(): number {
    return this.octave * 12 + this.pianoKeyId
  }

  /**
   * 从音符信息创建 PianoKey 实例
   * @param step 音名（C, D, E, F, G, A, B）
   * @param alter 变化音（-2 到 2）
   * @param octave 八度数，默认 4
   * @returns PianoKey 实例
   */
  static fromNote(step: T_NoteStep, alter: T_AlterValue, octave: number = 4): PianoKey {
    const noteMeta = NOTE_META.where("step", step).where("alter", alter).first()
    if (isNil(noteMeta)) {
      throw new Error(`Invalid note: ${step} with alter ${alter}`)
    }
    return new PianoKey(noteMeta.pianoKeyId, octave)
  }

  /**
   * 从 MIDI 音高值创建 PianoKey 实例
   * @param pitchInt MIDI 音高值（如 C4 = 60）
   * @returns PianoKey 实例
   */
  static fromPitchInt(pitchInt: number): PianoKey {
    const octave = Math.floor(pitchInt / 12)
    const pianoKeyId = ((pitchInt % 12) + 12) % 12
    return new PianoKey(pianoKeyId, octave)
  }

  /**
   * 获取该位置的所有音符（等音异名）
   * @param config 配置选项
   * @param config.isNormal 是否只获取常用音符，默认 true
   * @param config.alterAbsLte 变化音绝对值上限（0, 1, 2）
   * @returns 音符数组
   *
   * @example
   * const c4 = new PianoKey(0)  // C4
   * c4.getNotes()  // [C4]
   *
   * const cSharp4 = new PianoKey(1)  // C#4
   * cSharp4.getNotes()  // [C#4, Db4]
   */
  public getNotes(config?: { isNormal?: boolean, alterAbsLte?: 0 | 1 | 2 }): InstanceType<typeof Note>[] {
    return cls_getNotes(this, config)
  }

  /**
   * 移动指定半音数，返回新的 PianoKey 实例
   * @param num 移动的半音数（正数向上，负数向下）
   * @returns 新的 PianoKey 实例
   *
   * @example
   * const c4 = new PianoKey(0, 4)  // C4
   * c4.add(2)  // PianoKey(2, 4) = D4
   * c4.add(12) // PianoKey(0, 5) = C5
   */
  public add(num: number): PianoKey {
    const newPitchValue = this.pitchValue + num
    const newOctave = Math.floor(newPitchValue / 12)
    const newPianoKeyId = ((newPitchValue % 12) + 12) % 12  // 处理负数
    return new PianoKey(newPianoKeyId, newOctave)
  }
}
