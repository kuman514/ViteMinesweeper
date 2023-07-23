import React, { ReactNode } from 'react';
import styled from 'styled-components';

import { useGameStore } from '^/store/game';
import { GAME_BOARD_SIZE } from '^/constants/size';

interface RootProps {
  width: number;
  height: number;
}

function getCalcWidth(width: number) {
  return `calc(${GAME_BOARD_SIZE} / 30 * ${width})`;
}

function getCalcHeight(height: number) {
  return `calc(${GAME_BOARD_SIZE} / 30 * ${height})`;
}

const Root = styled.div<RootProps>`
  box-sizing: border-box;
  width: ${({ width }) => getCalcWidth(width)};
  height: ${({ height }) => getCalcHeight(height)};

  display: grid;
  grid-template-columns: repeat(${({ width }) => width}, 1fr);
  grid-template-rows: repeat(${({ height }) => height}, 1fr);
`;

interface Props {
  children?: ReactNode;
}

function BoardContainer({ children }: Props) {
  const width = useGameStore((state) => state.width);
  const height = useGameStore((state) => state.height);

  return (
    <Root width={width} height={height}>
      {children}
    </Root>
  );
}

export default BoardContainer;
