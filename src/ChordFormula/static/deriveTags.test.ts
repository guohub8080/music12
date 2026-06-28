import { describe, it, expect } from "vitest"
import { deriveTags } from "./deriveTags"

describe("deriveTags", () => {
  // ========== 家族维度（几和弦）==========
  describe("家族（chordN / sus）", () => {
    it("三和弦 → chord3", () => {
      expect(deriveTags([["maj", 3], ["p", 5]])).toContain("chord3")
    })

    it("七和弦 → chord7", () => {
      expect(deriveTags([["maj", 3], ["p", 5], ["min", 7]])).toContain("chord7")
    })

    it("九和弦 → chord9", () => {
      expect(deriveTags([["maj", 3], ["p", 5], ["min", 7], ["maj", 9]])).toContain("chord9")
    })

    it("add 和弦（缺7度但有9度）→ 仍归 chord3（堆叠链断了）", () => {
      // maj3add9: [1,3,5,9]，链在 5→7 断了
      expect(deriveTags([["maj", 3], ["p", 5], ["maj", 9]])).toContain("chord3")
    })

    it("sus 独立成族，不进 chordN", () => {
      expect(deriveTags([["p", 4], ["p", 5]])).toContain("sus")
      expect(deriveTags([["p", 4], ["p", 5], ["min", 7], ["maj", 9], ["maj", 13]])).toContain("sus")
    })
  })

  // ========== sus 扩展级别 ==========
  describe("sus 扩展级别", () => {
    it("sus4 无七度 → ext5", () => {
      const tags = deriveTags([["p", 4], ["p", 5]])
      expect(tags).toContain("ext5")
    })

    it("dom7sus4 → ext7", () => {
      const tags = deriveTags([["p", 4], ["p", 5], ["min", 7]])
      expect(tags).toContain("ext7")
    })

    it("dom13sus4 → ext13", () => {
      const tags = deriveTags([["p", 4], ["p", 5], ["min", 7], ["maj", 9], ["maj", 13]])
      expect(tags).toContain("ext13")
    })
  })

  // ========== 性质维度 ==========
  describe("性质", () => {
    it("大三 → maj", () => {
      expect(deriveTags([["maj", 3], ["p", 5]])).toContain("maj")
    })

    it("小三 → min", () => {
      expect(deriveTags([["min", 3], ["p", 5]])).toContain("min")
    })

    it("属七 → dom", () => {
      expect(deriveTags([["maj", 3], ["p", 5], ["min", 7]])).toContain("dom")
    })

    it("大七 → maj7", () => {
      expect(deriveTags([["maj", 3], ["p", 5], ["maj", 7]])).toContain("maj7")
    })

    it("小七 → min", () => {
      expect(deriveTags([["min", 3], ["p", 5], ["min", 7]])).toContain("min")
    })

    it("小大七 → min + maj7", () => {
      const tags = deriveTags([["min", 3], ["p", 5], ["maj", 7]])
      expect(tags).toContain("min")
      expect(tags).toContain("maj7")
    })

    it("减七 → dim", () => {
      expect(deriveTags([["min", 3], ["dim", 5], ["dim", 7]])).toContain("dim")
    })

    it("半减七 → halfdim", () => {
      expect(deriveTags([["min", 3], ["dim", 5], ["min", 7]])).toContain("halfdim")
    })

    it("增三 → aug", () => {
      expect(deriveTags([["maj", 3], ["aug", 5]])).toContain("aug")
    })
  })

  // ========== 变音维度 ==========
  describe("变音", () => {
    it("升五度 → altered + sharp5", () => {
      const tags = deriveTags([["maj", 3], ["aug", 5], ["min", 7], ["maj", 9]])
      expect(tags).toContain("altered")
      expect(tags).toContain("sharp5")
    })

    it("降五度 → altered + flat5", () => {
      const tags = deriveTags([["maj", 3], ["dim", 5], ["min", 7]])
      expect(tags).toContain("altered")
      expect(tags).toContain("flat5")
    })

    it("降九度 → altered + flat9", () => {
      const tags = deriveTags([["maj", 3], ["p", 5], ["min", 7], ["min", 9]])
      expect(tags).toContain("altered")
      expect(tags).toContain("flat9")
    })

    it("升九度 → altered + sharp9", () => {
      const tags = deriveTags([["maj", 3], ["p", 5], ["min", 7], ["aug", 9]])
      expect(tags).toContain("altered")
      expect(tags).toContain("sharp9")
    })

    it("多重变音", () => {
      // dom7b5b9: 降五 + 降九
      const tags = deriveTags([["maj", 3], ["dim", 5], ["min", 7], ["min", 9]])
      expect(tags).toContain("flat5")
      expect(tags).toContain("flat9")
    })

    it("无变音时不加 altered 标签", () => {
      const tags = deriveTags([["maj", 3], ["p", 5], ["min", 7]])
      expect(tags).not.toContain("altered")
    })
  })

  // ========== 结构维度 ==========
  describe("结构", () => {
    it("add6 → add6 标签", () => {
      expect(deriveTags([["maj", 3], ["p", 5], ["maj", 6]])).toContain("add6")
    })

    it("add9（缺7度）→ add 标签", () => {
      expect(deriveTags([["maj", 3], ["p", 5], ["maj", 9]])).toContain("add")
    })

    it("完整九和弦不算 add（有7度）", () => {
      const tags = deriveTags([["maj", 3], ["p", 5], ["min", 7], ["maj", 9]])
      expect(tags).not.toContain("add")
    })
  })

  // ========== 综合案例（对应真实公式）==========
  describe("综合案例", () => {
    it("dom9#5: [maj3,aug5,min7,maj9]", () => {
      const tags = deriveTags([["maj", 3], ["aug", 5], ["min", 7], ["maj", 9]])
      expect(tags).toEqual(expect.arrayContaining(["chord9", "dom", "altered", "sharp5"]))
    })

    it("min9b5 (半减九): [min3,dim5,min7,maj9]", () => {
      const tags = deriveTags([["min", 3], ["dim", 5], ["min", 7], ["maj", 9]])
      expect(tags).toEqual(expect.arrayContaining(["chord9", "halfdim", "altered", "flat5"]))
    })

    it("dim7: [min3,dim5,dim7]", () => {
      const tags = deriveTags([["min", 3], ["dim", 5], ["dim", 7]])
      expect(tags).toEqual(expect.arrayContaining(["chord7", "dim", "altered", "flat5"]))
    })

    it("aug3: [maj3,aug5]", () => {
      const tags = deriveTags([["maj", 3], ["aug", 5]])
      expect(tags).toEqual(expect.arrayContaining(["chord3", "aug", "altered", "sharp5"]))
    })

    it("dom13sus4: [p4,p5,min7,maj9,maj13]", () => {
      const tags = deriveTags([["p", 4], ["p", 5], ["min", 7], ["maj", 9], ["maj", 13]])
      expect(tags).toEqual(expect.arrayContaining(["sus", "ext13", "dom"]))
    })
  })
})
