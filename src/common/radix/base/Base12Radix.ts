import {isNumber} from "lodash";
import {Radix} from "./Radix.ts";
import {RadixError} from "../../processError/errorTypes.ts";

/**
 * 十二进制数类
 * 用于半音位置计算（12 个半音）
 */
export class Base12Radix extends Radix {
  constructor(num: number) {
    super(num, 12);
  }

  /**
   * 从数位对创建实例
   * @param array [八度数, 半音位置]
   */
  static fromArray(array: any[]): Base12Radix {
    if (array.length !== 2) {
      throw new RadixError("Array length must be 2.")
    }
    if (!isNumber(array[0])) throw new RadixError("First element must be a number.")
    return new Base12Radix(array[0] * 12 + array[1])
  }

  /** 高位（八度数） */
  public get firstDigit(): number {
    return this.digitPair[0]
  }

  /** 低位（半音位置） */
  public get lastDigit(): number {
    return this.digitPair[1]
  }

  public add(num: number): Base12Radix {
    return new Base12Radix(this.base10 + num);
  }

  public getGap(otherRadix: Radix): number {
    return otherRadix.base10 - this.base10
  }
}
