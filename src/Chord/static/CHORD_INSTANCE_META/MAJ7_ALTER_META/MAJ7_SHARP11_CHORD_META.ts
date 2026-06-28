import CHORD_FORMULA_ID from "@chord-formula/static/CHORD_FORMULA_ID"
import type { I_ChordInstanceMeta } from "@chord/static/types";

// 由 generateChordInstanceMeta.ts 自动生成
// 显式类型注解避免 TS 对字面量数组做联合推断（触发 TS2590）
const CHORD_META: I_ChordInstanceMeta[] = [
  {
    pianoKeyIdRoot: 0,
    chordFormulaId: CHORD_FORMULA_ID["maj7#11"],
    pianoKeyIds: [0, 4, 7, 11, 6],
    pianoKeyIdsSorted: [0, 4, 6, 7, 11],
    notesNum: 5,
    pianoKeyIdToInterval: { 0: { intervalType: 'p', intervalNum: 1 }, 4: { intervalType: 'maj', intervalNum: 3 }, 6: { intervalType: 'aug', intervalNum: 11 }, 7: { intervalType: 'p', intervalNum: 5 }, 11: { intervalType: 'maj', intervalNum: 7 } },
    intervalToPianoKeyId: { 1: { intervalType: 'p', pianoKeyId: 0 }, 3: { intervalType: 'maj', pianoKeyId: 4 }, 5: { intervalType: 'p', pianoKeyId: 7 }, 7: { intervalType: 'maj', pianoKeyId: 11 }, 11: { intervalType: 'aug', pianoKeyId: 6 } },
    notes: [
      {
        rootNoteStep: 'C',
        rootNoteAlter: 0,
        isRootNoteNormal: true,
        isValid: true,
        notesMap: { 4: { step: 'E', alter: 0, octaveGapToRoot: 0 }, 6: { step: 'F', alter: 1, octaveGapToRoot: 1 }, 7: { step: 'G', alter: 0, octaveGapToRoot: 0 }, 11: { step: 'B', alter: 0, octaveGapToRoot: 0 } }
      }
    ]
  },
  {
    pianoKeyIdRoot: 1,
    chordFormulaId: CHORD_FORMULA_ID["maj7#11"],
    pianoKeyIds: [1, 5, 8, 0, 7],
    pianoKeyIdsSorted: [0, 1, 5, 7, 8],
    notesNum: 5,
    pianoKeyIdToInterval: { 0: { intervalType: 'maj', intervalNum: 7 }, 1: { intervalType: 'p', intervalNum: 1 }, 5: { intervalType: 'maj', intervalNum: 3 }, 7: { intervalType: 'aug', intervalNum: 11 }, 8: { intervalType: 'p', intervalNum: 5 } },
    intervalToPianoKeyId: { 1: { intervalType: 'p', pianoKeyId: 1 }, 3: { intervalType: 'maj', pianoKeyId: 5 }, 5: { intervalType: 'p', pianoKeyId: 8 }, 7: { intervalType: 'maj', pianoKeyId: 0 }, 11: { intervalType: 'aug', pianoKeyId: 7 } },
    notes: [
      {
        rootNoteStep: 'C',
        rootNoteAlter: 1,
        isRootNoteNormal: true,
        isValid: true,
        notesMap: { 0: { step: 'B', alter: 1, octaveGapToRoot: 0 }, 5: { step: 'E', alter: 1, octaveGapToRoot: 0 }, 7: { step: 'F', alter: 2, octaveGapToRoot: 1 }, 8: { step: 'G', alter: 1, octaveGapToRoot: 0 } }
      },
      {
        rootNoteStep: 'D',
        rootNoteAlter: -1,
        isRootNoteNormal: true,
        isValid: true,
        notesMap: { 0: { step: 'C', alter: 0, octaveGapToRoot: 1 }, 5: { step: 'F', alter: 0, octaveGapToRoot: 0 }, 7: { step: 'G', alter: 0, octaveGapToRoot: 1 }, 8: { step: 'A', alter: -1, octaveGapToRoot: 0 } }
      }
    ]
  },
  {
    pianoKeyIdRoot: 2,
    chordFormulaId: CHORD_FORMULA_ID["maj7#11"],
    pianoKeyIds: [2, 6, 9, 1, 8],
    pianoKeyIdsSorted: [1, 2, 6, 8, 9],
    notesNum: 5,
    pianoKeyIdToInterval: { 1: { intervalType: 'maj', intervalNum: 7 }, 2: { intervalType: 'p', intervalNum: 1 }, 6: { intervalType: 'maj', intervalNum: 3 }, 8: { intervalType: 'aug', intervalNum: 11 }, 9: { intervalType: 'p', intervalNum: 5 } },
    intervalToPianoKeyId: { 1: { intervalType: 'p', pianoKeyId: 2 }, 3: { intervalType: 'maj', pianoKeyId: 6 }, 5: { intervalType: 'p', pianoKeyId: 9 }, 7: { intervalType: 'maj', pianoKeyId: 1 }, 11: { intervalType: 'aug', pianoKeyId: 8 } },
    notes: [
      {
        rootNoteStep: 'D',
        rootNoteAlter: 0,
        isRootNoteNormal: true,
        isValid: true,
        notesMap: { 1: { step: 'C', alter: 1, octaveGapToRoot: 1 }, 6: { step: 'F', alter: 1, octaveGapToRoot: 0 }, 8: { step: 'G', alter: 1, octaveGapToRoot: 1 }, 9: { step: 'A', alter: 0, octaveGapToRoot: 0 } }
      }
    ]
  },
  {
    pianoKeyIdRoot: 3,
    chordFormulaId: CHORD_FORMULA_ID["maj7#11"],
    pianoKeyIds: [3, 7, 10, 2, 9],
    pianoKeyIdsSorted: [2, 3, 7, 9, 10],
    notesNum: 5,
    pianoKeyIdToInterval: { 2: { intervalType: 'maj', intervalNum: 7 }, 3: { intervalType: 'p', intervalNum: 1 }, 7: { intervalType: 'maj', intervalNum: 3 }, 9: { intervalType: 'aug', intervalNum: 11 }, 10: { intervalType: 'p', intervalNum: 5 } },
    intervalToPianoKeyId: { 1: { intervalType: 'p', pianoKeyId: 3 }, 3: { intervalType: 'maj', pianoKeyId: 7 }, 5: { intervalType: 'p', pianoKeyId: 10 }, 7: { intervalType: 'maj', pianoKeyId: 2 }, 11: { intervalType: 'aug', pianoKeyId: 9 } },
    notes: [
      {
        rootNoteStep: 'D',
        rootNoteAlter: 1,
        isRootNoteNormal: true,
        isValid: true,
        notesMap: { 2: { step: 'C', alter: 2, octaveGapToRoot: 1 }, 7: { step: 'F', alter: 2, octaveGapToRoot: 0 }, 9: { step: 'G', alter: 2, octaveGapToRoot: 1 }, 10: { step: 'A', alter: 1, octaveGapToRoot: 0 } }
      },
      {
        rootNoteStep: 'E',
        rootNoteAlter: -1,
        isRootNoteNormal: true,
        isValid: true,
        notesMap: { 2: { step: 'D', alter: 0, octaveGapToRoot: 1 }, 7: { step: 'G', alter: 0, octaveGapToRoot: 0 }, 9: { step: 'A', alter: 0, octaveGapToRoot: 1 }, 10: { step: 'B', alter: -1, octaveGapToRoot: 0 } }
      }
    ]
  },
  {
    pianoKeyIdRoot: 4,
    chordFormulaId: CHORD_FORMULA_ID["maj7#11"],
    pianoKeyIds: [4, 8, 11, 3, 10],
    pianoKeyIdsSorted: [3, 4, 8, 10, 11],
    notesNum: 5,
    pianoKeyIdToInterval: { 3: { intervalType: 'maj', intervalNum: 7 }, 4: { intervalType: 'p', intervalNum: 1 }, 8: { intervalType: 'maj', intervalNum: 3 }, 10: { intervalType: 'aug', intervalNum: 11 }, 11: { intervalType: 'p', intervalNum: 5 } },
    intervalToPianoKeyId: { 1: { intervalType: 'p', pianoKeyId: 4 }, 3: { intervalType: 'maj', pianoKeyId: 8 }, 5: { intervalType: 'p', pianoKeyId: 11 }, 7: { intervalType: 'maj', pianoKeyId: 3 }, 11: { intervalType: 'aug', pianoKeyId: 10 } },
    notes: [
      {
        rootNoteStep: 'E',
        rootNoteAlter: 0,
        isRootNoteNormal: true,
        isValid: true,
        notesMap: { 3: { step: 'D', alter: 1, octaveGapToRoot: 1 }, 8: { step: 'G', alter: 1, octaveGapToRoot: 0 }, 10: { step: 'A', alter: 1, octaveGapToRoot: 1 }, 11: { step: 'B', alter: 0, octaveGapToRoot: 0 } }
      }
    ]
  },
  {
    pianoKeyIdRoot: 5,
    chordFormulaId: CHORD_FORMULA_ID["maj7#11"],
    pianoKeyIds: [5, 9, 0, 4, 11],
    pianoKeyIdsSorted: [0, 4, 5, 9, 11],
    notesNum: 5,
    pianoKeyIdToInterval: { 0: { intervalType: 'p', intervalNum: 5 }, 4: { intervalType: 'maj', intervalNum: 7 }, 5: { intervalType: 'p', intervalNum: 1 }, 9: { intervalType: 'maj', intervalNum: 3 }, 11: { intervalType: 'aug', intervalNum: 11 } },
    intervalToPianoKeyId: { 1: { intervalType: 'p', pianoKeyId: 5 }, 3: { intervalType: 'maj', pianoKeyId: 9 }, 5: { intervalType: 'p', pianoKeyId: 0 }, 7: { intervalType: 'maj', pianoKeyId: 4 }, 11: { intervalType: 'aug', pianoKeyId: 11 } },
    notes: [
      {
        rootNoteStep: 'F',
        rootNoteAlter: 0,
        isRootNoteNormal: true,
        isValid: true,
        notesMap: { 0: { step: 'C', alter: 0, octaveGapToRoot: 1 }, 4: { step: 'E', alter: 0, octaveGapToRoot: 1 }, 9: { step: 'A', alter: 0, octaveGapToRoot: 0 }, 11: { step: 'B', alter: 0, octaveGapToRoot: 1 } }
      }
    ]
  },
  {
    pianoKeyIdRoot: 6,
    chordFormulaId: CHORD_FORMULA_ID["maj7#11"],
    pianoKeyIds: [6, 10, 1, 5, 0],
    pianoKeyIdsSorted: [0, 1, 5, 6, 10],
    notesNum: 5,
    pianoKeyIdToInterval: { 0: { intervalType: 'aug', intervalNum: 11 }, 1: { intervalType: 'p', intervalNum: 5 }, 5: { intervalType: 'maj', intervalNum: 7 }, 6: { intervalType: 'p', intervalNum: 1 }, 10: { intervalType: 'maj', intervalNum: 3 } },
    intervalToPianoKeyId: { 1: { intervalType: 'p', pianoKeyId: 6 }, 3: { intervalType: 'maj', pianoKeyId: 10 }, 5: { intervalType: 'p', pianoKeyId: 1 }, 7: { intervalType: 'maj', pianoKeyId: 5 }, 11: { intervalType: 'aug', pianoKeyId: 0 } },
    notes: [
      {
        rootNoteStep: 'F',
        rootNoteAlter: 1,
        isRootNoteNormal: true,
        isValid: true,
        notesMap: { 0: { step: 'B', alter: 1, octaveGapToRoot: 1 }, 1: { step: 'C', alter: 1, octaveGapToRoot: 1 }, 5: { step: 'E', alter: 1, octaveGapToRoot: 1 }, 10: { step: 'A', alter: 1, octaveGapToRoot: 0 } }
      },
      {
        rootNoteStep: 'G',
        rootNoteAlter: -1,
        isRootNoteNormal: true,
        isValid: true,
        notesMap: { 0: { step: 'C', alter: 0, octaveGapToRoot: 2 }, 1: { step: 'D', alter: -1, octaveGapToRoot: 1 }, 5: { step: 'F', alter: 0, octaveGapToRoot: 1 }, 10: { step: 'B', alter: -1, octaveGapToRoot: 0 } }
      }
    ]
  },
  {
    pianoKeyIdRoot: 7,
    chordFormulaId: CHORD_FORMULA_ID["maj7#11"],
    pianoKeyIds: [7, 11, 2, 6, 1],
    pianoKeyIdsSorted: [1, 2, 6, 7, 11],
    notesNum: 5,
    pianoKeyIdToInterval: { 1: { intervalType: 'aug', intervalNum: 11 }, 2: { intervalType: 'p', intervalNum: 5 }, 6: { intervalType: 'maj', intervalNum: 7 }, 7: { intervalType: 'p', intervalNum: 1 }, 11: { intervalType: 'maj', intervalNum: 3 } },
    intervalToPianoKeyId: { 1: { intervalType: 'p', pianoKeyId: 7 }, 3: { intervalType: 'maj', pianoKeyId: 11 }, 5: { intervalType: 'p', pianoKeyId: 2 }, 7: { intervalType: 'maj', pianoKeyId: 6 }, 11: { intervalType: 'aug', pianoKeyId: 1 } },
    notes: [
      {
        rootNoteStep: 'G',
        rootNoteAlter: 0,
        isRootNoteNormal: true,
        isValid: true,
        notesMap: { 1: { step: 'C', alter: 1, octaveGapToRoot: 2 }, 2: { step: 'D', alter: 0, octaveGapToRoot: 1 }, 6: { step: 'F', alter: 1, octaveGapToRoot: 1 }, 11: { step: 'B', alter: 0, octaveGapToRoot: 0 } }
      }
    ]
  },
  {
    pianoKeyIdRoot: 8,
    chordFormulaId: CHORD_FORMULA_ID["maj7#11"],
    pianoKeyIds: [8, 0, 3, 7, 2],
    pianoKeyIdsSorted: [0, 2, 3, 7, 8],
    notesNum: 5,
    pianoKeyIdToInterval: { 0: { intervalType: 'maj', intervalNum: 3 }, 2: { intervalType: 'aug', intervalNum: 11 }, 3: { intervalType: 'p', intervalNum: 5 }, 7: { intervalType: 'maj', intervalNum: 7 }, 8: { intervalType: 'p', intervalNum: 1 } },
    intervalToPianoKeyId: { 1: { intervalType: 'p', pianoKeyId: 8 }, 3: { intervalType: 'maj', pianoKeyId: 0 }, 5: { intervalType: 'p', pianoKeyId: 3 }, 7: { intervalType: 'maj', pianoKeyId: 7 }, 11: { intervalType: 'aug', pianoKeyId: 2 } },
    notes: [
      {
        rootNoteStep: 'G',
        rootNoteAlter: 1,
        isRootNoteNormal: true,
        isValid: true,
        notesMap: { 0: { step: 'B', alter: 1, octaveGapToRoot: 0 }, 2: { step: 'C', alter: 2, octaveGapToRoot: 2 }, 3: { step: 'D', alter: 1, octaveGapToRoot: 1 }, 7: { step: 'F', alter: 2, octaveGapToRoot: 1 } }
      },
      {
        rootNoteStep: 'A',
        rootNoteAlter: -1,
        isRootNoteNormal: true,
        isValid: true,
        notesMap: { 0: { step: 'C', alter: 0, octaveGapToRoot: 1 }, 2: { step: 'D', alter: 0, octaveGapToRoot: 2 }, 3: { step: 'E', alter: -1, octaveGapToRoot: 1 }, 7: { step: 'G', alter: 0, octaveGapToRoot: 1 } }
      }
    ]
  },
  {
    pianoKeyIdRoot: 9,
    chordFormulaId: CHORD_FORMULA_ID["maj7#11"],
    pianoKeyIds: [9, 1, 4, 8, 3],
    pianoKeyIdsSorted: [1, 3, 4, 8, 9],
    notesNum: 5,
    pianoKeyIdToInterval: { 1: { intervalType: 'maj', intervalNum: 3 }, 3: { intervalType: 'aug', intervalNum: 11 }, 4: { intervalType: 'p', intervalNum: 5 }, 8: { intervalType: 'maj', intervalNum: 7 }, 9: { intervalType: 'p', intervalNum: 1 } },
    intervalToPianoKeyId: { 1: { intervalType: 'p', pianoKeyId: 9 }, 3: { intervalType: 'maj', pianoKeyId: 1 }, 5: { intervalType: 'p', pianoKeyId: 4 }, 7: { intervalType: 'maj', pianoKeyId: 8 }, 11: { intervalType: 'aug', pianoKeyId: 3 } },
    notes: [
      {
        rootNoteStep: 'A',
        rootNoteAlter: 0,
        isRootNoteNormal: true,
        isValid: true,
        notesMap: { 1: { step: 'C', alter: 1, octaveGapToRoot: 1 }, 3: { step: 'D', alter: 1, octaveGapToRoot: 2 }, 4: { step: 'E', alter: 0, octaveGapToRoot: 1 }, 8: { step: 'G', alter: 1, octaveGapToRoot: 1 } }
      }
    ]
  },
  {
    pianoKeyIdRoot: 10,
    chordFormulaId: CHORD_FORMULA_ID["maj7#11"],
    pianoKeyIds: [10, 2, 5, 9, 4],
    pianoKeyIdsSorted: [2, 4, 5, 9, 10],
    notesNum: 5,
    pianoKeyIdToInterval: { 2: { intervalType: 'maj', intervalNum: 3 }, 4: { intervalType: 'aug', intervalNum: 11 }, 5: { intervalType: 'p', intervalNum: 5 }, 9: { intervalType: 'maj', intervalNum: 7 }, 10: { intervalType: 'p', intervalNum: 1 } },
    intervalToPianoKeyId: { 1: { intervalType: 'p', pianoKeyId: 10 }, 3: { intervalType: 'maj', pianoKeyId: 2 }, 5: { intervalType: 'p', pianoKeyId: 5 }, 7: { intervalType: 'maj', pianoKeyId: 9 }, 11: { intervalType: 'aug', pianoKeyId: 4 } },
    notes: [
      {
        rootNoteStep: 'A',
        rootNoteAlter: 1,
        isRootNoteNormal: true,
        isValid: true,
        notesMap: { 2: { step: 'C', alter: 2, octaveGapToRoot: 1 }, 4: { step: 'D', alter: 2, octaveGapToRoot: 2 }, 5: { step: 'E', alter: 1, octaveGapToRoot: 1 }, 9: { step: 'G', alter: 2, octaveGapToRoot: 1 } }
      },
      {
        rootNoteStep: 'B',
        rootNoteAlter: -1,
        isRootNoteNormal: true,
        isValid: true,
        notesMap: { 2: { step: 'D', alter: 0, octaveGapToRoot: 1 }, 4: { step: 'E', alter: 0, octaveGapToRoot: 2 }, 5: { step: 'F', alter: 0, octaveGapToRoot: 1 }, 9: { step: 'A', alter: 0, octaveGapToRoot: 1 } }
      }
    ]
  },
  {
    pianoKeyIdRoot: 11,
    chordFormulaId: CHORD_FORMULA_ID["maj7#11"],
    pianoKeyIds: [11, 3, 6, 10, 5],
    pianoKeyIdsSorted: [3, 5, 6, 10, 11],
    notesNum: 5,
    pianoKeyIdToInterval: { 3: { intervalType: 'maj', intervalNum: 3 }, 5: { intervalType: 'aug', intervalNum: 11 }, 6: { intervalType: 'p', intervalNum: 5 }, 10: { intervalType: 'maj', intervalNum: 7 }, 11: { intervalType: 'p', intervalNum: 1 } },
    intervalToPianoKeyId: { 1: { intervalType: 'p', pianoKeyId: 11 }, 3: { intervalType: 'maj', pianoKeyId: 3 }, 5: { intervalType: 'p', pianoKeyId: 6 }, 7: { intervalType: 'maj', pianoKeyId: 10 }, 11: { intervalType: 'aug', pianoKeyId: 5 } },
    notes: [
      {
        rootNoteStep: 'B',
        rootNoteAlter: 0,
        isRootNoteNormal: true,
        isValid: true,
        notesMap: { 3: { step: 'D', alter: 1, octaveGapToRoot: 1 }, 5: { step: 'E', alter: 1, octaveGapToRoot: 2 }, 6: { step: 'F', alter: 1, octaveGapToRoot: 1 }, 10: { step: 'A', alter: 1, octaveGapToRoot: 1 } }
      }
    ]
  }
]

export default CHORD_META;
