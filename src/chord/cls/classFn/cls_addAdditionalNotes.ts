// noinspection ES6PreferShortImport

import {Note} from "../../../note/cls/NoteClass.ts";
import {isArray} from "lodash";
import {ChordError} from "../../../common/processError/errorTypes.ts";

const cls_addAdditionalNotes = (originNotes: InstanceType<typeof Note>[] | [],
                                additionalNotes: InstanceType<typeof Note>[] | InstanceType<typeof Note>) => {
  if (isArray(additionalNotes)) {
    return [...originNotes, ...additionalNotes]
  }
  try {
    if (additionalNotes.mathName && additionalNotes.artName) {
      return [...originNotes, additionalNotes]
    }
    throw new ChordError("Additional Notes are invalid.")
  } catch (e) {
    throw new ChordError(e.message)
  }
}

export default cls_addAdditionalNotes