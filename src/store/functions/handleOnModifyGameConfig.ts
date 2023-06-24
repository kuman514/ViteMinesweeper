import {
  MIN_WIDTH,
  MAX_WIDTH,
  MIN_HEIGHT,
  MAX_HEIGHT,
  MIN_MINES,
} from '^/constants/size';
import { getMaxMines } from '^/utils/size';
import { GameConfig } from '^/types';

export function handleOnModifyGameConfig({
  width,
  height,
  mines,
}: GameConfig): GameConfig {
  const finalWidth = Math.max(MIN_WIDTH, Math.min(MAX_WIDTH, width));
  const finalHeight = Math.max(MIN_HEIGHT, Math.min(MAX_HEIGHT, height));
  return {
    width: finalWidth,
    height: finalHeight,
    mines: Math.max(
      MIN_MINES,
      Math.min(
        mines,
        getMaxMines(finalWidth, finalHeight),
      ),
    ),
  };
}
