import React from "react";
import logo from "../logo.svg";
import "../styles/App.scss";
import { StarMatch } from "./StarMatch";

function App() {
  return (
    <div className="App">
      <main className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <StarMatch />
      </main>
    </div>
  );
}

export default App;