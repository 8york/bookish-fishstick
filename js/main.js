$(document).ready(function () {
  let firstPlayerInitial = "";
  let secondPlayerInitial = "";
  // let currentPlayer = "";

  // getting the first letter of the first player
  $("#player-one").on("keyup", function () {
    let playerOne = $(this).val();
    firstPlayerInitial = playerOne[0];
    // console.log(firstPlayer);
  });

  $("#player-two").on("keyup", function () {
    let playerTwo = $(this).val();
    secondPlayerInitial = playerTwo[0];
  });

  let currentPlayer = 'X';

  let currentPosition = {
    X: [],
    O: [],
  };

  let gameOver = false;
  $(".cell").on("click", function () {
    //this will stop the game when there is a winner
    if (gameOver) {
      return;
    }
    //this disables to choose the same cell
    if (this.innerText.trim() !== "") {
      return $("#message").html(`choose another cell`);
    }

    //text in the cell that is been clicked is the currentplayer x or o

    if (currentPlayer === "X") {
      $(this).text(firstPlayerInitial);
    } else {
      $(this).text(secondPlayerInitial);
    }
    //put the data-index number into the array of the current position of the player
    currentPosition[currentPlayer].push(parseInt($(this).attr("data-index")));
    // currentPosition[currentPlayer].push(parseInt($(this).attr("data-index")));
    //how turns are taken
    if (currentPlayer === "X") {
      currentPlayer = "O";
      $("#message").html(`${secondPlayerInitial}'s turn`);
    } else if (currentPlayer === "O") {
      currentPlayer = "X";
      $("#message").html(`${firstPlayerInitial}'s turn`);
    }
    winnerIs();
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
  let countX = 0;
  let countO = 0;
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
        //filter out the data-index number that is part of the winning rows then add class
        $(".cell").filter(`[data-index=${a}]`).addClass("winnerCell");
        $(".cell").filter(`[data-index=${b}]`).addClass("winnerCell");
        $(".cell").filter(`[data-index=${c}]`).addClass("winnerCell");
        countX += 1;
        $("#x-point").text(`${countX}`);
        break
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
        countO += 1;
        $("#o-point").text(`${countO}`);
        break
      }
      //this shows the game is a draw
      else if (currentPosition.O.length + currentPosition.X.length === 9) {
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
