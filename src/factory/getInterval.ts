import {FactoryError} from "@common/processError/errorTypes";
import {Interval} from "@interval";
import {T_IntervalType} from "@common/static/INTERVAL_TYPES";

export const getInterval = (type: string, num: number) => {
  try {
    return new Interval(type.trim() as T_IntervalType, num)
  } catch (e) {
    throw new FactoryError(e.message)
  }
}
