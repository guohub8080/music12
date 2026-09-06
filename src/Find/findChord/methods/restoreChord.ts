import { Chord } from "@chord"

/** 哈希条目的 structural 形状(与 findByHash.I_HashEntry 字段兼容,避免循环依赖) */
interface I_HashEntryShape {
  pianoKeyIdRoot: number
  formulaId: string
  ops: I_HashOp[]
  isChordFormula?: boolean
}

/**
 * 结构化变换操作(哈希 JSON 的原子化形态,字段对齐 engine.ts 烘焙侧的 ops)
 * - kind:"omit"  省略度数          → setOmit(degree)
 * - kind:"alter" 已有度数升/降半音  → set(offset>0 ? "#degree" : "bdegree")
 * - kind:"add"   新增度数(可带升降) → set(...) 同 alter 的拼法
 */
export type I_HashOp =
  | { kind: "omit"; degree: number }
  | { kind: "alter"; degree: number; offset: 1 | -1 }
  | { kind: "add"; degree: number; offset: 0 | 1 | -1 }

/** 单个 op 应用到 Chord 实例(♯/♭ 统一转 ASCII,set 支持 [#b] 前缀) */
const applyOp = (chord: Chord, op: I_HashOp): void => {
  if (op.kind === "omit") {
    chord.setOmit(op.degree as never)
    return
  }
  // alter/add 共用 set 的度数面板:该度数按给定(或默认)性质设置
  const acci = op.offset === 1 ? "#" : op.offset === -1 ? "b" : ""
  chord.set(`${acci}${op.degree}` as never)
}

/**
 * ops → 变换记号字符串(显示方向,如报告/UI)
 *
 * 与烘焙侧 engine.ts 的产生式一致:omit5 / ♭2 / add♯1,空格连接;
 * 括号是显示层的分组选择,由调用方自行添加(数据层不带)。
 */
export const renderOps = (ops: I_HashOp[]): string => {
  if (ops.length === 0) return ""
  return ops
    .map(op =>
      op.kind === "omit"
        ? `omit${op.degree}`
        : `${op.kind === "add" ? "add" : ""}${op.offset === 1 ? "♯" : op.offset === -1 ? "♭" : ""}${op.degree}`,
    )
    .join(" ")
}

/**
 * 哈希条目 → Chord 实例(反推重建)
 *
 * 哈希条目存结构化 ops(原子化),本函数构造 + 逐一应用,
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
  for (const op of entry.ops) applyOp(chord, op)
  return chord
}

export default restoreChord
