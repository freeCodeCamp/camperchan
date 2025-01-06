import { ApplicationCommandType } from "discord.js";
import { describe, expect, it } from "vitest";
import { format } from "../../src/contexts/format.js";

describe("format context", () => {
  it("format context should be a context object.", () => {
    expect(format.data).toBeDefined();
    expect(format.data).toBeTypeOf("object");
    expect(format.run).toBeDefined();
    expect(format.run).toBeTypeOf("function");
  });
  it("format context should be formatted correctly.", () => {
    expect(format.data.name).toBe("format");
    expect(format.data.type).toBe(ApplicationCommandType.Message);
  });
});
