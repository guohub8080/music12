import { describe, it, expect } from "vitest"
import { findChord as findChordRaw, findByHash, findNotesInScales, findNoteDegreeInAllScales, findNoteDegreeInScale, SCALE_MODE } from "@find/index"

/**
 * Find 模块测试(2026-09-12 大修后:findChord 主路径 = 哈希直查)
 *
 * 注意输入域差异:
 * - findChord 接收 MIDI 数(如 [60,64,67])
 * - findByHash / findNotesInScales / findNoteDegreeInAllScales 接收 pianoKeyId(0-11)
 *
 * 包装说明:findChord 的断言针对 chord/set 读法(pcset 降级项由专属测试覆盖),
 * 统一 filter 出 type === "chord" 的分支(set 读法也是 type:"chord",由 isChordFormula 区分)。
 */
const findChord = (midi: number[], config?: Parameters<typeof findChordRaw>[1]) =>
  findChordRaw(midi, config).filter((x): x is Extract<typeof x, { type: "chord" }> => x.type === "chord")

describe("findChord(哈希直查,MIDI 输入)", () => {
  it("C-E-G [60,64,67] 找到 C 大三(isExact)", () => {
    const results = findChord([60, 64, 67])
    const full = results.find(r => r.isExact)
    expect(full).toBeDefined()
    expect(full!.pianoKeyIdRoot).toBe(0)
    expect(full!.formulaId).toBe("maj3")
    expect(full!.chordName).toBe("Cmaj3")
  })

  it("读法语义层:transform/cost/tier 与惰性 chord 实例", () => {
    const [full] = findChord([60, 64, 67]).filter(r => r.isExact)
    expect(full.transform).toEqual({})
    expect(full.cost).toBe(0)
    expect(full.tier).toBe(1)
    // 惰性 chord getter:实例音集与输入一致
    expect(full.chord!.pianoKeyIdsSorted).toEqual([0, 4, 7])
    expect(full.chord!.scoreSymbol).toBeDefined()
  })

  it("等和弦双解:C-E-G-A 不指定根音时 C6 与 Am7 同时返回", () => {
    const results = findChord([60, 64, 67, 69])
    expect(results.some(r => r.formulaId === "maj3add6" && r.pianoKeyIdRoot === 0)).toBe(true)
    expect(results.some(r => r.formulaId === "min7" && r.pianoKeyIdRoot === 9)).toBe(true)
  })

  it("rootNoteLocation 过滤:C-E-G-A 指定根音 C 只返回 C6(等和弦消歧)", () => {
    const c6 = findChord([60, 64, 67, 69], { rootNoteLocation: 0 })
    expect(c6.some(r => r.formulaId === "maj3add6")).toBe(true)
    expect(c6.some(r => r.formulaId === "min7")).toBe(false)
    expect(c6.every(r => r.isRootPosition)).toBe(true)
  })

  it("isRootPosition:不指定根音时恒为 false(音高类无法判断原位)", () => {
    const results = findChord([60, 64, 67])
    expect(results.every(r => r.isRootPosition === false)).toBe(true)
  })

  it("G-B-D-F [67,71,74,65] 四音表路由:G7 完全命中", () => {
    const results = findChord([67, 71, 74, 65])
    const full = results.find(r => r.isExact)
    expect(full).toBeDefined()
    expect(full!.pianoKeyIdRoot).toBe(7)
    expect(full!.formulaId).toBe("dom7")
  })
})

describe("findChord 严格模式(isStrict)", () => {
  it("C-E-G 严格模式只返回 isExact 读法", () => {
    const results = findChord([60, 64, 67], { isStrict: true })
    expect(results.every(r => r.isExact)).toBe(true)
    expect(results.some(r => r.formulaId === "maj3")).toBe(true)
  })

  it("严格模式不返回省略音读法", () => {
    const results = findChord([60, 64, 67], { isStrict: true })
    expect(results.some(r => r.formulaId === "maj7")).toBe(false)
  })
})

