export function generateRandomInteger(min: number, max: number, except?: number): number {
  const generatedInteger = Math.floor(Math.random() * (max - min + 1)) + min;

  return except !== undefined && generatedInteger === except
    ? generateRandomInteger(min, max, except)
    : generatedInteger;
}
