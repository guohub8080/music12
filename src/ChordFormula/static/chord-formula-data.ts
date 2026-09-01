/**
 * ChordFormula 模块数据加载器
 *
 * 只读 chord-formulas.json(62KB)。
 */
import chordFormulasJson from "@static-data/chord-formulas.json";

export const CHORD_FORMULA_META_MAP = chordFormulasJson as Record<string, any>;
