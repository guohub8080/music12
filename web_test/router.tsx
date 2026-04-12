import FindComplexChordTest from "@web/pages/FindComplexChordTest.tsx";
import FindNotesInScaleTest from "@web/pages/FindNotesInScaleTest.tsx";
import FindNotesInScalesTest from "@web/pages/FindNotesInScalesTest.tsx";
import Radix from "@web/pages/Radix.tsx";
import ScaleClassTest from "@web/pages/ScaleClassTest.tsx";
import ScaleModeTypesTest from "@web/pages/ScaleModeTypesTest.tsx";
import ChordClassTest from "@web/pages/ChordClassTest.tsx";
import CircleOfFifthsTest from "@web/pages/CircleOfFifthsTest.tsx";
import {createHashRouter, Navigate} from "react-router-dom";
import App from "./App.tsx";
import MainLayout from "./MainLayout.tsx";
import Home from "./pages/Home.tsx";

const r = createHashRouter([
  {
    path: "",
    element: <Navigate to={"/home"}/>
  },
  {
    path: "/",
    element: <MainLayout/>,
    children: [
      {
        path: "home",
        element: <Home/>,
      },
      {
        path: "radix",
        element: <Radix/>,
      },
      {
        path: "findComplexChord",
        element: <FindComplexChordTest/>,
      },
      {
        path: "findNotesInScale",
        element: <FindNotesInScaleTest/>,
      },
      {
        path: "findNotesInScales",
        element: <FindNotesInScalesTest/>,
      },
      {
        path: "scaleModeTypes",
        element: <ScaleModeTypesTest/>,
      },
      {
        path: "scaleClass",
        element: <ScaleClassTest/>,
      },
      {
        path: "chordClass",
        element: <ChordClassTest/>,
      },
      {
        path: "circleOfFifths",
        element: <CircleOfFifthsTest/>,
      },
    ],
  }
])

export default r
