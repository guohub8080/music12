import collect from "collect.js";
import chordMeta from "../static/chordMeta.ts";

export const getChordSymbolByKey = (k: string) => {
  return collect(chordMeta).where("chordKey", k).first().scoreDisplay
}

export default getChordSymbolByKey