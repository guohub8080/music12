/**
 * CircleOfFifths 模块数据加载器
 *
 * 只读 fifth.json(11KB)。
 */
import collect from "collect.js";
import fifthJson from "../../../shared/data/fifth.json";

export const FIFTH_META = collect(fifthJson);
