import { describe, expect, it } from "vitest";
import { isSupportedByPrettier } from
  "../../src/modules/isSupportedByPrettier.js";

describe("isSupportedByPrettier", () => {
  it("is defined", () => {
    expect(
      isSupportedByPrettier,
      "isSupportedByPrettier is not defined",
    ).toBeDefined();
    expect(isSupportedByPrettier, "isSupportedByPrettier is not a function").toBeTypeOf("function");
  });

  it("returns false on empty language name", () => {
    expect(isSupportedByPrettier("")).toBeFalsy();
  });

  it("returns expected language names for supported langs", () => {
    expect(isSupportedByPrettier("HTML")).toBe("html");
    expect(isSupportedByPrettier("CSS")).toBe("css");
    expect(isSupportedByPrettier("SCSS")).toBe("css");
    expect(isSupportedByPrettier("JavaScript")).toBe("js");
    expect(isSupportedByPrettier("JS")).toBe("js");
    expect(isSupportedByPrettier("JSON")).toBe("json");
    expect(isSupportedByPrettier("MarkDown")).toBe("markdown");
    expect(isSupportedByPrettier("YAML")).toBe("yaml");
  });

  it("returns false for unsupported languages", () => {
    expect(isSupportedByPrettier("Python")).toBeFalsy();
    expect(isSupportedByPrettier("Ruby")).toBeFalsy();
    expect(isSupportedByPrettier("C++")).toBeFalsy();
  });
});
