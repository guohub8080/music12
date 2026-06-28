import { describe, it, expect } from "vitest"
import { deriveTags } from "@chord-formula/static/deriveTags"
import { CHORD_FORMULA_META_MAP } from "@chord-formula/static/CHORD_FORMULA_META_MAP"

/**
 * 全量覆盖率验证：对 87 个公式跑 deriveTags，确保 0 遗漏、0 异常
 */
describe("deriveTags 全量覆盖率", () => {
  const allFormulas = Object.entries(CHORD_FORMULA_META_MAP)

  it("所有公式都能算出至少一个标签（0 遗漏）", () => {
    const noTags: string[] = []
    for (const [id, meta] of allFormulas) {
      const tags = deriveTags(meta.intervalList)
      if (tags.length === 0) noTags.push(id)
    }
    expect(noTags).toEqual([])
  })

  it("所有公式都有家族标签（chordN 或 sus）", () => {
    const validFamilies = ["chord3", "chord7", "chord9", "chord11", "chord13", "sus"]
    const missing: string[] = []
    for (const [id, meta] of allFormulas) {
      const tags = deriveTags(meta.intervalList)
      if (!tags.some(t => validFamilies.includes(t))) missing.push(id)
    }
    expect(missing).toEqual([])
  })

  it("家族分布符合预期（6 个家族，chord3 最少 13 个，dom7 相关最多）", () => {
    const families: Record<string, number> = {}
    for (const [, meta] of allFormulas) {
      const tags = deriveTags(meta.intervalList)
      const family = tags[0]
      families[family] = (families[family] || 0) + 1
    }
    // 总数必须是 87
    const total = Object.values(families).reduce((a, b) => a + b, 0)
    expect(total).toBe(87)
    // 应该正好 6 个家族
    expect(Object.keys(families).sort()).toEqual(
      ["chord11", "chord13", "chord3", "chord7", "chord9", "sus"],
    )
  })
})
