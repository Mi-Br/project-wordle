import React from 'react';

import { sample } from '../../utils';
import { WORDS } from '../../data';
import {checkGuess} from '../../game-helpers';
import GuessInput from '../App/GuessInput';
// Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

function Game() {

const [attempts, setAttemts] = React.useState(5);
const [guesses, setGuesses]= React.useState([]);
const [gamePlaying, setGamePlaying] = React.useState(true);
const [won, setWon] = React.useState(false);
// reset game state

// handle word submission

// check if user won

function checkWinner(guess){
  const correct = guess.filter(e=>e.status === 'correct')
  if (correct.length === 5) {
    setGamePlaying(false);
    setWon(true);
  } else {
    const remainingAttempts = attempts - 1;
    setAttemts(remainingAttempts);
    if (remainingAttempts === 0) {
      setGamePlaying(false);
      setWon(false);
    }
  }
}


function onWordSubmit(guess) {
  const nextGuess = checkGuess(guess, answer)
  checkWinner(nextGuess)
  setGuesses([...guesses, nextGuess])
  }

function restartGame() {
  setAttemts(5);
  setGuesses([]);
  setGamePlaying(true);
  setWon(false);
}

return (<>
  <div class="wrapper">
    <header>
      <div class="side"></div>
      <h1>Word Game</h1>
      <div class="side">
      </div>
    </header>

    <div class="game-wrapper">
      { (<div class="guess-results">
        {guesses.map((guess, index)=>(
            <p key={index} class="guess">
              {guess.map((letter, index)=>(
                <span key={index} class={`cell ${letter.status}`}>{letter.letter}</span>
              ))}
            </p>
        ))}
      </div>)}

      {gamePlaying && <GuessInput onWordSubmit={onWordSubmit}/>}

     {!gamePlaying && won &&  <div class="happy banner">
        <p>
          <strong>Congratulations!</strong> Got it in
          <strong>{attempts} guesses</strong>.
        </p>
      </div>}
       {!gamePlaying && !won &&  <div class="sad banner">
        <p>
          <strong>Sorry to see you loose !</strong> The answer was {answer}
        </p>
      </div>}
      {!gamePlaying &&
      <div>
        <button onClick={()=>restartGame()}>Try new round</button>
      </div>}
    </div>
 </div>
  </>)
}

export default Game;
