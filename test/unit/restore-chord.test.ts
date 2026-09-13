import { describe, it, expect } from "vitest"
import { findByHash } from "@find/findChord/methods/findByHash"
import { restoreChord } from "@find/findChord/methods/restoreChord"
import { isNil } from "es-toolkit/predicate"

/**
 * restoreChord 测试:哈希条目 → Chord 实例反推
 *
 * 覆盖:完全命中条目(零变换)、省略条目(setOmit)、变换条目(set alter/add)、
 * set 条目(无 Chord 身份返回 null)、round-trip 音集一致性
 */

describe("restoreChord 哈希条目反推", () => {
  it("完全命中条目:maj3 零变换直接构造", () => {
    const [entry] = findByHash([0, 4, 7])
    const chord = restoreChord(entry)
    expect(isNil(chord)).toBe(false)
    expect(chord!.chordFormulaId).toBe("maj3")
    expect(chord!.pianoKeyIds).toEqual([0, 4, 7])
  })

  it("省略条目:maj7(omit5) 反推 setOmit(5)", () => {
    // {0,7,8} = Y·Phrygian挂留前三音(set) + Ymaj7(omit5)(chord)
    const chordEntry = findByHash([0, 7, 8]).find(e => e.isChordFormula)
    const chord = restoreChord(chordEntry!)
    expect(isNil(chord)).toBe(false)
    expect(chord!.scoreSymbol).toContain("M7")
    // round-trip:反推实例的音集 = 哈希键集
    expect([...chord!.pianoKeyIds].sort((a, b) => a - b)).toEqual([0, 7, 8])
  })

  it("set 条目返回 null(special-sets 体系无 Chord 实例)", () => {
    const setEntry = findByHash([0, 1, 2])[0]
    expect(setEntry.isChordFormula).toBe(false)
    expect(restoreChord(setEntry)).toBeNull()
  })

  it("变换条目:Phrygian 形的 maj7sus2(omit5) round-trip", () => {
    const chordEntry = findByHash([0, 2, 11]).find(e => e.isChordFormula)
    const chord = restoreChord(chordEntry!)
    expect(isNil(chord)).toBe(false)
    expect([...chord!.pianoKeyIds].sort((a, b) => a - b)).toEqual([0, 2, 11])
  })
})
