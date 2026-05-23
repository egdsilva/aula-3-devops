export function soma(a: number, b: number): number {
  return a + b;
}

export function subtracao(a: number, b: number): number {
  return a - b;
}

export function multiplicacao(a: number, b: number): number {
  return a * b;
}

export function divisao(a: number, b: number): number {
  if (b === 0) {
    throw new Error("Divisao por zero nao permitida.");
  }

  return a / b;
}

export function ehPar(numero: number): boolean {
  return numero % 2 === 0;
}

export function ehImpar(numero: number): boolean {
  return numero % 2 !== 0;
}
