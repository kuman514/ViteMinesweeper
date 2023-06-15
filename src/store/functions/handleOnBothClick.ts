import { direction8 } from '^/constants/direction';
import { GameStoreState } from '^/types';
import { deepCopyStateArray } from '^/utils/array';
import { Queue } from '^/utils/queue';

interface Parameter {
  gameStoreState: GameStoreState;
  row: number;
  col: number;
}

/**
 * @fixme
 * Prevent wrong marks from disappearing
 */

export function handleOnBothClick({ gameStoreState, row, col }: Parameter): GameStoreState {
  const {
    isContinuable,
    isVisited,
    isInit,
    isMarkedAsMine,
    isMine,
    mineAroundCount,
    width,
    height,
  } = gameStoreState;

  // Check [row][col] un-clickable
  if (isInit || !isContinuable || isMarkedAsMine[row][col] || !isVisited[row][col]) {
    return gameStoreState;
  }

  const newIsVisited = deepCopyStateArray<boolean>(isVisited);
  const newIsMarkedAsMine = deepCopyStateArray<boolean>(isMarkedAsMine);

  /**
   * @todo
   * Move BFS to utility to avoid redundant logic
   */
  // BFS-Propagate until meeting 1~8
  let marks = 0;
  const next = new Queue<{ row: number; col: number }>();
  direction8.forEach(({ row: rowDir, col: colDir }) => {
    const nextRow = row + rowDir;
    const nextCol = col + colDir;

    if (
      nextRow < 0
      || nextRow >= height
      || nextCol < 0
      || nextCol >= width
      || newIsVisited[nextRow][nextCol]
    ) {
      return;
    }

    if (isMarkedAsMine[nextRow][nextCol]) {
      marks++;
      return;
    }

    next.push({
      row: nextRow,
      col: nextCol,
    });
  });

  if (marks !== mineAroundCount[row][col]) {
    return gameStoreState;
  }

  let isMineTouched = false;
  while (next.getFront() !== null) {
    const current = next.pop();
    if (current === null) {
      break;
    }

    const { row: curRow, col: curCol } = current;
    if (newIsVisited[curRow][curCol]) {
      continue;
    }

    if (isMine[curRow][curCol]) {
      isMineTouched = true;
    }

    newIsVisited[curRow][curCol] = true;
    if (newIsMarkedAsMine[curRow][curCol]) {
      newIsMarkedAsMine[curRow][curCol] = false;
    }
    if (mineAroundCount[curRow][curCol] >= 1 && mineAroundCount[curRow][curCol] <= 8) {
      continue;
    }

    direction8.forEach(({ row: rowDir, col: colDir }) => {
      const nextRow = curRow + rowDir;
      const nextCol = curCol + colDir;

      if (
        nextRow < 0
        || nextRow >= height
        || nextCol < 0
        || nextCol >= width
        || newIsVisited[nextRow][nextCol]
      ) {
        return;
      }

      next.push({
        row: nextRow,
        col: nextCol,
      });
    });
  }

  return {
    ...gameStoreState,
    isVisited: newIsVisited,
    isMarkedAsMine: newIsMarkedAsMine,
    isContinuable: !isMineTouched,
  };
}
