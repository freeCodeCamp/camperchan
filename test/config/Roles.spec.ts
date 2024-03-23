import { assert } from "chai";

import { AuthorRoleId, SupporterRoleId } from "../../src/config/Roles";

suite("roles config", () => {
  test("supporter role should be id", () => {
    assert.match(SupporterRoleId, /^\d{16,19}$/);
  });

  test("author role should be id", () => {
    assert.match(AuthorRoleId, /^\d{16,19}$/);
  });
});
