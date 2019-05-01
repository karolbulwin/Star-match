import React from "react";
import { utils } from "../utils";
export const useGameState = () => {
  const [stars, setStars] = React.useState(utils.random(1, 9));
  const [availableNums, setAvailableNums] = React.useState(utils.range(1, 9));
  const [candidateNums, setCandidateNums] = React.useState([]);
  const [secondsLeft, setSecondsLeft] = React.useState(10);

  const Counter = () => {
    useInterval(() => {
      if (secondsLeft > 0 && availableNums.length > 0) {
        setSecondsLeft(secondsLeft - 1);
      }
    }, 1000);
  };

  function useInterval(callback, delay) {
    const savedCallback = React.useRef();

    // Remember the latest function.
    React.useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    React.useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

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

  Counter();
  return { stars, availableNums, candidateNums, secondsLeft, setGameState };
};
