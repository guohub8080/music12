import {t_transformPanel, t_transformString} from "../../static/types.ts";
import {ChordError} from "../../../common/processError/errorTypes.ts";

const cls_dealTransformString = (originTransformPanel: t_transformPanel,
                                 transformString: t_transformString): t_transformPanel => {
  const targetTransformPanel = {...originTransformPanel}
  if (["4", "5", "11"].includes(transformString)) {
    targetTransformPanel[transformString] = "p"
    return targetTransformPanel
  }
  if (["2", "3", "6", "7", "9", "13"].includes(transformString)) {
    // const targetTransformPanel = originTransformPanel
    targetTransformPanel[transformString] = "maj"
    return targetTransformPanel
  }
  if (["#4", "#5", "#11", "#2", "#3", "#6", "#7", "#9", "#13"].includes(transformString)) {
    // const targetTransformPanel = originTransformPanel
    targetTransformPanel[transformString.slice(1)] = "aug"
    return targetTransformPanel
  }
  if (["b2", "b3", "b6", "b7", "b9", "b13"].includes(transformString)) {
    // const targetTransformPanel = originTransformPanel
    targetTransformPanel[transformString.slice(1)] = "min"
    return targetTransformPanel
  }
  if (["b4", "b5", "b11"].includes(transformString)) {
    // const targetTransformPanel = originTransformPanel
    targetTransformPanel[transformString.slice(1)] = "dim"
    return targetTransformPanel
  }
  throw new ChordError("Please check the chord transform string.")
}

export default cls_dealTransformString