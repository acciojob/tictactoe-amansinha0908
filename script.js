document.addEventListener("DOMContentLoaded", () => {
  const submitBtn = document.getElementById("submit");
  const boardDiv = document.querySelector(".board");
  const messageDiv = document.querySelector(".message");
  let player1 = "";
  let player2 = "";
  let currentPlayer = "";
  let currentSymbol = "x";
  let gameOver = false;

  submitBtn.addEventListener("click", () => {
    player1 = document.getElementById("player1").value.trim();
    player2 = document.getElementById("player2").value.trim();
    if (!player1 || !player2) return;

    document.querySelector(".player-inputs").style.display = "none";
    boardDiv.style.display = "grid";
    currentPlayer = player1;
    currentSymbol = "x";
    gameOver = false;
    messageDiv.textContent = `${currentPlayer}, you're up`;
    startGame();
  });

  function startGame() {
    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell => {
      cell.textContent = "";
      cell.addEventListener("click", handleClick, { once: true });
    });
  }

  function handleClick(e) {
    if (gameOver) return;
    const cell = e.target;
    cell.textContent = currentSymbol;

    if (checkWinner()) {
      messageDiv.textContent = `${currentPlayer} congratulations you won!`;
      gameOver = true;
      return;
    }

    if ([...document.querySelectorAll(".cell")].every(c => c.textContent !== "")) {
      messageDiv.textContent = "It's a draw!";
      gameOver = true;
      return;
    }

    switchPlayer();
  }

  function switchPlayer() {
    if (currentPlayer === player1) {
      currentPlayer = player2;
      currentSymbol = "o";
    } else {
      currentPlayer = player1;
      currentSymbol = "x";
    }
    messageDiv.textContent = `${currentPlayer}, you're up`;
  }

  function checkWinner() {
    const cells = [...document.querySelectorAll(".cell")].map(c => c.textContent);
    const combos = [
      [0,1,2],[3,4,5],[6,7,8],
      [0,3,6],[1,4,7],[2,5,8],
      [0,4,8],[2,4,6]
    ];
    return combos.some(([a,b,c]) => cells[a] && cells[a] === cells[b] && cells[a] === cells[c]);
  }
});
