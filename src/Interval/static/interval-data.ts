/**
 * Interval 模块数据加载器
 *
 * 只读 intervals.json(6.9KB)。
 */
import collect from "collect.js";
import intervalsJson from "@static-data/intervals.json";

export const INTERVAL_META = collect(intervalsJson);
