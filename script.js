const gameBoard = (() => {

    let playerOneSelections = [];
    let playerTwoSelections = [];

    function resetPlayers() {
        this.playerOneSelections = [];
        this.playerTwoSelections = [];
    };

    return {
        playerOneSelections,
        playerTwoSelections,
        resetPlayers,
    };
})();



/////////////////////////////////////////////




const Player = (name, mark) => {

    
    return {
        name,
        mark,
    };
};

const player1 = Player('Player 1', 'X');
const player2 = Player('Player 2', 'O');



//////////////////////////////////////



const game = (() => {
    
    const playerTurn = document.getElementById('player-turn');
    playerTurn.style.display = "none";
    let x_turn = true;
    let roundCount = 0;
    let player1name;
    let player2name;
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    const cellElements = document.querySelectorAll('[data-cell]');
    let cellArray = Array.from(cellElements);



    // create module to control display
    const displayController = (() => {

        // select for "home screen" buttons
        const restartBtn = document.getElementById('restart-btn');
        restartBtn.addEventListener('click', resetDisplay);
        restartBtn.style.display = 'none';
        restartBtn.addEventListener('click', resetDisplay);
            function resetDisplay () {
                playerTurn.innerText = '';
                playerTurn.style.display = 'none';
                playerOneNameInput.style.display = 'inline';
                playerTwoNameInput.style.display = 'inline';
                startGame.style.display = 'inline';
                startBtn.style.display = 'inline';
                restartBtn.style.display = 'none';
                cellElements.forEach(cell => {
                    cell.innerText = '';
                    cell.setAttribute('id', '');
                    cell.setAttribute('class', 'cell');
                });
            }

        const startGame = document.forms['start-game-form'];
        startGame.addEventListener('submit', startFunction);
        const playerOneNameInput = startGame.querySelector('[data-player-1-input]')
        const playerTwoNameInput = startGame.querySelector('[data-player-2-input]')


        const startBtn = document.getElementById('start-game-btn');
    
        // create function to hide home screen and start game
        function startFunction(e) {
            e.preventDefault();
            activateCells();
            let playerOneNameInputVal = startGame.querySelector('[data-player-1-input]').value;
            let playerTwoNameInputVal = startGame.querySelector('[data-player-2-input]').value;
            player1name = playerOneNameInputVal;
            player2name = playerTwoNameInputVal;
       
            playerOneNameInput.style.display = 'none';
            playerTwoNameInput.style.display = 'none';
            startGame.style.display = 'none';
            startBtn.style.display = 'none';
            playerTurn.innerText =`${playerOneNameInputVal}'s turn`;
            playerTurn.style.display = 'inline';
        };


        return {
            restartBtn,
            startFunction,
            resetDisplay,
        }
    })();

    // create array from cells in order to grab index # of cell
    function activateCells () {
        cellElements.forEach(cell => {
            cell.addEventListener('click', addToBoard, { once: true });
        });
    };

    // create function to update board with player moves (x's and o's) upon click event
    function addToBoard(e) {
        let cell = e.target;
        let selectedCell = cellArray.indexOf(cell);
        cell.setAttribute('id', selectedCell);

        if(x_turn) {
            cell.innerText = player1.mark;
            gameBoard.playerOneSelections.push(selectedCell);
            x_turn = false;
            playerTurn.innerText = `${player2name}'s turn`;
            roundCount++
            checkWin();
            console.log(roundCount);

        } else if (!x_turn) {
            cell.innerText = player2.mark;
            gameBoard.playerTwoSelections.push(selectedCell);
            x_turn = true;
            playerTurn.innerText = `${player1name}'s turn`;
            roundCount++
            checkWin();
            console.log(roundCount);
        };
    };

    function checkWin() {

        let playerOneWin = false;
        let playerTwoWin = false;
        let winningLine;

        function flatten(arr) {
            let flatArray = [];

            arr.forEach(element => {
                if (Array.isArray(element)) {
                    flatArray = flatArray.concat(flatten(element));
                }
                else {
                    flatArray.push(element);
                }
            });
            return flatArray;
        };

        const checkPlayerOneWin = (() => {
            for (let i = 0; i < winningCombinations.length; i++) {
                let newArray = flatten(winningCombinations[i]);
                if(gameBoard.playerOneSelections.indexOf(newArray[0]) !== -1) {
                    if(gameBoard.playerOneSelections.indexOf(newArray[1]) !== -1) {
                        if(gameBoard.playerOneSelections.indexOf(newArray[2]) !== -1) {
                            winningLine = winningCombinations[i];
                            for (let i = 0; i < winningLine.length; i++) {
                                document.getElementById(winningLine[i]).classList.toggle('winningLine');
                            };
                            playerOneWin = true;
                            return;
                        };
                    };
                } else {
                    playerOneWin = false;
                };
            };
            return;
        })();

        const checkPlayerTwoWin = (() => {
            for (let i = 0; i < winningCombinations.length; i++) {
                let newArray = flatten(winningCombinations[i]);
                if(gameBoard.playerTwoSelections.indexOf(newArray[0]) !== -1) {
                    if(gameBoard.playerTwoSelections.indexOf(newArray[1]) !== -1) {
                        if(gameBoard.playerTwoSelections.indexOf(newArray[2]) !== -1) {
                            winningLine = winningCombinations[i];
                            for (let i = 0; i < winningLine.length; i++) {
                                document.getElementById(winningLine[i]).classList.toggle('winningLine');
                            };
                            playerTwoWin = true;
                            return;
                        };
                    };
                } else {
                    playerTwoWin = false;
                };
            };
            return;
        })();
        
        if (playerOneWin === true) {
            console.log('player 1 wins');
            playerTurn.innerText = `${player1name} wins!`;
            resetBoard();
            gameBoard.resetPlayers();
        } else if (playerTwoWin === true) {
            console.log('player 2 wins');
            playerTurn.innerText = `${player2name} wins!`;
            resetBoard();
            gameBoard.resetPlayers();
        } else if (!playerOneWin && !playerTwoWin) {
            console.log(`roundCount: ${roundCount}`);
            if(roundCount === 9) {
                console.log('Draw');
                playerTurn.innerText = 'It\'s a draw!';
                resetBoard();
                gameBoard.resetPlayers();
            }
        } else {
            return;
        }

        return {
            playerOneWin,
            playerTwoWin,
            flatten,
            checkPlayerOneWin,
            checkPlayerTwoWin,
            resetBoard,
        };
    };

    function resetBoard() {
        cellElements.forEach(cell => {
            cell.removeEventListener('click', addToBoard, { once: true });
        });
        roundCount = 0;
        displayController.restartBtn.style.display = 'inline';
    };


    return {
        roundCount,
        displayController,
        playerTurn,
        checkWin,
        resetBoard,
    };
})();

