import { findChord, type I_AnalyzedChordResult } from "@find/findChord"
import type { Chord } from "../ChordClass"

/**
 * 根据和弦当前的 pianoKeyIds（含变换）反查匹配的和弦
 *
 * 将 pianoKeyIds 转为 MIDI 值后调用 Find 模块的 findChord，
 * 可用于查看变换后的音符组合能构成哪些和弦。
 *
 * @param chord Chord 实例
 * @param config 查找配置（同 findChord 的 config）
 * @returns 匹配的和弦结果列表
 */
export const cls_findChord = (
  chord: Chord,
  config?: {
    /** true=只返回完全匹配；false=完全匹配+省略音（默认 false） */
    isStrict?: boolean
  }
): I_AnalyzedChordResult[] => {
  const octave = 4
  const midiList = chord.pianoKeyIdsSorted.map(id => id + octave * 12)
  return findChord(midiList, config)
}

export default cls_findChord
