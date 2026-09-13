/**
 * Note 模块数据加载器
 *
 * 只读 notes.json(7.7KB),不拖其他 JSON。
 * 用户 import Note 时,只打包这个文件。
 */
import notesJson from "@static-data/notes.json";

/** notes.json 纯数组(2026-09-12 collect.js 退役,查询用 es-toolkit/原生) */
export const NOTE_META = notesJson;
