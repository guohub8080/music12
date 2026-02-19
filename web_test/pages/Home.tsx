/* eslint-disable no-mixed-spaces-and-tabs */


import {range} from "lodash";
import chordMeta from "../../src/chord/static/chordMeta.ts";
import {getNoteByLocation} from "../../src/note/methods/utGetNote.ts";
import {Interval} from "../../src/interval";

const Home = (props: {}) => {
  const rootNoteLocationList = range(12)
  const result = []
  const cl = rootNoteLocationList.map(n => {
    return chordMeta.map(c => {
      const rootNote = getNoteByLocation(n)[0]
      const nl = {
        n3L: -1,
        n5L: -1,
        n7L: -1,
        n9L: -1,
        n11L: -1,
        n13L: -1
      }
      const notesLocationList = c.intervalList.map(i => {
        const no = rootNote.getNoteByInterval(new Interval(i[0] as any, i[1] as any))
        if (i[1] === 3) {
          nl["n3L"] = no.locationId
        } else if (i[1] === 5) {
          nl["n5L"] = no.locationId
        } else if (i[1] === 7) {
          nl["n7L"] = no.locationId
        } else if (i[1] === 9 || i[1] === 2) {
          nl["n9L"] = no.locationId
        } else if (i[1] === 11 || i[1] === 4) {
          nl["n11L"] = no.locationId
        } else if (i[1] === 13 || i[1] === 6) {
          nl["n13L"] = no.locationId
        }
        return no
      }).map(o => o.locationId)

      const obj = {
        rootNoteLocation: n,
        chordKey: c.chordKey,
        cnName: c.cnName,
        type: c.type,
        notesLocationList: [rootNote.locationId, ...notesLocationList],
        orderedNotesLocationList: [rootNote.locationId, ...notesLocationList].sort((a, b) => a - b),
        ...nl
      }
      result.push(obj)
    })
  })
  console.log(result)
  return <>
    nihao home
  </>
}

export default Home

