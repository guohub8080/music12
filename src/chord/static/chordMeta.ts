const chordMeta = [{
  "type": "chord3",
  "cnName": "大三",
  "chordKey": "maj3",
  "scoreDisplay": "",
  "intervalList": [["maj", 3], ["p", 5]],
  "notesNum": 3,
  "semitoneLocationList": [4, 7],
  "orderedSemitoneLocationList": [4, 7]
}, {
  "type": "chord3",
  "cnName": "小三",
  "chordKey": "min3",
  "scoreDisplay": "m",
  "intervalList": [["min", 3], ["p", 5]],
  "notesNum": 3,
  "semitoneLocationList": [3, 7],
  "orderedSemitoneLocationList": [3, 7]
}, {
  "type": "chord3",
  "cnName": "减三",
  "chordKey": "dim3",
  "scoreDisplay": "°",
  "intervalList": [["min", 3], ["dim", 5]],
  "notesNum": 3,
  "semitoneLocationList": [3, 6],
  "orderedSemitoneLocationList": [3, 6]
}, {
  "type": "chord3",
  "cnName": "增三",
  "chordKey": "aug3",
  "scoreDisplay": "+",
  "intervalList": [["maj", 3], ["aug", 5]],
  "notesNum": 3,
  "semitoneLocationList": [4, 8],
  "orderedSemitoneLocationList": [4, 8]
}, {
  "type": "chord3",
  "cnName": "大三减五",
  "chordKey": "maj3b5",
  "scoreDisplay": -5,
  "intervalList": [["maj", 3], ["dim", 5]],
  "notesNum": 3,
  "semitoneLocationList": [4, 6],
  "orderedSemitoneLocationList": [4, 6]
}, {
  "type": "add",
  "cnName": "大六（大三加十三音）",
  "chordKey": "maj3add6",
  "scoreDisplay": 6,
  "intervalList": [["maj", 3], ["p", 5], ["maj", 6]],
  "notesNum": 4,
  "semitoneLocationList": [4, 7, 9],
  "orderedSemitoneLocationList": [4, 7, 9]
}, {
  "type": "add",
  "cnName": "小六（小三加十三音）",
  "chordKey": "min3add6",
  "scoreDisplay": "m6",
  "intervalList": [["min", 3], ["p", 5], ["maj", 6]],
  "notesNum": 4,
  "semitoneLocationList": [3, 7, 9],
  "orderedSemitoneLocationList": [3, 7, 9]
}, {
  "type": "add",
  "cnName": "六九",
  "chordKey": "maj3add6add9",
  "scoreDisplay": "6/9",
  "intervalList": [["maj", 3], ["p", 5], ["maj", 6], ["maj", 9]],
  "notesNum": 5,
  "semitoneLocationList": [4, 7, 9, 2],
  "orderedSemitoneLocationList": [2, 4, 7, 9]
}, {
  "type": "add",
  "cnName": "小六九",
  "chordKey": "min3add6add9",
  "scoreDisplay": "m6/9",
  "intervalList": [["min", 3], ["p", 5], ["maj", 6], ["maj", 9]],
  "notesNum": 5,
  "semitoneLocationList": [3, 7, 9, 2],
  "orderedSemitoneLocationList": [2, 3, 7, 9]
}, {
  "type": "add",
  "cnName": "大三加九音（二音）",
  "chordKey": "maj3add9",
  "scoreDisplay": "add9",
  "intervalList": [["maj", 3], ["p", 5], ["maj", 9]],
  "notesNum": 4,
  "semitoneLocationList": [4, 7, 2],
  "orderedSemitoneLocationList": [2, 4, 7]
}, {
  "type": "add",
  "cnName": "大三加十一音（四音）",
  "chordKey": "maj3add11",
  "scoreDisplay": "add11",
  "intervalList": [["maj", 3], ["p", 5], ["p", 11]],
  "notesNum": 4,
  "semitoneLocationList": [4, 7, 5],
  "orderedSemitoneLocationList": [4, 5, 7]
}, {
  "type": "add",
  "cnName": "小三加九音（二音）",
  "chordKey": "min3add9",
  "scoreDisplay": "madd9",
  "intervalList": [["min", 3], ["p", 5], ["maj", 9]],
  "notesNum": 4,
  "semitoneLocationList": [3, 7, 2],
  "orderedSemitoneLocationList": [2, 3, 7]
}, {
  "type": "add",
  "cnName": "小三加十一音（四音）",
  "chordKey": "min3add11",
  "scoreDisplay": "madd11",
  "intervalList": [["min", 3], ["p", 5], ["p", 11]],
  "notesNum": 4,
  "semitoneLocationList": [3, 7, 5],
  "orderedSemitoneLocationList": [3, 5, 7]
}, {
  "type": "add",
  "cnName": "大七加十一音（四音）",
  "chordKey": "maj7add11",
  "scoreDisplay": "M7add11",
  "intervalList": [["maj", 3], ["p", 5], ["maj", 7], ["p", 11]],
  "notesNum": 5,
  "semitoneLocationList": [4, 7, 11, 5],
  "orderedSemitoneLocationList": [4, 5, 7, 11]
}, {
  "type": "add",
  "cnName": "属七加六音",
  "chordKey": "dom7add6",
  "scoreDisplay": "7/6",
  "intervalList": [["maj", 3], ["p", 5], ["maj", 6], ["min", 7]],
  "notesNum": 5,
  "semitoneLocationList": [4, 7, 9, 10],
  "orderedSemitoneLocationList": [4, 7, 9, 10]
}, {
  "type": "aug6",
  "cnName": "意大利增六",
  "chordKey": "itaug6",
  "scoreDisplay": "It+6",
  "intervalList": [["aug", 4], ["min", 6]],
  "notesNum": 3,
  "semitoneLocationList": [6, 8],
  "orderedSemitoneLocationList": [6, 8]
}, {
  "type": "aug6",
  "cnName": "法国增六",
  "chordKey": "fraug6",
  "scoreDisplay": "Fr+6",
  "intervalList": [["maj", 2], ["aug", 4], ["min", 6]],
  "notesNum": 4,
  "semitoneLocationList": [2, 6, 8],
  "orderedSemitoneLocationList": [2, 6, 8]
}, {
  "type": "aug6",
  "cnName": "德国增六",
  "chordKey": "graug6",
  "scoreDisplay": "Gr+6",
  "intervalList": [["min", 3], ["aug", 4], ["min", 6]],
  "notesNum": 4,
  "semitoneLocationList": [3, 6, 8],
  "orderedSemitoneLocationList": [3, 6, 8]
}, {
  "type": "chord7",
  "cnName": "大七",
  "chordKey": "maj7",
  "scoreDisplay": "M7",
  "intervalList": [["maj", 3], ["p", 5], ["maj", 7]],
  "notesNum": 4,
  "semitoneLocationList": [4, 7, 11],
  "orderedSemitoneLocationList": [4, 7, 11]
}, {
  "type": "chord7",
  "cnName": "属七",
  "chordKey": "dom7",
  "scoreDisplay": 7,
  "intervalList": [["maj", 3], ["p", 5], ["min", 7]],
  "notesNum": 4,
  "semitoneLocationList": [4, 7, 10],
  "orderedSemitoneLocationList": [4, 7, 10]
}, {
  "type": "chord7",
  "cnName": "小七",
  "chordKey": "min7",
  "scoreDisplay": "m7",
  "intervalList": [["min", 3], ["p", 5], ["min", 7]],
  "notesNum": 4,
  "semitoneLocationList": [3, 7, 10],
  "orderedSemitoneLocationList": [3, 7, 10]
}, {
  "type": "chord7",
  "cnName": "半减七",
  "chordKey": "halfdim7",
  "scoreDisplay": "ø",
  "intervalList": [["min", 3], ["dim", 5], ["min", 7]],
  "notesNum": 4,
  "semitoneLocationList": [3, 6, 10],
  "orderedSemitoneLocationList": [3, 6, 10]
}, {
  "type": "chord7",
  "cnName": "减七",
  "chordKey": "dim7",
  "scoreDisplay": "°7",
  "intervalList": [["min", 3], ["dim", 5], ["dim", 7]],
  "notesNum": 4,
  "semitoneLocationList": [3, 6, 9],
  "orderedSemitoneLocationList": [3, 6, 9]
}, {
  "type": "chord7",
  "cnName": "小大七",
  "chordKey": "minmaj7",
  "scoreDisplay": "mM7",
  "intervalList": [["min", 3], ["p", 5], ["maj", 7]],
  "notesNum": 4,
  "semitoneLocationList": [3, 7, 11],
  "orderedSemitoneLocationList": [3, 7, 11]
}, {
  "type": "chord7",
  "cnName": "增七（属七升五）",
  "chordKey": "dom7#5",
  "scoreDisplay": "+7",
  "intervalList": [["maj", 3], ["aug", 5], ["min", 7]],
  "notesNum": 4,
  "semitoneLocationList": [4, 8, 10],
  "orderedSemitoneLocationList": [4, 8, 10]
}, {
  "type": "chord7",
  "cnName": "增大七",
  "chordKey": "augmaj7",
  "scoreDisplay": "+M7",
  "intervalList": [["maj", 3], ["aug", 5], ["maj", 7]],
  "notesNum": 4,
  "semitoneLocationList": [4, 8, 11],
  "orderedSemitoneLocationList": [4, 8, 11]
}, {
  "type": "chord7alt",
  "cnName": "属七降五",
  "chordKey": "dom7b5",
  "scoreDisplay": "7b5",
  "intervalList": [["maj", 3], ["dim", 5], ["min", 7]],
  "notesNum": 4,
  "semitoneLocationList": [4, 6, 10],
  "orderedSemitoneLocationList": [4, 6, 10]
}, {
  "type": "chord7alt",
  "cnName": "属七降九",
  "chordKey": "dom7b9",
  "scoreDisplay": "7b9",
  "intervalList": [["maj", 3], ["p", 5], ["min", 7], ["min", 9]],
  "notesNum": 5,
  "semitoneLocationList": [4, 7, 10, 1],
  "orderedSemitoneLocationList": [1, 4, 7, 10]
}, {
  "type": "chord7alt",
  "cnName": "属七升九",
  "chordKey": "dom7#9",
  "scoreDisplay": "7#9",
  "intervalList": [["maj", 3], ["p", 5], ["min", 7], ["aug", 9]],
  "notesNum": 5,
  "semitoneLocationList": [4, 7, 10, 3],
  "orderedSemitoneLocationList": [3, 4, 7, 10]
}, {
  "type": "chord7alt",
  "cnName": "属七升十一",
  "chordKey": "dom7#11",
  "scoreDisplay": "7#11",
  "intervalList": [["maj", 3], ["p", 5], ["min", 7], ["aug", 11]],
  "notesNum": 5,
  "semitoneLocationList": [4, 7, 10, 6],
  "orderedSemitoneLocationList": [4, 6, 7, 10]
}, {
  "type": "chord7alt",
  "cnName": "属七降十三",
  "chordKey": "dom7b13",
  "scoreDisplay": "7b13",
  "intervalList": [["maj", 3], ["p", 5], ["min", 7], ["min", 13]],
  "notesNum": 5,
  "semitoneLocationList": [4, 7, 10, 8],
  "orderedSemitoneLocationList": [4, 7, 8, 10]
}, {
  "type": "chord7alt",
  "cnName": "属七降五降九",
  "chordKey": "dom7b5b9",
  "scoreDisplay": "7b5b9",
  "intervalList": [["maj", 3], ["dim", 5], ["min", 7], ["min", 9]],
  "notesNum": 5,
  "semitoneLocationList": [4, 6, 10, 1],
  "orderedSemitoneLocationList": [1, 4, 6, 10]
}, {
  "type": "chord7alt",
  "cnName": "属七降五升九",
  "chordKey": "dom7b5#9",
  "scoreDisplay": "7b5#9",
  "intervalList": [["maj", 3], ["dim", 5], ["min", 7], ["aug", 9]],
  "notesNum": 5,
  "semitoneLocationList": [4, 6, 10, 3],
  "orderedSemitoneLocationList": [3, 4, 6, 10]
}, {
  "type": "chord7alt",
  "cnName": "大七降五",
  "chordKey": "maj7b5",
  "scoreDisplay": "M7b5",
  "intervalList": [["maj", 3], ["dim", 5], ["maj", 7]],
  "notesNum": 4,
  "semitoneLocationList": [4, 6, 11],
  "orderedSemitoneLocationList": [4, 6, 11]
}, {
  "type": "chord7alt",
  "cnName": "大七增五",
  "chordKey": "maj7#5",
  "scoreDisplay": "M7#5",
  "intervalList": [["maj", 3], ["aug", 5], ["maj", 7]],
  "notesNum": 4,
  "semitoneLocationList": [4, 8, 11],
  "orderedSemitoneLocationList": [4, 8, 11]
}, {
  "type": "chord7alt",
  "cnName": "大七降九",
  "chordKey": "maj7b9",
  "scoreDisplay": "M7b9",
  "intervalList": [["maj", 3], ["p", 5], ["maj", 7], ["min", 9]],
  "notesNum": 5,
  "semitoneLocationList": [4, 7, 11, 1],
  "orderedSemitoneLocationList": [1, 4, 7, 11]
}, {
  "type": "chord7alt",
  "cnName": "大七降十三",
  "chordKey": "maj7b13",
  "scoreDisplay": "M7b13",
  "intervalList": [["maj", 3], ["p", 5], ["maj", 7], ["min", 13]],
  "notesNum": 5,
  "semitoneLocationList": [4, 7, 11, 8],
  "orderedSemitoneLocationList": [4, 7, 8, 11]
}, {
  "type": "chord7alt",
  "cnName": "大七升十一",
  "chordKey": "maj7#11",
  "scoreDisplay": "M7#11",
  "intervalList": [["maj", 3], ["p", 5], ["maj", 7], ["aug", 11]],
  "notesNum": 5,
  "semitoneLocationList": [4, 7, 11, 6],
  "orderedSemitoneLocationList": [4, 6, 7, 11]
}, {
  "type": "chord7alt",
  "cnName": "小七升五",
  "chordKey": "min7#5",
  "scoreDisplay": "m7#5",
  "intervalList": [["min", 3], ["aug", 5], ["min", 7]],
  "notesNum": 4,
  "semitoneLocationList": [3, 8, 10],
  "orderedSemitoneLocationList": [3, 8, 10]
}, {
  "type": "chord7alt",
  "cnName": "小大七降五",
  "chordKey": "minmaj7b5",
  "scoreDisplay": "mM7b5",
  "intervalList": [["min", 3], ["dim", 5], ["maj", 7]],
  "notesNum": 4,
  "semitoneLocationList": [3, 6, 11],
  "orderedSemitoneLocationList": [3, 6, 11]
}, {
  "type": "chord7alt",
  "cnName": "小大七升五",
  "chordKey": "minmaj7#5",
  "scoreDisplay": "mM7#5",
  "intervalList": [["min", 3], ["aug", 5], ["maj", 7]],
  "notesNum": 4,
  "semitoneLocationList": [3, 8, 11],
  "orderedSemitoneLocationList": [3, 8, 11]
}, {
  "type": "chord7alt",
  "cnName": "增七降九（属七升五降九）",
  "chordKey": "dom7#5b9",
  "scoreDisplay": "+7b9",
  "intervalList": [["maj", 3], ["aug", 5], ["min", 7], ["min", 9]],
  "notesNum": 5,
  "semitoneLocationList": [4, 8, 10, 1],
  "orderedSemitoneLocationList": [1, 4, 8, 10]
}, {
  "type": "chord7alt",
  "cnName": "增七升九（属七升五升九）",
  "chordKey": "dom7#5#9",
  "scoreDisplay": "+7#9",
  "intervalList": [["maj", 3], ["aug", 5], ["min", 7], ["aug", 9]],
  "notesNum": 5,
  "semitoneLocationList": [4, 8, 10, 3],
  "orderedSemitoneLocationList": [3, 4, 8, 10]
}, {
  "type": "sus",
  "cnName": "挂二",
  "chordKey": "sus2",
  "scoreDisplay": "sus2",
  "intervalList": [["maj", 2], ["p", 5]],
  "notesNum": 3,
  "semitoneLocationList": [2, 7],
  "orderedSemitoneLocationList": [2, 7]
}, {
  "type": "sus",
  "cnName": "挂四",
  "chordKey": "sus4",
  "scoreDisplay": "sus4",
  "intervalList": [["p", 4], ["p", 5]],
  "notesNum": 3,
  "semitoneLocationList": [5, 7],
  "orderedSemitoneLocationList": [5, 7]
}, {
  "type": "sus",
  "cnName": "属七挂二",
  "chordKey": "dom7sus2",
  "scoreDisplay": "7sus2",
  "intervalList": [["maj", 2], ["p", 5], ["min", 7]],
  "notesNum": 4,
  "semitoneLocationList": [2, 7, 10],
  "orderedSemitoneLocationList": [2, 7, 10]
}, {
  "type": "sus",
  "cnName": "属七挂四",
  "chordKey": "dom7sus4",
  "scoreDisplay": "7sus4",
  "intervalList": [["p", 4], ["p", 5], ["min", 7]],
  "notesNum": 4,
  "semitoneLocationList": [5, 7, 10],
  "orderedSemitoneLocationList": [5, 7, 10]
}, {
  "type": "sus",
  "cnName": "大七挂二",
  "chordKey": "maj7sus2",
  "scoreDisplay": "M7sus2",
  "intervalList": [["maj", 2], ["p", 5], ["maj", 7]],
  "notesNum": 4,
  "semitoneLocationList": [2, 7, 11],
  "orderedSemitoneLocationList": [2, 7, 11]
}, {
  "type": "sus",
  "cnName": "大七挂四",
  "chordKey": "maj7sus4",
  "scoreDisplay": "M7sus4",
  "intervalList": [["p", 4], ["p", 5], ["maj", 7]],
  "notesNum": 4,
  "semitoneLocationList": [5, 7, 11],
  "orderedSemitoneLocationList": [5, 7, 11]
}, {
  "type": "sus",
  "cnName": "属九挂四",
  "chordKey": "dom9sus4",
  "scoreDisplay": "9sus4",
  "intervalList": [["p", 4], ["p", 5], ["min", 7], ["maj", 9]],
  "notesNum": 5,
  "semitoneLocationList": [5, 7, 10, 2],
  "orderedSemitoneLocationList": [2, 5, 7, 10]
}, {
  "type": "sus",
  "cnName": "大九挂四",
  "chordKey": "maj9sus4",
  "scoreDisplay": "M9sus4",
  "intervalList": [["p", 4], ["p", 5], ["maj", 7], ["maj", 9]],
  "notesNum": 5,
  "semitoneLocationList": [5, 7, 11, 2],
  "orderedSemitoneLocationList": [2, 5, 7, 11]
}, {
  "type": "sus",
  "cnName": "属十三挂四",
  "chordKey": "dom13sus4",
  "scoreDisplay": "13sus4",
  "intervalList": [["p", 4], ["p", 5], ["min", 7], ["maj", 9], ["maj", 13]],
  "notesNum": 6,
  "semitoneLocationList": [5, 7, 10, 2, 9],
  "orderedSemitoneLocationList": [2, 5, 7, 9, 10]
}, {
  "type": "sus",
  "cnName": "大十三挂四",
  "chordKey": "maj13sus4",
  "scoreDisplay": "M13sus4",
  "intervalList": [["p", 4], ["p", 5], ["maj", 7], ["maj", 9], ["maj", 13]],
  "notesNum": 6,
  "semitoneLocationList": [5, 7, 11, 2, 9],
  "orderedSemitoneLocationList": [2, 5, 7, 9, 11]
}, {
  "type": "sus",
  "cnName": "大十三挂二",
  "chordKey": "maj13sus2",
  "scoreDisplay": "M13sus2",
  "intervalList": [["maj", 2], ["p", 5], ["maj", 7], ["maj", 13]],
  "notesNum": 5,
  "semitoneLocationList": [2, 7, 11, 9],
  "orderedSemitoneLocationList": [2, 7, 9, 11]
}, {
  "type": "chord9",
  "cnName": "大九",
  "chordKey": "maj9",
  "scoreDisplay": "M9",
  "intervalList": [["maj", 3], ["p", 5], ["maj", 7], ["maj", 9]],
  "notesNum": 5,
  "semitoneLocationList": [4, 7, 11, 2],
  "orderedSemitoneLocationList": [2, 4, 7, 11]
}, {
  "type": "chord9",
  "cnName": "属九",
  "chordKey": "dom9",
  "scoreDisplay": 9,
  "intervalList": [["maj", 3], ["p", 5], ["min", 7], ["maj", 9]],
  "notesNum": 5,
  "semitoneLocationList": [4, 7, 10, 2],
  "orderedSemitoneLocationList": [2, 4, 7, 10]
}, {
  "type": "chord9",
  "cnName": "小九",
  "chordKey": "min9",
  "scoreDisplay": "m9",
  "intervalList": [["min", 3], ["p", 5], ["min", 7], ["maj", 9]],
  "notesNum": 5,
  "semitoneLocationList": [3, 7, 10, 2],
  "orderedSemitoneLocationList": [2, 3, 7, 10]
}, {
  "type": "chord9",
  "cnName": "小大九",
  "chordKey": "minmaj9",
  "scoreDisplay": "mM9",
  "intervalList": [["min", 3], ["p", 5], ["maj", 7], ["maj", 9]],
  "notesNum": 5,
  "semitoneLocationList": [3, 7, 11, 2],
  "orderedSemitoneLocationList": [2, 3, 7, 11]
}, {
  "type": "chord9",
  "cnName": "增九（属九升五）",
  "chordKey": "dom9#5",
  "scoreDisplay": "+9",
  "intervalList": [["maj", 3], ["aug", 5], ["min", 7], ["maj", 9]],
  "notesNum": 5,
  "semitoneLocationList": [4, 8, 10, 2],
  "orderedSemitoneLocationList": [2, 4, 8, 10]
}, {
  "type": "chord9",
  "cnName": "属九降九",
  "chordKey": "dom9b9",
  "scoreDisplay": "9b9",
  "intervalList": [["maj", 3], ["p", 5], ["min", 7], ["min", 9]],
  "notesNum": 5,
  "semitoneLocationList": [4, 7, 10, 1],
  "orderedSemitoneLocationList": [1, 4, 7, 10]
}, {
  "type": "chord9",
  "cnName": "属九降十一",
  "chordKey": "dom9b11",
  "scoreDisplay": "9b11",
  "intervalList": [["maj", 3], ["p", 5], ["min", 7], ["maj", 9], ["dim", 11]],
  "notesNum": 6,
  "semitoneLocationList": [4, 7, 10, 2, 4],
  "orderedSemitoneLocationList": [2, 4, 4, 7, 10]
}, {
  "type": "chord9",
  "cnName": "属九升十一",
  "chordKey": "dom9#11",
  "scoreDisplay": "9#11",
  "intervalList": [["maj", 3], ["p", 5], ["min", 7], ["maj", 9], ["aug", 11]],
  "notesNum": 6,
  "semitoneLocationList": [4, 7, 10, 2, 6],
  "orderedSemitoneLocationList": [2, 4, 6, 7, 10]
}, {
  "type": "chord9",
  "cnName": "属九降十三",
  "chordKey": "dom9b13",
  "scoreDisplay": "9b13",
  "intervalList": [["maj", 3], ["p", 5], ["min", 7], ["maj", 9], ["min", 13]],
  "notesNum": 6,
  "semitoneLocationList": [4, 7, 10, 2, 8],
  "orderedSemitoneLocationList": [2, 4, 7, 8, 10]
}, {
  "type": "chord9",
  "cnName": "大九降五",
  "chordKey": "maj9b5",
  "scoreDisplay": "M9b5",
  "intervalList": [["maj", 3], ["dim", 5], ["maj", 7], ["maj", 9]],
  "notesNum": 5,
  "semitoneLocationList": [4, 6, 11, 2],
  "orderedSemitoneLocationList": [2, 4, 6, 11]
}, {
  "type": "chord9",
  "cnName": "大九升五",
  "chordKey": "maj9#5",
  "scoreDisplay": "M9#5",
  "intervalList": [["maj", 3], ["aug", 5], ["maj", 7], ["maj", 9]],
  "notesNum": 5,
  "semitoneLocationList": [4, 8, 11, 2],
  "orderedSemitoneLocationList": [2, 4, 8, 11]
}, {
  "type": "chord9",
  "cnName": "大九升十一",
  "chordKey": "maj9#11",
  "scoreDisplay": "M9#11",
  "intervalList": [["maj", 3], ["p", 5], ["maj", 7], ["maj", 9], ["aug", 11]],
  "notesNum": 6,
  "semitoneLocationList": [4, 7, 11, 2, 6],
  "orderedSemitoneLocationList": [2, 4, 6, 7, 11]
}, {
  "type": "chord9",
  "cnName": "大九降十三",
  "chordKey": "maj9b13",
  "scoreDisplay": "M9b13",
  "intervalList": [["maj", 3], ["p", 5], ["maj", 7], ["maj", 9], ["min", 13]],
  "notesNum": 6,
  "semitoneLocationList": [4, 7, 11, 2, 8],
  "orderedSemitoneLocationList": [2, 4, 7, 8, 11]
}, {
  "type": "chord9",
  "cnName": "小九降五",
  "chordKey": "min9b5",
  "scoreDisplay": "m9b5",
  "intervalList": [["min", 3], ["dim", 5], ["min", 7], ["maj", 9]],
  "notesNum": 5,
  "semitoneLocationList": [3, 6, 10, 2],
  "orderedSemitoneLocationList": [2, 3, 6, 10]
}, {
  "type": "chord9",
  "cnName": "小九降九",
  "chordKey": "min9b9",
  "scoreDisplay": "m9b9",
  "intervalList": [["min", 3], ["p", 5], ["min", 7], ["min", 9]],
  "notesNum": 5,
  "semitoneLocationList": [3, 7, 10, 1],
  "orderedSemitoneLocationList": [1, 3, 7, 10]
}, {
  "type": "chord11",
  "cnName": "大十一",
  "chordKey": "maj11",
  "scoreDisplay": "M11",
  "intervalList": [["maj", 3], ["p", 5], ["maj", 7], ["maj", 9], ["p", 11]],
  "notesNum": 6,
  "semitoneLocationList": [4, 7, 11, 2, 5],
  "orderedSemitoneLocationList": [2, 4, 5, 7, 11]
}, {
  "type": "chord11",
  "cnName": "属十一",
  "chordKey": "dom11",
  "scoreDisplay": 11,
  "intervalList": [["maj", 3], ["p", 5], ["min", 7], ["maj", 9], ["p", 11]],
  "notesNum": 6,
  "semitoneLocationList": [4, 7, 10, 2, 5],
  "orderedSemitoneLocationList": [2, 4, 5, 7, 10]
}, {
  "type": "chord11",
  "cnName": "小十一",
  "chordKey": "min11",
  "scoreDisplay": "m11",
  "intervalList": [["min", 3], ["p", 5], ["min", 7], ["maj", 9], ["p", 11]],
  "notesNum": 6,
  "semitoneLocationList": [3, 7, 10, 2, 5],
  "orderedSemitoneLocationList": [2, 3, 5, 7, 10]
}, {
  "type": "chord11",
  "cnName": "小大十一",
  "chordKey": "minmaj11",
  "scoreDisplay": "mM11",
  "intervalList": [["min", 3], ["p", 5], ["maj", 7], ["maj", 9], ["p", 11]],
  "notesNum": 6,
  "semitoneLocationList": [3, 7, 11, 2, 5],
  "orderedSemitoneLocationList": [2, 3, 5, 7, 11]
}, {
  "type": "chord11",
  "cnName": "属十一降五",
  "chordKey": "dom11b5",
  "scoreDisplay": "11b5",
  "intervalList": [["maj", 3], ["dim", 5], ["min", 7], ["maj", 9], ["p", 11]],
  "notesNum": 6,
  "semitoneLocationList": [4, 6, 10, 2, 5],
  "orderedSemitoneLocationList": [2, 4, 5, 6, 10]
}, {
  "type": "chord11",
  "cnName": "属十一升五",
  "chordKey": "dom11#5",
  "scoreDisplay": "11#5",
  "intervalList": [["maj", 3], ["aug", 5], ["min", 7], ["maj", 9], ["p", 11]],
  "notesNum": 6,
  "semitoneLocationList": [4, 8, 10, 2, 5],
  "orderedSemitoneLocationList": [2, 4, 5, 8, 10]
}, {
  "type": "chord11",
  "cnName": "属十一降九",
  "chordKey": "dom11b9",
  "scoreDisplay": "11b9",
  "intervalList": [["maj", 3], ["p", 5], ["min", 7], ["min", 9], ["p", 11]],
  "notesNum": 6,
  "semitoneLocationList": [4, 7, 10, 1, 5],
  "orderedSemitoneLocationList": [1, 4, 5, 7, 10]
}, {
  "type": "chord11",
  "cnName": "属十一升九",
  "chordKey": "dom11#9",
  "scoreDisplay": "11#9",
  "intervalList": [["maj", 3], ["p", 5], ["min", 7], ["aug", 9], ["p", 11]],
  "notesNum": 6,
  "semitoneLocationList": [4, 7, 10, 3, 5],
  "orderedSemitoneLocationList": [3, 4, 5, 7, 10]
}, {
  "type": "chord11",
  "cnName": "属十一降十三",
  "chordKey": "dom11b13",
  "scoreDisplay": "11b13",
  "intervalList": [["maj", 3], ["p", 5], ["min", 7], ["maj", 9], ["p", 11], ["min", 13]],
  "notesNum": 7,
  "semitoneLocationList": [4, 7, 10, 2, 5, 8],
  "orderedSemitoneLocationList": [2, 4, 5, 7, 8, 10]
}, {
  "type": "chord11",
  "cnName": "小十一降五",
  "chordKey": "min11b5",
  "scoreDisplay": "m11b5",
  "intervalList": [["min", 3], ["dim", 5], ["min", 7], ["maj", 9], ["p", 11]],
  "notesNum": 6,
  "semitoneLocationList": [3, 6, 10, 2, 5],
  "orderedSemitoneLocationList": [2, 3, 5, 6, 10]
}, {
  "type": "chord13",
  "cnName": "大十三",
  "chordKey": "maj13",
  "scoreDisplay": "M13",
  "intervalList": [["maj", 3], ["p", 5], ["maj", 7], ["maj", 9], ["p", 11], ["maj", 13]],
  "notesNum": 7,
  "semitoneLocationList": [4, 7, 11, 2, 5, 9],
  "orderedSemitoneLocationList": [2, 4, 5, 7, 9, 11]
}, {
  "type": "chord13",
  "cnName": "属十三",
  "chordKey": "dom13",
  "scoreDisplay": 13,
  "intervalList": [["maj", 3], ["p", 5], ["min", 7], ["maj", 9], ["p", 11], ["maj", 13]],
  "notesNum": 7,
  "semitoneLocationList": [4, 7, 10, 2, 5, 9],
  "orderedSemitoneLocationList": [2, 4, 5, 7, 9, 10]
}, {
  "type": "chord13",
  "cnName": "小十三",
  "chordKey": "min13",
  "scoreDisplay": "m13",
  "intervalList": [["min", 3], ["p", 5], ["min", 7], ["maj", 9], ["p", 11], ["maj", 13]],
  "notesNum": 7,
  "semitoneLocationList": [3, 7, 10, 2, 5, 9],
  "orderedSemitoneLocationList": [2, 3, 5, 7, 9, 10]
}, {
  "type": "chord13",
  "cnName": "小大十三",
  "chordKey": "minmaj13",
  "scoreDisplay": "mM13",
  "intervalList": [["min", 3], ["p", 5], ["maj", 7], ["maj", 9], ["p", 11], ["maj", 13]],
  "notesNum": 7,
  "semitoneLocationList": [3, 7, 11, 2, 5, 9],
  "orderedSemitoneLocationList": [2, 3, 5, 7, 9, 11]
}, {
  "type": "chord13",
  "cnName": "属十三降五",
  "chordKey": "dom13b5",
  "scoreDisplay": "13b5",
  "intervalList": [["maj", 3], ["dim", 5], ["min", 7], ["maj", 9], ["p", 11], ["maj", 13]],
  "notesNum": 7,
  "semitoneLocationList": [4, 6, 10, 2, 5, 9],
  "orderedSemitoneLocationList": [2, 4, 5, 6, 9, 10]
}, {
  "type": "chord13",
  "cnName": "属十三升五",
  "chordKey": "dom13#5",
  "scoreDisplay": "13#5",
  "intervalList": [["maj", 3], ["aug", 5], ["min", 7], ["maj", 9], ["p", 11], ["maj", 13]],
  "notesNum": 7,
  "semitoneLocationList": [4, 8, 10, 2, 5, 9],
  "orderedSemitoneLocationList": [2, 4, 5, 8, 9, 10]
}, {
  "type": "chord13",
  "cnName": "属十三降九",
  "chordKey": "dom13b9",
  "scoreDisplay": "13b9",
  "intervalList": [["maj", 3], ["p", 5], ["min", 7], ["min", 9], ["p", 11], ["maj", 13]],
  "notesNum": 7,
  "semitoneLocationList": [4, 7, 10, 1, 5, 9],
  "orderedSemitoneLocationList": [1, 4, 5, 7, 9, 10]
}, {
  "type": "chord13",
  "cnName": "属十三升九",
  "chordKey": "dom13#9",
  "scoreDisplay": "13#9",
  "intervalList": [["maj", 3], ["p", 5], ["min", 7], ["aug", 9], ["maj", 13]],
  "notesNum": 6,
  "semitoneLocationList": [4, 7, 10, 3, 9],
  "orderedSemitoneLocationList": [3, 4, 7, 9, 10]
}, {
  "type": "chord13",
  "cnName": "属十三升十一",
  "chordKey": "dom13#11",
  "scoreDisplay": "13#11",
  "intervalList": [["maj", 3], ["p", 5], ["min", 7], ["maj", 9], ["aug", 11], ["maj", 13]],
  "notesNum": 7,
  "semitoneLocationList": [4, 7, 10, 2, 6, 9],
  "orderedSemitoneLocationList": [2, 4, 6, 7, 9, 10]
}, {
  "type": "chord13",
  "cnName": "大十三降五",
  "chordKey": "maj13b5",
  "scoreDisplay": "M13b5",
  "intervalList": [["maj", 3], ["dim", 5], ["maj", 7], ["maj", 9], ["maj", 13]],
  "notesNum": 6,
  "semitoneLocationList": [4, 6, 11, 2, 9],
  "orderedSemitoneLocationList": [2, 4, 6, 9, 11]
}, {
  "type": "chord13",
  "cnName": "大十三升五",
  "chordKey": "maj13#5",
  "scoreDisplay": "M13#5",
  "intervalList": [["maj", 3], ["aug", 5], ["maj", 7], ["maj", 9], ["maj", 13]],
  "notesNum": 6,
  "semitoneLocationList": [4, 8, 11, 2, 9],
  "orderedSemitoneLocationList": [2, 4, 8, 9, 11]
}, {
  "type": "chord13",
  "cnName": "大十三降九",
  "chordKey": "maj13b9",
  "scoreDisplay": "M13b9",
  "intervalList": [["maj", 3], ["p", 5], ["maj", 7], ["min", 9], ["maj", 13]],
  "notesNum": 6,
  "semitoneLocationList": [4, 7, 11, 1, 9],
  "orderedSemitoneLocationList": [1, 4, 7, 9, 11]
}, {
  "type": "chord13",
  "cnName": "大十三升十一",
  "chordKey": "maj13#11",
  "scoreDisplay": "M13#11",
  "intervalList": [["maj", 3], ["p", 5], ["maj", 7], ["maj", 9], ["aug", 11], ["maj", 13]],
  "notesNum": 7,
  "semitoneLocationList": [4, 7, 11, 2, 6, 9],
  "orderedSemitoneLocationList": [2, 4, 6, 7, 9, 11]
}
]

export default chordMeta