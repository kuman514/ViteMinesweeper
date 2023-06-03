import { GameConfig } from '^/types';

import { getInitState } from './getInitState';

export function handleOnResetGame(config: GameConfig) {
  return getInitState({ ...config });
}
