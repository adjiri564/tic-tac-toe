

(function gameBoard(){
    const cells = document.querySelectorAll(".cell");
    const resetBtn = document.querySelector(".reset-game");
    const statusText = document.querySelector(".status-text");
    let options = ["", "", "", "", "", "", "", "", ""];
    let currentPlayer = "X"
    let running = false;
    const winConditions =[
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]

    initializeGame()

    function initializeGame() {
        cells.forEach(cell => cell.addEventListener("click", cellClicked))
        resetBtn.addEventListener( "click" , resetGame);
        statusText.textContent = `Its ${currentPlayer}'s turn`
        running = true

    }

    function cellClicked() {
        const cellIndex = this.getAttribute("cellIndex")
        if(options[cellIndex] !== "" || !running){
            return;
        }
        updateCell(this, cellIndex)
        checkForWinner()
    }
    function updateCell (cell, index){
        options[index] = currentPlayer;
        cell.textContent = currentPlayer;
    }
    function changePlayer() {
        currentPlayer = (currentPlayer == "X")? "O" : "X";
        statusText.textContent = `Its ${currentPlayer}'s turn`
    }
    function checkForWinner() {
        let roundWon = false;
        for(let i = 0; i < winConditions.length; i++){
            const condition = winConditions[i];
            const cellA = options[condition[0]];
            const cellB =  options[condition[1]];
            const cellC = options[condition[2]];

            if(cellA == "" || cellB == "" || cellC == ""){
                continue
            }

            if(cellA == cellB && cellB == cellC){
                roundWon = true;
                break;
            }
        }

        if(roundWon){
            statusText.textContent = `Player ${currentPlayer} wins!`;
            running = false;
        }
        else if (!options.includes("")){
            statusText.textContent = `It's a draw!`;
            running = false;
        }
        else{
            changePlayer();
        }
    }
    function resetGame() {
        currentPlayer = "X";
        options = ["", "", "", "", "", "", "", "", ""];
        statusText.textContent = `Its ${currentPlayer}'s turn`;
        cells.forEach(cell => {
            cell.textContent = "";
        })
        running = true;
    }

    return {initializeGame, cellClicked, updateCell, changePlayer, checkForWinner, resetGame}
})();



