import {isEmpty, isUndefined, keys} from "lodash";

const cls_isTransformEmpty = (obj: object) => {
  let result = true
  for (let k of keys(obj)) {
    if (!isUndefined(obj[k])) {
      result = false;
      break;
    }
  }
  return result
}
export default cls_isTransformEmpty