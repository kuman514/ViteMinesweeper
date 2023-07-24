import React, { ReactNode } from 'react';
import styled from 'styled-components';

import BoardContainer from '^/components/atoms/BoardContainer';
import Tile from '^/components/atoms/Tile';

import { useGameStore } from '^/store/game';
import { GAME_AREA_PERCENTAGE } from '^/constants/size';

const Root = styled.div`
  width: ${GAME_AREA_PERCENTAGE + 2}vw;
  height: ${GAME_AREA_PERCENTAGE + 2}vh;

  display: flex;
  justify-content: center;
  align-items: center;
`;

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
    <Root>
      <BoardContainer>{tiles}</BoardContainer>
    </Root>
  );
}

export default Board;
