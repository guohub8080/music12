import collect from "collect.js";
import chordMeta from "../static/chordMeta.ts";

export const getChordCnNameByKey = (k: string) => {
  return collect(chordMeta).where("chordKey", k).first().cnName
}

export default getChordCnNameByKey