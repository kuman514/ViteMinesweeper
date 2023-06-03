export function generateInitStateArray<T>(width: number, height: number, fill: T): T[][] {
  return Array.from(
    { length: height },
    () => Array.from(
      { length: width },
      () => fill,
    ),
  );
}
