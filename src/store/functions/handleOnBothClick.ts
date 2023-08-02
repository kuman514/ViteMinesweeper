import { direction8 } from '^/constants/direction';
import { GameStoreState } from '^/types';
import { deepCopyStateArray } from '^/utils/array';
import { Queue } from '^/utils/queue';

interface Parameter {
  gameStoreState: GameStoreState;
  row: number;
  col: number;
}

export function handleOnBothClick({
  gameStoreState,
  row,
  col,
}: Parameter): GameStoreState {
  const {
    isContinuable,
    isVisited,
    isInit,
    isMarkedAsMine,
    isMine,
    mineAroundCount,
    width,
    height,
    mines,
    remainingMines,
  } = gameStoreState;

  // Check [row][col] un-clickable
  if (
    isInit ||
    !isContinuable ||
    isMarkedAsMine[row][col] ||
    !isVisited[row][col]
  ) {
    return gameStoreState;
  }

  const newIsVisited = deepCopyStateArray<boolean>(isVisited);
  const newIsMarkedAsMine = deepCopyStateArray<boolean>(isMarkedAsMine);
  let newRemainingMines = remainingMines;

  /**
   * @todo
   * Move BFS to utility to avoid redundant logic
   */
  // BFS-Propagate until meeting 1~8
  let marks = 0;
  let isMineTouched = false;
  const next = new Queue<{ row: number; col: number }>();
  direction8.forEach(({ row: rowDir, col: colDir }) => {
    const nextRow = row + rowDir;
    const nextCol = col + colDir;

    if (
      nextRow < 0 ||
      nextRow >= height ||
      nextCol < 0 ||
      nextCol >= width ||
      newIsVisited[nextRow][nextCol]
    ) {
      return;
    }

    if (isMarkedAsMine[nextRow][nextCol]) {
      marks++;
      return;
    }

    if (isMine[nextRow][nextCol]) {
      isMineTouched = true;
    }

    next.push({
      row: nextRow,
      col: nextCol,
    });
  });

  if (marks !== mineAroundCount[row][col]) {
    return gameStoreState;
  }

  while (next.getFront() !== null) {
    const current = next.pop();
    if (current === null) {
      break;
    }

    const { row: curRow, col: curCol } = current;
    if (newIsVisited[curRow][curCol]) {
      continue;
    }

    newIsVisited[curRow][curCol] = true;
    if (!isMineTouched && newIsMarkedAsMine[curRow][curCol]) {
      newIsMarkedAsMine[curRow][curCol] = false;
      newRemainingMines++;
    }
    if (
      mineAroundCount[curRow][curCol] >= 1 &&
      mineAroundCount[curRow][curCol] <= 8
    ) {
      continue;
    }

    direction8.forEach(({ row: rowDir, col: colDir }) => {
      const nextRow = curRow + rowDir;
      const nextCol = curCol + colDir;

      if (
        nextRow < 0 ||
        nextRow >= height ||
        nextCol < 0 ||
        nextCol >= width ||
        newIsVisited[nextRow][nextCol]
      ) {
        return;
      }

      next.push({
        row: nextRow,
        col: nextCol,
      });
    });
  }

  let remaining = 0;
  if (!isMineTouched) {
    newIsVisited.forEach((rowLine) => {
      rowLine.forEach((isThisVisited) => {
        if (!isThisVisited) {
          remaining++;
        }
      });
    });
  }

  const isCompleted = isMineTouched ? false : remaining === mines;
  if (isCompleted) {
    newIsVisited.forEach((rowLine, i) => {
      rowLine.forEach((isThisVisited, j) => {
        if (!isThisVisited) {
          newIsMarkedAsMine[i][j] = true;
        }
      });
    });
  }

  return {
    ...gameStoreState,
    isVisited: newIsVisited,
    isMarkedAsMine: newIsMarkedAsMine,
    isContinuable: !isMineTouched && !isCompleted,
    isCompleted,
    remainingMines: newRemainingMines,
  };
}
