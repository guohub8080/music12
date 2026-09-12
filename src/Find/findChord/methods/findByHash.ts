import chordHash3 from "@static-data/chord-hash-3.json"
import chordHash4 from "@static-data/chord-hash-4.json"
import chordHash5 from "@static-data/chord-hash-5.json"
import chordHash6 from "@static-data/chord-hash-6.json"
import chordHash7 from "@static-data/chord-hash-7.json"
import { isNil } from "es-toolkit/predicate"
import { PianoKey } from "@pianokey"
import { Chord } from "@chord"
import { restoreChord, type I_HashTransform } from "./restoreChord"
import { restoreSet, type I_SetEntity } from "./restoreSet"

/**
 * 哈希条目(烘焙产物的一行;chord 与 set 双态)
 */
export type I_HashEntry = {
  /** 根音 pianoKeyId */
  pianoKeyIdRoot: number
  /** 根音符号(C P D Q E F X G Y A Z B 单字母体系) */
  pianoKeySymbolRoot: string
  /** 和弦公式 id 或 set id(spset- 前缀) */
  formulaId: string
  /** 记谱原子:chord 条目为公式 scoreDisplay 字符串;set 条目为 {度数: 变化量|变化量[]} */
  scoreDisplay: string | Record<string, number | number[]>
  /** 变换分组对象(原子化:{"omit":5,"flat":[2]};完全命中为 {}) */
  transform: I_HashTransform
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
  /** 惰性反推的 Chord 实例(getter:首次访问才构造,结果缓存;set 条目为 null) */
  readonly chord: Chord | null
  /** 惰性还原的 set 实体(getter,与 chord 对称;chord 条目为 null) */
  readonly setEntity: I_SetEntity | null
}

/** 五张烘焙表,按键集音数(3~7)分流——键长即 K,单条 import 保证 tree-shaking 粒度 */
const TABLES: Record<number, Record<string, I_HashEntry[]>> = {
  3: chordHash3 as unknown as Record<string, I_HashEntry[]>,
  4: chordHash4 as unknown as Record<string, I_HashEntry[]>,
  5: chordHash5 as unknown as Record<string, I_HashEntry[]>,
  6: chordHash6 as unknown as Record<string, I_HashEntry[]>,
  7: chordHash7 as unknown as Record<string, I_HashEntry[]>,
}

/** 键集 → 字母序符号键(与 bake.ts 的烘焙键构造一致) */
const hashKey = (ids: number[]): string =>
  [...new Set(ids)]
    .sort((a, b) => a - b)
    .map(i => PianoKey.SYMBOLS[i])
    .sort()
    .join("")

/**
 * 键集 → 全部解释,一次 O(1)。输入顺序无关(内部去重排序)。
 *
 * 三~七音五张哈希表按输入音数自动路由(C(12,3)~C(12,7)=3223 键集全量);
 * 表内条目是烘焙管线(policy→rules→verdicts 三层保留管线)的最终裁决——
 * 每个键集 1~4 条零噪音答案,等和弦(C6/Am7)、对称家族(dim7 四重名)、
 * special-set(分叉三和弦等)都在条目里。音数 <3 或 >7 返回空数组。
 *
 * @param ids pianoKeyId 数组(0-11)
 * @returns 按优先级排序的全部方案
 *
 * @example
 * findByHash([0, 4, 7])       // → C 大三 + …(三音表)
 * findByHash([0, 4, 7, 10])   // → C7(四音表)
 * findByHash([0, 2, 4, 5, 7, 9, 11])  // → 七音表:maj13 四重读法等
 */
export const findByHash = (ids: number[]): I_HashResult[] => {
  const k = new Set(ids).size
  const table = TABLES[k]
  if (isNil(table)) return []

  const entries = table[hashKey(ids)]
  if (isNil(entries)) return []

  return entries.map(e => {
    // chord 实例惰性构造:首次访问才 restoreChord(闭包缓存),
    // findByHash 保持 O(1) 纯查表——不用实例的消费端零开销
    let cachedChord: Chord | null | undefined
    let cachedSet: I_SetEntity | null | undefined
    return {
      ...e,
      // chordName: set 条目给 根音·中文名,chord 条目给 根音+公式id;
      // 完整记谱由 entry.chord.scoreSymbol 或渲染 scoreDisplay 原子获取
      chordName: e.isChordFormula === false ? `${e.pianoKeySymbolRoot}·${e.cnName}` : `${e.pianoKeySymbolRoot}${e.formulaId}`,
      isExact: e.cost === 0 && Object.keys(e.transform).length === 0,
      get chord(): Chord | null {
        if (isNil(cachedChord) && cachedChord !== null) cachedChord = restoreChord(e)
        return cachedChord
      },
      get setEntity(): I_SetEntity | null {
        if (isNil(cachedSet) && cachedSet !== null) cachedSet = restoreSet(e)
        return cachedSet
      },
    }
  })
}
