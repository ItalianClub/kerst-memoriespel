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

const mediumWords = [
  { word: "Kerstman", translation: "Babbo Natale" },
  { word: "Kerstbrood", translation: "panettone" },
  { word: "Bel", translation: "campana" },
  { word: "Kerststal", translation: "presepe" },
  { word: "Versieringen", translation: "addobbi" },
  { word: "Familie", translation: "famiglia" },
  { word: "Kunstsneeuw", translation: "neve artificiale" },
  { word: "Lichtjes", translation: "luminarie" },
  { word: "Kerstavond", translation: "vigilia" },
  { word: "Wensen", translation: "auguri" }
];

const hardWords = [
  { word: "Kerstmaal", translation: "cenone" },
  { word: "Gevulde varkenspoot", translation: "zampone" },
  { word: "Slede", translation: "slitta" },
  { word: "Rendier", translation: "renna" },
  { word: "Feestdagen", translation: "festività" },
  { word: "Traditie", translation: "tradizione" },
  { word: "Kerstmis", translation: "Natale" },
  { word: "Dessert", translation: "dolce" },
  { word: "Kerstwensen", translation: "auguri di Natale" },
  { word: "Sneeuwpop", translation: "pupazzo di neve" }
];

let flippedCards = [];
let matchedPairs = 0;
let totalPairs = 0;
let timerInterval;
let timeLeft;

// Haal woorden op basis van moeilijkheidsgraad
function getWords(level) {
  if (level === "makkelijk") return easyWords;
  if (level === "gemiddeld") return mediumWords;
  if (level === "moeilijk") return hardWords;
}

// Start het spel
function startGame(level) {
  clearInterval(timerInterval); // Reset eventuele bestaande timer
  const words = getWords(level);
  const cards = shuffle(generateCards(words));
  const gameBoard = document.getElementById("game-board");
  gameBoard.innerHTML = ""; // Reset bord
  matchedPairs = 0;
  flippedCards = [];
  totalPairs = words.length;
  timeLeft = 120; // Stel tijdslimiet in

  updateTimerDisplay();
  timerInterval = setInterval(updateTimer, 1000);

  // Maak kaarten
  cards.forEach(({ value, isTranslation }) => {
    const card = document.createElement("div");
    card.classList.add("card");

    // Voorkant (afbeelding)
    const front = document.createElement("div");
    front.classList.add("front");

    // Achterkant (woord)
    const back = document.createElement("div");
    back.classList.add("back");
    back.textContent = value;

    card.append(front, back);
    gameBoard.appendChild(card);

    // Stel de waarde in voor vergelijking
    card.dataset.value = value;
    card.dataset.isTranslation = isTranslation; // Voegt extra metadata toe

    // Eventlistener voor het omdraaien
    card.addEventListener("click", () => flipCard(card));
  });

  updateProgress(0); // Reset voortgangsbalk
  document.getElementById("reset-game").classList.remove("hidden");
}

// Genereer kaarten
function generateCards(words) {
  return words.flatMap(({ word, translation }) => [
    { value: word, isTranslation: false },
    { value: translation, isTranslation: true }
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

    if (flippedCards.length === 2) {
      setTimeout(checkMatch, 800);
    }
  }
}

// Match controleren
function checkMatch() {
  const [card1, card2] = flippedCards;

  if (
    card1.dataset.value === card2.dataset.value &&
    card1.dataset.isTranslation !== card2.dataset.isTranslation
  ) {
    // Match gevonden
    matchedPairs++;
    flippedCards = [];
    card1.removeEventListener("click", flipCard);
    card2.removeEventListener("click", flipCard);
    card1.classList.add("matched");
    card2.classList.add("matched");

    // Voortgang bijwerken
    updateProgress(matchedPairs);

    // Controleer of het spel is voltooid
    if (matchedPairs === totalPairs) {
      clearInterval(timerInterval); // Stop de timer
      setTimeout(showReflection, 1000);
    }
  } else {
    // Geen match, draai kaarten terug
    setTimeout(() => {
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
      flippedCards = [];
    }, 800);
  }
}

// Voortgang bijwerken
function updateProgress(matchedPairs) {
  const progressBar = document.getElementById("progress-bar");
  const progressText = document.getElementById("progress-text");
  const progress = (matchedPairs / totalPairs) * 100;

  progressBar.style.width = `${progress}%`;
  progressText.textContent = `Je hebt ${matchedPairs} van de ${totalPairs} paren gevonden!`;
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

// Start het spel bij het laden van de pagina
document.addEventListener("DOMContentLoaded", () => {
  startGame("makkelijk");
});
