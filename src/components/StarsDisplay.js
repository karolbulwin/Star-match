import React from "react";
import star from "../images/star.svg";
import starPNG from "../images/star.png";

import { utils } from "../utils";
export const StarsDisplay = props => (
  <div className="stars-container">
    {utils.range(1, props.count).map(startId => (
      <div key={startId} className="star">
        <img src={starPNG} srcSet={star} className="App-star" alt="" />
      </div>
    ))}
  </div>
);
