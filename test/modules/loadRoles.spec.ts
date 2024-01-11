import { assert } from "chai";

import { loadRoles } from "../../src/modules/loadRoles";

suite("load roles module", () => {
  test("is defined", () => {
    assert.isDefined(loadRoles);
  });
});
