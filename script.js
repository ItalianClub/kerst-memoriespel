// Woordenlijsten per niveau
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

// Functie om de woordenlijst op basis van niveau op te halen
function getWords(level) {
  if (level === "makkelijk") return easyWords;
  if (level === "gemiddeld") return mediumWords;
  if (level === "moeilijk") return hardWords;
}

// Start het spel
function startGame(level) {
  const words = getWords(level);
  const pairs = generatePairs(words); // Genereer unieke kaartparen
  const cards = shuffle([...pairs, ...pairs]); // Dubbele set kaarten voor matching
  const gameBoard = document.getElementById("game-board");
  gameBoard.innerHTML = ""; // Leeg het bord
  matchedPairs = 0;
  flippedCards = [];
  totalPairs = pairs.length;

  // Genereer kaarten
  cards.forEach(({ word, translation }) => {
    const card = document.createElement("div");
    card.classList.add("card");

    const front = document.createElement("div");
    front.classList.add("front");

    const back = document.createElement("div");
    back.classList.add("back");
    back.textContent = word; // Nederlandse of Italiaanse tekst

    card.append(front, back);
    gameBoard.appendChild(card);

    card.addEventListener("click", () => flipCard(card, word, translation));
  });

  updateProgress(0);
  initializeSnow(); // Start sneeuwanimatie
}

// Kaarten genereren voor uniek paar
function generatePairs(words) {
  return words.map(pair => ({
    word: pair.word,
    translation: pair.translation
  }));
}

// Kaart omdraaien
function flipCard(card, word, translation) {
  if (flippedCards.length < 2 && !card.classList.contains("flipped")) {
    card.classList.add("flipped");
    flippedCards.push({ card, word, translation });

    if (flippedCards.length === 2) {
      setTimeout(checkMatch, 800);
    }
  }
}

// Check of twee kaarten een match zijn
function checkMatch() {
  const [firstCard, secondCard] = flippedCards;

  if (firstCard.translation === secondCard.word || firstCard.word === secondCard.translation) {
    matchedPairs++;
    flippedCards = [];
    updateProgress(matchedPairs);

    if (matchedPairs === totalPairs) {
      setTimeout(() => showReflection(), 1000);
    }
  } else {
    firstCard.card.classList.remove("flipped");
    secondCard.card.classList.remove("flipped");
    flippedCards = [];
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

// Reflectiepagina tonen
function showReflection() {
  const reflection = document.getElementById("reflection");
  const learnedList = document.getElementById("learned-words");
  const cards = document.querySelectorAll(".card");

  learnedList.innerHTML = Array.from(cards)
    .filter(card => card.classList.contains("flipped"))
    .map(card => `<li>${card.querySelector(".back").textContent}</li>`)
    .join("");
  reflection.classList.remove("hidden");
}

// Schud de kaarten
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Sneeuwanimatie initialiseren
function initializeSnow() {
  const snowContainer = document.querySelector(".snow-container");
  snowContainer.innerHTML = ""; // Reset sneeuw
  for (let i = 0; i < 50; i++) {
    const snowflake = document.createElement("div");
    snowflake.classList.add("snowflake");
    snowflake.style.left = `${Math.random() * 100}%`;
    snowflake.style.animationDelay = `${Math.random() * 5}s`;
    snowflake.style.animationDuration = `${5 + Math.random() * 5}s`;
    snowflake.style.opacity = `${Math.random()}`;
    snowflake.style.transform = `scale(${Math.random()})`;
    snowContainer.appendChild(snowflake);
  }
}

// Eventlisteners voor moeilijkheidsselectie
document.querySelectorAll(".difficulty-select button").forEach(button => {
  button.addEventListener("click", () => {
    const level = button.dataset.level;
    startGame(level);
  });
});

// Start standaard met het makkelijke niveau
document.addEventListener("DOMContentLoaded", () => {
  startGame("makkelijk");
});
