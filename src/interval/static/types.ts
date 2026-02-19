import {t_alterValue} from "../../note/static/types";

export type t_intervalType = "p" | "maj" | "min" | "aug" | "dim" | "aug+" | "dim-"
export type t_intervalCnPrefix = "纯" | "大" | "小" | "增" | "减" | "倍增" | "倍减"

export type t_interval = {
    intervalType: t_intervalType,
    intervalNum: number,
}

export type t_intervalObj = {
    semitoneLocation: number;
    type: t_intervalType,
    num: number,
    cnPrefix: t_intervalCnPrefix,
    isNatural: boolean,
    alter: t_alterValue,
    semitoneGap: number,
    octaveGap: number
}

export type t_intervalType_145 = "p" | "aug" | "dim" | "aug+" | "dim-"
export type t_intervalType_2367 = "maj" | "min" | "aug" | "dim" | "aug+" | "dim-"

export type t_intervalList = [t_intervalType, number]