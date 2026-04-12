import {Note} from "../../index";
import {PianoKey} from "../../../PianoKey";
import {isNil} from "lodash";
import collect from "collect.js";

/**
 * 半音移动
 *
 * 根据给定的半音数移动音符，返回目标位置的一个 Note 实例。
 * 由于同一个半音位置可能有多个等音异名（如 C# 和 Db），此函数会智能选择最合适的表示。
 *
 * 选择规则：
 * 1. 优先选择 alter === 0 的自然音（如 C 而非 B#）
 * 2. 如果没有自然音，向上移动时选升号（#），向下时选降号（b）
 *
 * @param noteInstance 原始音符
 * @param moveStep 移动的半音数（正数向上，负数向下，0 返回自身）
 * @returns 移动后的新音符
 *
 * @example
 * const c4 = new Note('C', 0, 4)
 * cls_semitoneMove(c4, 1)   // Note('C#', 1, 4) - 优先升号
 * cls_semitoneMove(c4, -1)  // Note('B', 0, 3)
 * cls_semitoneMove(c4, 7)   // Note('G', 0, 4) 纯五度
 */
const cls_semitoneMove = (noteInstance: InstanceType<typeof Note>,
                          moveStep: number): InstanceType<typeof Note> => {
  // 不移动，直接返回
  if (moveStep === 0) return noteInstance

  // 计算目标位置
  const endPianoKey = PianoKey.fromPitchInt(noteInstance.pitchValue + moveStep)

  // 获取目标位置上所有变化音不超过 1 的常用音符
  const handle = collect(endPianoKey.getNotes({ isNormal: true, alterAbsLte: 1 }))

  // 优先找 alter === 0 的自然音
  const zeroAlterNote = handle.where("alter", 0).first()
  if (!isNil(zeroAlterNote)) return zeroAlterNote

  // 没有自然音：向上选升号，向下选降号
  if (moveStep > 0) {
    const sharp = handle.where("alter", ">", 0).first()
    if (isNil(sharp)) throw new Error("No sharp note found at this location.")
    return sharp
  }
  const flat = handle.where("alter", "<", 0).first()
  if (isNil(flat)) throw new Error("No flat note found at this location.")
  return flat
}

export default cls_semitoneMove
