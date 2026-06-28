/**
 * 和弦类 - 重构版 V3
 *
 * ### 核心设计理念
 *
 * **和弦 = initChordFormulaMeta + transformPanel**
 *
 * - initChordFormulaMeta: 和弦公式定义（度数→音程映射，与根音无关）
 * - transformPanel: 用户变换（升/降/添加/省略）
 * - rootPianoKeyId: 根音位置
 *
 * 最终音程面板 = initChordFormulaMeta.degreeToIntervalMap + transformPanel
 */

import { isDefined } from "@common/utils/isDefined"
import some from "lodash/some"
import isNil from "lodash/isNil"
import toPairs from "lodash/toPairs"
import uniq from "lodash/uniq"
import { Note } from "@note/cls/NoteClass";
import { getNoteByPianoKeyId } from "@note";
import { cls_initChord, type I_ChordInitMeta } from "./classFn/cls_initChord";
import { cls_setChordDegree } from "./classFn/cls_setChordDegree";
import { cls_setChordOmit } from "./classFn/cls_setChordOmit";
import { cls_setSus } from "./classFn/cls_setSus";
import { cls_getIntervalPanel } from "./classFn/cls_getIntervalPanel";
import { cls_getScoreSymbol } from "./classFn/cls_getScoreSymbol";
import { cls_getNotesList } from "./classFn/cls_getNotesList";
import { cls_findChord } from "./classFn/cls_findChord";
import type {
  I_ChordIntervalPanel,
  I_TransformPanel,
  I_ChordIntervalNum,
} from "../static/types";
import { EMPTY_TRANSFORM_PANEL } from "../static/types";
import { T_IntervalType } from "@common/static/INTERVAL_TYPES";
import { Interval } from "@interval/cls/IntervalClass";

/**
 * 和弦类
 *
 * @example
 * const cMajor = new Chord(0, 'maj3')
 * cMajor.intervalPanel  // { 3: "maj", 5: "p" }
 */
export class Chord {
  /** 根音的钢琴键 ID (0-11) */
  public readonly rootPianoKeyId: number;

  /** 和弦公式元数据（来自 CHORD_FORMULA_META_MAP，与根音无关） */
  #initChordFormulaMeta: I_ChordInitMeta;

  /** 变换面板（用户设置的变换） */
  #transformPanel: I_TransformPanel;

  /**
   * 创建和弦实例
   * @param rootPianoKeyId 根音的钢琴键 ID (0-11)
   * @param chordFormulaId 和弦公式 ID（如 'maj3', 'min7', 'dom9' 等）
   */
  constructor(rootPianoKeyId: number, chordFormulaId: string) {
    if (rootPianoKeyId < 0 || rootPianoKeyId > 11) {
      throw new RangeError("rootPianoKeyId must be between 0 and 11");
    }
    this.rootPianoKeyId = rootPianoKeyId;
    this.#initChordFormulaMeta = cls_initChord(chordFormulaId);
    this.#transformPanel = EMPTY_TRANSFORM_PANEL;
  }

  // ==================== Init 属性（和弦公式定义）====================

  /** 和弦公式 ID */
  public get chordFormulaId(): string {
    return this.#initChordFormulaMeta.chordFormulaId;
  }

  /** 基础符号（不含变换） */
  public get baseSymbol(): string {
    return this.#initChordFormulaMeta.baseSymbol;
  }

  /** 和弦中文名称 */
  public get cnName(): string {
    return this.#initChordFormulaMeta.cnName;
  }

  /** 和弦家族 */
  public get family(): string {
    return this.#initChordFormulaMeta.family;
  }

  /** 基础音程列表（不含变换） */
  public get baseIntervalList(): [T_IntervalType, number][] {
    return this.#initChordFormulaMeta.baseIntervalList;
  }

  // ==================== Transform 相关 ====================

  /** 获取变换面板 */
  public get transformPanel(): I_TransformPanel {
    return this.#transformPanel;
  }

