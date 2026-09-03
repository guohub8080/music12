// @ts-nocheck
/**
 * 和弦倒推引擎(L2 复杂分解层)
 *
 * 给定任意键集,遍历 12根 × 88公式,计算每个组合需要什么变换
 * 才能精确等于输入键集,按变换数排序取最简(奥卡姆剃刀)。
 *
 * 规则:
 *   - 根音必须在输入键集里(needRoot 排除)
 *   - 变换类型: ♯/♭(度数升降)、omit(去掉)、add(加上)
 *   - omit+add 若恰好是同度数的升降 → 合并为 ♯/♭(一个变换而非两个)
 *   - 排序: 变换数最少优先;平手取公式 id 字典序(确定性)
 */
import ALL_CHORD_INSTANCE_META from "../../src/Chord/static/ALL_CHORD_INSTANCE_META"
import { isNil, isNotNil } from "es-toolkit/predicate"

const SYMBOLS = ["C","P","D","Q","E","F","X","G","Y","A","Z","B"]

// 半音差 → 记号前缀
const OFFSET_NOTATION: Record<number, string> = { 2: "♯♯", 1: "♯", 0: "", [-1]: "♭", [-2]: "♭♭" }

export type I_DecompOp =
  | { kind: "alter"; degree: number; offset: number; notation: string }
  | { kind: "omit"; degree: number; notation: string }
  | { kind: "add"; degree: number; offset: number; notation: string }

export type I_Decomposition = {
  root: number
  rootSymbol: string
  chordFormulaId: string
  ops: I_DecompOp[]
  notation: string
  cost: number
}

/** 半音距离 → {度数, 偏移};优先自然音级(offset=0) */
function gapToDegree(gap: number): { degree: number; offset: number } | null {
  const BASES: Array<[number, number]> = [[1,0],[2,2],[3,4],[4,5],[5,7],[6,9],[7,11],[9,14],[11,17],[13,21]]
  // 先找自然音级(offset=0)
  for (const [deg, base] of BASES) {
    if (base === gap) return { degree: deg, offset: 0 }
  }
  // 再找变化音级(±1, ±2)
  for (const [deg, base] of BASES) {
    const diff = gap - base
    if (diff === 1 || diff === -1 || diff === 2 || diff === -2) {
      return { degree: deg, offset: diff }
    }
  }
  return null
}

export const decompose = (sortedIds: number[]): I_Decomposition[] => {
  const inputSet = new Set(sortedIds)
  const results: I_Decomposition[] = []

  for (const inst of ALL_CHORD_INSTANCE_META) {
    const root = inst.pianoKeyIdRoot
    if (!inputSet.has(root)) continue  // 根音必须在输入里

    const formulaKeys = new Set(inst.pianoKeyIdsSorted)

    // 集合差异
    const addKeys: number[] = []    // 输入有,公式没有
    const omitKeys: number[] = []   // 公式有,输入没有
    for (const k of sortedIds) if (!formulaKeys.has(k)) addKeys.push(k)
    for (const k of inst.pianoKeyIdsSorted) if (!inputSet.has(k)) omitKeys.push(k)

    // 尝试将 omit+add 配对为 alter(同度数的键变化)
    const ops: I_DecompOp[] = []
    const usedOmit = new Set<number>()
    const usedAdd = new Set<number>()

    // 为每个 add 键找可能的 alter 配对:
    // add 键与某个 omit 键相对根音的距离差 ±1/±2 → 同度数的升降
    for (let ai = 0; ai < addKeys.length; ai++) {
      const ak = addKeys[ai]
      for (let oi = 0; oi < omitKeys.length; oi++) {
        if (usedOmit.has(oi)) continue
        const ok = omitKeys[oi]
        // 这两个键相对根音的半音差
        const akGap = (ak - root + 12) % 12
        const okGap = (ok - root + 12) % 12
        const diff = akGap - okGap
        if (diff === 1 || diff === -1 || diff === 2 || diff === -2) {
          // 是升降变换!公式中 ok 键的度数
          const formulaInterval = inst.pianoKeyIdToInterval[ok]
          if (isNil(formulaInterval)) continue
          const degree = formulaInterval.intervalNum
          ops.push({
            kind: "alter", degree, offset: diff,
            notation: `${OFFSET_NOTATION[diff] ?? (diff > 0 ? "♯" : "♭")}${degree}`,
          })
          usedOmit.add(oi)
          usedAdd.add(ai)
          break
        }
      }
    }

    // 未配对的 omit → omit 操作
    for (let oi = 0; oi < omitKeys.length; oi++) {
      if (usedOmit.has(oi)) continue
      const ok = omitKeys[oi]
      const fi = inst.pianoKeyIdToInterval[ok]
      if (isNil(fi)) continue
      ops.push({ kind: "omit", degree: fi.intervalNum, notation: `omit${fi.intervalNum}` })
    }

    // 未配对的 add → add 操作
    for (let ai = 0; ai < addKeys.length; ai++) {
      if (usedAdd.has(ai)) continue
      const ak = addKeys[ai]
      const gap = (ak - root + 12) % 12
      const degInfo = gapToDegree(gap)
      if (isNil(degInfo)) continue  // 无法解释的键(超过±2变化)
      ops.push({
        kind: "add", degree: degInfo.degree, offset: degInfo.offset,
        notation: `add${OFFSET_NOTATION[degInfo.offset] ?? ""}${degInfo.degree}`,
      })
    }

    const cost = ops.length
    const notation = ops.length ? `(${ops.map(o => o.notation).join(" ")})` : ""

    results.push({ root, rootSymbol: SYMBOLS[root], chordFormulaId: inst.chordFormulaId, ops, notation, cost })
  }

  results.sort((a, b) => a.cost - b.cost || a.chordFormulaId.localeCompare(b.chordFormulaId))
  return results
}

// ===== CLI =====
if (process.argv[1]?.endsWith("engine.ts")) {
  const arg = process.argv[2]
  if (arg) {
    const ids = arg.split(",").map(Number).filter(n => n >= 0 && n < 12).sort((a, b) => a - b)
    console.log(`\n=== 倒推 ${ids.map(x => SYMBOLS[x]).join("-")} {${ids}} ===\n`)
    for (const r of decompose(ids).slice(0, 8)) {
      console.log(`  ${r.rootSymbol}${r.chordFormulaId}${r.notation}  cost=${r.cost}`)
    }
  } else {
    const demos: Array<[string, number[]]> = [
      ["C-E-G(应 cost=0:maj3@C)", [0, 4, 7]],
      ["C-E-B(应 cost=1:maj7@C omit5)", [0, 4, 11]],
      ["C-P-D(半音簇,真正的 L2)", [0, 1, 2]],
      ["C-P-G(半音+纯四)", [0, 1, 7]],
      ["C-P-X(半音+三全音)", [0, 1, 6]],
    ]
    for (const [label, ids] of demos) {
      const results = decompose(ids)
      console.log(`\n${label}:`)
      for (const r of results.slice(0, 5)) {
        console.log(`  ${r.rootSymbol}${r.chordFormulaId}${r.notation}  cost=${r.cost}`)
      }
      console.log(`  … 共 ${results.length} 个方案`)
    }
  }
}
