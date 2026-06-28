import {Base7Radix} from "../base/Base7Radix";
import {RadixError} from "../../processError/errorTypes";

/**
 * 音阶进制类
 * 音阶级数从 1 开始（如 I 级、II 级...）
 * 内部存储时减 1 转换为从 0 开始
 */
export class ScaleRadix {
  readonly #scaleDegreeNum: number;
  readonly #radix: Base7Radix;

  constructor(scaleDegreeNum: number) {
    if (scaleDegreeNum < 1) throw new RadixError("Scale degree number must be greater than or equal to 1.")
    this.#scaleDegreeNum = scaleDegreeNum - 1;
    this.#radix = new Base7Radix(scaleDegreeNum - 1);
  }

  /** 音阶级数（从 1 开始） */
  public get base10(): number {
    return this.#scaleDegreeNum + 1;
  }

  /** 数位对 [八度数, 音阶级数] */
  public get digitPair(): number[] {
    return [this.#radix.digitPair[0], this.#radix.digitPair[1] + 1];
  }

  /** 八度数 */
  public get octave(): number {
    return this.digitPair[0]
  }

  /** 总音阶级数 */
  public get totalScaleDegrees(): number {
    return this.base10;
  }

  /** 八度内的音阶级数（1-7） */
  public get scaleDegree(): number {
    return this.digitPair[1]
  }

  public add(num: number): ScaleRadix {
    return new ScaleRadix(this.totalScaleDegrees + num)
  }
}
