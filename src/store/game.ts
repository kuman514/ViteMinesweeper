import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { GameConfig, GameStore } from '^/types';

import { getInitState } from './functions/getInitState';
import { handleOnResetGame } from './functions/handleOnResetGame';
import { handleOnInitClick } from './functions/handleOnInitClick';
import { handleOnClick } from './functions/handleOnClick';
import { handleOnRightClick } from './functions/handleOnRightClick';
import { handleOnBothClick } from './functions/handleOnBothClick';

export const useGameStore = create<GameStore>()(
  devtools(
    persist(
      (set) => ({
        ...getInitState({
          width: 9,
          height: 9,
          mines: 10,
        }),
        resetGame: (config: GameConfig) =>
          set((gameStore) => ({
            ...gameStore,
            ...handleOnResetGame(config),
          })),
        initClick: (row: number, col: number) =>
          set((gameStore) => ({
            ...gameStore,
            ...handleOnInitClick({ gameStoreState: gameStore, row, col }),
          })),
        click: (row: number, col: number) =>
          set((gameStore) => ({
            ...gameStore,
            ...handleOnClick({ gameStoreState: gameStore, row, col }),
          })),
        rightClick: (row: number, col: number) =>
          set((gameStore) => ({
            ...gameStore,
            ...handleOnRightClick({ gameStoreState: gameStore, row, col }),
          })),
        bothClick: (row: number, col: number) =>
          set((gameStore) => ({
            ...gameStore,
            ...handleOnBothClick({ gameStoreState: gameStore, row, col }),
          })),
        setCurrentBothHoldCoords: (row: number, col: number) =>
          set((gameStore) => ({
            ...gameStore,
            currentBothHoldCoords: [row, col],
          })),
      }),
      {
        name: 'vite-minesweeper-game-store',
      }
    )
  )
);
