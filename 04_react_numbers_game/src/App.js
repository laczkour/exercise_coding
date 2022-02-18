import { useRef, useState } from "react";
import "./App.css";
import Board from "./Board/Board";

const defaultOptions = {
  boardSize: 6,
  minimum: -10,
  maximum: 30,
};

const _rand = (min, max) => Math.floor(Math.random() * (max - min) + min);

const _generateGameBoard = ({ boardSize, minimum, maximum }) => {
  const board = Array.from(Array(boardSize), () => new Array(boardSize));
  for (let i = 0; i < boardSize; ++i) {
    for (let j = 0; j < boardSize; ++j) {
      board[i][j] = _rand(minimum, maximum);
    }
  }
  return board;
};

const _generatePlayer = (name) => {
  return {
    name: name,
    score: 0,
  };
};

const _generateInitialGameState = () => {
  const result = {
    options: defaultOptions,
    initialBoard: _generateGameBoard({ ...defaultOptions }),
    players: [_generatePlayer("player1"), _generatePlayer("player2")],
    next: {
      playerIndex: 0,
      rowOrColumn: "any",
      rowOrColumnIndex: -1,
    },
    moves: [],
  };

  result.board = result.initialBoard.map((row) =>
    row.map((square) => {
      return {
        value: square,
        valid: _rand(0, 4) === 1 ? true : false,
        used: _rand(0, 4) === 1 ? true : false,
      };
    })
  );

  console.log(result.board);
  return result;
};

function App() {
  const [gameState, setGameState] = useState(_generateInitialGameState());
  const currentGameState = useRef(null);

  currentGameState.current = gameState;

  const squarePressed = (rowIndex, columnIndex) => {
    const gs = { ...currentGameState.current };
    console.log(rowIndex, columnIndex);
    console.log(gs.board[rowIndex][columnIndex]);
    gs.board[rowIndex][columnIndex].used = true;
    setGameState(gs);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Szám összeadós kivonós játék</h1>
      </header>
      <main>
        <Board gameState={gameState} onClick={squarePressed} />
      </main>
    </div>
  );
}

export default App;
