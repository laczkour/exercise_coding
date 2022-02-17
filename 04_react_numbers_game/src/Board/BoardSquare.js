function BoardSquare({ column, index }) {
  return (
    <div className="game-square" key={index}>
      {column}
    </div>
  );
}

export default BoardSquare;
