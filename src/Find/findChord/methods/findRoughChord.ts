import { intersection, isEqual } from 'es-toolkit'
import collect from "collect.js"
import ALL_CHORD_INSTANCE_META from "@chord/static/ALL_CHORD_INSTANCE_META"
import type { I_ChordInstanceMeta } from "@chord/static/types"
import { jaccard } from "@common/utils/jaccard"

/**
 * 粗略查找和弦结果（带相似度）
 */
export type I_RoughChordResult = I_ChordInstanceMeta & {
  /** 相似度系数（0-1）：完全匹配=1，省略音匹配=交集/并集 */
  similarity: number
  /** 交集的 pianoKeyId 列表 */
  intersection: number[]
}

/**
 * 检查用户输入是否包含了候选和弦的所有"特征音"
 *
 * 特征音是定义和弦身份的音，不能被省略。
 *
 * 判断依据是**候选和弦实际包含的度数**（数据驱动，从 intervalToPianoKeyId 读取），
 * 而非 chordFormulaId 字符串匹配——后者对 dom9/dom11/dom13 等隐含七和弦
 * 身份的命名会漏判（字符串里没有字面 "7"）。
 *
 * 规则（核心：省略只能发生在非特征音上）：
 * - 根音（1度）：任何和弦都必须弹到
 * - 三度（3度）：必须弹到（定大小性质；sus 用 2/4 度替代，见下）
 * - 七度（7度）：七和弦必须弹到（定七和弦性质）
 * - 替代音：sus2 必须弹 2 度、sus4 必须弹 4 度（它们替代了三度的身份功能）
 * - 变化特征音：若 5 度是变化音程（aug/dim，非纯五），必须弹到
 * - 五度（纯五度）：可省（信息量低）
 * - 扩展音（9/11/13）：可省
 *
 * @param chord - 候选和弦实例（含 intervalToPianoKeyId 度数映射）
 * @param inputIds - 用户实际弹奏的 pianoKeyId 集合
 * @returns true 表示所有特征音都被弹到
 */
function hasAllCharacteristicNotes(
  chord: I_ChordInstanceMeta,
  inputIds: number[],
): boolean {
  // 度数 → { intervalType, pianoKeyId } 的查找
  const degreeMap = chord.intervalToPianoKeyId
  const noteOf = (degree: number): number | undefined =>
    degreeMap[degree]?.pianoKeyId
  const intervalTypeOf = (degree: number) => degreeMap[degree]?.intervalType
  const has = (degree: number): boolean => {
    const id = noteOf(degree)
    return id !== undefined && inputIds.includes(id)
  }

  // 根音必须弹到
  if (!inputIds.includes(chord.pianoKeyIdRoot)) return false

  // 七度：若和弦含 7 度，必须弹到（七和弦的身份）
  if (noteOf(7) !== undefined && !has(7)) return false

  // 三度或其替代音：
  //   - 有 3 度 → 必须弹 3 度
  //   - 无 3 度但有 2 度（sus2）→ 必须弹 2 度
  //   - 无 3 度但有 4 度（sus4）→ 必须弹 4 度
  if (noteOf(3) !== undefined) {
    if (!has(3)) return false
  } else if (noteOf(2) !== undefined) {
    if (!has(2)) return false
  } else if (noteOf(4) !== undefined) {
    if (!has(4)) return false
  }

  // 变化五度：5 度是 aug/dim（非纯五）时必须弹到（变化音是和弦特征）
  const fifthType = intervalTypeOf(5)
  if (fifthType !== undefined && fifthType !== "p" && !has(5)) return false

  return true
}

/**
 * 粗略查找和弦（核心识别算法）
 *
 * 采用 mtkit 的两层匹配策略：
 *
 * **第一层 · 完全匹配**：输入音集 === 候选音集（similarity = 1）
 *
 * **第二层 · 省略音匹配**（仅模糊模式）：用户少弹了音，但弹的音全是候选和弦的音
 * （输入 ⊆ 候选），且候选和弦的特征音都被弹到。
 * 例：输入 C-E-G → 匹配 Cmaj7（用户少弹了 B），但 C-E-G 不会匹配 dom7
 * （dom7 的特征音小七度 Bb 没被弹到）。
 *
 * @param pianoKeyIdList - 钢琴键 ID 列表（0-11），已排序去重
 * @param isStrict - true=只返回完全匹配；false=完全匹配优先，无则返回省略音匹配
 * @param rootNoteLocation - 可选：指定根音（0-11），只查此根音的候选
 * @returns 匹配度和弦列表（完全匹配在前，省略音匹配按相似度降序）
 */
export const findRoughChord = (
  pianoKeyIdList: number[],
  isStrict = false,
  rootNoteLocation?: number,
): I_RoughChordResult[] => {
  const inputSet = [...new Set(pianoKeyIdList)].sort((a, b) => a - b)

  // 若指定根音，先按根音过滤候选库（缩小搜索范围）
  const candidates = collect(ALL_CHORD_INSTANCE_META)
    .filter((chord: I_ChordInstanceMeta) =>
    rootNoteLocation === undefined
      ? true
      : chord.pianoKeyIdRoot === rootNoteLocation,
  )

  // ===== 第一层：完全匹配 =====
  const exactMatches = candidates
    .filter((chord: I_ChordInstanceMeta) =>
      isEqual(inputSet, chord.pianoKeyIdsSorted),
    )
    .all()
    .map((chord: I_ChordInstanceMeta) => {
      const intersect = intersection(chord.pianoKeyIdsSorted, inputSet)
      return {
        ...chord,
        similarity: 1,
        intersection: intersect,
      } as I_RoughChordResult
    })

  // 严格模式：只返回完全匹配
  if (isStrict) {
    return exactMatches
  }

  // 模糊模式：有完全匹配则只返回它们
  if (exactMatches.length > 0) {
    return exactMatches
  }

  // ===== 第二层：省略音匹配（无完全匹配时） =====
  // 输入必须是候选和弦的子集（用户弹的音全在候选里），且特征音都弹到
  const omissionMatches = candidates
    .filter((chord: I_ChordInstanceMeta) => {
      // 候选音集必须比输入多（用户省略了音）
      if (chord.pianoKeyIdsSorted.length <= inputSet.length) return false

      // 输入必须是候选的子集（用户没有错音）
      const intersect = intersection(chord.pianoKeyIdsSorted, inputSet)
      if (intersect.length !== inputSet.length) return false

      // 候选和弦的特征音必须都被弹到
      if (!hasAllCharacteristicNotes(chord, inputSet)) return false

      // 至少 3 个音匹配
      return intersect.length > 2
    })
    .all()
    .map((chord: I_ChordInstanceMeta) => {
      const intersect = intersection(chord.pianoKeyIdsSorted, inputSet)
      const similarity = jaccard(chord.pianoKeyIdsSorted, inputSet)
      return {
        ...chord,
        similarity: Number(similarity.toFixed(3)),
        intersection: intersect,
      } as I_RoughChordResult
    })
    .sort(
      (a: I_RoughChordResult, b: I_RoughChordResult) =>
        b.similarity - a.similarity,
    )

  return omissionMatches
}

export default findRoughChord
