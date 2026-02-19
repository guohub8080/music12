type t_noteStep = "C" | "D" | "E" | "F" | "G" | "A" | "B";
type t_alterValue = -2 | -1 | 0 | 1 | 2;

type t_intervalType = "p" | "maj" | "min" | "aug" | "dim" | "aug+" | "dim-";
type t_intervalCnPrefix = "纯" | "大" | "小" | "增" | "减" | "倍增" | "倍减";

declare class Interval {
    cnPrefix: t_intervalCnPrefix;
    type: t_intervalType;
    isNatural: boolean;
    numWithinOctave: number;
    num: number;
    semitoneGap: number;
    logicOctaveGap: number;
    factOctaveGap: number;
    semitoneLocation: number;
    semitoneGapWithinOctave: number;
    constructor(intervalType?: t_intervalType, intervalNum?: number);
    get simpleDescription(): string;
    getEqualInterval(isSelfTypeExcluded?: boolean, isAugDimExcluded?: boolean, isDoubleAugDimExcluded?: boolean): any[];
}

declare class Note {
    octave: number;
    step: t_noteStep;
    alter: t_alterValue;
    artName: string;
    mathName: string;
    fifthValue: number;
    isNormal: boolean;
    isBlack: boolean;
    locationId: number;
    semitoneWithinOctave: number;
    stepIndex: number;
    constructor(step?: t_noteStep, alter?: t_alterValue, octave?: number);
    get pitchValue(): number;
    get simpleDescription(): string;
    getNoteByInterval(intervalInstance: InstanceType<typeof Interval>, isAscending?: boolean): InstanceType<typeof Note>;
    getNoteByIntervalString(numberNotationString: string, isAscending?: boolean): InstanceType<typeof Note>;
    getSamePitchNotes(isSelfIncluded?: boolean, alterAbsLessThan?: 0 | 1 | 2): InstanceType<typeof Note>[];
    semitoneMove(moveStep: number): Note;
    getHarmonicSeries(): {
        step: t_noteStep;
        alter: t_alterValue;
        locationID: number;
        artName: string;
    }[];
    get251as(noteAs: number): Note[];
}

declare const getCasualRandomNote: (octave?: number | number[]) => Note;
declare const getWhiteRandomNote: (octave?: number | number[], isNormal?: boolean) => Note;
declare const getBlackRandomNote: (octave?: number | number[], isNormal?: boolean) => Note;
declare const getNormalRandomNote: (octave?: number | number[]) => Note;
declare const getNoteByLocation: (location: number, octave?: number) => InstanceType<typeof Note>[];

declare const getUpwardLocationGap: (baseLocation: number, targetLocation: number) => number;

type index$5_Note = Note;
declare const index$5_Note: typeof Note;
declare const index$5_getBlackRandomNote: typeof getBlackRandomNote;
declare const index$5_getCasualRandomNote: typeof getCasualRandomNote;
declare const index$5_getNormalRandomNote: typeof getNormalRandomNote;
declare const index$5_getNoteByLocation: typeof getNoteByLocation;
declare const index$5_getUpwardLocationGap: typeof getUpwardLocationGap;
declare const index$5_getWhiteRandomNote: typeof getWhiteRandomNote;
declare namespace index$5 {
  export { index$5_Note as Note, index$5_getBlackRandomNote as getBlackRandomNote, index$5_getCasualRandomNote as getCasualRandomNote, index$5_getNormalRandomNote as getNormalRandomNote, index$5_getNoteByLocation as getNoteByLocation, index$5_getUpwardLocationGap as getUpwardLocationGap, index$5_getWhiteRandomNote as getWhiteRandomNote };
}

declare const getIntervalByComparingNotes: (note1: InstanceType<typeof Note>, note2: InstanceType<typeof Note>) => InstanceType<typeof Interval>;

declare const getIntervalBySemitoneGap: (semitoneGap: number) => InstanceType<typeof Interval>[] | [];

