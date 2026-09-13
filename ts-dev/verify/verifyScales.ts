// @ts-nocheck
// ↑ 暂时压制 VS Code 的 TS2591(找不到 fs/path 等 Node 内置模块)。
// 命令行 npx tsc --noEmit 为 0 错误,@types/node 已装且 ts-dev 已入 tsconfig include,
// 该红线源于 VS Code 语言服务的项目归属缓存,不影响运行与 CI。
// 根治:Reload Window / 确认 VS Code 打开的是仓库根目录 / 切换 TS 为工作区版本。
/**
 * 音阶数据交叉验证器
 *
 * 裁判:src/ 的基本音程乐理(Note.getNoteByInterval + Interval),
 *      只依赖 notes.json / intervals.json 两张基础表。
 * 被验证方:static-data/ 的派生数据(scale-instances.json / fifth.json)。
 *
 * 两条独立路径算同一个东西,必须一致:
 *   路径 A(乐理):根音 Note --getNoteByInterval(每度)--> 音阶各音
 *   路径 B(数据):scale-instances.json 里预计算的 notesMap / degreeToPianoKeyId / pianoKeyIds
 *
 * 运行: npx tsx ts-dev/verify/verifyScales.ts
 */
import { isNil, isNotNil } from 'es-toolkit/predicate'
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { Note } from "../../src/Note";
import { Interval } from "../../src/Interval";
import type { T_IntervalType } from "../../src/common/static/INTERVAL_TYPES";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "../..");
const read = (name: string) =>
    JSON.parse(readFileSync(resolve(ROOT, "static-data", name), "utf-8"));

const scaleModes = read("scale-modes.json") as Record<string, any>;
const scaleInstances = read("scale-instances.json") as any[];

let pass = 0;
let fail = 0;
const failures: string[] = [];
const check = (ok: boolean, label: string) => {
    if (ok) pass++;
    else {
        fail++;
        if (failures.length < 30) failures.push(label);
    }
};

// ==================== 1. 音阶实例对拍(46 调式 × 12 根音 × 每个有效拼法) ====================
let comparedSpellings = 0;
let skippedInvalid = 0;

for (const inst of scaleInstances) {
    const mode = scaleModes[inst.scaleModeId];
    if (!mode) { check(false, `未知调式 ${inst.scaleModeId}`); continue; }
    const intervalList = mode.intervalList as ([string, number] | null)[];

    for (const scaleEntry of inst.scales) {
        // 只验证库判定有效的拼法;invalid 的(理论调等)跳过并计数
        if (scaleEntry.isValid === false) { skippedInvalid++; continue; }
        comparedSpellings++;

        let rootNote: Note;
        try {
            rootNote = new Note(scaleEntry.tonicStep, scaleEntry.tonicAlter, 4);
        } catch {
            check(false, `${inst.scaleModeId}@${scaleEntry.tonicStep}${scaleEntry.tonicAlter}: 根音构造失败`);
            continue;
        }

        // 逐度用乐理重算,对拍 notesMap 与 degreeToPianoKeyId
        const recomputedKeyIds = new Set<number>([rootNote.pianoKeyId]);
        for (let i = 0; i < 6; i++) {
            const degree = i + 2;
            const item = intervalList[i];
            const label = `${inst.scaleModeId}@${scaleEntry.tonicStep}${scaleEntry.tonicAlter} ${degree}度`;

            if (isNil(item)) {
                // 五声等缺度:数据侧也应为 null
                check(isNil(scaleEntry.notesMap[degree]) && isNil(inst.degreeToPianoKeyId[degree]), `${label} 应缺度`);
                continue;
            }

            let target: Note;
            try {
                target = rootNote.getNoteByInterval(new Interval(item[0] as T_IntervalType, item[1]));
            } catch (e) {
                check(false, `${label} 乐理计算抛错: ${(e as Error).message}`);
                continue;
            }

            recomputedKeyIds.add(target.pianoKeyId);
            const expectNote = scaleEntry.notesMap[degree];
            check(
                expectNote && expectNote.step === target.step && expectNote.alter === target.alter,
                `${label} 拼法不符: 乐理=${target.step}${target.alter}/oct${target.octave} 数据=${JSON.stringify(expectNote)}`,
            );
            check(
                inst.degreeToPianoKeyId[degree] === target.pianoKeyId,
                `${label} 度位不符: 乐理=${target.pianoKeyId} 数据=${inst.degreeToPianoKeyId[degree]}`,
            );
        }

        // 音集(pianoKeyIds)对拍:重算集合应与数据集合一致
        const dataKeySet = new Set<number>(inst.pianoKeyIds);
        const same = recomputedKeyIds.size === dataKeySet.size
            && [...recomputedKeyIds].every(k => dataKeySet.has(k));
        check(same, `${inst.scaleModeId}@${scaleEntry.tonicStep}${scaleEntry.tonicAlter} 音集不符: 乐理=${[...recomputedKeyIds].sort((a,b)=>a-b)} 数据=${inst.pianoKeyIdsSorted}`);
    }
}

