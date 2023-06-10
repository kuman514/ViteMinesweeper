import React, { ReactNode } from 'react';

import BoardContainer from '^/components/atoms/BoardContainer';
import { useGameStore } from '^/store/game';
import Tile from '^/components/atoms/Tile';

function Board() {
  const width = useGameStore((state) => state.width);
  const height = useGameStore((state) => state.height);

  const tiles: ReactNode[] = [];
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      tiles.push(<Tile key={`board-tile-r${i}c${j}`} row={i} col={j} />);
    }
  }

  return (
    <BoardContainer>
      {tiles}
    </BoardContainer>
  );
}

export default Board;
