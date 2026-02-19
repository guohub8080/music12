export {Chord} from "./cls/ChordClass.ts"
import {Chord} from "./cls/ChordClass.ts"

export * as chordMeta from "./static/chordMeta.ts";
import chordMeta from "./static/chordMeta.ts";

export * as findChord from "../find/findChord.ts";
import findChord from "../find/findChord.ts";

export * as findChordInScale from "../find/findChordInScale.ts";
import findChordInScale from "../find/findChordInScale.ts";

export * as getChordSymbolByKey from "./methods/getChordSymbolByKey.ts";
import getChordSymbolByKey from "./methods/getChordSymbolByKey.ts";

export * as getChordCnNameByKey from "./methods/getChordCnNameByKey.ts";
import getChordCnNameByKey from "./methods/getChordCnNameByKey.ts";

export * as getChordTransformByLocationList from "./methods/getChordTransformByLocationList.ts";
import getChordTransformByLocationList from "./methods/getChordTransformByLocationList.ts";

export * as findNotesInChord from "../find/findNotesInChord.ts";
import findNotesInChord from "../find/findNotesInChord.ts";

export default {
	Chord,
	chordMeta,
	findChord,
	findChordInScale,
	getChordSymbolByKey,
	getChordCnNameByKey,
	findNotesInChord,
	getChordTransformByLocationList
}
