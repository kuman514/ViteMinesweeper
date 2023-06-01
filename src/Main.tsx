import React from 'react';
import styled from 'styled-components';

import Tile from '^/components/atoms/Tile';
import BoardContainer from './components/atoms/BoardContainer';
import ContextImage from './components/atoms/ContextImage';

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
  width: 100vmin;
  height: 100vmin;

  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const tmpImgSrcs = [
  undefined,
  Around1Png,
  Around2Png,
  Around3Png,
  Around4Png,
  Around5Png,
  Around6Png,
  Around7Png,
  Around8Png,
  MarkPng,
  MinePng,
];

function Main() {
  return (
    <Root>
      <BoardContainer>
        {
          (() => {
            const tmpRenders = [];
            for (let i = 0; i < 9; i++) {
              for (let j = 0; j < 9; j++) {
                const imgUrl = tmpImgSrcs[(9 * i + j) % tmpImgSrcs.length];
                tmpRenders.push(
                  <Tile key={`${i}${j}`}>
                    {
                      imgUrl && <ContextImage src={imgUrl} />
                    }
                  </Tile>,
                );
              }
            }
            return tmpRenders;
          })()
        }
      </BoardContainer>
    </Root>
  );
}

export default Main;
