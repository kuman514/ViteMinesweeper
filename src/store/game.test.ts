import { beforeEach, describe, expect, it } from 'vitest';
import { useGameStore } from './game';
import { direction8 } from '^/constants/direction';
import { generateRandomIntegerArray } from '^/utils/random';

/**
 * To expect a result with the always updated values,
 * I needed to use useGameStore.getState()
 */

const WIDTH = 30;
const HEIGHT = 16;
const MINES = 99;

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
    expect(useGameStore.getState().mineAroundCount[row][col]).not.toStrictEqual(
      9
    );
  });

  it('should be no status error in the generated board', async () => {
    const row = Math.floor(Math.random() * HEIGHT);
    const col = Math.floor(Math.random() * WIDTH);

    expect(useGameStore.getState().isInit).toStrictEqual(true);
    useGameStore.getState().initClick(row, col);
    expect(useGameStore.getState().isInit).toStrictEqual(false);
    expect(useGameStore.getState().isContinuable).toStrictEqual(true);
    expect(useGameStore.getState().isMine[row][col]).toStrictEqual(false);
    expect(useGameStore.getState().mineAroundCount[row][col]).not.toStrictEqual(
      9
    );

    expect(
      (() => {
        const { isMine, mineAroundCount, mines } = useGameStore.getState();

        // eslint-disable-next-line prefer-const
        let mineCount = 0;
        const isNoErrorOnAroundCnt = isMine.every((rowLine, i) =>
          rowLine.every((isThisMine, j) => {
            if (isThisMine) {
              mineCount++;
              return mineAroundCount[i][j] === 9;
            }

            const curMineCount = direction8
              .map(({ row: rowDir, col: colDir }): number => {
                const searchRow = i + rowDir;
                const searchCol = j + colDir;

                if (
                  searchRow < 0 ||
                  searchRow >= HEIGHT ||
                  searchCol < 0 ||
                  searchCol >= WIDTH
                ) {
                  return 0;
                }

                return isMine[searchRow][searchCol] ? 1 : 0;
              })
              .reduce((prevVal, curVal) => prevVal + curVal);

            return mineAroundCount[i][j] === curMineCount;
          })
        );

        if (!isNoErrorOnAroundCnt) {
          return false;
        }

        return mineCount === mines;
      })()
    ).toStrictEqual(true);
  });
});

describe('Game store state on right-click', () => {
  beforeEach(() => {
    useGameStore.getState().resetGame({
      width: WIDTH,
      height: HEIGHT,
      mines: MINES,
    });
    const row = Math.floor(Math.random() * HEIGHT);
    const col = Math.floor(Math.random() * WIDTH);
    useGameStore.getState().initClick(row, col);
  });

  it('should be a mine mark only on an unvisited tile on right-click', async () => {
    const { isVisited, rightClick } = useGameStore.getState();

    const [unvisitedRow, unvisitedCol] = (() => {
      for (let i = 0; i < HEIGHT; i++) {
        for (let j = 0; j < WIDTH; j++) {
          if (!isVisited[i][j]) {
            return [i, j];
          }
        }
      }
      throw new Error('There was no unvisited tile');
    })();

    const [visitedRow, visitedCol] = (() => {
      for (let i = 0; i < HEIGHT; i++) {
        for (let j = 0; j < WIDTH; j++) {
          if (isVisited[i][j]) {
            return [i, j];
          }
        }
      }
      throw new Error('There was no visited tile');
    })();

    rightClick(unvisitedRow, unvisitedCol);
    expect(
      useGameStore.getState().isMarkedAsMine[unvisitedRow][unvisitedCol]
    ).toStrictEqual(true);
    rightClick(unvisitedRow, unvisitedCol);
    expect(
      useGameStore.getState().isMarkedAsMine[unvisitedRow][unvisitedCol]
    ).toStrictEqual(false);
    rightClick(unvisitedRow, unvisitedCol);
    expect(
      useGameStore.getState().isMarkedAsMine[unvisitedRow][unvisitedCol]
    ).toStrictEqual(true);

    rightClick(visitedRow, visitedCol);
    expect(
      useGameStore.getState().isMarkedAsMine[visitedRow][visitedCol]
    ).toStrictEqual(false);
    rightClick(visitedRow, visitedCol);
    expect(
      useGameStore.getState().isMarkedAsMine[visitedRow][visitedCol]
    ).toStrictEqual(false);
    rightClick(visitedRow, visitedCol);
    expect(
      useGameStore.getState().isMarkedAsMine[visitedRow][visitedCol]
    ).toStrictEqual(false);
  });
});

describe('Remaining mine counting on right-click', () => {
  beforeEach(() => {
    useGameStore.getState().resetGame({
      width: WIDTH,
      height: HEIGHT,
      mines: MINES,
    });
  });

  it('should be 0 on right-click x distinct tiles while having total x mines', async () => {
    const maxRange = WIDTH * HEIGHT - 1;
    generateRandomIntegerArray({
      min: 0,
      max: maxRange,
      quantity: MINES,
    }).forEach((mineIndex) => {
      const mineRow = Math.floor(mineIndex / WIDTH);
      const mineCol = mineIndex % WIDTH;
      useGameStore.getState().rightClick(mineRow, mineCol);
    });
    expect(useGameStore.getState().remainingMines).toStrictEqual(0);
  });

  it('should be lower than -2 on right-click (x + 2) distinct tiles while having total x mines', async () => {
    const maxRange = WIDTH * HEIGHT - 1;
    generateRandomIntegerArray({
      min: 0,
      max: maxRange,
      quantity: MINES + 2,
    }).forEach((mineIndex) => {
      const mineRow = Math.floor(mineIndex / WIDTH);
      const mineCol = mineIndex % WIDTH;
      useGameStore.getState().rightClick(mineRow, mineCol);
    });
    expect(useGameStore.getState().remainingMines).toStrictEqual(-2);
  });
});