describe("findChord 烘焙裁决(原省略音/特征音语义已固化进表)", () => {
  it("C7 完全命中时不返回省七音的 maj3(特征音小七度是 dom7 的身份)", () => {
    const results = findChord([60, 64, 67, 70])
    expect(results.some(r => r.isExact && r.formulaId === "dom7")).toBe(true)
    expect(results.some(r => r.formulaId === "maj3")).toBe(false)
  })

  it("C-E-B 匹配 maj7(omit5):五度可省的合法读法,transform 原子化", () => {
    const results = findChord([60, 64, 71])
    const maj7 = results.find(r => r.formulaId === "maj7")
    expect(maj7).toBeDefined()
    expect(maj7!.isExact).toBe(false)
    expect(maj7!.transform).toEqual({ omit: 5 })  // 单值标量(多值才是数组)
  })

  it("错音不匹配:C-E-F# 不出现 maj7/min7(F# 不是它们的音)", () => {
    const results = findChord([60, 64, 66])
    expect(results.some(r => r.formulaId === "maj7" || r.formulaId === "min7")).toBe(false)
  })

  it("C-E-A 不匹配 dom7(缺特征音小七度 Bb)", () => {
    const results = findChord([60, 64, 69])
    expect(results.some(r => r.formulaId === "dom7")).toBe(false)
  })

  it("同度双音键集返回 set 读法:C-Eb [60,63,64] → 分叉三和弦(♭3·♮3 并存)", () => {
    const results = findChord([60, 63, 64])
    const setEntry = results.find(r => r.isChordFormula === false)
    expect(setEntry).toBeDefined()
    expect(setEntry!.formulaId).toBe("spset-split_third")
    expect(setEntry!.cnName).toBe("分叉三和弦")
    // set 读法带惰性 setEntity(getter),chord getter 为 null
    expect(setEntry!.setEntity!.pianoKeyIds).toEqual([0, 3, 4])
    expect(setEntry!.chord).toBeNull()
  })

  it("七音表路由:C 大调音集 → maj13 四重读法(调内 I/IV/V/vi 零成本根音)", () => {
    const midi = [60, 62, 64, 65, 67, 69, 71]
    const results = findChord(midi)
    const exacts = results.filter(r => r.isExact).map(r => r.chordName)
    expect(exacts).toEqual(expect.arrayContaining(["Cmaj13", "Fmaj13#11", "Gdom13", "Dmin13"]))
  })

  it("乱序输入等价(内部去重排序)", () => {
    const a = findChord([71, 60, 67, 64])
    const b = findChord([60, 64, 67, 71].map(x => x + 12))
    expect(a.map(r => r.chordName)).toEqual(b.map(r => r.chordName))
  })
})

describe("findChord 边界", () => {
  it("少于 3 个独立音抛错", () => {
    expect(() => findChord([60, 64])).toThrow()
  })

  it("少于 3 个不同音抛错(重复音)", () => {
    expect(() => findChord([60, 60, 60])).toThrow()
  })

  it("8 音(烘焙表域外)返回空;fallback pcset 可降级", () => {
    const midi = [60, 61, 62, 63, 64, 65, 66, 67]
    expect(findChord(midi)).toEqual([])
    const fb = findChordRaw(midi, { fallback: "pcset" })
    expect(fb).toHaveLength(1)
    expect(fb[0].type).toBe("pcset")
  })
})

describe("findByHash(pianoKeyId 输入,K=3~7 路由)", () => {
  it("五张表按音数自动路由", () => {
    expect(findByHash([0, 4, 7]).some(r => r.formulaId === "maj3")).toBe(true)
    expect(findByHash([0, 4, 7, 10]).some(r => r.formulaId === "dom7")).toBe(true)
    expect(findByHash([0, 2, 4, 5, 7, 9, 11]).length).toBeGreaterThan(0)
  })

  it("音数 <3 或 >7 返回空数组", () => {
    expect(findByHash([0, 4])).toEqual([])
    expect(findByHash([0, 1, 2, 3, 4, 5, 6, 7])).toEqual([])
  })
})

describe("findNotesInScales(pianoKeyId 输入)", () => {
  it("C-E-G 同时属于 C 大调、G 大调、F 大调等", () => {
    const results = findNotesInScales([0, 4, 7])
    expect(results.length).toBeGreaterThan(0)
    expect(results[0].scale).toBeDefined()
    expect(results[0].noteDegrees).toBeDefined()
  })

  it("每个结果的 noteDegrees 数量 = 输入音数", () => {
    const results = findNotesInScales([0, 4, 7])
    for (const r of results) {
      expect(r.noteDegrees).toHaveLength(3)
    }
  })

  it("限制 scaleModeIds 过滤调式族", () => {
    const all = findNotesInScales([0, 4, 7])
    const diatonicOnly = findNotesInScales([0, 4, 7], {
      scaleModeIds: SCALE_MODE.NATURAL_MAJOR ? [SCALE_MODE.NATURAL_MAJOR] : undefined,
    })
    expect(diatonicOnly.length).toBeLessThanOrEqual(all.length)
  })

  it("不可能的音组合返回空(如全 12 音)", () => {
    expect(findNotesInScales([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])).toEqual([])
  })
})

describe("findNoteDegreeInAllScales(单音)", () => {
  it("C(0) 在多个调中的度数", () => {
    const results = findNoteDegreeInAllScales(0)
    expect(results.length).toBeGreaterThan(0)
    expect(results[0].degree).toBeDefined()
    expect(results[0].scale).toBeDefined()
  })

  it("结果排除了该音作为根音的调", () => {
    const results = findNoteDegreeInAllScales(0)
    const cMajorResults = results.filter(
      (r) => r.scale.scaleModeId === "NATURAL_MAJOR" && r.scale.pianoKeyIdRoot === 0,
    )
    expect(cMajorResults).toHaveLength(0)
  })
})

describe("findNoteDegreeInScale(指定调)", () => {
  it("E(4) 在 C 大调是 3 度", () => {
    expect(findNoteDegreeInScale(4, 0, "NATURAL_MAJOR")).toBe(3)
  })

  it("C#(1) 不在 C 大调(返回 null)", () => {
    expect(findNoteDegreeInScale(1, 0, "NATURAL_MAJOR")).toBeNull()
  })

  it("G(7) 在 C 大调是 5 度", () => {
    expect(findNoteDegreeInScale(7, 0, "NATURAL_MAJOR")).toBe(5)
  })
})
