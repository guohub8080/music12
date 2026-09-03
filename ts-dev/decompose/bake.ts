// @ts-nocheck
/**
 * 三音哈希表烘焙器
 *
 * 遍历 C(12,3)=220 种三音组合,对每个键集运行倒推引擎,
 * 按加权 cost 排序后烘焙为 JSON 查询表。
 *
 * 产出: static-data/chord-hash-3.json
 *   键 = 排序键集 join(","),如 "0,1,6"
 *   值 = 按加权 cost 排序的分解方案数组
 *
 * 运行: npx tsx ts-dev/decompose/bake.ts
 */
import { writeFileSync } from "fs"
import { resolve, dirname } from "path"
import { fileURLToPath } from "url"
import { decompose } from "./engine"

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, "../..")
const SYMBOLS = ["C","P","D","Q","E","F","X","G","Y","A","Z","B"]

// ===== 加权 cost 函数(乐理依据:ts-dev/decompose/theory.md) =====

/** 判断公式是否属七家族 */
const isDom7Family = (formulaId: string): boolean =>
  formulaId.startsWith("dom") || formulaId.includes("sus") && formulaId.includes("7")

/** 判断公式是否大七/小七/半减七等非属七七和弦 */
const isSeventhChord = (formulaId: string): boolean =>
  /maj7|min7|dim7|halfdim|minmaj/.test(formulaId)

/** omit 的加权 cost */
export const omitCost = (degree: number, formulaId: string): number => {
  if (degree === 5) return 0                    // 纯五度:不定义性质,预期可省
  if (degree === 11) return 0                   // avoid note 冲突,省掉是预期
  if ([9, 13].includes(degree)) return 0.5      // 扩展音:色彩音
  if ([3, 7].includes(degree)) return Infinity  // guide tones:排除
  return 1                                       // 其他(如 6 度)
}

/** alter(♯/♭) 的加权 cost */
export const alterCost = (offset: number, formulaId: string): number => {
  if (offset === 0) return 0
  if (Math.abs(offset) >= 2) return 4           // 双变化(♯♯/♭♭):极不寻常
  if (isDom7Family(formulaId)) return 1         // 属七上的变化:合法张力
  // 非属七:检查是否自然扩展
  // ♯11 在 maj7 上是合法的(利底亚色彩)
  // ♭13 在 m7b5 上是合法的(洛克里亚色彩)
  return 3                                       // avoid note 冲突
}

/** add 的加权 cost(同 alter 逻辑) */
export const addCost = (degree: number, offset: number, formulaId: string): number => {
  if (offset === 0) return 0.5                   // 自然扩展(9/11/13)
  if (Math.abs(offset) >= 2) return 4
  if (isDom7Family(formulaId)) return 1
  return 3
}

// ===== 主流程:烘焙 =====

const combo = (arr: number[], k: number): number[][] =>
  k === 0 ? [[]] : arr.flatMap((x, i) => combo(arr.slice(i + 1), k - 1).map(c => [x, ...c]))

const bake = () => {
  const inputs = combo([0,1,2,3,4,5,6,7,8,9,10,11], 3)
  const table: Record<string, any[]> = {}
  let totalSolutions = 0

  for (const ids of inputs) {
    const key = ids.join(",")
    const raw = decompose(ids)

    // 按加权 cost 重排序
    const weighted = raw
      .map(r => ({
        ...r,
        weightedCost: r.ops.reduce((sum: number, op: any) => {
          if (op.kind === "omit") return sum + omitCost(op.degree, r.chordFormulaId)
          if (op.kind === "alter") return sum + alterCost(op.offset, r.chordFormulaId)
          if (op.kind === "add") return sum + addCost(op.degree, op.offset, r.chordFormulaId)
          return sum
        }, 0),
      }))
      // 过滤掉含 Infinity(omit3/omit7)的方案
      .filter((r: any) => r.weightedCost < Infinity)
      .sort((a: any, b: any) => a.weightedCost - b.weightedCost || a.chordFormulaId.localeCompare(b.chordFormulaId))

    // 精简存储:只保留必要字段
    table[key] = weighted.slice(0, 10).map((r: any) => ({
      r: r.root,           // 根音 pianoKeyId
      s: SYMBOLS[r.root],   // 根音 symbol
      f: r.chordFormulaId,  // 公式 id
      n: r.notation,        // 变换记号
      c: r.weightedCost,    // 加权 cost
    }))
    totalSolutions += table[key].length
  }

  const outPath = resolve(ROOT, "static-data", "chord-hash-3.json")
  writeFileSync(outPath, JSON.stringify(table, null, 2) + "\n", "utf-8")
  console.log(`烘焙完成:${inputs.length} 个键集,共 ${totalSolutions} 个方案`)
  console.log(`输出:${outPath}`)
  console.log(`文件大小:${(JSON.stringify(table).length / 1024).toFixed(1)}KB`)
}

bake()
