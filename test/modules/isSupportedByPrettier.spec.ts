import { describe, expect, it } from "vitest";
import { isSupportedByPrettier } from
  "../../src/modules/isSupportedByPrettier.js";

describe("isSupportedByPrettier", () => {
  it("is defined", () => {
    assert.isDefined(
      isSupportedByPrettier,
      "isSupportedByPrettier is not defined",
    );
    expect(isSupportedByPrettier, "isSupportedByPrettier is not a function").toBeTypeOf("function");
  });

  it("returns false on empty language name", () => {
    expect(isSupportedByPrettier("")).toBeFalsy();
  });

  it("returns expected language names for supported langs", () => {
    assert.equal(isSupportedByPrettier("HTML"), "html");
    assert.equal(isSupportedByPrettier("CSS"), "css");
    assert.equal(isSupportedByPrettier("SCSS"), "css");
    assert.equal(isSupportedByPrettier("JavaScript"), "js");
    assert.equal(isSupportedByPrettier("JS"), "js");
    assert.equal(isSupportedByPrettier("JSON"), "json");
    assert.equal(isSupportedByPrettier("MarkDown"), "markdown");
    assert.equal(isSupportedByPrettier("YAML"), "yaml");
  });

  it("returns false for unsupported languages", () => {
    expect(isSupportedByPrettier("Python")).toBeFalsy();
    expect(isSupportedByPrettier("Ruby")).toBeFalsy();
    expect(isSupportedByPrettier("C++")).toBeFalsy();
  });
});
