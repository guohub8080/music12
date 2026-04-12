// ========== 静态数据导出 ==========
export { default as CHORD_FORMULA_ID } from './static/CHORD_FORMULA_ID.js'
export type { I_ChordFormulaMeta, I_ChordFamily } from './static/types.js'

// ========== 类型导出 ==========
export type {
  // 基础和弦族类型
  I_Chord3Family,
  I_Chord3ExFamily,
  I_Chord7Family,
  I_Chord7AddFamily,
  I_Chord9Family,
  I_Chord11Family,
  I_Chord13Family,
  I_ChordSusFamily,
  // 变音和弦族类型
  I_Dom7AlterFamily,
  I_Maj7AlterFamily,
  I_Min7AlterFamily,
  I_Dom9AlterFamily,
  I_Maj9AlterFamily,
  I_Min9AlterFamily,
  I_Dom11AlterFamily,
  I_Min11AlterFamily,
  I_Dom13AlterFamily,
  I_Maj13AlterFamily,
} from './static/types.js'

// ========== 类导出 ==========
// 已移除 ChordFormula 类，直接使用 getChordFormulaMetaById 函数获取元数据

// ========== 工具函数导出 ==========
export { getChordFormulaMetaById } from './methods/getChordFormulaMetaById.js'

// getList 文件夹 - 获取各族的元数据列表
export { getChord3List } from './methods/getList/getChord3List.js'
export { getChord3ExList } from './methods/getList/getChord3ExList.js'
export { getChord7List } from './methods/getList/getChord7List.js'
export { getChord7AddList } from './methods/getList/getChord7AddList.js'
export { getChord9List } from './methods/getList/getChord9List.js'
export { getChord11List } from './methods/getList/getChord11List.js'
export { getChord13List } from './methods/getList/getChord13List.js'
export { getChordSusList } from './methods/getList/getChordSusList.js'
export { getDom7AlterList } from './methods/getList/getDom7AlterList.js'
export { getMaj7AlterList } from './methods/getList/getMaj7AlterList.js'
export { getMin7AlterList } from './methods/getList/getMin7AlterList.js'
export { getDom9AlterList } from './methods/getList/getDom9AlterList.js'
export { getMaj9AlterList } from './methods/getList/getMaj9AlterList.js'
export { getMin9AlterList } from './methods/getList/getMin9AlterList.js'
export { getDom11AlterList } from './methods/getList/getDom11AlterList.js'
export { getMin11AlterList } from './methods/getList/getMin11AlterList.js'
export { getDom13AlterList } from './methods/getList/getDom13AlterList.js'
export { getMaj13AlterList } from './methods/getList/getMaj13AlterList.js'
export { getAllChordFormulaMetaList } from './methods/getList/getAllChordFormulaMetaList.js'

// ========== 和弦公式元数据导出 ==========

// 三和弦族
export { MAJ3_FORMULA_META } from './static/FAMILIES/CHORD3_FORMULA_META.ts'
export { MIN3_FORMULA_META } from './static/FAMILIES/CHORD3_FORMULA_META.ts'
export { DIM3_FORMULA_META } from './static/FAMILIES/CHORD3_FORMULA_META.ts'
export { AUG3_FORMULA_META } from './static/FAMILIES/CHORD3_FORMULA_META.ts'
export { MAJ3_FLAT5_FORMULA_META } from './static/FAMILIES/CHORD3_FORMULA_META.ts'

// 三和弦扩展族
export { MAJ3_ADD6_FORMULA_META } from './static/FAMILIES/CHORD3_EX_FORMULA_META.ts'
export { MIN3_ADD6_FORMULA_META } from './static/FAMILIES/CHORD3_EX_FORMULA_META.ts'
export { MAJ3_ADD6_ADD9_FORMULA_META } from './static/FAMILIES/CHORD3_EX_FORMULA_META.ts'
export { MIN3_ADD6_ADD9_FORMULA_META } from './static/FAMILIES/CHORD3_EX_FORMULA_META.ts'
export { MAJ3_ADD9_FORMULA_META } from './static/FAMILIES/CHORD3_EX_FORMULA_META.ts'
export { MAJ3_ADD11_FORMULA_META } from './static/FAMILIES/CHORD3_EX_FORMULA_META.ts'
export { MIN3_ADD9_FORMULA_META } from './static/FAMILIES/CHORD3_EX_FORMULA_META.ts'
export { MIN3_ADD11_FORMULA_META } from './static/FAMILIES/CHORD3_EX_FORMULA_META.ts'

// 基础七和弦族
export { MAJ7_FORMULA_META } from './static/FAMILIES/CHORD7_FORMULA_META.ts'
export { DOM7_FORMULA_META } from './static/FAMILIES/CHORD7_FORMULA_META.ts'
export { MIN7_FORMULA_META } from './static/FAMILIES/CHORD7_FORMULA_META.ts'
export { HALFDIM7_FORMULA_META } from './static/FAMILIES/CHORD7_FORMULA_META.ts'
export { DIM7_FORMULA_META } from './static/FAMILIES/CHORD7_FORMULA_META.ts'
export { MIN_MAJ7_FORMULA_META } from './static/FAMILIES/CHORD7_FORMULA_META.ts'

