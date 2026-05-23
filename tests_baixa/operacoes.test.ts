import {
  divisao,
  ehImpar,
  ehPar,
  multiplicacao,
  soma,
  subtracao
} from "../src_baixa/operacoes";

describe("src_baixa/operacoes", () => {
  it("deve somar corretamente", () => {
    expect(soma(2, 3)).toBe(5);
  });

  it("deve subtrair corretamente", () => {
    expect(subtracao(8, 3)).toBe(5);
  });

  it("deve multiplicar corretamente", () => {
    expect(multiplicacao(4, 5)).toBe(20);
  });

  it("deve dividir corretamente", () => {
    expect(divisao(20, 4)).toBe(5);
  });

  it("deve falhar ao dividir por zero", () => {
    expect(() => divisao(10, 0)).toThrow("Divisao por zero nao permitida.");
  });

  it("deve identificar numero par", () => {
    expect(ehPar(10)).toBe(true);
    expect(ehPar(9)).toBe(false);
  });

  it("deve identificar numero impar", () => {
    expect(ehImpar(9)).toBe(true);
    expect(ehImpar(10)).toBe(false);
  });
});
