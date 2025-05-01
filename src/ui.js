// UI-håndtering for spillet

document.addEventListener('DOMContentLoaded', () => {
  const gameBoard = new GameBoard(4);
  const gridElement = document.getElementById('game-grid');
  const restartButton = document.getElementById('restart-button');
  
  // Opret UI-grid
  function createGrid() {
    gridElement.innerHTML = '';
    for (let i = 0; i < gameBoard.size; i++) {
      for (let j = 0; j < gameBoard.size; j++) {
        const tile = document.createElement('div');
        tile.classList.add('tile');
        tile.dataset.row = i;
        tile.dataset.col = j;
        gridElement.appendChild(tile);
      }
    }
  }
  
  // Opdater UI baseret på spilstatus
  function updateGrid() {
    const tiles = gridElement.querySelectorAll('.tile');
    tiles.forEach(tile => {
      const row = parseInt(tile.dataset.row);
      const col = parseInt(tile.dataset.col);
      const value = gameBoard.grid[row][col];
      
      // Fjern tidligere værdi-klasser
      tile.className = 'tile';
      
      if (value !== 0) {
        tile.classList.add(`tile-${value}`);
        tile.textContent = value;
      } else {
        tile.textContent = '';
      }
    });
    
    // Tjek om spillet er slut
    if (gameBoard.isGameOver()) {
      alert('Spillet er slut!');
    }
  }
  
  // Håndter tastatur-input
  function handleKeyPress(e) {
    let moved = false;
    
    switch (e.key) {
      case 'ArrowUp':
        moved = gameBoard.move('up');
        break;
      case 'ArrowDown':
        moved = gameBoard.move('down');
        break;
      case 'ArrowLeft':
        moved = gameBoard.move('left');
        break;
      case 'ArrowRight':
        moved = gameBoard.move('right');
        break;
      default:
        return; // Ignorer andre taster
    }
    
    if (moved) {
      updateGrid();
    }
  }
  
  // Håndter touch-input for mobile enheder
  let touchStartX = 0;
  let touchStartY = 0;
  
  function handleTouchStart(e) {
    touchStartX = e.touches.clientX;
    touchStartY = e.touches.clientY;
  }
  
  function handleTouchEnd(e) {
    if (!touchStartX || !touchStartY) return;
    
    const touchEndX = e.changedTouches.clientX;
    const touchEndY = e.changedTouches.clientY;
    
    const diffX = touchEndX - touchStartX;
    const diffY = touchEndY - touchStartY;
    
    let moved = false;
    
    // Bestem retning baseret på den største bevægelse
    if (Math.abs(diffX) > Math.abs(diffY)) {
      // Vandret swipe
      if (diffX > 0) {
        moved = gameBoard.move('right');
      } else {
        moved = gameBoard.move('left');
      }
    } else {
      // Lodret swipe
      if (diffY > 0) {
        moved = gameBoard.move('down');
      } else {
        moved = gameBoard.move('up');
      }
    }
    
    if (moved) {
      updateGrid();
    }
    
    // Nulstil touch-koordinater
    touchStartX = 0;
    touchStartY = 0;
  }
  
  // Genstart spillet
  function restartGame() {
    gameBoard.initialize();
    updateGrid();
  }
  
  // Tilføj event listeners
  document.addEventListener('keydown', handleKeyPress);
  document.addEventListener('touchstart', handleTouchStart, false);
  document.addEventListener('touchend', handleTouchEnd, false);
  restartButton.addEventListener('click', restartGame);
  
  // Initialiser spillet
  createGrid();
  updateGrid();
});