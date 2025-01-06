import { describe, expect, it } from "vitest";
import { formatCodeBlock } from "../../src/modules/formatCodeblock.js";

describe("formatCodeBlock", () => {
  it("is defined", () => {
    expect(formatCodeBlock, "formatCodeBlock is not defined").toBeDefined();
    expect(formatCodeBlock, "formatCodeBlock is not a function").toBeTypeOf("function");
  });

  it("formats string as expected", () => {
    const code = "const foo = 'bar';";
    const lang = "ts";
    expect(formatCodeBlock(lang, code)).toBe("```ts\nconst foo = 'bar';\n```");
  });

  it("does not add trailing new line if present", () => {
    const code = "const foo = 'bar';\n";
    const lang = "ts";
    expect(formatCodeBlock(lang, code)).toBe("```ts\nconst foo = 'bar';\n```");
  });
});
