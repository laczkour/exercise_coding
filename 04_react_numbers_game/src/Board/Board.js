import BoardRow from "./BoardRow";

function Board(props) {
  return props.gameState.board.map((row, index) => {
    return <BoardRow row={row} key={index}></BoardRow>;
  });
}

export default Board;
