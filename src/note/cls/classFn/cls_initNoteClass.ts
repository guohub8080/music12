import noteMeta from "../../static/noteMeta";
import {t_alterValue, t_noteObj, t_noteStep} from "../../static/types";
import {NoteError} from "../../../common/processError/errorTypes";

export const initNoteClass = (step: t_noteStep = "C", alter: t_alterValue = 0): t_noteObj => {
    const noteStep = step.toString().toUpperCase().trim()
    const noteObj = noteMeta.where("step", noteStep).where("alter", alter).first()
    if (noteObj) return noteObj as t_noteObj
    throw new NoteError("Note step or alter exceeds limits.")
}