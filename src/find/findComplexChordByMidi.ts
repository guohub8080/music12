// noinspection ES6PreferShortImport

import {intersection, isArray, isNull, isUndefined, orderBy, sortBy, uniq} from "lodash";
import {Base12Radix} from "../common/radix";
import collect from "collect.js";
import findChordMeta from "../chord/static/findChordMeta.ts";

const findComplexChordByMidi = (midiPitchList: number[]) => {
	const locationList = sortBy(uniq(midiPitchList.map(x => new Base12Radix(x).lastDigit)))
	const findResult = collect(findChordMeta).where("orderedNotesLocationList", "!==", locationList)
		.filter(x => {
			if (!locationList.includes(x.rootNoteLocation)) return false
			if (x.chordKey.includes("7")) {
				if (!locationList.includes(x.n7L)) return false
			}
			if (x.chordKey.includes("13") || x.chordKey.includes("add6")) {
				if (!locationList.includes(x.n13L)) return false
			}
			if (x.chordKey.includes("#5") || x.chordKey.includes("b5")) {
				if (!locationList.includes(x.n5L)) return false
			}
			if (x.chordKey.includes("sus2") || x.chordKey.includes("9")) {
				if (!locationList.includes(x.n9L)) return false
			}
			if (x.chordKey.includes("sus4") || x.chordKey.includes("11")) {
				if (!locationList.includes(x.n11L)) return false
			}
			if (x.chordKey.includes("7")) {
				if (!(locationList.includes(x.n7L) && locationList.includes(x.n3L))) return false
			}
			if (x.chordKey.includes("maj3") || x.chordKey.includes("aug3") || x.chordKey.includes("min3") || x.chordKey.includes("dim3")) {
				if (!locationList.includes(x.n3L)) return false
			}
			if (x.chordKey.includes("dom9") || x.chordKey.includes("dom11") || x.chordKey.includes("dom13")) {
				if (!(locationList.includes(x.n7L) && locationList.includes(x.n3L))) return false
			}
			if (x.chordKey.includes("augmaj")) {
				if (!(locationList.includes(x.n3L) && locationList.includes(x.n5L) && locationList.includes(x.n7L))) return false
			}
			if (x.chordKey.includes("minmaj")) {
				if (!(locationList.includes(x.n3L) && locationList.includes(x.n7L))) return false
			}
			return intersection(x.orderedNotesLocationList, locationList).length > 2
		})
	if (isUndefined(findResult) || isNull(findResult) || (isArray(findResult) && findResult.length === 0)) {
		return []
	}
	const originMapList = findResult.all().map(x => {
		const likely = jaccard(x.orderedNotesLocationList, locationList)
		return {
			...x,
			likely: Number(likely.toFixed(4)),
		}
	})

	return orderBy(originMapList, "likely", "desc")
}

export default findComplexChordByMidi
const jaccard = (a: number[], b: number[]) => {
	const intersectionLength = intersection(a, b).length
	return intersectionLength / (a.length + b.length - intersectionLength)
}
