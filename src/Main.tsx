import React from 'react';
import styled from 'styled-components';
import Tile from '^/components/atoms/Tile';

import Around1Png from '^/assets/tile-context/1.png';
import Around2Png from '^/assets/tile-context/2.png';
import Around3Png from '^/assets/tile-context/3.png';
import Around4Png from '^/assets/tile-context/4.png';
import Around5Png from '^/assets/tile-context/5.png';
import Around6Png from '^/assets/tile-context/6.png';
import Around7Png from '^/assets/tile-context/7.png';
import Around8Png from '^/assets/tile-context/8.png';
import MarkPng from '^/assets/tile-context/mark.png';
import MinePng from '^/assets/tile-context/mine.png';

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

const BoardContainer = styled.div`
  width: 100vmin;
  height: 100vmin;

  display: grid;
  grid-template-rows: repeat(4, 1fr);
  grid-template-columns: repeat(3, 1fr);
`;

const ContextImage = styled.img`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
`;

function Main() {
  return (
    <Root>
      <BoardContainer>
        <Tile>
          <ContextImage src={Around1Png} />
        </Tile>
        <Tile>
          <ContextImage src={Around2Png} />
        </Tile>
        <Tile>
          <ContextImage src={Around3Png} />
        </Tile>
        <Tile>
          <ContextImage src={Around4Png} />
        </Tile>
        <Tile>
          <ContextImage src={Around5Png} />
        </Tile>
        <Tile>
          <ContextImage src={Around6Png} />
        </Tile>
        <Tile>
          <ContextImage src={Around7Png} />
        </Tile>
        <Tile>
          <ContextImage src={Around8Png} />
        </Tile>
        <Tile>
          <ContextImage src={MarkPng} />
        </Tile>
        <Tile>
          <ContextImage src={MinePng} />
        </Tile>
      </BoardContainer>
    </Root>
  );
}

export default Main;
