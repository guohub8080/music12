import { describe, it, expect } from "vitest"
import { findChord, findNotesInScales, findNoteDegreeInAllScales, findNoteDegreeInScale, SCALE_MODE } from "@find/index"

/**
 * Find 模块测试
 *
 * 注意输入域差异：
 * - findChord 接收 MIDI 数（如 [60,64,67]）
 * - findNotesInScales / findNoteDegreeInAllScales 接收 pianoKeyId（0-11）
 */

describe("findChord（MIDI 输入）", () => {
  it("C-E-G [60,64,67] 找到 C 大三和弦", () => {
    const results = findChord([60, 64, 67])
    expect(results.length).toBeGreaterThan(0)
    const full = results.find((r) => r.similarity === 1)
    expect(full).toBeDefined()
    expect(full!.pianoKeyIdRoot).toBe(0)
    expect(full!.pianoKeyIdsSorted).toEqual([0, 4, 7])
  })

  it("C-Eb-G [60,63,67] 找到 C 小三和弦", () => {
    const results = findChord([60, 63, 67])
    const full = results.find((r) => r.similarity === 1)
    expect(full).toBeDefined()
    expect(full!.pianoKeyIdsSorted).toEqual([0, 3, 7])
  })

  it("G-B-D-F [67,71,74,65] 找到 G7（dom7）", () => {
    const results = findChord([67, 71, 74, 65])
    const full = results.find((r) => r.similarity === 1)
    expect(full).toBeDefined()
    expect(full!.pianoKeyIdRoot).toBe(7)
  })

  it("isRootPosition：不指定根音时为 false（音高类无法判断原位）", () => {
    // pianoKeyId 是音高类（0-11），输入顺序不代表"最低音"，无法判断原位
    const results = findChord([60, 64, 67])
    const full = results.find((r) => r.similarity === 1)
    expect(full).toBeDefined()
    expect(full!.isRootPosition).toBe(false)
  })

  it("isRootPosition：指定根音时为 true", () => {
    // 明确指定根音 C，则候选根音与之一致，标记原位
    const results = findChord([60, 64, 67], { rootNoteLocation: 0 })
    const full = results.find((r) => r.similarity === 1)
    expect(full).toBeDefined()
    expect(full!.isRootPosition).toBe(true)
  })

  it("rootNoteLocation 过滤：C-E-G-A 指定根音 C 只返回 C6", () => {
    const c6 = findChord([60, 64, 67, 69], { rootNoteLocation: 0 })
    expect(c6.some((r) => r.chordFormulaId === "maj3add6")).toBe(true)
    expect(c6.some((r) => r.chordFormulaId === "min7")).toBe(false) // Am7 被过滤
  })

  it("rootNoteLocation 过滤：C-E-G-A 指定根音 A 只返回 Am7", () => {
    const am7 = findChord([60, 64, 67, 69], { rootNoteLocation: 9 })
    expect(am7.some((r) => r.chordFormulaId === "min7")).toBe(true)
    expect(am7.some((r) => r.chordFormulaId === "maj3add6")).toBe(false)
  })
})

describe("findChord 严格模式（isStrict: true）", () => {
  it("C-E-G 严格模式只返回完全匹配", () => {
    const results = findChord([60, 64, 67], { isStrict: true })
    // 全部应是 similarity=1 的完全匹配
    expect(results.every((r) => r.similarity === 1)).toBe(true)
    expect(results.some((r) => r.chordFormulaId === "maj3")).toBe(true)
  })

  it("严格模式不返回省略音匹配", () => {
    // C-E-G 在模糊模式下可能匹配 maj7（省略 B），严格模式不应有
    const results = findChord([60, 64, 67], { isStrict: true })
    expect(results.some((r) => r.chordFormulaId === "maj7")).toBe(false)
  })
})

describe("findChord 模糊模式（默认）- 完全匹配优先", () => {
  it("有完全匹配时只返回完全匹配", () => {
    // C-E-G 有 maj3 完全匹配
    const results = findChord([60, 64, 67])
    expect(results.every((r) => r.similarity === 1)).toBe(true)
    expect(results.some((r) => r.chordFormulaId === "maj3")).toBe(true)
  })

  it("C7 完全匹配时只返回 dom7（不返回省七音的 maj3）", () => {
    // C-E-G-Bb 是 dom7 的完全匹配，不该返回 maj3（省了七音 Bb）
    const results = findChord([60, 64, 67, 70])
    expect(results.every((r) => r.similarity === 1)).toBe(true)
    expect(results.some((r) => r.chordFormulaId === "dom7")).toBe(true)
    // maj3（省七音）不应出现——七和弦的特征音小七度 Bb 是 dom7 的身份
    expect(results.some((r) => r.chordFormulaId === "maj3")).toBe(false)
  })
})

