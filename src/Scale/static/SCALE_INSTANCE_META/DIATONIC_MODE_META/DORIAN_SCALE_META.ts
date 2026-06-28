import SCALE_MODE_ID from "../../../../ScaleMode/static/SCALE_MODE_ID"

// 由 generateScaleMeta.ts 自动生成
export default [
  {
    pianoKeyIdRoot: 0,
    scaleModeId: SCALE_MODE_ID.Dorian,
    pianoKeyIds: [0, 2, 3, 5, 7, 9, 10],
    pianoKeyIdsSorted: [0, 2, 3, 5, 7, 9, 10],
    degreeToPianoKeyId: { 1: 0, 2: 2, 3: 3, 4: 5, 5: 7, 6: 9, 7: 10 },
    pianoKeyIdToDegree: { 0: 1, 1: null, 2: 2, 3: 3, 4: null, 5: 4, 6: null, 7: 5, 8: null, 9: 6, 10: 7, 11: null },
    degreeAlterationsMap: { 2: 0, 3: -1, 4: 0, 5: 0, 6: 0, 7: -1 },
    scaleMode: {
      scaleModeId: SCALE_MODE_ID.Dorian,
      intervalList: [
        [
          'maj',
          2
        ],
        [
          'min',
          3
        ],
        [
          'p',
          4
        ],
        [
          'p',
          5
        ],
        [
          'maj',
          6
        ],
        [
          'min',
          7
        ]
      ],
      intervalMap: { 2: 'maj', 3: 'min', 4: 'p', 5: 'p', 6: 'maj', 7: 'min' },
      semitonesList: [2, 3, 5, 7, 9, 10],
      semitonesMap: { 2: 2, 3: 3, 4: 5, 5: 7, 6: 9, 7: 10 },
      degreeAlterationsList: [0, -1, 0, 0, 0, -1],
      degreeAlterationsMap: { 2: 0, 3: -1, 4: 0, 5: 0, 6: 0, 7: -1 },
      name: 'Dorian',
      type: 'minor',
      family: 'diatonic',
      description: '自然大调的 II 级音阶，由 C 大调的 D 进行到高八度的 D，构成音分别为：1 2 b3 4 5 6 b7 1'
    },
    scales: [
      {
        tonicStep: 'C',
        tonicAlter: 0,
        isTonicNormal: true,
        isTonicEnharmonic: false,
        isValid: true,
        alterNoteCount: 2,
        alterSum: -2,
        notesMap: {
          1: { step: 'C', alter: 0, octaveOffset: 0 },
          2: { step: 'D', alter: 0, octaveOffset: 0 },
          3: { step: 'E', alter: -1, octaveOffset: 0 },
          4: { step: 'F', alter: 0, octaveOffset: 0 },
          5: { step: 'G', alter: 0, octaveOffset: 0 },
          6: { step: 'A', alter: 0, octaveOffset: 0 },
          7: { step: 'B', alter: -1, octaveOffset: 0 }
        }
      },
      {
        tonicStep: 'B',
        tonicAlter: 1,
        isTonicNormal: false,
        isTonicEnharmonic: false,
        isValid: true,
        alterNoteCount: 8,
        alterSum: 11,
        notesMap: {
          1: { step: 'B', alter: 1, octaveOffset: 0 },
          2: { step: 'C', alter: 2, octaveOffset: 1 },
          3: { step: 'D', alter: 1, octaveOffset: 1 },
          4: { step: 'E', alter: 1, octaveOffset: 1 },
          5: { step: 'F', alter: 2, octaveOffset: 1 },
          6: { step: 'G', alter: 2, octaveOffset: 1 },
          7: { step: 'A', alter: 1, octaveOffset: 1 }
        }
      }
    ]
  },
  {
    pianoKeyIdRoot: 1,
    scaleModeId: SCALE_MODE_ID.Dorian,
    pianoKeyIds: [1, 3, 4, 6, 8, 10, 11],
    pianoKeyIdsSorted: [1, 3, 4, 6, 8, 10, 11],
    degreeToPianoKeyId: { 1: 1, 2: 3, 3: 4, 4: 6, 5: 8, 6: 10, 7: 11 },
    pianoKeyIdToDegree: { 0: null, 1: 1, 2: null, 3: 2, 4: 3, 5: null, 6: 4, 7: null, 8: 5, 9: null, 10: 6, 11: 7 },
    degreeAlterationsMap: { 2: 0, 3: -1, 4: 0, 5: 0, 6: 0, 7: -1 },
    scaleMode: {
      scaleModeId: SCALE_MODE_ID.Dorian,
      intervalList: [
        [
          'maj',
          2
        ],
        [
          'min',
          3
        ],
        [
          'p',
          4
        ],
        [
          'p',
          5
        ],
        [
          'maj',
          6
        ],
        [
          'min',
          7
        ]
      ],
      intervalMap: { 2: 'maj', 3: 'min', 4: 'p', 5: 'p', 6: 'maj', 7: 'min' },
      semitonesList: [2, 3, 5, 7, 9, 10],
      semitonesMap: { 2: 2, 3: 3, 4: 5, 5: 7, 6: 9, 7: 10 },
      degreeAlterationsList: [0, -1, 0, 0, 0, -1],
      degreeAlterationsMap: { 2: 0, 3: -1, 4: 0, 5: 0, 6: 0, 7: -1 },
      name: 'Dorian',
      type: 'minor',
      family: 'diatonic',
      description: '自然大调的 II 级音阶，由 C 大调的 D 进行到高八度的 D，构成音分别为：1 2 b3 4 5 6 b7 1'
    },
    scales: [
      {
        tonicStep: 'C',
        tonicAlter: 1,
        isTonicNormal: true,
        isTonicEnharmonic: false,
        isValid: true,
        alterNoteCount: 6,
        alterSum: 6,
        notesMap: {
          1: { step: 'C', alter: 1, octaveOffset: 0 },
          2: { step: 'D', alter: 1, octaveOffset: 0 },
          3: { step: 'E', alter: 0, octaveOffset: 0 },
          4: { step: 'F', alter: 1, octaveOffset: 0 },
          5: { step: 'G', alter: 1, octaveOffset: 0 },
          6: { step: 'A', alter: 1, octaveOffset: 0 },
          7: { step: 'B', alter: 0, octaveOffset: 0 }
        }
      },
      {
        tonicStep: 'D',
        tonicAlter: -1,
        isTonicNormal: true,
        isTonicEnharmonic: false,
        isValid: true,
        alterNoteCount: 8,
        alterSum: -8,
        notesMap: {
          1: { step: 'D', alter: -1, octaveOffset: 0 },
          2: { step: 'E', alter: -1, octaveOffset: 0 },
          3: { step: 'F', alter: -1, octaveOffset: 0 },
          4: { step: 'G', alter: -1, octaveOffset: 0 },
          5: { step: 'A', alter: -1, octaveOffset: 0 },
          6: { step: 'B', alter: -1, octaveOffset: 0 },
          7: { step: 'C', alter: -1, octaveOffset: 1 }
        }
      }
    ]
  },
  {
    pianoKeyIdRoot: 2,
    scaleModeId: SCALE_MODE_ID.Dorian,
    pianoKeyIds: [2, 4, 5, 7, 9, 11, 0],
    pianoKeyIdsSorted: [0, 2, 4, 5, 7, 9, 11],
    degreeToPianoKeyId: { 1: 2, 2: 4, 3: 5, 4: 7, 5: 9, 6: 11, 7: 0 },
    pianoKeyIdToDegree: { 0: 7, 1: null, 2: 1, 3: null, 4: 2, 5: 3, 6: null, 7: 4, 8: null, 9: 5, 10: null, 11: 6 },
    degreeAlterationsMap: { 2: 0, 3: -1, 4: 0, 5: 0, 6: 0, 7: -1 },
    scaleMode: {
      scaleModeId: SCALE_MODE_ID.Dorian,
      intervalList: [
        [
          'maj',
          2
        ],
        [
          'min',
          3
        ],
        [
          'p',
          4
        ],
        [
          'p',
          5
        ],
        [
          'maj',
          6
        ],
        [
          'min',
          7
        ]
      ],
      intervalMap: { 2: 'maj', 3: 'min', 4: 'p', 5: 'p', 6: 'maj', 7: 'min' },
      semitonesList: [2, 3, 5, 7, 9, 10],
      semitonesMap: { 2: 2, 3: 3, 4: 5, 5: 7, 6: 9, 7: 10 },
      degreeAlterationsList: [0, -1, 0, 0, 0, -1],
      degreeAlterationsMap: { 2: 0, 3: -1, 4: 0, 5: 0, 6: 0, 7: -1 },
      name: 'Dorian',
      type: 'minor',
      family: 'diatonic',
      description: '自然大调的 II 级音阶，由 C 大调的 D 进行到高八度的 D，构成音分别为：1 2 b3 4 5 6 b7 1'
    },
    scales: [
      {
        tonicStep: 'D',
        tonicAlter: 0,
        isTonicNormal: true,
        isTonicEnharmonic: false,
        isValid: true,
        alterNoteCount: 0,
        alterSum: 0,
        notesMap: {
          1: { step: 'D', alter: 0, octaveOffset: 0 },
          2: { step: 'E', alter: 0, octaveOffset: 0 },
          3: { step: 'F', alter: 0, octaveOffset: 0 },
          4: { step: 'G', alter: 0, octaveOffset: 0 },
          5: { step: 'A', alter: 0, octaveOffset: 0 },
          6: { step: 'B', alter: 0, octaveOffset: 0 },
          7: { step: 'C', alter: 0, octaveOffset: 1 }
        }
      }
    ]
  },
  {
    pianoKeyIdRoot: 3,
    scaleModeId: SCALE_MODE_ID.Dorian,
    pianoKeyIds: [3, 5, 6, 8, 10, 0, 1],
    pianoKeyIdsSorted: [0, 1, 3, 5, 6, 8, 10],
    degreeToPianoKeyId: { 1: 3, 2: 5, 3: 6, 4: 8, 5: 10, 6: 0, 7: 1 },
    pianoKeyIdToDegree: { 0: 6, 1: 7, 2: null, 3: 1, 4: null, 5: 2, 6: 3, 7: null, 8: 4, 9: null, 10: 5, 11: null },
    degreeAlterationsMap: { 2: 0, 3: -1, 4: 0, 5: 0, 6: 0, 7: -1 },
    scaleMode: {
      scaleModeId: SCALE_MODE_ID.Dorian,
      intervalList: [
        [
          'maj',
          2
        ],
        [
          'min',
          3
        ],
        [
          'p',
          4
        ],
        [
          'p',
          5
        ],
        [
          'maj',
          6
        ],
        [
          'min',
          7
        ]
      ],
      intervalMap: { 2: 'maj', 3: 'min', 4: 'p', 5: 'p', 6: 'maj', 7: 'min' },
      semitonesList: [2, 3, 5, 7, 9, 10],
      semitonesMap: { 2: 2, 3: 3, 4: 5, 5: 7, 6: 9, 7: 10 },
      degreeAlterationsList: [0, -1, 0, 0, 0, -1],
      degreeAlterationsMap: { 2: 0, 3: -1, 4: 0, 5: 0, 6: 0, 7: -1 },
      name: 'Dorian',
      type: 'minor',
      family: 'diatonic',
      description: '自然大调的 II 级音阶，由 C 大调的 D 进行到高八度的 D，构成音分别为：1 2 b3 4 5 6 b7 1'
    },
    scales: [
      {
        tonicStep: 'D',
        tonicAlter: 1,
        isTonicNormal: true,
        isTonicEnharmonic: false,
        isValid: true,
        alterNoteCount: 8,
        alterSum: 8,
        notesMap: {
          1: { step: 'D', alter: 1, octaveOffset: 0 },
          2: { step: 'E', alter: 1, octaveOffset: 0 },
          3: { step: 'F', alter: 1, octaveOffset: 0 },
          4: { step: 'G', alter: 1, octaveOffset: 0 },
          5: { step: 'A', alter: 1, octaveOffset: 0 },
          6: { step: 'B', alter: 1, octaveOffset: 0 },
          7: { step: 'C', alter: 1, octaveOffset: 1 }
        }
      },
      {
        tonicStep: 'E',
        tonicAlter: -1,
        isTonicNormal: true,
        isTonicEnharmonic: false,
        isValid: true,
        alterNoteCount: 6,
        alterSum: -6,
        notesMap: {
          1: { step: 'E', alter: -1, octaveOffset: 0 },
          2: { step: 'F', alter: 0, octaveOffset: 0 },
          3: { step: 'G', alter: -1, octaveOffset: 0 },
          4: { step: 'A', alter: -1, octaveOffset: 0 },
          5: { step: 'B', alter: -1, octaveOffset: 0 },
          6: { step: 'C', alter: 0, octaveOffset: 1 },
          7: { step: 'D', alter: -1, octaveOffset: 1 }
        }
      }
    ]
  },
  {
    pianoKeyIdRoot: 4,
    scaleModeId: SCALE_MODE_ID.Dorian,
    pianoKeyIds: [4, 6, 7, 9, 11, 1, 2],
    pianoKeyIdsSorted: [1, 2, 4, 6, 7, 9, 11],
    degreeToPianoKeyId: { 1: 4, 2: 6, 3: 7, 4: 9, 5: 11, 6: 1, 7: 2 },
    pianoKeyIdToDegree: { 0: null, 1: 6, 2: 7, 3: null, 4: 1, 5: null, 6: 2, 7: 3, 8: null, 9: 4, 10: null, 11: 5 },
    degreeAlterationsMap: { 2: 0, 3: -1, 4: 0, 5: 0, 6: 0, 7: -1 },
    scaleMode: {
      scaleModeId: SCALE_MODE_ID.Dorian,
      intervalList: [
        [
          'maj',
          2
        ],
        [
          'min',
          3
        ],
        [
          'p',
          4
        ],
        [
          'p',
          5
        ],
        [
          'maj',
          6
        ],
        [
          'min',
          7
        ]
      ],
      intervalMap: { 2: 'maj', 3: 'min', 4: 'p', 5: 'p', 6: 'maj', 7: 'min' },
      semitonesList: [2, 3, 5, 7, 9, 10],
      semitonesMap: { 2: 2, 3: 3, 4: 5, 5: 7, 6: 9, 7: 10 },
      degreeAlterationsList: [0, -1, 0, 0, 0, -1],
      degreeAlterationsMap: { 2: 0, 3: -1, 4: 0, 5: 0, 6: 0, 7: -1 },
      name: 'Dorian',
      type: 'minor',
      family: 'diatonic',
      description: '自然大调的 II 级音阶，由 C 大调的 D 进行到高八度的 D，构成音分别为：1 2 b3 4 5 6 b7 1'
    },
    scales: [
      {
        tonicStep: 'E',
        tonicAlter: 0,
        isTonicNormal: true,
        isTonicEnharmonic: false,
        isValid: true,
        alterNoteCount: 2,
        alterSum: 2,
        notesMap: {
          1: { step: 'E', alter: 0, octaveOffset: 0 },
          2: { step: 'F', alter: 1, octaveOffset: 0 },
          3: { step: 'G', alter: 0, octaveOffset: 0 },
          4: { step: 'A', alter: 0, octaveOffset: 0 },
          5: { step: 'B', alter: 0, octaveOffset: 0 },
          6: { step: 'C', alter: 1, octaveOffset: 1 },
          7: { step: 'D', alter: 0, octaveOffset: 1 }
        }
      },
      {
        tonicStep: 'F',
        tonicAlter: -1,
        isTonicNormal: false,
        isTonicEnharmonic: false,
        isValid: true,
        alterNoteCount: 8,
        alterSum: -11,
        notesMap: {
          1: { step: 'F', alter: -1, octaveOffset: 0 },
          2: { step: 'G', alter: -1, octaveOffset: 0 },
          3: { step: 'A', alter: -2, octaveOffset: 0 },
          4: { step: 'B', alter: -2, octaveOffset: 0 },
          5: { step: 'C', alter: -1, octaveOffset: 1 },
          6: { step: 'D', alter: -1, octaveOffset: 1 },
          7: { step: 'E', alter: -2, octaveOffset: 1 }
        }
      }
    ]
  },
  {
    pianoKeyIdRoot: 5,
    scaleModeId: SCALE_MODE_ID.Dorian,
    pianoKeyIds: [5, 7, 8, 10, 0, 2, 3],
    pianoKeyIdsSorted: [0, 2, 3, 5, 7, 8, 10],
    degreeToPianoKeyId: { 1: 5, 2: 7, 3: 8, 4: 10, 5: 0, 6: 2, 7: 3 },
    pianoKeyIdToDegree: { 0: 5, 1: null, 2: 6, 3: 7, 4: null, 5: 1, 6: null, 7: 2, 8: 3, 9: null, 10: 4, 11: null },
    degreeAlterationsMap: { 2: 0, 3: -1, 4: 0, 5: 0, 6: 0, 7: -1 },
    scaleMode: {
      scaleModeId: SCALE_MODE_ID.Dorian,
      intervalList: [
        [
          'maj',
          2
        ],
        [
          'min',
          3
        ],
        [
          'p',
          4
        ],
        [
          'p',
          5
        ],
        [
          'maj',
          6
        ],
        [
          'min',
          7
        ]
      ],
      intervalMap: { 2: 'maj', 3: 'min', 4: 'p', 5: 'p', 6: 'maj', 7: 'min' },
      semitonesList: [2, 3, 5, 7, 9, 10],
      semitonesMap: { 2: 2, 3: 3, 4: 5, 5: 7, 6: 9, 7: 10 },
      degreeAlterationsList: [0, -1, 0, 0, 0, -1],
      degreeAlterationsMap: { 2: 0, 3: -1, 4: 0, 5: 0, 6: 0, 7: -1 },
      name: 'Dorian',
      type: 'minor',
      family: 'diatonic',
      description: '自然大调的 II 级音阶，由 C 大调的 D 进行到高八度的 D，构成音分别为：1 2 b3 4 5 6 b7 1'
    },
    scales: [
      {
        tonicStep: 'F',
        tonicAlter: 0,
        isTonicNormal: true,
        isTonicEnharmonic: false,
        isValid: true,
        alterNoteCount: 3,
        alterSum: -3,
        notesMap: {
          1: { step: 'F', alter: 0, octaveOffset: 0 },
          2: { step: 'G', alter: 0, octaveOffset: 0 },
          3: { step: 'A', alter: -1, octaveOffset: 0 },
          4: { step: 'B', alter: -1, octaveOffset: 0 },
          5: { step: 'C', alter: 0, octaveOffset: 1 },
          6: { step: 'D', alter: 0, octaveOffset: 1 },
          7: { step: 'E', alter: -1, octaveOffset: 1 }
        }
      },
      {
        tonicStep: 'E',
        tonicAlter: 1,
        isTonicNormal: false,
        isTonicEnharmonic: false,
        isValid: true,
        alterNoteCount: 8,
        alterSum: 10,
        notesMap: {
          1: { step: 'E', alter: 1, octaveOffset: 0 },
          2: { step: 'F', alter: 2, octaveOffset: 0 },
          3: { step: 'G', alter: 1, octaveOffset: 0 },
          4: { step: 'A', alter: 1, octaveOffset: 0 },
          5: { step: 'B', alter: 1, octaveOffset: 0 },
          6: { step: 'C', alter: 2, octaveOffset: 1 },
          7: { step: 'D', alter: 1, octaveOffset: 1 }
        }
      }
    ]
  },
  {
    pianoKeyIdRoot: 6,
    scaleModeId: SCALE_MODE_ID.Dorian,
    pianoKeyIds: [6, 8, 9, 11, 1, 3, 4],
    pianoKeyIdsSorted: [1, 3, 4, 6, 8, 9, 11],
    degreeToPianoKeyId: { 1: 6, 2: 8, 3: 9, 4: 11, 5: 1, 6: 3, 7: 4 },
    pianoKeyIdToDegree: { 0: null, 1: 5, 2: null, 3: 6, 4: 7, 5: null, 6: 1, 7: null, 8: 2, 9: 3, 10: null, 11: 4 },
    degreeAlterationsMap: { 2: 0, 3: -1, 4: 0, 5: 0, 6: 0, 7: -1 },
    scaleMode: {
      scaleModeId: SCALE_MODE_ID.Dorian,
      intervalList: [
        [
          'maj',
          2
        ],
        [
          'min',
          3
        ],
        [
          'p',
          4
        ],
        [
          'p',
          5
        ],
        [
          'maj',
          6
        ],
        [
          'min',
          7
        ]
      ],
      intervalMap: { 2: 'maj', 3: 'min', 4: 'p', 5: 'p', 6: 'maj', 7: 'min' },
      semitonesList: [2, 3, 5, 7, 9, 10],
      semitonesMap: { 2: 2, 3: 3, 4: 5, 5: 7, 6: 9, 7: 10 },
      degreeAlterationsList: [0, -1, 0, 0, 0, -1],
      degreeAlterationsMap: { 2: 0, 3: -1, 4: 0, 5: 0, 6: 0, 7: -1 },
      name: 'Dorian',
      type: 'minor',
      family: 'diatonic',
      description: '自然大调的 II 级音阶，由 C 大调的 D 进行到高八度的 D，构成音分别为：1 2 b3 4 5 6 b7 1'
    },
    scales: [
      {
        tonicStep: 'F',
        tonicAlter: 1,
        isTonicNormal: true,
        isTonicEnharmonic: false,
        isValid: true,
        alterNoteCount: 5,
        alterSum: 5,
        notesMap: {
          1: { step: 'F', alter: 1, octaveOffset: 0 },
          2: { step: 'G', alter: 1, octaveOffset: 0 },
          3: { step: 'A', alter: 0, octaveOffset: 0 },
          4: { step: 'B', alter: 0, octaveOffset: 0 },
          5: { step: 'C', alter: 1, octaveOffset: 1 },
          6: { step: 'D', alter: 1, octaveOffset: 1 },
          7: { step: 'E', alter: 0, octaveOffset: 1 }
        }
      },
      {
        tonicStep: 'G',
        tonicAlter: -1,
        isTonicNormal: true,
        isTonicEnharmonic: false,
        isValid: true,
        alterNoteCount: 8,
        alterSum: -9,
        notesMap: {
          1: { step: 'G', alter: -1, octaveOffset: 0 },
          2: { step: 'A', alter: -1, octaveOffset: 0 },
          3: { step: 'B', alter: -2, octaveOffset: 0 },
          4: { step: 'C', alter: -1, octaveOffset: 1 },
          5: { step: 'D', alter: -1, octaveOffset: 1 },
          6: { step: 'E', alter: -1, octaveOffset: 1 },
          7: { step: 'F', alter: -1, octaveOffset: 1 }
        }
      }
    ]
  },
  {
    pianoKeyIdRoot: 7,
    scaleModeId: SCALE_MODE_ID.Dorian,
    pianoKeyIds: [7, 9, 10, 0, 2, 4, 5],
    pianoKeyIdsSorted: [0, 2, 4, 5, 7, 9, 10],
    degreeToPianoKeyId: { 1: 7, 2: 9, 3: 10, 4: 0, 5: 2, 6: 4, 7: 5 },
    pianoKeyIdToDegree: { 0: 4, 1: null, 2: 5, 3: null, 4: 6, 5: 7, 6: null, 7: 1, 8: null, 9: 2, 10: 3, 11: null },
    degreeAlterationsMap: { 2: 0, 3: -1, 4: 0, 5: 0, 6: 0, 7: -1 },
    scaleMode: {
      scaleModeId: SCALE_MODE_ID.Dorian,
      intervalList: [
        [
          'maj',
          2
        ],
        [
          'min',
          3
        ],
        [
          'p',
          4
        ],
        [
          'p',
          5
        ],
        [
          'maj',
          6
        ],
        [
          'min',
          7
        ]
      ],
      intervalMap: { 2: 'maj', 3: 'min', 4: 'p', 5: 'p', 6: 'maj', 7: 'min' },
      semitonesList: [2, 3, 5, 7, 9, 10],
      semitonesMap: { 2: 2, 3: 3, 4: 5, 5: 7, 6: 9, 7: 10 },
      degreeAlterationsList: [0, -1, 0, 0, 0, -1],
      degreeAlterationsMap: { 2: 0, 3: -1, 4: 0, 5: 0, 6: 0, 7: -1 },
      name: 'Dorian',
      type: 'minor',
      family: 'diatonic',
      description: '自然大调的 II 级音阶，由 C 大调的 D 进行到高八度的 D，构成音分别为：1 2 b3 4 5 6 b7 1'
    },
    scales: [
      {
        tonicStep: 'G',
        tonicAlter: 0,
        isTonicNormal: true,
        isTonicEnharmonic: false,
        isValid: true,
        alterNoteCount: 1,
        alterSum: -1,
        notesMap: {
          1: { step: 'G', alter: 0, octaveOffset: 0 },
          2: { step: 'A', alter: 0, octaveOffset: 0 },
          3: { step: 'B', alter: -1, octaveOffset: 0 },
          4: { step: 'C', alter: 0, octaveOffset: 1 },
          5: { step: 'D', alter: 0, octaveOffset: 1 },
          6: { step: 'E', alter: 0, octaveOffset: 1 },
          7: { step: 'F', alter: 0, octaveOffset: 1 }
        }
      }
    ]
  },
  {
    pianoKeyIdRoot: 8,
    scaleModeId: SCALE_MODE_ID.Dorian,
    pianoKeyIds: [8, 10, 11, 1, 3, 5, 6],
    pianoKeyIdsSorted: [1, 3, 5, 6, 8, 10, 11],
    degreeToPianoKeyId: { 1: 8, 2: 10, 3: 11, 4: 1, 5: 3, 6: 5, 7: 6 },
    pianoKeyIdToDegree: { 0: null, 1: 4, 2: null, 3: 5, 4: null, 5: 6, 6: 7, 7: null, 8: 1, 9: null, 10: 2, 11: 3 },
    degreeAlterationsMap: { 2: 0, 3: -1, 4: 0, 5: 0, 6: 0, 7: -1 },
    scaleMode: {
      scaleModeId: SCALE_MODE_ID.Dorian,
      intervalList: [
        [
          'maj',
          2
        ],
        [
          'min',
          3
        ],
        [
          'p',
          4
        ],
        [
          'p',
          5
        ],
        [
          'maj',
          6
        ],
        [
          'min',
          7
        ]
      ],
      intervalMap: { 2: 'maj', 3: 'min', 4: 'p', 5: 'p', 6: 'maj', 7: 'min' },
      semitonesList: [2, 3, 5, 7, 9, 10],
      semitonesMap: { 2: 2, 3: 3, 4: 5, 5: 7, 6: 9, 7: 10 },
      degreeAlterationsList: [0, -1, 0, 0, 0, -1],
      degreeAlterationsMap: { 2: 0, 3: -1, 4: 0, 5: 0, 6: 0, 7: -1 },
      name: 'Dorian',
      type: 'minor',
      family: 'diatonic',
      description: '自然大调的 II 级音阶，由 C 大调的 D 进行到高八度的 D，构成音分别为：1 2 b3 4 5 6 b7 1'
    },
    scales: [
      {
        tonicStep: 'G',
        tonicAlter: 1,
        isTonicNormal: true,
        isTonicEnharmonic: true,
        isValid: true,
        alterNoteCount: 7,
        alterSum: 7,
        notesMap: {
          1: { step: 'G', alter: 1, octaveOffset: 0 },
          2: { step: 'A', alter: 1, octaveOffset: 0 },
          3: { step: 'B', alter: 0, octaveOffset: 0 },
          4: { step: 'C', alter: 1, octaveOffset: 1 },
          5: { step: 'D', alter: 1, octaveOffset: 1 },
          6: { step: 'E', alter: 1, octaveOffset: 1 },
          7: { step: 'F', alter: 1, octaveOffset: 1 }
        }
      },
      {
        tonicStep: 'A',
        tonicAlter: -1,
        isTonicNormal: true,
        isTonicEnharmonic: true,
        isValid: true,
        alterNoteCount: 7,
        alterSum: -7,
        notesMap: {
          1: { step: 'A', alter: -1, octaveOffset: 0 },
          2: { step: 'B', alter: -1, octaveOffset: 0 },
          3: { step: 'C', alter: -1, octaveOffset: 1 },
          4: { step: 'D', alter: -1, octaveOffset: 1 },
          5: { step: 'E', alter: -1, octaveOffset: 1 },
          6: { step: 'F', alter: 0, octaveOffset: 1 },
          7: { step: 'G', alter: -1, octaveOffset: 1 }
        }
      }
    ]
  },
  {
    pianoKeyIdRoot: 9,
    scaleModeId: SCALE_MODE_ID.Dorian,
    pianoKeyIds: [9, 11, 0, 2, 4, 6, 7],
    pianoKeyIdsSorted: [0, 2, 4, 6, 7, 9, 11],
    degreeToPianoKeyId: { 1: 9, 2: 11, 3: 0, 4: 2, 5: 4, 6: 6, 7: 7 },
    pianoKeyIdToDegree: { 0: 3, 1: null, 2: 4, 3: null, 4: 5, 5: null, 6: 6, 7: 7, 8: null, 9: 1, 10: null, 11: 2 },
    degreeAlterationsMap: { 2: 0, 3: -1, 4: 0, 5: 0, 6: 0, 7: -1 },
    scaleMode: {
      scaleModeId: SCALE_MODE_ID.Dorian,
      intervalList: [
        [
          'maj',
          2
        ],
        [
          'min',
          3
        ],
        [
          'p',
          4
        ],
        [
          'p',
          5
        ],
        [
          'maj',
          6
        ],
        [
          'min',
          7
        ]
      ],
      intervalMap: { 2: 'maj', 3: 'min', 4: 'p', 5: 'p', 6: 'maj', 7: 'min' },
      semitonesList: [2, 3, 5, 7, 9, 10],
      semitonesMap: { 2: 2, 3: 3, 4: 5, 5: 7, 6: 9, 7: 10 },
      degreeAlterationsList: [0, -1, 0, 0, 0, -1],
      degreeAlterationsMap: { 2: 0, 3: -1, 4: 0, 5: 0, 6: 0, 7: -1 },
      name: 'Dorian',
      type: 'minor',
      family: 'diatonic',
      description: '自然大调的 II 级音阶，由 C 大调的 D 进行到高八度的 D，构成音分别为：1 2 b3 4 5 6 b7 1'
    },
    scales: [
      {
        tonicStep: 'A',
        tonicAlter: 0,
        isTonicNormal: true,
        isTonicEnharmonic: false,
        isValid: true,
        alterNoteCount: 1,
        alterSum: 1,
        notesMap: {
          1: { step: 'A', alter: 0, octaveOffset: 0 },
          2: { step: 'B', alter: 0, octaveOffset: 0 },
          3: { step: 'C', alter: 0, octaveOffset: 1 },
          4: { step: 'D', alter: 0, octaveOffset: 1 },
          5: { step: 'E', alter: 0, octaveOffset: 1 },
          6: { step: 'F', alter: 1, octaveOffset: 1 },
          7: { step: 'G', alter: 0, octaveOffset: 1 }
        }
      }
    ]
  },
  {
    pianoKeyIdRoot: 10,
    scaleModeId: SCALE_MODE_ID.Dorian,
    pianoKeyIds: [10, 0, 1, 3, 5, 7, 8],
    pianoKeyIdsSorted: [0, 1, 3, 5, 7, 8, 10],
    degreeToPianoKeyId: { 1: 10, 2: 0, 3: 1, 4: 3, 5: 5, 6: 7, 7: 8 },
    pianoKeyIdToDegree: { 0: 2, 1: 3, 2: null, 3: 4, 4: null, 5: 5, 6: null, 7: 6, 8: 7, 9: null, 10: 1, 11: null },
    degreeAlterationsMap: { 2: 0, 3: -1, 4: 0, 5: 0, 6: 0, 7: -1 },
    scaleMode: {
      scaleModeId: SCALE_MODE_ID.Dorian,
      intervalList: [
        [
          'maj',
          2
        ],
        [
          'min',
          3
        ],
        [
          'p',
          4
        ],
        [
          'p',
          5
        ],
        [
          'maj',
          6
        ],
        [
          'min',
          7
        ]
      ],
      intervalMap: { 2: 'maj', 3: 'min', 4: 'p', 5: 'p', 6: 'maj', 7: 'min' },
      semitonesList: [2, 3, 5, 7, 9, 10],
      semitonesMap: { 2: 2, 3: 3, 4: 5, 5: 7, 6: 9, 7: 10 },
      degreeAlterationsList: [0, -1, 0, 0, 0, -1],
      degreeAlterationsMap: { 2: 0, 3: -1, 4: 0, 5: 0, 6: 0, 7: -1 },
      name: 'Dorian',
      type: 'minor',
      family: 'diatonic',
      description: '自然大调的 II 级音阶，由 C 大调的 D 进行到高八度的 D，构成音分别为：1 2 b3 4 5 6 b7 1'
    },
    scales: [
      {
        tonicStep: 'A',
        tonicAlter: 1,
        isTonicNormal: true,
        isTonicEnharmonic: false,
        isValid: true,
        alterNoteCount: 8,
        alterSum: 9,
        notesMap: {
          1: { step: 'A', alter: 1, octaveOffset: 0 },
          2: { step: 'B', alter: 1, octaveOffset: 0 },
          3: { step: 'C', alter: 1, octaveOffset: 1 },
          4: { step: 'D', alter: 1, octaveOffset: 1 },
          5: { step: 'E', alter: 1, octaveOffset: 1 },
          6: { step: 'F', alter: 2, octaveOffset: 1 },
          7: { step: 'G', alter: 1, octaveOffset: 1 }
        }
      },
      {
        tonicStep: 'B',
        tonicAlter: -1,
        isTonicNormal: true,
        isTonicEnharmonic: false,
        isValid: true,
        alterNoteCount: 5,
        alterSum: -5,
        notesMap: {
          1: { step: 'B', alter: -1, octaveOffset: 0 },
          2: { step: 'C', alter: 0, octaveOffset: 1 },
          3: { step: 'D', alter: -1, octaveOffset: 1 },
          4: { step: 'E', alter: -1, octaveOffset: 1 },
          5: { step: 'F', alter: 0, octaveOffset: 1 },
          6: { step: 'G', alter: 0, octaveOffset: 1 },
          7: { step: 'A', alter: -1, octaveOffset: 1 }
        }
      }
    ]
  },
  {
    pianoKeyIdRoot: 11,
    scaleModeId: SCALE_MODE_ID.Dorian,
    pianoKeyIds: [11, 1, 2, 4, 6, 8, 9],
    pianoKeyIdsSorted: [1, 2, 4, 6, 8, 9, 11],
    degreeToPianoKeyId: { 1: 11, 2: 1, 3: 2, 4: 4, 5: 6, 6: 8, 7: 9 },
    pianoKeyIdToDegree: { 0: null, 1: 2, 2: 3, 3: null, 4: 4, 5: null, 6: 5, 7: null, 8: 6, 9: 7, 10: null, 11: 1 },
    degreeAlterationsMap: { 2: 0, 3: -1, 4: 0, 5: 0, 6: 0, 7: -1 },
    scaleMode: {
      scaleModeId: SCALE_MODE_ID.Dorian,
      intervalList: [
        [
          'maj',
          2
        ],
        [
          'min',
          3
        ],
        [
          'p',
          4
        ],
        [
          'p',
          5
        ],
        [
          'maj',
          6
        ],
        [
          'min',
          7
        ]
      ],
      intervalMap: { 2: 'maj', 3: 'min', 4: 'p', 5: 'p', 6: 'maj', 7: 'min' },
      semitonesList: [2, 3, 5, 7, 9, 10],
      semitonesMap: { 2: 2, 3: 3, 4: 5, 5: 7, 6: 9, 7: 10 },
      degreeAlterationsList: [0, -1, 0, 0, 0, -1],
      degreeAlterationsMap: { 2: 0, 3: -1, 4: 0, 5: 0, 6: 0, 7: -1 },
      name: 'Dorian',
      type: 'minor',
      family: 'diatonic',
      description: '自然大调的 II 级音阶，由 C 大调的 D 进行到高八度的 D，构成音分别为：1 2 b3 4 5 6 b7 1'
    },
    scales: [
      {
        tonicStep: 'B',
        tonicAlter: 0,
        isTonicNormal: true,
        isTonicEnharmonic: false,
        isValid: true,
        alterNoteCount: 3,
        alterSum: 3,
        notesMap: {
          1: { step: 'B', alter: 0, octaveOffset: 0 },
          2: { step: 'C', alter: 1, octaveOffset: 1 },
          3: { step: 'D', alter: 0, octaveOffset: 1 },
          4: { step: 'E', alter: 0, octaveOffset: 1 },
          5: { step: 'F', alter: 1, octaveOffset: 1 },
          6: { step: 'G', alter: 1, octaveOffset: 1 },
          7: { step: 'A', alter: 0, octaveOffset: 1 }
        }
      },
      {
        tonicStep: 'C',
        tonicAlter: -1,
        isTonicNormal: false,
        isTonicEnharmonic: false,
        isValid: true,
        alterNoteCount: 8,
        alterSum: -10,
        notesMap: {
          1: { step: 'C', alter: -1, octaveOffset: 0 },
          2: { step: 'D', alter: -1, octaveOffset: 0 },
          3: { step: 'E', alter: -2, octaveOffset: 0 },
          4: { step: 'F', alter: -1, octaveOffset: 0 },
          5: { step: 'G', alter: -1, octaveOffset: 0 },
          6: { step: 'A', alter: -1, octaveOffset: 0 },
          7: { step: 'B', alter: -2, octaveOffset: 0 }
        }
      }
    ]
  }
]
