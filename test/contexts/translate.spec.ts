import { ApplicationCommandType } from "discord.js";
import { describe, expect, it } from "vitest";
import { translate } from "../../src/contexts/translate.js";

describe("translate context", () => {
  it("translate context should be a context object.", () => {
    expect(translate.data).toBeDefined();
    expect(translate.data).toBeTypeOf("object");
    expect(translate.run).toBeDefined();
    expect(translate.run).toBeTypeOf("function");
  });
  it("translate context should be formatted correctly.", () => {
    assert.equal(translate.data.name, "translate");
    assert.equal(translate.data.type, ApplicationCommandType.Message);
  });
});
