import React from "react";
import logo from "../logo.svg";

import { utils } from "../utils";
export const StarsDisplay = props => (
  <div className="stars-container">
    {utils.range(1, props.count).map(startId => (
      <div key={startId} className="star">
        <img src={logo} className="App-logo" alt="logo" />
      </div>
    ))}
  </div>
);
