import FIFTH_META from "../static/FIFTH_META";
import {CircleOfFifthsError} from "@common/processError/errorTypes";
import {CircleOfFifths} from "../cls/CircleClass";

/**
 * 根据调号数获取五度圈位置
 *
 * 调号数 = 升号数(正) / 降号数(负)。0 = C 大调/a 小调。
 *
 * ### 理论调(theoretical key)的处理
 *
 * |alter| ≥ 8 的调号(如 D♯大调 9♯、C♭小调 −10♭)属理论调:
 * 调号中必现重升/重降,没有独立的五度圈位置(表中 circleID = -1)。
 * 此类输入**明确抛错**,错误信息附等音实用调号,由调用方决定是否改用:
 *
 * @example
 * getFifthCircleByAlter(-3)  // E♭大调,CircleOfFifths(9)
 * getFifthCircleByAlter(9)   // 抛错:「Use the enharmonic practical signature -3 instead」
 *
 * @param alter 调号数(-7 ~ +7 之内均有圈位;±7 为 C♯/C♭ 等与等音伙伴共享的边界位)
 * @returns 对应的五度圈位置对象
 * @throws CircleOfFifthsError 当调号对应理论调(|alter| ≥ 8)或调号不存在时抛出
 */
export const getFifthCircleByAlter = (alter: number) => {
  const obj = FIFTH_META.find(x => x.rawStaveAlters === alter);
  if (obj) {
    // 理论调:circleID=-1 是「无座位」哨兵值,不是合法圈位,直接喂给
    // CircleOfFifths 会被 Base12Radix 取模成 11(F 位),静默返回错误数据。
    if (obj.circleID === -1) {
      const enharmonic = alter - 12 * Math.sign(alter);
      throw new CircleOfFifthsError(
        `Alter ${alter} is a theoretical key (double sharps/flats in its signature) and has no circle-of-fifths position. Use the enharmonic practical signature ${enharmonic} instead.`
      );
    }
    return new CircleOfFifths(obj.circleID)
  }
  throw new CircleOfFifthsError(`No circle found for alter value ${alter}.`);
}

export default getFifthCircleByAlter;
