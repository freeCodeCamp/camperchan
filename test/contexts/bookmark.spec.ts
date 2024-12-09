import { ApplicationCommandType } from "discord.js";
import { describe, assert, it } from "vitest";
import { bookmark } from "../../src/contexts/bookmark.js";

describe("bookmark context", () => {
  it("bookmark context should be a context object.", () => {
    assert.isDefined(bookmark.data);
    assert.isObject(bookmark.data);
    assert.isDefined(bookmark.run);
    assert.isFunction(bookmark.run);
  });
  it("bookmark context should be formatted correctly.", () => {
    assert.equal(bookmark.data.name, "bookmark");
    assert.equal(bookmark.data.type, ApplicationCommandType.Message);
  });
});
