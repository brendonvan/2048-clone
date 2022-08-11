console.log('JS:loaded');
/** 
 * @author Brendon Van
 * 
 * @description
 * The following program contains the source code for a game called 2048.
 * It is played on a 4x4 grid using the arrows of W, A, S, D keys alternatively.
 * Everytime you press a key - all tiles slide. Tiles with the same value that bump into one-another are merged.
 * For the player to win, they will have to get one of the tiles to 2048.
*/

// Declare Variables
const GRID_LIMIT_UP = 0;
const GRID_LIMIT_DOWN = 3;
const GRID_LIMIT_LEFT = 0;
const GRID_LIMIT_RIGHT = 3;
let score = 0;
let highScore = 0;
let isGameActive = true;
let key;
let grid = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
];
let helper = 0;
let allowAnimation = 1;

// DOM Elements
let gridCell = document.querySelectorAll('.grid-cell');
let viewScore = document.querySelector('.score :last-child');
let addPoints = document.querySelector('.add-points :last-child');
let viewHighScore = document.querySelector('.highscore :last-child');
let newGameButton = document.querySelector('.new-game-button');
let featureButton = document.querySelector('.feature-button');
let wonScreen = document.querySelector('.won-screen');
let lostScreen = document.querySelector('.lost-screen');
let helperContainer = document.querySelector('.helper-container');
let helperProbability = document.querySelectorAll('h3');
let tryAgainButtonWon = document.querySelector('.won-screen .new-game-button');
let tryAgainButtonLost = document.querySelector('.lost-screen .new-game-button');

// START GAME
addPoints.style.transform = 'translateY(-500%)';
addRandomTile();
addRandomTile();
updateView(grid);

// DOM Event Listeners
newGameButton.addEventListener('click', resetGame);
featureButton.addEventListener('click', helperToggle)
tryAgainButtonWon.addEventListener('click', resetGame);
tryAgainButtonLost.addEventListener('click', resetGame);

// UP DOWN LEFT RIGHT Controls
document.addEventListener('keydown', function(event) { 
    key = event.key; // "ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown"
    switch (event.key) {
        case "ArrowUp":
            if (!isGameActive) {return}
            allowAnimation = 1;
            if (moveTilesUp(grid)) {addRandomTile()};
            checkWinCondition(grid);
            updateScore();
            updateView(grid);
            checkGameOver();
            // guessNextBestMove();
            break;
        case "ArrowDown":
            if (!isGameActive) {return}
            allowAnimation = 1;
            if (moveTilesDown(grid)) {addRandomTile()};
            checkWinCondition(grid);
            updateScore()
            updateView(grid);
            checkGameOver();
            // guessNextBestMove();
            break;
        case "ArrowLeft":
            if (!isGameActive) {return}
            allowAnimation = 1;
            if (moveTilesLeft(grid)) {addRandomTile()};
            checkWinCondition(grid);
            updateScore()
            updateView(grid);
            checkGameOver();
            // guessNextBestMove();
            break;
        case "ArrowRight":
            if (!isGameActive) {return}
            allowAnimation = 1;
            if (moveTilesRight(grid)) {addRandomTile()};
            checkWinCondition(grid);
            updateScore()
            updateView(grid);
            checkGameOver();
            // guessNextBestMove();
            break;
    }
});

// W A S D Controls 
document.addEventListener('keydown', function(event) { 
    key = event.code; // "KeyW", "KeyA", "KeyS", or "KeyD"
    switch (event.code) {
        case "KeyW":
            if (!isGameActive) {return}
            allowAnimation = 1;
            if (moveTilesUp(grid)) {addRandomTile()};
            checkWinCondition(grid);
            updateScore();
            updateView(grid);
            checkGameOver();
            // guessNextBestMove();
            break;
        case "KeyS":
            if (!isGameActive) {return}
            allowAnimation = 1;
            if (moveTilesDown(grid)) {addRandomTile()};
            checkWinCondition(grid);
            updateScore()
            updateView(grid);
            checkGameOver();
            // guessNextBestMove();
            break;
        case "KeyA":
            if (!isGameActive) {return}
            allowAnimation = 1;
            if (moveTilesLeft(grid)) {addRandomTile()};
            checkWinCondition(grid);
            updateScore()
            updateView(grid);
            checkGameOver();
            // guessNextBestMove();
            break;
        case "KeyD":
            if (!isGameActive) {return}
            allowAnimation = 1;
            if (moveTilesRight(grid)) {addRandomTile()};
            checkWinCondition(grid);
            updateScore()
            updateView(grid);
            checkGameOver();
            // guessNextBestMove();
            break;
    }
});

