import { T_IntervalType } from "@common/static/INTERVAL_TYPES"
import CHORD_FORMULA_ID from "./CHORD_FORMULA_ID"
import type { ChordTag } from "./deriveTags"

// 重新导出和弦公式 ID 类型
export type T_ChordFormulaID = keyof typeof CHORD_FORMULA_ID

export interface I_ChordFormulaMeta {
  chordFormulaId: string
  family: string
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

// ========== 和弦族类型定义 ==========

// 基础和弦族
export type I_Chord3Family = "chord3"
export type I_Chord3ExFamily = "chord3_ex"
export type I_Chord7Family = "chord7"
export type I_Chord7AddFamily = "chord7Add"
export type I_Chord9Family = "chord9"
export type I_Chord11Family = "chord11"
export type I_Chord13Family = "chord13"
export type I_ChordSusFamily = "chordSus"

// 变音和弦族
export type I_Dom7AlterFamily = "dom7alter"
export type I_Maj7AlterFamily = "maj7alter"
export type I_Min7AlterFamily = "min7alter"
export type I_Dom9AlterFamily = "dom9alter"
export type I_Maj9AlterFamily = "maj9alter"
export type I_Min9AlterFamily = "min9alter"
export type I_Dom11AlterFamily = "dom11alter"
export type I_Min11AlterFamily = "min11alter"
export type I_Dom13AlterFamily = "dom13alter"
export type I_Maj13AlterFamily = "maj13alter"

// 所有和弦族联合类型
export type I_ChordFamily =
  | I_Chord3Family
  | I_Chord3ExFamily
  | I_Chord7Family
  | I_Chord7AddFamily
  | I_Chord9Family
  | I_Chord11Family
  | I_Chord13Family
  | I_ChordSusFamily
  | I_Dom7AlterFamily
  | I_Maj7AlterFamily
  | I_Min7AlterFamily
  | I_Dom9AlterFamily
  | I_Maj9AlterFamily
  | I_Min9AlterFamily
  | I_Dom11AlterFamily
  | I_Min11AlterFamily
  | I_Dom13AlterFamily
  | I_Maj13AlterFamily
