export interface GameConfig {
  width: number;
  height: number;
  mines: number;
}

export interface GameStoreState {
  width: number;
  height: number;
  mines: number;
  remainingMines: number;
  isMine: boolean[][];
  mineAroundCount: number[][];
  isVisited: boolean[][];
  isMarkedAsMine: boolean[][];
  isInit: boolean;
  isContinuable: boolean;
}

export interface GameStoreAction {
  resetGame(config: GameConfig): void;
  initClick(row: number, col: number): void;
  click(row: number, col: number): void;
  rightClick(row: number, col: number): void;
  bothClick(row: number, col: number): void;
}

export type GameStore = GameStoreState & GameStoreAction;
