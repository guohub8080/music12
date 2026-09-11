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

/** 原子拼写对 → pianoKeyId(校验用:[step, alter] → 键;字母/变音超界返回 null) */
const spelledPairToKeyId = (pair: [string, number]): number | null => {
  const base: Record<string, number> = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 }
  if (isNil(base[pair[0]]) || Math.abs(pair[1]) > 2) return null
  return (base[pair[0]] + pair[1] + 12) % 12
}

/**
 * scale-hash 校验:round-trip + 拼写语义防线 + 别名一致 + 覆盖完整。
 *
 * 拼写语义防线是 scoreDisplay 语义防线的同款思路——拼写的音名换算回
 * pianoKeyIds 必须与键集多重集相等,防「拼写出琴键不在键集里的音」
 * 或「等音双计」(♯2 与 ♭3 同键并列那类病)。
 */
const verifyScaleHash = (): void => {
  const table: Record<string, any[]> = JSON.parse(
    readFileSync(resolve(ROOT, "static-data", "scale-hash.json"), "utf-8"),
  )
  const modes: Record<string, any> = JSON.parse(
    readFileSync(resolve(ROOT, "static-data", "scale-modes.json"), "utf-8"),
  )
  let readings = 0
  let covered = 0

  for (const [key, entries] of Object.entries(table)) {
    const ids = key.split("").map(ch => SYMBOLS.indexOf(ch)).sort((a, b) => a - b).join(",")
    readings += entries.length

    for (const e of entries) {
      covered += 1 + e.aliasModeIds.length

      // 1) round-trip:读法音集(排序)必须等于键集
      if ([...e.pianoKeyIds].sort((a, b) => a - b).join(",") !== ids) {
        throw new Error(`scale-hash round-trip 不一致 [${key}] ${e.rootPianoKeySymbol}·${e.scaleModeId}`)
      }
      // 2) 拼写语义防线:每个变体的原子对换算半音多重集 = 键集;根音对 = 根音键
      for (const s of e.spellings) {
        const got = s.notes.map(spelledPairToKeyId).sort((a, b) => a - b).join(",")
        if (s.notes.some(n => spelledPairToKeyId(n) === null) || got !== ids) {
          throw new Error(`scale-hash 拼写语义防线 [${key}] ${s.rootStep}${s.rootAlter}·${e.scaleModeId} notes=${JSON.stringify(s.notes)}`)
        }
        if (spelledPairToKeyId([s.rootStep, s.rootAlter]) !== e.rootPianoKeyId) {
          throw new Error(`scale-hash 根音拼写不符 [${key}] ${s.rootStep}${s.rootAlter} vs id=${e.rootPianoKeyId}`)
        }
        // 偏离音也必须能换算回键集内的键
        for (const acc of s.accidentals) {
          if (!ids.split(",").includes(String(spelledPairToKeyId(acc)))) {
            throw new Error(`scale-hash 偏离音不在键集 [${key}] ${JSON.stringify(acc)}`)
          }
        }
      }
      // 3) 别名一致:aliasModeIds 的 intervalList 必须与 canonical 完全同形
      for (const a of e.aliasModeIds) {
        if (JSON.stringify(modes[a].intervalList) !== JSON.stringify(modes[e.scaleModeId].intervalList)) {
          throw new Error(`scale-hash 别名不同形 [${key}] ${a} ≢ ${e.scaleModeId}`)
        }
      }
      // 4) 度数语义:pianoKeyIdToDegree 的值域必须在键集内且根音为 1 度
      if (e.pianoKeyIdToDegree[String(e.rootPianoKeyId)] !== 1) {
        throw new Error(`scale-hash 根音非 1 度 [${key}] ${e.scaleModeId}`)
      }
    }
  }

  // 5) 覆盖完整:canonical + 别名 = 调式数 × 12(keep-all-unmatched 的 scale 版)
  const expected = Object.keys(modes).length * 12
  if (covered !== expected) {
    throw new Error(`scale-hash 覆盖不完整:${covered}/${expected}`)
  }
  console.log(`scale-hash 校验通过:${Object.keys(table).length} 键集 ${readings} 读法,拼写语义/别名/覆盖全一致`)
}

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
  verifyScaleHash()
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
