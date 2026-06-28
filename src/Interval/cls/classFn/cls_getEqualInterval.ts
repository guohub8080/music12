import isNil from "lodash/isNil"
import type {I_IntervalObj, I_GetEqualIntervalOptions} from "../IntervalClass"
import {IntervalError} from "@common/processError/errorTypes";
import INTERVAL_META from "../../static/INTERVAL_META";
import {Interval} from "../IntervalClass";
import defaultTo from "lodash/defaultTo"
/**
 * 获取等音程
 *
 * 查找所有与当前音程半音数相同的其他音程（等音程）。
 * 例如：增四度和减五度都是 6 个半音，它们互为等音程。
 *
 * ### 等音程对照表
 *
 * | 半音数 | 可能的等音程 |
 * |--------|--------------|
 * | 0 | 纯一度、减二度 |
 * | 1 | 小二度、增一度 |
 * | 6 | 增四度、减五度、倍增三度、倍减六度 |
 * | 12 | 纯八度、减九度、增七度 |
 *
 * ### 配置选项说明
 *
 * - `isSelfTypeExcluded`: 排除与自身类型相同的音程
 * - `isAugDimExcluded`: 排除增音程和减音程
 * - `isDoubleAugDimExcluded`: 排除倍增和倍减音程
 *
 * @param intervalInstance 音程实例
 * @param options 过滤选项
 * @returns 符合条件的等音程数组
 * @throws {IntervalError} 当音程度数为零或负数时抛出
 * @throws {IntervalError} 当音程为极特殊情况（如减一度）时抛出
 *
 * @example
 * // 获取增四度的所有等音程
 * const aug4 = new Interval('aug', 4)
 * aug4.getEqualInterval()
 * // [Interval(aug,4), Interval(dim,5), Interval(aug+,3), Interval(dim-,6)]
 *
 * @example
 * // 排除自身类型
 * aug4.getEqualInterval({ isSelfTypeExcluded: true })
 * // [Interval(dim,5), Interval(aug+,3), Interval(dim-,6)]
 *
 * @example
 * // 只保留自然音程（排除增/减/倍增/倍减）
 * aug4.getEqualInterval({ isAugDimExcluded: true, isDoubleAugDimExcluded: true })
 * // []（增四度本身不是自然音程，排除后无结果）
 */
export default (intervalInstance: InstanceType<typeof Interval>,
                options: I_GetEqualIntervalOptions = {}) => {
  const isSelfTypeExcluded = defaultTo(options?.isSelfTypeExcluded, false)
  const isAugDimExcluded = defaultTo(options?.isAugDimExcluded, false)
  const isDoubleAugDimExcluded = defaultTo(options?.isDoubleAugDimExcluded, false)

  // 基本参数校验：度数必须大于 0
  if (intervalInstance.num < 1) throw new IntervalError("Interval number cannot be zero or negative.")

  // 排除极特殊音程：减一度 / 倍减一度 / 倍减二度
  // 这些音程在理论上存在但实际无意义（如减一度需要音高向下但音级向上）
  if (intervalInstance.num === 1 && [10, 11].includes(intervalInstance.semitoneClockPosition)) {
    throw new IntervalError("Cannot calculate diminished 1st or double diminished 1st.")
  }
  if (intervalInstance.num === 2 && intervalInstance.semitoneClockPosition === 11) {
    throw new IntervalError("Cannot calculate double diminished 2nd.")
  }

  // 纯一度的特殊处理：它是最基础的音程，等音程只有减二度
  if (intervalInstance.num === 1 && intervalInstance.semitoneClockPosition === 0) {
    const result: Interval[] = []
    if (!isSelfTypeExcluded) result.push(new Interval("p", 1))
    if (!isAugDimExcluded) result.push(new Interval("dim", 2))
    return result
  }

  // 从元数据中查找相同半音位置的所有音程
  const findIntervalOnSameLocation = INTERVAL_META.where("semitoneClockPosition",
    intervalInstance.semitoneClockPosition).all()
  if (isNil(findIntervalOnSameLocation)) throw new IntervalError("Internal error: no intervals found at this location.")

  // 过滤 → 计算实际度数 → 排除无效度数 → 构造 Interval
  return findIntervalOnSameLocation
    .filter((x: I_IntervalObj) => {
      if (isSelfTypeExcluded && x.type === intervalInstance.type) return false
      if (isAugDimExcluded && ["aug", "dim"].includes(x.type)) return false
      if (isDoubleAugDimExcluded && ["aug+", "dim-"].includes(x.type)) return false
      return true
    })
    .map((item: I_IntervalObj) => ({
      type: item.type,
      // 实际度数 = 元数据度数 + 7 × (当前音程的实际八度跨度 - 元数据的八度跨度)
      num: item.num + 7 * (intervalInstance.factOctaveGap - item.octaveGap)
    }))
    .filter(x => x.num > 0)
    .map(x => new Interval(x.type, x.num))
}
