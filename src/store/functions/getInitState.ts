import { GameConfig, GameStoreState } from '^/types';
import { generateInitStateArray } from '^/utils/array';

export function getInitState({ width, height, mines }: GameConfig): GameStoreState {
  return {
    width,
    height,
    mines,
    remainingMines: mines,
    isMine: generateInitStateArray<boolean>(width, height, false),
    mineAroundCount: generateInitStateArray<number>(width, height, 0),
    isVisited: generateInitStateArray<boolean>(width, height, false),
    isMarkedAsMine: generateInitStateArray<boolean>(width, height, false),
    isInit: true,
    isContinuable: true,
    isCompleted: false,
    currentBothHoldCoords: [-2, -2],
  };
}
