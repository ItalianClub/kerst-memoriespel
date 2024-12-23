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
let matchedCards = [];
let matchedPairs = 0;

function startGame() {
  const gameBoard = document.getElementById("game-board");
  const resetButton = document.getElementById("reset-game");
  resetButton.classList.add("hidden");
  const cards = shuffle([...italianWords, ...italianWords]);
  gameBoard.innerHTML = "";
  matchedCards = [];
  matchedPairs = 0;

  cards.forEach(({ word, translation }) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.word = word;

    const front = document.createElement("div");
    front.classList.add("front");

    const back = document.createElement("div");
    back.classList.add("back");
    back.innerHTML = `<p>${word}</p><small>${translation}</small>`;

    card.append(front, back);
    card.addEventListener("click", () => flipCard(card));
    gameBoard.appendChild(card);
  });

  updateProgress(0);
}

function flipCard(card) {
  if (flippedCards.length < 2 && !card.classList.contains("flipped")) {
    card.classList.add("flipped");
    flippedCards.push(card);

    if (flippedCards.length === 2) {
      setTimeout(checkMatch, 1000);
    }
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;

  if (card1.dataset.word === card2.dataset.word) {
    matchedCards.push(card1, card2);
    matchedPairs++;
    updateProgress(matchedPairs / italianWords.length);
  } else {
    card1.classList.remove("flipped");
    card2.classList.remove("flipped");
  }

  flippedCards = [];
  if (matchedPairs === italianWords.length) {
    document.getElementById("reset-game").classList.remove("hidden");
    showReflection();
  }
}

function updateProgress(progress) {
  const progressBar = document.getElementById("progress-bar");
  progressBar.style.width = `${progress * 100}%`;
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
  const learnedWords = matchedCards.map(card => card.dataset.word);
  const learnedList = document.getElementById("learned-words");
  learnedList.innerHTML = learnedWords.map(word => `<li>${word}</li>`).join("");
  reflection.classList.remove("hidden");
}

document.addEventListener("DOMContentLoaded", startGame);=
