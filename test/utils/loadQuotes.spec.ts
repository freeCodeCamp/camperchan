import { describe, assert, test } from "vitest";
import { loadQuotes } from "../../src/utils/loadQuotes.js";
import type { ExtendedClient } from "../../src/interfaces/extendedClient.js";

describe("loadQuotes", () => {
  test("is defined", () => {
    assert.isDefined(loadQuotes, "loadQuotes is not defined");
    assert.isFunction(loadQuotes, "loadQuotes is not a function");
  });

  test("returns the expected data structure", async() => {
    const quotes = await loadQuotes({} as ExtendedClient);
    assert.property(quotes, "motivationalQuotes", "quotes is not defined");
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
    assert.property(quotes, "compliments", "compliments is not defined");
    assert.isArray(quotes.compliments, "compliments is not an array");
  });
});
