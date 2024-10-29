let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = false;
let players = {
    X: '',
    O: ''
};

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Linhas
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Colunas
    [0, 4, 8],
    [2, 4, 6]  // Diagonais
];

const cells = document.querySelectorAll('.cell');
const currentPlayerElement = document.getElementById('currentPlayer');
const messageElement = document.getElementById('message');
const startButton = document.getElementById('startButton');
const resetButton = document.getElementById('resetButton');
const gameContainer = document.getElementById('game');

startButton.addEventListener('click', startGame);
resetButton.addEventListener('click', resetGame);
cells.forEach(cell => cell.addEventListener('click', handleCellClick));

function startGame() {
    const player1Name = document.getElementById('player1').value || 'Jogador 1';
    const player2Name = document.getElementById('player2').value || 'Jogador 2';

    players.X = player1Name;
    players.O = player2Name;

    gameActive = true;
    gameContainer.classList.remove('hidden');
    document.querySelector('.player-inputs').classList.add('hidden');
    updateCurrentPlayerDisplay();
}

function handleCellClick(event) {
    const cell = event.target;
    const cellIndex = cell.getAttribute('data-index');

    if (board[cellIndex] !== '' || !gameActive) {
        return;
    }

    board[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add('disabled');

    if (checkWin()) {
        gameActive = false;
        messageElement.textContent = `${players[currentPlayer]} venceu!`;
        highlightWinningCells();
    } else if (board.every(cell => cell !== '')) {
        gameActive = false;
        messageElement.textContent = 'Empate!';
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        updateCurrentPlayerDisplay();
    }
}

function updateCurrentPlayerDisplay() {
    currentPlayerElement.textContent = `Turno de: ${players[currentPlayer]} (${currentPlayer})`;
}

function checkWin() {
    return winningConditions.some(condition => {
        const [a, b, c] = condition;
        if (board[a] === currentPlayer && board[b] === currentPlayer && board[c] === currentPlayer) {
            condition.forEach(index => cells[index].classList.add('winner'));
            return true;
        }
        return false;
    });
}

function highlightWinningCells() {
    cells.forEach(cell => cell.classList.add('disabled'));
}

function resetGame() {
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    messageElement.textContent = '';
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('disabled', 'winner');
    });
    updateCurrentPlayerDisplay();
}
