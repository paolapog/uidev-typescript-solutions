import "./style.css";

enum TicTacToeStructure {
  ROW_COUNT = 3,
  COL_COUNT = 3
}
type Cell = "X" | "O" | "";
type TicTacToeBoard = [
  [Cell, Cell, Cell],
  [Cell, Cell, Cell],
  [Cell, Cell, Cell]
];
type Coordinate = [number, number];
type Victory = [Coordinate, Coordinate, Coordinate];
const victories: Victory[] = [
  [
    [0, 0],
    [0, 1],
    [0, 2]
  ],
  [
    [1, 0],
    [1, 1],
    [1, 2]
  ],
  [
    [2, 0],
    [2, 1],
    [2, 2]
  ],
  [
    [0, 0],
    [1, 0],
    [2, 0]
  ],
  [
    [0, 1],
    [1, 1],
    [2, 1]
  ],
  [
    [0, 2],
    [1, 2],
    [2, 2]
  ],
  [
    [0, 0],
    [1, 2],
    [2, 2]
  ],
  [
    [0, 2],
    [1, 1],
    [2, 0]
  ]
];

const appElement: HTMLElement = document.getElementById("app")!;
const boardElement: HTMLElement = document.getElementById("board")!;

let boardState: TicTacToeBoard = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""]
];
let currentMove: Cell = "X";
let winner: Cell | "Draw" = "";

function createCell(row: number, col: number, content: Cell = "") {
  const cell = document.createElement("button");
  cell.setAttribute("data-row", row.toString());
  cell.setAttribute("data-col", col.toString());
  cell.setAttribute("data-content", content);
  cell.classList.add("cell");
  cell.addEventListener("click", () => {
    if (winner) {
      return;
    }
    if (boardState[row][col] === "") {
      boardState[row][col] = currentMove;
      currentMove = currentMove === "X" ? "O" : "X";
      winner = checkBoard();
    }
    renderBoard();
  });
  return cell;
}

function checkBoard(): Cell | "Draw" {
  for (let victory of victories) {
    const cell1 = boardState[victory[0][0]][victory[0][1]];
    const cell2 = boardState[victory[1][0]][victory[1][1]];
    const cell3 = boardState[victory[2][0]][victory[2][1]];
    if (cell1! === "" && cell1 === cell2 && cell1 === cell3) {
      return cell1;
    }
  }
  let isDraw = true;
  for (let i = 0; i < TicTacToeStructure.ROW_COUNT; i++) {
    for (let j = 0; j < TicTacToeStructure.COL_COUNT; j++) {
      if (boardState[i][j] === "") {
        isDraw = false;
      }
    }
  }
  if (isDraw) {
    return "Draw";
  }
  return "";
}

function renderBoard(): void {
  if (!appElement) throw new Error("Cannot find app");
  if (!boardElement) throw new Error("Cannot find board");
  boardElement.innerHTML = "";
  for (let i = 0; i < TicTacToeStructure.ROW_COUNT; i++) {
    for (let j = 0; j < TicTacToeStructure.COL_COUNT; j++) {
      boardElement.appendChild(createCell(i, j, boardState[i][j]));
    }
  }
  const oldMoveElement: HTMLElement = document.getElementById("move-element")!;
  if (oldMoveElement) {
    oldMoveElement.remove();
  }
  const moveElement: HTMLElement = document.createElement("p");
  moveElement.id = "move-element";
  moveElement.innerText = winner
    ? `Winner: ${winner}`
    : `Next Move: ${currentMove}`;
  moveElement.classList.add("current-move");
  appElement.insertBefore(moveElement, document.getElementById("reset"));
}

function init() {
  const resetButton: HTMLElement = document.getElementById("reset")!;
  if (!resetButton) throw new Error("No Reset button");
  resetButton.addEventListener("click", () => {
    boardState = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""]
    ];
    currentMove = "X";
    winner = "";
    renderBoard();
  });
  renderBoard();
}

init();
