// noinspection ES6PreferShortImport

import {Base12Radix} from "../../common/radix";

export const getUpwardLocationGap = (baseLocation: number, targetLocation: number) => {
	const numberGapWithRoot = Base12Radix.fromArray([1, baseLocation]).getGap(Base12Radix.fromArray([1, targetLocation]))
	if (numberGapWithRoot < 0) {
		return Base12Radix.fromArray([1, baseLocation]).getGap(Base12Radix.fromArray([2, targetLocation]))
	}
	return numberGapWithRoot
}

export default getUpwardLocationGap
