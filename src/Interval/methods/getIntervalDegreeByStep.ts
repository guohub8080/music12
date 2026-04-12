import { defaultTo } from "lodash"
import { StepRadix } from "../../common/radix/music/StepRadix.ts"
import { T_NoteStep } from "../../common/static/NOTE_TYPES.ts"

/**
 * 根据两个音名计算度数
 *
 * 仅根据音名（C-B）计算度数，不考虑升降号和八度。
 * 这是一个"粗糙"的度数计算，不包含音程前缀（大/小/纯/增/减）。
 *
 * @param fromStep 起始音名
 * @param toStep 目标音名
 * @param options 配置选项
 * @param options.isAscending 是否向上计算，默认 true（向上）
 * @returns 度数（1-7）
 *
 * @example
 * getIntervalDegreeByStep('C', 'A')                         // 6（C向上到A是六度）
 * getIntervalDegreeByStep('C', 'A', { isAscending: false }) // 3（C向下到A是三度）
 * getIntervalDegreeByStep('C', 'C')                         // 1（同音是一度）
 * getIntervalDegreeByStep('C', 'D')                         // 2
 * getIntervalDegreeByStep('C', 'B')                         // 7
 */
export default (
  fromStep: T_NoteStep,
  toStep: T_NoteStep,
  options?: { isAscending?: boolean }
): number => {
  const isAscending = defaultTo(options?.isAscending, true)
  const from = new StepRadix(fromStep)
  const to = new StepRadix(toStep)

  // 向上时 to - from，向下时 from - to
  // (diff + 7) % 7 把负数转成正数（0-6范围），+1 是因为音程从1开始计数（不是从0）
  const diff = isAscending ? to.stepId - from.stepId : from.stepId - to.stepId
  return (diff + 7) % 7 + 1
}
