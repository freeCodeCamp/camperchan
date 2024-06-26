import { describe, assert, test } from "vitest";

import { report } from "../../src/commands/report";

describe("report command", () => {
  test("is defined", () => {
    assert.isDefined(report);
  });
});
