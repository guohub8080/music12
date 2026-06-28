import { describe, it, expect } from "vitest"
import { getNoteByPianoKeyId } from "../../src/index"

/**
 * Note 模块函数测试
 */

describe("getNoteByPianoKeyId 默认（最简表示）", () => {
  it("白键返回 1 个（自身最简）", () => {
    const c = getNoteByPianoKeyId(0)
    expect(c).toHaveLength(1)
    expect(c[0].step).toBe("C")
    expect(c[0].alter).toBe(0)
  })

  it("黑键返回 2 个（升/降复杂度相同）", () => {
    const cs = getNoteByPianoKeyId(1)
    expect(cs).toHaveLength(2)
    expect(cs.some((n) => n.step === "C" && n.alter === 1)).toBe(true) // C♯
    expect(cs.some((n) => n.step === "D" && n.alter === -1)).toBe(true) // D♭
  })

  it("默认不返回复杂等音（白键不含 B♯）", () => {
    const c = getNoteByPianoKeyId(0)
    expect(c.some((n) => n.step === "B" && n.alter === 1)).toBe(false) // 不含 B♯
  })
})

describe("getNoteByPianoKeyId isComplexIncluded", () => {
  it("isComplexIncluded: true 含复杂等音", () => {
    const all = getNoteByPianoKeyId(0, { isComplexIncluded: true })
    expect(all.length).toBeGreaterThan(1)
    expect(all.some((n) => n.step === "C" && n.alter === 0)).toBe(true) // C
    expect(all.some((n) => n.step === "B" && n.alter === 1)).toBe(true) // B♯
  })

  it("isComplexIncluded: true 黑键也增加复杂等音", () => {
    const simple = getNoteByPianoKeyId(1)
    const all = getNoteByPianoKeyId(1, { isComplexIncluded: true })
    expect(all.length).toBeGreaterThan(simple.length) // 多于最简的 2 个
  })

  it("octave 配置生效", () => {
    const c5 = getNoteByPianoKeyId(0, { octave: 5 })
    expect(c5[0].octave).toBe(5)
  })
})
