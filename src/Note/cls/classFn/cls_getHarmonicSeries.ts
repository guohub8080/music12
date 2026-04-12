import {Interval} from "../../../Interval/cls/IntervalClass";
import {T_IntervalType} from "../../../common/static/INTERVAL_TYPES.ts";
import {T_AlterValue, T_NoteStep} from "../../../common/static/NOTE_TYPES.ts";
import {Note} from "../NoteClass";

/**
 * 泛音列的音程序列表
 *
 * 泛音列（Harmonic Series）是一个基音及其上方自然产生的泛音序列。
 * 每个泛音与基音的音程关系固定如下：
 *
 * | 泛音序号 | 音程 | 音程名称 |
 * |----------|------|----------|
 * | 1 | 纯八度 | 基音的高八度 |
 * | 2 | 纯五度 | 基音的纯五度 |
 * | 3 | 纯四度 | 纯五度上方的纯四度 |
 * | 4 | 大三度 | 大三度 |
 * | 5 | 小三度 | 小三度 |
 * | 6 | 小三度 | 小三度 |
 * | 7 | 大二度 | 大二度 |
 * | 8 | 大二度 | 大二度 |
 * | 9 | 大二度 | 大二度 |
 * | 10 | 大二度 | 大二度 |
 * | 11 | 小二度 | 小二度 |
 * | 12 | 大二度 | 大二度 |
 * | 13 | 小二度 | 小二度 |
 * | 14 | 增一度 | 增一度 |
 * | 15 | 小二度 | 小二度 |
 */
const overtoneSeriesIntervalList: [T_IntervalType, number][] = [
  ["p", 8], ["p", 5], ["p", 4], ["maj", 3], ["min", 3], ["min", 3], ["maj", 2],
  ["maj", 2], ["maj", 2], ["maj", 2], ["min", 2], ["maj", 2], ["min", 2], ["aug", 1], ["min", 2]
]

/**
 * 获取泛音列
 *
 * 根据给定的基音，计算其泛音列中的前 15 个泛音。
 * 泛音列是物理声学中自然产生的音高序列，常用于：
 * - 理解音色（Timbre）的构成
 * - 铜管乐器的演奏（自然泛音）
 * - 和声学的基础理论
 *
 * ### 限制条件
 *
 * - 只支持变化音绝对值 <= 1 的基音
 * - 如果某个泛音无法计算（超出正常音符范围），返回 undefined
 *
 * @param step 基音音名（C, D, E, F, G, A, B）
 * @param alter 基音变化音值（-1, 0, 1）
 * @param octave 基音八度
 * @returns 泛音列数组，包含 15 个泛音信息，无法计算的泛音为 undefined
 *
 * @example
 * // C4 的泛音列
 * cls_getHarmonicSeries('C', 0, 4)
 * // [C5, G5, C6, E6, G6, Bb6, C7, D7, E7, F#7, G7, A7, Bb7, B7, C8]
 */
export default (step: T_NoteStep, alter: T_AlterValue, octave: number): {
  step: T_NoteStep,
  alter: T_AlterValue,
  pianoKeyId: number,
  artName: string
}[] => {
  // 只支持变化音绝对值 <= 1 的基音
  if (Math.abs(alter) > 1) return []

  const result = []
  let baseNote = new Note(step, alter, octave)

  // 依次计算每个泛音
  for (const intervalTuple of overtoneSeriesIntervalList) {
    const intervalObj = new Interval(intervalTuple[0], intervalTuple[1])
    try {
      const targetNote = baseNote.getNoteByInterval(intervalObj)
      // 保持原始八度，用于后续计算
      baseNote = new Note(targetNote.step, targetNote.alter, octave)
      result.push({
        step: targetNote.step,
        alter: targetNote.alter,
        pianoKeyId: targetNote.pianoKeyId,
        artName: targetNote.artName
      })
    } catch (e) {
      // 无法计算该泛音时，推入 undefined
      result.push(void 0)
    }
  }

  return result
}
