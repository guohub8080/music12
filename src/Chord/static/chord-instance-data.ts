/**
 * Chord 实例数据加载器
 *
 * 只读 chord-instances.json(2.1MB)。
 * 用户 import Chord 时才打包这个文件。
 */
import chordInstancesJson from "@static-data/chord-instances.json";
import type { I_ChordInstanceMeta } from "./types";

export const ALL_CHORD_INSTANCE_META = chordInstancesJson as any[];

/** 按 chordFormulaId 索引 */
export const CHORD_INSTANCE_META_MAP: Record<string, any[]> = (() => {
    const map: Record<string, any[]> = {};
    for (const item of chordInstancesJson as any[]) {
        const id = item.chordFormulaId;
        if (!map[id]) map[id] = [];
        map[id].push(item);
    }
    return map;
})();

export default ALL_CHORD_INSTANCE_META as I_ChordInstanceMeta[]
