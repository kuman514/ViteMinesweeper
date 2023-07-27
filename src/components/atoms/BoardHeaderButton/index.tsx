import React, { ReactNode } from 'react';
import styled from 'styled-components';

import TilePng from '^/assets/tile/tile.png';
import TileHoverPng from '^/assets/tile/tile-hover.png';

const Root = styled.button`
  all: unset;
  background-image: url(${TilePng});
  background-size: 100% 100%;

  box-sizing: border-box;
  width: auto;
  height: 100%;
  aspect-ratio: 1;

  cursor: pointer;

  &:hover {
    background-image: url(${TileHoverPng});
  }
`;

interface Props {
  onClick: () => void;
  children?: ReactNode;
}

function BoardHeaderButton({ onClick, children }: Props) {
  return <Root onClick={onClick}>{children}</Root>;
}

export default BoardHeaderButton;
