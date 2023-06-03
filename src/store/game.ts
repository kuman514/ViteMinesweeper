import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { GameConfig, GameStore } from '^/types';
import { getInitState } from '^/store/functions/getInitState';
import { handleOnResetGame } from '^/store/functions/handleOnResetGame';

export const useGameStore = create<GameStore>()(
  devtools(
    persist(
      (set) => ({
        ...getInitState({
          width: 9,
          height: 9,
          mines: 10,
        }),
        resetGame: (config: GameConfig) => set((gameStore) => ({
          ...gameStore,
          ...handleOnResetGame(config),
        })),
        /**
         * @todo
         * Implement handleOnInitClick
         */
        initClick: (/* row: number, col: number */) => set((gameStore) => ({ ...gameStore })),
        /**
         * @todo
         * Implement handleOnClick
         */
        click: (/* row: number, col: number */) => set((gameStore) => ({ ...gameStore })),
      }),
      {
        name: 'vite-minesweeper-game-store',
      },
    ),
  ),
);
