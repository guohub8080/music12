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
      pianoKeySymbols: pianoKeyIds.map(k => SYMBOLS[k]),
      pianoKeyIdsSorted: [...pianoKeyIds].sort((a, b) => a - b),
      notesNum: intervalList.length + 1,
      pianoKeyIdToInterval,
      intervalToPianoKeyId,
    })
  }
}

// 自定义序列化:数组单行(≤80字符内),对象多行缩进
function pretty(value, indent = 0) {
  const pad = " ".repeat(indent)
  if (Array.isArray(value)) {
    const items = value.map(v => pretty(v, indent + 2))
    const oneLine = `[${value.map(v => JSON.stringify(v)).join(", ")}]`
    if (oneLine.length <= 80) return oneLine
    return `[\n${pad}  ${items.join(`,\n${pad}  `)}\n${pad}]`
  }
  if (typeof value === "object" && value !== null) {
    const entries = Object.entries(value)
      .map(([k, v]) => `${pad}  ${JSON.stringify(k)}: ${pretty(v, indent + 2)}`)
    return `{\n${entries.join(",\n")}\n${pad}}`
  }
  return JSON.stringify(value)
}

const outPath = resolve(__dirname, "base-instances.json")
writeFileSync(outPath, pretty(instances) + "\n", "utf-8")

console.log(`基座数据生成完成:${instances.length} 个实例(88 × 12)`)
console.log(`输出:${outPath}`)
console.log(`文件大小:${(require("fs").statSync(outPath).size / 1024).toFixed(1)}KB`)
console.log(`字段:pianoKeyIdRoot/rootSymbol/chordFormulaId/pianoKeyIds/pianoKeySymbols/pianoKeyIdsSorted/notesNum/pianoKeyIdToInterval/intervalToPianoKeyId`)
