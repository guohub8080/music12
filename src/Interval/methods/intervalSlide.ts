import {INTERVAL_TYPE_LIST_145, INTERVAL_TYPE_LIST_2367, T_IntervalType145, T_IntervalType2367} from "@common/static/INTERVAL_TYPES";
import {IntervalError} from "@common/processError/errorTypes";

/**
 * 1/4/5 度音程类型滑动
 *
 * @param currentInterval 当前音程类型
 * @param move 滑动步数（正数向增，负数向减）
 * @returns 滑动后的音程类型
 */
export const intervalSlide_145 = (currentInterval: T_IntervalType145 = "p", move: number = 0) => {
    const currentIndex = INTERVAL_TYPE_LIST_145.indexOf(currentInterval)
    const newIndex = currentIndex + move
    if (INTERVAL_TYPE_LIST_145[newIndex]) return INTERVAL_TYPE_LIST_145[newIndex]
    throw new IntervalError("Interval beyond limit (min: dim-, max: aug+).")
}

/**
 * 2/3/6/7 度音程类型滑动
 *
 * @param currentInterval 当前音程类型
 * @param move 滑动步数（正数向增，负数向减）
 * @returns 滑动后的音程类型
 */
export const intervalSlide_2367 = (currentInterval: T_IntervalType2367 = "maj", move: number = 0) => {
    const currentIndex = INTERVAL_TYPE_LIST_2367.indexOf(currentInterval)
    const newIndex = currentIndex + move
    if (INTERVAL_TYPE_LIST_2367[newIndex]) return INTERVAL_TYPE_LIST_2367[newIndex]
    throw new IntervalError("Interval beyond limit (min: dim-, max: aug+).")
}
