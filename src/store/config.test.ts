import {
  beforeEach, describe, expect, it,
} from 'vitest';
import { useConfigStore } from './config';

describe('Game config modification', () => {
  beforeEach(() => {
    useConfigStore.setState({
      gameConfig: {
        width: 9,
        height: 9,
        mines: 10,
      },
    });
  });

  it('should have width at least 9 and at most 30', async () => {
    useConfigStore.getState().modifyGameConfig({
      width: 21,
      height: 9,
      mines: 10,
    });
    expect(useConfigStore.getState().gameConfig).toStrictEqual({
      width: 21,
      height: 9,
      mines: 10,
    });

    useConfigStore.getState().modifyGameConfig({
      width: 7,
      height: 9,
      mines: 10,
    });
    expect(useConfigStore.getState().gameConfig).toStrictEqual({
      width: 9,
      height: 9,
      mines: 10,
    });

    useConfigStore.getState().modifyGameConfig({
      width: 35,
      height: 9,
      mines: 10,
    });
    expect(useConfigStore.getState().gameConfig).toStrictEqual({
      width: 30,
      height: 9,
      mines: 10,
    });
  });

  it('should have height at least 9 and at most 24', async () => {
    useConfigStore.getState().modifyGameConfig({
      width: 9,
      height: 15,
      mines: 10,
    });
    expect(useConfigStore.getState().gameConfig).toStrictEqual({
      width: 9,
      height: 15,
      mines: 10,
    });

    useConfigStore.getState().modifyGameConfig({
      width: 9,
      height: 4,
      mines: 10,
    });
    expect(useConfigStore.getState().gameConfig).toStrictEqual({
      width: 9,
      height: 9,
      mines: 10,
    });

    useConfigStore.getState().modifyGameConfig({
      width: 9,
      height: 40,
      mines: 10,
    });
    expect(useConfigStore.getState().gameConfig).toStrictEqual({
      width: 9,
      height: 24,
      mines: 10,
    });
  });

  it('should have mines at least 10', async () => {
    useConfigStore.getState().modifyGameConfig({
      width: 9,
      height: 9,
      mines: 10,
    });
    expect(useConfigStore.getState().gameConfig).toStrictEqual({
      width: 9,
      height: 9,
      mines: 10,
    });

    useConfigStore.getState().modifyGameConfig({
      width: 16,
      height: 16,
      mines: 40,
    });
    expect(useConfigStore.getState().gameConfig).toStrictEqual({
      width: 16,
      height: 16,
      mines: 40,
    });

    useConfigStore.getState().modifyGameConfig({
      width: 16,
      height: 16,
      mines: 4,
    });
    expect(useConfigStore.getState().gameConfig).toStrictEqual({
      width: 16,
      height: 16,
      mines: 10,
    });
  });

  it('should have mines not exceeding (width * height * 0.925)', async () => {
    useConfigStore.getState().modifyGameConfig({
      width: 16,
      height: 9,
      mines: 10000,
    });
    expect(useConfigStore.getState().gameConfig).toStrictEqual({
      width: 16,
      height: 9,
      mines: 133,
    });

    useConfigStore.getState().modifyGameConfig({
      width: 45,
      height: 200,
      mines: 999999,
    });
    expect(useConfigStore.getState().gameConfig).toStrictEqual({
      width: 30,
      height: 24,
      mines: 666,
    });

    useConfigStore.getState().modifyGameConfig({
      width: 9,
      height: 9,
      mines: 81000,
    });
    expect(useConfigStore.getState().gameConfig).toStrictEqual({
      width: 9,
      height: 9,
      mines: 74,
    });
  });
});
