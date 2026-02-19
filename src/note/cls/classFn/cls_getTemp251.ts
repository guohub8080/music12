import {Note} from "../NoteClass.ts";
import {NoteError} from "../../../common/processError/errorTypes.ts";

export default (noteInstance: InstanceType<typeof Note>, noteAs: number): InstanceType<typeof Note>[] => {
  if (![1, 2, 5].includes(noteAs)) throw new NoteError("251 function must be a number of 2/5/1");
  if (noteAs === 1) {
    return [noteInstance.getNoteByIntervalString("2"),
      noteInstance.getNoteByIntervalString("5"), noteInstance]
  }
  if (noteAs === 2) {
    return [noteInstance, noteInstance.getNoteByIntervalString("4"),
      noteInstance.getNoteByIntervalString("2", false)]
  }
  if (noteAs === 5) {
    return [noteInstance.getNoteByIntervalString("4", false),
      noteInstance, noteInstance.getNoteByIntervalString("5", false)]
  }
}