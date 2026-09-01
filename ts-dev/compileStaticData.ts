// @ts-nocheck
// ↑ 暂时压制 VS Code 的 TS2591(同 verify/ 目录,详见 verifyScales.ts 头部说明)。
/**
 * static-data 编译器(gen:static-data 第 0 步)
 *
 * 职责:把 ts-dev/raw-static/*.json5 源编译为 static-data/*.json 产物。
 * 各文件的展开/回填契约见对应 json5 源的头部注释。
 *
 *   pianokey.json5       → notes.json          回填 artName/mathName(由 step+alter),透传其余(含新字段 pianoKeySymbol)
 *   interval.json5       → intervals.json      透传(纯复制)
 *   fifth.json5          → fifth.json          透传(纯复制)
 *   chord-formulas.json5 → chord-formulas.json 展开 $base/$set/$add;回填 chordFormulaId/
 *                                               semitonesList/notesNum/degreeToIntervalMap/tags(deriveTags)/scoreDisplay("")
 *
 * scale-modes / chord-instances / scale-instances 无 json5 源,不在本编译器范围
 * (分别由 ts-dev 生成器产出,见 index.ts)。
 *
 * 用法:
 *   npx tsx ts-dev/compileStaticData.ts            # dry-run:编译并对比现有产物,不写盘
 *   npx tsx ts-dev/compileStaticData.ts --write    # 写盘覆盖 static-data/
 */
import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import JSON5 from "json5";
import { deriveTags } from "../src/ChordFormula/static/deriveTags";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const SRC_DIR = resolve(ROOT, "ts-dev/raw-static");
const OUT_DIR = resolve(ROOT, "static-data");
const WRITE = process.argv.includes("--write");

const readSrc = (name: string) =>
    JSON5.parse(readFileSync(resolve(SRC_DIR, name), "utf-8"));
const readDst = (name: string) =>
    readFileSync(resolve(OUT_DIR, name), "utf-8");

/**
 * 紧凑数组序列化:对象多行(2 空格缩进),≤80 字符的数组单行。
 * 避免 JSON.stringify 把 ["maj", 3] 炸成 6 行的默认行为。
 */
function pretty(value: unknown, indent: number): string {
    if (Array.isArray(value)) {
        const items = value.map(v => pretty(v, indent + 2));
        const oneLine = `[${items.join(", ")}]`;
        if (oneLine.length <= 80) return oneLine;
        const pad = " ".repeat(indent + 2);
        return `[\n${pad}${items.join(`,\n${pad}`)}\n${" ".repeat(indent)}]`;
    }
    if (typeof value === "object" && value !== null) {
        const pad = " ".repeat(indent + 2);
        const entries = Object.entries(value as Record<string, unknown>)
            .map(([k, v]) => `${pad}${JSON.stringify(k)}: ${pretty(v, indent + 2)}`);
        return `{\n${entries.join(",\n")}\n${" ".repeat(indent)}}`;
    }
    return JSON.stringify(value);
}
const serialize = (data: unknown) => pretty(data, 0) + "\n";

// ==================== pianokey → notes ====================
// 回填 artName(step + 升降符号)与 mathName(step + ("+"|"-"|"") + |alter|)
const SIGN = { 1: "♯", "-1": "♭", 2: "♯♯", "-2": "♭♭" };
function compilePianokey(): unknown[] {
    const src = readSrc("pianokey.json5") as any[];
    return src.map(r => {
        const sign = SIGN[String(r.alter)] ?? "";
        const mathSign = r.alter > 0 ? `+${r.alter}` : r.alter < 0 ? `${r.alter}` : "";
        // 字段顺序对齐产物:artName 在 step/alter 之后(仅影响可读性,JSON 对象序)
        return {
            artName: r.step + sign,
            step: r.step,
            alter: r.alter,
            semitone: r.semitone,
            stepId: r.stepId,
            fifthValue: r.fifthValue,
            pianoKeyId: r.pianoKeyId,
            pianoKeySymbol: r.pianoKeySymbol,
            isNormal: r.isNormal,
            isBlack: r.isBlack,
            mathName: r.step + mathSign,
        };
    });
}

// ==================== interval / fifth(透传) ====================
function compilePassThrough(name: string): unknown {
    return readSrc(name);
}

// ==================== chord-formulas(展开 + 回填) ====================
const SIMPLE_GAP: Record<string, number> = (() => {
    const ivs = JSON.parse(readFileSync(resolve(OUT_DIR, "intervals.json"), "utf-8"));
    const m: Record<string, number> = {};
    for (const i of ivs) m[`${i.type}/${i.num}`] = i.semitoneGap;
    return m;
})();
const gap = (t: string, N: number) =>
    SIMPLE_GAP[`${t}/${((N - 1) % 7) + 1}`] + 12 * Math.floor((N - 1) / 7);

