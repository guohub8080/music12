/* eslint-disable no-mixed-spaces-and-tabs */
import {ScaleError} from "../../../common/processError/errorTypes.ts";


const cls_getAlterList = (itvList: [string, number][]) => {
  if (itvList.length !== 6) throw new ScaleError("Interval List must be the length of 6.")
  const result = Array.from({length: 7}, () => 0)
  itvList.map((x, y) => {
    if ([4, 5].includes(x[1])) {
      if (x[0] === "p") return
      else if (x[0] === "dim") result[y+1] = -1
      else if (x[0] === "dim-") result[y+1] = -2
      else if (x[0] === "aug") result[y+1] = 1
      else if (x[0] === "aug+") result[y+1] = 2
      else throw new ScaleError("Unknown value type")
      return;
    }
    if (x[0] === "maj") return;
    else if (x[0] === "min") result[y+1] = -1
    else if (x[0] === "dim") result[y+1] = -2
    else if (x[0] === "aug") result[y+1] = 1
    else if (x[0] === "aug+") result[y+1] = 2
    else throw new ScaleError("Unknown value type")
  })
  return result
}
export default cls_getAlterList;