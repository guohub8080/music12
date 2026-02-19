// noinspection ES6PreferShortImport

import {Note} from "../../../note/cls/NoteClass.ts";
import {ScaleRadix} from "../../../common/radix";

const cls_getDegreeNote = (notesList: InstanceType<typeof Note>[],
                           degree: number) => {
  const index = new ScaleRadix(degree).scaleDegree - 1
  return notesList[index]
}

export default cls_getDegreeNote
