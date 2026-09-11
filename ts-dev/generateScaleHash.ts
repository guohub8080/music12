/**
 * 生成音阶哈希表 static-data/scale-hash.json(键集 → 调式读法 + 等音拼写层)
 *
 * 设计(2026-09-11 用户批准「你试一下弄scale-hash」,吸收 Find/notes 旧实现优点):
 *
 * ── 键 ─────────────────────────────────────────────────────
 * 字母序符号串(与 chord-hash 同构:C P D Q E F X G Y A Z B 去重排序拼接)。
 * 单表不分 K——键长自带基数信息(当前 5/7 音两类,96 键有值)。
 *
 * ── 值 = 读法列表 ──────────────────────────────────────────
 * 每条读法 = (根音 pianoKeyId, 调式形状) 的 canonical 代表:
 * - 同 intervalList 的别名键(IONIAN/雅清燕等 17 个)收编为 aliasModeIds,
 *   不展开成独立读法——大调音键集出 7 条 modal 读法而非 24 条噪音
 * - 度数语义层(吸收自 findNotesInScales 的 noteDegrees 设计):
 *   pianoKeyIdToDegree + degreeAlterationsMap,查表即得功能解释
 *
 * ── 等音拼写层(升降号区分的落点)──────────────────────────
 * 每读法挂 root 拼写变体表(白键单拼写,黑键双拼写):
 * - notes: 度数序拼写音名(根音拼写 + 调式音程逐度推导,纯数学零依赖)
 * - keySignature: 13 档实用大调调号中与音集字母变音吻合度最高者
 *   (平手优先根音自身大调的调号);accidentals 为偏离临时记号
 * - isTheoretical: 任何音需要重升降(♯♯/♭♭)即理论调,附 enharmonicRoot
 *   等音建议——第五圈哨兵 bug 的教训铸进 schema:显式标记,绝不静默。
 *   用户裁决(2026-09-11):超过重升/重降(≥3 重)的拼写变体整条排除,
 *   必有等音根音可代——拼写变体的变音上限就是 ♯♯/♭♭
 *
 * 关键乐理事实(读法级理论性):C♯ 大调实用(7♯)但 C♯ Lydian 理论(F♯♯,8♯ 位)——
 * 理论性是(根音拼写 × 调式)的属性,必须在读法粒度逐条判定。
 *
 * 运行时序:build-all 在 gen(编译+实例)之后调用;零 src import,无鸡生蛋。
 */
import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { serialize } from "./compileStaticData";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const SYMBOLS = ["C", "P", "D", "Q", "E", "F", "X", "G", "Y", "A", "Z", "B"];

// ── 拼写层数学基础 ──────────────────────────────────────────
const LETTERS = ["C", "D", "E", "F", "G", "A", "B"];
const LETTER_SEMI: Record<string, number> = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
/** 本位字母在五度圈大调位置:C=0,G=1♯ … F=-1♭;升半音 +7 圈位 */
const FIFTHS_POS: Record<string, number> = { F: -1, C: 0, G: 1, D: 2, A: 3, E: 4, B: 5 };
/** 调号变音顺序(五度圈方向) */
const SHARP_ORDER = ["F", "C", "G", "D", "A", "E", "B"];
const FLAT_ORDER = ["B", "E", "A", "D", "G", "C", "F"];
/** 钢琴键 → 根音拼写选项(白键 1,黑键 2) */
const ROOT_SPELLINGS: Record<number, Array<[string, number]>> = {
    0: [["C", 0]], 2: [["D", 0]], 4: [["E", 0]], 5: [["F", 0]], 7: [["G", 0]], 9: [["A", 0]], 11: [["B", 0]],
    1: [["C", 1], ["D", -1]], 3: [["D", 1], ["E", -1]], 6: [["F", 1], ["G", -1]],
    8: [["G", 1], ["A", -1]], 10: [["A", 1], ["B", -1]],
};

