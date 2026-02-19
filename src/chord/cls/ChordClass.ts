// noinspection ES6PreferShortImport

import {Note} from "../../note/cls/NoteClass";
import cls_initChordClass from "./classFn/cls_initChordClass";
import {t_intervalList, t_intervalType} from "../../interval/static/types.ts";
import {
  t_chordNotesPanel,
  t_chordVoicing, t_inputTransformPanel,
  t_intervalNum,
  t_intervalPanel,
  t_octaveConfig,
  t_transformPanel,
  t_transformString
} from "../static/types.ts";
import cls_dealTransformString from "./classFn/cls_dealTransformString.ts";
import cls_dealOmit from "./classFn/cls_dealOmit.ts";
import cls_getIntervalPanel from "./classFn/cls_getIntervalPanel.ts";
import cls_getNotesList from "./classFn/cls_getNotesList.ts";
import cls_getNotesPanel from "./classFn/cls_getNotesPanel.ts";
import cls_getIntervalList from "./classFn/cls_getIntervalList.ts";
import cls_getNotesListAfterVoicing from "./classFn/cls_getNotesListAfterVoicing.ts";
import cls_getScoreSymbol from "./classFn/cls_getScoreSymbol.ts";
import cls_addAdditionalNotes from "./classFn/cls_addAdditionalNotes.ts";
import {isEmpty} from "lodash";
import cls_tryToMergeTransform from "./classFn/cls_tryToMergeTransform.ts";
import cls_isTransformEmpty from "./classFn/cls_isTransformEmpty.ts";

const defaultTransform = {
  2: void 0, 3: void 0, 4: void 0, 5: void 0, 6: void 0,
  7: void 0, 9: void 0, 11: void 0, 13: void 0
}

export class Chord {
  public rootNote: InstanceType<typeof Note>
  #transformPanel: t_transformPanel
  #initInfo: {
    intervalPanel: t_intervalPanel;
    scoreSymbol: string;
    cnName: string;
    intervalList: [t_intervalList, number][];
    chordKey: string
    type: string
  };

  constructor(rootNote: InstanceType<typeof Note>, chordKey: string, initTransform?: t_inputTransformPanel) {
    this.rootNote = rootNote
    const initChordInfo = cls_initChordClass(chordKey)
    // This means the init info when the instance was created ( No transform info contains)
    this.#initInfo = {
      scoreSymbol: initChordInfo.scoreSymbol,
      intervalList: initChordInfo.baseIntervalList,
      chordKey: initChordInfo.chordKey,
      cnName: initChordInfo.cnName,
      intervalPanel: initChordInfo.baseIntervalPanel,
      type: initChordInfo.type
    }
    this.#transformPanel = isEmpty(initTransform) ? defaultTransform : {...defaultTransform, ...initTransform}
  }

  public tryToMergeTransform(): InstanceType<typeof Chord> {
    return cls_tryToMergeTransform(this.rootNote, this.#initInfo.chordKey, this.#intervalPanel, this.#transformPanel)
  }

  public get transformPanel(): t_transformPanel {
    return this.#transformPanel
  }

  public get chordKey() {
    return this.#initInfo.chordKey
  }

  public setTransform(transformString: t_transformString): InstanceType<typeof Chord> {
    this.#transformPanel = cls_dealTransformString(this.#transformPanel, transformString)
    return this
  }

  public get baseSymbol() {
    return this.#initInfo.scoreSymbol
  }


  public setOmit(omitInterval: t_intervalNum) {
    this.#transformPanel = cls_dealOmit(this.#transformPanel, omitInterval)
  }

  public get scoreSymbol(): string {
    return cls_getScoreSymbol(this.rootNote, this.#initInfo.scoreSymbol,
      this.#initInfo.intervalPanel, this.#transformPanel)
  }


  public clearTransform(): void {
    this.#transformPanel = defaultTransform
  }

  public get isTransformed(): boolean {
    return !cls_isTransformEmpty(this.#transformPanel)
  }

  get #intervalPanel(): t_intervalPanel {
    return cls_getIntervalPanel(this.#initInfo.intervalPanel, this.#transformPanel)
  }

  public get intervalList(): [t_intervalType, number][] {
    return cls_getIntervalList(this.#intervalPanel)
  }


  get #notesPanel(): t_chordNotesPanel {
    return cls_getNotesPanel(this.rootNote, this.#intervalPanel)
  }

  public get notesList(): Note[] {
    return cls_getNotesList(this.rootNote, this.#intervalPanel)
  }


  public get simpleDescription() {
    return this.notesList.map((noteInstance) => noteInstance.simpleDescription).join(",")
  }
}
