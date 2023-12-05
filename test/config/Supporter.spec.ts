import { assert } from "chai";

import { SupporterRoleId } from "../../src/config/Supporter";

suite("supporter config", () => {
  test("supporter role should be id", () => {
    assert.match(SupporterRoleId, /^\d{16,19}$/);
  });
});
