import React, { useState } from 'react';
import styled from 'styled-components';

import Board from '^/components/molecules/Board';
import ModalForPopups from '^/components/molecules/ModalForPopups';
import UIButton from '^/components/atoms/UIButton';

import { useGameStore } from '^/store/game';
import { useConfigStore } from '^/store/config';

const Root = styled.div`
  box-sizing: border-box;
  width: 100vmin;
  height: 100vmin;

  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function Main() {
  const resetGame = useGameStore((state) => state.resetGame);
  const { width, height, mines } = useConfigStore((state) => state.gameConfig);
  const [isModalShown, setIsModalShown] = useState<boolean>(false);

  return (
    <Root>
      <Board />
      <UIButton
        onClick={() => resetGame({ width, height, mines })}
        label="Reset"
      />
      <UIButton
        onClick={() => setIsModalShown(!isModalShown)}
        label="Config"
      />
      <ModalForPopups
        isModalShown={isModalShown}
        onCloseClick={() => setIsModalShown(false)}
      />
    </Root>
  );
}

export default Main;
