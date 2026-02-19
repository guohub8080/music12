// noinspection ES6PreferShortImport
import modeNames from "./scaleModeNames.ts";

const modeNames7 = [
	modeNames.Ionian, modeNames.Dorian, modeNames.Phrygian, modeNames.Lydian, modeNames.MixoLydian, modeNames.Aeolian, modeNames.Locrian
]

const majorModes = [
	modeNames.Ionian,
	modeNames.HarmonicMajor,
	modeNames.MelodicMajor
]

const minorModes = [
	modeNames.Aeolian,
	modeNames.HarmonicMinor,
	modeNames.MelodicMinor
]
export default {
	modeNames7,
	majorModes,
	minorModes
}