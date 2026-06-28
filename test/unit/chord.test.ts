import { describe, it, expect } from "vitest"
import { Chord } from "@chord"
import { getChord } from "@factory/getChord"

/**
 * Chord 类测试
 *
 * 覆盖：构造、getter、变换(set/setSus/setOmit)、音符列表、find 反查、错误边界
 */

describe("Chord 构造与基础 getter", () => {
  it("构造大三和弦 C", () => {
    const c = new Chord(0, "maj3")
    expect(c.rootPianoKeyId).toBe(0)
    expect(c.chordFormulaId).toBe("maj3")
    expect(c.pianoKeyIds).toEqual([0, 4, 7])
    expect(c.pianoKeyIdsSorted).toEqual([0, 4, 7])
    expect(c.notesNum).toBe(3)
  })

  it("构造属七和弦 G7", () => {
    const g7 = new Chord(7, "dom7")
    expect(g7.rootPianoKeyId).toBe(7)
    expect(g7.pianoKeyIds).toEqual([7, 11, 2, 5]) // G B D F
    expect(g7.notesNum).toBe(4)
  })

  it("构造小七和弦 Am7", () => {
    const am7 = new Chord(9, "min7")
    expect(am7.pianoKeyIdsSorted).toEqual([0, 4, 7, 9])
  })

  it("baseSymbol / cnName / family 可读", () => {
    const c = new Chord(0, "maj3")
    expect(typeof c.baseSymbol).toBe("string")
    expect(typeof c.cnName).toBe("string")
    expect(typeof c.family).toBe("string")
  })

  it("intervalList 按度数升序", () => {
    const g7 = new Chord(7, "dom7")
    const degrees = g7.intervalList.map(([, d]) => d)
    expect(degrees).toEqual([3, 5, 7])
  })
})

describe("Chord 错误边界", () => {
  it("rootPianoKeyId 越界抛 RangeError", () => {
    expect(() => new Chord(-1, "maj3")).toThrow(RangeError)
    expect(() => new Chord(12, "maj3")).toThrow(RangeError)
  })

  it("无效 chordFormulaId 抛错", () => {
    expect(() => new Chord(0, "not_a_formula")).toThrow()
  })
})

describe("Chord 变换 - set", () => {
  it("set 数字使用默认音程", () => {
    // dom7 + add9 = dom9
    const c = new Chord(0, "dom7").set(9)
    expect(c.pianoKeyIds).toContain(2) // 9度 D
    expect(c.notesNum).toBe(5)
  })

  it("set # 升高音程（maj→aug）", () => {
    // dom7 #5 = 升五和弦
    const c = new Chord(0, "dom7").set("#5")
    // 5度从纯五(7)变增五(8)
    expect(c.pianoKeyIds).toContain(8)
  })

  it("set b 降低音程（p→dim）", () => {
    const c = new Chord(0, "dom7").set("b5")
    // 5度从纯五(7)变减五(6)
    expect(c.pianoKeyIds).toContain(6)
  })

  it("isTransformed 反映变换状态", () => {
    const c = new Chord(0, "dom7")
    expect(c.isTransformed).toBe(false)
    c.set("#5")
    expect(c.isTransformed).toBe(true)
  })

  it("clearTransform 重置变换", () => {
    const c = new Chord(0, "dom7").set("#5")
    expect(c.isTransformed).toBe(true)
    c.clearTransform()
    expect(c.isTransformed).toBe(false)
    expect(c.pianoKeyIds).toEqual([0, 4, 7, 10]) // 回到原 dom7
  })
})

describe("Chord 变换 - setSus", () => {
  it("setSus() 默认 sus2（3度omit + 加2度）", () => {
    const c = new Chord(0, "maj3").setSus()
    // sus2: 去掉3度，加2度 D
    expect(c.pianoKeyIds).toContain(2)
    expect(c.pianoKeyIds).not.toContain(4)
  })

  it("setSus(4) 挂四和弦", () => {
    const c = new Chord(0, "maj3").setSus(4)
    // sus4: 去掉3度，加4度 F
    expect(c.pianoKeyIds).toContain(5)
    expect(c.pianoKeyIds).not.toContain(4)
  })
})

