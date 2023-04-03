$(document).ready(function(){
    
    const player = ["X", "O"];
    let currentPlayer = "X";
    currentPosition = {
        X:[], O:[]
    }
    const winningGrid = []
   $('.cell').on('click', function(){
    $(this).text(currentPlayer);
    currentPosition[currentPlayer].push(parseInt($('.cell').attr('data-index')));
    if(currentPlayer === 'X'){
        currentPlayer = "O";
    }
    else if(currentPlayer === "O"){
        currentPlayer = "X";
    }

   });
    

    //when x keydown cell, show

})