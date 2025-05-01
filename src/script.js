document.addEventListener('DOMContentLoaded', function() {
    // Reference til spillepladen
    const gameBoard = document.querySelector('.game-board');
    
    // Opret 4x4 grid
    function createGameBoard() {
        // Ryd eksisterende indhold
        gameBoard.innerHTML = '';
        
        // Opret 16 celler (4x4 grid)
        for (let i = 0; i < 16; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.setAttribute('data-index', i);
            
            // Tilføj celle til spillepladen
            gameBoard.appendChild(cell);
        }
    }
    
    // Funktion til at opdatere score
    function updateScore(points) {
        const scoreElement = document.getElementById('score');
        const currentScore = parseInt(scoreElement.textContent);
        scoreElement.textContent = currentScore + points;
    }
    
    // Initialiser spillet
    function initGame() {
        createGameBoard();
        // Nulstil score
        document.getElementById('score').textContent = '0';
    }
    
    // Start spillet
    initGame();
});