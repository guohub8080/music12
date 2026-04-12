import {Base7Radix} from "../base/Base7Radix.ts";
import {RadixError} from "../../processError/errorTypes.ts";

/**
 * 音程进制类
 * 音程数从 1 开始（如一度、二度...）
 * 内部存储时减 1 转换为从 0 开始
 */
export class IntervalRadix {
  readonly #base10: number;
  readonly #radix: Base7Radix;

  constructor(intervalNum: number) {
    if (intervalNum < 1) throw new RadixError("Interval number must be greater than or equal to 1.")
    this.#base10 = intervalNum - 1;
    this.#radix = new Base7Radix(intervalNum - 1);
  }

  /** 音程数（从 1 开始） */
  public get base10(): number {
    return this.#base10 + 1;
  }

  /** 数位对 [八度数, 音程数] */
  public get digitPair(): number[] {
    return [this.#radix.digitPair[0], this.#radix.digitPair[1] + 1];
  }

  /** 八度数 */
  public get octave(): number {
    return this.digitPair[0]
  }

  /** 音程数 */
  public get intervalNum(): number {
    return this.base10;
  }

  /** 八度内的音程数（1-7） */
  public get intervalNumWithinOctave(): number {
    return this.digitPair[1]
  }
}
