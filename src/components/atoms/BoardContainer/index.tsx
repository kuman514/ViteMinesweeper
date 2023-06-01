import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface RootProps {
  width: number;
  height: number;
}

const Root = styled.div<RootProps>`
  width: 80%;
  height: 80%;

  display: grid;
  grid-template-columns: repeat(${({ width }) => width}, 1fr);
  grid-template-rows: repeat(${({ height }) => height}, 1fr);
`;

interface Props {
  children?: ReactNode;
}

function BoardContainer({ children }: Props) {
  return (
    <Root width={9} height={9}>
      {children}
    </Root>
  );
}

export default BoardContainer;
