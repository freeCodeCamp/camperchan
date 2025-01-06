import { ApplicationCommandType } from "discord.js";
import { describe, expect, it } from "vitest";
import { report } from "../../src/contexts/report.js";

describe("report context", () => {
  it("report context should be a context object.", () => {
    expect(report.data).toBeDefined();
    expect(report.data).toBeTypeOf("object");
    expect(report.run).toBeDefined();
    expect(report.run).toBeTypeOf("function");
  });
  it("report context should be formatted correctly.", () => {
    expect(report.data.name).toBe("report");
    expect(report.data.type).toBe(ApplicationCommandType.Message);
  });
});
