import {t_intervalType_145, t_intervalType_2367} from "../static/types";
import {intervalTypeList_145, intervalTypeList_2367} from "../static/interavalTypeList";
import {IntervalError} from "../../common/processError/errorTypes";

export const intervalSlide_145 = (currentInterval: t_intervalType_145 = "p", move: number = 0) => {
    const currentIndex = intervalTypeList_145.indexOf(currentInterval)
    const newIndex = currentIndex + move
    if (intervalTypeList_145[newIndex]) return intervalTypeList_145[newIndex]
    throw new IntervalError("Interval beyond limit. (min:dim- max:aug+)")
}

export const intervalSlide_2367 = (currentInterval: t_intervalType_2367 = "maj", move: number = 0) => {
    const currentIndex = intervalTypeList_2367.indexOf(currentInterval)
    const newIndex = currentIndex + move
    if (intervalTypeList_2367[newIndex]) return intervalTypeList_2367[newIndex]
    throw new IntervalError("Interval beyond limit. (min:dim- max:aug+)")
}