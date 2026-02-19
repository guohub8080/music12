import modeMeta from "../static/modeMeta.ts";
import collect from "collect.js";

export const getModeNameByModeKey = (modeKey: string) => {
  try {
    return collect(modeMeta).where("uid", modeKey).first().name
  } catch (e) {
    throw new Error("The modeKey is not valid!")
  }
}
export default getModeNameByModeKey