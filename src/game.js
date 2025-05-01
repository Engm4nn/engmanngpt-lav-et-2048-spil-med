// Spilkonstanter og variabler
const GRID_SIZE = 4;
const CELL_COUNT = GRID_SIZE * GRID_SIZE;
let grid = [];

// DOM-elementer
const gridContainer = document.getElementById('grid-container');
const newGameButton = document.getElementById('new-game-button');

// Initialiser spillet når siden indlæses
document.addEventListener('DOMContentLoaded', () => {
    setupGame();
    newGameButton.addEventListener('click', setupGame);
});

/**
 * Opsætter spillet ved at initialisere grid og UI
 */
function setupGame() {
    // Nulstil grid
    grid = [];
    
    // Initialiser grid med tomme celler
    for (let i = 0; i < GRID_SIZE; i++) {
        grid[i] = Array(GRID_SIZE).fill(0);
    }
    
    // Nulstil UI
    gridContainer.innerHTML = '';
    
    // Opret grid-celler i UI
    for (let i = 0; i < CELL_COUNT; i++) {
        const cell = document.createElement('div');
        cell.classList.add('grid-cell');
        gridContainer.appendChild(cell);
    }
    
    // Tilføj to tilfældige brikker for at starte spillet
    addRandomTile();
    addRandomTile();
    
    // Opdater UI for at vise de nye brikker
    updateGridUI();
}

/**
 * Tilføjer en tilfældig brik (2 eller 4) på en ledig plads i grid
 */
function addRandomTile() {
    // Find alle ledige pladser (celler med værdi 0)
    const emptyCells = [];
    
    for (let row = 0; row < GRID_SIZE; row++) {
        for (let col = 0; col < GRID_SIZE; col++) {
            if (grid[row][col] === 0) {
                emptyCells.push({ row, col });
            }
        }
    }
    
    // Hvis der ikke er ledige pladser, gør ingenting
    if (emptyCells.length === 0) return;
    
    // Vælg en tilfældig ledig plads
    const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    
    // Generer enten 2 (90% chance) eller 4 (10% chance)
    const value = Math.random() < 0.9 ? 2 : 4;
    
    // Placer den nye brik på den valgte plads
    grid[randomCell.row][randomCell.col] = value;
}

/**
 * Opdaterer UI for at afspejle det aktuelle grid
 */
function updateGridUI() {
    const cells = document.querySelectorAll('.grid-cell');
    
    for (let row = 0; row < GRID_SIZE; row++) {
        for (let col = 0; col < GRID_SIZE; col++) {
            const index = row * GRID_SIZE + col;
            const value = grid[row][col];
            
            cells[index].textContent = value !== 0 ? value : '';
            
            // Nulstil klasser
            cells[index].className = 'grid-cell';
            
            // Tilføj klasse baseret på værdi
            if (value !== 0) {
                cells[index].classList.add(`tile-${value}`);
            }
        }
    }
}