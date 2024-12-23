const easyWords = [
  { word: "Kerstboom", translation: "albero" },
  { word: "Cadeau", translation: "regalo" },
  { word: "Ster", translation: "stella" },
  { word: "Sneeuw", translation: "neve" },
  { word: "Kaars", translation: "candela" }
];

const mediumWords = [
  { word: "Engel", translation: "angelo" },
  { word: "Feest", translation: "festa" },
  { word: "Vreugde", translation: "gioia" },
  { word: "Vriendschap", translation: "amicizia" },
  { word: "Liefde", translation: "amore" }
];

const hardWords = [
  { word: "Kerstman", translation: "Babbo Natale" },
  { word: "Kerstbrood", translation: "panettone" },
  { word: "Bel", translation: "campana" },
  { word: "Kerststal", translation: "presepe" },
  { word: "Versieringen", translation: "addobbi" }
];

let selectedLevel = "makkelijk";
let bingoBoard = [];
let calledWords = [];
let bingo = false;

function startBingo(level) {
  // Stel het niveau in en reset de game
  selectedLevel = level;
  bingoBoard = shuffle(getWords(level));
  calledWords = [];
  bingo = false;

  // Maak een nieuwe bingo-kaart
  generateBingoCard();
  updateCalledWords();
}

function getWords(level) {
  if (level === "makkelijk") return easyWords;
  if (level === "gemiddeld") return mediumWords;
  if (level === "moeilijk") return hardWords;
  console.error("Onbekend niveau:", level);
  return [];
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function generateBingoCard() {
  const bingoCardContainer = document.getElementById("bingo-card");
  bingoCardContainer.innerHTML = "";

  bingoBoard.slice(0, 9).forEach((word, index) => {
    const cardSlot = document.createElement("div");
    cardSlot.classList.add("bingo-slot");
    cardSlot.textContent = word.word;
    cardSlot.dataset.translation = word.translation;
    cardSlot.dataset.index = index;

    cardSlot.addEventListener("click", () => markSlot(cardSlot));

    bingoCardContainer.appendChild(cardSlot);
  });
}

function callWord() {
  if (bingo) return;

  const remainingWords = bingoBoard.filter(word => !calledWords.includes(word.word));
  if (remainingWords.length === 0) {
    alert("Alle woorden zijn al geroepen!");
    return;
  }

  const nextWord = remainingWords[Math.floor(Math.random() * remainingWords.length)];
  calledWords.push(nextWord.word);

  updateCalledWords();

  document.getElementById("called-word").textContent = `Roept: ${nextWord.word}`;
}

function updateCalledWords() {
  const calledWordsContainer = document.getElementById("called-words");
  calledWordsContainer.innerHTML = calledWords.map(word => `<li>${word}</li>`).join("");
}

function markSlot(slot) {
  if (bingo) return;

  const word = slot.textContent;
  if (calledWords.includes(word)) {
    slot.classList.add("marked");
    checkBingo();
  } else {
    alert("Dit woord is nog niet geroepen!");
  }
}

function checkBingo() {
  const slots = document.querySelectorAll(".bingo-slot");
  const markedSlots = Array.from(slots).filter(slot => slot.classList.contains("marked"));

  if (markedSlots.length === 9) {
    bingo = true;
    alert("🎉 Bingo! Je hebt alle woorden gevonden!");
  }
}

// Start bij laden van de pagina
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".difficulty-button").forEach(button => {
    button.addEventListener("click", event => {
      const level = event.target.dataset.level;
      startBingo(level);
    });
  });

  document.getElementById("call-word").addEventListener("click", callWord);

  // Start standaard met makkelijk niveau
  startBingo("makkelijk");
});
