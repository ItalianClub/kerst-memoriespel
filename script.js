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
let difficultyLevel = 6;

document.querySelectorAll('.difficulty-select button').forEach(button => {
  button.addEventListener('click', () => {
    difficultyLevel = parseInt(button.dataset.level);
    startGame();
  });
});

function startGame() {
  const board = document.getElementById('game-board');
  board.innerHTML = '';
  const cards = shuffle([...italianWords, ...italianWords].slice(0, difficultyLevel * 2));
  matchedPairs = 0;

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
    board.appendChild(card);
  });
}

function flipCard(card) {
  if (flippedCards.length < 2 && !card.classList.contains('flipped')) {
    card.classList.add('flipped');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
      setTimeout(checkMatch, 1000);
    }
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;

  if (card1.dataset.name === card2.dataset.name) {
    matchedPairs++;
    if (matchedPairs === difficultyLevel) {
      alert("🎉 Je hebt gewonnen!");
    }
  } else {
    card1.classList.remove('flipped');
    card2.classList.remove('flipped');
  }
  flippedCards = [];
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

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

document.addEventListener('DOMContentLoaded', () => {
  startGame();
  createSnow();
});
