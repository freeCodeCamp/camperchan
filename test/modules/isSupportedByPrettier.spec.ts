import { describe, assert, it } from "vitest";
import { isSupportedByPrettier } from
  "../../src/modules/isSupportedByPrettier.js";

describe("isSupportedByPrettier", () => {
  it("is defined", () => {
    assert.isDefined(
      isSupportedByPrettier,
      "isSupportedByPrettier is not defined",
    );
    assert.isFunction(
      isSupportedByPrettier,
      "isSupportedByPrettier is not a function",
    );
  });

  it("returns false on empty language name", () => {
    assert.isFalse(isSupportedByPrettier(""));
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
    assert.isFalse(isSupportedByPrettier("Python"));
    assert.isFalse(isSupportedByPrettier("Ruby"));
    assert.isFalse(isSupportedByPrettier("C++"));
  });
});
