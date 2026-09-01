/**
 * 生成音阶实例表(528 条 = 44 调式 × 12 主音)
 *
 * 核心算法移植自 src/Scale/__helper__/generateScaleMeta.ts 的 generateModeData(),
 * 但输出 JSON 数组(而非写 .ts 文件)。
 */
import { range } from "es-toolkit/compat";
import { toPairs, keys, values } from "es-toolkit/compat";
import { isDefined } from "../src/common/utils/isDefined";
import { isNil } from "es-toolkit";
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
        const scale = new Scale(rootNote.pianoKeyId, modeMeta.scaleModeId as t_scaleMode);

        const notesPianoKeyList = scale.pianoKeyIds;
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
                degreeToPianoKeyId[degree] = notesPianoKeyList[noteIndex] ?? null;
            }
        }

        const pianoKeyIdToDegree: Record<number, number | null> = {};
        for (let key = 0; key < 12; key++) {
            pianoKeyIdToDegree[key] = null;
        }
        for (const [deg, keyId] of toPairs(degreeToPianoKeyId)) {
            if (isDefined(keyId)) {
                pianoKeyIdToDegree[keyId as number] = Number(deg);
            }
        }

        const scales = pianoKey.getNotes({ alterAbsLte: 1 }).map((n: Note) => {
            const rootNoteSpelling = new Note(n.step, n.alter, 4);
            const notesMap: Record<number, { step: string; alter: number; octaveOffset: number } | null> = {
                1: { step: n.step, alter: n.alter, octaveOffset: 0 },
            };
            let isValid = true;

            for (let i = 0; i < intervalList.length; i++) {
                const degree = i + 2;
                const intervalItem = intervalList[i];
                if (isNil(intervalItem)) {
                    notesMap[degree] = null;
                } else {
                    const [quality, num] = intervalItem;
                    try {
                        const interval = new Interval(quality as T_IntervalType, num as number);
                        const targetNote = rootNoteSpelling.getNoteByInterval(interval);
                        notesMap[degree] = {
                            step: targetNote.step,
                            alter: targetNote.alter,
                            octaveOffset: targetNote.octave - 4,
                        };
                    } catch {
                        isValid = false;
                        break;
                    }
                }
            }

            let alterNoteCount = n.alter !== 0 ? 1 : 0;
            let alterSum = n.alter;
            for (const key of keys(notesMap)) {
                const note = notesMap[Number(key)];
                if (isDefined(note) && note.alter !== 0) {
                    alterNoteCount++;
                    alterSum += note.alter;
                }
            }

            if (!isValid) {
                return {
                    tonicStep: n.step,
                    tonicAlter: n.alter,
                    isTonicNormal: rootNoteSpelling.isNormal,
                    isValid: false,
                };
            }

            return {
                tonicStep: n.step,
                tonicAlter: n.alter,
                isTonicNormal: rootNoteSpelling.isNormal,
                isTonicEnharmonic: alterNoteCount === 7,
                isValid: true,
                alterNoteCount,
                alterSum,
                notesMap,
            };
        });

        return {
            pianoKeyIdRoot: rootPianoKey,
            scaleModeId: modeMeta.scaleModeId,
            pianoKeyIds: notesPianoKeyList,
            pianoKeyIdsSorted: orderedNotesPianoKeyList,
            degreeToPianoKeyId,
            pianoKeyIdToDegree,
            degreeAlterationsMap: scale.scaleMode.degreeAlterationsMap,
            scaleMode: scale.scaleMode,
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
