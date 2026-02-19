import {Base7Radix} from "./Base7Radix.ts";


export class ScaleRadix {
	readonly #scaleDegreeNum: number;
	readonly #radix: Base7Radix;

	constructor(scaleDegreeNum: number) {
		if (scaleDegreeNum < 1) throw new Error("Interval number must be greater than 1.")
		this.#scaleDegreeNum = scaleDegreeNum - 1;
		this.#radix = new Base7Radix(scaleDegreeNum - 1);
	}

	public get base10(): number {
		return this.#scaleDegreeNum + 1;
	}

	public get twoDigitArray(): number[] {
		return [this.#radix.twoDigitArray[0], this.#radix.twoDigitArray[1] + 1];
	}

	public get octave(): number {
		return this.twoDigitArray[0]
	}

	public get totalScaleDegrees(): number {
		return this.base10;
	}

	public get scaleDegree(): number {
		return this.twoDigitArray[1]
	}


	public add(num: number): ScaleRadix {
		return new ScaleRadix(this.totalScaleDegrees + num)
	}
}

export default {
	ScaleRadix
}
