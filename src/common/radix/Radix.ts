export class Radix {
	public readonly radixBase: number;
	readonly #base10: number;

	public get base10(): number {
		return this.#base10;
	}

	// 构造函数
	constructor(base10: number, radixBase: number) {
		this.radixBase = radixBase;
		this.#base10 = base10;
	}

	// 同样是构造函数
	static fromArray(array: number[], radixBase: number): Radix {
		if (array.length !== 2) {
			throw new Error("The length must be 2.");
		}

		const base10Value = array[0] * radixBase + array[1];
		return new Radix(base10Value, radixBase);
	}


	// 转换为数组
	// input: a number and a radix symbol.
	// output: a length-2-array where every digit is base10 number. Besides, array[1] forever be positive.
	// e.g. input: 13   (base12 symbol), output: [1, 1]
	// e.g. input: 13   (base7 symbol),  output: [1, 6]
	// e.g. input: 130  (base7 symbol),  output: [18, 4]
	// e.g. input: -13  (base7 symbol),  output: [-2, 1]
	// e.g. input: -1   (base7 symbol),  output: [-1, 6]
	public get twoDigitArray(): number[] {
		if (this.base10 === 0) return [0, 0];
		let circle = 0;
		let position = this.base10;
		while (position >= this.radixBase) {
			position -= this.radixBase;
			circle++;
		}
		while (position < 0) {
			position = this.radixBase + position;
			circle--;
		}
		return [circle, position];
	}

	public getGap(otherRadix: Radix): number {
		return otherRadix.base10 - this.base10
	}

	// input: a length-2-number-array, a number(positive: add and negative: subtract), a radixSymbol.
	// Each digit of the input length-2-number-array should be base10 number.
	// output: a new length-2-number-array where every digit is base10 number.
	// e.g. input: [0,5]   +8   (base7 symbol)     output:[1,6]
	// e.g. input: [0,5]   +8   (base12 symbol)    output:[1,1]
	public add(num: number): Radix {
		return new Radix(this.base10 + num, this.radixBase)
	}
}

export default {
	Radix
}
