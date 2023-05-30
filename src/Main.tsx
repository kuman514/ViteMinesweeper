import React from 'react';
import styled from 'styled-components';
import Tile from '^/components/atoms/Tile';

const Root = styled.div`
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function Main() {
  return (
    <Root>
      <Tile />
      <Tile />
      <Tile />
    </Root>
  );
}

export default Main;