const accidentalStr = (a: number): string =>
    a === 0 ? "" : a === 1 ? "♯" : a === -1 ? "♭" : a === 2 ? "♯♯" : a === -2 ? "♭♭" : (a > 0 ? "♯" : "♭").repeat(Math.abs(a));

/** 实用大调调号 n(有符号,♯正♭负)→ 字母变音表 */
const sigLetterAlters = (n: number): Record<string, number> => {
    const m: Record<string, number> = {};
    if (n > 0) for (let i = 0; i < n; i++) m[SHARP_ORDER[i]] = 1;
    if (n < 0) for (let i = 0; i < -n; i++) m[FLAT_ORDER[i]] = -1;
    return m;
};

/**
 * 等音拼写变体:根音 (step, alter) + 调式各度半音 → 拼写音名 + 最佳调号。
 * 度数 d 的目标字母 = 根字母 + (d-1) 个字母位;变音 = 根变音 + 半音 - 字母自然距离。
 */
const buildSpelling = (
    step: string, alter: number,
    semis: Array<number | null>,
): {
    root: string
    notes: string[]
    keySignature: number
    accidentals: string[]
    isTheoretical: boolean
    enharmonicRoot: string | null
} | null => {
    const stepIdx = LETTERS.indexOf(step);
    const notes: string[] = [];
    const letterAlters: Record<string, number> = { [step]: alter };
    notes.push(step + accidentalStr(alter));
    let doubleAccidental = false;

    for (let i = 0; i < 6; i++) {
        const semi = semis[i];
        if (semi === null) continue;
        const deg = i + 2;
        const target = LETTERS[(stepIdx + deg - 1) % 7];
        const naturalDist = (LETTER_SEMI[target] - LETTER_SEMI[step] + 12) % 12;
        const targetAlter = alter + semi - naturalDist;
        // 用户裁决(2026-09-11):超过重升/重降(≥3 重)的拼写变体整条排除——
        // 它一定可被等音根音代替,保留上限就是 ♯♯/♭♭(落在双重的标理论调)
        if (Math.abs(targetAlter) > 2) return null;
        if (Math.abs(targetAlter) >= 2) doubleAccidental = true;
        letterAlters[target] = targetAlter;
        notes.push(target + accidentalStr(targetAlter));
    }

    // 最佳吻合调号:实用范围 [-7,+7],吻合度=字母变音一致数;平手先取根音大调位,再取偏离更少
    const parentSig = FIFTHS_POS[step] + 7 * alter;
    let best: { sig: number; agree: number; dev: number; isParent: boolean } | null = null;
    for (let sig = -7; sig <= 7; sig++) {
        const sigAlt = sigLetterAlters(sig);
        let agree = 0, dev = 0;
        for (const [letter, a] of Object.entries(letterAlters)) {
            // 调号未列出的字母 = 还原音(0)——undefined 不可直接比,否则 0 调号永不胜出
            if ((sigAlt[letter] ?? 0) === a) agree++;
            else dev++;
        }
        const cand = { sig, agree, dev, isParent: sig === parentSig };
        if (
            best === null ||
            cand.agree > best.agree ||
            (cand.agree === best.agree && cand.isParent && !best.isParent) ||
            (cand.agree === best.agree && cand.isParent === best.isParent && cand.dev < best.dev)
        ) best = cand;
    }
    const sigAlt = sigLetterAlters(best!.sig);
    const accidentals: string[] = [];
    for (const [letter, a] of Object.entries(letterAlters)) {
        if ((sigAlt[letter] ?? 0) !== a) accidentals.push(letter + (a === 0 ? "♮" : accidentalStr(a)));
    }

    return {
        root: step + accidentalStr(alter),
        notes,
        keySignature: best!.sig,
        accidentals,
        isTheoretical: doubleAccidental,
        enharmonicRoot: null, // 由调用方补(需要知道同键的另一拼写)
    };
};

