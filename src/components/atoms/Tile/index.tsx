import React from 'react';
import styled from 'styled-components';

import TilePng from '^/assets/tile/tile.png';
import TileHoverPng from '^/assets/tile/tile-hover.png';
import TileDisabledPng from '^/assets/tile/tile-disabled.png';

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

// interface Props {
//   row: number;
//   col: number;
// }

function Tile() {
  return (
    <Root />
  );
}

export default Tile;
