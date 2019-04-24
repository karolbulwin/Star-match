import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { StarMatch } from "./components/StarMatch";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <StarMatch />
      </header>
    </div>
  );
}

export default App;
