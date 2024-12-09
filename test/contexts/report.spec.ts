import { ApplicationCommandType } from "discord.js";
import { describe, assert, it } from "vitest";
import { report } from "../../src/contexts/report.js";

describe("report context", () => {
  it("report context should be a context object.", () => {
    assert.isDefined(report.data);
    assert.isObject(report.data);
    assert.isDefined(report.run);
    assert.isFunction(report.run);
  });
  it("report context should be formatted correctly.", () => {
    assert.equal(report.data.name, "report");
    assert.equal(report.data.type, ApplicationCommandType.Message);
  });
});
