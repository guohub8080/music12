// noinspection ES6PreferShortImport

import {t_intervalType} from "../../interval/static/types.ts";
import {Note} from "../../note/cls/NoteClass.ts";

export type t_chordKey = "maj3" | "min3" | "dim3" | "aug3" | "maj3b5"
  | "maj3add6"
  | "min3add6"
  | "maj3add6add9"
  | "min3add6add9"
  | "maj3add9"
  | "maj3add11"
  | "min3add9"
  | "min3add11"
  | "maj7add11"
  | "dom7add6"
  | "itaug6"
  | "fraug6"
  | "graug6"
  | "maj7"
  | "dom7"
  | "min7"
  | "halfdim7"
  | "dim7"
  | "minmaj7"
  | "dom7#5"
  | "augmaj7"
  | "dom7b5"
  | "dom7b9"
  | "dom7#9"
  | "dom7#11"
  | "dom7b13"
  | "dom7b5b9"
  | "dom7b5#9"
  | "maj7b5"
  | "maj7#5"
  | "maj7b9"
  | "maj7b13"
  | "maj7#11"
  | "min7#5"
  | "minmaj7b5"
  | "minmaj7#5"
  | "dom7#5b9"
  | "dom7#5#9"
  | "sus2"
  | "sus4"
  | "dom7sus2"
  | "dom7sus4"
  | "maj7sus2"
  | "maj7sus4"
  | "dom9sus4"
  | "maj9sus4"
  | "dom13sus4"
  | "maj13sus4"
  | "maj13sus2"
  | "maj9"
  | "dom9"
  | "min9"
  | "minmaj9"
  | "dom9#5"
  | "dom9b9"
  | "dom9b11"
  | "dom9#11"
  | "dom9b13"
  | "maj9b5"
  | "maj9#5"
  | "maj9#11"
  | "maj9b13"
  | "min9b5"
  | "min9b9"
  | "maj11"
  | "dom11"
  | "min11"
  | "minmaj11"
  | "dom11b5"
  | "dom11#5"
  | "dom11b9"
  | "dom11#9"
  | "dom11b13"
  | "min11b5"
  | "maj13"
  | "dom13"
  | "min13"
  | "minmaj13"
  | "dom13b5"
  | "dom13#5"
  | "dom13b9"
  | "dom13#9"
  | "dom13#11"
  | "maj13b5"
  | "maj13#5"
  | "maj13b9"
  | "maj13#11"

export type t_transformString = "2" | "#2"
  | "b2"
  | "3"
  | "#3"
  | "b3"
  | "4"
  | "#4"
  | "b4"
  | "5"
  | "#5"
  | "b5"
  | "6"
  | "#6"
  | "b6"
  | "7"
  | "#7"
  | "b7"
  | "9"
  | "#9"
  | "b9"
  | "11"
  | "#11"
  | "b11"
  | "13"
  | "#13"
  | "b13"

export type t_transformPanel = {
  2: t_intervalType | "omit" | void
  3: t_intervalType | "omit" | void
  4: t_intervalType | "omit" | void
  5: t_intervalType | "omit" | void
  6: t_intervalType | "omit" | void
  7: t_intervalType | "omit" | void
  9: t_intervalType | "omit" | void
  11: t_intervalType | "omit" | void
  13: t_intervalType | "omit" | void
}

export type t_inputTransformPanel = {
  2?: t_intervalType | "omit" | void
  3?: t_intervalType | "omit" | void
  4?: t_intervalType | "omit" | void
  5?: t_intervalType | "omit" | void
  6?: t_intervalType | "omit" | void
  7?: t_intervalType | "omit" | void
  9?: t_intervalType | "omit" | void
  11?: t_intervalType | "omit" | void
  13?: t_intervalType | "omit" | void
} | {} | undefined

export type t_intervalPanel = {
  2: t_intervalType | void
  3: t_intervalType | void
  4: t_intervalType | void
  5: t_intervalType | void
  6: t_intervalType | void
  7: t_intervalType | void
  9: t_intervalType | void
  11: t_intervalType | void
  13: t_intervalType | void
}

export type t_chordNotesPanel = {
  1: InstanceType<typeof Note>
  2: InstanceType<typeof Note> | void
  3: InstanceType<typeof Note> | void
  4: InstanceType<typeof Note> | void
  5: InstanceType<typeof Note> | void
  6: InstanceType<typeof Note> | void
  7: InstanceType<typeof Note> | void
  9: InstanceType<typeof Note> | void
  11: InstanceType<typeof Note> | void
  13: InstanceType<typeof Note> | void
}

export type t_intervalNum = 2 | 3 | 4 | 5 | 6 | 7 | 9 | 11 | 13

export type t_octaveConfig = {
  n1?: number[] | number,
  2?: number[] | number,
  3?: number[] | number,
  4?: number[] | number,
  5?: number[] | number,
  6?: number[] | number,
  7?: number[] | number,
  9?: number[] | number,
  11?: number[] | number,
  13?: number[] | number,
}

export type t_chordVoicing = {
  octaveConfigs: t_octaveConfig
  additionalNotes: [] | InstanceType<typeof Note>[]
}