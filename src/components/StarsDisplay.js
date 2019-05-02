import React from "react";
import logo from "../logo.svg";

import { utils } from "../utils";
export const StarsDisplay = props => (
  <div className="stars-container">
    {utils.range(1, props.count).map(startId => (
      <div key={startId} className="star">
        <img src={start} className="App-star" alt="" />
      </div>
    ))}
  </div>
);
