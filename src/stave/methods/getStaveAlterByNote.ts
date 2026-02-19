// noinspection ES6PreferShortImport

import fifthMeta from "../../circleOfFifths/static/fifthMeta.ts";
import {t_alterValue, t_noteStep} from "../../note/static/types.ts";
import {isEmpty} from "lodash";

export const getStaveAlterByNote = (step: t_noteStep, alter: t_alterValue) => {
  const findObj = fifthMeta.where("rawNoteStep", step).where("rawNoteAlter", alter).all()
  if (isEmpty(findObj)) throw new Error("No alter value found for the given note!")
  return findObj
}

export default getStaveAlterByNote
