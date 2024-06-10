import { assert } from "chai";

import { report } from "../../src/commands/report";

suite("report command", () => {
  test("is defined", () => {
    assert.isDefined(report);
  });
});
