import BoardRow from "./BoardRow";

function Board({ gameState, onClick }) {
  let className = "game-board";
  if (gameState.next.playerIndex === 1) {
    className += " second-player";
  }
  return (
    <div className={className}>
      {gameState.victoryText !== null ? (
        <div className="victory-text">{gameState.victoryText}</div>
      ) : (
        gameState.board.map((row, index) => {
          return (
            <BoardRow
              row={row}
              key={index}
              rowIndex={index}
              onClick={onClick}
            ></BoardRow>
          );
        })
      )}
    </div>
  );
}

export default Board;
