/**
 * music12 数据生成器入口
 *
 * 跑一次,产出所有共享 JSON 到 shared/data/:
 *   notes.json          (35 条)  音符元数据
 *   intervals.json      (39 条)  音程元数据
 *   fifth.json          (42 条)  五度圈元数据
 *   chord-formulas.json (87 条)  和弦公式定义
 *   scale-modes.json    (44 条)  调式定义
 *   chord-instances.json(1056 条) 和弦实例(生成器算出)
 *   scale-instances.json(528 条)  音阶实例(生成器算出)
 *
 * 运行: npx tsx ts-dev/music12-gen/src/index.ts
 *
 * 这是 monorepo 的「单一真相源」:
 *   TS 版和 C++ 版都读这里产出的 JSON,数据永远一致。
 */
import { writeFileSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = resolve(__dirname, "../../../shared/data");

mkdirSync(OUT_DIR, { recursive: true });

function writeJson(name: string, data: unknown) {
    const path = resolve(OUT_DIR, name);
    writeFileSync(path, JSON.stringify(data, null, 2) + "\n", "utf-8");
    const count = Array.isArray(data)
        ? data.length
        : typeof data === "object" && data !== null
            ? Object.keys(data).length
            : 1;
    console.log(`  ✓ ${name} (${count} 条)`);
}

console.log("=== music12 数据生成器 ===");
console.log(`输出目录: ${OUT_DIR}\n`);

// 同步 import(CJS 模式不支持 top-level await)
import { exportNotes, exportIntervals, exportFifth } from "./exportBaseMeta";
import { exportChordFormulas } from "./exportChordFormulas";
import { exportScaleModes } from "./exportScaleModes";
import { exportChordInstances } from "./generateChordInstances";
import { exportScaleInstances } from "./generateScaleInstances";

console.log("[1/3] 基础元数据...");
writeJson("notes.json", exportNotes());
writeJson("intervals.json", exportIntervals());
writeJson("fifth.json", exportFifth());

console.log("\n[2/3] 定义表...");
writeJson("chord-formulas.json", exportChordFormulas());
writeJson("scale-modes.json", exportScaleModes());

console.log("\n[3/3] 派生实例表(用乐理类计算,耗时几秒)...");
writeJson("chord-instances.json", exportChordInstances());
writeJson("scale-instances.json", exportScaleInstances());

console.log("\n✅ 全部完成。JSON 已写入 shared/data/");
