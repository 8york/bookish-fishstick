$(document).ready(function () {
  let currentPlayer = "X";
  let currentPosition = {
    X: [],
    O: [],
  };
  let option = [];
  let gameOn = true;

  // $(".cell").on("click", function () {
  //     $(this).text(currentPlayer);
  //     currentPosition[currentPlayer].push(parseInt($(this).attr("data-index")));
  //     if (currentPlayer === "X") {
  //       currentPlayer = "O";
  //       $("#message").html(`${currentPlayer}'s turn`);
  //     } else if (currentPlayer === "O") {
  //       currentPlayer = "X";
  //       $("#message").html(`${currentPlayer}'s turn`);
  //     }
  //     // not working
  //     // else if ($(".cell").length < 0) {
  //     //   console.log($(".cell"));
  //     //   $("#message").html(`It's a draw`).addClass("winner");
  //     // }
  //     winnerIs();
  //   });

  $(".cell").on("click", function (e) {
    if((this).innerText.trim() !== ""){
     return $("#message").html(`choose another cell`);
    }
    $(this).text(currentPlayer);
    const win = winnerIs(); 
    // option.push(parseInt($(this).attr("data-index")));
    currentPosition[currentPlayer].push(parseInt($(this).attr("data-index")));
    if (currentPlayer === "X") {
      currentPlayer = "O";
      $("#message").html(`${currentPlayer}'s turn`);
    } else if (currentPlayer === "O") {
      currentPlayer = "X";
      $("#message").html(`${currentPlayer}'s turn`);
    }
    else if(win === true){
      alert("gameover");
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
        //not working
        // $(currentPosition.X).css("background-color", "violet");
      } else if (
        currentPosition.O.includes(a) &&
        currentPosition.O.includes(b) &&
        currentPosition.O.includes(c)
      ) {
        $("#message").html(`O wins`).addClass("winner");
      }
      // else if(winnerIs === true){
      //   return
      // }
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
  };

  $("#btn").on("click", restart);

  // const winnningGridBgColor = function () {};
  // });
});
