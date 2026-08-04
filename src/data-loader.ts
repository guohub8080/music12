/**
 * music12 DataLoader —— 从 JSON 加载数据,用 collect.js 包装后返回
 *
 * 设计目标:替代原 static/*.ts 的硬编码数据,但保持完全一致的接口。
 * 消费方代码(如 NOTE_META.where(...).first())无需任何修改。
 *
 * 数据源:shared/data/*.json(由 packages/music12-gen/ 生成)
 */
import collect from "collect.js";

// JSON 数据(Vite/vitest 构建时内联)
import notesJson from "../shared/data/notes.json";
import intervalsJson from "../shared/data/intervals.json";
import fifthJson from "../shared/data/fifth.json";
import chordFormulasJson from "../shared/data/chord-formulas.json";
import scaleModesJson from "../shared/data/scale-modes.json";
import chordInstancesJson from "../shared/data/chord-instances.json";
import scaleInstancesJson from "../shared/data/scale-instances.json";

// ==================== collect.js 包装(和原 static/*.ts 完全一致)====================

/** 音符元数据(原 NOTE_META) */
export const NOTE_META = collect(notesJson);

/** 音程元数据(原 INTERVAL_META) */
export const INTERVAL_META = collect(intervalsJson);

/** 五度圈元数据(原 FIFTH_META) */
export const FIFTH_META = collect(fifthJson);

// ==================== 定义表(原是 Record 对象,保持原样)====================

/** 和弦公式定义(原 CHORD_FORMULA_META_MAP) */
export const CHORD_FORMULA_META_MAP = chordFormulasJson as Record<string, any>;

/** 调式定义(原 SCALE_MODE_META_MAP) */
export const SCALE_MODE_META_MAP = scaleModesJson as Record<string, any>;

// ==================== 派生实例表 ====================

/** 和弦实例扁平数组(原 ALL_CHORD_INSTANCE_META) */
export const ALL_CHORD_INSTANCE_META = chordInstancesJson as any[];

/** 和弦实例 Map:按 chordFormulaId 索引(原 CHORD_INSTANCE_META_MAP) */
export const CHORD_INSTANCE_META_MAP: Record<string, any[]> = (() => {
    const map: Record<string, any[]> = {};
    for (const item of chordInstancesJson as any[]) {
        const id = item.chordFormulaId;
        if (!map[id]) map[id] = [];
        map[id].push(item);
    }
    return map;
})();

/** 音阶实例扁平数组(原 allScaleInstances 的 ALL_SCALE_META) */
export const ALL_SCALE_META = scaleInstancesJson as any[];

/**
 * 按 rootPianoKeyId + scaleModeId 查找音阶实例
 * (原 allScaleInstances.ts 的 getScaleInstance 函数)
 */
export function getScaleInstance(rootPianoKeyId: number, scaleModeId: string): any {
    return (scaleInstancesJson as any[]).find(
        (item) => item.pianoKeyIdRoot === rootPianoKeyId && item.scaleModeId === scaleModeId
    );
}

/** 和弦 ID 表(原 CHORD_FORMULA_ID,恒等映射) */
export const CHORD_FORMULA_ID: Record<string, string> = (() => {
    const map: Record<string, string> = {};
    for (const key of Object.keys(chordFormulasJson)) {
        map[key] = key;
    }
    return map;
})();

/** 调式 ID 表(原 SCALE_MODE_ID,恒等映射) */
export const SCALE_MODE_ID: Record<string, string> = (() => {
    const map: Record<string, string> = {};
    for (const key of Object.keys(scaleModesJson)) {
        map[key] = key;
    }
    return map;
})();
