import { GameStoreState } from '^/types';
import { deepCopyStateArray } from '^/utils/array';

interface Parameter {
  gameStoreState: GameStoreState;
  row: number;
  col: number;
}

export function handleOnRightClick({
  gameStoreState,
  row,
  col,
}: Parameter): GameStoreState {
  const { isContinuable, isVisited, isMarkedAsMine, remainingMines } =
    gameStoreState;

  // Check [row][col] clickable
  if (!isContinuable || isVisited[row][col]) {
    return gameStoreState;
  }

  const newIsMarkedAsMine = deepCopyStateArray<boolean>(isMarkedAsMine);
  newIsMarkedAsMine[row][col] = !newIsMarkedAsMine[row][col];
  const newRemainingMines = newIsMarkedAsMine[row][col]
    ? remainingMines - 1
    : remainingMines + 1;

  return {
    ...gameStoreState,
    isMarkedAsMine: newIsMarkedAsMine,
    remainingMines: newRemainingMines,
  };
}
