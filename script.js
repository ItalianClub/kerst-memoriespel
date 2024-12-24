document.addEventListener("DOMContentLoaded", () => {
  // Start het spel automatisch op het "makkelijk" niveau
  startGame("makkelijk");
});

// Woordenlijsten voor elk niveau
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

// Start het spel met het geselecteerde niveau
function startGame(level) {
  const words = getWords(level);
  totalPairs = words.length; // Aantal te vinden paren
  matchedPairs = 0; // Reset het aantal matches
  flippedCards = []; // Reset open kaarten
  updateProgress(); // Reset de voortgangsbalk
  generateCards(words); // Dynamisch kaarten genereren
}

// Haal woorden op per niveau
function getWords(level) {
  if (level === "makkelijk") return easyWords;
  if (level === "gemiddeld") return mediumWords;
  if (level === "moeilijk") return hardWords;
  return easyWords; // Standaardniveau
}

// Dynamisch kaarten genereren
function generateCards(words) {
  const gameBoard = document.getElementById("game-board");
  gameBoard.innerHTML = ""; // Reset het speelbord

  // Maak een array van alle kaartenparen
  const cards = words.flatMap(({ word, translation }) => [
    { value: word, isTranslation: false },
    { value: translation, isTranslation: true }
  ]);

  const shuffledCards = shuffleCards(cards);

  shuffledCards.forEach(({ value }) => {
    const card = document.createElement("div");
    card.className = "card";

    const front = document.createElement("div");
    front.className = "front";

    const back = document.createElement("div");
    back.className = "back";
    back.textContent = value;

    card.appendChild(front);
    card.appendChild(back);

    card.dataset.value = value; // Zet de waarde voor herkenning

    card.addEventListener("click", () => flipCard(card)); // Voeg klikfunctionaliteit toe

    gameBoard.appendChild(card);
  });
}

// Schud kaarten willekeurig
function shuffleCards(cards) {
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
      setTimeout(checkMatch, 800); // Controleer de match na 800ms
    }
  }
}

// Controleer of twee kaarten een match vormen
function checkMatch() {
  const [card1, card2] = flippedCards;

  if (card1.dataset.value === card2.dataset.value) {
    // Match gevonden
    matchedPairs++;
    card1.classList.add("matched");
    card2.classList.add("matched");

    // Maak kaarten niet meer klikbaar
    card1.removeEventListener("click", () => flipCard(card1));
    card2.removeEventListener("click", () => flipCard(card2));

    flippedCards = [];
    updateProgress();

    // Controleer of alle paren zijn gevonden
    if (matchedPairs === totalPairs) {
      setTimeout(() => alert("Gefeliciteerd! Je hebt alle kaarten gematcht!"), 500);
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

// Update voortgang
function updateProgress() {
  const progressBar = document.getElementById("progress-bar");
  const progressText = document.getElementById("progress-text");

  const progress = (matchedPairs / totalPairs) * 100;
  progressBar.style.width = `${progress}%`;
  progressText.textContent = `Je hebt ${matchedPairs} van de ${totalPairs} paren gevonden!`;
}

// Moeilijkheidsselectie
document.querySelectorAll(".level-button").forEach(button => {
  button.addEventListener("click", () => {
    const level = button.dataset.level;
    startGame(level);
  });
});

// Reset-functionaliteit
document.getElementById("reset-game").addEventListener("click", () => {
  startGame("makkelijk");
});
