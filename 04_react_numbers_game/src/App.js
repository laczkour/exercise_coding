import { useRef, useState } from "react";
import "./App.css";
import Board from "./Board/Board";
import { createGameStateBySquarePress } from "./GameLogic/GameLogic";

const defaultOptions = {
  boardSize: 5,
  minimum: -10,
  maximum: 21,
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

const _generateInitialGameState = (size) => {
  const options = defaultOptions;
  options.boardSize = size ?? options.boardSize;
  const result = {
    options: options,
    initialBoard: _generateGameBoard({ ...options }),
    players: [_generatePlayer("Kék"), _generatePlayer("Piros")],
    next: {
      playerIndex: 0,
      rowOrColumn: "any",
      rowOrColumnIndex: -2,
    },
    moves: [],
    victoryText: null,
  };

  result.board = result.initialBoard.map((row) =>
    row.map((square) => {
      return {
        value: square,
        valid: true,
        used: false,
      };
    })
  );

  return result;
};

const initialGameState = _generateInitialGameState();

function App() {
  const [gameState, setGameState] = useState(initialGameState);

  const sizeInput = useRef(null);

  const squarePressed = ({ target }) => {
    const rowIndex = target.getAttribute("data-rowIndex") * 1;
    const columnIndex = target.getAttribute("data-columnIndex") * 1;
    const result = createGameStateBySquarePress(
      gameState,
      rowIndex,
      columnIndex
    );
    setGameState(result);
  };

  const restart = () => {
    const size = sizeInput.current.value * 1;
    setGameState(_generateInitialGameState(size));
  };

  const arr = [0, 1];

  return (
    <div className="App">
      <div className="background"></div>
      <header className="App-header">
        <h1>Szám összeadós kivonós játék</h1>
      </header>
      <main>
        <Board gameState={gameState} onClick={squarePressed} />
        <div className="players">
          {arr.map((i) => {
            const playerName = gameState.players[i].name;
            const isNext = gameState.next.playerIndex === i;
            const score = gameState.players[i].score;
            const isFirst = i === 0;
            const className = isFirst ? "player first-player" : "player";

            return (
              <div className={className} key={i}>
                <h1>{playerName}</h1>
                <div className="score">Pontok: {score}</div>
                {isNext ? <div className="next">Következő</div> : null}
              </div>
            );
          })}
        </div>
        <div className="restart">
          <span>Pálya méret </span>
          <input
            tabIndex={1}
            type="number"
            min={3}
            max={10}
            placeholder="Pálya méret"
            width={100}
            defaultValue={5}
            ref={sizeInput}
          />
          <button tabIndex={0} onClick={restart}>
            Újrakezdés
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;
