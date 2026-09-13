import { T_IntervalType } from "@common/static/INTERVAL_TYPES"
import CHORD_FORMULA_ID from "./CHORD_FORMULA_ID"
import type { ChordTag } from "./deriveTags"

// 重新导出和弦公式 ID 类型
export type T_ChordFormulaID = keyof typeof CHORD_FORMULA_ID

export interface I_ChordFormulaMeta {
  chordFormulaId: string
  cnName: string
  scoreDisplay: string  // 乐谱上的显示，大三和弦是空的，小三是"m"，半减七和弦是"ø"等等
  intervalList: [T_IntervalType, number][]  // 音程列表,如 [["maj", 3], ["p", 5]]
  degreeToIntervalMap: { [degree: number]: T_IntervalType }  // 度数到音程类型的映射,如 {3: "maj", 5: "p"}
  notesNum: number  // 音数（包括根音）
  semitonesList: number[]  // 半音列表
  name: string  // 名称
  description: string  // 描述
  /**
   * 和弦标签（自动从 intervalList 推导，由生成器注入）
   *
   * 多维度标签：家族(chordN/sus) / 性质(maj/min/dom/...) / 变音(altered/sharp5/...) / 结构(add/add6)
   * 用于灵活的多维查询，替代旧的单一 family 字段。
   */
  tags: ChordTag[]
}