// Updates game logic grid
function updateGrid(board, row, column, newValue) { 
    board[row][column] = newValue;
}

// Updates player's view to game logic grid
function updateView(arr) {
    let viewGrid = arr.flat();
    gridCell.forEach(cell => {
        // Add classes to each tile-value accordingly.
        let cellIndex = cell.dataset.cell;
        cell.removeAttribute('class');
        cell.classList.add('grid-cell');
        cell.classList.add(`tile-${viewGrid[cellIndex]}`);
        // If grid value equals 0, no tile is made.
        if (viewGrid[cellIndex] === 0) {
            cell.innerHTML = '';
        } else { 
            // If grid does have a value, add value from grid to player's screen
            cell.innerHTML = viewGrid[cellIndex];
        }
    })
}

// Updates score and highscore on player's screen
function updateScore() {
    if (score > highScore) {
        highScore = score;
    }
    viewScore.innerHTML = score;
    viewHighScore.innerHTML = highScore;
}

// Shows animation when points are added
function addPointAnimaton(pointsAdded) {
    addPoints.style.transition = '';
    addPoints.style.transform = '';
    addPoints.innerHTML = `+${pointsAdded}`
    setTimeout(function() {
        addPoints.style.transition = 'transform 1s linear';
        addPoints.style.transform = 'translateY(-500%)';
    }, 10);
}

// Adds random tile, if there's no tiles left check if the game is over
function addRandomTile() {
    let emptyCells = getAllEmptyCells(grid);
    let i = randomNumberBetween(0, emptyCells.length - 1);
    let randomNumber = Math.random();
    
    // if no zeros on board check if game's over
    if (emptyCells.length === 0) {
        checkGameOver();
    } else if (randomNumber < 0.9) { // 90% Chance to get 2
        updateGrid(grid, emptyCells[i].row, emptyCells[i].column, 2);
    } else { // 10% Chance to get 4
        emptyCells[i].value = 4;
        updateGrid(grid, emptyCells[i].row, emptyCells[i].column, 4);
    }
}

// Move Tiles Up
function moveTilesUp(board) {
    // Array of current tiles
    let tiles = getAllTiles(board); 
    // If a tile moved, increment.
    let movedPieces = 0;
    // For each tile, if a tile can move up, move up while it can. 
    for (let i = 0; i < tiles.length; i++) {
        if (tiles[i].row !== GRID_LIMIT_UP) {
            while (tiles[i].row !== GRID_LIMIT_UP) {
                let valueAbove = board[tiles[i].row - 1][tiles[i].column];
                // If a tile above it is the same value, merge them. Else if, move until GRID limit.
                if (valueAbove === tiles[i].value) {
                    let valueSum = tiles[i].value + valueAbove;
                    let previousRow = tiles[i].row;
                    // Move tile up 1 row.
                    tiles[i].row--;
                    movedPieces++;
                    score += valueSum;
                    // Allow animation if this grid is the player's view.
                    if (allowAnimation === 1) {addPointAnimaton(valueSum)}
                    // Update Grid
                    updateGrid(board, tiles[i].row, tiles[i].column, valueSum);
                    updateGrid(board, previousRow, tiles[i].column, 0);
                } else if (valueAbove === GRID_LIMIT_UP){
                    let previousRow = tiles[i].row;
                    tiles[i].row--;
                    movedPieces++;
                    // Update Grid
                    updateGrid(board, tiles[i].row, tiles[i].column, tiles[i].value);
                    updateGrid(board, previousRow, tiles[i].column, 0);
                } else {
                    break;
                }
            } //while
        } else {
            continue;
        } //if
    } //for loop
    console.log('Up');
    return movedPieces;
}

// Move Tiles Down
function moveTilesDown(board) {
    // Array of current tiles
    let tiles = getAllTiles(board).reverse(); 
    let movedPieces = 0;
    for (let i = 0; i < tiles.length; i++) {
        if (tiles[i].row !== GRID_LIMIT_DOWN) {
            while (tiles[i].row !== GRID_LIMIT_DOWN) {
                let valueBelow = board[tiles[i].row + 1][tiles[i].column];
                if (valueBelow === tiles[i].value) {
                    let valueSum = tiles[i].value + valueBelow;
                    let previousRow = tiles[i].row;
                    tiles[i].row += 1;
                    movedPieces++;
                    score += valueSum;
                    if (allowAnimation === 1) {addPointAnimaton(valueSum)}
                    updateGrid(board, tiles[i].row, tiles[i].column, valueSum);
                    updateGrid(board, previousRow, tiles[i].column, 0);

                } else if (valueBelow === 0){
                    let previousRow = tiles[i].row;
                    tiles[i].row += 1;
                    movedPieces++;
                    updateGrid(board, tiles[i].row, tiles[i].column, tiles[i].value);
                    updateGrid(board, previousRow, tiles[i].column, 0);
                } else {
                    break;
                }
            }
        } else {
            continue;
        }
    }
    console.log('Down');
    return movedPieces;
}

