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
 *   scale-modes.json5    → scale-modes.json    回填 intervalMap/semitonesList/degreeAlterations*
 *   pcset-formulas.json5 → pcset-formulas.json  透传(纯复制)
 *   special-sets.json5   → special-sets.json   透传(纯复制,人工审核的 set 定义)
 *   bake-rules.json5     → bake-rules.json     透传(纯复制,烘焙保留规则,见 decompose/bake.ts)
 *
 * chord-instances / scale-instances 无 json5 源,不在本编译器范围
 * (分别由 ts-dev 生成器产出,见 index.ts)。
 *
 * 用法:
 *   npx tsx ts-dev/compileStaticData.ts            # dry-run:编译并对比现有产物,不写盘
 *   npx tsx ts-dev/compileStaticData.ts --write    # 写盘覆盖 static-data/
 */
import { isNil, isNotNil } from 'es-toolkit/predicate'
import { readFileSync, writeFileSync, existsSync } from "fs";
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
const readDst = (name: string) => {
    const p = resolve(OUT_DIR, name);
    return existsSync(p) ? readFileSync(p, "utf-8") : "(不存在,首次生成)";
};

/**
 * 紧凑数组序列化:对象多行(2 空格缩进),≤80 字符的数组单行。
 * 避免 JSON.stringify 把 ["maj", 3] 炸成 6 行的默认行为。
 * 导出供烘焙器复用(chord-hash-*.json 的 scoreDisplay/transform 小数组同样受益)。
 */
export function pretty(value: unknown, indent: number): string {
    if (Array.isArray(value)) {
        if (value.length === 0) return "[]";
        const items = value.map(v => pretty(v, indent + 2));
        const oneLine = `[${items.join(", ")}]`;
        if (oneLine.length <= 80) return oneLine;
        const pad = " ".repeat(indent + 2);
        return `[\n${pad}${items.join(`,\n${pad}`)}\n${" ".repeat(indent)}]`;
    }
    if (isNotNil(value) && typeof value === "object") {
        const pad = " ".repeat(indent + 2);
        const entries = Object.entries(value as Record<string, unknown>)
            .map(([k, v]) => `${pad}${JSON.stringify(k)}: ${pretty(v, indent + 2)}`);
        if (entries.length === 0) return "{}";
        return `{\n${entries.join(",\n")}\n${" ".repeat(indent)}}`;
    }
    return JSON.stringify(value);
}
export const serialize = (data: unknown) => pretty(data, 0) + "\n";

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
        if (isNil(f.$base)) return f.intervalList;
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

// ==================== scale-modes(回填派生) ====================
const MAJOR_DEGREE_SEMITONES = { 2: 2, 3: 4, 4: 5, 5: 7, 6: 9, 7: 11 } as const

