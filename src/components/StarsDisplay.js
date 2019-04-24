import React from "react";
import { utils } from "../utils";
export const StarsDisplay = props => (
  <>
    {utils.range(1, props.count).map(startId => (
      <div key={startId} className="star" />
    ))}
  </>
);
