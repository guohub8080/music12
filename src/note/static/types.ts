export type t_noteStep = "C" | "D" | "E" | "F" | "G" | "A" | "B"
export type t_alterValue = -2 | -1 | 0 | 1 | 2
export type t_noteObj = {
    uid: number;
    isNormal: boolean;
    artName: string;
    isBlack: boolean;
    stepIndex: number;
    step: t_noteStep;
    fifthValue: number;
    semitone: number;
    mathName: string;
    locationId: number;
    alter: t_alterValue
};
