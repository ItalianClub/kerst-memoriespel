document.addEventListener("DOMContentLoaded", () => {
  console.log("Spel geladen. Start niveau: makkelijk");
  startGame("makkelijk");
  setupDifficultyButtons();
  createSnowflakes();
});

// Woordenlijsten
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

// Start het spel
function startGame(level) {
  const words = getWords(level);
  console.log("Woordenlijst geladen voor niveau:", level, words);

  totalPairs = words.length;
  matchedPairs = 0;
  flippedCards = [];
  updateProgress();
  generateCards(words);
}

// Woordenlijst ophalen
function getWords(level) {
  if (level === "makkelijk") return easyWords;
  if (level === "gemiddeld") return mediumWords;
  if (level === "moeilijk") return hardWords;
  return easyWords;
}

// Moeilijkheidsknoppen instellen
function setupDifficultyButtons() {
  const buttons = document.querySelectorAll(".level-button");
  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const level = button.dataset.level;
      console.log("Niveau geselecteerd:", level);
      startGame(level);
    });
  });
}

// Kaarten genereren
function generateCards(words) {
  const gameBoard = document.getElementById("game-board");
  gameBoard.innerHTML = "";

  const cards = words.flatMap(({ word, translation }) => [
    { value: word, isTranslation: false },
    { value: translation, isTranslation: true }
  ]);

  shuffle(cards).forEach(({ value }) => {
    const card = document.createElement("div");
    card.className = "card";

    const front = document.createElement("div");
    front.className = "front";

    const back = document.createElement("div");
    back.className = "back";
    back.textContent = value;

    card.appendChild(front);
    card.appendChild(back);

    card.dataset.value = value;

    card.addEventListener("click", () => flipCard(card));
    gameBoard.appendChild(card);
  });

  console.log("Aantal kaarten gegenereerd:", document.querySelectorAll(".card").length);
}

// Schud kaarten
function shuffle(cards) {
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  return cards;
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

// Controleer match
function checkMatch() {
  const [card1, card2] = flippedCards;
  console.log("Controleer match tussen:", card1.dataset.value, card2.dataset.value);

  if (card1.dataset.value === card2.dataset.value) {
    matchedPairs++;
    card1.classList.add("matched");
    card2.classList.add("matched");
    flippedCards = [];
    updateProgress();

    if (matchedPairs === totalPairs) {
      setTimeout(() => {
        alert("Gefeliciteerd! Je hebt alle kaarten gematcht!");
      }, 500);
    }
  } else {
    setTimeout(() => {
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
      flippedCards = [];
    }, 800);
  }
}

// Voortgangsbalk bijwerken
function updateProgress() {
  const progressBar = document.getElementById("progress-bar");
  const progressText = document.getElementById("progress-text");

  const progress = (matchedPairs / totalPairs) * 100;
  progressBar.style.width = `${progress}%`;
  progressText.textContent = `Je hebt ${matchedPairs} van de ${totalPairs} paren gevonden!`;
}

// Voeg sneeuw toe
function createSnowflakes() {
  const container = document.querySelector(".snow-container");
  for (let i = 0; i < 50; i++) {
    const snowflake = document.createElement("div");
    snowflake.className = "snowflake";
    snowflake.style.left = `${Math.random() * 100}vw`;
    snowflake.style.animationDelay = `${Math.random() * 5}s`;
    snowflake.style.animationDuration = `${5 + Math.random() * 5}s`;
    container.appendChild(snowflake);
  }
}
