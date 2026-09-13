import { isNil, isNotNil } from "es-toolkit/predicate";
/**
 * 生成音阶实例表(528 条 = 44 调式 × 12 主音)
 *
 * 核心算法移植自 src/Scale/__helper__/generateScaleMeta.ts 的 generateModeData(),
 * 但输出 JSON 数组(而非写 .ts 文件)。
 */
import { defaultTo, range } from "es-toolkit/compat";
import { toPairs, keys, values } from "es-toolkit/compat";
import { SCALE_MODE_META_MAP } from "../src/ScaleMode/static/SCALE_MODE_META_MAP";
import type { I_ScaleModeMeta } from "../src/ScaleMode/static/types";
import type { t_scaleMode } from "../src/Scale/static/types";
import type { T_IntervalType } from "../src/common/static/INTERVAL_TYPES";
import { Note } from "../src/Note";
import { Interval } from "../src/Interval";
import { PianoKey } from "../src/PianoKey";
import { Scale } from "../src/Scale";

type I_ScaleInstance = {
    pianoKeyIdRoot: number;
    scaleModeId: string;
    pianoKeyIds: number[];
    pianoKeyIdsSorted: number[];
    degreeToPianoKeyId: Record<number, number | null>;
    pianoKeyIdToDegree: Record<number, number | null>;
    degreeAlterationsMap: Record<number, number>;
    scaleMode: I_ScaleModeMeta;
    scales: unknown[];
};

function generateModeData(modeMeta: I_ScaleModeMeta): I_ScaleInstance[] {
    const intervalList = modeMeta.intervalList;

    return range(12).map((rootPianoKey) => {
        const pianoKey = PianoKey.fromPitchInt(rootPianoKey + 48);
        const notes = pianoKey.getNotes({ isNormal: true, alterAbsLte: 1 });
        const rootNote = notes[0];

        // 直接从 modeMeta 计算(不经过 Scale 类——Scale 构造器读旧实例表,
        // 新增调式 key(如 IONIAN)在旧表不存在会鸡生蛋死锁)
        const notesPianoKeyList: number[] = [rootPianoKey];
        intervalList.forEach((item, idx) => {
            if (isNil(item)) return;
            const semi = modeMeta.semitonesList[idx];
            if (isNil(semi)) return;
            notesPianoKeyList.push((rootPianoKey + semi) % 12);
        });
        const orderedNotesPianoKeyList = [...notesPianoKeyList].sort((a, b) => a - b);

        const degreeToPianoKeyId: Record<number, number | null> = { 1: rootPianoKey };
        let noteIndex = 0;
        for (let i = 0; i < 6; i++) {
            const degree = i + 2;
            const intervalItem = intervalList[i];
            if (isNil(intervalItem)) {
                degreeToPianoKeyId[degree] = null;
            } else {
                noteIndex++;
                degreeToPianoKeyId[degree] = defaultTo(notesPianoKeyList[noteIndex], null);
            }
        }

        const pianoKeyIdToDegree: Record<number, number | null> = {};
        for (let key = 0; key < 12; key++) {
            pianoKeyIdToDegree[key] = null;
        }
        for (const [deg, keyId] of toPairs(degreeToPianoKeyId)) {
            if (isNotNil(keyId)) {
                pianoKeyIdToDegree[keyId as number] = Number(deg);
            }
        }

        // 拼写生成(2026-09-12 用户裁决):全部可能都展示——不做实用/理论调之分,
        // 消费端用 alterSum 等字段自行取舍;唯一排除规则:产生 ≥3 重升降的拼写
        // 报错删除(必有等音根音可代,与 scale-hash 的拼写上限裁决一致)
        const scales = pianoKey.getNotes({ alterAbsLte: 1 }).map((n: Note) => {
            const rootNoteSpelling = new Note(n.step, n.alter, 4);
            // octaveOffset 不入产物(2026-09-12 用户裁决:运行时零消费,死数据)
            const notesMap: Record<number, { step: string; alter: number } | null> = {
                1: { step: n.step, alter: n.alter },
            };

            for (let i = 0; i < intervalList.length; i++) {
                const degree = i + 2;
                const intervalItem = intervalList[i];
                if (isNil(intervalItem)) {
                    notesMap[degree] = null;
                } else {
                    const [quality, num] = intervalItem;
                    // ≥3 重升降 / 音程构造失败 → 该拼写整行删除(返回 null,下方过滤)
                    try {
                        const interval = new Interval(quality as T_IntervalType, num as number);
                        const targetNote = rootNoteSpelling.getNoteByInterval(interval);
                        if (Math.abs(targetNote.alter) >= 3) return null;
                        notesMap[degree] = {
                            step: targetNote.step,
                            alter: targetNote.alter,
                        };
                    } catch {
                        console.warn(
                            `[scale-instances] 拼法超界删除: ${modeMeta.scaleModeId} 根音 ${n.step}${n.alter >= 0 ? "+" : ""}${n.alter} 度 ${degree}`,
                        );
                        return null;
                    }
                }
            }

            // alterSum = 整个调式的全部升降号单位之和(根音计一次;重升记 2,
            // 升号根音加重升可自然超过 7——这是合法值,消费端自行判断取舍);
            // alterNoteCount = 有变音的音的个数(与 alterSum 是两个不同字段);
            // isTonicEnharmonic = 全部音都带变音(五声 5/5 也算,原硬编码 7 漏五声)
            let alterNoteCount = 0;
            let alterSum = 0;
            let noteTotal = 0;
            for (const key of keys(notesMap)) {
                const note = notesMap[Number(key)];
                if (isNotNil(note)) {
                    noteTotal++;
                    if (note.alter !== 0) {
                        alterNoteCount++;
                        alterSum += note.alter;
                    }
                }
            }

            return {
                tonicStep: n.step,
                tonicAlter: n.alter,
                isTonicNormal: rootNoteSpelling.isNormal,
                isTonicEnharmonic: alterNoteCount === noteTotal,
                isValid: true,
                alterNoteCount,
                alterSum,
                notesMap,
            };
        }).filter((s): s is NonNullable<typeof s> => s !== null);

        return {
            pianoKeyIdRoot: rootPianoKey,
            scaleModeId: modeMeta.scaleModeId,
            pianoKeyIds: notesPianoKeyList,
            pianoKeyIdsSorted: orderedNotesPianoKeyList,
            degreeToPianoKeyId,
            pianoKeyIdToDegree,
            degreeAlterationsMap: modeMeta.degreeAlterationsMap as Record<number, number>,
            scaleMode: modeMeta,
            scales,
        };
    });
}

