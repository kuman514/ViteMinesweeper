import React from 'react';
import styled from 'styled-components';

import { GAME_BOARD_HEADER_SIZE } from '^/constants/size';
import BoardHeaderButton from '^/components/atoms/BoardHeaderButton';
import ContextImage from '^/components/atoms/ContextImage';
import { useGameStore } from '^/store/game';
import { useModalStore } from '^/store/modal';
import { ModalType } from '^/types';

import ResetPng from '^/assets/board-header/reset.png';
import ResetCompletePng from '^/assets/board-header/reset-complete.png';
import ResetFailedPng from '^/assets/board-header/reset-failed.png';
import ConfigPng from '^/assets/board-header/config.png';

const Root = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: ${GAME_BOARD_HEADER_SIZE};
`;

const BoardNumericDisplayWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 7vmin;
  height: 100%;
  background-color: black;
  color: red;
  font-weight: bolder;
  font-size: 3vmin;
  font-variant-numeric: tabular-nums;
`;

const SemanticEmpty = styled.div`
  width: 7vmin;
`;

const BoardHeaderButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  column-gap: 1vmin;
  height: 100%;
`;

function BoardHeader() {
  const width = useGameStore((state) => state.width);
  const height = useGameStore((state) => state.height);
  const mines = useGameStore((state) => state.mines);
  const isContinuable = useGameStore((state) => state.isContinuable);
  const isCompleted = useGameStore((state) => state.isCompleted);
  const remainingMines = useGameStore((state) => state.remainingMines);

  const resetGame = useGameStore((state) => state.resetGame);
  const setModalType = useModalStore((state) => state.setModalType);

  const resetPngUrl = (() => {
    if (isContinuable) {
      return ResetPng;
    }

    if (isCompleted) {
      return ResetCompletePng;
    }

    return ResetFailedPng;
  })();

  return (
    <Root>
      <BoardNumericDisplayWrapper>{remainingMines}</BoardNumericDisplayWrapper>
      <BoardHeaderButtonWrapper>
        <BoardHeaderButton onClick={() => resetGame({ width, height, mines })}>
          <ContextImage src={resetPngUrl} />
        </BoardHeaderButton>
        <BoardHeaderButton onClick={() => setModalType(ModalType.GAME_CONFIG)}>
          <ContextImage src={ConfigPng} />
        </BoardHeaderButton>
      </BoardHeaderButtonWrapper>
      <SemanticEmpty />
    </Root>
  );
}

export default BoardHeader;
