import { isNumber } from 'es-toolkit'
import {Radix} from "./Radix";
import {RadixError} from "../../processError/errorTypes";

/**
 * 七进制数类
 * 用于音阶级数计算（7 个自然音级）
 */
export class Base7Radix extends Radix {
  constructor(num: number) {
    super(num, 7);
  }

  /**
   * 从数位对创建实例
   * @param array [八度数, 音级索引]
   */
  static fromArray(array: any[]): Base7Radix {
    if (array.length !== 2) {
      throw new RadixError("Array length must be 2.")
    }
    if (!isNumber(array[0])) throw new RadixError("First element must be a number.")
    return new Base7Radix(array[0] * 7 + array[1])
  }

  /** 高位（八度数） */
  public get firstDigit(): number {
    return this.digitPair[0]
  }

  /** 低位（音级索引） */
  public get lastDigit(): number {
    return this.digitPair[1]
  }

  public add(num: number): Base7Radix {
    return new Base7Radix(this.base10 + num);
  }

  public getGap(otherRadix: Radix): number {
    return otherRadix.base10 - this.base10
  }
}
