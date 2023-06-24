import React, { ReactNode } from 'react';
import styled from 'styled-components';

import { useGameStore } from '^/store/game';

interface RootProps {
  width: number;
  height: number;
}

const Root = styled.div<RootProps>`
  width: calc(100% / ${({ width, height }) => Math.max(width, height)} * ${({ width }) => width});
  height: calc(100% / ${({ width, height }) => Math.max(width, height)} * ${({ height }) => height});

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