// Move Tiles Left
function moveTilesLeft(board) {
    // Array of current tiles
    let tiles = getAllTiles(board); 
    let movedPieces = 0;
    for (let i = 0; i < tiles.length; i++) {
        if (tiles[i].column !== GRID_LIMIT_LEFT) {
            while (tiles[i].column !== GRID_LIMIT_LEFT) {
                let valueLSide = board[tiles[i].row][tiles[i].column - 1];
                if (valueLSide === tiles[i].value) {
                    let valueSum = tiles[i].value + valueLSide;
                    let previousColumn = tiles[i].column;
                    tiles[i].column -= 1;
                    movedPieces++;
                    score += valueSum;
                    if (allowAnimation === 1) {addPointAnimaton(valueSum)}
                    updateGrid(board, tiles[i].row, tiles[i].column, valueSum);
                    updateGrid(board, tiles[i].row, previousColumn, 0);

                } else if (valueLSide === 0){
                    let previousColumn = tiles[i].column;
                    tiles[i].column -= 1;
                    movedPieces++;
                    updateGrid(board, tiles[i].row, tiles[i].column, tiles[i].value);
                    updateGrid(board, tiles[i].row, previousColumn, 0);
                } else {
                    break;
                }
            }
        } else {
            continue;
        }
    }
    console.log('Left');
    return movedPieces;
}

// Move Tiles Right
function moveTilesRight(board) {
    // Array of current tiles
    let tiles = getAllTiles(board).reverse(); 
    let movedPieces = 0;
    for (let i = 0; i < tiles.length; i++) {
        if (tiles[i].column !== GRID_LIMIT_RIGHT) {
            while (tiles[i].column !== GRID_LIMIT_RIGHT) {
                let valueRSide = board[tiles[i].row][tiles[i].column + 1];
                if (valueRSide === tiles[i].value) {
                    let valueSum = tiles[i].value + valueRSide;
                    let previousColumn = tiles[i].column;
                    tiles[i].column += 1;
                    movedPieces++;
                    score += valueSum;
                    if (allowAnimation === 1) {addPointAnimaton(valueSum)}
                    updateGrid(board, tiles[i].row, tiles[i].column, valueSum);
                    updateGrid(board, tiles[i].row, previousColumn, 0);

                } else if (valueRSide === 0){
                    let previousColumn = tiles[i].column;
                    tiles[i].column += 1;
                    movedPieces++;
                    updateGrid(board, tiles[i].row, tiles[i].column, tiles[i].value);
                    updateGrid(board, tiles[i].row, previousColumn, 0);
                } else {
                    break;
                }
            }
        } else {
            continue;
        }
    }
    console.log('Right');
    return movedPieces;
}

// Returns an boarday that has all tiles on grid
function getAllTiles(board) {
    let indexes = [];
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] !== 0) { 
                indexes.push({row: i, column: j, value: board[i][j]});
            }
        }
    }
    return indexes;
}

// Returns an array that has all empty cells
function getAllEmptyCells(board) { // Returns array of indexes of value requested
    let indexes = [];
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] === 0) { 
                indexes.push({row: i, column: j, value: 0});
            }
        }
    }
    return indexes;
}

// Returns random number between min and max
function randomNumberBetween(min, max) { 
    return Math.floor(Math.random() * (max - min + 1) + min)
}
  
// Resets game
function resetGame() {
    grid = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ];
    wonScreen.style.zIndex = '-1';
    lostScreen.style.zIndex = '-1';
    score = 0;
    isGameActive = true;
    updateScore();
    addRandomTile();
    addRandomTile();
    updateView(grid);
    console.log('Reset');
}

// Checks if any tile is valued at 2048
function checkWinCondition(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            if (arr[i][j] === 2048) { 
                isGameActive = false;
                console.log("YOU WIN!");
                wonScreen.style.zIndex = '1';
                return true;
            }
        }
    }
}

