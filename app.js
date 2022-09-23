const playingContainer = document.getElementById("playingContainer");
const gameOverContainer = document.getElementById("gameOverContainer");
const drawContainer = document.getElementById("drawContainer");
const tiles = Array.from(document.querySelectorAll(".tile"));

// Wining Combinations
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Players
const PLAYER_1 = "X";
const PLAYER_2 = "0";

// Current Player default player 1
let CURRENT_PLAYER = PLAYER_1;
// Selected of each players
const PLAYER_1_SELECT = [];
const PLAYER_2_SELECT = [];
// Playing State
let gameOver = false;
let winner;
let draw;

tiles.forEach((tile, index) => {
  tile.addEventListener("click", () => {
    if (gameOver && draw) {
      alert("Game is draw, please reset the game to play again!");
      return false;
    }

    if (gameOver) {
      return alert(
        `Game Over player ${winner} has won, please click the reset btn to play again!`
      );
    }

    // Tile Chekcer
    let tileChecker = addTile(tile);
    if (tileChecker) {
      // Add Selected Tile
      addSelectedTile(index);
      // Check Winner
      checkWinner();
    }
  });
});

// Check if tile already taken
const addTile = (tile) => {
  if (tile.hasChildNodes()) {
    alert("This tile is already been selected");
    return false;
  }
  let h1 = document.createElement("h1");
  h1.innerText = CURRENT_PLAYER;
  tile.appendChild(h1);
  // Draw Checker
  drawChecker();
  return true;
};

// Draw Checker
const drawChecker = () => {
  const allTileSelected = tiles.every((tile) => {
    return tile.hasChildNodes();
  });

  if (winner === undefined && allTileSelected) {
    drawContainer.classList.remove("hidden");
    playingContainer.classList.add("hidden");
    gameOver = true;
    draw = true;

    tiles.forEach((tile) => {
      tile.classList.add("draw");
    });
  }
};

const changePlayer = () => {
  CURRENT_PLAYER = CURRENT_PLAYER === PLAYER_1 ? PLAYER_2 : PLAYER_1;
  showWhosPlaying();
};

const addSelectedTile = (tileNumber) => {
  if (CURRENT_PLAYER === PLAYER_1) {
    PLAYER_1_SELECT.push(tileNumber);
  } else {
    PLAYER_2_SELECT.push(tileNumber);
  }
};

const checkWinner = () => {
  let userTurn =
    CURRENT_PLAYER === PLAYER_1 ? PLAYER_1_SELECT : PLAYER_2_SELECT;

  for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
    let combination = WINNING_COMBINATIONS[i];

    let winningMatch = [];

    let resultChecker = combination.every((num) => {
      if (userTurn.includes(num)) {
        winningMatch.push(num);
        return true;
      }
    });

    if (resultChecker) {
      gameOver = true;
      winner = CURRENT_PLAYER;
      gameOverContainer.classList.remove("hidden");
      playingContainer.classList.add("hidden");
      showWinner();
      addColorMatchTile(winningMatch);
    }
  }

  changePlayer();
};

// Add Color To Matched Tiles
const addColorMatchTile = (winningMatch) => {
  for (let num of winningMatch) {
    tiles[num].classList.add("matchTile");
  }
};

// Show Winner
const showWinner = () => {
  let h3 = document.createElement("h3");
  h3.textContent = `Player ${winner} has won the game!`;
  gameOverContainer.appendChild(h3);
};

const showWhosPlaying = () => {
  if (playingContainer.hasChildNodes()) {
    // playingContainer.removeChild();
    playingContainer.innerHTML = "";
    let h1 = document.createElement("h1");
    h1.textContent = `${CURRENT_PLAYER} is playing`;
    playingContainer.append(h1);
  } else {
    let h1 = document.createElement("h1");
    h1.textContent = `Player ${CURRENT_PLAYER} turn`;
    playingContainer.append(h1);
  }
};
showWhosPlaying();

const resetBtn = document.getElementById("resetBtn");
resetBtn.addEventListener("click", () => {
  location.reload();
});
