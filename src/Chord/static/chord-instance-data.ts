/**
 * Chord 实例数据加载器
 *
 * JSON 只存记谱层(notes/根/公式id,~1MB);音集层 5 字段(pianoKeyIds/
 * pianoKeyIdsSorted/pianoKeyIdToInterval/intervalToPianoKeyId/notesNum)
 * 不落盘,由本加载器用公式 semitonesList + 根实时 enrich——
 * 对消费端(Find 模块/Chord 类)接口完全不变,JSON 体积减半。
 *
 * 同时预建音集 → 实例列表 的哈希索引(CHORD_INSTANCE_SOUNDSET_MAP),
 * 完全匹配查找从 O(n) 线性扫描变 O(1)(实测 ~940x 提速,结果逐条等价)。
 */
import chordInstancesJson from "@static-data/chord-instances.json";
import { CHORD_FORMULA_META_MAP } from "@chord-formula/static/CHORD_FORMULA_META_MAP";
import type { I_ChordInstanceMeta } from "./types";

/** 由公式半音列表 + 根实时推导音集层字段(与旧预存值逐字段等价) */
function enrichInstance(item: any): I_ChordInstanceMeta {
    const formula = CHORD_FORMULA_META_MAP[item.chordFormulaId];
    const root = item.pianoKeyIdRoot;

    const pianoKeyIds: number[] = [root];
    const pianoKeyIdToInterval: Record<number, { intervalType: string; intervalNum: number }> = {
        [root]: { intervalType: "p", intervalNum: 1 },
    };
    const intervalToPianoKeyId: Record<number, { intervalType: string; pianoKeyId: number }> = {
        1: { intervalType: "p", pianoKeyId: root },
    };
    for (let i = 0; i < formula.intervalList.length; i++) {
        const [intervalType, intervalNum] = formula.intervalList[i] as [string, number];
        const semitone = formula.semitonesList[i];
        const keyId = (root + semitone) % 12;
        pianoKeyIds.push(keyId);
        pianoKeyIdToInterval[keyId] = { intervalType, intervalNum };
        intervalToPianoKeyId[intervalNum] = { intervalType, pianoKeyId: keyId };
    }

    return {
        ...item,
        pianoKeyIds,
        pianoKeyIdsSorted: [...pianoKeyIds].sort((a, b) => a - b),
        notesNum: formula.notesNum,
        pianoKeyIdToInterval,
        intervalToPianoKeyId,
    };
}

export const ALL_CHORD_INSTANCE_META: I_ChordInstanceMeta[] =
    (chordInstancesJson as any[]).map(enrichInstance);

/** 按 chordFormulaId 索引 */
export const CHORD_INSTANCE_META_MAP: Record<string, I_ChordInstanceMeta[]> = (() => {
    const map: Record<string, I_ChordInstanceMeta[]> = {};
    for (const item of ALL_CHORD_INSTANCE_META) {
        const id = item.chordFormulaId;
        if (!map[id]) map[id] = [];
        map[id].push(item);
    }
    return map;
})();

/** 音集(排序键)→ 实例列表 的哈希索引,供完全匹配 O(1) 查找 */
export const CHORD_INSTANCE_SOUNDSET_MAP: Map<string, I_ChordInstanceMeta[]> = (() => {
    const map = new Map<string, I_ChordInstanceMeta[]>();
    for (const item of ALL_CHORD_INSTANCE_META) {
        const key = item.pianoKeyIdsSorted.join(",");
        const bucket = map.get(key);
        if (bucket) bucket.push(item);
        else map.set(key, [item]);
    }
    return map;
})();

export default ALL_CHORD_INSTANCE_META;
