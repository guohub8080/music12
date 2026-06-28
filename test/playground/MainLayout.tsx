import {Link, Outlet} from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <nav style={{
        padding: "10px 20px",
        background: "#333",
        display: "flex",
        gap: 20,
      }}>
        <Link to="/home" style={{ color: "#fff", textDecoration: "none" }}>Home</Link>
        <Link to="/radix" style={{ color: "#fff", textDecoration: "none" }}>Radix</Link>
        <Link to="/findComplexChord" style={{ color: "#fff", textDecoration: "none" }}>FindChord</Link>
        <Link to="/findNotesInScale" style={{ color: "#fff", textDecoration: "none" }}>FindScale</Link>
        <Link to="/findNotesInScales" style={{ color: "#fff", textDecoration: "none" }}>FindScales</Link>
        <Link to="/scaleModeTypes" style={{ color: "#fff", textDecoration: "none" }}>ScaleModeTypes</Link>
        <Link to="/scaleClass" style={{ color: "#fff", textDecoration: "none" }}>ScaleClass</Link>
        <Link to="/chordClass" style={{ color: "#fff", textDecoration: "none" }}>ChordClass</Link>
        <Link to="/circleOfFifths" style={{ color: "#fff", textDecoration: "none" }}>CircleOfFifths</Link>
      </nav>
      <Outlet/>
    </>
  )
}

export default MainLayout
