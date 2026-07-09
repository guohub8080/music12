/**
 * CircleOfFifths 五度圈类
 *
 * 五度圈是一个展示调性关系的圆形图，相邻的调相差纯五度。
 * 继承自 Base12Radix，使用十二进制表示五度圈位置。
 *
 * 五度圈移动方向：
 * - move(+1)：顺时针移动，增加一个升号（或减少一个降号）
 * - move(-1)：逆时针移动，增加一个降号（或减少一个升号）
 *
 * circleID 与调性对照表（部分位置有等音异名）：
 * ```
 *   ID    大调              小调              调号
 *   0     C                 a                 无
 *   1     G                 e                 1#
 *   2     D                 b                 2#
 *   3     A                 f#                3#
 *   4     E                 c#                4#
 *   5     B, Cb             g#, ab            5# / 7b
 *   6     F#, Gb            d#, eb            6# / 6b
 *   7     Db, C#            bb, a#            5b / 7#
 *   8     Ab                f                 4b
 *   9     Eb                g                 3b
 *   10    Bb                d                 2b
 *   11    F                 c                 1b
 * ```
 *
 * 注：circleID=-1 表示超出常用范围的调性（如 8#、9# 等）
 *
 * @example
 * // 创建五度圈位置
 * const c = new CircleOfFifths(0)   // C 大调 / a 小调
 * const g = new CircleOfFifths(1)   // G 大调 / e 小调（1 个升号）
 *
 * // 在五度圈上移动
 * c.move(1)   // 移动到 G（1 个升号），circleID=1
 * c.move(-1)  // 移动到 F（1 个降号），circleID=11
 *
 * // 获取调性信息
 * c.majCircle  // C 大调信息
 * c.minCircle  // a 小调信息
 */

import { isNil } from 'es-toolkit'
import { isInteger } from 'es-toolkit/compat'
import {Base12Radix} from "@common/radix";
import FIFTH_META from "../static/FIFTH_META";
import {CircleOfFifthsError} from "@common/processError/errorTypes";

export class CircleOfFifths extends Base12Radix {

	/**
	 * 构造函数
	 *
	 * @param i 五度圈位置（0-11），默认为 0（C 大调 / a 小调）
	 * @throws CircleOfFifthsError 如果参数不是整数
	 *
	 * @example
	 * new CircleOfFifths()    // C 大调位置
	 * new CircleOfFifths(0)   // C 大调位置
	 * new CircleOfFifths(1)   // G 大调位置（1 个升号）
	 * new CircleOfFifths(2)   // D 大调位置（2 个升号）
	 * new CircleOfFifths(11)  // F 大调位置（1 个降号）
	 */
	constructor(i: number = 0) {
		if (!isInteger(i)) throw new CircleOfFifthsError("Value must be an integer.")
		super(i);
	}

	/**
	 * 获取该位置的大调信息
	 *
	 * 返回五度圈上该位置对应的大调信息，包含主音、调号等元数据。
	 *
	 * @returns 大调信息数组
	 *
	 * @example
	 * const c = new CircleOfFifths(0)
	 * c.majCircle  // [{step: 'C', alter: 0, mode: 'major', ...}]
	 *
	 * const g = new CircleOfFifths(1)
	 * g.majCircle  // [{step: 'G', alter: 0, mode: 'major', staveAlters: 1, ...}]
	 */
	public get majCircle() {
		return FIFTH_META.where("circleID", ">=", 0).where("circleID", "<=", 12)
			.where("mode", "major").where("circleID", this.location).all()
	}

	/**
	 * 获取该位置的小调信息
	 *
	 * 返回五度圈上该位置对应的小调（关系小调）信息。
	 *
	 * @returns 小调信息数组
	 *
	 * @example
	 * const c = new CircleOfFifths(0)
	 * c.minCircle  // [{step: 'A', alter: 0, mode: 'minor', ...}] (a 小调)
	 */
	public get minCircle() {
		return FIFTH_META.where("circleID", ">=", 0).where("circleID", "<=", 12)
			.where("mode", "minor").where("circleID", this.location).all()
	}

