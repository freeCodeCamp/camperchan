import { describe, expect, it } from "vitest";
import { loadQuotes } from "../../src/utils/loadQuotes.js";
import type { ExtendedClient } from "../../src/interfaces/extendedClient.js";

describe("loadQuotes", () => {
  it("is defined", () => {
    expect(loadQuotes, "loadQuotes is not defined").toBeDefined();
    expect(loadQuotes, "loadQuotes is not a function").toBeTypeOf("function");
  });

  it("returns the expected data structure", async() => {
    const quotes = await loadQuotes({} as ExtendedClient);
    expect(quotes, "quotes is not defined").toHaveProperty("motivationalQuotes");
    expect(quotes.motivationalQuotes, "quotes is not an array").toBeInstanceOf(Array);
    expect(quotes.motivationalQuotes[0], "quotes are not in correct structure").toHaveProperty("quote");
    expect(quotes.motivationalQuotes[0], "quotes are not in correct structure").toHaveProperty("author");
    expect(quotes, "compliments is not defined").toHaveProperty("compliments");
    expect(quotes.compliments, "compliments is not an array").toBeInstanceOf(Array);
  });
});