  /** 是否有变换 */
  public get isTransformed(): boolean {
    return some(this.#transformPanel, (v) => isDefined(v));
  }

  /**
   * 设置和弦度数的音程类型
   *
   * @param input 度数输入，支持：
   *   - 数字：2, 3, 4, 5, 6, 7, 9, 11, 13
   *   - 字符串："2", "#2"/"2#", "b2"/"2B"/"B2" 等（# 和 b 不区分大小写和位置）
   *
   * @example
   * c.set(2)      // 设置 2 度为大二度
   * c.set("#2")   // 设置 2 度为增二度
   * c.set("b2")   // 设置 2 度为小二度
   * c.set("2B")   // 同 "b2"（不区分大小写和位置）
   */
  public set(
    input:
      | 2
      | 3
      | 4
      | 5
      | 6
      | 7
      | 9
      | 11
      | 13
      | `${number}`
      | `#${number}`
      | `b${number}`
  ): this {
    this.#transformPanel = cls_setChordDegree(this.#transformPanel, input);
    return this;
  }

  /**
   * 挂留和弦
   */
  public setSus(susNum: 2 | 4 = 2): this {
    this.#transformPanel = cls_setSus(this.#transformPanel, susNum);
    return this;
  }

  /** 省略指定度数的音 */
  public setOmit(omitInterval: I_ChordIntervalNum): this {
    this.#transformPanel = cls_setChordOmit(this.#transformPanel, omitInterval);
    return this;
  }

  /** 清空所有变换 */
  public clearTransform(): void {
    this.#transformPanel = EMPTY_TRANSFORM_PANEL;
  }

  // ==================== 计算属性（受 transform 影响）====================

  /**
   * 计算应用变换后的音程面板
   * init.degreeToIntervalMap + transformPanel = intervalPanel
   */
  get #intervalPanel(): I_ChordIntervalPanel {
    return cls_getIntervalPanel(this.#initChordFormulaMeta, this.#transformPanel);
  }

  /** 获取音程面板（应用变换后） */
  public get intervalPanel(): I_ChordIntervalPanel {
    return this.#intervalPanel;
  }

  /**
   * 获取音程列表（应用变换后）
   */
  public get intervalList(): [T_IntervalType, number][] {
    const result: [T_IntervalType, number][] = [];
    const panel = this.#intervalPanel;

    for (const [degreeStr, intervalType] of toPairs(panel)) {
      if (intervalType) {
        const degree = Number(degreeStr);
        if (degree >= 2 && degree <= 13) {
          result.push([intervalType as T_IntervalType, degree]);
        }
      }
    }

    return result.sort((a, b) => a[1] - b[1]);
  }

  /** 钢琴键 ID 列表（按度数顺序，未排序，已去重）- 根据音程面板计算 */
  public get pianoKeyIds(): number[] {
    const result: number[] = [];
    const rootKeyId = this.rootPianoKeyId;

    // 根音
    result.push(rootKeyId);

    // 根据音程面板计算其他音
    for (const [degreeStr, intervalType] of toPairs(
      this.#intervalPanel
    )) {
      if (intervalType) {
        const degree = Number(degreeStr);
        const interval = new Interval(intervalType as T_IntervalType, degree);
        // 计算音程的半音数
        const semitones = interval.semitoneGap;
        result.push((rootKeyId + semitones) % 12);
      }
    }

    // 去重（保持首次出现的顺序）
    return uniq(result);
  }

  /** 钢琴键 ID 列表（按音高排序） */
  public get pianoKeyIdsSorted(): number[] {
    return [...this.pianoKeyIds].sort((a, b) => a - b);
  }

  /** 和弦音符数量 */
  public get notesNum(): number {
    return this.pianoKeyIds.length;
  }

  /**
   * 获取乐谱符号（含变换）
   */
  public get scoreSymbol(): string {
    return cls_getScoreSymbol(this.#initChordFormulaMeta.baseSymbol, this.#transformPanel);
  }

  // ==================== 根音相关 ====================

  /**
   * 获取根音的 Note 实例
   */
  public getRootNotes(octave: number = 4): InstanceType<typeof Note>[] {
    return getNoteByPianoKeyId(this.rootPianoKeyId, { octave });
  }

  // ==================== 音符计算 ====================

  /**
   * 获取音符列表（基于 pianoKeyIds）
   * 每个 pianoKeyId 对应一个 Note，已去重
   */
  public getNotesList(octave: number = 4): InstanceType<typeof Note>[] {
    return cls_getNotesList(this.pianoKeyIds, octave);
  }

  /** 获取简单描述 */
  public get simpleDescription(): string {
    return this.getNotesList()
      .map((n) => n.simpleDescription)
      .join(",");
  }

  // ==================== 反查 ====================

  /**
   * 根据当前和弦的 pianoKeyIds（含变换）反查匹配的和弦
   *
   * 可用于查看变换后的音符组合能构成哪些和弦。
   *
   * @param config 查找配置
   * @param config.isShowFuzzyOnFullMatch 有完全匹配时是否也显示模糊匹配
   * @param config.isShowFuzzyOnEmptyMatch 无完全匹配时是否显示模糊匹配
   * @param config.minSimilarity 最低相似度（0-1），默认 0.5
   * @returns 匹配的和弦结果列表
   *
   * @example
   * const cMaj = new Chord(0, 'maj3')
   * cMaj.find()  // [{ pianoKeyIdRoot: 0, chordFormulaId: "maj3", similarity: 1, ... }]
   *
   * // 变换后查找
   * cMaj.set(7).find()  // 查找变换后的音符能匹配到哪些和弦
   */
  public find(config?: {
    /** true=只返回完全匹配；false=完全匹配+省略音（默认 false） */
    isStrict?: boolean
  }) {
    return cls_findChord(this, config)
  }

}

export default Chord;
