import chordHash3 from "@static-data/chord-hash-3.json"
import { isNil } from "es-toolkit/predicate"
import { PianoKey } from "@pianokey"

/**
 * 三音哈希查找器
 *
 * 从预烘焙的 chord-hash-3.json(C(12,3)=220 全量)直接查找,
 * 替代 L0 哈希桶 + L1 省略音扫描 + pcset 降级的三层管线——
 * 一次 O(1) 查找返回全部解释,按优先级排序(奥卡姆剃刀)。
 *
 * 数据结构(烘焙时预计算,契约与 ts-dev/decompose/bake.ts 一致):
 *   键 = 键集的 pianoKeySymbol 串,**按字母序排列**(跨语言规范形),
 *       如 {0,2,11} → 符号 [C,D,B] → 字母序 → "BCD"
 *   值 = 优先级排序的方案数组,每条 {pianoKeyIdRoot,pianoKeySymbolRoot,formulaId,
 *        scoreDisplay,notation,cost,tier,isChordFormula};set 条目(isChordFormula:
 *        false)额外带 cnName
 *
 * 键构造三步(消费端与烘焙端完全一致,缺一不可):
 *   去重 → 数字排序 → 符号映射(PianoKey.SYMBOLS) → 字母排序 → join("")
 */
export type I_HashEntry = {
  /** 根音 pianoKeyId (0-11) */
  pianoKeyIdRoot: number
  /** 根音 symbol(C P D Q E F X G Y A Z B) */
  pianoKeySymbolRoot: string
  /** 和弦公式 id 或 set id(spset- 前缀) */
  formulaId: string
  /** 记谱原子:chord 条目为公式 scoreDisplay 字符串;set 条目为 {度数: 变化量|变化量[]} */
  scoreDisplay: string | Record<string, number | number[]>
  /** 变换记号,如 "(omit5)";空串 = 完全匹配 */
  notation: string
  /** 加权 cost(越低越合理) */
  cost: number
  /** tier(1 完全命中 … 6 极端) */
  tier: number
  /** true=chord 公式条目 / false=special-set 条目(显式布尔,两态都有) */
  isChordFormula: boolean
  /** 仅 set 条目:中文名(如 "Phrygian特征前三音") */
  cnName?: string
}

export type I_HashResult = I_HashEntry & {
  /** 完整和弦名:根音 symbol + 公式 id(set 条目为 根音·中文名) */
  chordName: string
  /** 是否为完全匹配(cost=0 且无变换) */
  isExact: boolean
}

const HASH_TABLE = chordHash3 as Record<string, I_HashEntry[]>

/** 键集 → 字母序符号键(与 bake.ts 的烘焙键构造一致) */
const hashKey = (ids: number[]): string =>
  [...new Set(ids)]
    .sort((a, b) => a - b)
    .map(i => PianoKey.SYMBOLS[i])
    .sort()
    .join("")

/**
 * 从三音哈希表查找:一次 O(1)。输入顺序无关(内部去重排序)
 *
 * @param ids pianoKeyId 数组(0-11),去重后长度必须为 3
 * @returns 按优先级排序的全部方案;键集不存在返回空数组
 *
 * @example
 * findByHash([0, 4, 7])   // C-E-G → [{ r:0, s:"C", f:"maj3", n:"", c:0, isExact:true }]
 * findByHash([2, 11, 0])  // 乱序输入,同 [0,2,11] → B·Phrygian特征前三音 + Cmaj7sus2(omit5)
 */
export const findByHash = (ids: number[]): I_HashResult[] => {
  const entries = HASH_TABLE[hashKey(ids)]
  if (isNil(entries)) return []

  return entries.map(e => ({
    ...e,
    // chordName 延迟计算:set 条目给 根音·中文名,chord 条目给 根音+公式id;
    // 完整记谱版由消费端用 new Chord(r, f).scoreSymbol 或渲染 sd 原子获取
    chordName: e.isChordFormula === false ? `${e.pianoKeySymbolRoot}·${e.cnName}` : `${e.pianoKeySymbolRoot}${e.formulaId}`,
    isExact: e.cost === 0 && e.notation === "",
  }))
}

export default findByHash
