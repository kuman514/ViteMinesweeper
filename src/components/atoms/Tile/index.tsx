import React from 'react';
import styled from 'styled-components';

import ContextImage from '^/components/atoms/ContextImage';
import { useGameStore } from '^/store/game';

import TilePng from '^/assets/tile/tile.png';
import TileHoverPng from '^/assets/tile/tile-hover.png';
import TileDisabledPng from '^/assets/tile/tile-disabled.png';
import TileMineTouchedPng from '^/assets/tile/tile-mine-touched.png';
import Around1Png from '^/assets/tile-context/1.png';
import Around2Png from '^/assets/tile-context/2.png';
import Around3Png from '^/assets/tile-context/3.png';
import Around4Png from '^/assets/tile-context/4.png';
import Around5Png from '^/assets/tile-context/5.png';
import Around6Png from '^/assets/tile-context/6.png';
import Around7Png from '^/assets/tile-context/7.png';
import Around8Png from '^/assets/tile-context/8.png';
import MarkPng from '^/assets/tile-context/mark.png';
import WrongMarkPng from '^/assets/tile-context/wrong-mark.png';
import MinePng from '^/assets/tile-context/mine.png';

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

interface RootProps {
  isVisited: boolean;
  isMineTouched: boolean;
}

function getBackgroundImage({ isVisited, isMineTouched }: RootProps): string {
  if (isMineTouched) {
    return TileMineTouchedPng;
  }

  if (isVisited) {
    return TileDisabledPng;
  }

  return TilePng;
}

const Root = styled.button<RootProps>`
  all: unset;

  box-sizing: border-box;

  background-image: url(${(props) => getBackgroundImage(props)});
  background-size: 100% 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  &:hover {
    background-image: url(${TileHoverPng});
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
  const isCompleted = useGameStore((state) => state.isCompleted);
  const isMineTouched = !isContinuable && isVisited && isMine && !isMarkedAsMine;

  const initClick = useGameStore((state) => state.initClick);
  const click = useGameStore((state) => state.click);
  const rightClick = useGameStore((state) => state.rightClick);
  const bothClick = useGameStore((state) => state.bothClick);

  const handleOnClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    switch (event.buttons) {
      case 0:
        if (isInit) {
          initClick(row, col);
          return;
        }
        click(row, col);
        break;
      case 2:
        bothClick(row, col);
        break;
      default:
    }
  };

  const handleOnRightClick = () => {
    rightClick(row, col);
  };

  const isDisabled = isVisited;
  const contextImgSrc = (() => {
    if (!isContinuable && !isCompleted && isMarkedAsMine && !isMine) {
      return WrongMarkPng;
    }

    if (isMarkedAsMine) {
      return MarkPng;
    }

    if (!isContinuable && !isCompleted && isMine) {
      return MinePng;
    }

    if (!isVisited) {
      return null;
    }

    return pngUrl[mineAroundCount];
  })();

  return (
    <Root
      isVisited={isDisabled}
      isMineTouched={isMineTouched}
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