type index$4_Interval = Interval;
declare const index$4_Interval: typeof Interval;
declare const index$4_getIntervalByComparingNotes: typeof getIntervalByComparingNotes;
declare const index$4_getIntervalBySemitoneGap: typeof getIntervalBySemitoneGap;
declare namespace index$4 {
  export { index$4_Interval as Interval, index$4_getIntervalByComparingNotes as getIntervalByComparingNotes, index$4_getIntervalBySemitoneGap as getIntervalBySemitoneGap };
}

type t_scaleMode = "MAJ" | "DOR" | "PHR" | "LYD" | "MLY" | "MIN" | "ION" | "AEO" | "MMAJ" | "HMAJ" | "HMIN" | "MMIN" | "LOC" | "CG" | "CS" | "CJ" | "CZ" | "CY";
type t_scaleIntervalPanel = {
    2?: t_intervalType | void;
    3?: t_intervalType | void;
    4?: t_intervalType | void;
    5?: t_intervalType | void;
    6?: t_intervalType | void;
    7?: t_intervalType | void;
};
type t_scaleNotesPanel = {
    1: InstanceType<typeof Note> | void;
    2?: InstanceType<typeof Note> | void;
    3?: InstanceType<typeof Note> | void;
    4?: InstanceType<typeof Note> | void;
    5?: InstanceType<typeof Note> | void;
    6?: InstanceType<typeof Note> | void;
    7?: InstanceType<typeof Note> | void;
};

type t_transformString = "2" | "#2" | "b2" | "3" | "#3" | "b3" | "4" | "#4" | "b4" | "5" | "#5" | "b5" | "6" | "#6" | "b6" | "7" | "#7" | "b7" | "9" | "#9" | "b9" | "11" | "#11" | "b11" | "13" | "#13" | "b13";
type t_transformPanel = {
    2: t_intervalType | "omit" | void;
    3: t_intervalType | "omit" | void;
    4: t_intervalType | "omit" | void;
    5: t_intervalType | "omit" | void;
    6: t_intervalType | "omit" | void;
    7: t_intervalType | "omit" | void;
    9: t_intervalType | "omit" | void;
    11: t_intervalType | "omit" | void;
    13: t_intervalType | "omit" | void;
};
type t_inputTransformPanel = {
    2?: t_intervalType | "omit" | void;
    3?: t_intervalType | "omit" | void;
    4?: t_intervalType | "omit" | void;
    5?: t_intervalType | "omit" | void;
    6?: t_intervalType | "omit" | void;
    7?: t_intervalType | "omit" | void;
    9?: t_intervalType | "omit" | void;
    11?: t_intervalType | "omit" | void;
    13?: t_intervalType | "omit" | void;
} | {} | undefined;
type t_intervalNum = 2 | 3 | 4 | 5 | 6 | 7 | 9 | 11 | 13;

declare class Chord {
    #private;
    rootNote: InstanceType<typeof Note>;
    constructor(rootNote: InstanceType<typeof Note>, chordKey: string, initTransform?: t_inputTransformPanel);
    tryToMergeTransform(): InstanceType<typeof Chord>;
    get transformPanel(): t_transformPanel;
    get chordKey(): string;
    setTransform(transformString: t_transformString): InstanceType<typeof Chord>;
    get baseSymbol(): string;
    setOmit(omitInterval: t_intervalNum): void;
    get scoreSymbol(): string;
    clearTransform(): void;
    get isTransformed(): boolean;
    get intervalList(): [t_intervalType, number][];
    get notesList(): Note[];
    get simpleDescription(): string;
}

declare class Scale {
    #private;
    modeDescription: string;
    intervalPanel: t_scaleIntervalPanel;
    alterSum: number;
    alterTimesSum: number;
    rootNote: InstanceType<typeof Note>;
    modeName: string;
    type: string;
    constructor(rootNote: InstanceType<typeof Note>, scaleMode: t_scaleMode);
    get chord3OfDegreesList(): string[];
    get chord7OfDegreesList(): string[];
    get notesList(): Note[];
    get intervalList(): any[];
    get notesPanel(): t_scaleNotesPanel;
    get naturalNotesNum(): number;
    get alteredNotesNum(): number;
    get sharpOrFlatNotesNum(): number;
    get doubleSharpOrFlatNotesNum(): number;
    get alterList(): number[];
    get isTonicReplaced(): boolean;
    getNoteByIntervalNum(num: number, isWithinOctave?: boolean): InstanceType<typeof Note>;
    get simpleDescription(): string;
    get equalRootNote(): InstanceType<typeof Note>;
    getScaleDegreeNote(degree: number): InstanceType<typeof Note>;
    private getScaleDegreeChord3Key;
    private getScaleDegreeChord7Key;
    getScaleDegreeChord3(scaleDegree: number): Chord;
    getScaleDegreeChord7(scaleDegree: number): Chord;
}

