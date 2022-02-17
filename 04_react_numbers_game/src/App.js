import { useState } from "react";
import "./App.css";
import Board from "./Board/Board";

const defaultOptions = {
  boardSize: 6,
  minimum: -10,
  maximum: 30,
};

const _rand = (min, max) => Math.floor(Math.random() * (max - min) + min);

const generateGameBoard = ({ boardSize, minimum, maximum }) => {
  const board = Array.from(Array(boardSize), () => new Array(boardSize));
  for (let i = 0; i < boardSize; ++i) {
    for (let j = 0; j < boardSize; ++j) {
      board[i][j] = _rand(minimum, maximum);
    }
  }
  return board;
};

const generatePlayer = (name) => {
  return {
    name: name,
    score: 0,
  };
};

function App() {
  const [gameState, setGameState] = useState({
    options: defaultOptions,
    board: generateGameBoard({ ...defaultOptions }),
    players: [generatePlayer("player1"), generatePlayer("player2")],
    next: {
      playerIndex: 0,
      rowOrColumn: "any",
      rowOrColumnIndex: -1,
    },
  });

  console.log(gameState);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Szám összeadós kivonós játék</h1>
      </header>
      <main>
        <Board gameState={gameState} />
      </main>
    </div>
  );
}

export default App;
