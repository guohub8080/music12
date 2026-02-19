// noinspection ES6PreferShortImport
import {Radix} from "../src/common/radix/Radix.ts"
import {expect, test} from "vitest";
import {Note,} from "../src/note";
import {getNoteByLocation} from "../src/note/methods/utGetNote";
import {getIntervalByComparingNotes, Interval} from "../src/interval";
import chordMeta from "../src/chord/static/chordMeta"
import {range} from "lodash";

test("Test Interval", () => {
  const note1 = new Note("B", -1, 3);
  const note2 = new Note("F", 0, 4);
  const i = getIntervalByComparingNotes(note1, note2);
  expect(i.simpleDescription).toStrictEqual("纯五度")
  const rootNoteLocationList = range(12)
  const result = []
  const cl = rootNoteLocationList.map(n => {
    return chordMeta.map(c => {
      const rootNote = getNoteByLocation(n)[0]
      const notesLocationList = c.intervalList.map(i => {
        return rootNote.getNoteByInterval(new Interval(i[0] as any, i[1] as any))
      }).map(o => o.locationId)
      const semitoneList = []
      const obj = {
        rootNoteLocation: n,
        chordKey: c.chordKey,
        cnName: c.cnName,
        type: c.type,
        notesLocationList: [rootNote.locationId, ...notesLocationList],
        orderedNotesLocationList: [rootNote.locationId, ...notesLocationList].sort((a, b) => a - b)
      }
      result.push(obj)
    })
  })
  console.log(result)
})
