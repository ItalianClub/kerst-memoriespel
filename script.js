const italianWords = [
  "albero", "regalo", "Babbo Natale", "panettone", "presepe",
  "stella", "campana", "neve", "candela", "angelo",
  "albero", "regalo", "Babbo Natale", "panettone", "presepe",
  "stella", "campana", "neve", "candela", "angelo"
];

let flippedCards = [];
let matchedCards = [];
let lockBoard = false; // Voorkomt klikken tijdens het checken
let moves = 0; // Tel het aantal zetten

// Functie om kaarten te schudden
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Bord aanmaken
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
    back.textContent = word;

    card.appendChild(front);
    card.appendChild(back);
    card.addEventListener("click", flipCard);
    board.appendChild(card);
  });
}

// Kaart omdraaien
function flipCard() {
  if (lockBoard || this.classList.contains("flipped")) return;

  this.classList.add("flipped");
  flippedCards.push(this);

  if (flippedCards.length === 2) {
    lockBoard = true;
    setTimeout(checkMatch, 800);
  }
}

// Check of kaarten matchen
function checkMatch() {
  const [card1, card2] = flippedCards;

  if (card1.dataset.name === card2.dataset.name) {
    card1.removeEventListener("click", flipCard);
    card2.removeEventListener("click", flipCard);
    matchedCards.push(card1, card2);
  } else {
    card1.classList.remove("flipped");
    card2.classList.remove("flipped");
  }

  flippedCards = [];
  lockBoard = false;

  // Controleer of het spel is gewonnen
  if (matchedCards.length === italianWords.length) {
    setTimeout(() => alert(`🎉 Hai vinto! Buon Natale! 🎄 Zetten: ${moves}`), 500);
  }

  moves++;
}

// Start het spel
createBoard();
