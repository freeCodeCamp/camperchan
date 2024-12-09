import { describe, assert, it } from "vitest";
import { formatCodeBlock } from "../../src/modules/formatCodeblock.js";

describe("formatCodeBlock", () => {
  it("is defined", () => {
    assert.isDefined(formatCodeBlock, "formatCodeBlock is not defined");
    assert.isFunction(formatCodeBlock, "formatCodeBlock is not a function");
  });

  it("formats string as expected", () => {
    const code = "const foo = 'bar';";
    const lang = "ts";
    assert.equal(formatCodeBlock(lang, code), "```ts\nconst foo = 'bar';\n```");
  });

  it("does not add trailing new line if present", () => {
    const code = "const foo = 'bar';\n";
    const lang = "ts";
    assert.equal(formatCodeBlock(lang, code), "```ts\nconst foo = 'bar';\n```");
  });
});
