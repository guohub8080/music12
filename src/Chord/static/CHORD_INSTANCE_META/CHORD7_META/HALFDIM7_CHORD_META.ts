import CHORD_FORMULA_ID from "@chord-formula/static/CHORD_FORMULA_ID"
import type { I_ChordInstanceMeta } from "@chord/static/types";

// 由 generateChordInstanceMeta.ts 自动生成
// 显式类型注解避免 TS 对字面量数组做联合推断（触发 TS2590）
const CHORD_META: I_ChordInstanceMeta[] = [
  {
    pianoKeyIdRoot: 0,
    chordFormulaId: CHORD_FORMULA_ID["halfdim7"],
    pianoKeyIds: [0, 3, 6, 10],
    pianoKeyIdsSorted: [0, 3, 6, 10],
    notesNum: 4,
    pianoKeyIdToInterval: { 0: { intervalType: 'p', intervalNum: 1 }, 3: { intervalType: 'min', intervalNum: 3 }, 6: { intervalType: 'dim', intervalNum: 5 }, 10: { intervalType: 'min', intervalNum: 7 } },
    intervalToPianoKeyId: { 1: { intervalType: 'p', pianoKeyId: 0 }, 3: { intervalType: 'min', pianoKeyId: 3 }, 5: { intervalType: 'dim', pianoKeyId: 6 }, 7: { intervalType: 'min', pianoKeyId: 10 } },
    notes: [
      {
        rootNoteStep: 'C',
        rootNoteAlter: 0,
        isRootNoteNormal: true,
        isValid: true,
        notesMap: { 3: { step: 'E', alter: -1, octaveGapToRoot: 0 }, 6: { step: 'G', alter: -1, octaveGapToRoot: 0 }, 10: { step: 'B', alter: -1, octaveGapToRoot: 0 } }
      }
    ]
  },
  {
    pianoKeyIdRoot: 1,
    chordFormulaId: CHORD_FORMULA_ID["halfdim7"],
    pianoKeyIds: [1, 4, 7, 11],
    pianoKeyIdsSorted: [1, 4, 7, 11],
    notesNum: 4,
    pianoKeyIdToInterval: { 1: { intervalType: 'p', intervalNum: 1 }, 4: { intervalType: 'min', intervalNum: 3 }, 7: { intervalType: 'dim', intervalNum: 5 }, 11: { intervalType: 'min', intervalNum: 7 } },
    intervalToPianoKeyId: { 1: { intervalType: 'p', pianoKeyId: 1 }, 3: { intervalType: 'min', pianoKeyId: 4 }, 5: { intervalType: 'dim', pianoKeyId: 7 }, 7: { intervalType: 'min', pianoKeyId: 11 } },
    notes: [
      {
        rootNoteStep: 'C',
        rootNoteAlter: 1,
        isRootNoteNormal: true,
        isValid: true,
        notesMap: { 4: { step: 'E', alter: 0, octaveGapToRoot: 0 }, 7: { step: 'G', alter: 0, octaveGapToRoot: 0 }, 11: { step: 'B', alter: 0, octaveGapToRoot: 0 } }
      },
      {
        rootNoteStep: 'D',
        rootNoteAlter: -1,
        isRootNoteNormal: true,
        isValid: true,
        notesMap: { 4: { step: 'F', alter: -1, octaveGapToRoot: 0 }, 7: { step: 'A', alter: -2, octaveGapToRoot: 0 }, 11: { step: 'C', alter: -1, octaveGapToRoot: 1 } }
      }
    ]
  },
  {
    pianoKeyIdRoot: 2,
    chordFormulaId: CHORD_FORMULA_ID["halfdim7"],
    pianoKeyIds: [2, 5, 8, 0],
    pianoKeyIdsSorted: [0, 2, 5, 8],
    notesNum: 4,
    pianoKeyIdToInterval: { 0: { intervalType: 'min', intervalNum: 7 }, 2: { intervalType: 'p', intervalNum: 1 }, 5: { intervalType: 'min', intervalNum: 3 }, 8: { intervalType: 'dim', intervalNum: 5 } },
    intervalToPianoKeyId: { 1: { intervalType: 'p', pianoKeyId: 2 }, 3: { intervalType: 'min', pianoKeyId: 5 }, 5: { intervalType: 'dim', pianoKeyId: 8 }, 7: { intervalType: 'min', pianoKeyId: 0 } },
    notes: [
      {
        rootNoteStep: 'D',
        rootNoteAlter: 0,
        isRootNoteNormal: true,
        isValid: true,
        notesMap: { 0: { step: 'C', alter: 0, octaveGapToRoot: 1 }, 5: { step: 'F', alter: 0, octaveGapToRoot: 0 }, 8: { step: 'A', alter: -1, octaveGapToRoot: 0 } }
      }
    ]
  },
  {
    pianoKeyIdRoot: 3,
    chordFormulaId: CHORD_FORMULA_ID["halfdim7"],
    pianoKeyIds: [3, 6, 9, 1],
    pianoKeyIdsSorted: [1, 3, 6, 9],
    notesNum: 4,
    pianoKeyIdToInterval: { 1: { intervalType: 'min', intervalNum: 7 }, 3: { intervalType: 'p', intervalNum: 1 }, 6: { intervalType: 'min', intervalNum: 3 }, 9: { intervalType: 'dim', intervalNum: 5 } },
    intervalToPianoKeyId: { 1: { intervalType: 'p', pianoKeyId: 3 }, 3: { intervalType: 'min', pianoKeyId: 6 }, 5: { intervalType: 'dim', pianoKeyId: 9 }, 7: { intervalType: 'min', pianoKeyId: 1 } },
    notes: [
      {
        rootNoteStep: 'D',
        rootNoteAlter: 1,
        isRootNoteNormal: true,
        isValid: true,
        notesMap: { 1: { step: 'C', alter: 1, octaveGapToRoot: 1 }, 6: { step: 'F', alter: 1, octaveGapToRoot: 0 }, 9: { step: 'A', alter: 0, octaveGapToRoot: 0 } }
      },
      {
        rootNoteStep: 'E',
        rootNoteAlter: -1,
        isRootNoteNormal: true,
        isValid: true,
        notesMap: { 1: { step: 'D', alter: -1, octaveGapToRoot: 1 }, 6: { step: 'G', alter: -1, octaveGapToRoot: 0 }, 9: { step: 'B', alter: -2, octaveGapToRoot: 0 } }
      }
    ]
  },
  {
    pianoKeyIdRoot: 4,
    chordFormulaId: CHORD_FORMULA_ID["halfdim7"],
    pianoKeyIds: [4, 7, 10, 2],
    pianoKeyIdsSorted: [2, 4, 7, 10],
    notesNum: 4,
    pianoKeyIdToInterval: { 2: { intervalType: 'min', intervalNum: 7 }, 4: { intervalType: 'p', intervalNum: 1 }, 7: { intervalType: 'min', intervalNum: 3 }, 10: { intervalType: 'dim', intervalNum: 5 } },
    intervalToPianoKeyId: { 1: { intervalType: 'p', pianoKeyId: 4 }, 3: { intervalType: 'min', pianoKeyId: 7 }, 5: { intervalType: 'dim', pianoKeyId: 10 }, 7: { intervalType: 'min', pianoKeyId: 2 } },
    notes: [
      {
        rootNoteStep: 'E',
        rootNoteAlter: 0,
        isRootNoteNormal: true,
        isValid: true,
        notesMap: { 2: { step: 'D', alter: 0, octaveGapToRoot: 1 }, 7: { step: 'G', alter: 0, octaveGapToRoot: 0 }, 10: { step: 'B', alter: -1, octaveGapToRoot: 0 } }
      }
    ]
  },
  {
    pianoKeyIdRoot: 5,
    chordFormulaId: CHORD_FORMULA_ID["halfdim7"],
    pianoKeyIds: [5, 8, 11, 3],
    pianoKeyIdsSorted: [3, 5, 8, 11],
    notesNum: 4,
    pianoKeyIdToInterval: { 3: { intervalType: 'min', intervalNum: 7 }, 5: { intervalType: 'p', intervalNum: 1 }, 8: { intervalType: 'min', intervalNum: 3 }, 11: { intervalType: 'dim', intervalNum: 5 } },
    intervalToPianoKeyId: { 1: { intervalType: 'p', pianoKeyId: 5 }, 3: { intervalType: 'min', pianoKeyId: 8 }, 5: { intervalType: 'dim', pianoKeyId: 11 }, 7: { intervalType: 'min', pianoKeyId: 3 } },
    notes: [
      {
        rootNoteStep: 'F',
        rootNoteAlter: 0,
        isRootNoteNormal: true,
        isValid: true,
        notesMap: { 3: { step: 'E', alter: -1, octaveGapToRoot: 1 }, 8: { step: 'A', alter: -1, octaveGapToRoot: 0 }, 11: { step: 'C', alter: -1, octaveGapToRoot: 1 } }
      }
    ]
  },
  {
    pianoKeyIdRoot: 6,
    chordFormulaId: CHORD_FORMULA_ID["halfdim7"],
    pianoKeyIds: [6, 9, 0, 4],
    pianoKeyIdsSorted: [0, 4, 6, 9],
    notesNum: 4,
    pianoKeyIdToInterval: { 0: { intervalType: 'dim', intervalNum: 5 }, 4: { intervalType: 'min', intervalNum: 7 }, 6: { intervalType: 'p', intervalNum: 1 }, 9: { intervalType: 'min', intervalNum: 3 } },
    intervalToPianoKeyId: { 1: { intervalType: 'p', pianoKeyId: 6 }, 3: { intervalType: 'min', pianoKeyId: 9 }, 5: { intervalType: 'dim', pianoKeyId: 0 }, 7: { intervalType: 'min', pianoKeyId: 4 } },
    notes: [
      {
        rootNoteStep: 'F',
        rootNoteAlter: 1,
        isRootNoteNormal: true,
        isValid: true,
        notesMap: { 0: { step: 'C', alter: 0, octaveGapToRoot: 1 }, 4: { step: 'E', alter: 0, octaveGapToRoot: 1 }, 9: { step: 'A', alter: 0, octaveGapToRoot: 0 } }
      },
      {
        rootNoteStep: 'G',
        rootNoteAlter: -1,
        isRootNoteNormal: true,
        isValid: true,
        notesMap: { 0: { step: 'D', alter: -2, octaveGapToRoot: 1 }, 4: { step: 'F', alter: -1, octaveGapToRoot: 1 }, 9: { step: 'B', alter: -2, octaveGapToRoot: 0 } }
      }
    ]
  },
  {
    pianoKeyIdRoot: 7,
    chordFormulaId: CHORD_FORMULA_ID["halfdim7"],
    pianoKeyIds: [7, 10, 1, 5],
    pianoKeyIdsSorted: [1, 5, 7, 10],
    notesNum: 4,
    pianoKeyIdToInterval: { 1: { intervalType: 'dim', intervalNum: 5 }, 5: { intervalType: 'min', intervalNum: 7 }, 7: { intervalType: 'p', intervalNum: 1 }, 10: { intervalType: 'min', intervalNum: 3 } },
    intervalToPianoKeyId: { 1: { intervalType: 'p', pianoKeyId: 7 }, 3: { intervalType: 'min', pianoKeyId: 10 }, 5: { intervalType: 'dim', pianoKeyId: 1 }, 7: { intervalType: 'min', pianoKeyId: 5 } },
    notes: [
      {
        rootNoteStep: 'G',
        rootNoteAlter: 0,
        isRootNoteNormal: true,
        isValid: true,
        notesMap: { 1: { step: 'D', alter: -1, octaveGapToRoot: 1 }, 5: { step: 'F', alter: 0, octaveGapToRoot: 1 }, 10: { step: 'B', alter: -1, octaveGapToRoot: 0 } }
      }
    ]
  },
  {
    pianoKeyIdRoot: 8,
    chordFormulaId: CHORD_FORMULA_ID["halfdim7"],
    pianoKeyIds: [8, 11, 2, 6],
    pianoKeyIdsSorted: [2, 6, 8, 11],
    notesNum: 4,
    pianoKeyIdToInterval: { 2: { intervalType: 'dim', intervalNum: 5 }, 6: { intervalType: 'min', intervalNum: 7 }, 8: { intervalType: 'p', intervalNum: 1 }, 11: { intervalType: 'min', intervalNum: 3 } },
    intervalToPianoKeyId: { 1: { intervalType: 'p', pianoKeyId: 8 }, 3: { intervalType: 'min', pianoKeyId: 11 }, 5: { intervalType: 'dim', pianoKeyId: 2 }, 7: { intervalType: 'min', pianoKeyId: 6 } },
    notes: [
      {
        rootNoteStep: 'G',
        rootNoteAlter: 1,
        isRootNoteNormal: true,
        isValid: true,
        notesMap: { 2: { step: 'D', alter: 0, octaveGapToRoot: 1 }, 6: { step: 'F', alter: 1, octaveGapToRoot: 1 }, 11: { step: 'B', alter: 0, octaveGapToRoot: 0 } }
      },
      {
        rootNoteStep: 'A',
        rootNoteAlter: -1,
        isRootNoteNormal: true,
        isValid: true,
        notesMap: { 2: { step: 'E', alter: -2, octaveGapToRoot: 1 }, 6: { step: 'G', alter: -1, octaveGapToRoot: 1 }, 11: { step: 'C', alter: -1, octaveGapToRoot: 1 } }
      }
    ]
  },
  {
    pianoKeyIdRoot: 9,
    chordFormulaId: CHORD_FORMULA_ID["halfdim7"],
    pianoKeyIds: [9, 0, 3, 7],
    pianoKeyIdsSorted: [0, 3, 7, 9],
    notesNum: 4,
    pianoKeyIdToInterval: { 0: { intervalType: 'min', intervalNum: 3 }, 3: { intervalType: 'dim', intervalNum: 5 }, 7: { intervalType: 'min', intervalNum: 7 }, 9: { intervalType: 'p', intervalNum: 1 } },
    intervalToPianoKeyId: { 1: { intervalType: 'p', pianoKeyId: 9 }, 3: { intervalType: 'min', pianoKeyId: 0 }, 5: { intervalType: 'dim', pianoKeyId: 3 }, 7: { intervalType: 'min', pianoKeyId: 7 } },
    notes: [
      {
        rootNoteStep: 'A',
        rootNoteAlter: 0,
        isRootNoteNormal: true,
        isValid: true,
        notesMap: { 0: { step: 'C', alter: 0, octaveGapToRoot: 1 }, 3: { step: 'E', alter: -1, octaveGapToRoot: 1 }, 7: { step: 'G', alter: 0, octaveGapToRoot: 1 } }
      }
    ]
  },
  {
    pianoKeyIdRoot: 10,
    chordFormulaId: CHORD_FORMULA_ID["halfdim7"],
    pianoKeyIds: [10, 1, 4, 8],
    pianoKeyIdsSorted: [1, 4, 8, 10],
    notesNum: 4,
    pianoKeyIdToInterval: { 1: { intervalType: 'min', intervalNum: 3 }, 4: { intervalType: 'dim', intervalNum: 5 }, 8: { intervalType: 'min', intervalNum: 7 }, 10: { intervalType: 'p', intervalNum: 1 } },
    intervalToPianoKeyId: { 1: { intervalType: 'p', pianoKeyId: 10 }, 3: { intervalType: 'min', pianoKeyId: 1 }, 5: { intervalType: 'dim', pianoKeyId: 4 }, 7: { intervalType: 'min', pianoKeyId: 8 } },
    notes: [
      {
        rootNoteStep: 'A',
        rootNoteAlter: 1,
        isRootNoteNormal: true,
        isValid: true,
        notesMap: { 1: { step: 'C', alter: 1, octaveGapToRoot: 1 }, 4: { step: 'E', alter: 0, octaveGapToRoot: 1 }, 8: { step: 'G', alter: 1, octaveGapToRoot: 1 } }
      },
      {
        rootNoteStep: 'B',
        rootNoteAlter: -1,
        isRootNoteNormal: true,
        isValid: true,
        notesMap: { 1: { step: 'D', alter: -1, octaveGapToRoot: 1 }, 4: { step: 'F', alter: -1, octaveGapToRoot: 1 }, 8: { step: 'A', alter: -1, octaveGapToRoot: 1 } }
      }
    ]
  },
  {
    pianoKeyIdRoot: 11,
    chordFormulaId: CHORD_FORMULA_ID["halfdim7"],
    pianoKeyIds: [11, 2, 5, 9],
    pianoKeyIdsSorted: [2, 5, 9, 11],
    notesNum: 4,
    pianoKeyIdToInterval: { 2: { intervalType: 'min', intervalNum: 3 }, 5: { intervalType: 'dim', intervalNum: 5 }, 9: { intervalType: 'min', intervalNum: 7 }, 11: { intervalType: 'p', intervalNum: 1 } },
    intervalToPianoKeyId: { 1: { intervalType: 'p', pianoKeyId: 11 }, 3: { intervalType: 'min', pianoKeyId: 2 }, 5: { intervalType: 'dim', pianoKeyId: 5 }, 7: { intervalType: 'min', pianoKeyId: 9 } },
    notes: [
      {
        rootNoteStep: 'B',
        rootNoteAlter: 0,
        isRootNoteNormal: true,
        isValid: true,
        notesMap: { 2: { step: 'D', alter: 0, octaveGapToRoot: 1 }, 5: { step: 'F', alter: 0, octaveGapToRoot: 1 }, 9: { step: 'A', alter: 0, octaveGapToRoot: 1 } }
      }
    ]
  }
]

export default CHORD_META;
