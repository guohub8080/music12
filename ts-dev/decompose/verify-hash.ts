// @ts-nocheck
/**
 * 哈希表 restore 安全校验(后置独立脚本)
 *
 * 从 bake.ts 拆出:bake 本体不能依赖 src——src 的 @chord 出口链静态
 * import 哈希产物(chord-hash-*.json),产物缺失时 bake 将无法启动
 * (fresh clone 鸡生蛋死锁)。本校验在产物生成之后运行,做真实 round-trip:
 *
 *   chord 条目:restoreChord(构造+transform 应用)反推音集比对哈希键——
 *     同度双音(♭3·♮3,Chord 度数面板单态静默覆盖)等不可达条目在此炸出
 *   set 条目:restoreSet(根音+offsets)重算音集比对键——special-sets
 *     定义表数据错误的防线
 *
 * 「主表零冲突」从数据巧合升级为构建保证——自验最终 JSON 本身,
 * 不依赖上游任何过滤层的正确性。
 *
 * 运行: npx tsx ts-dev/decompose/verify-hash.ts [K ...](默认 3..7;
 *   pretest/prebuild 在 gen+bake 之后调用)
 */
import { readFileSync } from "fs"
import { resolve, dirname } from "path"
import { fileURLToPath } from "url"
import { isNil } from "es-toolkit/predicate"
import { restoreChord } from "../../src/Find/findChord/methods/restoreChord"
import { restoreSet } from "../../src/Find/findChord/methods/restoreSet"

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, "../..")
const SYMBOLS = ["C","P","D","Q","E","F","X","G","Y","A","Z","B"]

/** 度数原子的自然半音基数(2度=2半音…7度=11半音;9/11/13 为翻八度) */
const DEG_SEMI: Record<number, number> = { 2: 2, 3: 4, 4: 5, 5: 7, 6: 9, 7: 11, 9: 14, 11: 17, 13: 21 }

/**
 * special-sets 语义防线:scoreDisplay 度数原子换算半音后与 offsets 多重集相等。
 *
 * 历史病灶(2026-09-11 用户发现「♯2 与 ♭3 同键却并列」揪出,共 16 处):
 *   幽灵原子(♯2+♭3 双计同一琴键)、错位拼写(8半音记成 6 度=9半音)、
 *   计数对但拼写错(♭7 写成 7)——atom 计数校验抓不到,必须换算半音比对。
 */
const verifySetSemantics = (): number => {
  const defs: Record<string, any> = JSON.parse(
    readFileSync(resolve(ROOT, "static-data", "special-sets.json"), "utf-8"),
  )
  for (const [setId, def] of Object.entries(defs)) {
    const want = [...def.offsets as number[]].sort((a, b) => a - b).join(",")
    const got = Object.entries(def.scoreDisplay as Record<string, number | number[]>)
      .flatMap(([deg, alt]) => (Array.isArray(alt) ? alt : [alt]).map(a => (DEG_SEMI[Number(deg)] + a) % 12))
      .sort((a, b) => a - b).join(",")
    if (got !== want) {
      throw new Error(`special-sets 语义防线:${setId} scoreDisplay 原子半音(${got})≠offsets(${want})`)
    }
  }
  console.log(`special-sets 语义防线:${Object.keys(defs).length} 个 set 度数原子↔offsets 全部一致`)
  return Object.keys(defs).length
}

/** 校验主流程(供 build-all 函数式调用;process.exit 改异常抛出) */
export const runVerify = (ksParam: number[] = [3, 4, 5, 6, 7]): void => {
  verifySetSemantics()
  let total = { chord: 0, set: 0 }

  for (const K of ksParam) {
    const tablePath = resolve(ROOT, "static-data", `chord-hash-${K}.json`)
    let table: Record<string, any[]>
    try {
      table = JSON.parse(readFileSync(tablePath, "utf-8"))
    } catch {
      throw new Error(`[K=${K}] 缺少 ${tablePath}(先跑 bake ${K})`)
    }

    for (const [key, entries] of Object.entries(table)) {
      const ids = key.split("").map(ch => SYMBOLS.indexOf(ch)).sort((a, b) => a - b).join(",")
      for (const e of entries) {
        if (e.isChordFormula === false) {
          const setEntity = restoreSet(e)
          total.set++
          const rebuilt = setEntity?.pianoKeyIds.join(",")
          if (isNil(setEntity) || rebuilt !== ids) {
            throw new Error(`[K=${K}] set restore 不一致 [${key}] ${e.pianoKeySymbolRoot}·${e.cnName}`)
          }
          continue
        }
        const chord = restoreChord(e)
        total.chord++
        const rebuilt = [...(chord?.pianoKeyIds ?? [])].sort((a, b) => a - b).join(",")
        if (isNil(chord) || rebuilt !== ids) {
          throw new Error(`[K=${K}] chord restore 不一致 [${key}] ${e.pianoKeySymbolRoot}${e.formulaId} ${JSON.stringify(e.transform)} → ${rebuilt}(同度双音不可达?)`)
        }
      }
    }
    console.log(`[K=${K}] 校验通过:${Object.keys(table).length} 键集`)
  }

  console.log(`restore 安全校验(全部):${total.chord} chord + ${total.set} set 全部 round-trip 可达`)
}

// 直接执行(非被 import):K 列表取命令行参数(容错回退 3..7)
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2).map(Number).filter(n => Number.isFinite(n) && n >= 2)
  runVerify(args.length > 0 ? args : [3, 4, 5, 6, 7])
}
