import { describe, assert, it } from "vitest";
import { report } from "../../src/commands/report.js";

describe("report command", () => {
  it("is defined", () => {
    assert.isDefined(report);
  });
});
