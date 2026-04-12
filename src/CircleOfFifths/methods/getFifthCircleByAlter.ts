import FIFTH_META from "../static/FIFTH_META.ts";
import {CircleOfFifthsError} from "../../common/processError/errorTypes.ts";
import {CircleOfFifths} from "../cls/CircleClass.ts";

export const getFifthCircleByAlter = (alter: number) => {
  const obj = FIFTH_META.where("staveAlters", alter).first();
  if (obj) return new CircleOfFifths(obj.circleID)
  throw new CircleOfFifthsError(`No circle found for alter value ${alter}.`);
}

export default getFifthCircleByAlter;