function compileScaleModes(): Record<string, unknown> {
    const src = readSrc("scale-modes.json5") as Record<string, any>;
    const out: Record<string, any> = {};
    for (const sid of Object.keys(src)) {
        const m = src[sid];
        const il = m.intervalList as ([string, number] | null)[];
        const intervalMap: Record<string, string | null> = {};
        const semitonesList: (number | null)[] = [];
        const semitonesMap: Record<string, number | null> = {};
        const degreeAlterationsList: (number | null)[] = [];
        const degreeAlterationsMap: Record<string, number | null> = {};
        for (let i = 0; i < 6; i++) {
            const item = il[i];
            const degree = i + 2;
            if (isNil(item)) {
                intervalMap[String(degree)] = null;
                semitonesList.push(null);
                semitonesMap[String(degree)] = null;
                degreeAlterationsList.push(null);
                degreeAlterationsMap[String(degree)] = null;
            } else {
                const [t, n] = item;
                const semi = gap(t, n);
                intervalMap[String(degree)] = t;
                semitonesList.push(semi);
                semitonesMap[String(degree)] = semi;
                const da = semi - MAJOR_DEGREE_SEMITONES[degree as 2|3|4|5|6|7];
                degreeAlterationsList.push(da);
                degreeAlterationsMap[String(degree)] = da;
            }
        }
        out[sid] = {
            scaleModeId: sid,
            type: m.type,
            intervalList: il,
            intervalMap,
            semitonesList,
            semitonesMap,
            degreeAlterationsList,
            degreeAlterationsMap,
            name: m.name,
            tags: m.tags,
            forte: m.forte,
        };
    }

    // ── B 项防线/派生(2026-09-11 用户批准)─────────────────────────
    // 1) type 断言:七声(无 null 槽)必须有 3 度且 type 与主和弦结构一致
    //    (dim7=♭3♭5♭♭7 / halfdim7=♭3♭5♭7 / major=♮3 / minor=♭3)。
    //    五声缺 3 度者(商/徵)是手写约定,放行——七声可机器判定,不让手写漂移静默通过。
    for (const sid of Object.keys(out)) {
        const m = out[sid];
        if (m.semitonesList.includes(null)) continue;
        const s3 = m.semitonesMap["3"], s5 = m.semitonesMap["5"], s7 = m.semitonesMap["7"];
        if (isNil(s3)) throw new Error(`[scale-modes] ${sid}: 七声缺 3 度`);
        const expect = `${s3},${s5},${s7}` === "3,6,9" ? "dim7"
            : `${s3},${s5},${s7}` === "3,6,10" ? "halfdim7"
            : s3 === 4 ? "major" : "minor";
        if (m.type !== expect) {
            throw new Error(`[scale-modes] ${sid}: type=${m.type} 与主和弦结构(${s3},${s5},${s7})不符,应为 ${expect}`);
        }
    }
    // 2) 特征标签:变音(b2/#4/…,重变 bb7)+ 缺度(no4/no7)+ 音数(pentatonic/heptatonic),
    //    追加到源手写家族标签后(镜像 chord-formulas 的 deriveTags 编译期推导)
    for (const sid of Object.keys(out)) {
        const m = out[sid];
        const feat: string[] = [];
        for (let d = 2; d <= 7; d++) {
            const da = m.degreeAlterationsMap[String(d)];
            if (da === null) feat.push(`no${d}`);
            else if (da === -2) feat.push(`bb${d}`);
            else if (da === -1) feat.push(`b${d}`);
            else if (da === 1) feat.push(`#${d}`);
        }
        const noteCount = 1 + m.semitonesList.filter((s: number | null) => s !== null).length;
        feat.push(noteCount === 5 ? "pentatonic" : noteCount === 6 ? "hexatonic" : "heptatonic");
        m.tags = [...(m.tags ?? []), ...feat];
    }
    // 3) sameShapeAs:同 intervalList 形状组内指向首个(源顺序),独形/自身为 null。
    //    同形是客观事实(60 键仅 31 形),编译算最不易错;别名键(IONIAN/雅清燕)由此可查
    const shapeFirst: Record<string, string> = {};
    for (const sid of Object.keys(out)) {
        const shape = JSON.stringify(out[sid].intervalList);
        const first = shapeFirst[shape];
        out[sid].sameShapeAs = isNil(first) || first === sid ? null : first;
        if (isNil(first)) shapeFirst[shape] = sid;
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
        { srcFile: "scale-modes.json5", dstFile: "scale-modes.json", compile: compileScaleModes },
        { srcFile: "pcset-formulas.json5", dstFile: "pcset-formulas.json", compile: () => compilePassThrough("pcset-formulas.json5") },
        { srcFile: "special-sets.json5", dstFile: "special-sets.json", compile: () => compilePassThrough("special-sets.json5") },
        { srcFile: "bake-rules.json5", dstFile: "bake-rules.json", compile: () => compilePassThrough("bake-rules.json5") },
    ];

    for (const { srcFile, dstFile, compile } of targets) {
        const produced = serialize(compile());
        const existing = readDst(dstFile);
        const same = produced === existing;

        if (!same) allSame = false;
        console.log(`${same ? "✓ 零差异" : "△ 有差异"}  ${srcFile} → ${dstFile}  (${(produced.length / 1024).toFixed(1)}KB)`);

        if (!same) {
            // 字段级差异统计(首次生成时现有文件不存在,跳过统计)
            let a: any, b: any;
            try { a = JSON.parse(produced); b = JSON.parse(existing); } catch { a = b = null; }
            if (isNotNil(a) && isNotNil(b)) {
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
        }
        if (write) writeFileSync(resolve(OUT_DIR, dstFile), produced, "utf-8");
    }

    console.log(`\n${allSame ? "五个文件全部与现有产物一致" : "存在差异(见上)"}`);
    if (write) console.log("已写入 static-data/");
    return allSame;
}

// 直接执行(非被 import)时按命令行参数运行
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
    compileAll(WRITE);
}
