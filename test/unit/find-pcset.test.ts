import { describe, it, expect } from "vitest"
import { findChord } from "@find/index"

describe("findChord pcset 降级(fallback)", () => {
  it("半音簇:C-C♯-D 无和弦匹配时给出集合身份", () => {
    const r = findChord([60, 61, 62], { fallback: "pcset" })
    expect(r.length).toBe(1)
    const p: any = r[0]
    expect(p.type).toBe("pcset")
    expect(p.level).toBe(3)
    expect(p.primeFormIds).toEqual([0, 1, 2])
    expect(p.forte).toBe("3-1")
    expect(p.cnName).toBe("半音簇")
    expect(p.isRootPosition).toBe(false)
  })

  it("半音叠三全音组:C-C♯-G 命中 3-5 命名", () => {
    const p: any = findChord([60, 61, 67], { fallback: "pcset" })[0]
    expect(p.forte).toBe("3-5")
    expect(p.cnName).toBe("半音叠三全音组")
  })

  it("有和弦解释的输入不触发降级(和弦层优先):C-C♯-E♭ 走省略音匹配", () => {
    const r = findChord([60, 61, 63], { fallback: "pcset" })
    expect((r[0] as any).type).toBe("chord")
    expect(r.length).toBeGreaterThan(0)
  })

  it("nearests:全部等距最近方案,带距离与变换记号", () => {
    const p: any = findChord([60, 61, 62], { fallback: "pcset" })[0]
    expect(p.nearests).toBeDefined()
    expect(p.nearests.length).toBeGreaterThanOrEqual(1)
    for (const n of p.nearests) {
      expect(n.maskDistance).toBe(p.nearestDistance)
      expect(n.transformString).toMatch(/omit|extra/)
    }
  })

  it("nearests 等距多方案:D-Q-E(半音簇)距离 2 应有 4 条换音岔路", () => {
    const p: any = findChord([62, 63, 64], { fallback: "pcset" })[0]
    expect(p.nearestDistance).toBe(2)
    expect(p.nearests.length).toBe(4)
    const ids = p.nearests.map((n: any) => `${n.chordFormulaId}@${n.root}`).sort()
    expect(ids).toEqual(["maj3b5@10", "maj7b9@3", "sus2@2", "sus4@9"].sort())
  })

  it("和弦命中时 fallback 不触发(返回正常和弦结果)", () => {
    const r = findChord([60, 64, 67], { fallback: "pcset" })
    expect((r[0] as any).type).toBe("chord")
    expect((r[0] as any).chordFormulaId).toBe("maj3")
  })

  it("默认不开 fallback:行为与历史一致(空数组)", () => {
    expect(findChord([60, 61, 62])).toEqual([])
  })

  it("严格模式不触发降级", () => {
    expect(findChord([60, 61, 62], { isStrict: true, fallback: "pcset" })).toEqual([])
  })

  it("移调不变性:任何根的半音簇都是 3-1", () => {
    for (let root = 0; root < 12; root++) {
      const p: any = findChord([60 + root, 61 + root, 62 + root], { fallback: "pcset" })[0]
      expect(p.forte).toBe("3-1")
    }
  })
})
