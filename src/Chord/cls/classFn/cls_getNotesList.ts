/**
 * 获取和弦音符列表
 */

import { Note } from "../../../Note/cls/NoteClass";
import { getNoteByPianoKeyId } from "../../../Note";

/**
 * 获取音符列表（基于 pianoKeyIds）
 *
 * @param pianoKeyIds 钢琴键 ID 列表（已去重）
 * @param octave 八度数，默认 4
 * @returns 音符列表
 */
export const cls_getNotesList = (
  pianoKeyIds: number[],
  octave: number = 4
): InstanceType<typeof Note>[] => {
  const result: InstanceType<typeof Note>[] = [];

  // 遍历 pianoKeyIds，为每个 ID 获取对应的 Note
  for (const kid of pianoKeyIds) {
    // 获取该 pianoKeyId 的常用音符，取第一个
    const notes = getNoteByPianoKeyId(kid, { octave });
    if (notes.length > 0) {
      result.push(notes[0]);
    }
  }

  return result;
};

export default cls_getNotesList;
