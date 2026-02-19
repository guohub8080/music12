import collect from "collect.js";
import modeMeta from "../static/modeMeta.ts";
import {isEmpty} from "lodash";

const getIntervalListByModeKey = (modeKey: string) => {
  const findResult = collect(modeMeta).where("uid", modeKey).first();
  if (isEmpty(findResult)) throw new Error(`Error Mode of ${modeKey}.`);
  return findResult.intervalList
}
export default getIntervalListByModeKey