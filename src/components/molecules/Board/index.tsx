import React, { ReactNode } from 'react';
import styled from 'styled-components';

import BoardContainer from '^/components/atoms/BoardContainer';
import Tile from '^/components/atoms/Tile';
import BoardHeader from '^/components/molecules/BoardHeader';

import { useGameStore } from '^/store/game';
import { GAME_AREA_PERCENTAGE, GAME_BOARD_HEADER_SIZE } from '^/constants/size';

const Root = styled.div`
  width: ${GAME_AREA_PERCENTAGE + 2}vw;
  height: calc(${GAME_AREA_PERCENTAGE + 2}vh + ${GAME_BOARD_HEADER_SIZE});

  display: flex;
  justify-content: center;
  align-items: center;
`;

const BoardWindow = styled.div`
  background-color: #c3c3c3;
  padding: 1vmin;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  row-gap: 1vmin;
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
      <BoardWindow>
        <BoardHeader />
        <BoardContainer>{tiles}</BoardContainer>
      </BoardWindow>
    </Root>
  );
}

export default Board;
