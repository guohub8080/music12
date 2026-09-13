import { describe, it, expect } from "vitest"
import { findChord } from "@find/index"
import { findPcset } from "@find/findChord/methods/findPcset"

/**
 * pcset 降级与 set 读法的分工(2026-09-12 大修后)
 *
 * 架构变化:旧契约「无和弦匹配时降级 pcset」已被 set 读法取代——
 * 命名键集(半音簇/分叉三和弦等)在烘焙表里就是一等公民读法(isChordFormula:false),
 * 自带 forte 编号与中文名,比旧降级的集合论身份更优。
 * pcset 降级仅剩一个触发面:>7 音(烘焙表 3~7 域外)+ 显式 fallback。
 *
 * findPcset 机器本身(prime form/Forte 命名/nearests 最近和弦)保留直测——
 * nearests 是「换一两个音最近能到什么和弦」的独立查询,哈希表不覆盖。
 */
describe("findChord:set 读法取代旧降级(命名键集一等公民)", () => {
  it("半音簇 C-C♯-D 直接返回 set 读法(非 pcset 降级),自带 forte 与中文名", () => {
    const r = findChord([60, 61, 62], { fallback: "pcset" })
    expect(r.length).toBeGreaterThan(0)
    const p: any = r[0]
    expect(p.type).toBe("chord")            // set 读法也是 type:"chord"(读法分支)
    expect(p.isChordFormula).toBe(false)    // 由 isChordFormula 区分
    expect(p.cnName).toBe("半音簇")
    expect(p.setEntity.forte).toBe("3-1")
    expect(p.setEntity.pianoKeyIds).toEqual([0, 1, 2])
    expect(p.isRootPosition).toBe(false)
  })

  it("C-C♯-G 命中 3-5 命名 set(裁决名 Phrygian五度)", () => {
    const r: any = findChord([60, 61, 67])
    // 同为 Forte 3-5,烘焙裁决采用 Phrygian五度(三音表人工审核钦定)而非旧 pcset 名
    expect(r[0].setEntity.forte).toBe("3-5A")  // A/B 后缀 = 倒影对中的代表素数形
    expect(r[0].cnName).toBe("Phrygian五度")
  })

  it("和弦命中时返回读法(与 set 并列的 chord 读法)", () => {
    const r = findChord([60, 64, 67], { fallback: "pcset" })
    expect((r[0] as any).type).toBe("chord")
    expect((r[0] as any).isChordFormula).toBe(true)
    expect((r[0] as any).formulaId).toBe("maj3")
  })

  it("移调不变性:任何根的半音簇都是 3-1", () => {
    for (let root = 0; root < 12; root++) {
      const r: any = findChord([60 + root, 61 + root, 62 + root])
      expect(r[0].setEntity.forte).toBe("3-1")
    }
  })
})

describe("findChord pcset 降级(仅 >7 音域外触发)", () => {
  it("8 音(烘焙表域外)默认返回空数组", () => {
    expect(findChord([60, 61, 62, 63, 64, 65, 66, 67])).toEqual([])
  })

  it("8 音 + fallback:pcset 给出集合论身份", () => {
    const r = findChord([60, 61, 62, 63, 64, 65, 66, 67], { fallback: "pcset" })
    expect(r).toHaveLength(1)
    const p: any = r[0]
    expect(p.type).toBe("pcset")
    expect(p.primeFormIds).toEqual([0, 1, 2, 3, 4, 5, 6, 7])  // 8 连半音 prime form 8 元素
  })

  it("严格模式不触发降级", () => {
    expect(findChord([60, 61, 62, 63, 64, 65, 66, 67], { isStrict: true, fallback: "pcset" })).toEqual([])
  })
})

describe("findPcset(直测:集合论机器独立于降级路径)", () => {
  it("prime form 与 Forte 命名", () => {
    const p: any = findPcset([0, 1, 2])
    expect(p.primeFormIds).toEqual([0, 1, 2])
    expect(p.forte).toBe("3-1")
    expect(p.cnName).toBe("半音簇")
  })

  it("nearests:全部等距最近方案,带距离与变换记号", () => {
    const p: any = findPcset([0, 1, 2])
    expect(p.nearests).toBeDefined()
    expect(p.nearests.length).toBeGreaterThanOrEqual(1)
    for (const n of p.nearests) {
      expect(n.maskDistance).toBe(p.nearestDistance)
      expect(n.transformString).toMatch(/omit|extra/)
    }
  })

  it("nearests 等距多方案:D-Q-E(半音簇)距离 2 应有 4 条换音岔路", () => {
    const p: any = findPcset([2, 3, 4])
    expect(p.nearestDistance).toBe(2)
    expect(p.nearests.length).toBe(4)
    const ids = p.nearests.map((n: any) => `${n.chordFormulaId}@${n.root}`).sort()
    expect(ids).toEqual(["maj3b5@10", "maj7b9@3", "sus2@2", "sus4@9"].sort())
  })
})
