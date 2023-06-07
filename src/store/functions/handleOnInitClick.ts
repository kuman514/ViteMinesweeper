import { direction8 } from '^/constants/direction';
import { GameStoreState } from '^/types';
import { generateInitStateArray } from '^/utils/array';
import { generateRandomIntegerArray } from '^/utils/random';

import { handleOnClick } from './handleOnClick';

interface Parameter {
  gameStoreState: GameStoreState;
  row: number;
  col: number;
}

export function handleOnInitClick({ gameStoreState, row, col }: Parameter): GameStoreState {
  const {
    isInit,
    isContinuable,
    width,
    height,
    mines,
  } = gameStoreState;

  if (!isInit || !isContinuable) {
    return gameStoreState;
  }

  const newIsMine = generateInitStateArray<boolean>(width, height, false);
  const maxRange = width * height - 1;
  const except = width * row + col;
  generateRandomIntegerArray({
    min: 0,
    max: maxRange,
    except,
    quantity: mines,
  }).forEach((mineIndex) => {
    const mineRow = Math.floor(mineIndex / width);
    const mineCol = mineIndex % width;
    newIsMine[mineRow][mineCol] = true;
  });

  const newMineAroundCount = generateInitStateArray<number>(width, height, 0);
  newIsMine.forEach((rowLine, i) => {
    rowLine.forEach((isThisMine, j) => {
      if (isThisMine) {
        newMineAroundCount[i][j] = 9;
        return;
      }
      direction8.forEach(({ row: rowDir, col: colDir }) => {
        const searchRow = i + rowDir;
        const searchCol = j + colDir;

        if (searchRow < 0 || searchRow >= height || searchCol < 0 || searchCol >= width) {
          return;
        }

        if (newIsMine[searchRow][searchCol]) {
          newMineAroundCount[i][j]++;
        }
      });
    });
  });

  return handleOnClick({
    gameStoreState: {
      ...gameStoreState,
      isMine: newIsMine,
      mineAroundCount: newMineAroundCount,
      isInit: false,
    },
    row,
    col,
  });
}
