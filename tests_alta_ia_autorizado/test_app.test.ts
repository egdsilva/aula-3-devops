import { dividir, somar } from "../src_alta/app";

describe("src_alta/app autorizado", () => {
  it("deve somar corretamente", () => {
    expect(somar(2, 3)).toBe(5);
  });

  it("deve dividir corretamente", () => {
    expect(dividir(10, 2)).toBe(5);
  });

  it("deve falhar ao dividir por zero", () => {
    expect(() => dividir(10, 0)).toThrow("Divisao por zero nao permitida.");
  });
});
