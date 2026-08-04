/**
 * 所有和弦实例元数据聚合(1044 条 = 87 公式 × 12 根音)
 *
 * monorepo 重构:数据已移至 shared/data/chord-instances.json
 * 此文件保留为转发层,消费方 import 路径不变。
 */
import { ALL_CHORD_INSTANCE_META } from "../../data-loader"
import type { I_ChordInstanceMeta } from "./types"

export default ALL_CHORD_INSTANCE_META as I_ChordInstanceMeta[]
