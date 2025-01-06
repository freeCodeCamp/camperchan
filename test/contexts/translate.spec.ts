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
    expect(translate.data.name).toBe("translate");
    expect(translate.data.type).toBe(ApplicationCommandType.Message);
  });
});
