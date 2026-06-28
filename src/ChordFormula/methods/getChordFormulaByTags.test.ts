import { describe, it, expect } from "vitest"
import { getChordFormulaByTags } from "./getChordFormulaByTags"

describe("getChordFormulaByTags", () => {
  // ========== 单标签查询 ==========
  it("查 sus 家族返回 12 个挂留和弦", () => {
    const results = getChordFormulaByTags(["sus"])
    expect(results.length).toBe(12)
    expect(results.map((r) => r.chordFormulaId)).toEqual(
      expect.arrayContaining([
        "sus2", "sus4", "dom7sus2", "dom7sus4", "dom13sus4", "maj13sus4",
      ]),
    )
  })

  it("查 dim 返回所有减性质和弦", () => {
    const results = getChordFormulaByTags(["dim"])
    // dim3（减三）和 dim7（全减七）；halfdim7 是 halfdim 标签，不含 dim
    expect(results.map((r) => r.chordFormulaId)).toEqual(
      expect.arrayContaining(["dim3", "dim7"]),
    )
  })

  it("查 altered 返回所有含变音的和弦", () => {
    const results = getChordFormulaByTags(["altered"])
    // 变音和弦应该不少（所有 *alter 家族 + aug/dim）
    expect(results.length).toBeGreaterThan(30)
  })

  // ========== 多标签交集查询 ==========
  it("查 [dom, altered] 返回所有属功能变音和弦", () => {
    const results = getChordFormulaByTags(["dom", "altered"])
    // 应包含跨家族的属变音：dom7#5、dom9#5、dom11b5、dom13b9 等
    expect(results.map((r) => r.chordFormulaId)).toEqual(
      expect.arrayContaining(["dom7#5", "dom9#5", "dom7b9", "dom11b5"]),
    )
    // 不应包含非属的变音和弦（如 maj7b5）
    expect(results.map((r) => r.chordFormulaId)).not.toContain("maj7b5")
  })

  it("查 [sus, ext13] 返回扩展到13度的挂留和弦", () => {
    const results = getChordFormulaByTags(["sus", "ext13"])
    expect(results.map((r) => r.chordFormulaId)).toEqual(
      expect.arrayContaining(["dom13sus4", "maj13sus4", "maj13sus2"]),
    )
    // 不应包含低扩展级别的 sus
    expect(results.map((r) => r.chordFormulaId)).not.toContain("sus4")
  })

  it("查 [maj7, chord9] 返回大七性质的九和弦", () => {
    const results = getChordFormulaByTags(["maj7", "chord9"])
    // maj9#11 不在此列：它有11度，堆叠链延伸到 chord11 而非 chord9
    expect(results.map((r) => r.chordFormulaId)).toEqual(
      expect.arrayContaining(["maj9", "minmaj9", "maj9b5", "maj9#5", "maj9b13", "maj7b9"]),
    )
  })

  it("查 [sharp5] 返回所有升五和弦（跨性质）", () => {
    const results = getChordFormulaByTags(["sharp5"])
    // aug3(增三) + dom7#5 + maj9#5 + min7#5 等，性质各异但都有 sharp5
    expect(results.map((r) => r.chordFormulaId)).toEqual(
      expect.arrayContaining(["aug3", "dom7#5", "maj9#5", "min7#5"]),
    )
  })

  // ========== 边界情况 ==========
  it("查不存在的标签组合返回空数组", () => {
    const results = getChordFormulaByTags(["sus", "maj7", "chord13"])
    // sus 不会是 chord13（sus 用 ext 标记家族，不是 chordN）
    expect(results).toEqual([])
  })

  it("空标签数组返回全部 87 个公式", () => {
    const results = getChordFormulaByTags([])
    expect(results.length).toBe(87)
  })
})
