import FIFTH_META from "../static/FIFTH_META";
import {CircleOfFifthsError} from "@common/processError/errorTypes";
import {CircleOfFifths} from "../cls/CircleClass";

export const getFifthCircleByAlter = (alter: number) => {
  const obj = FIFTH_META.where("rawStaveAlters", alter).first();
  if (obj) return new CircleOfFifths(obj.circleID)
  throw new CircleOfFifthsError(`No circle found for alter value ${alter}.`);
}

export default getFifthCircleByAlter;