declare const _default$2: {
    Scale: typeof Scale;
    ScaleMode: {
        NaturalMajor: string;
        NaturalMinor: string;
        Ionian: string;
        Aeolian: string;
        Dorian: string;
        Phrygian: string;
        Lydian: string;
        Mixolydian: string;
        Locrian: string;
        HarmonicMinor: string;
        HarmonicMajor: string;
        MelodicMinorAscending: string;
        MelodicMajorDescending: string;
    };
    MajorModeGroup: string[];
    MinorModeGroup: string[];
    getModeNameByModeKey: (modeKey: string) => string;
    getModeTypeByModeKey: (modeKey: string) => string;
    getIntervalListByModeKey: (modeKey: string) => (string | number)[][];
};

declare const getStaveAlterByNote: (step: t_noteStep, alter: t_alterValue) => {
    rawNoteStep: string;
    rawNoteAlter: number;
    mode: string;
    actualNoteStep: string;
    actualNoteAlter: number;
    isTonicReplaced: boolean;
    isTonicNormal: boolean;
    isDoubleAlterIncluded: boolean;
    rawStaveAlters: number;
    circleID: number;
}[];

declare const getScaleByStaveAlters: (staveAlter: number) => {
    rawNoteStep: string;
    rawNoteAlter: number;
    mode: string;
    actualNoteStep: string;
    actualNoteAlter: number;
    isTonicReplaced: boolean;
    isTonicNormal: boolean;
    isDoubleAlterIncluded: boolean;
    rawStaveAlters: number;
    circleID: number;
}[];

declare const getAlterStepListByNum: (num: number) => string[];

declare const index$3_getAlterStepListByNum: typeof getAlterStepListByNum;
declare const index$3_getScaleByStaveAlters: typeof getScaleByStaveAlters;
declare const index$3_getStaveAlterByNote: typeof getStaveAlterByNote;
declare namespace index$3 {
  export { index$3_getAlterStepListByNum as getAlterStepListByNum, index$3_getScaleByStaveAlters as getScaleByStaveAlters, index$3_getStaveAlterByNote as getStaveAlterByNote };
}

declare const getNote: (step: string, alter: number, octave?: number) => Note;

declare const getInterval: (type: string, num: number) => Interval;

declare const getScale: (step: string, alter: number, octave: number, mode: string) => Scale;

declare const getChord: (step: string, alter: number, octave: number, chordKey: string, transformPanel?: t_inputTransformPanel) => Chord;

declare const index$2_getChord: typeof getChord;
declare const index$2_getInterval: typeof getInterval;
declare const index$2_getNote: typeof getNote;
declare const index$2_getScale: typeof getScale;
declare namespace index$2 {
  export { index$2_getChord as getChord, index$2_getInterval as getInterval, index$2_getNote as getNote, index$2_getScale as getScale };
}

declare class Radix {
    #private;
    readonly radixBase: number;
    get base10(): number;
    constructor(base10: number, radixBase: number);
    static fromArray(array: number[], radixBase: number): Radix;
    get twoDigitArray(): number[];
    getGap(otherRadix: Radix): number;
    add(num: number): Radix;
}

declare class IntervalRadix {
    #private;
    constructor(intervalNum: number);
    get base10(): number;
    get twoDigitArray(): number[];
    get octave(): number;
    get intervalNum(): number;
    get intervalNumWithinOctave(): number;
}

declare class Base12Radix extends Radix {
    constructor(num: number);
    static fromArray(array: any[]): Base12Radix;
    get firstDigit(): number;
    get lastDigit(): number;
    add(num: number): Base12Radix;
    getGap(otherRadix: Radix): number;
}

