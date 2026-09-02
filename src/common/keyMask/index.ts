/**
 * KeyMask — 12-bit 音集位模式(集合层)
 *
 * 一个音集(0-11 的钢琴键组合)编码为 12 位二进制数:bit N = 1 表示键 N 在集合中。
 * 这是 7/12 双进制体系里「12 进制集合身份」的位运算形态:
 *
 *   C 大三 {0,4,7} → bit0 + bit4 + bit7 = 0b10010001 = 145
 *
 * 核心能力(全部 O(1) 位指令,12-bit 远在 JS 32 位安全区内):
 *   - transpose = 循环移位:rotate(mask, n) 把整个音集移调 n 个半音
 *   - 子集判断:(sub & ~sup) === 0
 *   - 对称差:mask ^ other,popcount 数差异音数
 *
 * 和弦公式的「根归一化 pattern」:公式以 C(bit0)为根的 keyMask。
 * 88 个公式 pattern 互异(同根下公式→音集单射),配上 rotate 即可覆盖
 * 全部 1056 个实例——实例的音集层可以只由「pattern + 根」表达。
 */
import { values } from "es-toolkit/compat"
import { CHORD_FORMULA_META_MAP } from "@chord-formula/static/CHORD_FORMULA_META_MAP"
import type { I_ChordFormulaMeta } from "@chord-formula/static/types"

// ==================== 基础位运算 ====================

/** 音集 → 12-bit mask(bit N = 键 N) */
export const keyMaskFromIds = (ids: number[]): number =>
    ids.reduce((m, id) => m | (1 << (id % 12)), 0)

/** mask → 升序音集 */
export const idsFromKeyMask = (mask: number): number[] => {
    const ids: number[] = []
    for (let i = 0; i < 12; i++) if (mask & (1 << i)) ids.push(i)
    return ids
}

/** 循环移位(移调):整个音集 +n 个半音,mod 12 回卷 */
export const rotate = (mask: number, n: number): number => {
    const k = ((n % 12) + 12) % 12
    if (k === 0) return mask
    return ((mask << k) | (mask >>> (12 - k))) & 0xfff
}

/** 子集判断:sub 的每个音都在 sup 中 */
export const isSubsetOf = (sub: number, sup: number): boolean =>
    (sub & ~sup) === 0

/** 音数(popcount) */
export const popcount = (mask: number): number => {
    let n = mask, c = 0
    while (n) { c += n & 1; n >>>= 1 }
    return c
}

/** 规范形:12 个循环移位中的最小值(移调等价类的指纹) */
export const canonicalForm = (mask: number): number => {
    let min = mask
    for (let k = 1; k < 12; k++) min = Math.min(min, rotate(mask, k))
    return min
}

/** 对称差的音数(两音集差几个音) */
export const maskDistance = (a: number, b: number): number =>
    popcount(a ^ b)

// ==================== 公式 pattern 表 ====================

export type I_FormulaPattern = {
    chordFormulaId: string
    /** 根归一化 mask:公式以 bit0 为根的音集位模式 */
    mask: number
}

/** 88 个公式的 pattern 表(运行时从公式表推导,不落盘) */
export const FORMULA_PATTERNS: I_FormulaPattern[] = values(
    CHORD_FORMULA_META_MAP as Record<string, I_ChordFormulaMeta>,
).map(f => ({
    chordFormulaId: f.chordFormulaId,
    mask: keyMaskFromIds([0, ...f.semitonesList.map(s => s % 12)]),
}))

/** pattern → 公式 的哈希索引(88 个 pattern 互异:同根下公式→音集单射) */
export const PATTERN_INDEX: Map<number, string[]> = (() => {
    const map = new Map<number, string[]>()
    for (const p of FORMULA_PATTERNS) {
        const bucket = map.get(p.mask)
        if (bucket) bucket.push(p.chordFormulaId)
        else map.set(p.mask, [p.chordFormulaId])
    }
    return map
})()

// ==================== 转位族(移调族)查询 ====================

export type I_TransposeFamilyMember = {
    chordFormulaId: string
    /** 该结构命中的根音(解释根) */
    root: number
}

/**
 * 转位族查询:这个音集在 12 个移位中命中哪些「根归一化结构」
 *
 * 原理:输入 mask 循环移位 k 次后若等于某公式的 pattern,
 * 即「把每个音 −k 后恰好是该公式(以 0 为根)」→ 根 = (12−k) mod 12。
 * 12 次 Map 查找,等和弦天然多命中(每次移位可命中多个同 pattern 公式,
 * 多个移位可各自命中)。
 *
 * @example
 * transposeFamily([0, 4, 7])   // → [{maj3, root:0}]
 * transposeFamily([0, 4, 7, 9]) // → [{maj3add6, root:0}, {min7, root:9}](等和弦 C6/Am7)
 * transposeFamily([1, 5, 8])   // → [{maj3, root:1}](C♯ 大三,结构归一化命中)
 */
export const transposeFamily = (ids: number[]): I_TransposeFamilyMember[] => {
    const input = keyMaskFromIds(ids)
    const members: I_TransposeFamilyMember[] = []
    for (let k = 0; k < 12; k++) {
        const ids0 = rotate(input, k) // 整体 −k(等价于把根移回 0)
        const hits = PATTERN_INDEX.get(ids0)
        if (hits) {
            const root = (12 - k) % 12
            for (const chordFormulaId of hits) members.push({ chordFormulaId, root })
        }
    }
    return members
}
