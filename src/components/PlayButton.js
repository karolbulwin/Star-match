import React from "react";
import { colors } from "./colors";
export const PlayButton = props => (
  <button
    className="number"
    style={{ backgroundColor: colors[props.status] }}
    onClick={() => props.onClick(props.number, props.status)}
    disabled={props.disabled}
  >
    {props.number}
  </button>
);
