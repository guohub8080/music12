import { T_IntervalType } from "@common/static/INTERVAL_TYPES"

// 调式元数据类型定义（支持五声调式的 null 值）
export type I_ScaleModeMeta = {
  scaleModeId: string
  intervalList: ([T_IntervalType, number] | null)[]
  intervalMap: { [key: number]: T_IntervalType | null }
  semitonesList: (number | null)[]
  semitonesMap: { [key: number]: number | null }
  degreeAlterationsList: (number | null)[]
  degreeAlterationsMap: { [key: number]: number | null }
  name: string
  type: "major" | "minor" | "halfdim7"
  family: string
  description: string
}
