import React from 'react';
import logo from './logo.svg';
import './App.css';
// import { start } from 'repl';

const StarsDisplay = props => (
  <>
    {utils.range(1, props.count).map(startId => 
      <div key={startId} className='star'/>
    )}
  </>
)

const PlayButton = props => (
  <button
    className='number'
    style={{ backgroundColor: colors[props.status] }}
    onClick={() => props.onClick(props.number, props.status)}
  >
    {props.number}
  </button>
);

const PlayAgain = props => (
  <div className='game-done'>
  <div className='message'
    style={{ color: props.gameStatus === 'lost' ? 'red' : 'green'}}
  >
    {props.gameStatus === 'lost' ? 'Game Over' : 'Nice'}
  </div>
    <button onClick={props.onClick}>Play Again</button>
  </div>
);

const StarMatch = () => {
  const [stars, setStars] = React.useState(utils.random(1, 9));
  const [availableNums, setAvailableNums] = React.useState(utils.range(1, 9));
  const [candidateNums, setCandidateNums] = React.useState([]);
  const [secondsLeft, setSecondsLeft] = React.useState(10);

  React.useEffect(() => {
    if (secondsLeft > 0) {
      const timeId = setTimeout(() => {
        setSecondsLeft(secondsLeft - 1);
        }, 1000);
        return () => clearTimeout(timeId);
    }
  }); 
  const candidatesAreWrong = utils.sum(candidateNums) > stars;
  const gameStatus = availableNums.length === 0 
    ? 'won' 
    : secondsLeft === 0 ? 'lost' : 'active';  

  const resetGame = () => {
    setStars(utils.random(1, 9));
    setAvailableNums(utils.range(1, 9));
    setCandidateNums([]);
  }

  const numberStatus = (number) => {
    if (!availableNums.includes(number)) {
      return 'used';
    }
    if (candidateNums.includes(number)) {
      return candidatesAreWrong ? 'wrong' : 'candidate';
    }
    return 'available';
  }

  const onNumberClick = (number, currentStatus) => {
    if (currentStatus === 'used') {
      return;
    }

    const newCandidateNums =
      currentStatus === 'available'
        ? candidateNums.concat(number)
        : candidateNums.filter(cn => cn !== number);
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
  }

  return (
    <div className="game">
      <div className="help">
        Pick 1 or more numbers that sum to the number of stars
      </div>
      <div className="body">
        <div className="left">
          {gameIsDone ? (
            <PlayAgain onClick={resetGame}/>
           ) : (
            <StarsDisplay count={stars}/>
          )}
        </div>
        <div className="right"> 
          {utils.range(1, 9).map(number => 
            <PlayButton
            key={number}
            number={number}
            status={numberStatus(number)}
            onClick={onNumberClick}
            />
          )}
        </div>
      </div>
      <div className="timer">Time Remaining: {secondsLeft}</div>
    </div>
  );
};

// Color Theme
const colors = {
  available: 'lightgray',
  used: 'lightgreen',
  wrong: 'lightcoral',
  candidate: 'deepskyblue',
};

// Math science
const utils = {
  // Sum an array
  sum: arr => arr.reduce((acc, curr) => acc + curr, 0),

  // create an array of numbers between min and max (edges included)
  range: (min, max) => Array.from({ length: max - min + 1 }, (_, i) => min + i),

  // pick a random number between min and max (edges included)
  random: (min, max) => min + Math.floor(max * Math.random()),

  // Given an array of numbers and a max...
  // Pick a random sum (< max) from the set of all available sums in arr
  randomSumIn: (arr, max) => {
    const sets = [[]];
    const sums = [];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0, len = sets.length; j < len; j++) {
        const candidateSet = sets[j].concat(arr[i]);
        const candidateSum = utils.sum(candidateSet);
        if (candidateSum <= max) {
          sets.push(candidateSet);
          sums.push(candidateSum);
        }
      }
    }
    return sums[utils.random(0, sums.length)];
  },
};

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
