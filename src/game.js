// Game.js - Highscore og reset funktionalitet

// Globale variabler
let score = 0;
let gameActive = false;

// DOM elementer
const currentScoreElement = document.getElementById('current-score');
const resetButton = document.getElementById('reset-button');
const highscoreList = document.getElementById('highscore-list');
const gameArea = document.getElementById('game-area');

// Initialisering af spillet
function initGame() {
    // Vis highscores ved opstart
    displayHighScores();
    
    // Event listener til reset-knap
    resetButton.addEventListener('click', resetGame);
    
    // Simuler spil start (i et rigtigt spil ville dette være en del af spillogikken)
    resetGame();
}

// Funktion til at starte et nyt spil
function resetGame() {
    // Nulstil score
    score = 0;
    updateScoreDisplay();
    
    // Ryd spilområdet
    gameArea.innerHTML = '<p>Spillet er startet! Dette er en placeholder for spillets indhold.</p>';
    
    // Markér spillet som aktivt
    gameActive = true;
    
    // Her ville du tilføje din spillogik
    // ...
    
    console.log('Nyt spil startet');
}

// Opdater score display
function updateScoreDisplay() {
    currentScoreElement.textContent = score;
}

// Simuler at spilleren scorer point (i et rigtigt spil ville dette være en del af spillogikken)
function addScore(points) {
    if (gameActive) {
        score += points;
        updateScoreDisplay();
    }
}

// Afslut spillet og gem highscore
function endGame() {
    if (!gameActive) return;
    
    gameActive = false;
    
    // Gem highscore hvis den er høj nok
    saveHighScore(score);
    
    // Vis opdaterede highscores
    displayHighScores();
    
    console.log('Spil afsluttet med score:', score);
}

// Gem highscore i localStorage
function saveHighScore(newScore) {
    // Hent eksisterende highscores eller opret en tom array
    let highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    
    // Tilføj den nye score
    highScores.push(newScore);
    
    // Sorter scores i faldende rækkefølge
    highScores.sort((a, b) => b - a);
    
    // Behold kun de 10 højeste scores
    highScores = highScores.slice(0, 10);
    
    // Gem tilbage i localStorage
    localStorage.setItem('highScores', JSON.stringify(highScores));
}

// Vis highscores fra localStorage
function displayHighScores() {
    // Ryd nuværende liste
    highscoreList.innerHTML = '';
    
    // Hent highscores fra localStorage
    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    
    // Vis hver score i listen
    highScores.forEach(score => {
        const li = document.createElement('li');
        li.textContent = score;
        highscoreList.appendChild(li);
    });
    
    // Vis en besked hvis der ikke er nogen highscores endnu
    if (highScores.length === 0) {
        const li = document.createElement('li');
        li.textContent = 'Ingen highscores endnu';
        highscoreList.appendChild(li);
    }
}

// Test funktioner for at demonstrere funktionaliteten
function testGameFunctionality() {
    // Simuler at spilleren scorer point
    setTimeout(() => {
        addScore(10);
        console.log('Tilføjet 10 point');
    }, 2000);
    
    setTimeout(() => {
        addScore(20);
        console.log('Tilføjet 20 point');
    }, 4000);
    
    // Simuler at spillet afsluttes efter 6 sekunder
    setTimeout(() => {
        endGame();
    }, 6000);
}

// Initialiser spillet når siden er indlæst
document.addEventListener('DOMContentLoaded', () => {
    initGame();
    
    // Kun til demonstration - fjern i et rigtigt spil
    testGameFunctionality();
});