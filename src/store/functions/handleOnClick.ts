import { direction8 } from '^/constants/direction';
import { GameStoreState } from '^/types';
import { deepCopyStateArray } from '^/utils/array';
import { Queue } from '^/utils/queue';

interface Parameter {
  gameStoreState: GameStoreState;
  row: number;
  col: number;
}

export function handleOnClick({ gameStoreState, row, col }: Parameter): GameStoreState {
  const {
    isContinuable,
    isVisited,
    isMarkedAsMine,
    isMine,
    mineAroundCount,
    width,
    height,
  } = gameStoreState;

  // Check [row][col] clickable
  if (!isContinuable || isMarkedAsMine[row][col] || isVisited[row][col]) {
    return gameStoreState;
  }

  const newIsVisited = deepCopyStateArray<boolean>(isVisited);
  const newIsMarkedAsMine = deepCopyStateArray<boolean>(isMarkedAsMine);

  // Check mine on [row][col]
  if (isMine[row][col]) {
    newIsVisited[row][col] = true;
    return {
      ...gameStoreState,
      isVisited: newIsVisited,
      isContinuable: false,
    };
  }

  // BFS-Propagate until meeting 1~8
  const next = new Queue<{ row: number; col: number }>();
  next.push({ row, col });
  while (next.getFront() !== null) {
    const current = next.pop();
    if (current === null) {
      break;
    }

    const { row: curRow, col: curCol } = current;
    if (newIsVisited[curRow][curCol] || isMine[curRow][curCol]) {
      continue;
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
        || isMine[nextRow][nextCol]
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
  };
}
