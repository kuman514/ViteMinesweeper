import React, { ReactNode } from 'react';
import styled from 'styled-components';

import BoardContainer from '^/components/atoms/BoardContainer';
import Tile from '^/components/atoms/Tile';

import { useGameStore } from '^/store/game';
import { useModalStore } from '^/store/modal';
import { GAME_AREA_PERCENTAGE, GAME_BOARD_HEADER_SIZE } from '^/constants/size';
import BoardHeaderButton from '^/components/atoms/BoardHeaderButton';
import { ModalType } from '^/types';

import ResetPng from '^/assets/board-header/reset.png';
import ConfigPng from '^/assets/board-header/config.png';
import ContextImage from '^/components/atoms/ContextImage';

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

const BoardHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: ${GAME_BOARD_HEADER_SIZE};
`;

const BoardHeaderButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  column-gap: 1vmin;
  height: 100%;
`;

function Board() {
  const width = useGameStore((state) => state.width);
  const height = useGameStore((state) => state.height);
  const mines = useGameStore((state) => state.mines);
  const resetGame = useGameStore((state) => state.resetGame);
  const setModalType = useModalStore((state) => state.setModalType);

  const tiles: ReactNode[] = [];
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      tiles.push(<Tile key={`board-tile-r${i}c${j}`} row={i} col={j} />);
    }
  }

  return (
    <Root>
      <BoardWindow>
        <BoardHeader>
          <BoardHeaderButtonWrapper>
            <BoardHeaderButton
              onClick={() => resetGame({ width, height, mines })}
            >
              <ContextImage src={ResetPng} />
            </BoardHeaderButton>
            <BoardHeaderButton
              onClick={() => setModalType(ModalType.GAME_CONFIG)}
            >
              <ContextImage src={ConfigPng} />
            </BoardHeaderButton>
          </BoardHeaderButtonWrapper>
        </BoardHeader>
        <BoardContainer>{tiles}</BoardContainer>
      </BoardWindow>
    </Root>
  );
}

export default Board;
