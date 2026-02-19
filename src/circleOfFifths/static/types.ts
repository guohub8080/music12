import {t_alterValue, t_noteStep} from "../../note/static/types";

export type t_fifthCircle = {
    step: t_noteStep,
    alter: t_alterValue,
    type: "maj" | "min",
    circleId: number
}
