import { isNil } from 'es-toolkit'
import { values } from 'es-toolkit/compat'
import { getNoteByPianoKeyId } from "@note"
import { getScaleInstance, type I_ScaleInstance } from "../../Scale/static/allScaleInstances"
import type { I_ScaleModeMeta } from "@scale-mode/static/types"
import type { T_ScaleModeId } from "../../Scale/static/scaleModeTypes"
import { isDefined } from "@common/utils/isDefined"

// 类方法导入（非简单内联的）
import cls_getRootNote from "./classFn/cls_getRootNote"
import cls_getNoteByDegree from "./classFn/cls_getNoteByDegree"
import cls_getScaleDegreeChord3 from "./classFn/cls_getScaleDegreeChord3"
import cls_getScaleDegreeChord7 from "./classFn/cls_getScaleDegreeChord7"
import cls_getNoteByIntervalNum from "./classFn/cls_getNoteByIntervalNum"
import type { I_AnalyzedChordResult } from "@find/findChord"

/**
 * 调式类
 *
 * 表示一个由根音钢琴键 ID 和调式类型组成的调式。
 *
 * ### 核心概念
 *
 * - **rootPianoKeyId**: 根音的钢琴键 ID (0-11)，0=C, 1=C#/Db, ..., 11=B
 * - **scaleModeId**: 调式 ID（如 'NATURAL_MAJOR', 'DORIAN' 等）
 * - **degree (音级)**: 调式中各个音的位置，从 1 到 7
 *
 * @example
 * // 创建 C 大调
 * const cMajor = new Scale(0, 'NATURAL_MAJOR')
 * cMajor.pianoKeyIds  // [0, 2, 4, 5, 7, 9, 11] (C, D, E, F, G, A, B)
 *
 * // 获取音级对应的钢琴键 ID
 * cMajor.degreeToPianoKeyId[1]  // 0 (根音 C)
 * cMajor.degreeToPianoKeyId[5]  // 7 (五音 G)
 *
 * // 获取顺阶和弦
 * cMajor.getScaleDegreeChord3(5)  // G 大三和弦
 */
export class Scale {
	/** 根音的钢琴键 ID (0-11) */
	public readonly rootPianoKeyId: number
	/** 调式 ID */
	public readonly scaleModeId: T_ScaleModeId
	/** 调式元数据 */
	public readonly scale: I_ScaleInstance
	/** 调式元数据详情 */
	public readonly scaleMode: I_ScaleModeMeta

	constructor(rootPianoKeyId: number, scaleModeId: T_ScaleModeId) {
		if (rootPianoKeyId < 0 || rootPianoKeyId > 11) {
			throw new RangeError("rootPianoKeyId must be between 0 and 11")
		}
		this.rootPianoKeyId = rootPianoKeyId
		this.scaleModeId = scaleModeId

		const scaleInstance = getScaleInstance(rootPianoKeyId, scaleModeId)

		if (isNil(scaleInstance)) {
			throw new Error(`Scale not found: rootPianoKeyId=${rootPianoKeyId}, scaleModeId=${scaleModeId}`)
		}

		this.scale = scaleInstance
		this.scaleMode = scaleInstance.scaleMode as I_ScaleModeMeta
	}

	// ========== 直接从 scale 获取的属性 ==========

	/** 调式的钢琴键 ID 列表（按度数顺序，1-7） */
	public get pianoKeyIds(): number[] {
		return this.scale.pianoKeyIds
	}

	/** 调式的钢琴键 ID 列表（按音高排序） */
	public get pianoKeyIdsSorted(): number[] {
		return this.scale.pianoKeyIdsSorted
	}

	/** 度数到钢琴键 ID 的映射 */
	public get degreeToPianoKeyId(): Record<number, number> {
		return this.scale.degreeToPianoKeyId
	}

	/** 钢琴键 ID 到度数的映射 */
	public get pianoKeyIdToDegree(): Record<number, number> {
		return this.scale.pianoKeyIdToDegree
	}

	/** 各音级的变音值映射 */
	public get degreeAlterationsMap(): Record<number, number> {
		return this.scale.degreeAlterationsMap
	}

	/** 调式名称（中文名） */
	public get modeName(): string {
		return this.scaleMode.name
	}

	/** 调式类型 */
	public get type(): string {
		return this.scaleMode.type
	}

	/** 调式描述 */
	public get modeDescription(): string {
		return this.scaleMode.description
	}

	// ========== 简单计算属性（内联） ==========

	/** 简洁描述（如 "C,D,E,F,G,A,B"） */
	public get simpleDescription(): string {
		return this.scale.pianoKeyIds
			.map((id: number) => getNoteByPianoKeyId(id)[0].simpleDescription)
			.join(",")
	}

