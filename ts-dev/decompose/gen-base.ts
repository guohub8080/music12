// @ts-nocheck
/**
 * 基座数据生成器 —— 烘焙管线的第 3 步(本地版)
 *
 * 从 static-data/chord-formulas.json 出发,展开为 88 公式 × 12 根 = 1056 个实例,
 * **包含 pianoKeyIds 等全部音集字段**(与 static-data/chord-instances.json 不同——
 * 那份只存记谱层,音集由 src 加载器 enrich)。
 *
 * 这份是烘焙管线自己拥有的基座:倒推引擎直接读它,不依赖 src 模块。
 *
 * 产出: ts-dev/decompose/base-instances.json
 * 运行: npx tsx ts-dev/decompose/gen-base.ts
 */
import { readFileSync, writeFileSync } from "fs"
import { resolve, dirname } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, "../..")

// 读编译产物(不读 src,自给自足)
const formulas = JSON.parse(readFileSync(resolve(ROOT, "static-data/chord-formulas.json"), "utf-8"))
const intervals = JSON.parse(readFileSync(resolve(ROOT, "static-data/intervals.json"), "utf-8"))
const GAP = {}
for (const i of intervals) GAP[`${i.type}/${i.num}`] = i.semitoneGap

const SYMBOLS = ["C","P","D","Q","E","F","X","G","Y","A","Z","B"]

// ===== 展开:88 公式 × 12 根 = 1056 实例(含音集字段) =====

const instances = []
for (const [formulaId, formula] of Object.entries(formulas)) {
  const { intervalList, semitonesList } = formula

  for (let root = 0; root < 12; root++) {
    const pianoKeyIds = [root]
    const pianoKeyIdToInterval = { [root]: { intervalType: "p", intervalNum: 1 } }
    const intervalToPianoKeyId = { 1: { intervalType: "p", pianoKeyId: root } }

    for (let i = 0; i < intervalList.length; i++) {
      const [intervalType, intervalNum] = intervalList[i]
      const semitone = semitonesList[i]
      const keyId = (root + semitone) % 12
      pianoKeyIds.push(keyId)
      pianoKeyIdToInterval[keyId] = { intervalType, intervalNum }
      intervalToPianoKeyId[intervalNum] = { intervalType, pianoKeyId: keyId }
    }

    instances.push({
      pianoKeyIdRoot: root,
      rootSymbol: SYMBOLS[root],
      chordFormulaId: formulaId,
      pianoKeyIds,
      pianoKeyIdsSorted: [...pianoKeyIds].sort((a, b) => a - b),
      notesNum: intervalList.length + 1,
      pianoKeyIdToInterval,
      intervalToPianoKeyId,
    })
  }
}

const outPath = resolve(__dirname, "base-instances.json")
writeFileSync(outPath, JSON.stringify(instances, null, 2) + "\n", "utf-8")

console.log(`基座数据生成完成:${instances.length} 个实例(88 × 12)`)
console.log(`输出:${outPath}`)
console.log(`文件大小:${(JSON.stringify(instances).length / 1024).toFixed(1)}KB`)
console.log(`字段:pianoKeyIdRoot/rootSymbol/chordFormulaId/pianoKeyIds/pianoKeyIdsSorted/notesNum/pianoKeyIdToInterval/intervalToPianoKeyId`)
