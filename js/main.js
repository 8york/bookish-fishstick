$(document).ready(function(){
    
    const player = ["X", "O"];
    let currentPlayer = "X";
    currentPosition = {
        X:[], O:[]
    }
    let gameOn = false;
   $('.cell').on('click', function(){
    
    $(this).text(currentPlayer);
    // console.log(this);
    currentPosition[currentPlayer].push(parseInt($(this).attr('data-index')));
    // console.log($(this).attr('data-index'));
    // console.log(currentPosition);
    if(currentPlayer === 'X'){
        currentPlayer = "O";
        $('h2').html(`${currentPlayer}'s turn`);
    }
    else if(currentPlayer === "O"){
        currentPlayer = "X";
        $('h2').html(`${currentPlayer}'s turn`);
    }
        winnerIs();
   });
    

//winning function
//make an array of winning index
//loop through and create another loop to go through each number of array item

const winningGrid = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [3, 5, 7], [1, 5, 9]];

const winnerIs = function(){
    console.log('working');
     for (let i = 0; i < winningGrid.length; i++){
        let winner = true;
         for (let j = 0; j < winningGrid[i].length; j++){
        // console.log(winningGrid[i]);
        console.log(currentPosition.X);
        console.log(winningGrid[i]);
        if(currentPosition.X === winningGrid[i]){
        //    console.log($('h2').html(`the ${currentPlayer} wins`));
        console.log("you have won");
        }else{
            console.log('notworking');
        }  
     }
    }
     
}


// const restart = function ()

})