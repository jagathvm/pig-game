'use strict';

// Selecting elements from the DOM
const player1El = document.querySelector('.player--0');
const player2El = document.querySelector('.player--1');
const score1El = document.getElementById('score--0');
const score2El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');

// Variables to keep track of game state
let currentScore, activePlayer, playing, scores;

// Initialization function
const init = function () {
  // Set initial scores and state
  score1El.textContent = 0;
  score2El.textContent = 0;
  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];
  playing = true;

  // Hide the dice
  diceEl.classList.add('hidden');

  // Set player 1 as active and remove winner styles
  document.querySelector('.player--0').classList.add('player--active');
  document.querySelector('.player--0').classList.remove('player--winner');
  document.querySelector('.player--1').classList.remove('player--active');
  document.querySelector('.player--1').classList.remove('player--winner');
};

// Function to switch players
const switchPlayer = function () {
  // Update the current player's score on the UI
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];

  // Reset current score to 0 and toggle active player
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.toggle('player--active');

  // Switch to the other player
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.toggle('player--active');
};

// Initial setup
init();

// Event listener for the roll dice button
btnRoll.addEventListener('click', function () {
  // Check if the game is still ongoing
  if (playing) {
    // Generate a random dice roll
    const dice = Math.trunc(Math.random() * 6 + 1);

    // Display the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `./images/dice-${dice}.png`;

    // Check if the dice roll is not 1
    if (dice !== 1) {
      // Add the dice roll to the current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    }
    // Switch to the other player if the dice roll is 1
    else switchPlayer();
  }
});

// Event listener for the hold button
btnHold.addEventListener('click', function () {
  // Check if the game is still ongoing
  if (playing) {
    // Add the current score to the active player's total score
    scores[activePlayer] += currentScore;

    // Reset current score on the UI
    document.querySelector(`#current--${activePlayer}`).textContent = 0;

    // Update total score on the UI
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];

    // Check if the active player has won
    if (scores[activePlayer] >= 100) {
      // Add winner styles and end the game
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      diceEl.classList.add('hidden');
      playing = false;
    }
    // Switch to the other player if no winner yet
    else switchPlayer();
  }
});

// Event listener for the new game button
btnNew.addEventListener('click', init);
