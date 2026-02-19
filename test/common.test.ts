// noinspection ES6PreferShortImport
import {Radix} from "../src/common/radix/Radix.ts"
import {expect, test} from "vitest";

test("Test PowerRadix", () => {
	const p = new Radix(1, 7)
	expect(p.twoDigitArray).toStrictEqual([0, 1])
})
