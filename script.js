// store gameboard in a module
const gameBoard = (() => {

    // create an array to store the player selections (x's and o's)
    let board = ['','','','','','','','',''];
    
    // create function to update board with array contents
    const updateBoard = function() {
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

// create another module for the game flow
const playerMove = (() => {
    const playerTurn = document.getElementById('player-turn');

    // create variable to keep track of turns
    let x_turn = true;
    let roundCount = 0;
    // use DOM to update board array with player selections
    const cellElements = document.querySelectorAll('[data-cell]');
    let cellArray = Array.from(cellElements);
    cellElements.forEach(cell => {
        cell.addEventListener('click', handleClick, { once: true })
    });

    function handleClick(e) {
        const cell = e.target
        addToBoard(cell);
    };

    function addToBoard(cell) {
        let numba = cellArray.indexOf(cell);
        if(x_turn) {
            gameBoard.board[numba] = 'x';
            gameBoard.updateBoard();
            x_turn = false;
            playerTurn.innerText = 'Player O\'s turn';
            checkWin();
            roundCount++;
            console.log(roundCount);
        } else if (!x_turn) {
            gameBoard.board[numba] = 'o';
            gameBoard.updateBoard();
            x_turn = true;
            playerTurn.innerText = 'Player X\'s turn';
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
        if(gameBoard.board[0]== 'x' && gameBoard.board[1] == 'x' && gameBoard.board[2] == 'x') {
            playerTurn.innerText = 'X wins!';
            deactivateCells();
        } else if (gameBoard.board[0]== 'o' && gameBoard.board[1] == 'o' && gameBoard.board[2] == 'o') {
            playerTurn.innerText = 'O wins!';
            deactivateCells();
        } else if (gameBoard.board[3]== 'x' && gameBoard.board[4] == 'x' && gameBoard.board[5] == 'x') {
            playerTurn.innerText = 'X wins!';
            deactivateCells();
        } else if (gameBoard.board[3]== 'o' && gameBoard.board[4] == 'o' && gameBoard.board[5] == 'o') {
            playerTurn.innerText = 'O wins!';
            deactivateCells();
        } else if (gameBoard.board[6]== 'x' && gameBoard.board[7] == 'x' && gameBoard.board[8] == 'x') {
            playerTurn.innerText = 'X wins!';
            deactivateCells();
        } else if (gameBoard.board[6]== 'o' && gameBoard.board[7] == 'o' && gameBoard.board[8] == 'o') {
            playerTurn.innerText = 'O wins!';
            deactivateCells();
        } else if (gameBoard.board[0]== 'x' && gameBoard.board[3] == 'x' && gameBoard.board[6] == 'x') {
            playerTurn.innerText = 'X wins!';
            deactivateCells();
        } else if (gameBoard.board[0]== 'o' && gameBoard.board[3] == 'o' && gameBoard.board[6] == 'o') {
            playerTurn.innerText = 'O wins!';
            deactivateCells();
        } else if (gameBoard.board[1]== 'x' && gameBoard.board[4] == 'x' && gameBoard.board[7] == 'x') {
            playerTurn.innerText = 'X wins!';
            deactivateCells();
        } else if (gameBoard.board[1]== 'o' && gameBoard.board[4] == 'o' && gameBoard.board[7] == 'o') {
            playerTurn.innerText = 'O wins!';
            deactivateCells();
        } else if (gameBoard.board[2]== 'x' && gameBoard.board[5] == 'x' && gameBoard.board[8] == 'x') {
            playerTurn.innerText = 'X wins!';
            deactivateCells();
        } else if (gameBoard.board[2]== 'o' && gameBoard.board[5] == 'o' && gameBoard.board[8] == 'o') {
            playerTurn.innerText = 'O wins!';
            deactivateCells();
        } else if (gameBoard.board[0]== 'x' && gameBoard.board[4] == 'x' && gameBoard.board[8] == 'x') {
            playerTurn.innerText = 'X wins!';
            deactivateCells();
        } else if (gameBoard.board[0]== 'o' && gameBoard.board[4] == 'o' && gameBoard.board[8] == 'o') {
            playerTurn.innerText = 'O wins!';
            deactivateCells();
        } else if (gameBoard.board[2]== 'x' && gameBoard.board[4] == 'x' && gameBoard.board[6] == 'x') {
            playerTurn.innerText = 'X wins!';
            deactivateCells();
        } else if (gameBoard.board[2]== 'o' && gameBoard.board[4] == 'o' && gameBoard.board[6] == 'o') {
            playerTurn.innerText = 'O wins!';
            deactivateCells();
        } else if (roundCount = 9 && gameBoard.board.includes('') == false) {
            playerTurn.innerText = 'Draw!';
            deactivateCells();
        }
    };

    return {
        playerTurn,
        roundCount,
        handleClick,
        deactivateCells,
        addToBoard,
        checkWin,
    }  
})();

gameBoard.updateBoard();


/*function checkWin() {
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