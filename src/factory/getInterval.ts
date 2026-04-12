import {FactoryError} from "../common/processError/errorTypes.ts";
import {Interval} from "../Interval";
import {T_IntervalType} from "../common/static/INTERVAL_TYPES.ts";

export const getInterval = (type: string, num: number) => {
  try {
    return new Interval(type.trim() as T_IntervalType, num)
  } catch (e) {
    throw new FactoryError(e.message)
  }
}
