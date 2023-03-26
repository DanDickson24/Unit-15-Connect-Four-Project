/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  board = [];
  for (let i = 0; i < WIDTH; i++) {
    let height = [];
  for (let j = 0; j < HEIGHT; j++) {
    height.push(null);
    }
    board.push(height);
  }
  return board;
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
const htmlBoard = document.getElementById('board')
  // TODO: add comment for this code
  // here we are creating a new table row element using the set attribute method. Once that new element is created we are adding an event listener witch is looking for clciks in the top of the game board, and when it detects a click it calls the handle click function 
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  for (let x = 0; x < 7; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // TODO: add comment for this code
//  In makeBoard we defined the arrays that reprsent what will become the game board. this particular for loop is creating a grid of 6 rows and 7 columns for our table 
//  each time we make a row we give it an elment of 'tr' and then we create 7 'td' elements to represent the 7 cells in that row (the overall width). we then take that element and give it an id attribute based on it's particular coordinates - then we use append method to add the row as a child of htmlboard
  for (let y = 0; y < 6; y++) {
    const row = document.createElement("tr");
    for (let x = 0; x < 7; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  // this function looks at the bottom row and works up, if the cell at yx is empty it returns y cordinate, if it makes it back to the top it returns null
  for (let y = HEIGHT - 1; y >= 0; y--) {
    if (!board[y][x]) {
      return y;
    }
  }
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  // first we use getElementById to get the HTML element that corresponds with specific coordinates. Then we make a new div and give it a class of piece this ties our code back with the css file so we can change colors based on the player, which in this case will be written p1 or p2. Then we use the append method to append the piece element to the cell so that players piece can be displayed in that particular cell.
const cell = document.getElementById(`${y}-${x}`);
const piece = document.createElement('div');
piece.classList.add('piece');
piece.classList.add(`p${currPlayer}`);
cell.append(piece);
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  alert('Game Over')
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  // I added this line above placeInTable to call to the cordinates of the current player
  board[y][x] = currPlayer;

  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }


  // switch players
  // TODO: switch currPlayer 1 <-> 2
  if (currPlayer === 1 ) {
    currPlayer = 2
  }
    else {
      currPlayer = 1
}

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  // Origninally this function was above the player switching function, I believe
  // this was preventing my game from switching between player 1 and 2
  if (board.every(row => row.every(cell => cell !== null))) {
    endGame()
  }
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.
  // this loop iterates over the game board, it makes four arrays for all of the possible directions that a win could occur. It then uses _win to check each of these arrays to see if any one player has four pieces in a row and has won the game

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
