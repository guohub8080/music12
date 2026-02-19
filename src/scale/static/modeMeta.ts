import scaleMode from "../presets/ScaleMode.ts"
// 自然大调（Ionian）
const Major = {
  uid: scaleMode.NaturalMajor,
  intervalList: [["maj", 2], ["maj", 3], ["p", 4], ["p", 5], ["maj", 6], ["maj", 7]],
  name: "自然大调",
  type: "major",
  description: "也称为自然大调，自然大调的 I 级音阶，由 C 大调的 C 进行到高八度的 C，构成音分别为：1 2 3 4 5 6 7 1",
}

// 和声大调
const HarmonicMajor = {
  uid: scaleMode.HarmonicMajor,
  intervalList: [["maj", 2], ["maj", 3], ["p", 4], ["p", 5], ["min", 6], ["maj", 7]],
  name: "和声大调",
  type: "major",
  description: "把自然大调的第六级音降低一个半音，构成音分别为：1 2 3 4 5 b6 7 1",
}

// 旋律大调
const MelodicMajor = {
  uid: scaleMode.MelodicMajorDescending,
  intervalList: [["maj", 2], ["maj", 3], ["p", 4], ["p", 5], ["min", 6], ["min", 7]],
  name: "旋律大调（下行）",
  type: "major",
  description: "把自然大调的第六、七级音降低一个半音，构成音分别为：1 2 3 4 5 b6 b7 1",
}

// 自然小调（Aeolian）
const Minor = {
  uid: scaleMode.NaturalMinor,
  intervalList: [["maj", 2], ["min", 3], ["p", 4], ["p", 5], ["min", 6], ["min", 7]],
  name: "自然小调",
  type: "minor",
  description: "自然小调，自然大调的 VI 级音阶，由 C 大调的 A 进行到高八度的 A，构成音分别为：1 2 b3 4 5 b6 b7 1",
}

// 和声小调
const HarmonicMinor = {
  uid: scaleMode.HarmonicMinor,
  intervalList: [["maj", 2], ["min", 3], ["p", 4], ["p", 5], ["min", 6], ["maj", 7]],
  name: "和声小调",
  type: "minor",
  description: "把自然大调的第七级音升高一个半音，构成音分别为：1 2 b3 4 5 b6 7 1",
}

// 旋律小调（爵士小调）
const MelodicMinor = {
  uid: scaleMode.MelodicMinorAscending,
  intervalList: [["maj", 2], ["min", 3], ["p", 4], ["p", 5], ["maj", 6], ["maj", 7]],
  name: "旋律小调（上行）",
  type: "minor",
  description: "把自然大调的第七级音升高一个半音，构成音分别为：1 2 b3 4 5 6 7 1",
}

// Dorian小调
const Dorian = {
  uid: scaleMode.Dorian,
  intervalList: [["maj", 2], ["min", 3], ["p", 4], ["p", 5], ["maj", 6], ["min", 7]],
  name: "Dorian",
  type: "minor",
  description: "自然大调的 II 级音阶，由 C 大调的 D 进行到高八度的 D，构成音分别为：1 2 b3 4 5 6 b7 1",
}

// Phrygian小调
const Phrygian = {
  uid: scaleMode.Phrygian,
  intervalList: [["min", 2], ["min", 3], ["p", 4], ["p", 5], ["min", 6], ["min", 7]],
  name: "Phrygian",
  type: "minor",
  description: "自然大调的 III 级音阶，由 C 大调的 E 进行到高八度的 E，构成音分别为：1 b2 b3 4 5 b6 b7 1",
}

// Lydian大调
const Lydian = {
  uid: scaleMode.Lydian,
  intervalList: [["maj", 2], ["maj", 3], ["aug", 4], ["p", 5], ["maj", 6], ["maj", 7]],
  name: "Lydian",
  type: "major",
  description: "自然大调的 IV 级音阶，由 C 大调的 F 进行到高八度的 F，构成音分别为：1 2 3 #4 5 6 7 1",
}

// 混合Lydian大调
const MixoLydian = {
  uid: scaleMode.Mixolydian,
  intervalList: [["maj", 2], ["maj", 3], ["p", 4], ["p", 5], ["maj", 6], ["min", 7]],
  name: "Mixolydian",
  type: "major",
  description: "自然大调的 GuideDot 级音阶，由 C 大调的 G 进行到高八度的 G，构成音分别为：1 2 3 4 5 6 b7 1",
}

// Locrian半减七调
const Locrian = {
  uid: scaleMode.Locrian,
  intervalList: [["min", 2], ["min", 3], ["p", 4], ["dim", 5], ["min", 6], ["min", 7]],
  name: "Locrian半减七调",
  type: "halfdim7",
  description: "自然大调的 VII 级音阶，由 C 大调的 B 进行到高八度的 B，构成音分别为：1 b2 b3 4 b5 b6 b7 1",
}

// // 中国传统五声：宫调
// const ChinaGong = {
//   uid: "CG",
//   intervalList: [["maj", 2], ["maj", 3], ["p", 5], ["maj", 6]],
//   name: "宫调",
//   description: "宫调，构成音分别为1 2 3 5 6",
// }
//
// // 中国传统五声：商调
// const ChinaShang = {
//   uid: "CS",
//   intervalList: [["maj", 2], ["p", 4], ["p", 5], ["min", 6]],
//   name: "宫调",
//   description: "商调，构成音分别为：1 2 4 5 b6",
// }
//
// // 中国传统五声：角调
// const ChinaJue = {
//   uid: "CJ",
//   intervalList: [["min", 3], ["p", 4], ["min", 6], ["min", 7]],
//   name: "角调",
//   description: "角调，构成音分别为：1 b3 4 b6 b7",
// }
//
// // 中国传统五声：徵调
// const ChinaZhi = {
//   uid: "CZ",
//   intervalList: [["maj", 2], ["p", 4], ["p", 5], ["maj", 6]],
//   name: "徵调",
//   description: "徵调，构成音分别为：1 2 4 5 6",
// }
//
// // 中国传统五声：羽调
// const ChinaYu = {
//   uid: "CY",
//   intervalList: [["min", 3], ["p", 4], ["p", 5], ["min", 7]],
//   name: "羽调",
//   description: "羽调，构成音分别为：1 b3 4 5 b7",
// }


export default [
  Major, Minor, HarmonicMajor, MelodicMajor, MelodicMinor, HarmonicMinor, Dorian, Lydian, MixoLydian, Locrian,
  Phrygian
]