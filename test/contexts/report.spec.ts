import { ApplicationCommandType } from "discord.js";
import { describe, assert, test } from "vitest";

import { report } from "../../src/contexts/report";

describe("report context", () => {
  test("report context should be a context object.", () => {
    assert.isDefined(report.data);
    assert.isObject(report.data);
    assert.isDefined(report.run);
    assert.isFunction(report.run);
  });
  test("report context should be formatted correctly.", () => {
    assert.equal(report.data.name, "report");
    assert.equal(report.data.type, ApplicationCommandType.Message);
  });
});
