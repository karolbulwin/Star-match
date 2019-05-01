import React from "react";
import { utils } from "../utils";
export const StarsDisplay = props => (
  <div className="stars-container">
    {utils.range(1, props.count).map(startId => (
      <div key={startId} className="star" />
    ))}
  </div>
);
