import React from 'react';
import styled from 'styled-components';

import UIButton from '^/components/atoms/UIButton';
import Board from '^/components/molecules/Board';
import { useGameStore } from '^/store/game';

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
  return (
    <Root>
      <Board />
      <UIButton
        onClick={() => resetGame({
          width: 9,
          height: 9,
          mines: 10,
        })}
        label="Reset"
      />
    </Root>
  );
}

export default Main;
