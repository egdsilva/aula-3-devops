import { divisao } from "../src_alta/divisao";

describe("src_alta/divisao", () => {
  it("deve dividir corretamente", () => {
    expect(divisao(10, 2)).toBe(5);
  });

  it("deve falhar ao dividir por zero", () => {
    expect(() => divisao(10, 0)).toThrow("Divisao por zero nao permitida.");
  });
});
