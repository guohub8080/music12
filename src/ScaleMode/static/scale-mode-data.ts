/**
 * ScaleMode 模块数据加载器
 *
 * 只读 scale-modes.json(48KB)。
 */
import scaleModesJson from "../../../shared/data/scale-modes.json";

export const SCALE_MODE_META_MAP = scaleModesJson as Record<string, any>;
