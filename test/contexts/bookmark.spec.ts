import { ApplicationCommandType } from "discord.js";
import { describe, expect, it } from "vitest";
import { bookmark } from "../../src/contexts/bookmark.js";

describe("bookmark context", () => {
  it("bookmark context should be a context object.", () => {
    expect(bookmark.data).toBeDefined();
    expect(bookmark.data).toBeTypeOf("object");
    expect(bookmark.run).toBeDefined();
    expect(bookmark.run).toBeTypeOf("function");
  });
  it("bookmark context should be formatted correctly.", () => {
    expect(bookmark.data.name).toBe("bookmark");
    expect(bookmark.data.type).toBe(ApplicationCommandType.Message);
  });
});