// 七和弦add扩展族
export { MAJ7_ADD11_FORMULA_META } from './static/FAMILIES/CHORD7_ADD_FORMULA_META.ts'
export { DOM7_ADD6_FORMULA_META } from './static/FAMILIES/CHORD7_ADD_FORMULA_META.ts'

// 挂留和弦族
export { SUS2_FORMULA_META } from './static/FAMILIES/CHORD_SUS_FORMULA_META.ts'
export { SUS4_FORMULA_META } from './static/FAMILIES/CHORD_SUS_FORMULA_META.ts'
export { DOM7_SUS2_FORMULA_META } from './static/FAMILIES/CHORD_SUS_FORMULA_META.ts'
export { DOM7_SUS4_FORMULA_META } from './static/FAMILIES/CHORD_SUS_FORMULA_META.ts'
export { DOM7_SUS4_FLAT9_FORMULA_META } from './static/FAMILIES/CHORD_SUS_FORMULA_META.ts'
export { MAJ7_SUS2_FORMULA_META } from './static/FAMILIES/CHORD_SUS_FORMULA_META.ts'
export { MAJ7_SUS4_FORMULA_META } from './static/FAMILIES/CHORD_SUS_FORMULA_META.ts'
export { DOM9_SUS4_FORMULA_META } from './static/FAMILIES/CHORD_SUS_FORMULA_META.ts'
export { MAJ9_SUS4_FORMULA_META } from './static/FAMILIES/CHORD_SUS_FORMULA_META.ts'
export { DOM13_SUS4_FORMULA_META } from './static/FAMILIES/CHORD_SUS_FORMULA_META.ts'
export { MAJ13_SUS4_FORMULA_META } from './static/FAMILIES/CHORD_SUS_FORMULA_META.ts'
export { MAJ13_SUS2_FORMULA_META } from './static/FAMILIES/CHORD_SUS_FORMULA_META.ts'

// 基础九和弦族
export { MAJ9_FORMULA_META } from './static/FAMILIES/CHORD9_FORMULA_META.ts'
export { DOM9_FORMULA_META } from './static/FAMILIES/CHORD9_FORMULA_META.ts'
export { MIN9_FORMULA_META } from './static/FAMILIES/CHORD9_FORMULA_META.ts'
export { MIN_MAJ9_FORMULA_META } from './static/FAMILIES/CHORD9_FORMULA_META.ts'

// 属九变音族
export { DOM9_SHARP5_FORMULA_META } from './static/FAMILIES/DOM9_ALTER_FORMULA_META.ts'
export { DOM9_FLAT9_FORMULA_META } from './static/FAMILIES/DOM9_ALTER_FORMULA_META.ts'
export { DOM9_SHARP11_FORMULA_META } from './static/FAMILIES/DOM9_ALTER_FORMULA_META.ts'
export { DOM9_FLAT13_FORMULA_META } from './static/FAMILIES/DOM9_ALTER_FORMULA_META.ts'
export { DOM9_ADD13_FORMULA_META } from './static/FAMILIES/DOM9_ALTER_FORMULA_META.ts'

// 大九变音族
export { MAJ9_FLAT5_FORMULA_META } from './static/FAMILIES/MAJ9_ALTER_FORMULA_META.ts'
export { MAJ9_SHARP5_FORMULA_META } from './static/FAMILIES/MAJ9_ALTER_FORMULA_META.ts'
export { MAJ9_SHARP11_FORMULA_META } from './static/FAMILIES/MAJ9_ALTER_FORMULA_META.ts'
export { MAJ9_FLAT13_FORMULA_META } from './static/FAMILIES/MAJ9_ALTER_FORMULA_META.ts'

// 小九变音族
export { MIN9_FLAT5_FORMULA_META } from './static/FAMILIES/MIN9_ALTER_FORMULA_META.ts'
export { MIN9_FLAT9_FORMULA_META } from './static/FAMILIES/MIN9_ALTER_FORMULA_META.ts'

// 基础十一和弦族
export { MAJ11_FORMULA_META } from './static/FAMILIES/CHORD11_FORMULA_META.ts'
export { DOM11_FORMULA_META } from './static/FAMILIES/CHORD11_FORMULA_META.ts'
export { MIN11_FORMULA_META } from './static/FAMILIES/CHORD11_FORMULA_META.ts'
export { MIN_MAJ11_FORMULA_META } from './static/FAMILIES/CHORD11_FORMULA_META.ts'

