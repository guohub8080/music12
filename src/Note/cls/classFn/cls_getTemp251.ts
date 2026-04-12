import {Note} from "../NoteClass.ts";
import {NoteError} from "../../../common/processError/errorTypes.ts";

/**
 * 获取 ii-V-I 进行
 *
 * 根据当前音符在 ii-V-I 进行中的角色，返回进行中的三个音符。
 *
 * @param noteInstance 当前音符
 * @param noteAs 角色：1=I级（主音）, 2=ii级, 5=V级（属音）
 * @returns ii-V-I 进行中的三个音符 [ii, V, I]
 *
 * @example
 * const c4 = new Note('C', 0, 4)
 * c4.get251as(1) // [D4, G4, C4] - C 是 I 级
 * c4.get251as(2) // [C4, F4, Bb3] - C 是 ii 级
 * c4.get251as(5) // [F4, C4, Bb3] - C 是 V 级
 */
export default (noteInstance: InstanceType<typeof Note>, noteAs: number): InstanceType<typeof Note>[] => {
  if (![1, 2, 5].includes(noteAs)) throw new NoteError("Parameter \"noteAs\" must be 1, 2, or 5.")

  // I 级：返回 [ii, V, I]
  if (noteAs === 1) {
    return [
      noteInstance.getNoteByIntervalString("2"),
      noteInstance.getNoteByIntervalString("5"),
      noteInstance
    ]
  }

  // ii 级：返回 [ii, V, I]
  if (noteAs === 2) {
    return [
      noteInstance,
      noteInstance.getNoteByIntervalString("4"),
      noteInstance.getNoteByIntervalString("2", { isAscending: false })
    ]
  }

  // V 级：返回 [ii, V, I]（必然走到这里，因为前面已校验）
  return [
    noteInstance.getNoteByIntervalString("4", { isAscending: false }),
    noteInstance,
    noteInstance.getNoteByIntervalString("5", { isAscending: false })
  ]
}
