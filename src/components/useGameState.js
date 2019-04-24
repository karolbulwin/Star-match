import React from "react";
import { utils } from "../utils";
export const useGameState = () => {
  const [stars, setStars] = React.useState(utils.random(1, 9));
  const [availableNums, setAvailableNums] = React.useState(utils.range(1, 9));
  const [candidateNums, setCandidateNums] = React.useState([]);
  const [secondsLeft, setSecondsLeft] = React.useState(10);
  React.useEffect(() => {
    if (secondsLeft > 0 && availableNums.length > 0) {
      const timeId = setTimeout(() => {
        setSecondsLeft(secondsLeft - 1);
      }, 1000);
      return () => clearTimeout(timeId);
    }
  });
  const setGameState = newCandidateNums => {
    if (utils.sum(newCandidateNums) !== stars) {
      setCandidateNums(newCandidateNums);
    } else {
      const newavailableNums = availableNums.filter(
        num => !newCandidateNums.includes(num)
      );
      setStars(utils.randomSumIn(newavailableNums, 9));
      setAvailableNums(newavailableNums);
      setCandidateNums([]);
    }
  };
  return { stars, availableNums, candidateNums, secondsLeft, setGameState };
};
