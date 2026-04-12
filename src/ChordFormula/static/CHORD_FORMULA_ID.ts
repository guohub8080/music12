/**
 * 和弦公式 ID
 *
 * 此文件定义所有可用的和弦公式 ID
 * 与 CHORD_FORMULA_META_MAP 的键保持一致
 */

// ========== 三和弦 ==========
export const MAJ3 = "maj3"
export const MIN3 = "min3"
export const DIM3 = "dim3"
export const AUG3 = "aug3"
export const MAJ3_FLAT5 = "maj3b5"

// ========== 三和弦扩展 ==========
export const MAJ3_ADD6 = "maj3add6"
export const MIN3_ADD6 = "min3add6"
export const MAJ3_ADD6_ADD9 = "maj3add6add9"
export const MIN3_ADD6_ADD9 = "min3add6add9"
export const MAJ3_ADD9 = "maj3add9"
export const MAJ3_ADD11 = "maj3add11"
export const MIN3_ADD9 = "min3add9"
export const MIN3_ADD11 = "min3add11"

// ========== 七和弦 add 扩展 ==========
export const MAJ7_ADD11 = "maj7add11"
export const DOM7_ADD6 = "dom7add6"

// ========== 基础七和弦 ==========
export const MAJ7 = "maj7"
export const DOM7 = "dom7"
export const MIN7 = "min7"
export const HALFDIM7 = "halfdim7"
export const DIM7 = "dim7"
export const MIN_MAJ7 = "minmaj7"

// ========== 挂留和弦 ==========
export const SUS2 = "sus2"
export const SUS4 = "sus4"
export const DOM7_SUS2 = "dom7sus2"
export const DOM7_SUS4 = "dom7sus4"
export const DOM7_SUS4_FLAT9 = "dom7sus4b9"
export const MAJ7_SUS2 = "maj7sus2"
export const MAJ7_SUS4 = "maj7sus4"
export const DOM9_SUS4 = "dom9sus4"
export const MAJ9_SUS4 = "maj9sus4"
export const DOM13_SUS4 = "dom13sus4"
export const MAJ13_SUS4 = "maj13sus4"
export const MAJ13_SUS2 = "maj13sus2"

// ========== 基础九和弦 ==========
export const MAJ9 = "maj9"
export const DOM9 = "dom9"
export const MIN9 = "min9"
export const MIN_MAJ9 = "minmaj9"

// ========== 属九变音 ==========
export const DOM9_SHARP5 = "dom9#5"
export const DOM9_SHARP11 = "dom9#11"
export const DOM9_FLAT13 = "dom9b13"
export const DOM9_ADD13 = "dom9add13"

// ========== 大九变音 ==========
export const MAJ9_FLAT5 = "maj9b5"
export const MAJ9_SHARP5 = "maj9#5"
export const MAJ9_SHARP11 = "maj9#11"
export const MAJ9_FLAT13 = "maj9b13"

// ========== 小九变音 ==========
export const MIN9_FLAT5 = "min9b5"

// ========== 基础十一和弦 ==========
export const MAJ11 = "maj11"
export const DOM11 = "dom11"
export const MIN11 = "min11"
export const MIN_MAJ11 = "minmaj11"

// ========== 属十一变音 ==========
export const DOM11_FLAT5 = "dom11b5"
export const DOM11_SHARP5 = "dom11#5"
export const DOM11_FLAT9 = "dom11b9"
export const DOM11_SHARP9 = "dom11#9"
export const DOM11_FLAT13 = "dom11b13"

// ========== 小十一变音 ==========
export const MIN11_FLAT5 = "min11b5"

// ========== 基础十三和弦 ==========
export const MAJ13 = "maj13"
export const DOM13 = "dom13"
export const MIN13 = "min13"
export const MIN_MAJ13 = "minmaj13"

// ========== 属十三变音 ==========
export const DOM13_FLAT5 = "dom13b5"
export const DOM13_SHARP5 = "dom13#5"
export const DOM13_FLAT9 = "dom13b9"
export const DOM13_SHARP9 = "dom13#9"
export const DOM13_SHARP11 = "dom13#11"

// ========== 大十三变音 ==========
export const MAJ13_FLAT5 = "maj13b5"
export const MAJ13_SHARP5 = "maj13#5"
export const MAJ13_FLAT9 = "maj13b9"
export const MAJ13_SHARP11 = "maj13#11"

// ========== 属七变音 ==========
export const DOM7_SHARP5 = "dom7#5"
export const AUG7 = "augmaj7"
export const DOM7_FLAT5 = "dom7b5"
export const DOM7_FLAT9 = "dom7b9"
export const DOM7_SHARP9 = "dom7#9"
export const DOM7_SHARP11 = "dom7#11"
export const DOM7_FLAT13 = "dom7b13"
export const DOM7_FLAT5_FLAT9 = "dom7b5b9"
export const DOM7_FLAT5_SHARP9 = "dom7b5#9"
export const DOM7_SHARP5_FLAT9 = "dom7#5b9"
export const DOM7_SHARP5_SHARP9 = "dom7#5#9"

// ========== 大七变音 ==========
export const MAJ7_FLAT5 = "maj7b5"
export const MAJ7_FLAT9 = "maj7b9"
export const MAJ7_FLAT13 = "maj7b13"
export const MAJ7_SHARP11 = "maj7#11"

// ========== 小七变音 ==========
export const MIN7_SHARP5 = "min7#5"
export const MIN_MAJ7_FLAT5 = "minmaj7b5"
export const MIN_MAJ7_SHARP5 = "minmaj7#5"

