import {
  beforeEach, describe, expect, it,
} from 'vitest';
import { useGameStore } from './game';
import { direction8 } from '^/constants/direction';

const WIDTH = 9;
const HEIGHT = 9;
const MINES = 10;

describe('Game store state on init-click', () => {
  beforeEach(() => {
    useGameStore.getState().resetGame({
      width: WIDTH,
      height: HEIGHT,
      mines: MINES,
    });
  });

  it('should not touch a mine when init-clicked', async () => {
    const row = Math.floor(Math.random() * HEIGHT);
    const col = Math.floor(Math.random() * WIDTH);

    expect(useGameStore.getState().isInit).toStrictEqual(true);
    useGameStore.getState().initClick(row, col);
    expect(useGameStore.getState().isInit).toStrictEqual(false);
    expect(useGameStore.getState().isContinuable).toStrictEqual(true);
    expect(useGameStore.getState().isMine[row][col]).toStrictEqual(false);
    expect(useGameStore.getState().mineAroundCount[row][col]).not.toStrictEqual(9);
  });

  it('should be no status error in the generated board', async () => {
    const row = Math.floor(Math.random() * HEIGHT);
    const col = Math.floor(Math.random() * WIDTH);

    expect(useGameStore.getState().isInit).toStrictEqual(true);
    useGameStore.getState().initClick(row, col);
    expect(useGameStore.getState().isInit).toStrictEqual(false);
    expect(useGameStore.getState().isContinuable).toStrictEqual(true);
    expect(useGameStore.getState().isMine[row][col]).toStrictEqual(false);
    expect(useGameStore.getState().mineAroundCount[row][col]).not.toStrictEqual(9);

    expect((() => {
      const { isMine, mineAroundCount, mines } = useGameStore.getState();

      // eslint-disable-next-line prefer-const
      let mineCount = 0;
      const isNoErrorOnAroundCnt = isMine.every((rowLine, i) => rowLine.every(
        (isThisMine, j) => {
          if (isThisMine) {
            mineCount++;
            return mineAroundCount[i][j] === 9;
          }

          const curMineCount = direction8.map(({ row: rowDir, col: colDir }): number => {
            const searchRow = i + rowDir;
            const searchCol = j + colDir;

            if (searchRow < 0 || searchRow >= HEIGHT || searchCol < 0 || searchCol >= WIDTH) {
              return 0;
            }

            return isMine[searchRow][searchCol] ? 1 : 0;
          }).reduce((prevVal, curVal) => prevVal + curVal);

          return mineAroundCount[i][j] === curMineCount;
        },
      ));

      if (!isNoErrorOnAroundCnt) {
        return false;
      }

      return mineCount === mines;
    })()).toStrictEqual(true);
  });
});
