import specialSetsJson from "@static-data/special-sets.json"
import { isNil } from "es-toolkit/predicate"
import type { I_HashTransform } from "./restoreChord"

/**
 * 哈希 set 条目 → set 实体(与 restoreChord 对称的还原路径)
 *
 * 概念分工(用户裁决的概念基础):同度双音(♭3·♮3 并存)等 non-tertian
 * 结构不属于 Chord 体系(度数面板单态是 tertian 定义的忠实实现),
 * 由 special-sets 承接——scoreDisplay {"3":[-1,0]} 原生无损表达。
 * 本函数让 set 条目与 chord 条目对称:也能还原出完整实体
 * (定义查 special-sets 表,音集 = 根音 + offsets 现算)。
 */

/** special-sets 定义表的形状(raw-static/special-sets.json5 编译产物) */
interface I_SpecialSetDef {
  cnName: string
  name: string
  /** Forte 音级集合编号(如 "6-Z11A";2026-09-11 全 114 形逐一查证) */
  forte: string
  scoreDisplay: Record<string, number | number[]>
  offsets: number[]
  tags: string[]
}

/** 哈希条目的 structural 形状(与 findByHash.I_HashEntry 的 set 条目字段兼容) */
interface I_HashSetEntryShape {
  pianoKeyIdRoot: number
  pianoKeySymbolRoot: string
  formulaId: string
  transform: I_HashTransform
  isChordFormula?: boolean
}

/** set 实体:定义(中文名/度数原子/偏移) + 实例(根音/音集)一应俱全 */
export type I_SetEntity = {
  setId: string
  cnName: string
  name: string
  /** Forte 音级集合编号(Rahn 素数形约定;A/B 后缀 = 倒影对中的代表素数形) */
  forte: string
  /** 度数原子(渲染升降号的唯一数据源,如 {"3":[-1,0]} = ♭3·♮3 并存) */
  scoreDisplay: Record<string, number | number[]>
  /** 根音之外的半音偏移量(不含 0,升序) */
  offsets: number[]
  tags: string[]
  pianoKeyIdRoot: number
  pianoKeySymbolRoot: string
  /** 完整音集 = 根音 + offsets(升序) */
  pianoKeyIds: number[]
}

const SPECIAL_SETS = specialSetsJson as Record<string, I_SpecialSetDef>

/**
 * 哈希 set 条目 → set 实体
 *
 * @param entry 哈希条目(findByHash 返回值;set 条目 isChordFormula:false)
 * @returns set 实体;chord 条目或 setId 失配返回 null
 *
 * @example
 * const [setEntry] = findByHash([0, 3, 4])
 * restoreSet(setEntry)
 * // → { setId:"spset-split_third", cnName:"分叉三和弦",
 * //     scoreDisplay:{"3":[-1,0]}, offsets:[3,4], pianoKeyIds:[0,3,4], ... }
 */
export const restoreSet = (entry: I_HashSetEntryShape): I_SetEntity | null => {
  // 只处理 set 条目(chord 条目的还原路径是 restoreChord)
  if (entry.isChordFormula !== false) return null

  const def = SPECIAL_SETS[entry.formulaId]
  if (isNil(def)) return null

  const pianoKeyIds = [
    entry.pianoKeyIdRoot,
    ...def.offsets.map(o => (entry.pianoKeyIdRoot + o) % 12),
  ].sort((a, b) => a - b)

  return {
    setId: entry.formulaId,
    cnName: def.cnName,
    name: def.name,
    forte: def.forte,
    scoreDisplay: def.scoreDisplay,
    offsets: def.offsets,
    tags: def.tags,
    pianoKeyIdRoot: entry.pianoKeyIdRoot,
    pianoKeySymbolRoot: entry.pianoKeySymbolRoot,
    pianoKeyIds,
  }
}

export default restoreSet
