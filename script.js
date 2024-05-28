const cells = document.querySelectorAll('.cell');
let currentPlayer = 'X';
let gameActive = false;
let mode;
let player1 = 'X';
let player2 = 'O';

document.getElementById('startBtn').addEventListener('click', () => {
  document.getElementById('start').style.display = 'none';
  document.getElementById('game').style.display = 'block';
  document.getElementById('mode-selection').style.display = 'block';
});

document.getElementById('onePlayerBtn').addEventListener('click', () => {
  mode = '1';
  gameActive = true;
  document.getElementById('mode-selection').style.display = 'none';
  document.getElementById('player-selection').style.display = 'none';
  document.getElementById('board').style.display = 'block';
  document.getElementById('restartBtn').style.display = 'inline-block';
  document.getElementById('backBtn').style.display = 'inline-block';
});

document.getElementById('twoPlayerBtn').addEventListener('click', () => {
  mode = '2';
  gameActive = true;
  document.getElementById('mode-selection').style.display = 'none';
  document.getElementById('player-selection').style.display = 'none';
  document.getElementById('board').style.display = 'block';
  document.getElementById('restartBtn').style.display = 'inline-block';
  document.getElementById('backBtn').style.display = 'inline-block';
});

cells.forEach(cell => {
  cell.addEventListener('click', cellClick);
});

function cellClick(e) {
  if (!gameActive) return;

  const cell = e.target;

  if (cell.textContent !== '' || !gameActive) return;

  cell.textContent = currentPlayer;
  checkResult();

  currentPlayer = currentPlayer === player1 ? player2 : player1;

  if (mode === '1' && gameActive && currentPlayer === player2) {
    // Computer move
    const bestMove = findBestMove();
    cells[bestMove].textContent = currentPlayer;
    checkResult();
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  }
}

function findBestMove() {
  let bestScore = -Infinity;
  let move;
  for (let i = 0; i < cells.length; i++) {
    if (cells[i].textContent === '') {
      cells[i].textContent = player2;
      let score = minimax(cells, 0, false);
      cells[i].textContent = '';
      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }
  return move;
}

function minimax(board, depth, isMaximizing) {
  let result = checkWinning(board);
  if (result !== null) {
    if (result === 'O') {
      return 10 - depth;
    } else if (result === 'X') {
      return depth - 10;
    } else {
      return 0;
    }
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i].textContent === '') {
        board[i].textContent = player2;
        let score = minimax(board, depth + 1, false);
        board[i].textContent = '';
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i].textContent === '') {
        board[i].textContent = player1;
        let score = minimax(board, depth + 1, true);
        board[i].textContent = '';
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
}

function checkWinning(board) {
  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let condition of winningConditions) {
    const [a, b, c] = condition;
    if (board[a].textContent && board[a].textContent === board[b].textContent && board[a].textContent === board[c].textContent) {
      return board[a].textContent;
    }
  }

  return null;
}

function checkResult() {
  const result = checkWinning(cells);
  if (result) {
    displayMessage(`${result} wins!`);
    gameActive = false;
  } else if ([...cells].every(cell => cell.textContent !== '')) {
    displayMessage("It's a draw!");
    gameActive = false;
  }
}

function displayMessage(message) {
  document.getElementById('message').textContent = message;
}

function restartGame() {
  cells.forEach(cell => {
    cell.textContent = '';
  });
  document.getElementById('message').textContent = '';
  currentPlayer = player1 || 'X';
  gameActive = true;
}

document.getElementById('restartBtn').addEventListener('click', restartGame);

document.getElementById('backBtn').addEventListener('click', () => {
  document.getElementById('mode-selection').style.display = 'block';
  document.getElementById('player-selection').style.display = 'none';
  document.getElementById('board').style.display = 'none';
  document.getElementById('restartBtn').style.display = 'none';
  document.getElementById('backBtn').style.display = 'none';
  document.getElementById('message').textContent = '';
  currentPlayer = 'X';
  gameActive = false;
});
document.getElementById('backToStartBtn').addEventListener('click', () => {
  document.getElementById('start').style.display = 'block';
  document.getElementById('game').style.display = 'none';
  document.getElementById('mode-selection').style.display = 'none';
  document.getElementById('player-selection').style.display = 'none';
  document.getElementById('board').style.display = 'none';
  document.getElementById('restartBtn').style.display = 'none';
  document.getElementById('backBtn').style.display = 'none';
  document.getElementById('message').textContent = '';
  currentPlayer = 'X';
  gameActive = false;
});