declare class Base7Radix extends Radix {
    constructor(num: number);
    static fromArray(array: any[]): Base7Radix;
    get firstDigit(): number;
    get lastDigit(): number;
    add(num: number): Base7Radix;
    getGap(otherRadix: Radix): number;
}

declare class StepRadix extends Base7Radix {
    constructor(step: number | string);
    static fromArray(array: any[]): StepRadix;
    get step(): t_noteStep;
    get octave(): number;
    add(num: number): StepRadix;
    get stepIndex(): number;
    getGap(otherRadix: StepRadix): number;
    getIntervalGap(otherRadix: StepRadix): IntervalRadix;
}
declare class SemitoneRadix extends Base12Radix {
    constructor(semitone: number);
    static fromArray(array: number[]): SemitoneRadix;
    getGap(otherRadix: SemitoneRadix): number;
    add(num: number): SemitoneRadix;
    get location(): number;
    get octave(): number;
    getKeyboardNotes(isAlterAbsLessThan?: number): any[];
}

declare class ScaleRadix {
    #private;
    constructor(scaleDegreeNum: number);
    get base10(): number;
    get twoDigitArray(): number[];
    get octave(): number;
    get totalScaleDegrees(): number;
    get scaleDegree(): number;
    add(num: number): ScaleRadix;
}

type index$1_Base12Radix = Base12Radix;
declare const index$1_Base12Radix: typeof Base12Radix;
type index$1_Base7Radix = Base7Radix;
declare const index$1_Base7Radix: typeof Base7Radix;
type index$1_IntervalRadix = IntervalRadix;
declare const index$1_IntervalRadix: typeof IntervalRadix;
type index$1_Radix = Radix;
declare const index$1_Radix: typeof Radix;
type index$1_ScaleRadix = ScaleRadix;
declare const index$1_ScaleRadix: typeof ScaleRadix;
type index$1_SemitoneRadix = SemitoneRadix;
declare const index$1_SemitoneRadix: typeof SemitoneRadix;
type index$1_StepRadix = StepRadix;
declare const index$1_StepRadix: typeof StepRadix;
declare namespace index$1 {
  export { index$1_Base12Radix as Base12Radix, index$1_Base7Radix as Base7Radix, index$1_IntervalRadix as IntervalRadix, index$1_Radix as Radix, index$1_ScaleRadix as ScaleRadix, index$1_SemitoneRadix as SemitoneRadix, index$1_StepRadix as StepRadix };
}

declare class CircleOfFifths extends Base12Radix {
    constructor(i?: number);
    get majCircle(): {
        rawNoteStep: string;
        rawNoteAlter: number;
        mode: string;
        actualNoteStep: string;
        actualNoteAlter: number;
        isTonicReplaced: boolean;
        isTonicNormal: boolean;
        isDoubleAlterIncluded: boolean;
        rawStaveAlters: number;
        circleID: number;
    }[];
    get minCircle(): {
        rawNoteStep: string;
        rawNoteAlter: number;
        mode: string;
        actualNoteStep: string;
        actualNoteAlter: number;
        isTonicReplaced: boolean;
        isTonicNormal: boolean;
        isDoubleAlterIncluded: boolean;
        rawStaveAlters: number;
        circleID: number;
    }[];
    get location(): number;
    get circleNumber(): number;
    move(num: number): CircleOfFifths;
    get current(): {
        rawNoteStep: string;
        rawNoteAlter: number;
        mode: string;
        actualNoteStep: string;
        actualNoteAlter: number;
        isTonicReplaced: boolean;
        isTonicNormal: boolean;
        isDoubleAlterIncluded: boolean;
        rawStaveAlters: number;
        circleID: number;
    }[];
}

declare const getFifthCircleByAlter: (alter: number) => CircleOfFifths;

type index_CircleOfFifths = CircleOfFifths;
declare const index_CircleOfFifths: typeof CircleOfFifths;
declare const index_getFifthCircleByAlter: typeof getFifthCircleByAlter;
declare namespace index {
  export { index_CircleOfFifths as CircleOfFifths, index_getFifthCircleByAlter as getFifthCircleByAlter };
}

