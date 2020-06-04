const wordE1 = document.getElementById("word");
// wordE1.innerHTML = "abhishek";
const wrongLettersE1 = document.getElementById("wrong-letters");
const playAgainBtn = document.getElementById("play-button");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");
const finalMessageRevealWord = document.getElementById(
  "final-message-reveal-word"
);

const figureParts = document.querySelectorAll(".figure-part");
// console.log(figureParts);
const words = ["application", "programming", "interface", "wizard"];

let selectedWord = words[Math.floor(Math.random() * words.length)];

let playable = true;

let correctLetters = [];
let wrongLetters = [];

playAgainBtn.addEventListener("click", () => {
  selectedWord = words[Math.floor(Math.random() * words.length)];

  playable = true;

  correctLetters = [];
  wrongLetters = [];
  popup.style.display = "none";
  // figureParts.display = "none";
  figureParts.forEach((part) => {
    part.style.display = "none";
  });
  wrongLettersE1.innerHTML = "";

  displayWord();
});

function displayWord() {
  wordE1.innerHTML = `
   ${selectedWord
     .split("")
     .map((letter) => {
       return `<span class="letter">
     ${correctLetters.includes(letter) ? letter : ""}
     </span>`;
     })
     .join("")}
  `;

  const innerWord = wordE1.innerText.replace(/[\n]/g, "");
  if (innerWord === selectedWord) {
    finalMessage.innerText = "Congratulations ! you Won! ";
    popup.style.display = "flex";
    playable = false;
  }
}

function showNotification() {
  notification.classList.add("show");

  setTimeout(() => {
    notification.classList.remove("show");
  }, 2000);
}

function updateWrongLettersEl() {
  // Display wrong Letters
  wrongLettersE1.innerHTML = `
  ${wrongLetters.length > 0 ? `<p>Wrong Letters</p>` : ""}
  ${wrongLetters.map((letter) => `<span>${letter}</span>`)}
    `;
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;
    if (index < errors) {
      part.style.display = "block";
    } else {
      part.style.display = "none";
    }
  });

  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = "You Lost, Mate.";
    popup.style.display = "flex";
    playable = false;
  }
}

// add event Listener for key press
window.addEventListener("keydown", (e) => {
  if (playable) {
    if (e.keyCode >= 65 && e.keyCode <= 90) {
      const letter = e.key.toLowerCase();
      if (selectedWord.includes(letter)) {
        if (!correctLetters.includes(letter)) {
          correctLetters.push(letter);
          displayWord();
        } else {
          showNotification();
        }
      } else {
        // showNotification();
        if (!wrongLetters.includes(letter)) {
          // letter not in string
          wrongLetters.push(letter);
          // console.log("abhishek");
          updateWrongLettersEl();
        } else {
          // letter no present in string, also letter already presses
          // wrongLetters.push(letter);
          // console.log("hey");
          showNotification();
        }
      }
    }
  }
});

displayWord();
