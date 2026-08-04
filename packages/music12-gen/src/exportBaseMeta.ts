/**
 * 导出基础元数据:notes / intervals / fifth
 *
 * 这三个表在原 music12 里是 collect.js 包裹的数组(default export),
 * 导出时取 .all() 拿到原数组(JSON 里不需要 collect.js)。
 */
import NOTE_META from "../../../src/Note/static/NOTE_META";
import INTERVAL_META from "../../../src/Interval/static/INTERVAL_META";
import FIFTH_META from "../../../src/CircleOfFifths/static/FIFTH_META";

/** collect.js 对象 → 原始数组 → JSON */
function toArray(meta: { all(): unknown[] }): unknown[] {
    return meta.all();
}

export function exportNotes(): unknown[] {
    return toArray(NOTE_META as any);
}

export function exportIntervals(): unknown[] {
    return toArray(INTERVAL_META as any);
}

export function exportFifth(): unknown[] {
    return toArray(FIFTH_META as any);
}
