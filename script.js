const italianWords = [
  "albero", "regalo", "Babbo Natale", "panettone", "presepe",
  "stella", "campana", "neve", "candela", "angelo",
  "albero", "regalo", "Babbo Natale", "panettone", "presepe",
  "stella", "campana", "neve", "candela", "angelo"
];

let flippedCards = []; // Hierin slaan we omgedraaide kaarten op
let matchedCards = []; // Hierin slaan we gevonden paren op
let lockBoard = false; // Blokkeer extra klikken tijdens het controleren van een match
let moves = 0; // Tel het aantal zetten

// Functie om kaarten te schudden
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Bord genereren
function createBoard() {
  shuffle(italianWords);
  const board = document.getElementById("game-board");
  board.innerHTML = ""; // Maak het bord leeg

  italianWords.forEach((word) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.name = word;

    // Voor- en achterkant van de kaart
    const front = document.createElement("div");
    front.classList.add("front");
    front.style.backgroundImage = "url('kerst-icoon.png')"; // Voeg het kersticoon toe

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
  if (lockBoard) return; // Blokkeer extra klikken
  if (this.classList.contains("flipped")) return; // Geen dubbele clicks op dezelfde kaart

  this.classList.add("flipped");
  flippedCards.push(this);

  if (flippedCards.length === 2) {
    lockBoard = true; // Blokkeer het bord tijdens controle
    setTimeout(checkMatch, 800);
  }
}

// Controleer of de kaarten matchen
function checkMatch() {
  const [card1, card2] = flippedCards;

  if (card1.dataset.name === card2.dataset.name) {
    card1.removeEventListener("click", flipCard);
    card2.removeEventListener("click", flipCard);
    matchedCards.push(card1, card2);
  } else {
    // Draai de kaarten terug
    card1.classList.remove("flipped");
    card2.classList.remove("flipped");
  }

  flippedCards = [];
  lockBoard = false;

  // Controleer of alle paren gevonden zijn
  if (matchedCards.length === italianWords.length) {
    setTimeout(() => alert(`🎉 Hai vinto! Buon Natale! 🎄 Zetten: ${moves}`), 500);
  }

  moves++; // Verhoog het aantal zetten
}

// Start het spel
createBoard();
