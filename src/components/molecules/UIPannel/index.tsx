import React from 'react';
import styled from 'styled-components';
import { ButtonGroup } from '@chakra-ui/react';

import UIButton from '^/components/atoms/UIButton';

import { useGameStore } from '^/store/game';
import { useConfigStore } from '^/store/config';
import { useModalStore } from '^/store/modal';
import { ModalType } from '^/types';

const Root = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  margin-top: 1vh;
`;

function UIPanel() {
  const resetGame = useGameStore((state) => state.resetGame);
  const { width, height, mines } = useConfigStore((state) => state.gameConfig);
  const setModalType = useModalStore((state) => state.setModalType);

  return (
    <Root>
      <ButtonGroup>
        <UIButton
          onClick={() => resetGame({ width, height, mines })}
          label="Reset"
        />
        <UIButton
          onClick={() => setModalType(ModalType.GAME_CONFIG)}
          label="Config"
        />
      </ButtonGroup>
    </Root>
  );
}

export default UIPanel;