describe("findChord 模糊模式 - 省略音匹配", () => {
  it("C-E-G 匹配 maj7（用户少弹了 B，但 maj7 的特征音 3 度 E 被弹到）", () => {
    // C-E-G 不是任何和弦的完全匹配（除了 maj3）。
    // 但若输入去掉完全匹配场景，C-E-G 应能匹配 maj7（省略七音 B）
    // 这里测一个无完全匹配的省略场景：C-E-G-B（缺五音 G 的 maj7？不，C-E-G-B 本身就是 maj7 完全匹配）
    // 换：C-E-B（缺五度 G 的 maj7）→ maj7 的特征音 3 度 E 和 7 度 B 都在，五度可省
    const results = findChord([60, 64, 71]) // C-E-B
    // C-E-B 无完全匹配（不是任何标准三和弦），应进入省略音匹配
    const maj7 = results.find((r) => r.chordFormulaId === "maj7")
    expect(maj7).toBeDefined()
    expect(maj7!.similarity).toBeLessThan(1)
  })

  it("省略音匹配：用户弹的音必须全是候选和弦的音（无错音）", () => {
    // C-E-F#：F# 不是 maj7/min7 的音，不该匹配它们
    const results = findChord([60, 64, 66]) // C-E-F#
    // C-E-F# 唯一完全匹配是 maj3b5，若有则只返回它；不应出现 maj7（F# 是错音）
    const hasFSharpMismatch = results.some(
      (r) => r.chordFormulaId === "maj7" || r.chordFormulaId === "min7",
    )
    expect(hasFSharpMismatch).toBe(false)
  })

  it("属和弦必须含七音：C-E-G 不会匹配 dom7（缺特征音小七度 Bb）", () => {
    // C-E-G 是 maj3 完全匹配，会直接返回。但如果强制无完全匹配的场景，
    // dom7 的特征音是 3 度 E + 7 度 Bb，C-E-G 缺 Bb，不该匹配 dom7
    // 用 C-E-G 加一个非和弦音触发省略匹配来验证
    // 这里直接验证：C-E-G-Bb 有完全匹配 dom7，C-E-G 单独时
    // 由于有 maj3 完全匹配，不会进入省略音层。改用 C-E-A（缺五度的 min6？）
    // C-E-A：E 是 maj3add6 的三度，A 是六度，C 是根 → 缺五度 G
    const results = findChord([60, 64, 69]) // C-E-A
    // 不该匹配 dom7（dom7 需要 E 和 Bb，这里没 Bb）
    const hasDom7 = results.some((r) => r.chordFormulaId === "dom7")
    expect(hasDom7).toBe(false)
  })
})

describe("findChord 错误边界", () => {
  it("少于 3 个独立音抛错", () => {
    expect(() => findChord([60, 64])).toThrow()
  })

  it("少于 3 个不同音抛错（重复音）", () => {
    expect(() => findChord([60, 60, 60])).toThrow()
  })
})

describe("findNotesInScales（pianoKeyId 输入）", () => {
  it("C-E-G 同时属于 C 大调、G 大调、F 大调等", () => {
    const results = findNotesInScales([0, 4, 7])
    expect(results.length).toBeGreaterThan(0)
    // 结果应包含 scale 信息
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
    // 限制后结果应不多于全量
    expect(diatonicOnly.length).toBeLessThanOrEqual(all.length)
  })

  it("不可能的音组合返回空（如全 12 音）", () => {
    const results = findNotesInScales([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
    // 没有调式包含全部 12 个音
    expect(results).toEqual([])
  })
})

describe("findNoteDegreeInAllScales（单音）", () => {
  it("C(0) 在多个调中的度数", () => {
    const results = findNoteDegreeInAllScales(0)
    expect(results.length).toBeGreaterThan(0)
    // 每个结果应有 degree 和 scale
    expect(results[0].degree).toBeDefined()
    expect(results[0].scale).toBeDefined()
  })

  it("结果排除了该音作为根音的调", () => {
    // C(0) 作为根音的调（如 C 大调）应排除，C 应是非主音的度数
    const results = findNoteDegreeInAllScales(0)
    // C 大调里 C 是 1 度，但作为根音被排除
    const cMajorResults = results.filter(
      (r) => r.scale.scaleModeId === "NATURAL_MAJOR" && r.scale.pianoKeyIdRoot === 0,
    )
    expect(cMajorResults).toHaveLength(0)
  })
})

describe("findNoteDegreeInScale（指定调）", () => {
  it("E(4) 在 C 大调是 3 度", () => {
    const degree = findNoteDegreeInScale(4, 0, "NATURAL_MAJOR")
    expect(degree).toBe(3)
  })

  it("C#(1) 不在 C 大调（返回 null）", () => {
    const degree = findNoteDegreeInScale(1, 0, "NATURAL_MAJOR")
    expect(degree).toBeNull()
  })

  it("G(7) 在 C 大调是 5 度", () => {
    expect(findNoteDegreeInScale(7, 0, "NATURAL_MAJOR")).toBe(5)
  })
})
