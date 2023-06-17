import React from 'react';
import styled from 'styled-components';

import UIButton from '^/components/atoms/UIButton';
import Board from '^/components/molecules/Board';
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

const UIPannel = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

function Main() {
  const resetGame = useGameStore((state) => state.resetGame);
  const { width, height, mines } = useConfigStore((state) => state.gameConfig);
  const modifyGameConfig = useConfigStore((store) => store.modifyGameConfig);

  return (
    <Root>
      <Board />
      <UIPannel>
        <div>
          <UIButton
            onClick={() => modifyGameConfig({ width: width - 1, height, mines })}
            label="-"
          />
          Width: {width}
          <UIButton
            onClick={() => modifyGameConfig({ width: width + 1, height, mines })}
            label="+"
          />
        </div>
        <div>
          <UIButton
            onClick={() => modifyGameConfig({ width, height: height - 1, mines })}
            label="-"
          />
          Height: {height}
          <UIButton
            onClick={() => modifyGameConfig({ width, height: height + 1, mines })}
            label="+"
          />
        </div>
        <div>
          <UIButton
            onClick={() => modifyGameConfig({ width, height, mines: mines - 1 })}
            label="-"
          />
          Mines: {mines}
          <UIButton
            onClick={() => modifyGameConfig({ width, height, mines: mines + 1 })}
            label="+"
          />
        </div>
        <UIButton
          onClick={() => resetGame({ width, height, mines })}
          label="Reset"
        />
      </UIPannel>
    </Root>
  );
}

export default Main;
