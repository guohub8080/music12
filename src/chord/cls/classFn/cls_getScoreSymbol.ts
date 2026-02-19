// noinspection ES6PreferShortImport

import {Note} from "../../../note/cls/NoteClass.ts";
import {t_intervalPanel, t_transformPanel} from "../../static/types.ts";
import {isEmpty, keys} from "lodash";
import collect from "collect.js";

const cls_getScoreSymbol = (rootNote: InstanceType<typeof Note>, baseScoreSymbol: string,
                            baseIntervalPanel: t_intervalPanel, transformPanel: t_transformPanel,): string => {
  const omitResults = []
  const alterResults = []

  for (const i_key of keys(baseIntervalPanel)) {
    // nothing happened
    if (isEmpty(transformPanel[i_key])) continue
    // // no transform then nothing happened
    if (transformPanel[i_key] === "omit") {
      if (!baseIntervalPanel[i_key]) continue
      else omitResults.push(i_key)
    }
    if (baseIntervalPanel[i_key] === transformPanel[i_key]) continue
    if (transformPanel[i_key] === "aug") alterResults.push(`♯${i_key}`)
    if (transformPanel[i_key] === "p") alterResults.push(`♮${i_key}`)
    if (transformPanel[i_key] === "maj") alterResults.push(`♮${i_key}`)
    if (transformPanel[i_key] === "min") alterResults.push(`♭${i_key}`)
    if (transformPanel[i_key] === "dim") {
      if (["2", "3", "6", "7", "13"].includes(i_key)) {
        alterResults.push(`♭♭${i_key}`)
      } else alterResults.push(`♭${i_key}`)
    }
  }
  const chordTerm1 = `${baseScoreSymbol}`
  const alterString = alterResults.join(",")
  const omitString = omitResults.join(",")
  if (alterString.length + omitString.length === 0) return `${chordTerm1}`
  if (alterString.length > 0 && omitString.length === 0) return `${chordTerm1}(${alterString})`
  if (alterString.length > 0 && omitString.length > 0) return `${chordTerm1}(${alterString},omit${omitString})`
  if (alterString.length === 0 && omitString.length > 0) return `${chordTerm1}(omit${omitString})`
}

export default cls_getScoreSymbol




