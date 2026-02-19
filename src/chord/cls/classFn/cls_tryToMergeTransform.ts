import {Chord} from "../ChordClass.ts";
import cls_isTransformEmpty from "./cls_isTransformEmpty.ts";
import {Note} from "../../../note";
import {t_intervalPanel, t_transformPanel} from "../../static/types.ts";
import {isEmpty, isEqual, isString, keys} from "lodash";
import * as  factory from "../../../factory";
import collect from "collect.js";
import chordMeta from "../../static/chordMeta.ts";

const cls_tryToMergeTransform = (rootNote: InstanceType<typeof Note>,
                                 chordKey: string,
                                 intervalPanel: t_intervalPanel,
                                 transformPanel?: t_transformPanel) => {
	if (cls_isTransformEmpty(transformPanel)) return new Chord(rootNote, chordKey);
	const newIntervalPanel = {...intervalPanel}

	for (let k of keys(transformPanel)) {
		const tk = transformPanel[k]
		if (!isString(tk)) continue;
		if (tk === "omit") {
			newIntervalPanel[k] = void 0
		} else if (tk.length > 0) {
			newIntervalPanel[k] = tk
		}
	}
	// transfer intervalPanel to semitoneLocation (ordered)
	const findSemitoneList = keys(newIntervalPanel).map(k => {
		if (!isEmpty(newIntervalPanel[k])) {
			return factory.getInterval(newIntervalPanel[k], parseInt(k, 10))
		}
	}).filter(Boolean).map(x => x.semitoneLocation).sort((a, b) => a - b)
	const findNewResult = collect(chordMeta).filter(x => {
		if (isEqual(x.orderedSemitoneLocationList, findSemitoneList)) return true
	}).first()
	if (isEmpty(findNewResult)) return new Chord(rootNote, chordKey, transformPanel)
	return new Chord(rootNote, findNewResult.chordKey)
}

export default cls_tryToMergeTransform;
