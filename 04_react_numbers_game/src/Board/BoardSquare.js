function BoardSquare({ column, columnIndex, rowIndex, onClick }) {
  const validClass = column.valid ? "" : " invalid";
  const usedClass = column.used ? " used" : "";
  return (
    <div
      onClick={() => onClick(rowIndex, columnIndex)}
      className={"game-square" + validClass + usedClass}
      key={columnIndex + rowIndex}
    >
      {column.value}
    </div>
  );
}

export default BoardSquare;
