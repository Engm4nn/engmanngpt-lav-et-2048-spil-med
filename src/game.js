// Kernelogik til at håndtere bevægelser og sammenlægning af ens brikker

class GameBoard {
  constructor(size = 4) {
    this.size = size;
    this.grid = [];
    this.initialize();
  }

  initialize() {
    // Opret et tomt grid
    this.grid = [];
    for (let i = 0; i < this.size; i++) {
      this.grid[i] = [];
      for (let j = 0; j < this.size; j++) {
        this.grid[i][j] = 0;
      }
    }
    
    // Tilføj to startbrikker
    this.addRandomTile();
    this.addRandomTile();
  }

  addRandomTile() {
    // Find alle ledige pladser
    const emptyTiles = [];
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        if (this.grid[i][j] === 0) {
          emptyTiles.push({ x: i, y: j });
        }
      }
    }

    // Hvis der er ledige pladser, tilføj en ny brik (2 eller 4)
    if (emptyTiles.length > 0) {
      const randomPosition = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
      this.grid[randomPosition.x][randomPosition.y] = Math.random() < 0.9 ? 2 : 4;
      return true;
    }
    return false;
  }

  // Flyt brikker op
  moveUp() {
    let moved = false;
    for (let j = 0; j < this.size; j++) {
      for (let i = 1; i < this.size; i++) {
        if (this.grid[i][j] !== 0) {
          let row = i;
          while (row > 0 && this.grid[row - 1][j] === 0) {
            this.grid[row - 1][j] = this.grid[row][j];
            this.grid[row][j] = 0;
            row--;
            moved = true;
          }
          if (row > 0 && this.grid[row - 1][j] === this.grid[row][j]) {
            this.grid[row - 1][j] *= 2;
            this.grid[row][j] = 0;
            moved = true;
          }
        }
      }
    }
    return moved;
  }

  // Flyt brikker ned
  moveDown() {
    let moved = false;
    for (let j = 0; j < this.size; j++) {
      for (let i = this.size - 2; i >= 0; i--) {
        if (this.grid[i][j] !== 0) {
          let row = i;
          while (row < this.size - 1 && this.grid[row + 1][j] === 0) {
            this.grid[row + 1][j] = this.grid[row][j];
            this.grid[row][j] = 0;
            row++;
            moved = true;
          }
          if (row < this.size - 1 && this.grid[row + 1][j] === this.grid[row][j]) {
            this.grid[row + 1][j] *= 2;
            this.grid[row][j] = 0;
            moved = true;
          }
        }
      }
    }
    return moved;
  }

  // Flyt brikker til venstre
  moveLeft() {
    let moved = false;
    for (let i = 0; i < this.size; i++) {
      for (let j = 1; j < this.size; j++) {
        if (this.grid[i][j] !== 0) {
          let col = j;
          while (col > 0 && this.grid[i][col - 1] === 0) {
            this.grid[i][col - 1] = this.grid[i][col];
            this.grid[i][col] = 0;
            col--;
            moved = true;
          }
          if (col > 0 && this.grid[i][col - 1] === this.grid[i][col]) {
            this.grid[i][col - 1] *= 2;
            this.grid[i][col] = 0;
            moved = true;
          }
        }
      }
    }
    return moved;
  }

  // Flyt brikker til højre
  moveRight() {
    let moved = false;
    for (let i = 0; i < this.size; i++) {
      for (let j = this.size - 2; j >= 0; j--) {
        if (this.grid[i][j] !== 0) {
          let col = j;
          while (col < this.size - 1 && this.grid[i][col + 1] === 0) {
            this.grid[i][col + 1] = this.grid[i][col];
            this.grid[i][col] = 0;
            col++;
            moved = true;
          }
          if (col < this.size - 1 && this.grid[i][col + 1] === this.grid[i][col]) {
            this.grid[i][col + 1] *= 2;
            this.grid[i][col] = 0;
            moved = true;
          }
        }
      }
    }
    return moved;
  }

  // Håndter bevægelse baseret på retning
  move(direction) {
    let moved = false;
    switch (direction) {
      case 'up':
        moved = this.moveUp();
        break;
      case 'down':
        moved = this.moveDown();
        break;
      case 'left':
        moved = this.moveLeft();
        break;
      case 'right':
        moved = this.moveRight();
        break;
    }

    // Hvis der skete en bevægelse, tilføj en ny brik
    if (moved) {
      this.addRandomTile();
    }

    return moved;
  }

  isGameOver() {
    // Tjek om der er ledige pladser
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        if (this.grid[i][j] === 0) {
          return false;
        }
      }
    }

    // Tjek om der er mulige sammenlægninger
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        const current = this.grid[i][j];
        // Tjek nabo til højre
        if (j < this.size - 1 && current === this.grid[i][j + 1]) {
          return false;
        }
        // Tjek nabo nedenunder
        if (i < this.size - 1 && current === this.grid[i + 1][j]) {
          return false;
        }
      }
    }

    return true; // Ingen ledige pladser og ingen mulige sammenlægninger
  }
}

// Eksporter klassen for at kunne bruge den i andre filer
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { GameBoard };
}