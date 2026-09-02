import { T_IntervalType } from "@common/static/INTERVAL_TYPES"

/**
 * 调式元数据类型定义（支持五声调式的 null 值）
 *
 * 源:ts-dev/raw-static/scale-modes.json5(极简源,只写 type/name/intervalList),
 * 其余字段由 compileStaticData 编译回填。已删化石:family(分段在源注释)/description(源注释承载)。
 */
export type I_ScaleModeMeta = {
  scaleModeId: string
  /** 调式主和弦性质(Locrian 系一级七和弦即半减七,燕乐角调式同) */
  type: "major" | "minor" | "halfdim7"
  intervalList: ([T_IntervalType, number] | null)[]
  intervalMap: { [key: number]: T_IntervalType | null }
  semitonesList: (number | null)[]
  semitonesMap: { [key: number]: number | null }
  degreeAlterationsList: (number | null)[]
  degreeAlterationsMap: { [key: number]: number | null }
  name: string
}