// ==================== 2. fifth.json × 大小调切片 全字段对齐(七维,2026-09-12 固化) ====================
// 维度:①行双向覆盖 ②调号三方(alterSum=音集变音和=rawStaveAlters) ③isTonicNormal 两侧
//      ④actualNote=同键兄弟拼写(替换行)/自身(未替换行)——等音性由此蕴含
//      ⑤isDoubleAlterIncluded=含|alter|≥2的音 ⑥circleID=调号席位(|sig|≥8 哨兵-1;
//      小调席位=关系大调位=主音位-3,勿与主音席混淆) ⑦等音建议自身实用(|建议调号|≤7)
// 语义提醒:小调行 circleID 是调号席位(关系大调席位)而 actualNote 换的是主音等音——
// 大调里主音席≡调号席(构造恒等),小调差 3 位,比对时勿混用两种席位。
const fifth = read("fifth.json") as any[];
const mmInstances = read("scale-instances-major-minor.json") as any[];
const FIFTHS: Record<string, number> = { C: 0, G: 1, D: 2, A: 3, E: 4, B: 5, F: -1 };
const LETTER_SEMI: Record<string, number> = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
const sigOf = (step: string, alter: number, mode: string) =>
    FIFTHS[step] + 7 * alter - (mode === "minor" ? 3 : 0);
const seatOf = (sig: number) => ((sig % 12) + 12) % 12; // JS 负数取模与 Python 不同,先归正
const keyIdOf = (step: string, alter: number) => ((LETTER_SEMI[step] + alter) % 12 + 12) % 12;

const mmRows = new Map<string, any>();
const mmByRoot = new Map<string, any[]>();
for (const inst of mmInstances) {
    const mode = inst.scaleModeId === "NATURAL_MAJOR" ? "major" : "minor";
    for (const sc of inst.scales) {
        mmRows.set(`${sc.tonicStep}|${sc.tonicAlter}|${mode}`, sc);
        const k = `${inst.pianoKeyIdRoot}|${mode}`;
        if (isNil(mmByRoot.get(k))) mmByRoot.set(k, []);
        mmByRoot.get(k)!.push(sc);
    }
}