	/** 自然音数量（alter === 0 的音符数） */
	public get naturalNotesNum(): number {
		return values(this.scale.degreeAlterationsMap).filter(x => x === 0).length
	}

	/** 变化音数量（alter !== 0 的音符数） */
	public get alteredNotesNum(): number {
		return values(this.scale.degreeAlterationsMap).filter(x => x !== 0).length
	}

	/** 单升/降号音数量（alter === ±1 的音符数） */
	public get sharpOrFlatNotesNum(): number {
		return values(this.scale.degreeAlterationsMap).filter(x => Math.abs(x) === 1).length
	}

	/** 双升/降号音数量（alter === ±2 的音符数） */
	public get doubleSharpOrFlatNotesNum(): number {
		return values(this.scale.degreeAlterationsMap).filter(x => Math.abs(x) === 2).length
	}

	/** 是否所有音符都是变化音 */
	public get isTonicReplaced(): boolean {
		return this.alteredNotesNum === this.scale.pianoKeyIds.length
	}


	// ========== 查询方法（内联） ==========

	/**
	 * 检查指定的钢琴键 ID 是否在此调式中
	 * @param pianoKeyId 钢琴键 ID (0-11)
	 * @returns 如果在调式中返回 true，否则返回 false
	 */
	public hasPianoKeyId(pianoKeyId: number): boolean {
		return isDefined(this.scale.pianoKeyIdToDegree[pianoKeyId])
	}

	/**
	 * 获取指定钢琴键 ID 在调式中的度数
	 * @param pianoKeyId 钢琴键 ID (0-11)
	 * @returns 度数（1-7），如果不在调式中返回 null
	 */
	public getDegreeByPianoKeyId(pianoKeyId: number): number | null {
		const degree = this.scale.pianoKeyIdToDegree[pianoKeyId]
		return isDefined(degree) ? degree : null
	}

	/**
	 * 根据钢琴键 ID 获取度数和变音值
	 * @param pianoKeyId 钢琴键 ID (0-11)
	 * @returns { degree: number, alter: number } 或 null（如果不在调式中）
	 */
	public getDegreeAndAlter(pianoKeyId: number): { degree: number; alter: number } | null {
		const degree = this.scale.pianoKeyIdToDegree[pianoKeyId]
		if (isNil(degree)) return null
		return { degree, alter: this.scale.degreeAlterationsMap[degree] ?? 0 }
	}

	/**
	 * 获取指定度数的钢琴键 ID
	 * @param degree 度数（1-7）
	 * @returns 钢琴键 ID (0-11)
	 */
	public getPianoKeyIdByDegree(degree: number): number {
		const pianoKeyId = this.scale.degreeToPianoKeyId[degree]
		if (isNil(pianoKeyId)) {
			throw new Error(`Degree ${degree} not found in scale`)
		}
		return pianoKeyId
	}

	/**
	 * 获取指定度数的变音值
	 * @param degree 度数（1-7）
	 * @returns 变音值（0=自然, 1=#, -1=b）
	 */
	public getAlterByDegree(degree: number): number {
		return this.scale.degreeAlterationsMap[degree] ?? 0
	}

	// ========== 通过 classFn 实现的方法 ==========

	/**
	 * 获取根音的 Note 实例
	 * @returns Note 实例
	 */
	public getRootNote() {
		return cls_getRootNote(this)
	}

	/**
	 * 获取指定度数的 Note 实例
	 * @param degree 度数（1-7）
	 * @returns Note 实例
	 */
	public getNoteByDegree(degree: number) {
		return cls_getNoteByDegree(this, degree)
	}

	/**
	 * 获取指定音级的顺阶三和弦
	 * @param scaleDegree 音级（1-7）
	 * @returns 匹配的和弦结果列表
	 */
	public getScaleDegreeChord3(scaleDegree: number): I_AnalyzedChordResult[] {
		return cls_getScaleDegreeChord3(this, scaleDegree)
	}

	/**
	 * 获取指定音级的顺阶七和弦
	 * @param scaleDegree 音级（1-7）
	 * @returns 匹配的和弦结果列表
	 */
	public getScaleDegreeChord7(scaleDegree: number): I_AnalyzedChordResult[] {
		return cls_getScaleDegreeChord7(this, scaleDegree)
	}

	/**
	 * 根据音级数获取音符
	 * @param num 音级数（可以是跨八度的，如 9 表示九音）
	 * @returns pianoKeyId (0-11) + octave 信息；五声调式缺音（4/7 度）时返回 null
	 */
	public getNoteByIntervalNum(num: number): { pianoKeyId: number; octave: number } | null {
		return cls_getNoteByIntervalNum(this, num)
	}
}

export default Scale
