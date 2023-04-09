$(document).ready(function () {
  const initialData = function () {
    return {
      currentPosition: {
        X: [],
        O: [],
      },
      currentPlayer: "X",
      gameOver: false,
      
    };
  };
  let data = initialData();
  let firstPlayerInitial = "X";
  let secondPlayerInitial = "O";
  let whoseMove = $("#message").html(`Game On`);
  countX = 0;
  countO = 0;
  let playerOneCell = undefined;
  let playerTwoCell = undefined;

  // getting the first letter of the first player
  $("#player-one").on("keyup", function () {
    let playerOne = $(this).val();
    firstPlayerInitial = playerOne[0];
    // override existing cells with new initial
  });

  $("#player-two").on("keyup", function () {
    let playerTwo = $(this).val();
    secondPlayerInitial = playerTwo[0];
    // override existing cells with new initial
  });

  $(".cell").on("click", function () {
    //this will stop the game when there is a winner
    if (data.gameOver) {
      return;
    }
    //this disables to choose the same cell
    if (this.innerText.trim() !== "") {
      return $("#message").html(`choose another`);
    }
    //text in the cell that is been clicked is the currentplayer x or o
    if (data.currentPlayer === "X") {
      playerOneCell = $(this).text(firstPlayerInitial).addClass("player-one");
    } else {
      playerTwoCell = $(this).text(secondPlayerInitial).addClass("player-two");
    }
    //put the data-index number into the array of the current position of the player
    data.currentPosition[data.currentPlayer].push(
      parseInt($(this).attr("data-index"))
    );
    // currentPosition[currentPlayer].push(parseInt($(this).attr("data-index")));
    //how turns are taken
    if (data.currentPlayer === "X") {
      data.currentPlayer = "O";
      whoseMove = $("#message").html(`${secondPlayerInitial}'s turn`);
    } else if (data.currentPlayer === "O") {
      data.currentPlayer = "X";
      whoseMove = $("#message").html(`${firstPlayerInitial}'s turn`);
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

  const setWinner = function (a, b, c, winner) {
    data.gameOver = true;
    //filter out the data-index number that is part of the winning rows then add class
    $(".cell").filter(`[data-index=${a}]`).addClass("winnerCell");
    $(".cell").filter(`[data-index=${b}]`).addClass("winnerCell");
    $(".cell").filter(`[data-index=${c}]`).addClass("winnerCell");

    if (winner === "X") {
      $("#message").html(`${firstPlayerInitial} wins`).addClass("winner");
      countX += 1;
      $("#x-point").text(`${countX}`);
    } else {
      $("#message").html(`${secondPlayerInitial} wins`).addClass("winner");
      countO += 1;
      $("#o-point").text(`${countO}`);
    }
  };

  const winnerIs = function () {
    for (combination of winningGrid) {
      const [a, b, c] = combination;
      if (
        data.currentPosition.X.includes(a) &&
        data.currentPosition.X.includes(b) &&
        data.currentPosition.X.includes(c)
      ) {
        setWinner(a, b, c, "X");
        break;
      } else if (
        data.currentPosition.O.includes(a) &&
        data.currentPosition.O.includes(b) &&
        data.currentPosition.O.includes(c)
      ) {
        setWinner(a, b, c, "O");
        break;
      }
      //this shows the game is a draw
      else if (
        data.currentPosition.O.length + data.currentPosition.X.length ===
        9
      ) {
        $("#message").html(`It's a draw`);
        data.gameOver = true;
      }
    }
  };

  const restart = function () {
    $("#message").text(`${firstPlayerInitial}'s turn`).removeClass("winner");
    $(".cell")
      .text("")
      .removeClass("winnerCell")
      .removeClass("player-one")
      .removeClass("player-two");

    data = initialData();
  };
  $("#btn").on("click", restart);
  
});
