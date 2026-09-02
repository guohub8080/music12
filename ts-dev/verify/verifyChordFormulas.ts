// @ts-nocheck
// ↑ 暂时压制 VS Code 的 TS2591(找不到 fs/path 等 Node 内置模块)。
// 命令行 npx tsc --noEmit 为 0 错误,@types/node 已装且 ts-dev 已入 tsconfig include,
// 该红线源于 VS Code 语言服务的项目归属缓存,不影响运行与 CI。
// 根治:Reload Window / 确认 VS Code 打开的是仓库根目录 / 切换 TS 为工作区版本。
/**
 * chord-formulas.json5 展开验证器(独立第二重验证)
 *
 * 与生成脚本完全独立:从磁盘读 json5 源 → json5 包解析(真实编译器视角)
 * → 本文件自带展开实现(按头部注释契约) → 回填全部派生字段
 * → 与 static-data/chord-formulas.json 逐字段全等比对(tags 用 src 的 deriveTags 对拍)。
 *
 * 运行: npx tsx ts-dev/verify/verifyChordFormulas.ts
 */
import { isNil, isNotNil } from 'es-toolkit/predicate'
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import JSON5 from "json5";
import { deriveTags } from "../../src/ChordFormula/static/deriveTags";
import type { T_IntervalType } from "../../src/common/static/INTERVAL_TYPES";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "../..");

// ---- 载入:源(json5,带注释) 与 产物(标准 json) ----
const srcText = readFileSync(resolve(ROOT, "ts-dev/raw-static/chord-formulas.json5"), "utf-8");
const src = JSON5.parse(srcText) as Record<string, any>;
const dst = JSON.parse(
    readFileSync(resolve(ROOT, "static-data/chord-formulas.json"), "utf-8"),
) as Record<string, any>;

let pass = 0, fail = 0;
const errors: string[] = [];
const check = (ok: boolean, msg: string) => {
    if (ok) pass++;
    else { fail++; errors.push(msg); }
};

// ---- 展开:$base 递归 → $set → $add → 度数升序(契约见源文件头部注释) ----
function expand(cid: string, trail: string[] = []): [string, number][] {
    if (trail.includes(cid)) throw new Error(`基座环: ${[...trail, cid].join(" → ")}`);
    const f = src[cid];
    if (!f) throw new Error(`引用不存在的公式: ${cid}`);
    let list: [string, number][];
    if (isNotNil(f.$base)) {
        list = expand(f.$base, [...trail, cid]);
        if (f.$set) {
            list = list.map(([t, n]) => [f.$set[String(n)] ?? t, n] as [string, number]);
        }
        if (f.$add) list = [...list, ...f.$add];
        list = [...list].sort((a, b) => a[1] - b[1]);
    } else {
        list = f.intervalList;
    }
    return list;
}

// ---- 复合音程半音:同型简单度数 + 12×八度数 ----
const SIMPLE_GAP: Record<string, number> = (() => {
    const ivs = JSON.parse(readFileSync(resolve(ROOT, "static-data/intervals.json"), "utf-8"));
    const m: Record<string, number> = {};
    for (const i of ivs) m[`${i.type}/${i.num}`] = i.semitoneGap;
    return m;
})();
const gap = (t: string, N: number) =>
    SIMPLE_GAP[`${t}/${((N - 1) % 7) + 1}`] + 12 * Math.floor((N - 1) / 7);

// ---- 逐条:展开 + 派生回填,与产物全等 ----
check(Object.keys(src).length === 88, `源公式数 ${Object.keys(src).length} ≠ 88`);
check(Object.keys(dst).length === 88, `产物公式数 ${Object.keys(dst).length} ≠ 88`);

for (const cid of Object.keys(dst)) {
    const expect = dst[cid];
    const got = src[cid];
    check(isNotNil(got), `源缺公式 ${cid}`);

    // 1. intervalList 展开等价
    let expanded: [string, number][];
    try {
        expanded = expand(cid);
    } catch (e) {
        check(false, `${cid} 展开失败: ${(e as Error).message}`);
        continue;
    }
    check(
        JSON.stringify(expanded) === JSON.stringify(expect.intervalList),
        `${cid} intervalList 展开不符:\n    展开=${JSON.stringify(expanded)}\n    产物=${JSON.stringify(expect.intervalList)}`,
    );

    // 2. 派生回填:semitonesList / notesNum / degreeToIntervalMap
    check(
        JSON.stringify(expanded.map(([t, n]) => gap(t, n))) === JSON.stringify(expect.semitonesList),
        `${cid} semitonesList 回填不符`,
    );
    check(expanded.length + 1 === expect.notesNum, `${cid} notesNum 回填不符`);
    const map: Record<string, string> = {};
    for (const [t, n] of expanded) map[String(n)] = t;
    check(JSON.stringify(map) === JSON.stringify(expect.degreeToIntervalMap),
        `${cid} degreeToIntervalMap 回填不符`);

    // 3. tags:用 src 的 deriveTags(真实注入器)对拍
    check(
        JSON.stringify(deriveTags(expanded as [T_IntervalType, number][])) === JSON.stringify(expect.tags),
        `${cid} tags 不符:\n    derive=${JSON.stringify(deriveTags(expanded as [T_IntervalType, number][]))}\n    产物=${JSON.stringify(expect.tags)}`,
    );

    // 4. 三名等价
    check(got.cnName === expect.cnName && got.name === expect.name, `${cid} 名称不符`);
    check((got.scoreDisplay ?? "") === (expect.scoreDisplay ?? ""), `${cid} scoreDisplay 不符`);
}

// ---- 结构契约:完整根恰好 6 个;$set 全部同名前缀 ----
const fullRoots = Object.keys(src).filter(c => isNotNil(src[c].intervalList)).sort();
check(
    JSON.stringify(fullRoots) === JSON.stringify(["aug3", "dim3", "maj3", "min3", "sus2", "sus4"]),
    `完整根应为 6 个基础三和弦/挂留,实际: ${fullRoots.join(",")}`,
);
for (const cid of Object.keys(src)) {
    if (src[cid].$set) {
        check(cid.startsWith(src[cid].$base), `${cid} 跨 id 使用 $set(基座 ${src[cid].$base})`);
    }
}

console.log("=== chord-formulas.json5 展开验证(独立实现 + json5 包解析) ===");
console.log(`公式数: 88 | 断言: ${pass + fail} 通过: ${pass} 失败: ${fail}`);
if (fail > 0) {
    console.log("\n失败明细(前 20 条):");
    for (const e of errors.slice(0, 20)) console.log(`  ✗ ${e}`);
    process.exit(1);
}
console.log("全部一致 ✓ 源(极简+基座) → 展开+派生回填 → 与产物逐字段等价,tags 与 deriveTags 对拍通过");
