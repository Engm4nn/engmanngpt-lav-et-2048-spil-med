// Funktion til at tilføje animationsklasser til brikker
function animateTile(tile, moveDirection, isMerged) {
  // Fjern eventuelle eksisterende animationsklasser
  tile.classList.remove('slide-left', 'slide-right', 'slide-up', 'slide-down', 'merge', 'new');
  
  // Tilføj retningsklasse baseret på bevægelsesretning
  if (moveDirection) {
    tile.classList.add('slide-' + moveDirection);
  }
  
  // Tilføj merge-klasse hvis brikken er blevet sammenlagt
  if (isMerged) {
    tile.classList.add('merge');
  }
  
  // Lyt efter afslutning af animation
  tile.addEventListener('animationend', function() {
    // Fjern animationsklasser når animationen er færdig
    tile.classList.remove('slide-left', 'slide-right', 'slide-up', 'slide-down', 'merge');
  }, { once: true });
}

// Funktion til at animere en ny brik der dukker op
function animateNewTile(tile) {
  tile.classList.add('new');
  
  tile.addEventListener('animationend', function() {
    tile.classList.remove('new');
  }, { once: true });
}

// Eksempel på brug i spillogikken (skal integreres med eksisterende kode)
// moveTile(tile, direction) - Kaldes når en brik flyttes
function moveTile(tile, direction) {
  // Eksisterende bevægelseslogik her...
  
  // Tilføj animation
  animateTile(tile, direction, false);
}

// mergeTiles(tile1, tile2) - Kaldes når to brikker sammenlægges
function mergeTiles(tile1, tile2) {
  // Eksisterende sammenlægningslogik her...
  
  // Tilføj animation til den resulterende brik
  animateTile(tile2, null, true);
}

// createNewTile(position) - Kaldes når en ny brik oprettes
function createNewTile(position) {
  // Eksisterende logik til at oprette en ny brik...
  const newTile = document.createElement('div');
  newTile.className = 'tile';
  // Sæt position og værdi...
  
  // Tilføj animation
  animateNewTile(newTile);
  
  return newTile;
}