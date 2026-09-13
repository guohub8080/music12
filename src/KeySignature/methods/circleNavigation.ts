import { isNumber } from "es-toolkit/predicate"
import { isInteger } from "es-toolkit/compat"
import type { T_NoteStep } from "@common/static/NOTE_TYPES"

/**
 * 五度圈导航系（2026-09-12 用户批准第一批四个）
 *
 * 全部基于圈位数学：主音圈位 = FIFTHS[step] + 7×alter（同根大调调号数即圈位）。
 * 关系调 = 圈位 ∓3，相邻调 = 圈位 ±1——位置数学对理论调天然优雅
 * （D♯ 大调圈位 9 的关系小调 = 圈位 12 = B♯ 小调，调号 6♯ 实用）。
 *
 * 概念裁决（用户 2026-09-12）：临时记号概念不存在——音符永远是 (step, alter)，
 * alter 0 就是还原；不存在「调内要不要升降」的判定问题，本模块只管调号本身。
 */

/** 本位字母的五度圈位 */
const FIFTHS: Record<string, number> = { C: 0, G: 1, D: 2, A: 3, E: 4, B: 5, F: -1 }
/** 按圈位排列的字母序列（圈位 mod 7 → 字母） */
const FIFTH_LETTERS = ["C", "G", "D", "A", "E", "B", "F"] as const

export type I_KeyTonic = {
  step: T_NoteStep
  alter: number
  /** 同名大调的调号数（有符号,♯正♭负） */
  staveAlters: number
}

const posOf = (step: string, alter: number): number => FIFTHS[step] + 7 * alter

/** 圈位 → 主音拼写（字母按 mod 7 定,变音 = (圈位 − 字母位)/7,恒为整数） */
const tonicOf = (pos: number): I_KeyTonic => {
  const letter = FIFTH_LETTERS[((pos % 7) + 7) % 7]
  const alter = (pos - FIFTHS[letter]) / 7
  return { step: letter, alter, staveAlters: pos }
}

/** 校验拼写输入 */
const assertTonic = (step: string, alter: number): void => {
  if (!(step in FIFTHS)) throw new Error(`Invalid step: ${step}`)
  if (!isNumber(alter) || !isInteger(alter) || Math.abs(alter) > 2) throw new Error(`Invalid alter: ${alter}`)
}

/**
 * 关系小调（同调号）：大调主音 → 下小三度主音。圈位 +3。
 * C 大调 → a 小调（共享 0 调号）；D♯ 大调 → b♯ 小调（共享 9♯，理论调）。
 * staveAlters 为共享调号（关系调定义即同调号）。
 */
export const getRelativeMinor = (step: T_NoteStep, alter: number): I_KeyTonic => {
  assertTonic(step, alter)
  const pos = posOf(step, alter)
  return { ...tonicOf(pos + 3), staveAlters: pos }
}

/**
 * 关系大调（同调号）：小调主音 → 上小三度主音。圈位 −3。
 * a 小调 → C 大调（共享 0）；c♯ 小调 → E 大调（共享 4♯）。
 * staveAlters 为共享调号（小调主音圈位 −3）。
 */
export const getRelativeMajor = (step: T_NoteStep, alter: number): I_KeyTonic => {
  assertTonic(step, alter)
  const pos = posOf(step, alter)
  return { ...tonicOf(pos - 3), staveAlters: pos - 3 }
}

/**
 * 等音调对：同琴键位的另一拼写（|alter| ≤ 1 内恒存在——C♯↔D♭、B↔C♭、E↔F♭…）。
 * 每个主音拼写都有且仅有一个等音兄弟，直接返回。
 */
export const getEnharmonicKey = (step: T_NoteStep, alter: number): I_KeyTonic => {
  assertTonic(step, alter)
  const LETTER_SEMI: Record<string, number> = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 }
  const keyId = (LETTER_SEMI[step] + alter + 12) % 12
  // 同键位 ±1 变音的另一拼写:字母差 ±1 位、变音反向,枚举七字母
  for (const letter of Object.keys(LETTER_SEMI)) {
    for (const a of [-1, 0, 1]) {
      if (letter === step && a === alter) continue
      if ((LETTER_SEMI[letter] + a + 12) % 12 === keyId) {
        return tonicOf(posOf(letter, a))
      }
    }
  }
  throw new Error(`No enharmonic sibling for ${step}${alter}(理论不可达)`)
}

/**
 * 相邻调导航：属调（+1 个升号方向）与下属调（+1 个降号方向）。
 * 圈位 ±1——五度圈「转调旅程」的核心操作。
 */
export const getNeighborKeys = (
  step: T_NoteStep,
  alter: number,
): { dominant: I_KeyTonic; subdominant: I_KeyTonic } => {
  assertTonic(step, alter)
  const pos = posOf(step, alter)
  return { dominant: tonicOf(pos + 1), subdominant: tonicOf(pos - 1) }
}

/**
 * 调号距离：两主音的圈位差（有符号,♯ 方向为正）——转调时升降号增减的数量。
 * C→E♭ = −3（加 3 个降）；C→A = +3；C→C♭ = −7。
 */
export const getKeySignatureDistance = (
  fromStep: T_NoteStep,
  fromAlter: number,
  toStep: T_NoteStep,
  toAlter: number,
): number => {
  assertTonic(fromStep, fromAlter)
  assertTonic(toStep, toAlter)
  return posOf(toStep, toAlter) - posOf(fromStep, fromAlter)
}
