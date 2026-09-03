import chordHash3 from "@static-data/chord-hash-3.json"

/**
 * 三音哈希查找器
 *
 * 从预烘焙的 chord-hash-3.json(C(12,3)=220 全量)直接查找,
 * 替代 L0 哈希桶 + L1 省略音扫描 + pcset 降级的三层管线——
 * 一次 O(1) 查找返回全部解释,按加权 cost 排序(奥卡姆剃刀)。
 *
 * 数据结构(烘焙时预计算):
 *   键 = 排序键集 join(","),如 "0,4,7"
 *   值 = 按加权 cost 升序的方案数组,每条 {r:根音, s:symbol, f:公式, n:变换记号, c:cost}
 *
 * cost 语义(乐理依据:ts-dev/decompose/theory.md):
 *   0   = 完全匹配(零变换)或纯 omit5/omit11(预期行为)
 *   0.5 = 自然扩展(add9/11/13)
 *   1   = 属七上的合法变化(♭9/♯9/♯11/♭13)
 *   3   = avoid note 冲突(非属七上的变化)
 *   4   = 双变化(♯♯/♭♭)
 */

export type I_HashEntry = {
  /** 根音 pianoKeyId (0-11) */
  r: number
  /** 根音 symbol(C P D Q E F X G Y A Z B) */
  s: string
  /** 和弦公式 id */
  f: string
  /** 变换记号,如 "(♭2 omit5)";空串 = 完全匹配 */
  n: string
  /** 加权 cost(越低越合理) */
  c: number
}

export type I_HashResult = I_HashEntry & {
  /** 完整和弦名:根音 symbol + 公式 scoreSymbol(运行时从 Chord 类取) */
  chordName: string
  /** 是否为完全匹配(cost=0 且无变换) */
  isExact: boolean
}

const HASH_TABLE = chordHash3 as Record<string, I_HashEntry[]>

/**
 * 从三音哈希表查找:一次 O(1)
 *
 * @param sortedIds 排序去重的 pianoKeyId 数组(0-11),长度必须为 3
 * @returns 按加权 cost 排序的全部方案;键集不存在返回空数组
 *
 * @example
 * findByHash([0, 4, 7])
 * // → [{ r:0, s:"C", f:"maj3", n:"", c:0, chordName:"Cmaj3", isExact:true }, ...]
 *
 * findByHash([0, 1, 2])  // C-P-D 半音簇
 * // → [{ r:1, s:"P", f:"maj7sus2", n:"(♭2 omit5)", c:1, ... }, ...]
 */
export const findByHash = (sortedIds: number[]): I_HashResult[] => {
  if (sortedIds.length !== 3) return []
  const entries = HASH_TABLE[sortedIds.join(",")]
  if (!entries) return []

  return entries.map(e => ({
    ...e,
    // chordName 延迟计算:调用方需要时才从 Chord 类取 scoreSymbol
    // 这里先给简化版(根音+公式id),完整版由消费端用 new Chord(r, f).scoreSymbol 获取
    chordName: `${e.s}${e.f}`,
    isExact: e.c === 0 && e.n === "",
  }))
}

export default findByHash