let fifthChecked = 0;
const fifthKeySet = new Set<string>();
for (const f of fifth) {
    const tag = `${f.rawNoteStep}${f.rawNoteAlter > 0 ? "♯" : f.rawNoteAlter < 0 ? "♭" : ""}${f.mode === "minor" ? "小" : "大"}`;
    const key = `${f.rawNoteStep}|${f.rawNoteAlter}|${f.mode}`;
    fifthKeySet.add(key);
    const sc = mmRows.get(key);

    // ① 正向覆盖:fifth 每行在切片有对应有效拼写
    check(isNotNil(sc), `${tag}: fifth 行在大小调切片无对应拼写`);
    if (isNil(sc)) continue;
    fifthChecked++;

    // ② 调号三方:切片 alterSum 字段 = 音集变音和(独立重算) = fifth rawStaveAlters
    const letterSum = Object.values(sc.notesMap).reduce(
        (acc: number, n: any) => (isNotNil(n) ? acc + n.alter : acc), 0,
    );
    check(sc.alterSum === letterSum && letterSum === f.rawStaveAlters,
        `${tag}: 调号三方不符 alterSum=${sc.alterSum} 音集和=${letterSum} fifth=${f.rawStaveAlters}`);

    // ③ isTonicNormal 两侧判定一致
    check(sc.isTonicNormal === f.isTonicNormal, `${tag}: isTonicNormal 切片=${sc.isTonicNormal} fifth=${f.isTonicNormal}`);

    // ④ actualNote:替换行 = 同键兄弟拼写的根音(建议真实存在且等音);未替换行 = 自身
    if (f.isTonicReplaced) {
        const sibs = mmByRoot.get(`${keyIdOf(f.rawNoteStep, f.rawNoteAlter)}|${f.mode}`) ?? [];
        check(sibs.some(s => s !== sc && s.tonicStep === f.actualNoteStep && s.tonicAlter === f.actualNoteAlter),
            `${tag}: actualNote=${f.actualNoteStep}${f.actualNoteAlter} 无同键兄弟拼写(等音建议落空)`);
    } else {
        check(f.actualNoteStep === f.rawNoteStep && f.actualNoteAlter === f.rawNoteAlter,
            `${tag}: 未替换行 actualNote 应为自身`);
    }

    // ⑤ isDoubleAlterIncluded = 拼写含 |alter|≥2 的音
    const hasDouble = Object.values(sc.notesMap).some((n: any) => isNotNil(n) && Math.abs(n.alter) >= 2);
    check(hasDouble === f.isDoubleAlterIncluded,
        `${tag}: isDoubleAlterIncluded fifth=${f.isDoubleAlterIncluded} 切片=${hasDouble}`);

    // ⑥ circleID = 调号席位;|sig|≥8 为哨兵 -1(消费端须显式处理,勿静默取模)
    const sig = sigOf(f.rawNoteStep, f.rawNoteAlter, f.mode);
    const wantCircle = Math.abs(sig) >= 8 ? -1 : seatOf(sig);
    check(f.circleID === wantCircle, `${tag}: circleID=${f.circleID} 应 ${wantCircle}(sig=${sig})`);

    // ⑦ 等音建议自身实用:建议调号在 |≤7| 区(不引入新的理论调)
    if (f.isTonicReplaced) {
        const aSig = sigOf(f.actualNoteStep, f.actualNoteAlter, f.mode);
        check(Math.abs(aSig) <= 7, `${tag}: 等音建议 ${f.actualNoteStep}${f.actualNoteAlter} 自身仍理论(sig=${aSig})`);
    }
}
// ①b 反向覆盖:切片每行都在 fifth(双向零差)
const orphanInSlice = [...mmRows.keys()].filter(k => !fifthKeySet.has(k));
check(orphanInSlice.length === 0, `切片存在 fifth 未收录的拼写: ${orphanInSlice.join(", ")}`);

// ==================== 汇总 ====================
console.log("=== 音阶数据交叉验证(裁判: Note.getNoteByInterval) ===");
console.log(`音阶实例拼法对拍: ${comparedSpellings} 个有效拼法(跳过 ${skippedInvalid} 个无效拼法)`);
console.log(`fifth × 大小调切片七维对齐: ${fifthChecked} 条(行双向/调号三方/isTonicNormal/actualNote/重升降/圈位/建议实用)`);
console.log(`----------------------------------------`);
console.log(`通过: ${pass}  失败: ${fail}`);
if (failures.length > 0) {
    console.log(`\n失败明细(前 ${failures.length} 条):`);
    for (const f of failures) console.log(`  ✗ ${f}`);
    process.exit(1);
}
console.log("全部一致 ✓ 两条独立路径(乐理重算 vs 预计算数据)互相印证");
