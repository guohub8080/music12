// @ts-nocheck
// 对照测试:同一批「无匹配」输入,mtkit(v1 引擎) vs music12 v4 各返回什么
import * as mtkit from "/Users/guo/WebstormProjects/mtkit/src/music12/index.js"
import { findChord as findV4 } from "../../src/Find"

const cases: Array<[string, number[]]> = [
  ["D-E-F-F♯   (v4 无匹配案例1)", [2, 4, 5, 6]],
  ["E♭-E-F-A   (v4 无匹配案例2)", [3, 4, 5, 9]],
  ["C-E-G      (正常大三)", [0, 4, 7]],
  ["C-E-G-B    (maj7)", [0, 4, 7, 11]],
]

for (const [label, ids] of cases) {
  console.log(label)
  // mtkit: findChord(locationList, isStrictlyMatch=false 模糊, rootNoteLocation=undefined)
  let mtkResult: any[] = []
  try {
    mtkResult = (mtkit as any).chord?.findChord?.(ids, false) ?? []
  } catch (e) {
    console.log(`   mtkit 调用异常: ${(e as Error).message}`)
  }
  const v4 = findV4(ids.map(x => x + 60))
  console.log(`   mtkit 模糊层 → ${mtkit.length} 个: ${mtkit.slice(0, 4).map((x: any) => `${x.chordKey}@${x.rootNoteLocation}`).join(", ") || "(空)"}`)
  console.log(`   v4   两层   → ${v4.length} 个: ${v4.slice(0, 4).map(x => `${x.chordFormulaId}@${x.pianoKeyIdRoot}`).join(", ") || "(空)"}`)
  console.log()
}
