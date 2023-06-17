import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { ConfigStore, GameConfig } from '^/types';
import { handleOnModifyGameConfig } from './functions/handleOnModifyGameConfig';

export const useConfigStore = create<ConfigStore>()(
  devtools(
    persist(
      (set) => ({
        gameConfig: {
          width: 9,
          height: 9,
          mines: 10,
        },
        backgroundColor: 'white',
        modifyGameConfig: (newGameConfig: GameConfig) => set((configStore) => ({
          ...configStore,
          gameConfig: handleOnModifyGameConfig(newGameConfig),
        })),
        modifyBackgroundColor: (newBackgroundColor: string) => set((configStore) => ({
          ...configStore,
          backgroundColor: newBackgroundColor,
        })),
      }),
      {
        name: 'vite-minesweeper-config-store',
      },
    ),
  ),
);
