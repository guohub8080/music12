import { isNil } from "es-toolkit/predicate"
import { Chord } from "@chord"
import type { I_HashEntry } from "./findByHash"

/**
 * 哈希条目 → Chord 实例(反推重建)
 *
 * 哈希表条目只存紧凑数据(pianoKeyIdRoot + formulaId + notation),
 * 本函数把它还原为库的 Chord 实例——构造 + 按变换记号逐一应用变换,
 * 得到的实例与烘焙时引擎的分解方案完全等价(pianoKeyIds 可 round-trip 验证)。
 *
 * notation 记号 ↔ 实例方法映射(ts-dev/decompose/engine.ts 的 ops 序列化):
 *   omitN      → setOmit(N)
 *   ♯N / ♭N    → set("♯N") / set("♭N")  (alter:已有度数升/降半音)
 *   addN       → set(N)                  (add:新度数按默认类型加入)
 *   add♯N/add♭N → set("♯N") / set("♭N")
 * (♯/♭ 统一转 ASCII #/b,set 支持 [#b] 前缀)
 *
 * @param entry 哈希条目(findByHash 返回值)
 * @returns Chord 实例;set 条目(isChordFormula:false)无 Chord 身份,返回 null
 *
 * @example
 * const [setEntry, chordEntry] = findByHash([2, 11, 0])
 * restoreChord(chordEntry)  // → Chord 实例:new Chord(0, "maj7sus2").setOmit(5)
 * restoreChord(setEntry)    // → null(set 体系,无 Chord 实例)
 */
export const restoreChord = (entry: I_HashEntry): Chord | null => {
  // set 条目是 special-sets 体系(音集身份),不存在对应 Chord 实例
  if (entry.isChordFormula === false) return null

  const chord = new Chord(entry.pianoKeyIdRoot, entry.formulaId)

  // notation 形如 "(♭2 omit5)",空串 = 完全命中(零变换)
  const inner = entry.notation.replace(/[()]/g, "")
  if (inner === "") return chord

  for (const op of inner.split(" ")) {
    // omitN → setOmit(N)
    if (op.startsWith("omit")) {
      chord.setOmit(Number(op.slice(4)) as never)
      continue
    }
    // addN / add♯N / add♭N → set(N) / set("♯N") / set("♭N")——
    // set 的度数面板语义对 add 同样成立:该度数按给定(或默认)性质加入
    const body = op.startsWith("add") ? op.slice(3) : op
    if (body === "") continue
    chord.set(body.replace("♯", "#").replace("♭", "b") as never)
  }
  return chord
}

export default restoreChord
