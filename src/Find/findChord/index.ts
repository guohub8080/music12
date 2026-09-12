import { isNotNil } from 'es-toolkit/predicate';
import { midiListToPianoKeys } from "./methods/midiListToPianoKeys"
import { findByHash, type I_HashResult } from "./methods/findByHash"
import { findPcset, type I_PcsetResult } from "./methods/findPcset"

// 导出类型
export type { I_HashEntry, I_HashResult } from "./methods/findByHash"
export type { I_PcsetResult } from "./methods/findPcset"

/**
 * 统一查找结果:判别联合(type 字段分流)。
 * 和弦/set 结果 = 哈希读法 + type/isRootPosition;pcset 为降级兜底项(fallback:"pcset" 时才出现)。
 */
export type I_ChordFindResult = I_HashResult & { type: "chord"; isRootPosition: boolean }
export type I_FindResult = I_ChordFindResult | I_PcsetResult

/**
 * 根据音符列表查找和弦(哈希直查版,2026-09-12 大修)
 *
 * 主路径切换:旧两层管线(findRoughChord 线性扫 1056 实例 + analyzeChordTransform
 * 变换分析)退役,改为 findByHash 直查五张烘焙表(3~7 音,C(12,3)~C(12,7)
 * 3223 键集全量,一次 O(1))。省略音/特征音/等和弦/对称家族/special-set
 * 的全部裁决已由烘焙管线(policy→rules→verdicts,数月人机协作审核)固化进表。
 *
 * ### 匹配语义(与旧契约对齐)
 * - **默认**:返回该键集的全部烘焙读法(通常 1~4 条;完全命中与合法省略/变换并列)
 * - **isStrict: true**:只返回完全匹配(isExact:cost=0 且无变换;set 条目天然完全命中)
 * - **rootNoteLocation**:按根音 pianoKeyId 过滤读法(区分等和弦 C6 vs Am7)
 *
 * ### 关于根音(rootNoteLocation)
 * pianoKeyId 是音高类(0-11),输入顺序不代表"哪个音最低/是根音"。
 * 不传时 isRootPosition 恒为 false(信息不足,不猜测转位);传时过滤后恒为 true。
 *
 * @param midiPitchList - MIDI 音符值列表,如 [60, 64, 67] 表示 C-E-G(至少 3 个独立音)
 * @param config.isStrict - true=只返回完全匹配(isExact);默认 false
 * @param config.rootNoteLocation - 可选:指定根音 pianoKeyId(0-11),过滤读法并确定原位
 * @param config.fallback - 可选:"pcset" 时无匹配降级返回音集的集合论身份(prime form+命名+最近和弦)
 * @returns 匹配读法列表(每条带 chordName/isExact/transform/cost/tier 与惰性 chord/setEntity 实例)
 *
 * @example
 * findChord([60, 64, 67])                       // C 大三(isExact)
 * findChord([60, 64, 67, 69])                   // C6 与 Am7 双读法并列
 * findChord([60, 64, 67, 69], { rootNoteLocation: 0 })  // 只留 C6
 * findChord([60, 64, 71])                       // Cmaj7(omit5)——省五度的合法读法
 * findChord([60, 63, 64])                       // 分叉三和弦(set 条目,♭3·♮3 并存)
 */
export const findChord = (
  midiPitchList: number[],
  config?: {
    /** true=只返回完全匹配(isExact);false=返回全部烘焙读法(默认 false) */
    isStrict?: boolean
    /** 可选:指定根音(0-11),过滤读法并确定原位 */
    rootNoteLocation?: number
    /**
     * 降级兜底:无匹配时返回音集的集合论身份(prime form + 命名 + 最近和弦)。
     * 默认不开启(返回空数组,与历史行为一致)。仅音数 <3(抛错)或 >7(烘焙表域外)时可能触发。
     */
    fallback?: "pcset"
  }
): I_FindResult[] => {
  // ===== 步骤 1:MIDI → pianoKeyId 去重排序(<3 独立音抛错,契约保留) =====
  const { sortedPianoKeyIdList } = midiListToPianoKeys(midiPitchList)

  // ===== 步骤 2:哈希直查(3~7 音五张表按音数路由) =====
  const entries = findByHash(sortedPianoKeyIdList)

  // ===== 步骤 3:选项过滤 + 语义化映射 =====
  const hasRoot = isNotNil(config?.rootNoteLocation)
  const results: I_ChordFindResult[] = entries
    .filter(e => !hasRoot || e.pianoKeyIdRoot === config!.rootNoteLocation)
    .filter(e => config?.isStrict !== true || e.isExact)
    .map(e => ({ type: "chord" as const, ...e, isRootPosition: hasRoot }))

  // ===== 步骤 4:降级兜底(可选;烘焙表 3~7 音全域覆盖,仅 >7 音可触发空) =====
  if (results.length === 0 && config?.fallback === "pcset" && config?.isStrict !== true) {
    return [findPcset(sortedPianoKeyIdList)]
  }

  return results
}

export { findByHash } from "./methods/findByHash"
export { restoreChord } from "./methods/restoreChord"
export { restoreSet, type I_SetEntity } from "./methods/restoreSet"
