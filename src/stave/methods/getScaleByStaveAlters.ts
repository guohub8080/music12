// noinspection ES6PreferShortImport
import fifthMeta from "../../circleOfFifths/static/fifthMeta.ts";

export const getScaleByStaveAlters = (staveAlter: number) => {
  if (Math.abs(staveAlter) > 7) throw new Error("staveAlter must be between -7 and 7")
  if (Math.abs(staveAlter) <= 6) return fifthMeta.where("circleID", ">=", 0).where("circleID", "<=", 12)
    .where("rawStaveAlters", staveAlter)
    .where("isTonicReplaced", false).all()
  if (Math.abs(staveAlter) === 7) return fifthMeta.where("rawStaveAlters", staveAlter).all()
}

export default getScaleByStaveAlters
