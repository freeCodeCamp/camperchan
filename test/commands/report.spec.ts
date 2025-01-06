import { describe, expect, it } from "vitest";
import { report } from "../../src/commands/report.js";

describe("report command", () => {
  it("is defined", () => {
    expect(report).toBeDefined();
  });
});
