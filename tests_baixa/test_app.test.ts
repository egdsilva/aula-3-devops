import { somar } from "../src_baixa/app";

describe("src_baixa/app", () => {
  it("deve somar corretamente", () => {
    expect(somar(2, 3)).toBe(5);
  });
});
