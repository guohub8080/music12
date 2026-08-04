/**
 * CHORD_FORMULA_META_MAP — 和弦公式定义表(87 个)
 *
 * monorepo 重构:数据已移至 shared/data/chord-formulas.json
 * 此文件保留为转发层,消费方 import 路径不变。
 *
 * 注意:原文件 export 的是带类型注解的 Record,
 * 这里转发为 any,类型由消费方各自的 import type 保证。
 */
import { CHORD_FORMULA_META_MAP } from "../../data-loader"
export { CHORD_FORMULA_META_MAP }
