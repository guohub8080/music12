/**
 * music12 数据生产入口(pnpm gen:static-data)
 *
 * 产出 static-data/ 全部 7 个 JSON,分两路:
 *   [编译] 6 个定义表 ← ts-dev/raw-static/*.json5 极简源(compileStaticData 展开)
 *     notes(35) / intervals(39) / fifth(42) / chord-formulas(88)
 *     / scale-modes(46) / pcset-formulas(Forte 分类)
 *   [生成] 2 个表 ← 用 src 乐理类实时计算
 *     chord-instances(1056=88×12) / scale-instances(720=60×12)
 *     / scale-instances-major-minor(24=大小调×12,常用切片)
 *
 * 单一真相源:json5 源 + 生成器逻辑;消费方只读这里产出的 JSON(C++ 双实现暂缓,存档 git 历史)。
 * 产物幂等:重跑后 git diff 必须为零(验证兜底:ts-dev/verify/*)。
 */
import { isNil, isNotNil } from 'es-toolkit/predicate'
import { writeFileSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { compileAll, serialize } from "./compileStaticData";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = resolve(__dirname, "../static-data");

mkdirSync(OUT_DIR, { recursive: true });

function writeJson(name: string, data: unknown) {
    const path = resolve(OUT_DIR, name);
    // 紧凑序列化(同编译器):≤80 字符的数组(intervalList/pianoKeyIds 等)单行
    writeFileSync(path, serialize(data), "utf-8");
    const count = Array.isArray(data)
        ? data.length
        : (isNotNil(data) && typeof data === "object")
            ? Object.keys(data as Record<string, unknown>).length
            : 1;
    console.log(`  ✓ ${name} (${count} 条)`);
}

/** 数据生产主流程(供 build-all 函数式调用与直接执行共用) */
export const generateAll = () => {
  console.log("=== music12 数据生产(编译 + 生成) ===");
  console.log(`输出目录: ${OUT_DIR}\n`);

  console.log("[1/2] 定义表编译(json5 源 → 产物)...");
  compileAll(true);

  console.log("\n[2/2] 生成表(实例表用乐理类计算)...");
  // 动态 require:必须在 compileAll 写盘之后加载 src 模块——
  // 静态 import 会被提升到编译之前执行,读到旧的 chord-formulas.json(时序坑实测)
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { exportChordInstances } = require("./generateChordInstances");
  const { exportScaleInstances, exportMajorMinorScaleInstances } = require("./generateScaleInstances");

  writeJson("chord-instances.json", exportChordInstances());
  writeJson("scale-instances.json", exportScaleInstances());
  writeJson("scale-instances-major-minor.json", exportMajorMinorScaleInstances());

  console.log("\n✅ 全部完成。JSON 已写入 static-data/");
}

generateAll()
