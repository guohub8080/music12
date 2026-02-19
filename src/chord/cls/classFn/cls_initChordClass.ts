// noinspection ES6PreferShortImport

import chordMeta from "../../static/chordMeta";
import {ChordError} from "../../../common/processError/errorTypes";
import {t_intervalList} from "../../../interval/static/types";
import {t_intervalPanel, t_inputTransformPanel} from "../../static/types.ts";
import collect from "collect.js";

const cls_initChordClass = (chordKey: string): {
  baseIntervalList: [t_intervalList, number][],
  baseIntervalPanel: t_intervalPanel,
  scoreSymbol: string,
  chordKey: string
  cnName: string
  type:string
} => {
  const findChordObj = collect(chordMeta).where("chordKey", chordKey).first()
  if (!findChordObj) throw new ChordError(`No such chord term like ${chordKey}.`)
  const targetBaseIntervalPanel: t_intervalPanel = {
    2: void 0, 3: void 0, 4: void 0, 5: void 0, 6: void 0,
    7: void 0, 9: void 0, 11: void 0, 13: void 0,
  }
  findChordObj.intervalList.forEach((x) => {
    targetBaseIntervalPanel[x[1]] = x[0]
  })
  return {
    baseIntervalList: findChordObj.intervalList as [t_intervalList, number][],
    baseIntervalPanel: targetBaseIntervalPanel,
    scoreSymbol: findChordObj.scoreDisplay as string,
    chordKey: findChordObj.chordKey,
    cnName: findChordObj.cnName,
    type: findChordObj.type
  }
}

export default cls_initChordClass