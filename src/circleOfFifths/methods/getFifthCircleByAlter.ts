import fifthMeta from "../static/fifthMeta.ts";
import {CircleOfFifthsError} from "../../common/processError/errorTypes.ts";
import {CircleOfFifths} from "../index";

export const getFifthCircleByAlter = (alter: number) => {
  const obj = fifthMeta.where("staveAlters", alter).first();
  if (obj) return new CircleOfFifths(obj.circleID)
  throw new CircleOfFifthsError(`Cannot find the alter value of ${alter}.`);
}

export default getFifthCircleByAlter;