declare const _default$1: {
    Chord: typeof Chord;
    chordMeta: ({
        type: string;
        cnName: string;
        chordKey: string;
        scoreDisplay: string;
        intervalList: (string | number)[][];
        notesNum: number;
        semitoneLocationList: number[];
        orderedSemitoneLocationList: number[];
    } | {
        type: string;
        cnName: string;
        chordKey: string;
        scoreDisplay: number;
        intervalList: (string | number)[][];
        notesNum: number;
        semitoneLocationList: number[];
        orderedSemitoneLocationList: number[];
    })[];
    findChord: (locationList: number[], isStrictlyMatch?: boolean, rootNoteLocation?: number, limitType?: string[]) => {
        rootNoteLocation: number;
        chordKey: string;
        cnName: string;
        type: string;
        notesLocationList: number[];
        orderedNotesLocationList: number[];
        n3L: number;
        n5L: number;
        n7L: number;
        n9L: number;
        n11L: number;
        n13L: number;
    }[];
    findChordInScale: (locationListOfChord: number[], limitMode?: string | string[]) => {
        rootNoteLocation: number;
        mode: string;
        notesLocationList: number[];
        orderedNotesLocationList: number[];
        n2L: number;
        n3L: number;
        n4L: number;
        n5L: number;
        n6L: number;
        n7L: number;
    }[];
    getChordSymbolByKey: (k: string) => string | number;
    getChordCnNameByKey: (k: string) => string;
    findNotesInChord: (notesList: {
        location: number;
        as: number;
    }[]) => {
        rootNoteLocation: number;
        chordKey: string;
        cnName: string;
        type: string;
        notesLocationList: number[];
        orderedNotesLocationList: number[];
        n3L: number;
        n5L: number;
        n7L: number;
        n9L: number;
        n11L: number;
        n13L: number;
    }[];
    getChordTransformByLocationList: (originChordInfo: {
        rootNoteLocation: number;
        n3L: number;
        n5L: number;
        n7L: number;
        n9L: number;
        n11L: number;
        n13L: number;
    }, chordNotesLocationList: number[]) => {
        omit: any[];
        min: any[];
        maj: any[];
        p: any[];
        dim: any[];
        aug: any[];
    };
};

declare const _default: {
    findChord: (locationList: number[], isStrictlyMatch?: boolean, rootNoteLocation?: number, limitType?: string[]) => {
        rootNoteLocation: number;
        chordKey: string;
        cnName: string;
        type: string;
        notesLocationList: number[];
        orderedNotesLocationList: number[];
        n3L: number;
        n5L: number;
        n7L: number;
        n9L: number;
        n11L: number;
        n13L: number;
    }[];
    findNotesInChord: (notesList: {
        location: number;
        as: number;
    }[]) => {
        rootNoteLocation: number;
        chordKey: string;
        cnName: string;
        type: string;
        notesLocationList: number[];
        orderedNotesLocationList: number[];
        n3L: number;
        n5L: number;
        n7L: number;
        n9L: number;
        n11L: number;
        n13L: number;
    }[];
    findNotesInScale: (notesList: {
        location: number;
        as: number;
    }[]) => {
        rootNoteLocation: number;
        mode: string;
        notesLocationList: number[];
        orderedNotesLocationList: number[];
        n2L: number;
        n3L: number;
        n4L: number;
        n5L: number;
        n6L: number;
        n7L: number;
    }[];
    findComplexChordByMidi: (midiPitchList: number[]) => {
        likely: number;
        rootNoteLocation: number;
        chordKey: string;
        cnName: string;
        type: string;
        notesLocationList: number[];
        orderedNotesLocationList: number[];
        n3L: number;
        n5L: number;
        n7L: number;
        n9L: number;
        n11L: number;
        n13L: number;
    }[];
};

export { index$1 as Radix, _default$1 as chord, index as circleOfFifths, index$2 as factory, _default as find, index$4 as interval, index$5 as note, _default$2 as scale, index$3 as stave };