// Checks if game is over
function checkGameOver() {
    let emptyCells = getAllEmptyCells(grid);
    let foundValue = 0;
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (emptyCells.length === 0) {
                if (checkAboveBlocked(i, j) && checkBelowBlocked(i, j) && checkLeftBlocked(i, j) && checkRightBlocked(i, j)) {
                    foundValue++;
                }
            } 
        }
    }
    // If game over is found.
    if (foundValue === 16) {
        isGameActive = false;
        lostScreen.style.zIndex = '1';
    }
    return foundValue;
}

// Check the tile above, if blocked return true
function checkAboveBlocked(row, column) {
    if (row === 0) {
        return true;
    } else if (grid[row][column] === grid[row - 1][column]) {
        return false;
    } else {
        return true;
    }
}

// Check the tile below, if blocked return true
function checkBelowBlocked(row, column) {
    if (row === 3) {
        return true;
    } else if (grid[row][column] === grid[row + 1][column]) {
        return false;
    } else {
        return true;
    }
}

// Check the tile left, if blocked return true
function checkLeftBlocked(row, column) {
    if (column === 0) {
        return true;
    } else if (grid[row][column] === grid[row][column - 1]) {
        return false;
    } else {
        return true;
    }
}

// Check the tile right, if blocked return true
function checkRightBlocked(row, column) {
    if (column === 3) {
        return true;
    } else if (grid[row][column] === grid[row][column + 1]) {
        return false;
    } else {
        return true;
    }
}

// Toggles help screen
function helperToggle() {
    if (helper === 0) {
        helperContainer.style.display = 'flex';
        helper = 1;
    } else {
        helperContainer.style.display = 'none';
        helper = 0;
    }
}

// TODO:
// Checks direction in move argument, tests in a test grid. Scores the direction depending on how many empty cells in the next.
function checkDirection(move) {
    let score = 0;
    // create 4 copy grids of original grid.
    // check all directions and which direction is the best outcome.
    let testGrid = grid;
    let allEmptyCells = getAllEmptyCells(testGrid);

    // create copy grid
    // if up merges return how many tiles merged score++
    // if up keeps largest number in corner score ++
    // if can't move return score = 0;
    allowAnimation = -1;
    move(testGrid);
    console.log(testGrid);
    allEmptyCells.forEach(() => (score++));
    checkNearEdge(testGrid, checkLargestNumber(testGrid)) ? score + 1 : score;
    return score;
}

//checkDirection(moveTilesUp);
// checkDirection(moveTilesDown);
// checkDirection(moveTilesLeft);
// checkDirection(moveTilesRight);
// guessNextBestMove();
// guessNextBestMove();
// guessNextBestMove();
// guessNextBestMove();

// TODO:
// Changes the probability of what would be the best next move
function guessNextBestMove() {
    let scoreUp = checkDirection(moveTilesUp);
    let scoreDown = checkDirection(moveTilesDown);
    let scoreLeft = checkDirection(moveTilesLeft);
    let scoreRight = checkDirection(moveTilesRight);

    let scoreSum = scoreUp + scoreDown + scoreLeft + scoreRight;

    console.log(helperProbability[0].innerHTML = `Survival Rate ${((scoreUp / scoreSum) * 100).toFixed(2)}%`);
    console.log(helperProbability[1].innerHTML = `Survival Rate ${((scoreDown / scoreSum) * 100).toFixed(2)}%`);
    console.log(helperProbability[2].innerHTML = `Survival Rate ${((scoreLeft / scoreSum) * 100).toFixed(2)}%`);
    console.log(helperProbability[3].innerHTML = `Survival Rate ${((scoreRight / scoreSum) * 100).toFixed(2)}%`);
    console.log('Guessed');
}

// TODO:
// Checks the grid for the largest number
function checkLargestNumber(board) {
    let largestNumber = 0;
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] > largestNumber) { 
                largestNumber = board[i][j];
            }
        }
    }
    return largestNumber;
}

// TODO:

// Checks if thee number is near the edges of the grid
function checkNearEdge(board, number) {
    if (number === board[0][0] || number === board[0][1] || number === board[0][2] || number === board[0][3]) {
        return true;
    } else if (number === board[0][0] || number === board[1][0] || number === board[2][0] || number === board[3][0]) {
        return true;
    } else if (number === board[0][3] || number === board[1][3] || number === board[2][3] || number === board[3][3]) {
        return true;
    } else if (number === board[3][0] || number === board[3][1] || number === board[3][2] || number === board[3][3]) {
        return true;
    } else {
        return false;
    }
}