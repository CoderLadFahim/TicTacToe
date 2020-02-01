// QUERYING THE DOM
const slots = document.querySelectorAll(".slot");
const comm = document.querySelector("#commentary");
const resetBtn = document.querySelector("button");

// getting the slots individually
const a1 = document.querySelector("#a1");
const a2 = document.querySelector("#a2");
const a3 = document.querySelector("#a3");

const b1 = document.querySelector("#b1");
const b2 = document.querySelector("#b2");
const b3 = document.querySelector("#b3");

const c1 = document.querySelector("#c1");
const c2 = document.querySelector("#c2");
const c3 = document.querySelector("#c3");

// GAME FUNCTIONALITY STARTS UNDER THIS LINE

// getting the winning slots

// horizontals
const row1 = [a1, a2, a3];
const row2 = [b1, b2, b3];
const row3 = [c1, c2, c3];

// verticals
const col1 = [a1, b1, c1];
const col2 = [a2, b2, c2];
const col3 = [a3, b3, c3];

// across
const fromTopLeft = [a1, b2, c3];
const fromTopRight = [a3, b2, c1];

const winningTracks = [
  row1,
  row2,
  row3,
  col1,
  col2,
  col3,
  fromTopLeft,
  fromTopRight
];

const X = "X";
const O = "O";

let currentTurn = Math.floor(Math.random() * 2) == 1 ? X : O;
let slotsFilled = 0;

// helper functions
function insertElement(e) {
  e.target.textContent = currentTurn;
  e.target.style.fontSize = "6rem";
  e.target.style.color = "#fff";
}

function removeElements(elements) {
  elements.textContent = "";
  elements.style.fontSize = "5rem";
  elements.style.color = "";
}

function addEventListeners(elements) {
  elements.addEventListener("mouseover", fadeIn);
  elements.addEventListener("mouseout", fadeOut);

  elements.addEventListener("click", makeMove);
}

function removeEventListeners(elements) {
  elements.removeEventListener("mouseover", fadeIn);
  elements.removeEventListener("mouseout", fadeOut);

  elements.removeEventListener("click", makeMove);
}

// setting the initial font size
slots.forEach(slot => (slot.style.fontSize = "5rem"));

// slot checker
const slotEmpty = slot => (slot.style.fontSize == "5rem" ? true : false);

// hover effect
function fadeIn(e) {
  if (slotEmpty(e.target)) {
    e.target.textContent = currentTurn;
  }
}

function fadeOut(e) {
  if (slotEmpty(e.target)) {
    e.target.textContent = "";
  }
}

// making the move
function makeMove(e) {
  if (slotEmpty(e.target)) {
    insertElement(e);

    slotsFilled++;
    determineWinner();
  }

  e.target.removeEventListener("click", makeMove);
  currentTurn == X ? (currentTurn = O) : (currentTurn = X);
}

function determineWinner() {
  let winningTrack = winningTracks.find(track =>
    track.every(slot => slot.style.fontSize && slot.textContent == currentTurn)
  );

  if (winningTrack) {
    commentate("win");
    haltGame();
    changeCol(winningTrack, "win");
  } else if (slotsFilled == 9 && !winningTrack) {
    changeCol(winningTrack, "draw");
    commentate("draw");
  }
}

function commentate(gameStatus) {
  switch (gameStatus) {
    case "win":
      comm.textContent = `The ${currentTurn}s Won!`;
      break;
    case "draw":
      comm.textContent = `The Game was Tied`;
      break;
  }
}

function haltGame() {
  slots.forEach(slot => {
    removeEventListeners(slot);
  });
}

function changeCol(track, stat) {
  if (stat == "win") {
    Array.from(track)[0].textContent == X
      ? track.forEach(slot => (slot.style.color = "#00e3ff"))
      : track.forEach(slot => (slot.style.color = "#00ffe7"));
  } else if (stat == "draw") {
    slots.forEach(slot => (slot.style.color = "#222"));
  }
}

// adding the event listeners
slots.forEach(slot => {
  addEventListeners(slot);
});

// resetter function
resetBtn.addEventListener("click", e => {
  slots.forEach(slot => {
    removeElements(slot);
    addEventListeners(slot);
  });

  currentTurn = Math.floor(Math.random() * 2) == 1 ? X : O;
  slotsFilled = 0;
  comm.textContent = "Make your Move";
});
