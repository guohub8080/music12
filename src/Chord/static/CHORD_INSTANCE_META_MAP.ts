/**
 * 按 chordFormulaId 索引的映射表
 *
 * monorepo 重构:数据已移至 shared/data/chord-instances.json
 * 此文件保留为转发层,消费方 import 路径不变。
 */
import { CHORD_INSTANCE_META_MAP } from "../../data-loader"
import type { I_ChordInstanceMeta } from "./types"

export default CHORD_INSTANCE_META_MAP as Record<string, I_ChordInstanceMeta[]>