/** 主流程(供 build-all 函数式调用) */
export const generateScaleHash = (): Record<string, unknown> => {
    const modes: Record<string, any> = JSON.parse(
        readFileSync(resolve(ROOT, "static-data", "scale-modes.json"), "utf-8"),
    );

    const table: Record<string, any[]> = {};
    // 形状去重:同键集内 (root, intervalList) 相同的调式合并,首个为 canonical
    const shapeIndex: Record<string, Record<string, number>> = {};
    let readingsTotal = 0;

    for (const [sid, m] of Object.entries(modes)) {
        const semis: Array<number | null> = m.semitonesList;
        const shape = JSON.stringify(m.intervalList);

        for (let root = 0; root < 12; root++) {
            const keyIds = [root, ...semis.map(s => (s === null ? null : (root + s) % 12))]
                .filter((x): x is number => x !== null);
            const sorted = [...new Set(keyIds)].sort((a, b) => a - b);
            const key = sorted.map(i => SYMBOLS[i]).sort().join("");

            const perKey = (table[key] ??= []);
            shapeIndex[key] ??= {};
            const existing = shapeIndex[key][`${root}|${shape}`];

            if (existing !== undefined) {
                perKey[existing].aliasModeIds.push(sid); // 同形别名收编
                continue;
            }
            shapeIndex[key][`${root}|${shape}`] = perKey.length;

            const degreeToPianoKeyId: Record<string, number> = { "1": root };
            const pianoKeyIdToDegree: Record<string, number> = { [String(root)]: 1 };
            semis.forEach((s, i) => {
                if (s === null) return;
                const id = (root + s) % 12;
                degreeToPianoKeyId[String(i + 2)] = id;
                pianoKeyIdToDegree[String(id)] = i + 2;
            });

            const spellings = ROOT_SPELLINGS[root]
                .map(([step, alter]) => buildSpelling(step, alter, semis))
                .filter((s): s is NonNullable<typeof s> => s !== null);
            if (spellings.length === 0) {
                throw new Error(`scale-hash: ${sid}@${root} 两个根音拼写全部超重升降——理论上有等音可代,不应发生`);
            }
            // 理论调的等音建议 = 同键另一根音拼写中实用者
            for (const sp of spellings) {
                if (!sp.isTheoretical) continue;
                const other = spellings.find(o => o !== sp && !o.isTheoretical);
                sp.enharmonicRoot = other ? other.root : null;
            }

            perKey.push({
                rootPianoKeyId: root,
                rootPianoKeySymbol: SYMBOLS[root],
                scaleModeId: sid,
                cnName: m.name,
                type: m.type,
                forte: m.forte,
                tags: m.tags,
                aliasModeIds: [] as string[],
                pianoKeyIds: keyIds,
                pianoKeyIdToDegree,
                degreeAlterationsMap: m.degreeAlterationsMap,
                spellings,
            });
            readingsTotal++;
        }
    }

    // 紧凑序列化(复用编译器 pretty):≤80 字符的数组(pianoKeyIds/notes/tags 等)单行
    writeFileSync(resolve(ROOT, "static-data", "scale-hash.json"), serialize(table), "utf-8");

    // ── 自检:覆盖完整性(keep-all-unmatched 的 scale 版)────────
    let covered = 0;
    for (const readings of Object.values(table)) {
        for (const r of readings) covered += 1 + r.aliasModeIds.length;
    }
    const expected = Object.keys(modes).length * 12;
    if (covered !== expected) {
        throw new Error(`scale-hash 覆盖不完整:${covered}/${expected}(canonical+alias 应等于 调式数×12)`);
    }

    console.log(`  ✓ scale-hash.json (${Object.keys(table).length} 键集, ${readingsTotal} 条读法, 覆盖 ${covered}/${expected} 实例)`);
    return table;
};

// 直接执行(非被 import)
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
    console.log("=== scale-hash 生成 ===");
    generateScaleHash();
}
