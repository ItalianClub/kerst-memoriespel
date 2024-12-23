const italianWords = [
  "albero", "regalo", "Babbo Natale", "panettone", "presepe",
  "stella", "campana", "neve", "candela", "angelo",
  "albero", "regalo", "Babbo Natale", "panettone", "presepe",
  "stella", "campana", "neve", "candela", "angelo"
];

let flippedCards = [];
let matchedCards = [];
let matchedPairs = 0;
let lockBoard = false;

// Voeg sneeuw toe
function createSnow() {
  const snowContainer = document.querySelector(".snow-container");

  for (let i = 0; i < 100; i++) {
    const snowflake = document.createElement("div");
    snowflake.classList.add("snowflake");
    snowflake.style.left = Math.random() * 100 + "vw";
    snowflake.style.animationDuration = Math.random() * 3 + 7 + "s";
    snowContainer.appendChild(snowflake);
  }
}

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
  board.innerHTML = "";

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

// Kaart draaien
function flipCard() {
  if (lockBoard || this.classList.contains("flipped")) return;

  this.classList.add("flipped");
  flippedCards.push(this);

  if (flippedCards.length === 2) {
    lockBoard = true;
    setTimeout(checkMatch, 800);
  }
}

// Match controleren
function checkMatch() {
  const [card1, card2] = flippedCards;

  if (card1.dataset.name === card2.dataset.name) {
    card1.classList.add("matched");
    card2.classList.add("matched");
    card1.removeEventListener("click", flipCard);
    card2.removeEventListener("click", flipCard);
    matchedCards.push(card1, card2);
    matchedPairs++;
    updateProgressBar();
  } else {
    card1.classList.remove("flipped");
    card2.classList.remove("flipped");
  }

  flippedCards = [];
  lockBoard = false;

  if (matchedCards.length === italianWords.length) {
    setTimeout(() => alert("🎉 Hai vinto! Buon Natale! 🎄"), 500);
  }
}

// Voortgang bijhouden
function updateProgressBar() {
  const progressBar = document.getElementById("progress-bar");
  const progressText = document.getElementById("progress-text");

  const totalPairs = italianWords.length / 2;
  const progress = (matchedPairs / totalPairs) * 100;

  progressBar.style.width = `${progress}%`;

  if (progress === 100) {
    progressText.textContent = "Fantastico! Je hebt het spel voltooid! 🎉";
  } else if (progress >= 80) {
    progressText.textContent = "Bijna daar! Hou vol! 💪";
  } else if (progress >= 50) {
    progressText.textContent = "Goed bezig! Blijf doorgaan! 👏";
  } else {
    progressText.textContent = "Je bent begonnen! Veel succes! 🌟";
  }
}

// Start spel
createBoard();
createSnow();
