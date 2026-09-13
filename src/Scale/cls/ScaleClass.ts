import { isNil, isNotNil } from "es-toolkit/predicate";
import { defaultTo, values } from "es-toolkit/compat";
import { getNoteByPianoKeyId } from "@note"
import type { Note } from "@note/cls/NoteClass"
import { Interval } from "@interval"
import { getScaleInstance, type I_ScaleInstance } from "../../Scale/static/allScaleInstances"
import type { I_ScaleModeMeta } from "@scale-mode/static/types"
import type { T_ScaleModeId } from "../../Scale/static/scaleModeTypes"

// 类方法导入（非简单内联的）
import cls_getRootNote from "./classFn/cls_getRootNote"
import cls_getNoteByDegree from "./classFn/cls_getNoteByDegree"
import cls_getScaleDegreeChord3 from "./classFn/cls_getScaleDegreeChord3"
import cls_getScaleDegreeChord7 from "./classFn/cls_getScaleDegreeChord7"
import cls_getNoteByIntervalNum from "./classFn/cls_getNoteByIntervalNum"
import type { I_ChordFindResult } from "@find/findChord"

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

	/** 度数到钢琴键 ID 的映射(五声缺度为 null) */
	public get degreeToPianoKeyId(): Record<number, number | null> {
		return this.scale.degreeToPianoKeyId
	}

	/** 钢琴键 ID 到度数的映射(五声缺度为 null) */
	public get pianoKeyIdToDegree(): Record<number, number | null> {
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

	// modeDescription getter 已随 description 字段移除(数据源注释承载,零核心消费)

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

	/**
	 * 调号升降号代数和（mtkit 对照补齐,2026-09-12）
	 *
	 * 按根音拼写逐度取实际 Note 的变音累计（根音计一次）：C 大调 0、
	 * C♯ 大调 7、D♭ 大调 -5、C 小调 -3——同模式不同根拼写调号不同。
	 * 升号根音加重升可自然超 ±7（合法值,消费端自行取舍）。
	 */
	public get alterSum(): number {
		return this.getAlterInfo().alterSum
	}

	/**
	 * 升降号方向计数（mtkit 对照补齐）：升号音 +1、降号音 -1 累计（不计重数）。
	 * 与 alterSum 是两个不同字段。
	 */
	public get alterTimesSum(): number {
		return this.getAlterInfo().alterTimesSum
	}

	/**
	 * 等音替换后的根音（mtkit 对照补齐）：理论调时给同键另一拼写（alterAbsLte 1）
	 * 的第一个等音；实用调返回根音本身。
	 */
	public get equalRootNote() {
		const notes = this.getSpelledNotes()
		// 拼写级判定:全部音都带变音(等音区)才给替换建议;模式级 isTonicReplaced 是另一语义
		const allAltered = notes.every(n => n.alter !== 0)
		if (!allAltered) return notes[0]
		return notes[0].getSamePitchNotes({ isSelfIncluded: false, alterAbsLte: 1 })[0]
	}

	/** 顺阶三和弦全列表（1~7 级,每级取根音优先读法；缺度跳过） */
	public get chord3OfDegreesList(): string[] {
		return this.getDegreeChordNames(3)
	}

	/** 顺阶七和弦全列表（1~7 级,每级取根音优先读法；缺度跳过） */
	public get chord7OfDegreesList(): string[] {
		return this.getDegreeChordNames(7)
	}

	private getDegreeChordNames(which: 3 | 7): string[] {
		const out: string[] = []
		for (let d = 1; d <= 7; d++) {
			// 五声缺度直接跳过( getPianoKeyIdByDegree 对缺度抛错)
			if (isNil(this.scale.degreeToPianoKeyId[d])) continue
			const results = which === 3 ? this.getScaleDegreeChord3(d) : this.getScaleDegreeChord7(d)
			const first = results.find(r => r.pianoKeyIdRoot === this.scale.degreeToPianoKeyId[d])
			if (isNotNil(first)) out.push(first.chordName)
		}
		return out
	}

	/**
	 * 按根音拼写沿度数音程推出的实际拼写音序列(mtkit 原实现同款)。
	 * 这是 alterSum/alterTimesSum/equalRootNote 的语义基础——调号和
	 * 依赖拼写而非键位(C♯大调 7♯ 与 D♭大调 5♭ 同键集不同拼写)。
	 *
	 * 类构造自 pianoKeyId(无拼写信息),黑键根音有两个常用拼写——
	 * 取「|alterSum| 最小」的实用拼写(与五度圈实用调哲学一致):
	 * 键 1 的大调取 D♭(5♭) 而非 C♯(7♯)。
	 */
	private getSpelledNotes(): Note[] {
		const candidates = this.getRootNote()
		let best: Note[] | undefined
		let bestAbs = Number.POSITIVE_INFINITY
		for (const rootNote of candidates) {
			const notes: Note[] = [rootNote]
			let valid = true
			for (const item of this.scaleMode.intervalList) {
				if (isNil(item)) continue
				try {
					notes.push(rootNote.getNoteByInterval(new Interval(item[0], item[1])))
				} catch {
					valid = false
					break
				}
			}
			if (!valid) continue
			const abs = notes.reduce((acc, n) => acc + Math.abs(n.alter), 0)
			if (abs < bestAbs) {
				best = notes
				bestAbs = abs
			}
		}
		if (isNil(best)) throw new Error("No valid spelling for this root and mode")
		return best
	}

	private getAlterInfo(): { alterSum: number; alterTimesSum: number } {
		let alterSum = 0
		let alterTimesSum = 0
		for (const note of this.getSpelledNotes()) {
			const a = note.alter
			alterSum += a
			alterTimesSum += a > 0 ? 1 : a < 0 ? -1 : 0
		}
		return { alterSum, alterTimesSum }
	}


	// ========== 查询方法（内联） ==========

	/**
	 * 检查指定的钢琴键 ID 是否在此调式中
	 * @param pianoKeyId 钢琴键 ID (0-11)
	 * @returns 如果在调式中返回 true，否则返回 false
	 */
	public hasPianoKeyId(pianoKeyId: number): boolean {
		return isNotNil(this.scale.pianoKeyIdToDegree[pianoKeyId])
	}

	/**
	 * 获取指定钢琴键 ID 在调式中的度数
	 * @param pianoKeyId 钢琴键 ID (0-11)
	 * @returns 度数（1-7），如果不在调式中返回 null
	 */
	public getDegreeByPianoKeyId(pianoKeyId: number): number | null {
		const degree = this.scale.pianoKeyIdToDegree[pianoKeyId]
		return isNotNil(degree) ? degree : null
	}

	/**
	 * 根据钢琴键 ID 获取度数和变音值
	 * @param pianoKeyId 钢琴键 ID (0-11)
	 * @returns { degree: number, alter: number } 或 null（如果不在调式中）
	 */
	public getDegreeAndAlter(pianoKeyId: number): { degree: number; alter: number } | null {
		const degree = this.scale.pianoKeyIdToDegree[pianoKeyId]
		if (isNil(degree)) return null
		return { degree, alter: defaultTo(this.scale.degreeAlterationsMap[degree], 0) }
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
		return defaultTo(this.scale.degreeAlterationsMap[degree], 0)
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
	public getScaleDegreeChord3(scaleDegree: number): I_ChordFindResult[] {
		return cls_getScaleDegreeChord3(this, scaleDegree)
	}

	/**
	 * 获取指定音级的顺阶七和弦
	 * @param scaleDegree 音级（1-7）
	 * @returns 匹配的和弦结果列表
	 */
	public getScaleDegreeChord7(scaleDegree: number): I_ChordFindResult[] {
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
