import {RadixError} from "../../processError/errorTypes.ts";

/**
 * 进制基类
 * 用于表示任意进制数值，支持转换为数位对形式
 */
export class Radix {
  public readonly radixBase: number;
  readonly #base10: number;

  public get base10(): number {
    return this.#base10;
  }

  constructor(base10: number, radixBase: number) {
    this.radixBase = radixBase;
    this.#base10 = base10;
  }

  /**
   * 从数位对创建 Radix 实例
   * @param array [高位, 低位]
   * @param radixBase 进制基数
   */
  static fromArray(array: number[], radixBase: number): Radix {
    if (array.length !== 2) {
      throw new RadixError("Array length must be 2.")
    }
    const base10Value = array[0] * radixBase + array[1];
    return new Radix(base10Value, radixBase);
  }

  /**
   * 转换为数位对
   * @returns [圈数, 位置] 其中位置永远为正数
   * @example
   * new Radix(13, 12).digitPair // [1, 1]
   * new Radix(13, 7).digitPair  // [1, 6]
   * new Radix(-13, 7).digitPair // [-2, 1]
   */
  public get digitPair(): number[] {
    const circle = Math.floor(this.base10 / this.radixBase);
    const position = ((this.base10 % this.radixBase) + this.radixBase) % this.radixBase;
    return [circle, position];
  }

  /**
   * 计算与另一个 Radix 的差值
   */
  public getGap(otherRadix: Radix): number {
    return otherRadix.base10 - this.base10
  }

  /**
   * 加法运算，返回新的 Radix 实例
   */
  public add(num: number): Radix {
    return new Radix(this.base10 + num, this.radixBase)
  }
}
