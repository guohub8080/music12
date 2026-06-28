import { describe, it, expect } from "vitest"
import { Scale } from "@scale"
import { getScale } from "@factory/getScale"
import type { T_ScaleModeId } from "@scale/static/scaleModeTypes"

/**
 * Scale 类测试
 *
 * 覆盖：构造、getter、查询方法、调式三/七和弦、八度循环、错误边界、五声模式
 */

const C_MAJOR = () => new Scale(0, "NATURAL_MAJOR" as T_ScaleModeId)
const A_MINOR = () => new Scale(9, "NATURAL_MINOR" as T_ScaleModeId)

describe("Scale 构造与基础 getter", () => {
  it("C 大调音高集合", () => {
    const c = C_MAJOR()
    expect(c.pianoKeyIds).toEqual([0, 2, 4, 5, 7, 9, 11])
    expect(c.pianoKeyIdsSorted).toEqual([0, 2, 4, 5, 7, 9, 11])
  })

  it("degreeToPianoKeyId 映射", () => {
    const c = C_MAJOR()
    expect(c.degreeToPianoKeyId[1]).toBe(0)
    expect(c.degreeToPianoKeyId[3]).toBe(4)
    expect(c.degreeToPianoKeyId[7]).toBe(11)
  })

  it("pianoKeyIdToDegree（非成员返回 null）", () => {
    const c = C_MAJOR()
    expect(c.pianoKeyIdToDegree[0]).toBe(1) // C = 1度
    expect(c.pianoKeyIdToDegree[1]).toBeNull() // C# 不在 C 大调
    expect(c.pianoKeyIdToDegree[11]).toBe(7) // B = 7度
  })

  it("modeName / type / simpleDescription", () => {
    const c = C_MAJOR()
    expect(c.modeName).toBe("自然大调")
    expect(c.type).toBe("major")
    // simpleDescription 含八度（如 C4,D4,...）
    expect(c.simpleDescription).toContain("C")
    expect(c.simpleDescription.split(",").length).toBe(7)
  })

  it("A 自然小调", () => {
    const a = A_MINOR()
    expect(a.pianoKeyIds).toEqual([9, 11, 0, 2, 4, 5, 7])
    expect(a.simpleDescription).toContain("A")
  })
})

describe("Scale 音符统计", () => {
  it("C 大调自然音数 = 6（度数 2-7，无 1 度条目）", () => {
    const c = C_MAJOR()
    expect(c.naturalNotesNum).toBe(6)
    expect(c.alteredNotesNum).toBe(0)
    expect(c.isTonicReplaced).toBe(false)
  })

  it("和声小调有升 7 度（含变化音）", () => {
    const harm = new Scale(9, "HARMONIC_MINOR" as T_ScaleModeId)
    // 和声小调 7 度升高，应有变化音
    expect(harm.alteredNotesNum).toBeGreaterThan(0)
    expect(harm.sharpOrFlatNotesNum).toBeGreaterThan(0)
  })
})

describe("Scale 查询方法", () => {
  it("hasPianoKeyId", () => {
    const c = C_MAJOR()
    expect(c.hasPianoKeyId(0)).toBe(true)
    expect(c.hasPianoKeyId(1)).toBe(false)
  })

  it("getDegreeByPianoKeyId（成员/非成员）", () => {
    const c = C_MAJOR()
    expect(c.getDegreeByPianoKeyId(0)).toBe(1)
    expect(c.getDegreeByPianoKeyId(4)).toBe(3) // E = 3度
    expect(c.getDegreeByPianoKeyId(1)).toBeNull() // C# 不在调内
  })

  it("getDegreeAndAlter", () => {
    const c = C_MAJOR()
    expect(c.getDegreeAndAlter(7)).toEqual({ degree: 5, alter: 0 })
    expect(c.getDegreeAndAlter(1)).toBeNull()
  })

  it("getPianoKeyIdByDegree", () => {
    const c = C_MAJOR()
    expect(c.getPianoKeyIdByDegree(1)).toBe(0)
    expect(c.getPianoKeyIdByDegree(5)).toBe(7) // G = 5度
  })

  it("getAlterByDegree（缺省返回 0）", () => {
    const c = C_MAJOR()
    expect(c.getAlterByDegree(3)).toBe(0)
    expect(c.getAlterByDegree(1)).toBe(0) // 1度无条目，?? 0
  })
})

