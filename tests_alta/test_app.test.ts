import { dividir, somar } from "../src_alta/app";

describe("src_alta/app", () => {
  it("deve somar corretamente", () => {
    expect(somar(2, 3)).toBe(5);
  });

  it("deve falhar ao dividir por zero", () => {
    expect(() => dividir(10, 0)).toThrow("Divisao por zero nao permitida.");
  });
});
