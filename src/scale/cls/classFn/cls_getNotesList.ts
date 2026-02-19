// noinspection ES6PreferShortImport

import {Note} from "../../../note/cls/NoteClass.ts";
import {t_intervalList} from "../../../interval/static/types.ts";
import {Interval} from "../../../interval/cls/IntervalClass.ts";

const cls_getNotesList = (rootNote: InstanceType<typeof Note>,
                          intervalList: t_intervalList[]) => {
	const resultList = [rootNote]
	intervalList.forEach(x => {
		const targetInterval = new Interval(x[0], x[1])
		resultList.push(rootNote.getNoteByInterval(targetInterval))
	})
	return resultList
}

export default cls_getNotesList
