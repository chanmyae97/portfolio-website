import { useState } from "react";
import "./App.css";
import ThemeToggle from "./components/ThemeToggle";
import CursorTrail from "./components/CursorTrail";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <CursorTrail />
    </>
  );
}

export default App;
