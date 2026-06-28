import { isDefined } from "@common/utils/isDefined"
import difference from "lodash/difference"
import sortBy from "lodash/sortBy"
import isNil from "lodash/isNil"
import toPairs from "lodash/toPairs"
import type { I_RoughChordResult } from "./findRoughChord"
import type { I_ChordInstanceMeta } from "@chord/static/types"

/**
 * 变化信息：从原度数变化到新度数
 */
export type I_ChordAlteration = {
  /** 原度数（标准和弦中的） */
  fromDegree: string
  /** 新度数（用户输入的） */
  toDegree: string
  /** 变化的度数编号（如 3, 5, 7 等） */
  degree: number
}

/**
 * 和弦变换信息
 */
export type I_ChordTransform = {
  /** 省略的音（度数），如 [3, 5] 表示 omit3, omit5 */
  omit: number[]
  /** 额外的音（pianoKeyId），相对于标准和弦 */
  extra: number[]
  /** 变化的音（度数变化） */
  alterations: I_ChordAlteration[]
}

/**
 * 分析后的和弦结果（带变换信息）
 */
export type I_AnalyzedChordResult = I_RoughChordResult & {
  /** 和弦变换信息 */
  transform?: I_ChordTransform
  /** 格式化的变换字符串，如 "omit5" 或 "add9" 或 "b3→3" */
  transformString?: string
  /** 变换次数（alterations + omit + extra 各算1次） */
  transformCount?: number
  /** 是否为原位和弦（最低音 = 根音） */
  isRootPosition: boolean
}

/**
 * 从度数字符串中提取度数编号
 * @param degreeName - 如 "b3", "3", "#11", "b9", "maj7"
 * @returns 度数编号，如 3, 11, 7 等；无法提取则返回 null
 */
const extractDegreeNumber = (degreeName: string): number | null => {
  // 匹配数字，包括可能的前缀如 b, #, maj 等
  const match = degreeName.match(/\d+/)
  if (match) {
    return parseInt(match[0], 10)
  }
  return null
}

/**
 * 在和弦元数据中根据 pianoKeyId 查找对应的度数
 */
const findDegreeByPianoKeyId = (
  meta: I_ChordInstanceMeta,
  pianoKeyId: number
): number | undefined => {
  for (const [degree, info] of toPairs(meta.intervalToPianoKeyId)) {
    if (info?.pianoKeyId === pianoKeyId) {
      return parseInt(degree)
    }
  }
  return undefined
}

/**
 * 将 pianoKeyId 转换为相对于根音的度数名称
 *
 * @param rootPianoKeyId - 根音的 pianoKeyId
 * @param pianoKeyId - 目标 pianoKeyId
 * @returns 度数名称，如 "b9", "9", "#9", "11", "#11", "13" 等
 */
const pianoKeyIdToDegreeName = (rootPianoKeyId: number, pianoKeyId: number): string => {
  // 计算从根音开始的半音数（向上）
  let gap = pianoKeyId - rootPianoKeyId
  if (gap < 0) gap += 12

  // 半音数到度数的映射
  const gapToDegree: Record<number, string> = {
    1: "b9",   // 小二度
    2: "9",    // 大二度
    3: "b3",   // 小三度
    4: "3",    // 大三度
    5: "11",   // 纯四度
    6: "#11",  // 增四度
    7: "5",    // 纯五度
    8: "b13",  // 小六度
    9: "13",   // 大六度
    10: "b7",  // 小七度
    11: "maj7" // 大七度
  }

  return gapToDegree[gap] || `+${gap}`
}

/**
 * 从和弦公式 ID 中提取命名度数
 *
 * 命名度数是该和弦类型不能省略的核心度数：
 * - 7 和弦 → 不能省略 7 音
 * - 9 和弦 → 不能省略 9 音（但可省略 7）
 * - 11 和弦 → 不能省略 11 音
 * - 13 和弦 → 不能省略 13 音
 *
 * @param chordFormulaId - 和弦公式 ID，如 "maj7", "dom9", "maj11", "min13" 等
 * @returns 命名度数（7, 9, 11, 13），若无则返回 null
 *
 * @example
 * getChordNamedDegree("maj7")    // → 7
 * getChordNamedDegree("dom9")    // → 9
 * getChordNamedDegree("maj11")   // → 11
 * getChordNamedDegree("min13")   // → 13
 * getChordNamedDegree("maj3")    // → null（三和弦无命名度数）
 */
const getChordNamedDegree = (chordFormulaId: string): number | null => {
  // 匹配模式：数字前可能是变音符号(b/#)，数字后可能有其他字符
  // 如 "maj7" → 7, "dom9#11" → 9, "min13" → 13
  const match = chordFormulaId.match(/(\d+)/)
  if (isNil(match)) return null

  const degree = parseInt(match[1], 10)

  // 只有 7, 9, 11, 13 是命名度数
  // 5 音的和弦（如 sus4, sus2）不算
  if ([7, 9, 11, 13].includes(degree)) {
    return degree
  }

  return null
}

/**
 * 分析和弦变换
 *
 * 比较标准和弦与用户输入的差异，计算省略的音、额外的音和变化的音。
 *
 * 变化检测逻辑：
 * - 如果标准和弦有度数 N 的音，而用户输入有度数 N 的不同音，则记录为变化
 * - 例如：标准和弦有 b3，用户输入有 3，则记录为 "b3→3"
 * - **命名度数不能省略**：7和弦不能省7音，9和弦不能省9音，11和弦不能省11音，13和弦不能省13音
 *
 * @param result - 粗略查找结果
 * @param inputPianoKeyIdList - 用户输入的 pianoKeyId 列表
 * @param lowestPianoKeyId - 用户输入的最低 pianoKeyId
 * @returns 带变换信息的结果，如果省略了命名度数则返回 null
 */
