import {FactoryError} from "../../common/processError/errorTypes.ts";
import {Interval} from "../../interval";

export const getInterval = (type: string, num: number) => {
  try {
    return new Interval(type.trim() as any, num)
  } catch (e) {
    throw new FactoryError(e.message)
  }
}