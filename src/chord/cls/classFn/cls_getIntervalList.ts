import {t_intervalPanel} from "../../static/types.ts";
import {keys} from "lodash";
import {t_intervalType} from "../../../interval/static/types.ts";
import {ChordError} from "../../../common/processError/errorTypes.ts";


const cls_getIntervalList = (intervalPanel: t_intervalPanel): [t_intervalType, number][] => {
  const resultList = []
  for (const i of keys(intervalPanel)) {
    if (!intervalPanel[i]) continue
    switch (i as string) {
      case "2":
        resultList.push([intervalPanel[i], 2])
        continue
      case "3":
        resultList.push([intervalPanel[i], 3])
        continue
      case "4":
        resultList.push([intervalPanel[i], 4])
        continue
      case "5":
        resultList.push([intervalPanel[i], 5])
        continue
      case "6":
        resultList.push([intervalPanel[i], 6])
        continue
      case "7":
        resultList.push([intervalPanel[i], 7])
        continue
      case "9":
        resultList.push([intervalPanel[i], 9])
        continue
      case "11":
        resultList.push([intervalPanel[i], 11])
        continue
      case "13":
        resultList.push([intervalPanel[i], 13])
        continue
      default :
        throw new ChordError("Please check chord intervals.")
    }
  }
  return resultList as [t_intervalType, number][]
}


export default cls_getIntervalList