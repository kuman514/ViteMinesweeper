import React, { ReactNode } from 'react';
import styled from 'styled-components';

import TilePng from '^/assets/tile/tile.png';
import TileHoverPng from '^/assets/tile/tile-hover.png';
import TileDisabledPng from '^/assets/tile/tile-disabled.png';
// import Around1Png from '^/assets/tile-context/1.png';
// import Around2Png from '^/assets/tile-context/2.png';
// import Around3Png from '^/assets/tile-context/3.png';
// import Around4Png from '^/assets/tile-context/4.png';
// import Around5Png from '^/assets/tile-context/5.png';
// import Around6Png from '^/assets/tile-context/6.png';
// import Around7Png from '^/assets/tile-context/7.png';
// import Around8Png from '^/assets/tile-context/8.png';
// import MarkPng from '^/assets/tile-context/mark.png';
// import MinePng from '^/assets/tile-context/mine.png';

const Root = styled.button`
  all: unset;

  box-sizing: border-box;
  width: 100%;
  height: 100%;

  background: url(${TilePng});
  background-size: 100% 100%;

  cursor: pointer;

  &:hover {
    background: url(${TileHoverPng});
    background-size: 100% 100%;
  }

  &:disabled {
    background: url(${TileDisabledPng});
    background-size: 100% 100%;
  }
`;

interface Props {
  // row: number;
  // col: number;
  children?: ReactNode;
}

function Tile({ children }: Props) {
  return (
    <Root>{children}</Root>
  );
}

export default Tile;
