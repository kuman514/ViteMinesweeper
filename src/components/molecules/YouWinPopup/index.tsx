import React from 'react';
import styled from 'styled-components';

import UIButton from '^/components/atoms/UIButton';

import { useConfigStore } from '^/store/config';
import { useGameStore } from '^/store/game';
import { useModalStore } from '^/store/modal';
import { ModalType } from '^/types';

const Root = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  column-gap: 0.5rem;
`;

function YouWinPopup() {
  const resetGame = useGameStore((state) => state.resetGame);
  const { width, height, mines } = useConfigStore((state) => state.gameConfig);
  const setModalType = useModalStore((store) => store.setModalType);

  return (
    <Root>
      <UIButton
        onClick={() => {
          resetGame({ width, height, mines });
          setModalType(ModalType.OFF);
        }}
        label="Reset"
      />
    </Root>
  );
}

export default YouWinPopup;
