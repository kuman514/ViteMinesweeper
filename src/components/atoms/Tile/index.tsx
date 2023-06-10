import React from 'react';
import styled from 'styled-components';

import { useGameStore } from '^/store/game';

import TilePng from '^/assets/tile/tile.png';
import TileHoverPng from '^/assets/tile/tile-hover.png';
import TileDisabledPng from '^/assets/tile/tile-disabled.png';
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
import ContextImage from '../ContextImage';

const pngUrl = [
  null,
  Around1Png,
  Around2Png,
  Around3Png,
  Around4Png,
  Around5Png,
  Around6Png,
  Around7Png,
  Around8Png,
];

const Root = styled.button`
  all: unset;

  box-sizing: border-box;

  background-image: url(${TilePng});
  background-size: 100% 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  &:hover {
    background-image: url(${TileHoverPng});
  }

  &:disabled {
    background-image: url(${TileDisabledPng});
  }
`;

interface Props {
  row: number;
  col: number;
}

function Tile({ row, col }: Props) {
  const isInit = useGameStore((state) => state.isInit);
  const isMine = useGameStore((state) => state.isMine[row][col]);
  const mineAroundCount = useGameStore((state) => state.mineAroundCount[row][col]);
  const isVisited = useGameStore((state) => state.isVisited[row][col]);
  const isMarkedAsMine = useGameStore((state) => state.isMarkedAsMine[row][col]);
  const isContinuable = useGameStore((state) => state.isContinuable);

  const initClick = useGameStore((state) => state.initClick);
  const click = useGameStore((state) => state.click);
  const handleOnClick = () => {
    if (isInit) {
      initClick(row, col);
      return;
    }
    click(row, col);
  };

  const rightClick = useGameStore((state) => state.rightClick);
  const handleOnRightClick = () => {
    rightClick(row, col);
  };

  const isDisabled = isVisited;
  const contextImgSrc = (() => {
    if (!isContinuable && isMine) {
      return MinePng;
    }

    // if (!isContinuable && isMarkedAsMine && !isMine) {
    //   return WrongMarkPng;
    // }

    if (isMarkedAsMine) {
      return MarkPng;
    }

    if (!isVisited) {
      return null;
    }

    return pngUrl[mineAroundCount];
  })();

  return (
    <Root
      disabled={isDisabled}
      onClick={handleOnClick}
      onContextMenu={(event) => {
        event.preventDefault();
        handleOnRightClick();
      }}
    >
      {contextImgSrc ? <ContextImage src={contextImgSrc} /> : null}
    </Root>
  );
}

export default Tile;
