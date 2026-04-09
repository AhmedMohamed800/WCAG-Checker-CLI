import shouldRunRule from "../../src/utils/shouldRunRule";

describe("shouldRunRule", () => {
  it("check if rule is run at correct level", () => {
    expect(shouldRunRule({ level: "A" }, "AA")).toBe(true);
    expect(shouldRunRule({ level: "AA" }, "A")).toBe(false);
    expect(shouldRunRule({ level: "AAA" }, "AAA")).toBe(true);
  });
});
