'use strict';

// SELECTİNG ELEMENTS
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;
// starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

const init = function () {
  diceEl.classList.add('hidden');

  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  current0El.textContent = 0;
  score1El.textContent = 0;
  current1El.textContent = 0;

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();
// SWİTCH PLAYER FUNCTİON
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;

  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');

  currentScore = 0;
};
// ROLLİNG The Dice

btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1- Generate a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    // 2- Display dice

    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3- Chech for rolled 1 if true swith to next player
    if (dice !== 1) {
      // Add dice to current score
      currentScore = currentScore + dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      document.getElementById(`current--${activePlayer}`).textContent = 0;
      activePlayer = activePlayer === 0 ? 1 : 0; //Eğer aktif player 0 ise 1 yap eğer 0 değil ise 1 ise 0 yap

      player0El.classList.toggle('player--active');
      player1El.classList.toggle('player--active');

      currentScore = 0;
      // Switch to next player
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active players score

    scores[activePlayer] += currentScore;
    //score[1]=scores[1]+currentScore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2. Check score is >=100
    if (scores[activePlayer] >= 100) {
      //finish the game
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden'); // Zarı iptal eder
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', function () {
  init();
});
