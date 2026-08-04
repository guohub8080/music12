/**
 * 导出调式定义表(44 个调式,39 个唯一 ID)
 *
 * 原 SCALE_MODE_META_MAP 是 Record<string, I_ScaleModeMeta>,
 * 导出为 JSON 对象。
 */
import { SCALE_MODE_META_MAP } from "../../../src/ScaleMode/static/SCALE_MODE_META_MAP";

export function exportScaleModes(): Record<string, unknown> {
    return SCALE_MODE_META_MAP as any;
}
