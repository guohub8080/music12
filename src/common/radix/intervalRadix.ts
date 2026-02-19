import {Base7Radix} from "./Base7Radix.ts";


export class IntervalRadix {
	readonly #base10: number;
	readonly #radix: Base7Radix;

	constructor(intervalNum: number) {
		if (intervalNum < 1) throw new Error("Interval number must be greater than 1.")
		this.#base10 = intervalNum - 1;
		this.#radix = new Base7Radix(intervalNum - 1);
	}

	public get base10(): number {
		return this.#base10 + 1;
	}

	public get twoDigitArray(): number[] {
		return [this.#radix.twoDigitArray[0], this.#radix.twoDigitArray[1] + 1];
	}

	public get octave(): number {
		return this.twoDigitArray[0]
	}

	public get intervalNum(): number {
		return this.base10;
	}

	public get intervalNumWithinOctave(): number {
		return this.twoDigitArray[1]
	}

}

export default {
	IntervalRadix
}
