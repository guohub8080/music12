/**
 * 生成和弦实例表(1056 条 = 88 公式 × 12 根音)
 *
 * 核心算法移植自 src/Chord/__helper__/generateChordInstanceMeta.ts,
 * 但输出 JSON 数组(而非写 .ts 文件)。
 *
 * 每条实例含:pianoKeyIdRoot, chordFormulaId, pianoKeyIds, pianoKeyIdsSorted,
 *            notesNum, pianoKeyIdToInterval, intervalToPianoKeyId, notes
 */
import { values } from "es-toolkit/compat";
import { CHORD_FORMULA_META_MAP } from "../src/ChordFormula/static/CHORD_FORMULA_META_MAP";
import type { I_ChordFormulaMeta } from "../src/ChordFormula/static/types";
import { Note } from "../src/Note";
import { Interval } from "../src/Interval";
import { getNoteByPianoKeyId } from "../src/Note";

type I_Interval = [string, number];
type I_NoteMeta = { step: string; alter: number; octaveGapToRoot: number };
type I_RootVariantMeta = {
    rootNoteStep: string;
    rootNoteAlter: number;
    isRootNoteNormal: boolean;
    isValid: boolean;
    notesMap: Record<number, I_NoteMeta>;
};
type I_ChordInstanceMeta = {
    pianoKeyIdRoot: number;
    chordFormulaId: string;
    notes: I_RootVariantMeta[];
};

function generateNotesMeta(
    rootNote: Note,
    pianoKeyIdToInterval: Record<number, { intervalType: string; intervalNum: number }>,
    intervalList: I_Interval[]
): I_RootVariantMeta[] {
    const notes: I_RootVariantMeta[] = [];
    const rootVariants: Note[] = [rootNote];

    if (rootNote.isBlack) {
        const samePitchNotes = rootNote.getSamePitchNotes({ isSelfIncluded: true, alterAbsLte: 1 });
        for (const altRoot of samePitchNotes) {
            if (altRoot.isNormal && altRoot.step !== rootNote.step) {
                rootVariants.push(altRoot);
                break;
            }
        }
    }

    for (const variant of rootVariants) {
        const notesMap: Record<number, I_NoteMeta> = {};
        let isValid = true;

        notesMap[variant.pianoKeyId] = {
            step: variant.step,
            alter: variant.alter,
            octaveGapToRoot: 0,
        };

        for (const [intervalType, degree] of intervalList) {
            try {
                const interval = new Interval(intervalType as any, degree);
                const targetNote = variant.getNoteByInterval(interval);
                notesMap[targetNote.pianoKeyId] = {
                    step: targetNote.step,
                    alter: targetNote.alter,
                    octaveGapToRoot: targetNote.octave - variant.octave,
                };
            } catch {
                isValid = false;
                break;
            }
        }

        notes.push({
            rootNoteStep: variant.step,
            rootNoteAlter: variant.alter,
            isRootNoteNormal: variant.isNormal,
            isValid,
            notesMap,
        });
    }

    return notes;
}

function generateChordInstances(formulaMeta: I_ChordFormulaMeta): I_ChordInstanceMeta[] {
    const instances: I_ChordInstanceMeta[] = [];

    for (let rootPianoKeyId = 0; rootPianoKeyId < 12; rootPianoKeyId++) {
        const rootNotes = getNoteByPianoKeyId(rootPianoKeyId, { octave: 4 }).filter((n: Note) => n.isNormal);
        if (rootNotes.length === 0) continue;

        const rootNote = rootNotes[0];
        // 音集层字段(pianoKeyIds/sorted/双映射/notesNum)不落盘——
        // 由 src/Chord/static/chord-instance-data.ts 加载器实时 enrich(已验证逐字段等价)
        const pianoKeyIdToInterval: Record<number, { intervalType: string; intervalNum: number }> = {};
        for (const [intervalType, degree] of formulaMeta.intervalList) {
            const interval = new Interval(intervalType as any, degree);
            const targetKeyId = rootNote.getNoteByInterval(interval).pianoKeyId;
            pianoKeyIdToInterval[targetKeyId] = { intervalType, intervalNum: degree };
        }
        pianoKeyIdToInterval[rootPianoKeyId] = { intervalType: "p", intervalNum: 1 };

        const notes = generateNotesMeta(rootNote, pianoKeyIdToInterval, formulaMeta.intervalList);

        instances.push({
            pianoKeyIdRoot: rootPianoKeyId,
            chordFormulaId: formulaMeta.chordFormulaId,
            notes,
        });
    }

    return instances;
}

export function exportChordInstances(): I_ChordInstanceMeta[] {
    const allInstances: I_ChordInstanceMeta[] = [];
    for (const meta of values(CHORD_FORMULA_META_MAP) as I_ChordFormulaMeta[]) {
        allInstances.push(...generateChordInstances(meta));
    }
    return allInstances;
}
