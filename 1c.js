const cells = document.querySelectorAll('.cell');
const startButton = document.getElementById('start-button');
const restartButton = document.getElementById('restart-button');
const winnerPopup = document.getElementById('winner-popup');
const winnerText = document.getElementById('winner-text');
const closePopupButton = document.getElementById('close-popup');

let currentPlayer = 'X';
let board = Array(9).fill(null);
let gameActive = false;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function handleCellClick(event) {
  const cell = event.target;
  const index = cell.getAttribute('data-index');

  if (!gameActive || board[index] !== null || currentPlayer === 'O') return;

  board[index] = currentPlayer;
  cell.textContent = currentPlayer;

  if (checkWin()) {
    showWinner(`${currentPlayer} wins!`);
    return;
  }

  if (board.every(cell => cell !== null)) {
    showWinner("It's a draw!");
    return;
  }

  currentPlayer = 'O';
  setTimeout(computerMove, 500); // Small delay for realism
}

function computerMove() {
  if (!gameActive) return;

  const availableCells = board
    .map((cell, index) => (cell === null ? index : null))
    .filter(index => index !== null);

  const randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
  board[randomIndex] = 'O';

  const cell = document.querySelector(`.cell[data-index="${randomIndex}"]`);
  cell.textContent = 'O';

  if (checkWin()) {
    showWinner('O wins!');
    return;
  }

  if (board.every(cell => cell !== null)) {
    showWinner("It's a draw!");
    return;
  }

  currentPlayer = 'X';
}

function checkWin() {
  return winningCombinations.some(combination =>
    combination.every(index => board[index] === currentPlayer)
  );
}

function showWinner(message) {
  winnerText.textContent = message;
  winnerPopup.classList.remove('hidden');
  gameActive = false;
}

function resetGame() {
  board.fill(null);
  cells.forEach(cell => (cell.textContent = ''));
  currentPlayer = 'X';
  gameActive = true;
  winnerPopup.classList.add('hidden');
}

startButton.addEventListener('click', () => {
  resetGame();
  restartButton.disabled = false;
});

restartButton.addEventListener('click', resetGame);

closePopupButton.addEventListener('click', () => {
  winnerPopup.classList.add('hidden');
});

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
