import BoardSquare from "./BoardSquare";

function BoardRow({ row, rowIndex, onClick }) {
  return (
    <div className="game-row">
      {row.map((column, index) => {
        return (
          <BoardSquare
            column={column}
            key={index}
            onClick={onClick}
            rowIndex={rowIndex}
            columnIndex={index}
          />
        );
      })}
    </div>
  );
}

export default BoardRow;
