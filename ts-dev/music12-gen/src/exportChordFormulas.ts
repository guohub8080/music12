/**
 * 导出和弦公式定义表(87 个和弦公式)
 *
 * 原 CHORD_FORMULA_META_MAP 是 Record<string, I_ChordFormulaMeta>,
 * 导出为 JSON 对象(键 = chordFormulaId,值 = 公式元数据)。
 *
 * 注意:tags 字段是由 deriveTags() 动态注入的,导出时已包含。
 */
import { CHORD_FORMULA_META_MAP } from "../../../src/ChordFormula/static/CHORD_FORMULA_META_MAP";

export function exportChordFormulas(): Record<string, unknown> {
    // 直接返回整个 Record(JSON 友好)
    return CHORD_FORMULA_META_MAP as any;
}
