// QUERYING THE DOM
const slots = document.querySelectorAll(".slot");
const frame = document.querySelector("#frame");
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

// moves
const X = "X";
const O = "O";

slots.forEach(slot => (slot.style.fontSize = "5rem"));

// slot checker
const isEmpty = slot => (slot.style.fontSize == "6rem" ? false : true);

let currentTurn = X;
let emptySlots = 9;

const fadeIn = e => {
  if (isEmpty(e.target)) e.target.textContent = currentTurn;
};
const fadeOut = e => {
  if (isEmpty(e.target)) e.target.textContent = "";
};

// adding the hover effect
function hover(slot) {
  slot.addEventListener("mouseover", fadeIn);
  slot.addEventListener("mouseout", fadeOut);
}

function click(e) {
  if (isEmpty(e.target)) {
    e.target.textContent = currentTurn;
    e.target.style.fontSize = "6rem";
    e.target.style.color = "#fff";

    emptySlots--;
    determineWinner();
  }

  // alternating current turn
  currentTurn == X ? (currentTurn = O) : (currentTurn = X);
}

// move making function
function makeMove(slot) {
  slot.addEventListener("click", click);
}

const commentate = gameStatus => {
  switch (gameStatus) {
    case "won":
      comm.textContent = `The ${currentTurn}s Won!`;
      break;
    case "draw":
      comm.textContent = `The Game was Tied`;
      break;
  }
};

function determineWinner() {
  let winningTrack = winningTracks.find(track =>
    track.every(
      slot => slot.style.fontSize == "6rem" && slot.textContent == currentTurn
    )
  );

  if (winningTracks.includes(winningTrack) && emptySlots > 0) {
    haltGame();
    commentate("won");
  } else if (emptySlots == 0) {
    commentate("draw");
  }
}

// game halting function
function haltGame() {
  slots.forEach(slot => {
    // removing the hover effect
    slot.removeEventListener("mouseover", fadeIn);
    slot.removeEventListener("mouseover", fadeOut);

    // making the slots unclickable
    slot.removeEventListener("click", click);
  });
}

// calling the functions
slots.forEach(slot => {
  hover(slot);
  makeMove(slot);
});

// resetting
resetBtn.addEventListener("click", e => {
  slots.forEach(slot => {
    slot.style.fontSize = "5rem";
    slot.textContent = "";
  });
  comm.textContent = "Make your Move";
  currentTurn = X;
  emptySlots = 9;
});
