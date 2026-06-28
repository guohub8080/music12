import NOTE_META from "../../static/NOTE_META";
import {T_AlterValue, T_NoteStep} from "@common/static/NOTE_TYPES";
import {NoteError} from "@common/processError/errorTypes";

type I_NoteObj = {
    uid: number;
    isNormal: boolean;
    artName: string;
    isBlack: boolean;
    stepId: number;
    step: T_NoteStep;
    fifthValue: number;
    semitone: number;
    mathName: string;
    pianoKeyId: number;
    alter: T_AlterValue
};

/**
 * 初始化音符类
 *
 * 根据音名和变化音查找对应的音符元数据。这是 Note 类构造函数的核心逻辑，
 * 用于从预定义的 noteMeta 中查找音符的所有属性。
 *
 * ### noteMeta 包含的属性
 *
 * - `uid`: 唯一标识符
 * - `step`: 音名（C, D, E, F, G, A, B）
 * - `alter`: 变化音值（-2 到 2）
 * - `semitone`: 相对于 C0 的半音偏移
 * - `stepId`: 音名索引（C=0, D=1, ... B=6）
 * - `fifthValue`: 五度圈值
 * - `pianoKeyId`: 钢琴键位置（0-11）
 * - `isNormal`: 是否为常用音符
 * - `isBlack`: 是否为黑键
 * - `artName`: 艺术名称（如 C#, Eb）
 * - `mathName`: 数学名称（如 C+1, E-1）
 *
 * @param step 音名（C, D, E, F, G, A, B），默认 "C"
 * @param alter 变化音值（-2 到 2），默认 0
 * @returns 音符元数据对象
 * @throws {NoteError} 当找不到匹配的音符时抛出错误
 *
 * @example
 * initNoteClass('C', 0)   // 返回 C 的元数据
 * initNoteClass('C', 1)   // 返回 C# 的元数据
 * initNoteClass('E', -1)  // 返回 Eb 的元数据
 */
export const cls_initNoteClass = (step: T_NoteStep = "C", alter: T_AlterValue = 0): I_NoteObj => {
    const noteStep = step.toString().toUpperCase().trim()
    const noteObj = NOTE_META.where("step", noteStep).where("alter", alter).first()
    if (noteObj) return noteObj as I_NoteObj
    throw new NoteError(`Note "${step}${alter}" not found in note metadata.`)
}

export default cls_initNoteClass;
