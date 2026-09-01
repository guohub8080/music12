/**
 * 黄金测试向量提取器
 *
 * 跑 music12 的核心 API,把「输入→输出」对记录成 JSON,
 * 供 C++ 版跑同样的向量验证幂等。
 *
 * 运行: npx tsx tools/extract-golden.ts
 * 输出: test/vectors/golden-vectors.json
 */
import { writeFileSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = resolve(__dirname, "../test/vectors");
mkdirSync(OUT_DIR, { recursive: true });

interface Vector {
    id: string;
    module: string;
    fn: string;
    input: any;
    output: any;
}

const vectors: Vector[] = [];
let counter = 0;
function add(module: string, fn: string, input: any, output: any) {
    vectors.push({ id: `${module}-${++counter}`, module, fn, input, output });
}

// ==================== Note ====================
console.log("[1/8] Note...");
import { Note } from "../src/Note";

// 构造各种音符
for (const [step, alter, octave] of [
    ["C", 0, 4], ["D", 0, 4], ["E", 0, 4], ["F", 0, 4],
    ["G", 0, 4], ["A", 0, 4], ["B", 0, 4],
    ["C", 1, 4], ["D", 1, 4], ["F", 1, 4], ["G", 1, 4], ["A", 1, 4],
    ["C", -1, 4], ["D", -1, 4], ["E", -1, 4], ["B", -1, 4],
    ["C", 0, 3], ["C", 0, 5], ["A", 0, 4],
] as const) {
    const n = new Note(step, alter, octave);
    add("Note", "constructor", { step, alter, octave }, {
        pitchValue: n.pitchValue,
        pianoKeyId: n.pianoKeyId,
        semitone: n.semitone,
        artName: n.artName,
        isNormal: n.isNormal,
        isBlack: n.isBlack,
    });
}

// semitoneMove
const c4 = new Note("C", 0, 4);
for (const move of [1, 2, 3, 5, 7, 12, -1, -2, -5, -12]) {
    const result = c4.semitoneMove(move);
    add("Note", "semitoneMove", { step: "C", alter: 0, octave: 4, move }, {
        step: result.step,
        alter: result.alter,
        octave: result.octave,
    });
}

// getNoteByInterval(用音程)
import { Interval } from "../src/Interval";
const intervals: [string, number][] = [
    ["p", 1], ["maj", 2], ["maj", 3], ["p", 4], ["p", 5],
    ["maj", 6], ["maj", 7], ["p", 8], ["min", 3], ["aug", 4],
    ["dim", 5], ["maj", 9],
];
for (const [type, num] of intervals) {
    const interval = new Interval(type as any, num);
    const result = c4.getNoteByInterval(interval);
    add("Note", "getNoteByInterval", { step: "C", alter: 0, octave: 4, intervalType: type, intervalNum: num }, {
        step: result.step,
        alter: result.alter,
        octave: result.octave,
    });
}

// ==================== Interval ====================
console.log("[2/8] Interval...");
for (const [type, num] of intervals) {
    const interval = new Interval(type as any, num);
    add("Interval", "constructor", { type, num }, {
        semitoneGap: interval.semitoneGap,
        semitoneGapWithinOctave: interval.semitoneGapWithinOctave,
        isNatural: interval.isNatural,
        cnPrefix: interval.cnPrefix,
    });
}

// ==================== Scale ====================
console.log("[3/8] Scale...");
import { Scale } from "../src/Scale";

// 全部 46 调式 × 12 主音
import { SCALE_MODE_META_MAP } from "../src/ScaleMode/static/SCALE_MODE_META_MAP";
const allModeIds = Object.keys(SCALE_MODE_META_MAP);

for (const rootPianoKeyId of [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]) {
    for (const modeId of allModeIds) {
        try {
            const scale = new Scale(rootPianoKeyId, modeId as any);
            add("Scale", "constructor", { rootPianoKeyId, scaleModeId: modeId }, {
                pianoKeyIds: scale.pianoKeyIds,
                pianoKeyIdsSorted: scale.pianoKeyIdsSorted,
                modeName: scale.modeName,
                type: scale.type,
            });
        } catch (e) {
            // 跳过无效组合
        }
    }
}

// ==================== Chord ====================
console.log("[4/8] Chord...");
import { Chord } from "../src/Chord";
import { CHORD_FORMULA_META_MAP } from "../src/ChordFormula/static/CHORD_FORMULA_META_MAP";
const allFormulaIds = Object.keys(CHORD_FORMULA_META_MAP);

for (const rootPianoKeyId of [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]) {
    for (const formulaId of allFormulaIds) {
        try {
            const chord = new Chord(rootPianoKeyId, formulaId);
            add("Chord", "constructor", { rootPianoKeyId, chordFormulaId: formulaId }, {
                pianoKeyIds: chord.pianoKeyIds,
                pianoKeyIdsSorted: chord.pianoKeyIdsSorted,
                notesNum: chord.notesNum,
                baseSymbol: chord.baseSymbol,
            });
        } catch (e) {
            // 跳过
        }
    }
}

// Chord 变换(set/sus/omit)
for (const formulaId of ["maj3", "maj7", "dom7"]) {
    for (const rootPianoKeyId of [0, 5, 7]) {
        try {
            const chord = new Chord(rootPianoKeyId, formulaId);
            // set 7
            const c7 = new Chord(rootPianoKeyId, formulaId);
            c7.set(7 as any);
            add("Chord", "set7", { rootPianoKeyId, chordFormulaId: formulaId, set: 7 }, {
                pianoKeyIds: c7.pianoKeyIds,
                notesNum: c7.notesNum,
            });
            // setSus4
            const cSus = new Chord(rootPianoKeyId, formulaId);
            try { cSus.setSus(4 as any); } catch {}
            add("Chord", "setSus4", { rootPianoKeyId, chordFormulaId: formulaId, sus: 4 }, {
                pianoKeyIds: cSus.pianoKeyIds,
            });
        } catch (e) {
            // 跳过
        }
    }
}

// ==================== findChord ====================
console.log("[5/8] findChord...");
import { findChord } from "../src/Find";

const chordInputs = [
    [60, 64, 67],           // C 大三
    [60, 63, 67],           // C 小三
    [60, 64, 67, 70],       // C7
    [60, 64, 67, 71],       // Cmaj7
    [60, 63, 67, 70],       // Cm7
    [62, 65, 69],           // Dm
    [57, 60, 64],           // Am
    [60, 64, 67, 72],       // C add octave
    [59, 62, 67],           // Bdim
];
for (const midiPitchList of chordInputs) {
    try {
        const results = findChord(midiPitchList);
        // 只取前 3 个结果(避免太大)
        const top3 = results.slice(0, 3).map((r: any) => ({
            chordFormulaId: r.chordFormulaId,
            rootPianoKeyId: r.rootPianoKeyId,
            score: r.score,
        }));
        add("Find", "findChord", { midiPitchList }, top3);
    } catch (e) {
        // 跳过
    }
}

// ==================== Stave ====================
console.log("[6/8] Stave...");
import { getAlterStepListByNum, getStaveAlterByNote } from "../src/Stave";

for (const num of [-7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7]) {
    const result = getAlterStepListByNum(num);
    add("Stave", "getAlterStepListByNum", { num }, result);
}

for (const [step, alter] of [["C", 0], ["F", 1], ["B", -1], ["G", 0]] as const) {
    const result = getStaveAlterByNote(step, alter);
    add("Stave", "getStaveAlterByNote", { step, alter }, result);
}

// ==================== CircleOfFifths ====================
console.log("[7/8] CircleOfFifths...");
import { getFifthCircleByAlter } from "../src/CircleOfFifths";

for (const alter of [-7, -5, -3, -1, 0, 1, 3, 5, 7]) {
    const result = getFifthCircleByAlter(alter);
    add("CircleOfFifths", "getFifthCircleByAlter", { alter }, result);
}

// ==================== PianoKey ====================
console.log("[8/8] PianoKey...");
import { PianoKey } from "../src/PianoKey";

for (const pitchInt of [48, 49, 50, 60, 61, 69, 72]) {
    const pk = PianoKey.fromPitchInt(pitchInt);
    add("PianoKey", "fromPitchInt", { pitchInt }, {
        isBlack: pk.isBlack,
        pitchValue: pk.pitchValue,
    });
}

// ==================== 写入 ====================
const outPath = resolve(OUT_DIR, "golden-vectors.json");
writeFileSync(outPath, JSON.stringify(vectors, null, 2) + "\n", "utf-8");

console.log(`\n✅ 完成!`);
console.log(`  向量数: ${vectors.length}`);
console.log(`  输出: ${outPath}`);
console.log(`\n按模块统计:`);
const byModule: Record<string, number> = {};
for (const v of vectors) {
    byModule[v.module] = (byModule[v.module] || 0) + 1;
}
for (const [mod, count] of Object.entries(byModule).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${mod}: ${count}`);
}
