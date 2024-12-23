// Woordenlijsten per niveau
const easyWords = [
  { word: "albero", translation: "Kerstboom" },
  { word: "regalo", translation: "Cadeau" },
  { word: "stella", translation: "Ster" },
  { word: "neve", translation: "Sneeuw" },
  { word: "candela", translation: "Kaars" },
  { word: "angelo", translation: "Engel" }
];

const mediumWords = [
  { word: "Babbo Natale", translation: "Kerstman" },
  { word: "panettone", translation: "Kerstbrood" },
  { word: "campana", translation: "Bel" },
  { word: "presepe", translation: "Kerststal" },
  { word: "addobbi", translation: "Versieringen" },
  { word: "pupazzo di neve", translation: "Sneeuwpop" }
];

const hardWords = [
  { word: "cenone", translation: "Kerstmaal" },
  { word: "vigilia di Natale", translation: "Kerstavond" },
  { word: "auguri di Natale", translation: "Kerstwensen" },
  { word: "festività", translation: "Feestdagen" },
  { word: "slitta", translation: "Slede" },
  { word: "renna", translation: "Rendier" }
];

// Selecteer de juiste woordenlijst op basis van het niveau
function getWords(level) {
  if (level <= 6) return easyWords;
  if (level <= 10) return mediumWords;
  return hardWords;
}

let flippedCards = [];
let matchedPairs = 0;

function startGame(level) {
  const gameBoard = document.getElementById("game-board");
  const resetButton = document.getElementById("reset-game");
  resetButton.classList.add("hidden");
  document.getElementById("reflection").classList.add("hidden");

  // Stel de woordenlijst in op basis van het niveau
  const words = getWords(level);
  const cards = shuffle([...words, ...words].slice(0, level));
  gameBoard.innerHTML = "";
  matchedPairs = 0;
  flippedCards = [];

  cards.forEach(({ word, translation }) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.name = word;

    const front = document.createElement("div");
    front.classList.add("front");

    const back = document.createElement("div");
    back.classList.add("back");
    back.innerHTML = `<p>${word}</p><small>${translation}</small>`;

    card.append(front, back);
    card.addEventListener("click", () => flipCard(card));
    gameBoard.appendChild(card);
  });

  updateProgress(0, level / 2);
}

function flipCard(card) {
  if (flippedCards.length < 2 && !card.classList.contains("flipped")) {
    card.classList.add("flipped");
    flippedCards.push(card);

    if (flippedCards.length === 2) {
      setTimeout(checkMatch, 800);
    }
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;

  if (card1.dataset.name === card2.dataset.name) {
    matchedPairs++;
    flippedCards = [];
    updateProgress(matchedPairs, easyWords.length);

    if (matchedPairs === easyWords.length) {
      setTimeout(() => showReflection(), 1000);
    }
  } else {
    card1.classList.remove("flipped");
    card2.classList.remove("flipped");
    flippedCards = [];
  }
}

function updateProgress(matchedPairs, totalPairs) {
  const progressBar = document.getElementById("progress-bar");
  const progressText = document.getElementById("progress-text");
  const progress = (matchedPairs / totalPairs) * 100;

  progressBar.style.width = `${progress}%`;
  progressText.textContent = `Je hebt ${matchedPairs} van de ${totalPairs} paren gevonden!`;
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function showReflection() {
  const reflection = document.getElementById("reflection");
  const learnedList = document.getElementById("learned-words");
  learnedList.innerHTML = matchedPairs
    .map(card => `<li>${card.dataset.name}</li>`)
    .join("");
  reflection.classList.remove("hidden");
}

document.querySelectorAll(".difficulty-select button").forEach(button => {
  button.addEventListener("click", () => {
    const level = parseInt(button.dataset.level);
    startGame(level);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  startGame(6);
});
