import {t_scaleIntervalPanel} from "../../static/types.ts";
import {keys} from "lodash";

const cls_getIntervalList = (intervalPanel: t_scaleIntervalPanel) => {
  const result = []
  for (const i of keys(intervalPanel)) {
    result.push([intervalPanel[i], Number(i)])
  }
  return result
}

export default cls_getIntervalList