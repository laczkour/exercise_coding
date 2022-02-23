function BoardSquare({ column, columnIndex, rowIndex, onClick }) {
  const validClass = column.valid ? "" : " invalid";
  const usedClass = column.used ? " used" : "";
  const colorClass = column.value < 0 ? " negative" : " positive";
  return (
    <div
      onClick={() => onClick(rowIndex, columnIndex)}
      className={"game-square" + validClass + usedClass + colorClass}
      key={columnIndex + rowIndex}
    >
      {column.value}
    </div>
  );
}

export default BoardSquare;
