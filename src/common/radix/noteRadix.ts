import {isNull, isNumber, isString, isUndefined} from "lodash";
import {IntervalRadix} from "./intervalRadix.ts";
import stepList from "../../note/static/stepList.ts";
import {t_noteStep} from "../../note/static/types.ts";
import {RadixError} from "../processError/errorTypes.ts";
import {Base12Radix} from "./Base12Radix.ts";
import {Base7Radix} from "./Base7Radix.ts";
import noteMeta from "../../note/static/noteMeta.ts";

const getStepByIndex = (index: number) => {
  return stepList[index]
}

const getIndexByStep = (step: string) => {
  const index = stepList.indexOf(step);
  if (index === -1) {
    throw new Error(`Invalid step ${step}`);
  }
  return index;
}

export class StepRadix extends Base7Radix {
  constructor(step: number | string) {
    if (isNumber(step))
      super(step);
    else
      super(getIndexByStep(step));
  }

  // 同样是构造函数
  static fromArray(array: any[]): StepRadix {
    if (array.length !== 2) {
      throw new Error("The Array length must be 2.");
    }
    if (!isNumber(array[0])) throw new RadixError("The first digit of the array must be a number.");
    if (isString(array[1])) {
      try {
        const stepIndex = getIndexByStep(array[1])
        return new StepRadix(array[0] * 7 + stepIndex);
      } catch (e) {
        throw new RadixError("Error step.");
      }
    }
    if (isNumber(array[1])) {
      return new StepRadix(array[0] * 7 + array[1])
    }
    throw new RadixError("Error array type.");
  }

  public get step(): t_noteStep {
    return getStepByIndex(this.twoDigitArray[1]) as t_noteStep;
  }

  public get octave(): number {
    return this.twoDigitArray[0]
  }

  public add(num: number): StepRadix {
    return new StepRadix(this.base10 + num);
  }

  public get stepIndex(): number {
    return this.twoDigitArray[1]
  }

  public getGap(otherRadix: StepRadix): number {
    return otherRadix.base10 - this.base10
  }

  public getIntervalGap(otherRadix: StepRadix): IntervalRadix {
    return new IntervalRadix(1 + otherRadix.base10 - this.base10)
  }
}


export class SemitoneRadix extends Base12Radix {
  constructor(semitone: number) {
    super(semitone)
  }

  static fromArray(array: number[]): SemitoneRadix {
    if (array.length !== 2) throw new RadixError("The length must be 2.");
    return new SemitoneRadix(array[0] * 12 + array[1])
  }

  public getGap(otherRadix: SemitoneRadix): number {
    return otherRadix.base10 - this.base10
  }

  public add(num: number): SemitoneRadix {
    return new SemitoneRadix(this.base10 + num)
  }

  public get location(): number {
    return this.twoDigitArray[1]
  }

  public get octave(): number {
    return this.twoDigitArray[0]
  }

  public getKeyboardNotes(isAlterAbsLessThan?: number): any[] {
    if (isUndefined(isAlterAbsLessThan) || isNull(isAlterAbsLessThan)) return noteMeta.where("locationId", this.location).all()
    return noteMeta.where("locationId", this.location).filter(item => {
      return Math.abs(item.alter) <= isAlterAbsLessThan
    }).all()
  }
}


export default {
  getStepByIndex, getIndexByStep, StepRadix, SemitoneRadix
}
