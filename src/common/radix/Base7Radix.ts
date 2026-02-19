import {isNumber} from "lodash";
import {Radix} from "./Radix.ts";
import {RadixError} from "../processError/errorTypes.ts";


export class Base7Radix extends Radix {
	constructor(num: number) {
		super(num, 7);
	}

	// 同样是构造函数
	static fromArray(array: any[]): Base7Radix {
		if (array.length !== 2) {
			throw new Error("The Array length must be 2.");
		}
		if (!isNumber(array[0])) throw new RadixError("The first digit of the array must be a number.");
		return new Base7Radix(array[0] * 7 + array[1])
	}


	public get firstDigit(): number {
		return this.twoDigitArray[0]
	}

	public get lastDigit(): number {
		return this.twoDigitArray[1]
	}

	public add(num: number): Base7Radix {
		return new Base7Radix(this.base10 + num);
	}


	public getGap(otherRadix: Radix): number {
		return otherRadix.base10 - this.base10
	}

}


export default {
	Base7Radix
}
