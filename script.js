const easyWords = [
  { word: "Kerstboom", translation: "albero" },
  { word: "Cadeau", translation: "regalo" },
  { word: "Ster", translation: "stella" },
  { word: "Sneeuw", translation: "neve" },
  { word: "Kaars", translation: "candela" },
  { word: "Engel", translation: "angelo" },
  { word: "Feest", translation: "festa" },
  { word: "Vreugde", translation: "gioia" },
  { word: "Vriendschap", translation: "amicizia" },
  { word: "Liefde", translation: "amore" }
];

let flippedCards = [];
let matchedPairs = 0;
let totalPairs = 0;
let timeLeft = 120;
let timerInterval;

// Start de sneeuwanimatie
function initializeSnow() {
  const snowContainer = document.getElementById("snow-container");

  for (let i = 0; i < 100; i++) {
    const snowflake = document.createElement("div");
    snowflake.classList.add("snowflake");

    // Willekeurige positie en snelheid
    snowflake.style.left = `${Math.random() * 100}vw`;
    snowflake.style.animationDelay = `${Math.random() * 5}s`;
    snowflake.style.animationDuration = `${5 + Math.random() * 5}s`;

    snowContainer.appendChild(snowflake);
  }
}

// Start het spel
function startGame(level) {
  clearInterval(timerInterval); // Reset eventuele timer
  const words = easyWords; // Alleen makkelijk als voorbeeld
  const cards = shuffle(generateCards(words));
  const gameBoard = document.getElementById("game-board");
  gameBoard.innerHTML = ""; // Reset speelbord
  matchedPairs = 0;
  flippedCards = [];
  totalPairs = words.length;
  timeLeft = 120; // Timer opnieuw instellen

  console.log("Spel gestart met niveau:", level);
  console.log("Totaal aantal paren:", totalPairs);

  updateTimerDisplay();
  timerInterval = setInterval(updateTimer, 1000);

  cards.forEach(({ word, isTranslation }) => {
    const card = document.createElement("div");
    card.classList.add("card");
    const front = document.createElement("div");
    front.classList.add("front");
    const back = document.createElement("div");
    back.classList.add("back");
    back.textContent = isTranslation ? word.translation : word.word;
    card.append(front, back);
    gameBoard.appendChild(card);
    card.dataset.value = isTranslation ? word.translation : word.word;
    card.addEventListener("click", () => flipCard(card));
  });

  updateProgress(0); // Reset voortgangsbalk
  document.getElementById("reset-game").classList.remove("hidden");
}

// Genereer kaarten
function generateCards(words) {
  return words.flatMap(({ word, translation }) => [
    { word: { word, translation }, isTranslation: false },
    { word: { word, translation }, isTranslation: true }
  ]);
}

// Schud kaarten
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Kaart omdraaien
function flipCard(card) {
  if (flippedCards.length < 2 && !card.classList.contains("flipped")) {
    card.classList.add("flipped");
    flippedCards.push(card);

    console.log("Kaarten geflipt:", flippedCards.map(c => c.dataset.value));

    if (flippedCards.length === 2) {
      setTimeout(checkMatch, 800);
    }
  }
}

// Match controleren
function checkMatch() {
  const [card1, card2] = flippedCards;

  console.log("Controleer match tussen:", card1.dataset.value, "en", card2.dataset.value);

  if (card1.dataset.value === card2.dataset.value) {
    card1.classList.add("matched");
    card2.classList.add("matched");
    matchedPairs++;
    flippedCards = [];

    console.log("Match gevonden! Totaal aantal matches:", matchedPairs);

    updateProgress(matchedPairs);

    if (matchedPairs === totalPairs) {
      clearInterval(timerInterval); // Stop de timer
      setTimeout(showReflection, 1000);
    }
  } else {
    setTimeout(() => {
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
      flippedCards = [];
      console.log("Geen match. Kaarten teruggedraaid.");
    }, 1000);
  }
}

// Timer bijwerken
function updateTimer() {
  timeLeft--;
  updateTimerDisplay();

  if (timeLeft <= 0) {
    clearInterval(timerInterval);
    alert("De tijd is op! Probeer het opnieuw.");
    startGame("makkelijk");
  }
}

function updateTimerDisplay() {
  const timerDisplay = document.getElementById("timer-display");
  timerDisplay.textContent = `Tijd: ${timeLeft} seconden`;
}

// Voortgang bijwerken
function updateProgress(matches) {
  const progressBar = document.getElementById("progress-bar");
  progressBar.style.width = `${(matches / totalPairs) * 100}%`;

  console.log("Voortgang bijgewerkt. Matches:", matches, "/", totalPairs);
}

// Reflectiepagina tonen
function showReflection() {
  const reflection = document.getElementById("reflection");
  const learnedList = document.getElementById("learned-words");
  const cards = document.querySelectorAll(".card.matched");

  learnedList.innerHTML = Array.from(cards)
    .map(card => `<li>${card.dataset.value}</li>`)
    .join("");
  reflection.classList.remove("hidden");
}

// Voeg reset-functionaliteit toe
document.getElementById("reset-game").addEventListener("click", () => {
  const level = document.querySelector(".difficulty-select button.active")?.dataset.level || "makkelijk";
  startGame(level);
});

document.getElementById("reset-from-reflection").addEventListener("click", () => {
  startGame("makkelijk");
  document.getElementById("reflection").classList.add("hidden");
});

// Start sneeuw en spel bij het laden van de pagina
document.addEventListener("DOMContentLoaded", () => {
  initializeSnow();
  startGame("makkelijk");
});
