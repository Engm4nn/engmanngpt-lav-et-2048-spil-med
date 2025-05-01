/**
 * Funktion til at kontrollere om spillet er vundet (2048 brik opnået)
 * @param {Array} board - 2D array der repræsenterer spillepladen
 * @returns {boolean} - true hvis spillet er vundet
 */
function isGameWon(board) {
  // Gennemgå alle celler på brættet
  for (let r = 0; r < board.length; r++) {
    for (let c = 0; c < board[r].length; c++) {
      // Hvis en celle indeholder værdien 2048, er spillet vundet
      if (board[r][c] === 2048) {
        return true;
      }
    }
  }
  return false;
}

/**
 * Funktion til at kontrollere om der er flere mulige træk
 * @param {Array} board - 2D array der repræsenterer spillepladen
 * @returns {boolean} - true hvis der ikke er flere mulige træk (spillet er tabt)
 */
function isGameLost(board) {
  // Kontroller om der er tomme celler
  if (hasEmptyTile(board)) {
    return false; // Spillet er ikke tabt hvis der er tomme celler
  }
  
  // Kontroller om der er mulige sammenlægninger vandret
  for (let r = 0; r < board.length; r++) {
    for (let c = 0; c < board[r].length - 1; c++) {
      if (board[r][c] === board[r][c + 1]) {
        return false; // Mulig sammenlægning fundet
      }
    }
  }
  
  // Kontroller om der er mulige sammenlægninger lodret
  for (let c = 0; c < board.length; c++) {
    for (let r = 0; r < board.length - 1; r++) {
      if (board[r][c] === board[r + 1][c]) {
        return false; // Mulig sammenlægning fundet
      }
    }
  }
  
  // Ingen tomme celler og ingen mulige sammenlægninger
  return true;
}

/**
 * Hjælpefunktion til at kontrollere om der er tomme celler på brættet
 * @param {Array} board - 2D array der repræsenterer spillepladen
 * @returns {boolean} - true hvis der er mindst én tom celle
 */
function hasEmptyTile(board) {
  for (let r = 0; r < board.length; r++) {
    for (let c = 0; c < board[r].length; c++) {
      if (board[r][c] === 0) {
        return true; // Tom celle fundet
      }
    }
  }
  return false;
}

/**
 * Funktion til at kontrollere spillets tilstand efter hvert træk
 * @param {Array} board - 2D array der repræsenterer spillepladen
 * @returns {Object} - Objekt med spillets tilstand (won, lost, ongoing)
 */
function checkGameState(board) {
  if (isGameWon(board)) {
    return { status: 'won', message: 'Tillykke! Du har nået 2048!' };
  } else if (isGameLost(board)) {
    return { status: 'lost', message: 'Spillet er slut! Ingen flere træk mulige.' };
  } else {
    return { status: 'ongoing', message: '' };
  }
}

// Eksporter funktionerne så de kan bruges i hovedspillet
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { isGameWon, isGameLost, hasEmptyTile, checkGameState };
}