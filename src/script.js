// Basis JavaScript for at håndtere spillepladen
document.addEventListener('DOMContentLoaded', function() {
    // Denne funktion kan udvides med spillogik senere
    console.log('Spilleplade indlæst');
    
    // Eksempel på hvordan man kan tilføje nye brikker dynamisk
    function addNewTile(value) {
        const gameBoard = document.querySelector('.game-board');
        const emptyTile = document.querySelector('.empty');
        
        if (emptyTile) {
            emptyTile.classList.remove('empty');
            emptyTile.setAttribute('data-value', value);
            emptyTile.textContent = value;
        }
    }
    
    // Eksempel på hvordan man kan nulstille spillepladen
    function resetBoard() {
        const tiles = document.querySelectorAll('.tile');
        tiles.forEach(tile => {
            tile.className = 'tile empty';
            tile.removeAttribute('data-value');
            tile.textContent = '';
        });
        
        // Tilføj startbrikker
        addNewTile(2);
        addNewTile(2);
    }
});