const italianWords = [
  "albero", "regalo", "Babbo Natale", "panettone", "presepe",
  "stella", "campana", "neve", "candela", "angelo",
  "albero", "regalo", "Babbo Natale", "panettone", "presepe",
  "stella", "campana", "neve", "candela", "angelo"
];

let flippedCards = [];
let matchedCards = [];

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function createBoard() {
  shuffle(italianWords);
  const board = document.getElementById("game-board");

  italianWords.forEach(word => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.name = word;
    card.addEventListener("click", flipCard);
    board.appendChild(card);
  });
}

function flipCard() {
  if (this.classList.contains("flipped")) return;

  this.classList.add("flipped");
  this.textContent = this.dataset.name;
  flippedCards.push(this);

  if (flippedCards.length === 2) {
    setTimeout(checkMatch, 800);
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;

  if (card1.dataset.name !== card2.dataset.name) {
    card1.classList.remove("flipped");
    card2.classList.remove("flipped");
    card1.textContent = "";
    card2.textContent = "";
  }

  flippedCards = [];
}

createBoard();