/**
 * 和弦公式 ID 映射表
 * 提供 chordFormulaId -> chordFormulaId 的恒等映射
 */
export const CHORD_FORMULA_ID = {
  [MAJ3]: MAJ3,
  [MIN3]: MIN3,
  [DIM3]: DIM3,
  [AUG3]: AUG3,
  [MAJ3_FLAT5]: MAJ3_FLAT5,
  [MAJ3_ADD6]: MAJ3_ADD6,
  [MIN3_ADD6]: MIN3_ADD6,
  [MAJ3_ADD6_ADD9]: MAJ3_ADD6_ADD9,
  [MIN3_ADD6_ADD9]: MIN3_ADD6_ADD9,
  [MAJ3_ADD9]: MAJ3_ADD9,
  [MAJ3_ADD11]: MAJ3_ADD11,
  [MIN3_ADD9]: MIN3_ADD9,
  [MIN3_ADD11]: MIN3_ADD11,
  [MAJ7_ADD11]: MAJ7_ADD11,
  [DOM7_ADD6]: DOM7_ADD6,
  [MAJ7]: MAJ7,
  [DOM7]: DOM7,
  [MIN7]: MIN7,
  [HALFDIM7]: HALFDIM7,
  [DIM7]: DIM7,
  [MIN_MAJ7]: MIN_MAJ7,
  [SUS2]: SUS2,
  [SUS4]: SUS4,
  [DOM7_SUS2]: DOM7_SUS2,
  [DOM7_SUS4]: DOM7_SUS4,
  [DOM7_SUS4_FLAT9]: DOM7_SUS4_FLAT9,
  [MAJ7_SUS2]: MAJ7_SUS2,
  [MAJ7_SUS4]: MAJ7_SUS4,
  [DOM9_SUS4]: DOM9_SUS4,
  [MAJ9_SUS4]: MAJ9_SUS4,
  [DOM13_SUS4]: DOM13_SUS4,
  [MAJ13_SUS4]: MAJ13_SUS4,
  [MAJ13_SUS2]: MAJ13_SUS2,
  [MAJ9]: MAJ9,
  [DOM9]: DOM9,
  [MIN9]: MIN9,
  [MIN_MAJ9]: MIN_MAJ9,
  [DOM9_SHARP5]: DOM9_SHARP5,
  [DOM9_SHARP11]: DOM9_SHARP11,
  [DOM9_FLAT13]: DOM9_FLAT13,
  [DOM9_ADD13]: DOM9_ADD13,
  [MAJ9_FLAT5]: MAJ9_FLAT5,
  [MAJ9_SHARP5]: MAJ9_SHARP5,
  [MAJ9_SHARP11]: MAJ9_SHARP11,
  [MAJ9_FLAT13]: MAJ9_FLAT13,
  [MIN9_FLAT5]: MIN9_FLAT5,
  [MAJ11]: MAJ11,
  [DOM11]: DOM11,
  [MIN11]: MIN11,
  [MIN_MAJ11]: MIN_MAJ11,
  [DOM11_FLAT5]: DOM11_FLAT5,
  [DOM11_SHARP5]: DOM11_SHARP5,
  [DOM11_FLAT9]: DOM11_FLAT9,
  [DOM11_SHARP9]: DOM11_SHARP9,
  [DOM11_FLAT13]: DOM11_FLAT13,
  [MIN11_FLAT5]: MIN11_FLAT5,
  [MAJ13]: MAJ13,
  [DOM13]: DOM13,
  [MIN13]: MIN13,
  [MIN_MAJ13]: MIN_MAJ13,
  [DOM13_FLAT5]: DOM13_FLAT5,
  [DOM13_SHARP5]: DOM13_SHARP5,
  [DOM13_FLAT9]: DOM13_FLAT9,
  [DOM13_SHARP9]: DOM13_SHARP9,
  [DOM13_SHARP11]: DOM13_SHARP11,
  [MAJ13_FLAT5]: MAJ13_FLAT5,
  [MAJ13_SHARP5]: MAJ13_SHARP5,
  [MAJ13_FLAT9]: MAJ13_FLAT9,
  [MAJ13_SHARP11]: MAJ13_SHARP11,
  [DOM7_SHARP5]: DOM7_SHARP5,
  [AUG7]: AUG7,
  [DOM7_FLAT5]: DOM7_FLAT5,
  [DOM7_FLAT9]: DOM7_FLAT9,
  [DOM7_SHARP9]: DOM7_SHARP9,
  [DOM7_SHARP11]: DOM7_SHARP11,
  [DOM7_FLAT13]: DOM7_FLAT13,
  [DOM7_FLAT5_FLAT9]: DOM7_FLAT5_FLAT9,
  [DOM7_FLAT5_SHARP9]: DOM7_FLAT5_SHARP9,
  [DOM7_SHARP5_FLAT9]: DOM7_SHARP5_FLAT9,
  [DOM7_SHARP5_SHARP9]: DOM7_SHARP5_SHARP9,
  [MAJ7_FLAT5]: MAJ7_FLAT5,
  [MAJ7_FLAT9]: MAJ7_FLAT9,
  [MAJ7_FLAT13]: MAJ7_FLAT13,
  [MAJ7_SHARP11]: MAJ7_SHARP11,
  [MIN7_SHARP5]: MIN7_SHARP5,
  [MIN_MAJ7_FLAT5]: MIN_MAJ7_FLAT5,
  [MIN_MAJ7_SHARP5]: MIN_MAJ7_SHARP5,
}

export type T_ChordFormulaID = keyof typeof CHORD_FORMULA_ID

export default CHORD_FORMULA_ID
