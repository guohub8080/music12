import { Chord } from "@chord"
import { isNil } from "es-toolkit/predicate"

/**
 * 变换分组对象(哈希 JSON 的原子化形态,用户 schema)
 *
 * 键 = 操作类型,值 = 度数(int 或 int[]);只写有操作的键,完全命中为 {}。
 *   omit   省略度数                → setOmit(N)
 *   sharp  升半音(alter♯ 或 add♯)  → set("#N")
 *   flat   降半音(alter♭ 或 add♭)  → set("bN")
 *   add    新增自然度数             → set(N)
 * sharp/flat 不区分 alter/add 来源——两者在 Chord 应用层等价(set 度数面板)。
 */
export type I_HashTransform = Partial<Record<"add" | "omit" | "sharp" | "flat", number | number[]>>

/** 哈希条目的 structural 形状(与 findByHash.I_HashEntry 字段兼容,避免循环依赖) */
interface I_HashEntryShape {
  pianoKeyIdRoot: number
  formulaId: string
  transform: I_HashTransform
  isChordFormula?: boolean
}

/** 度数值归一为数组(int | int[] → int[]) */
const degreesOf = (value: number | number[] | undefined): number[] => {
  if (isNil(value)) return []
  return Array.isArray(value) ? value : [value]
}

/** transform 应用到 Chord 实例(♯/♭ 统一转 ASCII,set 支持 [#b] 前缀) */
const applyTransform = (chord: Chord, transform: I_HashTransform): void => {
  for (const degree of degreesOf(transform.omit)) chord.setOmit(degree as never)
  for (const degree of degreesOf(transform.sharp)) chord.set(`#${degree}` as never)
  for (const degree of degreesOf(transform.flat)) chord.set(`b${degree}` as never)
  for (const degree of degreesOf(transform.add)) chord.set(degree as never)
}

/**
 * transform → 变换记号字符串(显示方向,如报告/UI)
 *
 * 与烘焙侧 engine.ts 的产生式一致:omit5 / ♭2 / ♯7 / add2,空格连接;
 * 括号是显示层的分组选择,由调用方自行添加(数据层不带)。
 */
export const renderTransform = (transform: I_HashTransform): string => {
  const parts: string[] = []
  for (const degree of degreesOf(transform.omit)) parts.push(`omit${degree}`)
  for (const degree of degreesOf(transform.flat)) parts.push(`♭${degree}`)
  for (const degree of degreesOf(transform.sharp)) parts.push(`♯${degree}`)
  for (const degree of degreesOf(transform.add)) parts.push(`add${degree}`)
  return parts.join(" ")
}

/**
 * 哈希条目 → Chord 实例(反推重建)
 *
 * 哈希条目存 transform 分组对象(原子化),本函数构造 + 应用变换,
 * 实例与烘焙时引擎的分解方案完全等价(pianoKeyIds 可 round-trip 验证)。
 *
 * @param entry 哈希条目(findByHash 返回值,I_HashEntry)——本函数按 structural 形状接收
 * @returns Chord 实例;set 条目(isChordFormula:false)无 Chord 身份,返回 null
 *
 * @example
 * const [setEntry, chordEntry] = findByHash([2, 11, 0])
 * restoreChord(chordEntry)  // → new Chord(0, "maj7sus2").setOmit(5)
 * restoreChord(setEntry)    // → null(set 体系,无 Chord 实例)
 */
export const restoreChord = (entry: I_HashEntryShape): Chord | null => {
  // set 条目是 special-sets 体系(音集身份),不存在对应 Chord 实例
  if (entry.isChordFormula === false) return null

  const chord = new Chord(entry.pianoKeyIdRoot, entry.formulaId)
  applyTransform(chord, entry.transform)
  return chord
}

export default restoreChord
