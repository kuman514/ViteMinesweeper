import React from 'react';
import styled from 'styled-components';

import UIButton from '^/components/atoms/UIButton';
import { useConfigStore } from '^/store/config';
import { useGameStore } from '^/store/game';

const Root = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 0.5rem;
`;

function ConfigPopup() {
  const resetGame = useGameStore((state) => state.resetGame);
  const { width, height, mines } = useConfigStore((state) => state.gameConfig);
  const modifyGameConfig = useConfigStore((store) => store.modifyGameConfig);

  return (
    <Root>
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
    </Root>
  );
}

export default ConfigPopup;
