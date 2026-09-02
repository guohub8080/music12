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
                expectNote && expectNote.step === target.step && expectNote.alter === target.alter
                    && expectNote.octaveOffset === target.octave - 4,
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

// ==================== 2. fifth.json 调号裁决对拍 ====================
// 自然大/小调:音阶内 alter≠0 的音数应恰为 |rawStaveAlters|(每条调号线只动一个音级)
// 且 actual 主音与 raw 主音等音(pianoKeyId 相同)
const fifth = read("fifth.json") as any[];
let fifthChecked = 0;

for (const f of fifth) {
    const tag = `${f.rawNoteStep}${f.rawNoteAlter > 0 ? "♯" : f.rawNoteAlter < 0 ? "♭" : ""}${f.mode === "minor" ? "小" : "大"}`;

    // 等音性:actual 与 raw 必须是同一个键
    try {
        const rawNote = new Note(f.rawNoteStep, f.rawNoteAlter, 4);
        const actNote = new Note(f.actualNoteStep, f.actualNoteAlter, 4);
        check(actNote.pianoKeyId === rawNote.pianoKeyId, `${tag}: 等音替换失效 raw=${rawNote.pianoKeyId} actual=${actNote.pianoKeyId}`);
    } catch (e) {
        check(false, `${tag}: 主音构造抛错 ${(e as Error).message}`);
    }

    // 调号数:只对自然大/小调验证,按 raw 主音拼法(替换前的原始请求)取音阶。
    // 规则:|rawStaveAlters| = 音阶全部七音(含根音)的 |alter| 总和。
    // 理论调含重升降:如 B♯大调 = B♯ C𝄪 D𝄪 E♯ F𝄪 G𝄪 A𝄪,|alter| 总和恰为 12。
    const modeId = f.mode === "major" ? "NATURAL_MAJOR" : "NATURAL_MINOR";
    const inst = scaleInstances.find(
        x => x.scaleModeId === modeId && x.pianoKeyIdRoot === (new Note(f.rawNoteStep, f.rawNoteAlter, 4)).pianoKeyId,
    );
    if (inst) {
        const entry = inst.scales.find(
            (s: any) => s.isValid !== false && s.tonicStep === f.rawNoteStep && s.tonicAlter === f.rawNoteAlter,
        );
        if (entry) {
            fifthChecked++;
            const alterAbsSum = Object.values(entry.notesMap).reduce(
                (acc: number, n: any) => n ? acc + Math.abs(n.alter) : acc, 0,
            );
            check(
                alterAbsSum === Math.abs(f.rawStaveAlters),
                `${tag}: 调号数不符 音阶|alter|总和=${alterAbsSum} 表称=${Math.abs(f.rawStaveAlters)}`,
            );
        }
    }
}

// ==================== 汇总 ====================
console.log("=== 音阶数据交叉验证(裁判: Note.getNoteByInterval) ===");
console.log(`音阶实例拼法对拍: ${comparedSpellings} 个有效拼法(跳过 ${skippedInvalid} 个无效拼法)`);
console.log(`fifth 调号对拍: ${fifthChecked} 条`);
console.log(`----------------------------------------`);
console.log(`通过: ${pass}  失败: ${fail}`);
if (failures.length > 0) {
    console.log(`\n失败明细(前 ${failures.length} 条):`);
    for (const f of failures) console.log(`  ✗ ${f}`);
    process.exit(1);
}
console.log("全部一致 ✓ 两条独立路径(乐理重算 vs 预计算数据)互相印证");
