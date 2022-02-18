import BoardRow from "./BoardRow";

function Board({ gameState, onClick }) {
  return gameState.board.map((row, index) => {
    return (
      <BoardRow
        row={row}
        key={index}
        rowIndex={index}
        onClick={onClick}
      ></BoardRow>
    );
  });
}

export default Board;
