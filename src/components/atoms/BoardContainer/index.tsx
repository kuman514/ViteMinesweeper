import React, { ReactNode } from 'react';
import styled from 'styled-components';

import { useGameStore } from '^/store/game';

interface RootProps {
  width: number;
  height: number;
}

function getCalcWidth({ width, height }: RootProps) {
  return `calc(100% / ${Math.max(width, height)} * ${width})`;
}

function getCalcHeight({ width, height }: RootProps) {
  return `calc(100% / ${Math.max(width, height)} * ${height})`;
}

const Root = styled.div<RootProps>`
  box-sizing: border-box;
  width: ${(props) => getCalcWidth(props)};
  height: ${(props) => getCalcHeight(props)};

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