describe("Scale 音符获取", () => {
  it("getRootNote 返回根音（C 大调 → C）", () => {
    const c = C_MAJOR()
    const roots = c.getRootNote()
    expect(roots.some((n) => n.step === "C")).toBe(true)
  })

  it("getNoteByDegree", () => {
    const c = C_MAJOR()
    const e = c.getNoteByDegree(3) // E
    expect(e.some((n) => n.step === "E")).toBe(true)
  })

  it("getNoteByIntervalNum 八度循环", () => {
    const c = C_MAJOR()
    expect(c.getNoteByIntervalNum(1)).toEqual({ pianoKeyId: 0, octave: 0 })
    expect(c.getNoteByIntervalNum(8)).toEqual({ pianoKeyId: 0, octave: 1 }) // 高八度
    expect(c.getNoteByIntervalNum(2)).toEqual({ pianoKeyId: 2, octave: 0 })
  })
})

describe("Scale 调式和弦", () => {
  it("C 大调 1 级三和弦 = C 大三", () => {
    const c = C_MAJOR()
    const chord = c.getScaleDegreeChord3(1)
    expect(chord.length).toBeGreaterThan(0)
    const full = chord.find((r) => r.similarity === 1)
    expect(full).toBeDefined()
    expect(full!.pianoKeyIdRoot).toBe(0)
  })

  it("C 大调 5 级三和弦 = G 大三", () => {
    const c = C_MAJOR()
    const chord = c.getScaleDegreeChord3(5)
    const full = chord.find((r) => r.similarity === 1)
    expect(full).toBeDefined()
    expect(full!.pianoKeyIdRoot).toBe(7)
  })

  it("C 大调 7 级七和弦 = B 半减七（根音优先于等和弦 Dm6）", () => {
    const c = C_MAJOR()
    const chord = c.getScaleDegreeChord7(7)
    // 第一条应以该级音 B 为根，而非等和弦 Dm6（root=D）
    const first = chord[0]
    expect(first.pianoKeyIdRoot).toBe(11) // B
    expect(first.chordFormulaId).toBe("halfdim7")
    expect(first.pianoKeyIdsSorted).toEqual([2, 5, 9, 11])
    // Dm6 作为等和弦仍在结果里（排在后面）
    const dm6 = chord.find((r) => r.chordFormulaId === "min3add6")
    expect(dm6).toBeDefined()
  })

  it("调式和弦级数越界抛 RangeError", () => {
    const c = C_MAJOR()
    expect(() => c.getScaleDegreeChord3(0)).toThrow(RangeError)
    expect(() => c.getScaleDegreeChord3(8)).toThrow(RangeError)
    expect(() => c.getScaleDegreeChord7(0)).toThrow(RangeError)
  })
})

describe("Scale 五声调式", () => {
  it("宫调式只有 5 个音", () => {
    const gong = new Scale(0, "GONG" as T_ScaleModeId)
    expect(gong.pianoKeyIds.length).toBe(5)
    // C 宫 = C D E G A
    expect(gong.pianoKeyIds).toEqual([0, 2, 4, 7, 9])
  })

  it("五声调式的调式和弦仍可计算（wraparound）", () => {
    const gong = new Scale(0, "GONG" as T_ScaleModeId)
    // 五声虽只有 5 个音，但级数校验固定 1-7（wraparound 取音）
    expect(() => gong.getScaleDegreeChord3(1)).not.toThrow()
    expect(() => gong.getScaleDegreeChord3(6)).not.toThrow()
    expect(() => gong.getScaleDegreeChord3(8)).toThrow(RangeError) // 超出 1-7
  })
})

describe("Scale 错误边界", () => {
  it("rootPianoKeyId 越界抛 RangeError", () => {
    expect(() => new Scale(-1, "NATURAL_MAJOR" as T_ScaleModeId)).toThrow(RangeError)
    expect(() => new Scale(12, "NATURAL_MAJOR" as T_ScaleModeId)).toThrow(RangeError)
  })

  it("无效 scaleModeId 抛错", () => {
    expect(() => new Scale(0, "BOGUS_MODE" as T_ScaleModeId)).toThrow(/Scale not found/)
  })

  it("getPianoKeyIdByDegree 无效度数抛错", () => {
    const c = C_MAJOR()
    expect(() => c.getPianoKeyIdByDegree(0)).toThrow(/Degree 0 not found/)
    expect(() => c.getNoteByDegree(0)).toThrow(/Degree 0 not found/)
  })
})

describe("getScale 工厂函数", () => {
  it("getScale('C', 0, 'NATURAL_MAJOR')", () => {
    const c = getScale("C", 0, "NATURAL_MAJOR")
    expect(c.pianoKeyIds).toEqual([0, 2, 4, 5, 7, 9, 11])
  })

  it("mode 大小写不敏感", () => {
    const c = getScale("C", 0, "natural_major")
    expect(c.pianoKeyIds).toEqual([0, 2, 4, 5, 7, 9, 11])
  })

  it("无效音名抛错", () => {
    expect(() => getScale("H", 0, "NATURAL_MAJOR")).toThrow()
  })

  it("无效 mode 抛错", () => {
    expect(() => getScale("C", 0, "BOGUS")).toThrow()
  })
})
