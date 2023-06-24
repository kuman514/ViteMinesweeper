import React from 'react';
import styled from 'styled-components';

import UIButton from '^/components/atoms/UIButton';
import UINumberSlider from '^/components/atoms/UINumberSlider';

import { useConfigStore } from '^/store/config';
import { useGameStore } from '^/store/game';
import {
  MAX_HEIGHT,
  MAX_WIDTH,
  MIN_HEIGHT,
  MIN_MINES,
  MIN_WIDTH,
} from '^/constants/size';
import { getMaxMines } from '^/utils/size';
import { useModalStore } from '^/store/modal';
import { ModalType } from '^/types';

const Root = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  row-gap: 0.5rem;
`;

function ConfigPopup() {
  const resetGame = useGameStore((state) => state.resetGame);
  const { width, height, mines } = useConfigStore((state) => state.gameConfig);
  const modifyGameConfig = useConfigStore((store) => store.modifyGameConfig);
  const setModalType = useModalStore((store) => store.setModalType);

  return (
    <Root>
      <UINumberSlider
        title="Width"
        value={width}
        minimum={MIN_WIDTH}
        maximum={MAX_WIDTH}
        onChange={(newValue) => {
          modifyGameConfig({
            width: newValue,
            height,
            mines,
          });
        }}
      />
      <UINumberSlider
        title="Height"
        value={height}
        minimum={MIN_HEIGHT}
        maximum={MAX_HEIGHT}
        onChange={(newValue) => {
          modifyGameConfig({
            width,
            height: newValue,
            mines,
          });
        }}
      />
      <UINumberSlider
        title="Mines"
        value={mines}
        minimum={MIN_MINES}
        maximum={getMaxMines(width, height)}
        onChange={(newValue) => {
          modifyGameConfig({
            width,
            height,
            mines: newValue,
          });
        }}
      />
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

export default ConfigPopup;
