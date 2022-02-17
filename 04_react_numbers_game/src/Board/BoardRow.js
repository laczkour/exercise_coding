import BoardSquare from "./BoardSquare";

function BoardRow({ row }) {
  return (
    <div className="game-row">
      {row.map((column, index) => {
        return <BoardSquare column={column} key={index} />;
      })}
    </div>
  );
}

export default BoardRow;
