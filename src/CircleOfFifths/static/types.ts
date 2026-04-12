import {T_AlterValue, T_NoteStep} from "../../common/static/NOTE_TYPES.ts";

export type t_fifthCircle = {
    step: T_NoteStep,
    alter: T_AlterValue,
    type: "maj" | "min",
    circleId: number
}
