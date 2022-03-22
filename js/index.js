const PLAYER_X_CLASS = 'x';
const PLAYER_O_CLASS = 'o';
const COMBINATIONS = [
   [0, 1, 2],
   [3, 4, 5],
   [6, 7, 8],
   [0, 3, 6],
   [1, 4, 7],
   [2, 5, 8],
   [0, 4, 8],
   [2, 4, 6],
];
const RANDOM_PLAYER = Math.random() > 0.5 ? true : false;;

const board = document.getElementById('board');
const cells = document.querySelectorAll('[data-cell]');
const restartButton = document.getElementById('restartButton');
const winningContainer = document.querySelector ('[data-winning-container]');
const winningMessage = document.querySelector('[data-winning-message-text]');

let playerOTurn;

startGame();

restartButton.addEventListener('click', startGame);

function startGame() {
   playerOTurn = RANDOM_PLAYER;

   cells.forEach(cell => {
      cell.classList.remove(PLAYER_X_CLASS);
      cell.classList.remove(PLAYER_O_CLASS);
      cell.removeEventListener('click', handleClick);
      cell.addEventListener('click', handleClick, { once: true });
   });

   setBoardHoverClass();
   winningContainer.classList.remove('show');
}

function endGame(draw) {
   if (draw) {
      winningMessage.textContent = 'No one won! 👵🏻';
   } else {
      
      winningMessage.textContent = `${playerOTurn ? `PLAYER O WIN!` : `PLAYER X WIN!`}`;
   }

   winningContainer.classList.add('show');
}

function handleClick(event) {
   const cell = event.target;
   const currentClass = playerOTurn ? PLAYER_O_CLASS : PLAYER_X_CLASS;

   playerMark(cell, currentClass);
   
   if (checkPlayerWin(currentClass)) {
      endGame(false);
   } else if(isDraw()) {
      endGame(true);
   } else {
      swapPlayer();
      setBoardHoverClass();
   }
}

function  isDraw() {
   return [...cells].every(cell => {
      return cell.classList.contains(PLAYER_X_CLASS) || cell.classList.contains(PLAYER_O_CLASS);
   });
}

function playerMark(cell, currentClass) {
   cell.classList.add(currentClass);
}

function swapPlayer() {
   playerOTurn = !playerOTurn;
}

function setBoardHoverClass() {
   board.classList.remove(PLAYER_X_CLASS);
   board.classList.remove(PLAYER_O_CLASS);

   if (playerOTurn) {
      board.classList.add(PLAYER_O_CLASS);
   } else {
      board.classList.add(PLAYER_X_CLASS);
   }
}

function checkPlayerWin(currentClass) {
   return COMBINATIONS.some(combination => {
      return combination.every(index => {
         return cells[index].classList.contains(currentClass);
      });
   });
}