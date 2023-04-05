$(document).ready(function () {
  let currentPlayer = "X";
  let currentPosition = {
    X: [],
    O: [],
  };
  let gameOver = false;
  // let gameOn = true;
  // let winner = "X";

  $(".cell").on("click", function (e) {
    if (gameOver) {
      return;
    }
    if (this.innerText.trim() !== "") {
      return $("#message").html(`choose another cell`);
    }
    $(this).text(currentPlayer);
    currentPosition[currentPlayer].push(parseInt($(this).attr("data-index")));
    if (currentPlayer === "X") {
      currentPlayer = "O";
      $("#message").html(`${currentPlayer}'s turn`);
    } else if (currentPlayer === "O") {
      currentPlayer = "X";
      $("#message").html(`${currentPlayer}'s turn`);
    }
    //not working

    winnerIs();

    //bug,message says draw all the time
  });

  const winningGrid = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [3, 5, 7],
    [1, 5, 9],
  ];

  //this works
  const winnerIs = function () {
    for (combination of winningGrid) {
      const [a, b, c] = combination;
      if (
        currentPosition.X.includes(a) &&
        currentPosition.X.includes(b) &&
        currentPosition.X.includes(c)
      ) {
        $("#message").html(`X wins`).addClass("winner");
        gameOver = true;
        $(".cell").filter(`[data-index=${a}]`).addClass("winnerCell");
        $(".cell").filter(`[data-index=${b}]`).addClass("winnerCell");
        $(".cell").filter(`[data-index=${c}]`).addClass("winnerCell");
      } else if (
        currentPosition.O.includes(a) &&
        currentPosition.O.includes(b) &&
        currentPosition.O.includes(c)
      ) {
        $("#message").html(`O wins`).addClass("winner");
        gameOver = true;
        $(".cell").filter(`[data-index=${a}]`).addClass("winnerCell");
        $(".cell").filter(`[data-index=${b}]`).addClass("winnerCell");
        $(".cell").filter(`[data-index=${c}]`).addClass("winnerCell");
      } else if (currentPosition.O.length + currentPosition.X.length === 9) {
        $("#message").html(`It's a draw`);
        gameOver = true;
      }
    }
  };

  const restart = function () {
    $(".cell").text("");
    $("#message").text(`It's X's turn`).removeClass("winner");
    currentPlayer = "X";
    currentPosition = {
      X: [],
      O: [],
    };
    gameOver = false;
    $(".cell").removeClass("winnerCell");
  };
  $("#btn").on("click", restart);
});
