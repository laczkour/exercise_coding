export const createGameStateBySquarePress = (
  gameState,
  rowIndex,
  columnIndex
) => {
  //const gs = { ...currentGameState.current };
  const gs = { ...gameState };
  const board = gs.board;
  const clickedSquare = board[rowIndex][columnIndex];
  const playerIndex = gs.next.playerIndex;
  const boardSize = gs.options.boardSize;

  if (!clickedSquare.valid || clickedSquare.used) {
    return gs;
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
    gs.players[playerIndex].score += clickedSquare.value;
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

  return gs;
};