export function exportScaleInstances(): I_ScaleInstance[] {
    const allInstances: I_ScaleInstance[] = [];
    for (const modeMeta of values(SCALE_MODE_META_MAP) as I_ScaleModeMeta[]) {
        allInstances.push(...generateModeData(modeMeta));
    }
    return allInstances;
}

/**
 * 大小调实例切片(24 条 = NATURAL_MAJOR/NATURAL_MINOR × 12 移调)。
 *
 * 用户需求(2026-09-12):大小调最常用,单独成表让只要大小调的消费端
 * import KB 级小表,避开 720 条全量表的加载/解析/打包(查询速度本身
 * 不是瓶颈——键集查询走 findByScaleHash O(1),此处优化的是加载面)。
 * 别名键(IONIAN/AEOLIAN)同形不重复收录,canonical 双调为准。
 */
export function exportMajorMinorScaleInstances(): I_ScaleInstance[] {
    const WANT = new Set(["NATURAL_MAJOR", "NATURAL_MINOR"]);
    const out: I_ScaleInstance[] = [];
    for (const modeMeta of values(SCALE_MODE_META_MAP) as I_ScaleModeMeta[]) {
        if (WANT.has(modeMeta.scaleModeId)) out.push(...generateModeData(modeMeta));
    }
    if (out.length !== 24) {
        throw new Error(`大小调切片应为 24 条(2 调式 × 12 移调),实际 ${out.length}`);
    }
    return out;
}
