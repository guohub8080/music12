// @ts-nocheck
// scale-modes.json5 编译验证器(独立第二重):json5 包解析 → 独立回填实现 → 与产物全等对拍
// 另含行为契约:源产物键数对等(不锁具体数,防调式增删时哑火)、键即 id、五声缺度 null、type 四值域
import { isNil, isNotNil } from 'es-toolkit/predicate'
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import JSON5 from "json5";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "../..");
const src = JSON5.parse(readFileSync(resolve(ROOT, "ts-dev/raw-static/scale-modes.json5"), "utf-8"));
const dst = JSON.parse(readFileSync(resolve(ROOT, "static-data/scale-modes.json"), "utf-8"));
const intervals = JSON.parse(readFileSync(resolve(ROOT, "static-data/intervals.json"), "utf-8"));
const GAP = {};
for (const i of intervals) GAP[`${i.type}/${i.num}`] = i.semitoneGap;
const MAJOR_BASE = { 2: 2, 3: 4, 4: 5, 5: 7, 6: 9, 7: 11 };

let pass = 0, fail = 0;
const errors = [];
const check = (ok, msg) => { if (ok) pass++; else { fail++; errors.push(msg); } };

// 计数不硬编码(2026-09-12 教训:46→60 时此检查哑火)——只断言源产物对等且非空
check(Object.keys(src).length > 0 && Object.keys(src).length === Object.keys(dst).length,
    `源/产物调式数不对等: ${Object.keys(src).length} vs ${Object.keys(dst).length}`);

for (const sid of Object.keys(dst)) {
    const s = src[sid], d = dst[sid];
    check(isNotNil(s), `源缺 ${sid}`);
    // 自由量等价
    check(d.name === s.name && d.type === s.type, `${sid} name/type 不符`);
    check(JSON.stringify(d.intervalList) === JSON.stringify(s.intervalList), `${sid} intervalList 不符`);
    // 独立回填派生
    const il = s.intervalList;
    for (let i = 0; i < 6; i++) {
        const deg = i + 2;
        const item = il[i];
        if (isNil(item)) {
            check(isNil(d.intervalMap[String(deg)]) && isNil(d.semitonesMap[String(deg)])
                && isNil(d.degreeAlterationsMap[String(deg)]), `${sid} ${deg}度 缺度字段非 null`);
        } else {
            const [t, n] = item;
            check(n === deg, `${sid} 槽 ${i} 度数 ${n} ≠ ${deg}(度数由位置决定)`);
            const semi = GAP[`${t}/${n}`];
            check(d.semitonesList[i] === semi, `${sid} ${deg}度 semitones`);
            check(d.degreeAlterationsList[i] === semi - MAJOR_BASE[deg], `${sid} ${deg}度 degreeAlterations`);
            check(d.intervalMap[String(deg)] === t, `${sid} ${deg}度 intervalMap`);
        }
    }
    // 化石字段不存
    check(!("family" in d) && !("description" in d), `${sid} 化石字段残留`);
    // 键即 id(别名自名)
    check(d.scaleModeId === sid, `${sid} scaleModeId=${d.scaleModeId} ≠ 键(键即 id 契约)`);
    // type 值域
    check(["major", "minor", "halfdim7", "dim7"].includes(d.type), `${sid} type=${d.type} 越界`);
}

console.log("=== scale-modes.json5 编译验证(独立实现 + json5 包解析) ===");
console.log(`断言: ${pass + fail} 通过: ${pass} 失败: ${fail}`);
if (fail > 0) { for (const e of errors.slice(0, 10)) console.log(`  ✗ ${e}`); process.exit(1); }
console.log(`全部一致 ✓ 极简源(${Object.keys(src).length} 键:id/type/name/tags/forte/intervalList) → 派生回填 → 与产物逐字段等价`);
