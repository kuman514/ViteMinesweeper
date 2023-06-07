export function generateRandomInteger(min: number, max: number, except?: number): number {
  const generatedInteger = Math.floor(Math.random() * (max - min + 1)) + min;

  return except !== undefined && generatedInteger === except
    ? generateRandomInteger(min, max, except)
    : generatedInteger;
}

interface GenerateRandomIntegerArrayParams {
  min: number;
  max: number;
  quantity: number;
  except?: number;
}

export function generateRandomIntegerArray({
  min, max, quantity, except,
}: GenerateRandomIntegerArrayParams): number[] {
  const isDuplicated: Record<number, true> = {};
  while (Object.keys(isDuplicated).length < quantity) {
    isDuplicated[generateRandomInteger(min, max, except)] = true;
  }
  return Object.keys(isDuplicated).map((key) => Number(key));
}
