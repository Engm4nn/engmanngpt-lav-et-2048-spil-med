// Antager at vi har en eksisterende spillogik og et board-array
// Dette er et eksempel på hvordan gameState.js kan integreres i hovedspillet

// Importer gameState funktioner (hvis du bruger moduler)
// const { isGameWon, isGameLost, checkGameState } = require('./gameState.js');

// Eksempel på hvordan gameState kan integreres i spillets hovedlogik
function handleMove(direction) {
  // Antager at disse funktioner eksisterer i den eksisterende kode
  let moved = false;
  
  switch(direction) {
    case 'up':
      moved = slideUp();
      break;
    case 'down':
      moved = slideDown();
      break;
    case 'left':
      moved = slideLeft();
      break;
    case 'right':
      moved = slideRight();
      break;
  }
  
  // Hvis der blev foretaget et gyldigt træk
  if (moved) {
    // Tilføj en ny 2 eller 4 brik til brættet
    addNewTile();
    
    // Kontroller spillets tilstand efter trækket
    const gameState = checkGameState(board);
    
    // Håndter spillets tilstand
    if (gameState.status !== 'ongoing') {
      displayGameResult(gameState);
    }
  }
}

/**
 * Viser spillets resultat til brugeren
 * @param {Object} gameState - Objekt med spillets tilstand
 */
function displayGameResult(gameState) {
  // Her kan du implementere hvordan resultatet skal vises
  // F.eks. ved at vise en modal dialog eller ændre UI
  
  if (gameState.status === 'won') {
    // Vis vinder-besked
    alert(gameState.message);
    // Eventuelt tilbyd at fortsætte spillet for at opnå højere score
  } else if (gameState.status === 'lost') {
    // Vis taber-besked
    alert(gameState.message);
    // Eventuelt tilbyd at starte et nyt spil
  }
}

// Lyt efter tastetryk for at styre spillet
document.addEventListener('keydown', function(event) {
  switch(event.key) {
    case 'ArrowUp':
      handleMove('up');
      break;
    case 'ArrowDown':
      handleMove('down');
      break;
    case 'ArrowLeft':
      handleMove('left');
      break;
    case 'ArrowRight':
      handleMove('right');
      break;
  }
});