export const analyzeChordTransform = (
  result: I_RoughChordResult,
  inputPianoKeyIdList: number[],
  lowestPianoKeyId: number
): I_AnalyzedChordResult | null => {
  // 标准和弦的音符（去重）
  const standardNotes = result.pianoKeyIdsSorted

  // 交集 = 用户输入和标准和弦都有
  const intersection = result.intersection

  // 标准和弦有但用户输入没有的 → 省略的音
  const omittedNotes = difference(standardNotes, intersection)

  // 用户输入有但标准和弦没有的 → 额外的音
  const extraNotes = difference(inputPianoKeyIdList, intersection)

  // 将省略的 pianoKeyId 转换为度数信息
  const omittedWithDegree: Array<{ pianoKeyId: number; degree: number; degreeName: string }> = []
  for (const pianoKeyId of omittedNotes) {
    const degree = findDegreeByPianoKeyId(result, pianoKeyId)
    if (degree) {
      const degreeName = pianoKeyIdToDegreeName(result.pianoKeyIdRoot, pianoKeyId)
      omittedWithDegree.push({ pianoKeyId, degree, degreeName })
    }
  }

  // ===== 检查命名度数是否被省略 =====
  const namedDegree = getChordNamedDegree(result.chordFormulaId)
  if (isDefined(namedDegree)) {
    // 检查省略的音中是否包含命名度数
    const hasNamedDegreeOmitted = omittedWithDegree.some((omitted) => {
      const omittedDegreeNum = extractDegreeNumber(omitted.degreeName)
      return omittedDegreeNum === namedDegree
    })

    // 如果省略了命名度数，返回 null（不合法的匹配）
    if (hasNamedDegreeOmitted) {
      return null
    }
  }

  // 将额外的 pianoKeyId 转换为度数信息
  const extrasWithDegree: Array<{ pianoKeyId: number; degreeName: string }> = []
  for (const pianoKeyId of extraNotes) {
    const degreeName = pianoKeyIdToDegreeName(result.pianoKeyIdRoot, pianoKeyId)
    extrasWithDegree.push({ pianoKeyId, degreeName })
  }

  // 如果没有差异，直接返回原结果（添加 isRootPosition, transformCount=0）
  if (omittedNotes.length === 0 && extraNotes.length === 0) {
    return {
      ...result,
      transformCount: 0,
      isRootPosition: result.pianoKeyIdRoot === lowestPianoKeyId
    }
  }

  // 检测变化：匹配省略的音和额外的音是否属于同一度数
  const alterations: I_ChordAlteration[] = []
  const remainingOmits: number[] = []
  const remainingExtras: Array<{ pianoKeyId: number; degreeName: string }> = []

  // 用于标记 extra 是否已被匹配
  const matchedExtraIndices = new Set<number>()

  for (const omitted of omittedWithDegree) {
    let found = false
    for (let i = 0; i < extrasWithDegree.length; i++) {
      if (matchedExtraIndices.has(i)) continue

      const extra = extrasWithDegree[i]

      // 提取度数编号（从 degreeName 中提取，如 "b3" → 3, "#11" → 11）
      const omittedDegreeNum = extractDegreeNumber(omitted.degreeName)
      const extraDegreeNum = extractDegreeNumber(extra.degreeName)

      // 如果度数编号相同，说明是同一度数的变化
      if (omittedDegreeNum === extraDegreeNum && isDefined(omittedDegreeNum)) {
        alterations.push({
          fromDegree: omitted.degreeName,
          toDegree: extra.degreeName,
          degree: omittedDegreeNum
        })
        matchedExtraIndices.add(i)
        found = true
        break
      }
    }

    if (!found) {
      remainingOmits.push(omitted.degree)
    }
  }

  // 未匹配的 extra
  for (let i = 0; i < extrasWithDegree.length; i++) {
    if (!matchedExtraIndices.has(i)) {
      remainingExtras.push(extrasWithDegree[i])
    }
  }

  // 构建变换对象
  const transform: I_ChordTransform = {
    omit: sortBy(remainingOmits),
    extra: sortBy(remainingExtras.map(e => e.pianoKeyId)),
    alterations: sortBy(alterations, a => a.degree)
  }

  // 格式化变换字符串
  const parts: string[] = []

  // 1. 变化的音
  for (const alt of alterations) {
    parts.push(`${alt.fromDegree}→${alt.toDegree}`)
  }

  // 2. 省略的音
  if (remainingOmits.length > 0) {
    parts.push("omit" + remainingOmits.join(","))
  }

  // 3. 额外的音
  if (remainingExtras.length > 0) {
    const extraDegrees: string[] = []
    for (const extra of remainingExtras) {
      extraDegrees.push(extra.degreeName)
    }
    parts.push("add" + extraDegrees.join(","))
  }

  // 计算变换次数
  const transformCount = alterations.length + remainingOmits.length + remainingExtras.length

  return {
    ...result,
    transform,
    transformString: parts.join(",") || undefined,
    transformCount,
    isRootPosition: result.pianoKeyIdRoot === lowestPianoKeyId
  }
}

export default analyzeChordTransform
