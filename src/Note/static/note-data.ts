/**
 * Note 模块数据加载器
 *
 * 只读 notes.json(7.7KB),不拖其他 JSON。
 * 用户 import Note 时,只打包这个文件。
 */
import collect from "collect.js";
import notesJson from "@static-data/notes.json";

export const NOTE_META = collect(notesJson);