	/**
	 * 获取五度圈位置（0-11）
	 *
	 * 位置代表在五度圈上的绝对位置：
	 * - 0: C 大调 / a 小调（无调号）
	 * - 1: G 大调 / e 小调（1#）
	 * - 2: D 大调 / b 小调（2#）
	 * - 11: F 大调 / d 小调（1b）
	 * - 等等...
	 *
	 * @returns 五度圈位置（0-11）
	 */
	public get location(): number {
		return this.digitPair[1]
	}

	/**
	 * 获取八度圈数
	 *
	 * 表示绕五度圈转了多少圈。每 12 步为 1 圈。
	 *
	 * @returns 圈数
	 */
	public get circleNumber(): number {
		return this.digitPair[0]
	}

	/**
	 * 在五度圈上移动
	 *
	 * 正数表示顺时针移动（增加升号），负数表示逆时针移动（增加降号）。
	 *
	 * @param num 移动步数（正数=顺时针/升号，负数=逆时针/降号）
	 * @returns 新的 CircleOfFifths 实例
	 * @throws CircleOfFifthsError 如果参数不是整数
	 *
	 * @example
	 * const c = new CircleOfFifths(0)
	 *
	 * // 顺时针移动 1 步（加 1 个升号）→ G 大调
	 * c.move(1)  // CircleOfFifths(1)
	 *
	 * // 逆时针移动 1 步（加 1 个降号）→ F 大调
	 * c.move(-1)  // CircleOfFifths(11)
	 *
	 * // 移动 2 步（加 2 个升号）→ D 大调
	 * c.move(2)  // CircleOfFifths(2)
	 */
	public move(num: number): CircleOfFifths {
		if (!isInteger(num)) throw new CircleOfFifthsError("Value must be an integer.")
		if (num === 0) return this
		return new CircleOfFifths(this.base10 + num)
	}

	/**
	 * 获取当前位置的所有调性信息
	 *
	 * 返回五度圈上该位置的所有调性（大调和小调）信息。
	 *
	 * @returns 调性信息数组
	 *
	 * @example
	 * const c = new CircleOfFifths(0)
	 * c.current  // [C 大调信息, a 小调信息]
	 */
	public get current() {
		return FIFTH_META.where("circleID", ">=", 0).where("circleID", "<=", 12)
			.where("circleID", this.location).all()
	}

	/**
	 * 升号顺序的音名列表（按添加顺序）
	 *
	 * 五线谱上，升号按 F → C → G → D → A → E → B 的顺序添加。
	 * 这对应于五度圈上从位置 11(F) 开始，顺时针移动。
	 */
	static readonly SHARP_ORDER = ["F", "C", "G", "D", "A", "E", "B"] as const

	/**
	 * 降号顺序的音名列表（按添加顺序）
	 *
	 * 五线谱上，降号按 B → E → A → D → G → C → F 的顺序添加。
	 * 这对应于五度圈上从位置 10(Bb) 开始，逆时针移动。
	 *
	 * 注意：这是音名顺序，不是实际的五度圈 circleID 线性序列。
	 * 降号调的 circleID 顺序是：11 → 10 → 8 → 6 → 7 → 5 → 3（非连续）
	 */
	static readonly FLAT_ORDER = ["B", "E", "A", "D", "G", "C", "F"] as const

	/**
	 * 获取指定 circleID 位置的正常大调主音（非等音替换）
	 *
	 * 这是一个静态辅助方法，用于根据五度圈位置获取对应大调的主音音名。
	 *
	 * @param circleID 五度圈位置（0-11）
	 * @returns 大调主音音名（如 'C', 'G', 'F' 等）
	 * @throws CircleOfFifthsError 如果找不到匹配的调性
	 *
	 * @example
	 * CircleOfFifths.getNormalMajorStep(0)   // 'C' (位置 0 = C 大调)
	 * CircleOfFifths.getNormalMajorStep(1)   // 'G' (位置 1 = G 大调)
	 * CircleOfFifths.getNormalMajorStep(11)  // 'F' (位置 11 = F 大调)
	 */
	static getNormalMajorStep(circleID: number): string {
		const result = FIFTH_META
			.where("circleID", ">=", 0)
			.where("circleID", "<=", 12)
			.where("mode", "major")
			.where("circleID", circleID)
			.where("isTonicNormal", true)
			.first()

		if (isNil(result)) {
			throw new CircleOfFifthsError(`No normal major scale found at circleID ${circleID}`)
		}

		return result.actualNoteStep
	}
}
