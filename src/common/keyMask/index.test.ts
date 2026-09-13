import { describe, it, expect } from "vitest"
import {
    keyMaskFromIds, idsFromKeyMask, rotate, isSubsetOf, popcount,
    canonicalForm, maskDistance, FORMULA_PATTERNS, PATTERN_INDEX, transposeFamily,
} from "@common/keyMask"
import ALL_CHORD_INSTANCE_META from "@chord/static/ALL_CHORD_INSTANCE_META"

describe("KeyMask 基础位运算", () => {
  it("音集 ↔ mask 往返", () => {
    expect(keyMaskFromIds([0, 4, 7])).toBe(0b10010001) // 145,文档里的例子
    expect(idsFromKeyMask(0b10010001)).toEqual([0, 4, 7])
    expect(idsFromKeyMask(keyMaskFromIds([3, 7, 10, 2]))).toEqual([2, 3, 7, 10])
  })

  it("rotate = 移调,{0,4,7}+5 → {5,9,0}", () => {
    expect(idsFromKeyMask(rotate(keyMaskFromIds([0, 4, 7]), 5)).sort((a, b) => a - b)).toEqual([0, 5, 9])
  })

  it("rotate 回卷:12 次回原位", () => {
    const m = keyMaskFromIds([1, 5, 6, 11])
    expect(rotate(m, 12)).toBe(m)
    expect(rotate(rotate(m, 7), 5)).toBe(m)
  })

  it("子集判断", () => {
    expect(isSubsetOf(keyMaskFromIds([0, 4]), keyMaskFromIds([0, 4, 7]))).toBe(true)
    expect(isSubsetOf(keyMaskFromIds([0, 4, 11]), keyMaskFromIds([0, 4, 7]))).toBe(false)
  })

  it("popcount / maskDistance", () => {
    expect(popcount(0b10010001)).toBe(3)
    expect(maskDistance(keyMaskFromIds([0, 4, 7]), keyMaskFromIds([0, 4, 7]))).toBe(0)
    // 增音(单方向差一个键)距离 1
    expect(maskDistance(keyMaskFromIds([0, 4, 7]), keyMaskFromIds([0, 4, 7, 10]))).toBe(1)
    // 换音(去掉 7 加入 6,一来一回)距离 2
    expect(maskDistance(keyMaskFromIds([0, 4, 7]), keyMaskFromIds([0, 4, 6]))).toBe(2)
  })

  it("canonicalForm:移调等价类指纹相同", () => {
    expect(canonicalForm(keyMaskFromIds([0, 4, 7]))).toBe(canonicalForm(keyMaskFromIds([5, 9, 0])))
    expect(canonicalForm(keyMaskFromIds([0, 4, 7]))).toBe(keyMaskFromIds([0, 4, 7]))
  })
})

describe("公式 pattern 表与转位族", () => {
  it("88 个 pattern,与公式表一致", () => {
    expect(FORMULA_PATTERNS.length).toBe(88)
    const maj3 = FORMULA_PATTERNS.find(p => p.chordFormulaId === "maj3")!
    expect(maj3.mask).toBe(0b10010001)
  })

  it("transposeFamily:C 大三 → maj3@0", () => {
    const f = transposeFamily([0, 4, 7])
    expect(f).toEqual([{ chordFormulaId: "maj3", root: 0 }])
  })

  it("transposeFamily:C6/Am7 等和弦双命中", () => {
    const f = transposeFamily([0, 4, 7, 9])
    expect(f).toContainEqual({ chordFormulaId: "maj3add6", root: 0 })
    expect(f).toContainEqual({ chordFormulaId: "min7", root: 9 })
  })

  it("transposeFamily:任意根的大三都归一化命中", () => {
    for (let root = 0; root < 12; root++) {
      const f = transposeFamily([(root) % 12, (root + 4) % 12, (root + 7) % 12])
      expect(f).toContainEqual({ chordFormulaId: "maj3", root })
    }
  })

  it("与实例哈希桶全量对拍:1056 个实例的音集全部可由 pattern+根 复现", () => {
    // 对每个实例:transposeFamily(它的音集) 必须包含 (它的公式, 它的根)
    for (const inst of ALL_CHORD_INSTANCE_META) {
      const family = transposeFamily(inst.pianoKeyIdsSorted)
      const hit = family.some(m => m.chordFormulaId === inst.chordFormulaId && m.root === inst.pianoKeyIdRoot)
      expect(hit, `${inst.chordFormulaId}@${inst.pianoKeyIdRoot} 未被移位查询命中`).toBe(true)
    }
  })

  it("反向对拍:移位命中的每一项都对应真实实例(无幻觉)", () => {
    const instanceSet = new Set(
      ALL_CHORD_INSTANCE_META.map(x => `${x.chordFormulaId}@${x.pianoKeyIdRoot}`))
    for (const inst of ALL_CHORD_INSTANCE_META) {
      for (const m of transposeFamily(inst.pianoKeyIdsSorted)) {
        expect(instanceSet.has(`${m.chordFormulaId}@${m.root}`), `${m.chordFormulaId}@${m.root} 是幻觉`).toBe(true)
      }
    }
  })
})
