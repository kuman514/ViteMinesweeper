import React from 'react';
import styled from 'styled-components';

import Board from '^/components/molecules/Board';
import ModalForPopups from '^/components/molecules/ModalForPopups';
import UIPanel from '^/components/molecules/UIPannel';

const Root = styled.div`
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;

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
      <UIPanel />
      <ModalForPopups />
    </Root>
  );
}

export default Main;
