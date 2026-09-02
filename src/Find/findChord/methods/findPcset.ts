import pcsetNamesJson from "@static-data/pcset-names.json"
import { isNumber } from "es-toolkit/predicate"
import { keyMaskFromIds, idsFromKeyMask, primeFormMask, maskDistance } from "@common/keyMask"
import ALL_CHORD_INSTANCE_META from "@chord/static/ALL_CHORD_INSTANCE_META"

/**
 * 音级集合(pcset)降级识别
 *
 * findChord 的和弦层无匹配时的 fallback:给出音集的「集合论身份」——
 * prime form(Forte 分类键)+ 命名表(ts-dev/raw-static/pcset-names.json5 编译)
 * + 离最近标准和弦的距离。让任何输入都有诚实的输出。
 */

export type I_PcsetResult = {
  type: "pcset"
  /** 降级层标识:永远排在和弦结果之后 */
  level: 3
  /** prime form 的音(移调+反转等价类的最紧凑代表) */
  primeFormIds: number[]
  /** 命名表命中时才有(Forte 编号/名称/描述);缺键时为 undefined */
  forte?: string
  cnName?: string
  name?: string
  description?: string
  // —— 与和弦结果共享的骨架字段(通用渲染不崩)——
  /** 输入音集(排序去重,原样) */
  pianoKeyIdsSorted: number[]
  /** pcset 无根音概念,恒 false(占位兼容) */
  isRootPosition: false
  /** 离最近标准和弦实例差几个音(maskDistance) */
  nearestDistance: number
  /**
   * 全部等距最近方案(距离 = nearestDistance 的所有实例,稳定按实例序)。
   * 「换/补一个音就能成和弦」的岔路可能有多条,全部列出由调用方选择。
   * 距离 > 4 时为空(太远的参考无信息量)。
   */
  nearests?: Array<{
    chordFormulaId: string
    root: number
    transformString: string
    maskDistance: number
  }>
}

const NAME_TABLE = pcsetNamesJson as Record<string, {
  forte: string; cnName: string; name: string; description: string; tags: string[]
}>

/**
 * 识别音集的 prime form 身份
 *
 * @param sortedIds 输入音集(0-11,建议排序去重)
 */
export const findPcset = (sortedIds: number[]): I_PcsetResult => {
  const pfMask = primeFormMask(sortedIds)
  const primeFormIds = idsFromKeyMask(pfMask)
  const named = NAME_TABLE[primeFormIds.join(",")]

  // 等距最近方案(位运算扫描 1056 实例,收集最小距离的全部实例)
  const inputMask = keyMaskFromIds(sortedIds)
  const SYMBOLS = ["C","P","D","Q","E","F","X","G","Y","A","Z","B"]
  const describe = (inst: (typeof ALL_CHORD_INSTANCE_META)[number], d: number) => {
    // 差异 = 输入多弹的 + 少弹的;变换记号按 omit/extra 语义拼接。
    // 记号约定:omit 后是「度数」(候选和弦里该音的度),extra 后是「键 symbol」
    // (输入多弹的音不在和弦里,无度数可标,用 pianoKeySymbol 避免与度数混淆)
    const omitted = inst.pianoKeyIdsSorted.filter(k => !sortedIds.includes(k))
      .map(k => inst.pianoKeyIdToInterval[k]?.intervalNum).filter(isNumber)
    const extra = sortedIds.filter(k => !inst.pianoKeyIdsSorted.includes(k))
      .map(k => SYMBOLS[k])
    const parts: string[] = []
    if (omitted.length) parts.push(`omit${omitted.join(",")}`)
    if (extra.length) parts.push(`extra${extra.join(",")}`)
    return {
      chordFormulaId: inst.chordFormulaId,
      root: inst.pianoKeyIdRoot,
      transformString: parts.join(" ") || "(完全一致)",
      maskDistance: d,
    }
  }

  let bestDist = Infinity
  let nearests: I_PcsetResult["nearests"] = []
  for (const inst of ALL_CHORD_INSTANCE_META) {
    const d = maskDistance(inputMask, keyMaskFromIds(inst.pianoKeyIdsSorted))
    if (d < bestDist) {
      bestDist = d
      nearests = [describe(inst, d)]        // 更近:清空重收
    } else if (d === bestDist) {
      nearests.push(describe(inst, d))      // 等距:并列收集
    }
  }

  return {
    type: "pcset",
    level: 3,
    primeFormIds,
    ...(named ?? {}),
    pianoKeyIdsSorted: sortedIds,
    isRootPosition: false,
    nearestDistance: bestDist,
    nearests: bestDist <= 4 ? nearests : undefined,  // 距离太远的参考无信息量,不给
  }
}

export default findPcset
