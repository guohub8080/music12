import scaleHashJson from "@static-data/scale-hash.json"
import { isNil, isNotNil } from "es-toolkit/predicate"
import { PianoKey } from "@pianokey"
import { Scale } from "@scale"

/**
 * 等音拼写变体:根音拼写 → 全套拼写数据
 */
export type I_ScaleSpelling = {
  /** 根音拼写名(如 "C♯" / "D♭") */
  root: string
  /** 度数序拼写音名(根音起;五声 5 个,七声 7 个) */
  notes: string[]
  /** 最佳吻合调号(有符号,♯ 正 ♭ 负,如 +7 / -5) */
  keySignature: number
  /** 调号之外的临时记号(如 C 和声小调的 ["B♮"]) */
  accidentals: string[]
  /** 理论调标记:任何音需要重升降(♯♯/♭♭)即 true。
   *  用户裁决(2026-09-11):超过重升重降(≥3 重)的拼写变体已在烘焙时排除,
   *  必有等音根音可代——上限就是 ♯♯/♭♭ */
  isTheoretical: boolean
  /** 理论调的等音建议(同键另一根音拼写中实用者) */
  enharmonicRoot: string | null
}

/**
 * 单条调式读法:(根音 pianoKeyId × 调式形状) 的 canonical 代表
 */
export type I_ScaleHashEntry = {
  rootPianoKeyId: number
  rootPianoKeySymbol: string
  scaleModeId: string
  cnName: string
  type: string
  forte: string
  tags: string[]
  /** 同 intervalList 的别名调式(IONIAN/雅清燕等)——不展开为独立读法,防同形噪音 */
  aliasModeIds: string[]
  /** 度数序音集(根音起,如 Dorian 从 D 绕回) */
  pianoKeyIds: number[]
  /** 度数语义层(吸收自 findNotesInScales 的 noteDegrees 设计):音 → 级数 */
  pianoKeyIdToDegree: Record<string, number>
  /** 变音语义层:级数 → 相对自然大调同度的半音差 */
  degreeAlterationsMap: Record<string, number | null>
  spellings: I_ScaleSpelling[]
}

/** 查询结果:读法 + 语义化包装 + 惰性 Scale 实例 */
export type I_ScaleHashResult = I_ScaleHashEntry & {
  /** 完整调名(根音符号 + 中文名,如 "C♯·自然大调") */
  scaleName: string
  /** 惰性构造的 Scale 实例(getter:首次访问才构造,结果缓存) */
  readonly scale: Scale
}

const TABLE = scaleHashJson as Record<string, I_ScaleHashEntry[]>

/** 键集 → 字母序符号键(与烘焙器键构造一致) */
const hashKey = (ids: number[]): string =>
  [...new Set(ids)]
    .sort((a, b) => a - b)
    .map(i => PianoKey.SYMBOLS[i])
    .sort()
    .join("")


/**
 * 键集 → 全部调式读法(含等音拼写层),一次 O(1)
 *
 * 与 chord 侧 findByHash 对偶:琴键输入查这张表得到「这是什么调式」的全部
 * 解释——每条读法自带度数语义(音→级数)与等音拼写(C♯/D♭ 并列、理论调显式
 * 标记)。用户裁决(2026-09-11):输入永远走 symbol(pianoKeyId),
 * 拼写只是输出层信息——消费端从 spellings 里按上下文自选,不做输入消歧。
 *
 * @param ids pianoKeyId 数组(0-11),内部去重排序,顺序无关
 * @param options.scaleModeIds 限定调式范围(含别名键;如 ["melodic-minor"] 不支持——
 *   传具体 scaleModeId 列表)
 * @param options.excludeAsRoot 排除某音为根音的读法(吸收自 findNoteDegreeInAllScales
 *   的「自动排除根音调式」设计:自己的根音当 1 度是废话)
 *
 * @example
 * findByScaleHash([0, 2, 4, 5, 7, 9, 11])  // C 大调音集 → 7 条 modal 读法
 * findByScaleHash([0, 1, 3, 5, 6, 8, 10])  // C♯/D♭ 大调音集 → 双拼写并列
 */
export const findByScaleHash = (
  ids: number[],
  options?: {
    scaleModeIds?: string[]
    excludeAsRoot?: number
  },
): I_ScaleHashResult[] => {
  const entries = TABLE[hashKey(ids)]
  if (isNil(entries)) return []

  return entries
    .filter(e => isNil(options?.scaleModeIds) ||
      options!.scaleModeIds!.includes(e.scaleModeId) ||
      e.aliasModeIds.some(a => options!.scaleModeIds!.includes(a)))
    .filter(e => isNil(options?.excludeAsRoot) || e.rootPianoKeyId !== options!.excludeAsRoot)
    .map(e => {
      let cached: Scale | undefined
      return {
        ...e,
        scaleName: `${e.rootPianoKeySymbol}·${e.cnName}`,
        get scale(): Scale {
          if (isNil(cached)) cached = new Scale(e.rootPianoKeyId, e.scaleModeId as never)
          return cached
        },
      }
    })
}


