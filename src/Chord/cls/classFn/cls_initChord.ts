/**
 * Chord 类初始化函数
 *
 * 负责验证参数并获取和弦公式元数据（init）
 */

import isNil from "lodash/isNil"
import { CHORD_FORMULA_META_MAP } from "@chord-formula/static/CHORD_FORMULA_META_MAP";
import { ChordError } from "@common/processError/errorTypes";
import type { I_ChordFormulaMeta } from "@chord-formula/static/types";
import type { T_IntervalType } from "@common/static/INTERVAL_TYPES";

/**
 * 和弦初始化元数据（只来自和弦公式，与根音无关）
 */
export type I_ChordInitMeta = {
  /** 和弦公式 ID */
  chordFormulaId: string;
  /** 和弦家族 */
  family: string;
  /** 中文名称 */
  cnName: string;
  /** 基础符号（不含变换） */
  baseSymbol: string;
  /** 基础音程列表 */
  baseIntervalList: [T_IntervalType, number][];
  /** 度数→音程类型映射 */
  degreeToIntervalMap: { [degree: number]: T_IntervalType };
  /** 半音列表 */
  semitonesList: number[];
};

/**
 * 获取和弦公式元数据
 *
 * @param chordFormulaId 和弦公式 ID（如 'maj3', 'min7', 'dom9' 等）
 * @returns 和弦公式元数据
 * @throws ChordError 如果和弦公式 ID 无效或元数据未找到
 */
export const cls_initChord = (chordFormulaId: string): I_ChordInitMeta => {
  const formulaMeta = CHORD_FORMULA_META_MAP[chordFormulaId];
  if (isNil(formulaMeta)) {
    throw new ChordError(
      `Chord formula metadata not found: "${chordFormulaId}"`
    );
  }

  return {
    chordFormulaId: formulaMeta.chordFormulaId,
    family: formulaMeta.family,
    cnName: formulaMeta.cnName,
    baseSymbol: formulaMeta.scoreDisplay,
    baseIntervalList: formulaMeta.intervalList,
    degreeToIntervalMap: formulaMeta.degreeToIntervalMap,
    semitonesList: formulaMeta.semitonesList,
  };
};

export default cls_initChord;
