module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/*.test.ts"],
  collectCoverage: true,
  collectCoverageFrom: ["src_alta/**/*.ts", "src_baixa/**/*.ts"],
  coverageReporters: ["text", "json-summary"]
};
