import isNumber from "lodash/isNumber"
import isString from "lodash/isString"
import {IntervalRadix} from "./IntervalRadix";
import {getIndexByStep, getStepByIndex, T_NoteStep} from "../../static/NOTE_TYPES";
import {RadixError} from "../../processError/errorTypes";
import {Base7Radix} from "../base/Base7Radix";

/**
 * 音级进制类
 * 用于表示音符的音级位置（基于七进制）
 */
export class StepRadix extends Base7Radix {
  constructor(step: number | string) {
    if (isNumber(step))
      super(step);
    else
      super(getIndexByStep(step));
  }

  /**
   * 从数位对创建实例
   * @param array [八度数, 音名或音级索引]
   */
  static fromArray(array: [number, T_NoteStep | number]): StepRadix {
    if (array.length !== 2) {
      throw new RadixError("Array length must be 2.")
    }
    if (!isNumber(array[0])) throw new RadixError("First element must be a number.")
    if (isString(array[1])) {
      try {
        const stepId = getIndexByStep(array[1])
        return new StepRadix(array[0] * 7 + stepId);
      } catch (e) {
        throw new RadixError("Invalid step name.")
      }
    }
    if (isNumber(array[1])) {
      return new StepRadix(array[0] * 7 + array[1])
    }
    throw new RadixError("Second element must be a number or string.")
  }

  /** 音名（C, D, E...） */
  public get step(): T_NoteStep {
    return getStepByIndex(this.digitPair[1]);
  }

  /** 八度数 */
  public get octave(): number {
    return this.digitPair[0]
  }

  public add(num: number): StepRadix {
    return new StepRadix(this.base10 + num);
  }

  /** 音级索引（0-6） */
  public get stepId(): number {
    return this.digitPair[1]
  }

  public getGap(otherRadix: StepRadix): number {
    return otherRadix.base10 - this.base10
  }

  /** 计算到另一个音级的音程 */
  public getIntervalGap(otherRadix: StepRadix): IntervalRadix {
    return new IntervalRadix(1 + otherRadix.base10 - this.base10)
  }
}
