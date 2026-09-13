import { describe, it, expect } from "vitest"
import { findByScaleHash } from "@find/notes/findByScaleHash"

/**
 * scale-hash 测试:键集 → 调式读法 + 等音拼写层
 *
 * 覆盖:别名收编 / 黑键双拼写 / 读法级理论调 / 选项语义 / Scale 惰性实例
 *
 * filterBySpelling 已按用户裁决移除(2026-09-11):输入永远走 symbol,拼写只是输出层
 */
describe("findByScaleHash", () => {
  it("C 大调音集 → 7 条 modal 读法,同形别名收编不展开", () => {
    const r = findByScaleHash([0, 2, 4, 5, 7, 9, 11])
    expect(r).toHaveLength(7)
    const cmaj = r.find(x => x.scaleModeId === "NATURAL_MAJOR")
    expect(cmaj).toBeDefined()
    expect(cmaj!.aliasModeIds).toContain("IONIAN")
    expect(cmaj!.aliasModeIds).toContain("QING_YUE_GONG")
    // 大调音键集若展开雅清燕会是 24 条——收编后恒为 7
    expect(r.every(x => x.aliasModeIds.length + 1 <= 5)).toBe(true)
  })

  it("黑键根音:同一读法给 C♯(7♯) 与 D♭(5♭) 双拼写并列", () => {
    const r = findByScaleHash([0, 1, 3, 5, 6, 8, 10])
    const maj = r.find(x => x.scaleModeId === "NATURAL_MAJOR")!
    expect(maj.spellings).toHaveLength(2)
    const [cs, db] = maj.spellings
    expect(cs.rootStep).toBe("C")
    expect(cs.rootAlter).toBe(1)
    expect(cs.keySignature).toBe(7)
    expect(cs.isTheoretical).toBe(false)
    expect(db.rootStep).toBe("D")
    expect(db.rootAlter).toBe(-1)
    expect(db.keySignature).toBe(-5)
    expect(db.notes).toEqual([["D", -1], ["E", -1], ["F", 0], ["G", -1], ["A", -1], ["B", -1], ["C", 0]])
  })

  it("读法级理论调:C♯ Lydian 的 F♯♯ 标记理论并建议 D♭", () => {
    // C♯ Lydian 集合 = {0,1,3,5,7,8,10}(C♯ D♯ E♯ F♯♯ G♯ A♯ B♯)
    const r = findByScaleHash([0, 1, 3, 5, 7, 8, 10])
    const lyd = r.find(x => x.scaleModeId === "LYDIAN")!
    const cs = lyd.spellings.find(s => s.rootStep === "C" && s.rootAlter === 1)!
    expect(cs.isTheoretical).toBe(true)
    expect(cs.notes).toContainEqual(["F", 2])  // F♯♯
    expect(cs.enharmonicRoot).toEqual(["D", -1])
    const db = lyd.spellings.find(s => s.rootStep === "D" && s.rootAlter === -1)!
    expect(db.isTheoretical).toBe(false)
    expect(db.keySignature).toBe(-4)
  })

  it("C 和声小调:调号 -3 且 B♮ 为临时记号(非双等音记法)", () => {
    const r = findByScaleHash([0, 2, 3, 5, 7, 8, 11])
    const hm = r.find(x => x.scaleModeId === "HARMONIC_MINOR")!
    const [s] = hm.spellings
    expect(s.keySignature).toBe(-3)
    expect(s.accidentals).toEqual([["B", 0]])  // B♮
    expect(s.notes).toEqual([["C", 0], ["D", 0], ["E", -1], ["F", 0], ["G", 0], ["A", -1], ["B", 0]])
  })

  it("五声音集 → 5 条读法(宫商角徵羽)", () => {
    const r = findByScaleHash([0, 2, 4, 7, 9])
    expect(r).toHaveLength(5)
    expect(r.map(x => x.scaleModeId)).toEqual(
      expect.arrayContaining(["GONG", "SHANG", "JUE", "ZHI", "YU"]),
    )
  })

  it("scaleModeIds 选项可用别名键命中(IONIAN 命中 NATURAL_MAJOR 读法)", () => {
    const r = findByScaleHash([0, 2, 4, 5, 7, 9, 11], { scaleModeIds: ["IONIAN"] })
    expect(r).toHaveLength(1)
    expect(r[0].scaleModeId).toBe("NATURAL_MAJOR")
  })

  it("excludeAsRoot 排除指定根音的读法", () => {
    const r = findByScaleHash([0, 2, 4, 5, 7, 9, 11], { excludeAsRoot: 0 })
    expect(r.some(x => x.rootPianoKeyId === 0)).toBe(false)
    expect(r.length).toBe(6)
  })

  it("非调式键集返回空数组(输入不变式:乱序等价)", () => {
    expect(findByScaleHash([0, 1, 2])).toEqual([])
    const a = findByScaleHash([7, 0, 4, 2, 9, 5, 11])
    const b = findByScaleHash([0, 2, 4, 5, 7, 9, 11])
    expect(a.map(x => x.scaleName)).toEqual(b.map(x => x.scaleName))
  })

  it("惰性 scale getter:实例音集与读法一致", () => {
    const [dorian] = findByScaleHash([0, 2, 4, 5, 7, 9, 11]).filter(x => x.scaleModeId === "DORIAN")
    const scale = dorian.scale
    expect(scale.pianoKeyIds).toEqual(dorian.pianoKeyIds)
    expect(scale.pianoKeyIds[0]).toBe(2) // Dorian 度数序从 D(2) 起
  })
})

