export function divisao(a: number, b: number): number {
  if (b === 0) {
    throw new Error("Divisao por zero nao permitida.");
  }

  return a / b;
}
