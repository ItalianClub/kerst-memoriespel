// Woordenlijst met Italiaanse woorden en vertalingen
const italianWords = [
  { word: "albero", translation: "Kerstboom" },
  { word: "regalo", translation: "Cadeau" },
  { word: "Babbo Natale", translation: "Kerstman" },
  { word: "panettone", translation: "Kerstbrood" },
  { word: "presepe", translation: "Kerststal" },
  { word: "stella", translation: "Ster" },
  { word: "campana", translation: "Bel" },
  { word: "neve", translation: "Sneeuw" },
  { word: "candela", translation: "Kaars" },
  { word: "angelo", translation: "Engel" }
];

let flippedCards = [];
let matchedPairs = 0;
let matchedCards = [];
let totalPairs = 0;

// Eventlisteners voor moeilijkheidsniveau
document.querySelectorAll('.difficulty-select button').forEach(button => {
  button.addEventListener('click', () => {
    const level = parseInt(button.getAttribute('data-level'));
    startGame(level);
  });
});

// Functie om het spel te starten
function startGame(level) {
  const gameBoard = document.getElementById('game-board');
  const resetButton = document.getElementById('reset-game');
  resetButton.classList.add('hidden');
  document.getElementById('reflection').classList.add('hidden');

  // Stel het aantal paren in op basis van het niveau
  totalPairs = level;

  // Genereer en schud de kaarten
  const cards = shuffle([...italianWords, ...italianWords].slice(0, level * 2));
  gameBoard.innerHTML = '';
  matchedPairs = 0;
  flippedCards = [];
  matchedCards = [];

  // Maak de kaarten
  cards.forEach(({ word, translation }) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.name = word;

    const front = document.createElement('div');
    front.classList.add('front');

    const back = document.createElement('div');
    back.classList.add('back');
    back.innerHTML = `<p>${word}</p><small>${translation}</small>`;

    card.append(front, back);
    card.addEventListener('click', () => flipCard(card));
    gameBoard.appendChild(card);
  });

  updateProgress(0);
}

// Functie om een kaart om te draaien
function flipCard(card) {
  if (flippedCards.length < 2 && !card.classList.contains('flipped')) {
    card.classList.add('flipped');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
      setTimeout(checkMatch, 800);
    }
  }
}

// Functie om te controleren of de kaarten een match zijn
function checkMatch() {
  const [card1, card2] = flippedCards;

  if (card1.dataset.name === card2.dataset.name) {
    matchedPairs++;
    matchedCards.push(card1, card2);
    flippedCards = [];
    showFeedback("Fantastico! Een match gevonden!");
    updateProgress(matchedPairs);

    if (matchedPairs === totalPairs) {
      setTimeout(() => showReflection(), 1000);
    }
  } else {
    card1.classList.remove('flipped');
    card2.classList.remove('flipped');
    flippedCards = [];
  }
}

// Toon voortgang in de voortgangsbalk
function updateProgress(matchedPairs) {
  const progressBar = document.getElementById('progress-bar');
  const progressText = document.getElementById('progress-text');
  const progress = (matchedPairs / totalPairs) * 100;

  progressBar.style.width = `${progress}%`;
  progressText.textContent = `Je hebt ${matchedPairs} van de ${totalPairs} paren gevonden!`;
}

// Toon feedback bij een correcte match
function showFeedback(message) {
  const feedback = document.createElement('div');
  feedback.textContent = message;
  feedback.className = 'feedback';
  document.body.appendChild(feedback);

  setTimeout(() => {
    feedback.remove();
  }, 2000);
}

// Toon de reflectiepagina met geleerde woorden
function showReflection() {
  const reflection = document.getElementById('reflection');
  const learnedList = document.getElementById('learned-words');
  learnedList.innerHTML = matchedCards
    .map(card => `<li>${card.dataset.name}</li>`)
    .join("");
  reflection.classList.remove('hidden');
}

// Functie om kaarten te schudden
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Functie om sneeuw te creëren
function createSnow() {
  const snowContainer = document.querySelector('.snow-container');
  for (let i = 0; i < 100; i++) {
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');
    snowflake.style.left = `${Math.random() * 100}vw`;
    snowflake.style.animationDuration = `${Math.random() * 3 + 2}s`;
    snowflake.style.opacity = Math.random();
    snowContainer.appendChild(snowflake);
  }
}

// Laad het spel bij het openen van de pagina
document.addEventListener('DOMContentLoaded', () => {
  startGame(6); // Start standaard op "Makkelijk"
  createSnow();
});
document.addEventListener('DOMContentLoaded', () => {
  startGame();
  createSnow();
});
