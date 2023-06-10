import React from 'react';
import styled from 'styled-components';

import Board from '^/components/molecules/Board';

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
  return (
    <Root>
      <Board />
    </Root>
  );
}

export default Main;
