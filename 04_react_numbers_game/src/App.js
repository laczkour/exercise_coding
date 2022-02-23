import { useRef, useState } from "react";
import "./App.css";
import Board from "./Board/Board";

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

function App() {
  const [gameState, setGameState] = useState(_generateInitialGameState());
  const currentGameState = useRef(null);

  const sizeInput = useRef(null);

  currentGameState.current = gameState;

  const squarePressed = (rowIndex, columnIndex) => {
    const gs = { ...currentGameState.current };
    const board = gs.board;
    const clickedSquare = board[rowIndex][columnIndex];
    const playerIndex = gs.next.playerIndex;
    const boardSize = gs.options.boardSize;

    if (!clickedSquare.valid || clickedSquare.used) {
      return;
    }

    clickedSquare.used = true;
    clickedSquare.valid = false;

    let validColumn;
    let validRow;

    // if this is the second move, they can choose both rows, and columns
    if (gs.next.rowOrColumnIndex === -2) {
      gs.next.rowOrColumnIndex = -1;
      validColumn = columnIndex;
      validRow = rowIndex;
    } else if (gs.next.rowOrColumnIndex === -1) {
      gs.next.rowOrColumnIndex = rowIndex - gs.moves[0].rowIndex === 0 ? 1 : 0;
      validColumn = gs.next.rowOrColumnIndex === 1 ? columnIndex : -1;
      validRow = gs.next.rowOrColumnIndex === 0 ? rowIndex : -1;
    } else {
      gs.next.rowOrColumnIndex = gs.next.rowOrColumnIndex === 0 ? 1 : 0;
      validColumn = gs.next.rowOrColumnIndex === 1 ? columnIndex : -1;
      validRow = gs.next.rowOrColumnIndex === 0 ? rowIndex : -1;
    }

    console.log("row: " + validRow, "column " + validColumn);
    /* calculating the valid squares */
    let atLeastOneValid = false;
    let atLeastOneNotUsed = false;
    for (let row = 0; row < boardSize; row++) {
      for (let column = 0; column < boardSize; column++) {
        const _square = board[row][column];
        if (_square.used) continue;
        const _valid = column === validColumn || row === validRow;
        _square.valid = _valid;
        atLeastOneValid |= _valid;
        atLeastOneNotUsed |= !_square.used;
      }
    }

    if (!atLeastOneNotUsed) {
      gs.victoryText =
        (gs.players[0].score > gs.players[1].score
          ? gs.players[0].name
          : gs.players[1].name) + " Nyert!";
      //game end
    }

    if (!atLeastOneValid) {
      for (let row = 0; row < boardSize; row++) {
        for (let column = 0; column < boardSize; column++) {
          const _square = board[row][column];
          _square.valid = true;
        }
      }
    }

    gs.players[playerIndex].score += clickedSquare.value;
    gs.next.playerIndex = playerIndex === 0 ? 1 : 0;

    gs.moves.push({ rowIndex: rowIndex, columnIndex: columnIndex });

    setGameState(gs);
  };

  const restart = () => {
    const size = parseInt(sizeInput.current.value);
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
