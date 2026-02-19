import {isNumber} from "lodash";
import {Radix} from "./Radix.ts";
import {RadixError} from "../processError/errorTypes.ts";


export class Base12Radix extends Radix {
	constructor(num: number) {
		super(num, 12);
	}


	// 同样是构造函数
	static fromArray(array: any[]): Base12Radix {
		if (array.length !== 2) {
			throw new Error("The Array length must be 2.");
		}
		if (!isNumber(array[0])) throw new RadixError("The first digit of the array must be a number.");
		return new Base12Radix(array[0] * 12 + array[1])
	}


	public get firstDigit(): number {
		return this.twoDigitArray[0]
	}

	public get lastDigit(): number {
		return this.twoDigitArray[1]
	}

	public add(num: number): Base12Radix {
		return new Base12Radix(this.base10 + num);
	}


	public getGap(otherRadix: Radix): number {
		return otherRadix.base10 - this.base10
	}

}


export default {
	Base12Radix
}
