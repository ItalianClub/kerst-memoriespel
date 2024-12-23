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
let lockBoard = false;
let selectedLevel = 10;

document.querySelectorAll(".difficulty").forEach(button => {
  button.addEventListener("click", () => {
    selectedLevel = parseInt(button.dataset.level);
    startGame();
  });
});

function createBoard(words) {
  shuffle(words);
  const board = document.getElementById("game-board");
  board.innerHTML = "";

  words.forEach(({ word, translation }) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.name = word;

    const front = document.createElement("div");
    front.classList.add("front");

    const back = document.createElement("div");
    back.classList.add("back");
    back.innerHTML = `
      <p>${word}</p>
      <small>${translation}</small>
    `;

    card.appendChild(front);
    card.appendChild(back);
    card.addEventListener("click", flipCard);
    board.appendChild(card);
  });
}

function flipCard() {
  if (lockBoard || this.classList.contains("flipped")) return;

  this.classList.add("flipped");
  flippedCards.push(this);

  if (flippedCards.length === 2) {
    lockBoard = true;
    setTimeout(checkMatch, 800);
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;

  if (card1.dataset.name === card2.dataset.name) {
    matchedCards.push(card1, card2);
    showFeedback("Fantastico! Een match gevonden!");
  } else {
    card1.classList.remove("flipped");
    card2.classList.remove("flipped");
  }

  flippedCards = [];
  lockBoard = false;
}

function showFeedback(message) {
  const feedback = document.createElement("div");
  feedback.textContent = message;
  feedback.className = "feedback";
  document.body.appendChild(feedback);

  setTimeout(() => {
    feedback.remove();
  }, 2000);
}

function startGame() {
  const wordsToUse = italianWords.slice(0, selectedLevel);
  createBoard([...wordsToUse, ...wordsToUse]);
  matchedCards = [];
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
