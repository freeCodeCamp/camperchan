import { describe, expect, it } from "vitest";
import { loadQuotes } from "../../src/utils/loadQuotes.js";
import type { ExtendedClient } from "../../src/interfaces/extendedClient.js";

describe("loadQuotes", () => {
  it("is defined", () => {
    expect(loadQuotes,"loadQuotes is not defined").toBeDefined();
    expect(loadQuotes, "loadQuotes is not a function").toBeTypeOf("function");
  });

  it("returns the expected data structure", async() => {
    const quotes = await loadQuotes({} as ExtendedClient);
    expect(quotes, "quotes is not defined").toHaveProperty("motivationalQuotes");
    assert.isArray(quotes.motivationalQuotes, "quotes is not an array");
    assert.property(
      quotes.motivationalQuotes[0],
      "quote",
      "quotes are not in correct structure",
    );
    assert.property(
      quotes.motivationalQuotes[0],
      "author",
      "quotes are not in correct structure",
    );
    expect(quotes, "compliments is not defined").toHaveProperty("compliments");
    assert.isArray(quotes.compliments, "compliments is not an array");
  });
});