describe("Chord 变换 - setOmit", () => {
  it("setOmit 省略五度", () => {
    const c = new Chord(0, "maj3").setOmit(5)
    expect(c.pianoKeyIds).not.toContain(7)
    expect(c.pianoKeyIds).toContain(0)
    expect(c.pianoKeyIds).toContain(4)
  })

  it("setOmit 省略三度", () => {
    const c = new Chord(0, "maj3").setOmit(3)
    expect(c.pianoKeyIds).not.toContain(4)
  })
})

describe("Chord 音符方法", () => {
  it("getRootNotes 返回根音（C 大三 → C）", () => {
    const c = new Chord(0, "maj3")
    const roots = c.getRootNotes()
    expect(roots.length).toBeGreaterThan(0)
    expect(roots.some((n) => n.step === "C")).toBe(true)
  })

  it("getNotesList 返回各音（C 大三 → 3个音）", () => {
    const c = new Chord(0, "maj3")
    const notes = c.getNotesList()
    expect(notes).toHaveLength(3)
    expect(notes[0].step).toBe("C")
  })

  it("simpleDescription 是逗号分隔的音名", () => {
    const c = new Chord(0, "maj3")
    expect(c.simpleDescription).toContain("C")
    expect(c.simpleDescription.split(",").length).toBe(3)
  })
})

describe("Chord find 反查", () => {
  it("C 大三和弦反查应找到 maj3@C", () => {
    const c = new Chord(0, "maj3")
    const results = c.find()
    expect(results.length).toBeGreaterThan(0)
    // 应包含完全匹配（similarity = 1）
    const fullMatch = results.find((r) => r.similarity === 1)
    expect(fullMatch).toBeDefined()
    expect(fullMatch!.pianoKeyIdRoot).toBe(0)
  })

  it("G7 反查应找到 dom7@G", () => {
    const g7 = new Chord(7, "dom7")
    const results = g7.find()
    const fullMatch = results.find((r) => r.similarity === 1)
    expect(fullMatch).toBeDefined()
    expect(fullMatch!.pianoKeyIdRoot).toBe(7)
  })
})

describe("getChord 工厂函数", () => {
  it("getChord('C', 0, 'maj3') 构造 C 大三", () => {
    const c = getChord("C", 0, "maj3")
    expect(c.rootPianoKeyId).toBe(0)
    expect(c.pianoKeyIds).toEqual([0, 4, 7])
  })

  it("getChord 支持升降号", () => {
    const fSharp = getChord("F", 1, "maj3") // F# 大三
    expect(fSharp.rootPianoKeyId).toBe(6)
  })

  it("getChord 无效音名抛 FactoryError", () => {
    expect(() => getChord("H", 0, "maj3")).toThrow()
  })

  it("getChord step 大小写不敏感", () => {
    const c1 = getChord("C", 0, "maj3")
    const c2 = getChord("c", 0, "maj3")
    expect(c1.rootPianoKeyId).toBe(c2.rootPianoKeyId)
  })
})

describe("Chord scoreSymbol（变换记谱）", () => {
  it("无变换时 scoreSymbol === baseSymbol", () => {
    const c = new Chord(0, "maj3")
    expect(c.scoreSymbol).toBe(c.baseSymbol)
  })

  it("变换后 scoreSymbol 含变换标记", () => {
    const c = new Chord(0, "dom7").setOmit(5).set(9)
    expect(c.scoreSymbol).not.toBe(c.baseSymbol)
    expect(c.scoreSymbol).toContain("omit5")
    expect(c.scoreSymbol).toContain("add9")
  })
})