function compileChordFormulas(): Record<string, unknown> {
    const src = readSrc("chord-formulas.json5") as Record<string, any>;
    const out: Record<string, any> = {};

    const expand = (cid: string, trail: string[] = []): [string, number][] => {
        if (trail.includes(cid)) throw new Error(`基座环: ${[...trail, cid].join(" → ")}`);
        const f = src[cid];
        if (f.$base === undefined) return f.intervalList;
        let list = expand(f.$base, [...trail, cid]);
        if (f.$set) list = list.map(([t, n]) => [f.$set[String(n)] ?? t, n]);
        if (f.$add) list = [...list, ...f.$add];
        return [...list].sort((a, b) => a[1] - b[1]);
    };

    for (const cid of Object.keys(src)) {
        const f = src[cid];
        const intervalList = expand(cid);
        const degreeToIntervalMap: Record<string, string> = {};
        for (const [t, n] of intervalList) degreeToIntervalMap[String(n)] = t;
        out[cid] = {
            chordFormulaId: cid,
            cnName: f.cnName,
            scoreDisplay: f.scoreDisplay ?? "",
            intervalList,
            tags: deriveTags(intervalList),
            degreeToIntervalMap,
            notesNum: intervalList.length + 1,
            semitonesList: intervalList.map(([t, n]) => gap(t, n)),
            name: f.name,
        };
    }
    return out;
}

// ==================== 主流程:编译 + 对比/写盘 ====================
// 导出供 gen:static-data(index.ts)调用;直接运行时按 --write 参数执行
export function compileAll(write: boolean): boolean {
    let allSame = true;

    console.log(`=== static-data 编译器(${write ? "写盘模式" : "dry-run 对比"}) ===\n`);
    const targets: Array<{ srcFile: string; dstFile: string; compile: () => unknown }> = [
        { srcFile: "pianokey.json5", dstFile: "notes.json", compile: compilePianokey },
        { srcFile: "interval.json5", dstFile: "intervals.json", compile: () => compilePassThrough("interval.json5") },
        { srcFile: "fifth.json5", dstFile: "fifth.json", compile: () => compilePassThrough("fifth.json5") },
        { srcFile: "chord-formulas.json5", dstFile: "chord-formulas.json", compile: compileChordFormulas },
    ];

    for (const { srcFile, dstFile, compile } of targets) {
        const produced = serialize(compile());
        const existing = readDst(dstFile);
        const same = produced === existing;

        if (!same) allSame = false;
        console.log(`${same ? "✓ 零差异" : "△ 有差异"}  ${srcFile} → ${dstFile}  (${(produced.length / 1024).toFixed(1)}KB)`);

        if (!same) {
            // 字段级差异统计
            const a = JSON.parse(produced);
            const b = JSON.parse(existing);
            const isArr = Array.isArray(b);
            const keysA = new Set<string>();
            const keysB = new Set<string>();
            if (isArr) {
                for (const r of a) Object.keys(r).forEach(k => keysA.add(k));
                for (const r of b) Object.keys(r).forEach(k => keysB.add(k));
            } else {
                for (const r of Object.values(a)) Object.keys(r).forEach(k => keysA.add(k));
                for (const r of Object.values(b)) Object.keys(r).forEach(k => keysB.add(k));
            }
            const added = [...keysA].filter(k => !keysB.has(k));
            const removed = [...keysB].filter(k => !keysA.has(k));
            const lenA = isArr ? a.length : Object.keys(a).length;
            const lenB = isArr ? b.length : Object.keys(b).length;
            console.log(`    条目: ${lenA} vs 现有 ${lenB}`);
            if (added.length) console.log(`    新增字段: ${added.join(", ")}`);
            if (removed.length) console.log(`    移除字段: ${removed.join(", ")}`);
            if (!added.length && !removed.length && lenA === lenB)
                console.log(`    (字段集相同——差异为格式/顺序/值级,可用 git diff 细看)`);
        }
        if (write) writeFileSync(resolve(OUT_DIR, dstFile), produced, "utf-8");
    }

    console.log(`\n${allSame ? "四个文件全部与现有产物一致" : "存在差异(见上)"}`);
    if (write) console.log("已写入 static-data/");
    return allSame;
}

// 直接执行(非被 import)时按命令行参数运行
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
    compileAll(WRITE);
}
