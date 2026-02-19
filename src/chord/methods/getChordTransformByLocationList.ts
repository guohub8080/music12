// noinspection ES6PreferShortImport

import {getUpwardLocationGap} from "../../note";
import {intersection, isNumber, keys} from "lodash";

type chordObj = {
	rootNoteLocation: number;
	n3L: number;
	n5L: number;
	n7L: number;
	n9L: number;
	n11L: number;
	n13L: number;
}
const getChordTransformByLocationList = (originChordInfo: chordObj, chordNotesLocationList: number[]) => {
	const adjustObj = {
		omit: [],
		min: [],
		maj: [],
		p: [],
		dim: [],
		aug: [],
	}


	const standardChordNotesLocationList = keys(originChordInfo).map(x => originChordInfo[x]).filter(x => x !== -1)
	// console.log("standard:", standardChordNotesLocationList)

	const intersectionList = intersection(standardChordNotesLocationList, chordNotesLocationList)
	// console.log("intersectionList:", intersectionList)

	const standardAfterSubtract = standardChordNotesLocationList.filter(item => !intersectionList.includes(item))
	// console.log("standardAfterSubtract:", standardAfterSubtract)

	const givenLocationAfterSubtract = chordNotesLocationList.filter(item => !intersectionList.includes(item))
	// console.log("givenLocataionAfterSubtract:", givenLocationAfterSubtract)


	// for example:
	// find List: [a,b,c,d,e]
	// standard List: [a,b,d,f]
	// intersectionList: [a,b,d]
	// givenLocationAfterSubtract: [c,e]
	// standardAfterSubtract: [f]
	// if givenLocationAfterSubtract.length>0, it means add or shift.
	// if standardAfterSubtract.length>0, it means omit.

	if (isNumber(originChordInfo.n3L) && originChordInfo.n3L >= 0) {
		if (standardAfterSubtract.includes(originChordInfo.n3L)) {
			adjustObj.omit.push(3)
		}
	}
	if (isNumber(originChordInfo.n5L) && originChordInfo.n5L >= 0) {
		if (standardAfterSubtract.includes(originChordInfo.n5L)) {
			adjustObj.omit.push(5)
		}
	}
	if (isNumber(originChordInfo.n7L) && originChordInfo.n7L >= 0) {
		if (standardAfterSubtract.includes(originChordInfo.n7L)) {
			adjustObj.omit.push(7)
		}
	}
	if (isNumber(originChordInfo.n9L) && originChordInfo.n9L >= 0) {
		if (standardAfterSubtract.includes(originChordInfo.n9L)) {
			adjustObj.omit.push(9)
		}
	}
	if (isNumber(originChordInfo.n11L) && originChordInfo.n11L >= 0) {
		if (standardAfterSubtract.includes(originChordInfo.n11L)) {
			adjustObj.omit.push(11)
		}
	}
	if (isNumber(originChordInfo.n13L) && originChordInfo.n13L >= 0) {
		if (standardAfterSubtract.includes(originChordInfo.n13L)) {
			adjustObj.omit.push(13)
		}
	}

	if (givenLocationAfterSubtract.length === 0) return adjustObj
	for (let i of givenLocationAfterSubtract) {
		const numberGapWithRoot = getUpwardLocationGap(originChordInfo.rootNoteLocation, i)
		if (numberGapWithRoot === 1) {
			adjustObj.min.push(2)
		} else if (numberGapWithRoot === 2) {
			adjustObj.maj.push(2)
		} else if (numberGapWithRoot === 3) {
			adjustObj.min.push(3)
		} else if (numberGapWithRoot === 4) {
			adjustObj.maj.push(3)
		} else if (numberGapWithRoot === 5) {
			adjustObj.p.push(4)
		} else if (numberGapWithRoot === 6) {
			adjustObj.aug.push(4)
		} else if (numberGapWithRoot === 7) {
			adjustObj.p.push(5)
		} else if (numberGapWithRoot === 8) {
			adjustObj.min.push(6)
		} else if (numberGapWithRoot === 9) {
			adjustObj.maj.push(6)
		} else if (numberGapWithRoot === 10) {
			adjustObj.min.push(7)
		} else if (numberGapWithRoot === 11) {
			adjustObj.maj.push(7)
		}
	}
	return adjustObj
}

// const isNeighbor = (a: number, b: number) => {
// 	const diff = Math.abs(a - b);
// 	return diff === 1 || diff === 11;
// }
//
// const getNeighboringNotes = (location: number, isUpper: boolean) => {
// 	const baseLocation = new Base12Radix(location)
// 	if (isUpper) {
// 		return baseLocation.add(1).lastDigit
// 	}
// 	return baseLocation.add(-1).lastDigit
// }

export default getChordTransformByLocationList
