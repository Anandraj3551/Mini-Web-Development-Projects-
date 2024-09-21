const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

const gifContainer = document.getElementById("gifContainer");
const winLine = document.getElementById("winLine");

let currentPlayer;
let gameGrid;

const winningPositions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Function to intialise the game

function initGame() {
  gifContainer.style.display = "none"; // Hide the GIF on game restart

  currentPlayer = "X";
  gameGrid = ["", "", "", "", "", "", "", "", ""];

  // lets empty the boxes on Ui
  boxes.forEach((box, index) => {
    box.innerText = "";
    boxes[index].style.pointerEvents = "all";
    //initialise box with css properties again
    box.classList = `box box${index + 1}`;
  });

  newGameBtn.classList.remove("active");
  gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

initGame();

function swapTurn() {
  if (currentPlayer === "X") {
    currentPlayer = "O";
  } else {
    currentPlayer = "X";
  }
  //   Ui update
  gameInfo.innerText = `Current Palyer - ${currentPlayer}`;
}

function checkGameOver() {
  let answer = "";

  winningPositions.forEach((position) => {
    if (
      (gameGrid[position[0]] !== "" ||
        gameGrid[position[1]] !== "" ||
        gameGrid[position[2]] !== "") &&
      gameGrid[position[0]] === gameGrid[position[1]] &&
      gameGrid[position[1]] === gameGrid[position[2]]
    ) {
      // check if winner is X
      if (gameGrid[position[0]] === "X") answer = "X";
      else {
        answer = "0";
      }

      //disable pointer events
      boxes.forEach((box) => {
        box.style.pointerEvents = "none";
      });

      // Display winner animation (GIF)
      gifContainer.style.display = "block";

      //now we Know X/O is a Winner
      boxes[position[0]].classList.add("win");
      boxes[position[1]].classList.add("win");
      boxes[position[2]].classList.add("win");
    }
  });
  //it means we have a winner
  if (answer !== "") {
    gameInfo.innerText = `Winner Player - ${answer}`;
    newGameBtn.classList.add("active");
    return;
  }

  //we Know No Winner Found, lets Check whether there is tie

  let fillCount = 0;
  gameGrid.forEach((box) => {
    if (box !== "") fillCount++;
  });

  //broad is filled , game is  Tie

  if (fillCount === 9) {
    gameInfo.innerText = "Game Tied !";
    newGameBtn.classList.add("active");
  }
}

function handleClick(index) {
  if (gameGrid[index] === "") {
    boxes[index].innerText = currentPlayer;
    gameGrid[index] = currentPlayer;
    boxes[index].style.pointerEvents = "none";
    //swap for turn between player
    swapTurn();
    //check someone win or not
    checkGameOver();
  }
}

boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    handleClick(index);
  });
});

newGameBtn.addEventListener("click", initGame);
