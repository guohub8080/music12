import {Base12Radix} from "../../common/radix";
import fifthMeta from "../static/fifthMeta";
import {isInteger} from "lodash";
import {CircleOfFifthsError} from "../../common/processError/errorTypes.ts";

export class CircleOfFifths extends Base12Radix {

  constructor(i: number = 0) {
    if (!isInteger(i)) throw new CircleOfFifthsError("given number must be integer")
    super(i);
  }

  public get majCircle() {
    return fifthMeta.where("circleID", ">=", 0).where("circleID", "<=", 12)
      .where("mode", "major").where("circleID", this.location).all()
  }

  public get minCircle() {
    return fifthMeta.where("circleID", ">=", 0).where("circleID", "<=", 12)
      .where("mode", "minor").where("circleID", this.location).all()
  }

  public get location(): number {
    return this.twoDigitArray[1]
  }

  public get circleNumber(): number {
    return this.twoDigitArray[0]
  }

  public move(num: number): CircleOfFifths {
    if (!isInteger(num)) throw new CircleOfFifthsError("num must be integer")
    if (num === 0) return this
    return new CircleOfFifths(this.base10 + num)
  }

  public get current() {
    return fifthMeta.where("circleID", ">=", 0).where("circleID", "<=", 12)
      .where("circleID", this.location).all()
  }
}
