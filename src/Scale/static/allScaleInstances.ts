/**
 * 调式实例聚合数据(720 条 = 60 调式 × 12 主音)
 *
 * 数据来自 static-data/scale-instances.json(2.3MB)
 * 通过 scale-instance-data.ts 独立加载。
 */
export type { I_ScaleInstance } from "./scale-instance-data"
export { getScaleInstance } from "./scale-instance-data"
export { default } from "./scale-instance-data"
