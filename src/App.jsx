import { useState } from "react";
import "./App.css";
import ThemeToggle from "./components/ThemeToggle";
import CursorTrail from "./components/CursorTrail";
import Header from "./components/Header";
import GlitchCursor from './components/GlitchCursor';

function App() {
  return (
    <>
      <Header />
      <CursorTrail />
      <GlitchCursor />
    </>
  );
}

export default App;
