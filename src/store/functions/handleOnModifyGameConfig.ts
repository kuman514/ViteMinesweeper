import { GameConfig } from '^/types';

export function handleOnModifyGameConfig({
  width,
  height,
  mines,
}: GameConfig): GameConfig {
  const finalWidth = Math.max(9, Math.min(30, width));
  const finalHeight = Math.max(9, Math.min(24, height));
  return {
    width: finalWidth,
    height: finalHeight,
    mines: Math.max(
      10,
      Math.min(
        mines,
        Math.floor(finalWidth * finalHeight * 0.925),
      ),
    ),
  };
}