// 属十一变音族
export { DOM11_FLAT5_FORMULA_META } from './static/FAMILIES/DOM11_ALTER_FORMULA_META.ts'
export { DOM11_SHARP5_FORMULA_META } from './static/FAMILIES/DOM11_ALTER_FORMULA_META.ts'
export { DOM11_FLAT9_FORMULA_META } from './static/FAMILIES/DOM11_ALTER_FORMULA_META.ts'
export { DOM11_SHARP9_FORMULA_META } from './static/FAMILIES/DOM11_ALTER_FORMULA_META.ts'
export { DOM11_FLAT13_FORMULA_META } from './static/FAMILIES/DOM11_ALTER_FORMULA_META.ts'

// 小十一变音族
export { MIN11_FLAT5_FORMULA_META } from './static/FAMILIES/MIN11_ALTER_FORMULA_META.ts'

// 基础十三和弦族
export { MAJ13_FORMULA_META } from './static/FAMILIES/CHORD13_FORMULA_META.ts'
export { DOM13_FORMULA_META } from './static/FAMILIES/CHORD13_FORMULA_META.ts'
export { MIN13_FORMULA_META } from './static/FAMILIES/CHORD13_FORMULA_META.ts'
export { MIN_MAJ13_FORMULA_META } from './static/FAMILIES/CHORD13_FORMULA_META.ts'

// 属十三变音族
export { DOM13_FLAT5_FORMULA_META } from './static/FAMILIES/DOM13_ALTER_FORMULA_META.ts'
export { DOM13_SHARP5_FORMULA_META } from './static/FAMILIES/DOM13_ALTER_FORMULA_META.ts'
export { DOM13_FLAT9_FORMULA_META } from './static/FAMILIES/DOM13_ALTER_FORMULA_META.ts'
export { DOM13_SHARP9_FORMULA_META } from './static/FAMILIES/DOM13_ALTER_FORMULA_META.ts'
export { DOM13_SHARP11_FORMULA_META } from './static/FAMILIES/DOM13_ALTER_FORMULA_META.ts'

// 大十三变音族
export { MAJ13_FLAT5_FORMULA_META } from './static/FAMILIES/MAJ13_ALTER_FORMULA_META.ts'
export { MAJ13_SHARP5_FORMULA_META } from './static/FAMILIES/MAJ13_ALTER_FORMULA_META.ts'
export { MAJ13_FLAT9_FORMULA_META } from './static/FAMILIES/MAJ13_ALTER_FORMULA_META.ts'
export { MAJ13_SHARP11_FORMULA_META } from './static/FAMILIES/MAJ13_ALTER_FORMULA_META.ts'

// 属七变音族
export { DOM7_SHARP5_FORMULA_META } from './static/FAMILIES/DOM7_ALTER_FORMULA_META.ts'
export { AUG7_FORMULA_META } from './static/FAMILIES/DOM7_ALTER_FORMULA_META.ts'
export { DOM7_FLAT5_FORMULA_META } from './static/FAMILIES/DOM7_ALTER_FORMULA_META.ts'
export { DOM7_FLAT9_FORMULA_META } from './static/FAMILIES/DOM7_ALTER_FORMULA_META.ts'
export { DOM7_SHARP9_FORMULA_META } from './static/FAMILIES/DOM7_ALTER_FORMULA_META.ts'
export { DOM7_SHARP11_FORMULA_META } from './static/FAMILIES/DOM7_ALTER_FORMULA_META.ts'
export { DOM7_FLAT13_FORMULA_META } from './static/FAMILIES/DOM7_ALTER_FORMULA_META.ts'
export { DOM7_FLAT5_FLAT9_FORMULA_META } from './static/FAMILIES/DOM7_ALTER_FORMULA_META.ts'
export { DOM7_FLAT5_SHARP9_FORMULA_META } from './static/FAMILIES/DOM7_ALTER_FORMULA_META.ts'
export { DOM7_SHARP5_FLAT9_FORMULA_META } from './static/FAMILIES/DOM7_ALTER_FORMULA_META.ts'
export { DOM7_SHARP5_SHARP9_FORMULA_META } from './static/FAMILIES/DOM7_ALTER_FORMULA_META.ts'

// 大七变音族
export { MAJ7_FLAT5_FORMULA_META } from './static/FAMILIES/MAJ7_ALTER_FORMULA_META.ts'
export { MAJ7_FLAT9_FORMULA_META } from './static/FAMILIES/MAJ7_ALTER_FORMULA_META.ts'
export { MAJ7_FLAT13_FORMULA_META } from './static/FAMILIES/MAJ7_ALTER_FORMULA_META.ts'
export { MAJ7_SHARP11_FORMULA_META } from './static/FAMILIES/MAJ7_ALTER_FORMULA_META.ts'

// 小七变音族
export { MIN7_SHARP5_FORMULA_META } from './static/FAMILIES/MIN7_ALTER_FORMULA_META.ts'
export { MIN_MAJ7_FLAT5_FORMULA_META } from './static/FAMILIES/MIN7_ALTER_FORMULA_META.ts'
export { MIN_MAJ7_SHARP5_FORMULA_META } from './static/FAMILIES/MIN7_ALTER_FORMULA_META.ts'
