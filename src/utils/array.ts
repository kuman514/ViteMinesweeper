export function generateInitStateArray<T>(width: number, height: number, fill: T): T[][] {
  return Array.from(
    { length: height },
    () => Array.from(
      { length: width },
      () => fill,
    ),
  );
}

export function deepCopyStateArray<T>(array: T[][]): T[][] {
  return JSON.parse(JSON.stringify(array));
}
