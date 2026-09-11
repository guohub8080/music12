import { T_IntervalType } from "@common/static/INTERVAL_TYPES"

/**
 * 调式元数据类型定义（支持五声调式的 null 值）
 *
 * 源:ts-dev/raw-static/scale-modes.json5(极简源,只写 type/name/intervalList),
 * 其余字段由 compileStaticData 编译回填。已删化石:family(分段在源注释)/description(源注释承载)。
 */
export type I_ScaleModeMeta = {
  scaleModeId: string
  /** 调式主和弦性质(Locrian 系一级七和弦即半减七,燕乐角调式同;♭♭7 系一级为减七) */
  type: "major" | "minor" | "halfdim7" | "dim7"
  intervalList: ([T_IntervalType, number] | null)[]
  intervalMap: { [key: number]: T_IntervalType | null }
  semitonesList: (number | null)[]
  semitonesMap: { [key: number]: number | null }
  degreeAlterationsList: (number | null)[]
  degreeAlterationsMap: { [key: number]: number | null }
  name: string
  /** 检索标签:源手写家族/用途 + 编译派生变音(b2/#4/…)、缺度(no4)、音数(heptatonic) */
  tags: string[]
  /** Forte 音级集合编号(Wikipedia Rahn 素数形约定;2026-09-11 全 60 形查证) */
  forte: string
  /** 同 intervalList 形状组内的首个调式 ID(源顺序);独形/自身为 null。IONIAN→NATURAL_MAJOR 等 */
  sameShapeAs: string | null
}