/*
// store gameboard in a module
 const gameBoard = (() => {

    // create an array to store the player selections (x's and o's)
    let board = ['','','','','','','','',''];
    
    // create function to update board with array contents
    let updateBoard = function() {
        const boardSquare1 = document.getElementById('cell1');
        const boardSquare2 = document.getElementById('cell2');
        const boardSquare3 = document.getElementById('cell3');
        const boardSquare4 = document.getElementById('cell4');
        const boardSquare5 = document.getElementById('cell5');
        const boardSquare6 = document.getElementById('cell6');
        const boardSquare7 = document.getElementById('cell7');
        const boardSquare8 = document.getElementById('cell8');
        const boardSquare9 = document.getElementById('cell9');
        for (let i = 0; i < board.length; i++ ) {
            boardSquare1.textContent = board[0];
            console.log (boardSquare1.textContent);
            boardSquare2.textContent = board[1];
            boardSquare3.textContent = board[2];
            boardSquare4.textContent = board[3];
            boardSquare5.textContent = board[4];
            boardSquare6.textContent = board[5];
            boardSquare7.textContent = board[6];
            boardSquare8.textContent = board[7];
            boardSquare9.textContent = board[8];
            playerMove.checkWin();
        };
    };

    return {
        board,
        updateBoard,
    };
})();




const Player = (name) => {
    let playerOneNameInput = 'Player 1'
    let playerTwoNameInput = 'Player 2'


    return {
        playerOneNameInput,
        playerTwoNameInput,
    };
};

// create another module for the game flow
const playerMove = (() => {
    const playerTurn = document.getElementById('player-turn');

    // create variable to keep track of turns
    let x_turn = true;
    let roundCount = 0;
    let gameStart = false;
    let playerOne;
    let playerTwo;
    // use DOM to update board array with player selections

    const startGame = document.forms['start-game-form'];
    
    startGame.addEventListener('submit', function(e) {
        e.preventDefault();
        const startBtn = document.getElementById('start-game-btn');
        const playerOneNameInput = startGame.querySelector('[data-player-1-input]')
        const playerTwoNameInput = startGame.querySelector('[data-player-2-input]')
        const playerOneNameInputVal = startGame.querySelector('[data-player-1-input]').value;
        const playerTwoNameInputVal = startGame.querySelector('[data-player-2-input]').value;
        playerOne = playerOneNameInputVal;
        playerTwo = playerTwoNameInputVal;
        playerOneNameInput.style.display = 'none';
        playerTwoNameInput.style.display = 'none';
        startBtn.style.display = 'none';
        gameStart = true;
        playerTurn.innerText =`${playerOneNameInputVal}'s turn`;
    });

    const cellElements = document.querySelectorAll('[data-cell]');
    let cellArray = Array.from(cellElements);
    cellElements.forEach(cell => {
        cell.addEventListener('click', handleClick, { once: true })
    });

    function handleClick(e) {
        if (gameStart) {
        const cell = e.target
        addToBoard(cell);
        };
    };

    function addToBoard(cell) {
        let numba; = cellArray.indexOf(cell)
        if(x_turn) {
            gameBoard.board[numba] = 'x';
            gameBoard.updateBoard();
            x_turn = false;
            playerTurn.innerText = `${playerTwo}'s turn`;
            checkWin();
            roundCount++;
            console.log(roundCount);
        } else if (!x_turn) {
            gameBoard.board[numba] = 'o';
            gameBoard.updateBoard();
            x_turn = true;
            playerTurn.innerText =`${playerOne}'s turn`;
            checkWin();
            roundCount++
            console.log(roundCount);
        };
    };

    // create function to freeze board once game ends
    function deactivateCells() {
        cellElements.forEach(cell => {
        cell.removeEventListener('click', handleClick, { once: true })
        });
    };

    // create function to check for win
    function checkWin() {
        let restartBtn = document.getElementById('restart-btn');
        restartBtn.addEventListener('click', () => {
            resetGame();
        })

        function resetGame() {
            gameBoard.board = ['','','','','','','','',''];
            gameBoard.updateBoard();
            cellElements.forEach(cell => {
                cell.addEventListener('click', handleClick, { once: true })
                });
            roundCount = 0;
        };

        restartBtn.style.visibility = 'hidden';
        
        if(gameBoard.board[0]== 'x' && gameBoard.board[1] == 'x' && gameBoard.board[2] == 'x') {
            playerTurn.innerText = `${playerOne} wins!`;
            deactivateCells();
            restartBtn.style.visibility = 'visible';
            
        } else if (gameBoard.board[0]== 'o' && gameBoard.board[1] == 'o' && gameBoard.board[2] == 'o') {
            playerTurn.innerText = `${playerTwo} wins!`;
            deactivateCells();
            restartBtn.style.visibility = 'visible';
            
        } else if (gameBoard.board[3]== 'x' && gameBoard.board[4] == 'x' && gameBoard.board[5] == 'x') {
            playerTurn.innerText = `${playerOne} wins`;
            deactivateCells();
            restartBtn.style.visibility = 'visible';
            
        } else if (gameBoard.board[3]== 'o' && gameBoard.board[4] == 'o' && gameBoard.board[5] == 'o') {
            playerTurn.innerText = `${playerTwo} wins!`;
            deactivateCells();
            restartBtn.style.visibility = 'visible';
            
        } else if (gameBoard.board[6]== 'x' && gameBoard.board[7] == 'x' && gameBoard.board[8] == 'x') {
            playerTurn.innerText = `${playerOne} wins`;
            deactivateCells();
            restartBtn.style.visibility = 'visible';
            
        } else if (gameBoard.board[6]== 'o' && gameBoard.board[7] == 'o' && gameBoard.board[8] == 'o') {
            playerTurn.innerText = `${playerTwo} wins!`;
            deactivateCells();
            restartBtn.style.visibility = 'visible';
            
        } else if (gameBoard.board[0]== 'x' && gameBoard.board[3] == 'x' && gameBoard.board[6] == 'x') {
            playerTurn.innerText = `${playerOne} wins`;
            deactivateCells();
            restartBtn.style.visibility = 'visible';
            
        } else if (gameBoard.board[0]== 'o' && gameBoard.board[3] == 'o' && gameBoard.board[6] == 'o') {
            playerTurn.innerText = `${playerTwo} wins!`;
            deactivateCells();
            restartBtn.style.visibility = 'visible';
            
        } else if (gameBoard.board[1]== 'x' && gameBoard.board[4] == 'x' && gameBoard.board[7] == 'x') {
            playerTurn.innerText = `${playerOne} wins`;
            deactivateCells();
            restartBtn.style.visibility = 'visible';
            
        } else if (gameBoard.board[1]== 'o' && gameBoard.board[4] == 'o' && gameBoard.board[7] == 'o') {
            playerTurn.innerText = `${playerTwo} wins!`;
            deactivateCells();
            restartBtn.style.visibility = 'visible';
            
        } else if (gameBoard.board[2]== 'x' && gameBoard.board[5] == 'x' && gameBoard.board[8] == 'x') {
            playerTurn.innerText = `${playerOne} wins`;
            deactivateCells();
            restartBtn.style.visibility = 'visible';
            
        } else if (gameBoard.board[2]== 'o' && gameBoard.board[5] == 'o' && gameBoard.board[8] == 'o') {
            playerTurn.innerText = `${playerTwo} wins!`;
            deactivateCells();
            restartBtn.style.visibility = 'visible';
            
        } else if (gameBoard.board[0]== 'x' && gameBoard.board[4] == 'x' && gameBoard.board[8] == 'x') {
            playerTurn.innerText = `${playerOne} wins`;
            deactivateCells();
            restartBtn.style.visibility = 'visible';
            
        } else if (gameBoard.board[0]== 'o' && gameBoard.board[4] == 'o' && gameBoard.board[8] == 'o') {
            playerTurn.innerText = `${playerTwo} wins!`;
            deactivateCells();
            restartBtn.style.visibility = 'visible';
            
        } else if (gameBoard.board[2]== 'x' && gameBoard.board[4] == 'x' && gameBoard.board[6] == 'x') {
            playerTurn.innerText = `${playerOne} wins`;
            deactivateCells();
            restartBtn.style.visibility = 'visible';
            
        } else if (gameBoard.board[2]== 'o' && gameBoard.board[4] == 'o' && gameBoard.board[6] == 'o') {
            playerTurn.innerText = `${playerTwo} wins!`;
            deactivateCells();
            restartBtn.style.visibility = 'visible';
            
        } else if (roundCount = 9 && gameBoard.board.includes('') == false) {
            playerTurn.innerText = 'Draw!';
            deactivateCells();
            restartBtn.style.visibility = 'visible';
            
        }
    };

    return {
        playerTurn,
        roundCount,
        cellArray,
        handleClick,
        deactivateCells,
        addToBoard,
        checkWin,
    }  
})();

gameBoard.updateBoard();

///////////////////////////
function checkWin() {
    if(board[0]== 'x' && board[1] == 'x' && board[3] == 'x') {
            return;
        } else if (board[0]== 'o' && board[1] == 'o' && board[3] == 'o') {
            return;
        } else if (board[3]== 'x' && board[4] == 'x' && board[5] == 'x') {
            return;
        } else if (board[3]== 'o' && board[4] == 'o' && board[5] == 'o') {
            return;
        } else if (board[6]== 'x' && board[7] == 'x' && board[8] == 'x') {
            return;
        } else if (board[6]== 'o' && board[7] == 'o' && board[8] == 'o') {
            return;
        } else if (board[0]== 'x' && board[3] == 'x' && board[6] == 'x') {
            return;
        } else if (board[0]== 'o' && board[3] == 'o' && board[6] == 'o') {
            return;
        } else if (board[1]== 'x' && board[4] == 'x' && board[7] == 'x') {
            return;
        } else if (board[1]== 'o' && board[4] == 'o' && board[7] == 'o') {
            return;
        } else if (board[2]== 'x' && board[5] == 'x' && board[8] == 'x') {
            return;
        } else if (board[2]== 'o' && board[5] == 'o' && board[8] == 'o') {
            return;
        } else if (board[0]== 'x' && board[4] == 'x' && board[8] == 'x') {
            console.log("x wins");
        } else if (board[0]== 'o' && board[4] == 'o' && board[8] == 'o') {
            return;
        } else if (board[2]== 'x' && board[4] == 'x' && board[6] == 'x') {
            return;
        } else if (board[2]== 'o' && board[4] == 'o' && board[6] == 'o') {
            return;
        }
};

checkWin();

*/