/**
 * 大小调实例切片加载器(24 条 = NATURAL_MAJOR/NATURAL_MINOR × 12 主音)
 *
 * 数据来自 static-data/scale-instances-major-minor.json(76KB,全表的 1/30)。
 * 用户需求(2026-09-12):大小调最常用——只要大小调的消费端 import 本模块,
 * 即可避开全量表(720 条,2.3MB)的加载/解析/打包。
 *
 * 查询速度本身不是优化目标(线性扫描是微秒级,键集查询走 findByScaleHash
 * O(1));此处优化的是**加载面**:全量 allScaleInstances 是静态 import,
 * 传 scaleModeIds 过滤也躲不开整表解析,独立小表才是正解。
 */
import majorMinorJson from "@static-data/scale-instances-major-minor.json";
import type { I_ScaleInstance } from "./scale-instance-data";

const MAJOR_MINOR_INSTANCES = majorMinorJson as unknown as I_ScaleInstance[];

/** 大小调全量实例(24 条:两调 × 12 移调) */
export const ALL_MAJOR_MINOR_SCALE_META = MAJOR_MINOR_INSTANCES;

export const getMajorMinorScaleInstance = (
    rootPianoKeyId: number,
    scaleModeId: "NATURAL_MAJOR" | "NATURAL_MINOR",
): I_ScaleInstance | undefined => {
    return MAJOR_MINOR_INSTANCES.find(
        (s) => s.pianoKeyIdRoot === rootPianoKeyId && s.scaleModeId === scaleModeId,
    );
};

export default MAJOR_MINOR_INSTANCES;
