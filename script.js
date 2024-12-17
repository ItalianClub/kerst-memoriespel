const italianWords = [
  "albero", "regalo", "Babbo Natale", "panettone", "presepe",
  "stella", "campana", "neve", "candela", "angelo",
  "albero", "regalo", "Babbo Natale", "panettone", "presepe",
  "stella", "campana", "neve", "candela", "angelo",
  "renna", "renna", "fiocco", "fiocco", "calza"
];

let flippedCards = [];
let matchedCards = [];
let moves = 0; // Tel het aantal beurten

// Kaarten schudden
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Bord maken
function createBoard() {
  shuffle(italianWords);
  const board = document.getElementById("game-board");
  board.innerHTML = ""; // Maak het bord leeg

  italianWords.forEach((word) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.name = word;

    const front = document.createElement("div");
    front.classList.add("front");

    const back = document.createElement("div");
    back.classList.add("back");
    back.textContent = word; // Plaats het woord op de achterkant

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener("click", flipCard);
    board.appendChild(card);
  });
}

// Kaart omdraaien
function flipCard() {
  if (this.classList.contains("flipped") || flippedCards.length >= 2) return;

  this.classList.add("flipped");
  flippedCards.push(this);

  if (flippedCards.length === 2) {
    moves++; // Tel de beurt
    setTimeout(checkMatch, 800);
  }
}

// Controleren op match
function checkMatch() {
  const [card1, card2] = flippedCards;

  if (card1.dataset.name === card2.dataset.name) {
    matchedCards.push(card1, card2);
  } else {
    card1.classList.remove("flipped");
    card2.classList.remove("flipped");
  }

  flippedCards = [];

  if (matchedCards.length === italianWords.length) {
    setTimeout(() => alert(`🎉 Hai vinto! Buon Natale! 🎄\nBeurten: ${moves}`), 500);
  }
}

// Start het spel
createBoard();